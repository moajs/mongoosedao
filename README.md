# mongoose dao

mongoosedao = mongoose data access object

[![gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]

## Install

    npm install --save mongoosedao

## Usages


```
require('./db');

var Meeting = require('./Meeting');

Meeting.create({"username":"sss","password":"password"},function(err, user){
  console.log(user);
});

Meeting.delete({"username":"sss","password":"password"},function(err, user){
  console.log(user);
});
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request


## 版本历史

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