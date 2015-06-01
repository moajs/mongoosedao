var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 
UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  },
  avatar: String,
  address: String,
  created_at: {
    type: Date,
    "default": Date.now
  }
});

UserSchema.methods.find_by_name = function(cb) {
  return this.model('UserModel').find({
    username: this.username
  }, cb);
};

UserSchema.methods.is_exist = function(cb) {
  var query;
  query = {
    username: this.username,
    password: this.password
  };
  return this.model('UserModel').findOne(query, cb);
};

UserSchema.statics.delete_by_name = function(name, cb_succ, cb_fail) {};

var UserModel = mongoose.model('UserModel', UserSchema);

var MongooseDao = require('../');

 
var MeetingDao = new MongooseDao(UserModel);
 
module.exports = MeetingDao;