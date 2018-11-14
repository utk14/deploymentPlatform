const env = require('./env_config');
const passport = require('passport');
var GitlabStrategy = require('passport-gitlab2').Strategy;
const keys = require('./config/keys');
const db = require('./db/db');
const { addUser } = require("./db/db.users");
const config = require('config');
db();
console.log("auth",env.HPORT);
passport.serializeUser((profile, done) => {
    done(null, profile);
})

passport.deserializeUser((profile, done) => {
    done(null, profile);
})

passport.use(new GitlabStrategy({
    clientID: "45b48802bceda2e8c52053988cf5d81baf654f22c489f99cec997ffbd3f8cb73",
    clientSecret: "03283277e97a54719c35abb3806b834a0af7963726451595d70f37be82f523f6",
    callbackURL: `http://localhost:${env.HPORT}/auth/gitlab`
},

    function (token, tokenSecret, profile, done) {
        const req_obj = { //it is user data to be saved in users table
            userId: profile.id,
            userName: profile.username,
            displayName: profile.displayName,
            email: profile._json.email,
            profileUrl: profile.profileUrl
        }
        const obs = addUser(req_obj);
        obs.subscribe(doc => console.log("subscribe ", doc));
        done(null, profile);
    }
));

