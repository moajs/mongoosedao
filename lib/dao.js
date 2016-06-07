/*!
 * mongoose-dao - lib/dao.js
 * Copyright(c) 2015 i5ting <shiren1118@126.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

global.Promise = require('bluebird');

var debug = require('debug')('dao');

/**
 * Initialize a new `MongooseDao`.
 *
 * @api public
 */

function MongooseDao (Model){
  if(!Model){
    _err(Model + " is not valid, please check if it is a mongoose model!");
  }
  
  Promise.promisifyAll(Model);
  Promise.promisifyAll(Model.prototype);
  this.model = Model;
  this.pagesize = 20;
}

// create
MongooseDao.prototype.create = function(doc, cb) {
  return this.model.create(doc, cb);
};

// read
MongooseDao.prototype.getById = function(id, cb) {
  return this.model.findOne({_id:id}, cb);
};
 
MongooseDao.prototype.count = function() {
  var query = {};
  var cb;
  //count({a:1},cb)
  if (arguments.length == 2) {
    query   = arguments[0];
    cb      = arguments[1];
  }else{
    //default : count(cb)
    cb      = arguments[0];
  }
  return this.model.count(query, cb);
};

MongooseDao.prototype.query = MongooseDao.prototype.find = MongooseDao.prototype.getByQuery = function() {
  var query, populate, cb;
  // (query, cb)
  if (arguments.length == 2) {
    query   = arguments[0];
    cb  = arguments[1];
  }else  if (arguments.length == 3) {
    // (query, populate, cb)
    // Kitten.find().populate({
    //     path: 'owner'
    //   , select: 'name'
    //   , match: { color: 'black' }
    //   , options: { sort: { name: -1 }}
    // }).exec(function (err, kittens) {
    //   console.log(kittens[0].owner.name) // Zoopa
    // })
    query   = arguments[0];
    populate   = arguments[1];
    cb  = arguments[2];
  } else {
    _err('in ' + Model + " model, check your mongoosedao query method arguments,only support 2 ways: (query, cb) && (query, populate, cb)");
  }
  
  debug('query =', query)
  
  
  if (populate) {
    debug('populate = ', populate)
    return this.model.find(query).populate(populate).exec(cb)
  }
  
  return this.model.find(query, cb);
};

MongooseDao.prototype.all = MongooseDao.prototype.getAll = function(cb) {
  return this.model.find({}, cb);
};

MongooseDao.prototype.one = MongooseDao.prototype.findOne = function(query, cb) {
  return this.model.findOne(query, cb);
};

// update
MongooseDao.prototype.updateById = function(id, update, cb) {
  // console.log('MongooseDao.prototype.updateById' + update);
  return this.updateOne({_id:id}, update, cb);
};

MongooseDao.prototype.updateOne = function(conditions, update, cb) {
  // console.log('MongooseDao.prototype.updateById' + update);
  return this.update(conditions, update , {multi: false}, cb);
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
    _err("MongooseDao.prototype.update param is not valid!")
  }
  
  
  var opt = { multi: true };
  _extend(opt, _options);
  
  return this.model.update(conditions, update, opt, cb);
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
  return this.delete({_id: id}, cb);
};

// pagination
MongooseDao.prototype.latest = MongooseDao.prototype.top = MongooseDao.prototype.first = MongooseDao.prototype.n = function(){
  var n;
  var cb;
  var q = {};
  var sort = {};
  
  // (num, cb)
  if (arguments.length == 2) {
    n   = arguments[0];
    cb  = arguments[1];
  }else  if (arguments.length == 3) {
    // (num, {},cb)
    n   = arguments[0];
    q   = arguments[1];
    cb  = arguments[2];
  }else  if (arguments.length == 4) {
    // (num, {},cb)
    n   = arguments[0];
    q   = arguments[1];
    sort  = arguments[2];
    cb  = arguments[3];
  }else{
    // (cb)
    n   = this.pagesize;
    cb  = arguments[0];
  }

  return this.model.find(q).sort(sort).limit(n).exec(cb);
};

// TODO: impl page by lastId
// db.usermodels.find({'_id' :{ "$gt" :ObjectId("55940ae59c39572851075bfd")} }).limit(20).sort({_id:-1})
MongooseDao.prototype.pageByLastId = function(){
  var n = this.pagesize;;
  var cb;
  var q = {};
  var sort = {_id:-1};
  
  // pageByLastId(lid, cb)
  if (arguments.length == 2) {
    var lid   = arguments[0];
    q = _get_q_by_last_id(lid);
    cb  = arguments[1];
  }else  if (arguments.length == 3) {
    // pageByLastId(lid, count, cb)
    var lid   = arguments[0];
    q = _get_q_by_last_id(lid);
    n   = arguments[1];
    cb  = arguments[2];
  }else  if (arguments.length == 4) {
    // pageByLastId(lid, count, query, cb)
    var lid   = arguments[0];
    q = _get_q_by_last_id(lid);
    n   = arguments[1];
    
    _extend(q, arguments[2]);
    
    cb  = arguments[3];
  }else  if (arguments.length == 5) {
    // pageByLastId(lid, count, query, sort, cb)
    var lid   = arguments[0];
    q = _get_q_by_last_id(lid);
    n   = arguments[1];
    
    _extend(q, arguments[2]);
    
    sort  = arguments[3];
    cb  = arguments[4];
  }else{
    // pageByLastId(lid, cb)
    var lid   = arguments[0];
    q = _get_q_by_last_id(lid);
    cb  = arguments[1];
  }

  return this.model.find(q).sort(sort).limit(n).exec(cb);
};

// private
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

function _get_q_by_last_id(last_id){
  return {
    '_id' : { 
      "$gt" : last_id
    }
  }
}

function _err(msg) {
  throw new Error('[mongoosedao error]: ' + msg);
}

Promise.promisifyAll(MongooseDao);
Promise.promisifyAll(MongooseDao.prototype);
 
module.exports = MongooseDao;