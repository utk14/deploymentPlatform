const mongoose = require('mongoose');
const dateFormat = require('dateformat');

const appSchema = new mongoose.Schema({
    appId:{ type: String, unique: true },
    userId:{ type: String, required: true },
    app_name:{ type: String, required: true },
    timestamp:{ type: Date, default: Date.now },
    status: { type: String, required: true },
    app_URL:{ type: String, required: true, unique: true }
})

const appsModel = mongoose.model('user_apps', appSchema);
module.exports = appsModel;