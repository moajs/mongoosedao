require('./db');

var Meeting = require('./Meeting');

Meeting.create({"username":"sss","password":"password"},function(err, user){
  console.log(user);
});

Meeting.delete({"username":"sss","password":"password"},function(err, user){
  console.log(user);
});