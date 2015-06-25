# API

## delete

    Meeting.delete({"username":"fixture-user"},function(err){
      assert.equal(err, null);
      done();
    });


## deleteAll

    Meeting.deleteAll(function(err){
      if(err){
        console.log(err);
      }
    });


## getById

    Meeting.getById(user._id, function(err, new_user){
      assert.equal(new_user.username, 'sss');
      done();
    });