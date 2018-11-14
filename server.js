const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Observable, zip, fromEvent, merge, concat, of, bindNodeCallback } = require('rxjs');
const { pluck, map, concatMap, tap } = require('rxjs/operators');
const { spawn } = require('child_process');
const authRouter = require('./routes/authentication');
const passportSetup = require('./passport');
const passport = require('passport');
const port = process.env.PORT || 5000;
const sockets = require('socket.io');
const config = require('config');
const appDb = require('./db/db.apps');
const path = require('path');
var expressWinston = require('express-winston');
var winston = require('winston');

app.use(express.static(path.join(__dirname, './client/build')));

app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console({
        json: true,
        colorize: true
      }),
      new winston.transports.File({
        filename: 'access.log',
        level: 'info'
    })
    ]
  }));

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRouter);

const server = app.listen(port, () => {
    console.log("listening on port 5000 for app" + config.get('rxjs.app'));
})

const io = sockets(server);
app.post("/deploy", (req, res) => {

    const requestResponseObservable = Observable.create((o) => {
        o.next({ req, res });
    });
    const request = requestResponseObservable.pipe(pluck("req"));
    const response = requestResponseObservable.pipe(pluck("res"));

    const url = request.pipe(pluck("body"), pluck("url"),
        tap((url) => console.log("url entered is ", url)));

    const repoName = url.pipe(map((url) => url.split("/").pop().toLowerCase()),
        tap((repo) => console.log("repo name is ", repo)));

    const zipped = zip(url, repoName);

    const emission = zipped.pipe(concatMap((data) => {
        const command = spawn(`./script.sh`, [data[0], data[1]]);
        storeData(data[0],data[1]);
        const stdout = fromEvent(command.stdout, 'data');
        const stderr = fromEvent(command.stderr, 'data');
        return merge(stdout, stderr).pipe(map((data) => data.toString('utf-8')));
    }));

    emission.subscribe(
        x => {
            console.log('data', x);
            io.emit('chat', x);
        },
        e => {
            console.error("error object", e);
        },
        () => console.log("completed")
    )    
})

app.get("/apps", (req, res) => {
    appDb.getUserApps().then((data) => {
        res.json(data);
    });
})  

app.use(expressWinston.errorLogger({
    transports: [
      new winston.transports.Console({
        json: true,
        colorize: true
      }),
      new winston.transports.File({
        filename: 'access.log',
        level: 'error'
    })
    ]
  }));

function storeData(url,appName){
    appDb.addApp({
        appId: Math.floor(Math.random()*100),
        userId:"testUser",
        app_name:appName,
        timestamp:new Date(),
        status:"ok",
        app_URL:url
    });
}