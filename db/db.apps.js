const appsModel = require('../db/models/apps');
const dateFormat = require('dateformat');
const { Subject } = require('rxjs');
let s = new Subject();

function addApp(req) {
  const app = new appsModel(req);
  app.save();
}

function findAndUpdateApp(req) {
  appsModel.findOneAndUpdate(req, {
    timestamp: dateFormat(new Date, "dddd, dS mmmm, yyyy, h:MM:ss TT")
  }, {
      upsert: true,
      new: true
    }, (error, doc) => {
      try {
        s.next(doc)
      } catch (error) {
        s.error(error)
      }
    })
  return s;
}

function getUserApps() {
  return new Promise((resolve, reject) => {
    appsModel.find(null, function (err, doc) {
      resolve(doc);
    });
  })

}

function getAppByAppURL(req) {
  appsModel.find(req, function (err, doc) {
    try {
      s.next(doc)
    } catch (error) {
      s.error(error)
    }
  })
  return observable;
}

function deleteApp(req) {
  appsModel.findOneAndDelete({ app_URL: req.app_URL, userId: req.userId, appId: req.appId }, function (err, doc) {
    try {
      s.next(doc)
    } catch (error) {
      s.error(error)
    }
  })
  return s;
}

module.exports = {
  addApp: addApp,
  findAndUpdateApp: findAndUpdateApp,
  getUserApps: getUserApps,
  getAppByAppURL: getAppByAppURL,
  deleteApp: deleteApp
}