# mongoose dao

mongoosedao = mongoose data access object

[![gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![Build Status](https://travis-ci.org/moajs/mongoosedao.png?branch=master)](https://travis-ci.org/moajs/mongoosedao)
[![Dependencies Status](https://david-dm.org/moajs/mongoosedao.png)](https://david-dm.org/moajs/mongoosedao)
[![Coverage Status](https://coveralls.io/repos/moajs/mongoosedao/badge.png)](https://coveralls.io/r/moajs/mongoosedao)


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

## API and Test

Test status

- [x] create
- [x] delete      = remove
- [x] deleteAll   = removeAll
- [x] deleteById  = removeById
- [x] getById
- [x] all         = getAll = find({})
- [x] query       = getByQuery = find
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