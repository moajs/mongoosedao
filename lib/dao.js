/*!
 * mongoose-dao - lib/dao.js
 * Copyright(c) 2015 i5ting <shiren1118@126.com>
 * MIT Licensed
 */

"use strict";

/**
 * Initialize a new `MongooseDao`.
 *
 * @api public
 */

function MongooseDao (Model){
  if(!Model){
    throw new Error(Model + " is not valid, please check if it is a mongoose model!");
  }
  this.model = Model;
}

// create
MongooseDao.prototype.create = function(doc, cb) {
  this.model.create(doc, cb);
};

// read
MongooseDao.prototype.getById = function(id, cb) {
  this.model.findOne({_id:id}, cb);
};
 
MongooseDao.prototype.countByQuery = function(query, callback) {
  this.model.count(query, function(error, model){
    if(error) {
      return callback(error,null);
    }

    return callback(null,model);
  });
};

MongooseDao.prototype.query = MongooseDao.prototype.find = MongooseDao.prototype.getByQuery = function(query, cb) {
  this.model.find(query, cb);
};

MongooseDao.prototype.all = MongooseDao.prototype.getAll = function(cb) {
  this.model.find({}, cb);
};

MongooseDao.prototype.one = MongooseDao.prototype.findOne = function(query, cb) {
  this.model.findOne(query, cb);
};

// update
MongooseDao.prototype.updateById = function(id, update, cb) {
  // console.log('MongooseDao.prototype.updateById' + update);
  this.updateOne({_id:id}, update, cb);
};

MongooseDao.prototype.updateOne = function(conditions, update, cb) {
  // console.log('MongooseDao.prototype.updateById' + update);
  this.update(conditions, update , {multi: false}, cb);
};
 
// way1: conditions, update , cb
// way2: conditions, update ,options, cb
MongooseDao.prototype.update = function() {
  var conditions, update ,options, cb;
  
  var _options;
  if (arguments.length == 3) {
    _options = {}
    conditions = arguments[0];
    update = arguments[1];
    cb = arguments[2];
  }else if(arguments.length == 4) {
    conditions = arguments[0];
    update = arguments[1];
    _options = arguments[2];
    cb = arguments[3];
  }else{
    throw new Error("MongooseDao.prototype.update param is not valid!")
  }
  
  
  var opt = { multi: true };
  _extend(opt, _options);
  
  this.model.update(conditions, update, opt, cb);
};
 
// delete
MongooseDao.prototype.delete = MongooseDao.prototype.remove = function(query, cb){
  this.model.remove(query, cb);
};

MongooseDao.prototype.deleteAll = MongooseDao.prototype.removeAll = function(cb){
  this.delete({}, cb);
};

MongooseDao.prototype.deleteById = MongooseDao.prototype.removeById = function(id, cb) {
  // console.log('MongooseDao.prototype.deleteById');
  this.delete({_id: id}, cb);
};

function _extend(des, src) { 
  if (!des) { 
    des = {}; 
  } 
  if (src) { 
    for (var i in src) { 
      des[i] = src[i]; 
    } 
  } 
	
  return des; 
} 

module.exports = MongooseDao;