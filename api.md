# API

## create

    Meeting.create({"username":"sss","password":"password"},function(err, user){
      
    });

## delete

    Meeting.delete({"username":"fixture-user"},function(err){

    });


## deleteAll

    Meeting.deleteAll(function(err){

    });

## getById

    Meeting.getById(user._id, function(err, new_user){

    });
    
## getAll

    Meeting.getAll(function(err, users){
      
    });
    
## one

    Meeting.one({"username":"sss","password":"password"},function(err, user){
      if(err){
        console.dir(err);
      }
    });
## query

## all