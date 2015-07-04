var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require("bluebird");

TopSchema = new Schema({
  username: String,
  address: String,
  created_at: {
    type: Date,
    "default": Date.now
  }
});

var TopModel = mongoose.model('TopModel', TopSchema);

var MongooseDao = require('../../');


Promise.promisifyAll(TopModel);
Promise.promisifyAll(TopModel.prototype);
 
var MeetingDao = new MongooseDao(TopModel);

Promise.promisifyAll(MeetingDao);
// Promise.promisifyAll(MeetingDao.prototype);
 
module.exports = MeetingDao;