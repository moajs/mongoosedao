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
    
## getAll = all

    Meeting.getAll(function(err, users){
      
    });
    
    
equal
    
    Meeting.all(function(err, users){
      
    });
    
equal

    Meeting.query({}, function(err, users){
      
    });

## one

    Meeting.one({"username":"sss","password":"password"},function(err, user){
      if(err){
        console.dir(err);
      }
    });
## query = getByQuery

## all

## updateById

      Meeting.updateById(new_user._id, {
        username: 'updated_user'
      }, function(err, result){
        console.dir(result)

        assert.equal(result.ok, 1);
        assert.equal(result.nModified, 1);
        assert.equal(result.n, 1);
      
        done();
      });

## update

way 1: 3 params

      Meeting.update({'_id': new_user._id}, {
        username: 'updated_user2'
      }, function(err2, result){
        console.dir(err2)
        console.dir(result)

        assert.equal(result.ok, 1);
        assert.equal(result.nModified, 1);
        assert.equal(result.n, 1);
        
        done();
      });
      
way 2: 4 params

      Meeting.update({'_id': new_user._id}, {
        username: 'updated_user3'
      }, {multi: false}, function(err2, result){
        console.dir(err2)
        console.dir(result)

        assert.equal(result.ok, 1);
        assert.equal(result.nModified, 1);
        assert.equal(result.n, 1);
        
        done();
      });