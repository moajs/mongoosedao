var assert = require('chai').assert;
var expect = require('chai').expect;
require('chai').should();

require('./lib/db');

var User = require('./lib/User');



// User.delete({"username":"sss","password":"password"},function(err, user){
//   console.log(user);
// });

var fixture_id;
describe('MongooseDao', function(){
	before(function(done) {
    // runs before all tests in this block
    
    User.deleteAll(function(err){
      if(err){
        console.log(err);
      }
      
      User.create({"username":"fixture-user","password":"password"},function(err, user){
        // console.log(user);
        fixture_id = user._id;
        done();
      });
    });
    
    
		
  })
  after(function(){
    // runs after all tests in this block
  })
  beforeEach(function(){
    // runs before each test in this block
  })
  afterEach(function(){
    // runs after each test in this block
  })
	
  describe('#MongooseDao()', function(){
    it('should return ok when record create', function(done){
      User.create({"username":"sss","password":"password"},function(err, user){
        assert.equal(user.username, 'sss');
        done();
      });
    })
    
    it('should return ok when record delete fixture-user', function(done){
      User.delete({"username":"fixture-user"},function(err){
        assert.equal(err, null);
        done();
      });
    })
    
    it('should return ok when record deleteById', function(done){
      User.deleteById(fixture_id, function(err){
        assert.equal(err, null);
        done();
      });
    })
    
    it('should return ok when record removeById', function(done){
      User.removeById(fixture_id, function(err){
        assert.equal(err, null);
        done();
      });
    })
    
    it('should return ok when record getById', function(done){
      User.one({"username":"sss","password":"password"},function(err, user){
        if(err){
          console.dir(err);
        }
        // console.dir(user._id)
        User.getById(user._id, function(err, new_user){
          assert.equal(new_user.username, 'sss');
          done();
        });
      });
    })
    
    //
    it('should return ok when record getAll', function(done){
      User.getAll(function(err, users){
        if(err){
          console.dir(err);
        }
        
        // console.dir(users);
        assert.equal(users.length > 0, true);
        done();
      });
    })
    
    it('should return ok when record all', function(done){
      User.all(function(err, users){
        if(err){
          console.dir(err);
        }
        
        // console.dir(users);
        assert.equal(users.length > 0, true);
        done();
      });
    })
    
    
    it('should return ok when record query', function(done){
      User.query({}, function(err, users){
        if(err){
          console.dir(err);
        }
        
        // console.dir(users);
        assert.equal(users.length > 0, true);
        done();
      });
    })
       //
    // it('should return ok when record updateById', function(done){
    //   User.one({"username":"sss","password":"password"},function(err, user){
    //     if(err){
    //       console.dir(err);
    //     }
    //
    //     User.getById(user._id, function(err, new_user){
    //       User.updateById(new_user._id, {
    //         username: 'updated_user'
    //       }, function(err2, result){
    //         // console.dir(result)
    //
    //         assert.equal(result.ok, 1);
    //         assert.equal(result.nModified, 1);
    //         assert.equal(result.n, 1);
    //
    //         done();
    //       });
    //
    //     });
    //   });
    // })
    //
    //
    // it('should return ok when record update', function(done){
    //   User.one({"password":"password"}, function(err, user){
    //     if(err){
    //       console.dir(err);
    //       done(err);
    //     }
    //     User.getById(user._id, function(err, new_user){
    //       // update with 3 params
    //       User.update({'_id': new_user._id}, {
    //         username: 'updated_user2'
    //       }, function(err2, result){
    //         // console.dir(err2)
    //         // console.dir(result)
    //
    //         assert.equal(result.ok, 1);
    //         assert.equal(result.nModified, 1);
    //         assert.equal(result.n, 1);
    //
    //         done();
    //       });
    //
    //     });
    //   });
    // })
    //
    // it('should return ok when record update', function(done){
    //   User.one({"password":"password"}, function(err, user){
    //     if(err){
    //       console.dir(err);
    //       done(err);
    //     }
    //     User.getById(user._id, function(err, new_user){
    //       // update with 4 params
    //       User.update({'_id': new_user._id}, {
    //         username: 'updated_user3'
    //       }, {multi: false}, function(err2, result){
    //         // console.dir(err2)
    //         // console.dir(result)
    //
    //         assert.equal(result.ok, 1);
    //         assert.equal(result.nModified, 1);
    //         assert.equal(result.n, 1);
    //
    //         done();
    //       });
    //
    //     });
    //   });
    // })
    //
    // it('should return ok when record updateOne', function(done){
    //   User.one({"password":"password"}, function(err, user){
    //     if(err){
    //       console.dir(err);
    //       done(err);
    //     }
    //     User.getById(user._id, function(err, new_user){
    //       User.updateOne({'_id': new_user._id}, {
    //         username: 'updated_user4'
    //       }, function(err2, result){
    //         // console.dir(err2)
    //         // console.dir(result)
    //
    //         assert.equal(result.ok, 1);
    //         assert.equal(result.nModified, 1);
    //         assert.equal(result.n, 1);
    //
    //         done();
    //       });
    //
    //     });
    //   });
    // })
    
  })
})
