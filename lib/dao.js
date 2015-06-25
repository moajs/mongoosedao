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
  /*if(typeof Model === 'undefined' || Model == null)
      throw new Error('Model can not be null.');*/
  this.model = Model;
}

MongooseDao.prototype.create = function(doc, cb) {
  this.model.create(doc, cb);
};
 
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

MongooseDao.prototype.query = MongooseDao.prototype.getByQuery = MongooseDao.prototype.getAll = function(query, cb) {
  this.model.find(query, cb);
};

MongooseDao.prototype.all = function(cb) {
  this.model.find({}, cb);
};

MongooseDao.prototype.one = function(query, cb) {
  this.model.findOne(query, cb);
};

MongooseDao.prototype.delete = function(query, cb){
  this.model.remove(query, cb);
};

MongooseDao.prototype.deleteAll = function(cb){
  this.delete({}, cb);
};


MongooseDao.prototype.deleteById = function(id, callback) {
  console.log('MongooseDao.prototype.deleteById');
  this.delete({_id:id}, callback);
};

MongooseDao.prototype.updateById = function(id, update, callback) {
  console.log('MongooseDao.prototype.updateById');
  this.update({_id:id}, update , {}, callback);
};
 
MongooseDao.prototype.update = function(conditions, update ,options, callback) {
  this.model.update(conditions, update, options, function (error) {
    if(error) {
      return callback(error);
    }

    return callback(null);
  });
};
 
module.exports = MongooseDao;