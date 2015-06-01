/*!
 * restful-router - lib/restful-router.js
 * Copyright(c) 2015 i5ting <shiren1118@126.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

function MongooseDao (Model){
    /*if(typeof Model === 'undefined' || Model == null)
        throw new Error('Model can not be null.');
*/
    this.model = Model;
}

MongooseDao.prototype.create = function (doc,callback){
    this.model.create(doc, function (error) {
        if(error) return callback(error);
 
        return callback(null);
    });
};
 
MongooseDao.prototype.getById = function (id, callback) {
    this.model.findOne({_id:id}, function(error, model){
        if(error) return callback(error,null);
 
        return callback(null,model);
    });
};
 
MongooseDao.prototype.countByQuery = function (query, callback) {
    this.model.count(query, function(error, model){
        if(error) return callback(error,null);
 
        return callback(null,model);
    });
};

MongooseDao.prototype.getByQuery = function (query,fileds,opt,callback) {
    this.model.find(query, fileds, opt, function(error,model){
        if(error) return callback(error,null);
 
        return callback(null,model);
    });
};
 

MongooseDao.prototype.getAll = function (callback) {
    this.model.find({}, function(error,model){
        if(error) return callback(error,null);
 
        return callback(null, model);
    });
};
/*
MongooseDao.prototype.getAllModelByOption = function (opt, callback) {
    MongooseDao.getModelByQuery({},{},opt, callback);
};*/
 

MongooseDao.prototype.delete = function (query, callback){
    this.model.remove(query, function(error){
        if(error) return callback(error);
 
        return callback(null);
    });
};

MongooseDao.prototype.deleteById = function (id, callback) {
  console.log('MongooseDao.prototype.deleteById');
    this.delete({_id:id}, callback);
};
 
MongooseDao.prototype.update = function( conditions, update ,options, callback) {
    this.model.update(conditions, update, options, function (error) {
        if(error) return callback(error);
 
        return callback(null);
    });
};
 
module.exports = MongooseDao;