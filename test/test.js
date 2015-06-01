require('../db');


Metting = require('./Metting');
 

Metting.create({"username":"sss","password":"password"},function(err, user){
  console.log(user);
});



Metting.delete({"username":"sss","password":"password"},function(err, user){
  console.log(user);
});