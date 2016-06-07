# mongoose dao

mongoosedao = mongoose data access object

[![gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![Build Status](https://travis-ci.org/moajs/mongoosedao.png?branch=master)](https://travis-ci.org/moajs/mongoosedao)
[![Dependencies Status](https://david-dm.org/moajs/mongoosedao.png)](https://david-dm.org/moajs/mongoosedao)
[![Coverage Status](https://coveralls.io/repos/moajs/mongoosedao/badge.png)](https://coveralls.io/r/moajs/mongoosedao)

## Features

- crud、分页等实用方法
- 静态方法，便于代码生成
- 内置bluebird，对model和dao都进行了promisify

## Install

    npm install --save mongoosedao

## Usages


```
require('./db');

var User = require('./User');

User.create({"username":"sss","password":"password"},function(err, user){
  console.log(user);
});

User.delete({"username":"sss","password":"password"},function(err, user){
  console.log(user);
});
```

## DEBUG

use tj/debug module for debug

```
DEBUG=dao 
```

## 扩展

User.model is a mongoose model. You can do all as mongoose model。

more features

- statics
- methods
- pre or post hook
- aggregation

比如直接扩展方法

```
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('bluebird');

var User = require('../app/models/user');

User.schema.statics.find_by_openid = function(openid, cb) {
  console.log('find_by_openid...')
};

// 此处必须要重置一下model
User = mongoose.model('User', User.schema);

var MongooseDao       = require('mongoosedao');

var UserDao = new MongooseDao(Test);

UserDao.model.find_by_openid({}, function(err,docs){
  // console.dir(docs);
  process.exit();
}); 
```

当然我们更推荐的是在model定义上直接加

```
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

var MongooseDao = require('../../');

 
var MeetingDao = new MongooseDao(UserModel);
 
module.exports = MeetingDao;
```

只要mongoose支持的，使用mongoosedao都可以完成，甚至更好

## API and Test

Test status

- [x] create
- [x] delete      = remove
- [x] deleteAll   = removeAll
- [x] deleteById  = removeById
- [x] getById
- [x] all         = getAll = find({})
- [x] query       = getByQuery = find （support 2 ways: (query, cb) && (query, populate, cb)）
- [x] one         = findOne
- [x] update
- [x] updateOne
- [x] updateById
- [x] pageByLastId
- [x] top(num) && first(num) = n(num) = latest(num)
- [x] count(cb) &* count({},cb)


more see [api doc](api.md)

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request


## 版本历史

- v1.0.8 add mocha test && api.md
- v1.0.5 add query with condition
- v1.0.4 create with saved_doc return;
- v1.0.3 add updateById
- v1.0.2 add deleteById
- v1.0.0 初始化版本


## 欢迎fork和反馈

- write by `i5ting` shiren1118@126.com

如有建议或意见，请在issue提问或邮件

## License

this repo is released under the [MIT
License](http://www.opensource.org/licenses/MIT).


[npm-image]: https://img.shields.io/npm/v/mongoosedao.svg?style=flat-square
[npm-url]: https://npmjs.org/package/mongoosedao
[gitter-image]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/i5ting/mongoosedao?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge