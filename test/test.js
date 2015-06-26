var assert = require('chai').assert;
var expect = require('chai').expect;
require('chai').should();

require('./lib/db');

var Meeting = require('./lib/Meeting');



// Meeting.delete({"username":"sss","password":"password"},function(err, user){
//   console.log(user);
// });

var fixture_id;
describe('MongooseDao', function(){
	before(function(done) {
    // runs before all tests in this block
    
    Meeting.deleteAll(function(err){
      if(err){
        console.log(err);
      }
      
      Meeting.create({"username":"fixture-user","password":"password"},function(err, user){
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
      Meeting.create({"username":"sss","password":"password"},function(err, user){
        assert.equal(user.username, 'sss');
        done();
      });
    })
    
    it('should return ok when record delete fixture-user', function(done){
      Meeting.delete({"username":"fixture-user"},function(err){
        assert.equal(err, null);
        done();
      });
    })
    
    it('should return ok when record deleteById', function(done){
      Meeting.deleteById(fixture_id, function(err){
        assert.equal(err, null);
        done();
      });
    })
    
    it('should return ok when record removeById', function(done){
      Meeting.removeById(fixture_id, function(err){
        assert.equal(err, null);
        done();
      });
    })
    
    it('should return ok when record getById', function(done){
      Meeting.one({"username":"sss","password":"password"},function(err, user){
        if(err){
          console.dir(err);
        }
        // console.dir(user._id)
        Meeting.getById(user._id, function(err, new_user){
          assert.equal(new_user.username, 'sss');
          done();
        });
      });
    })
    
    //
    it('should return ok when record getAll', function(done){
      Meeting.getAll(function(err, users){
        if(err){
          console.dir(err);
        }
        
        // console.dir(users);
        assert.equal(users.length > 0, true);
        done();
      });
    })
    
    it('should return ok when record all', function(done){
      Meeting.all(function(err, users){
        if(err){
          console.dir(err);
        }
        
        // console.dir(users);
        assert.equal(users.length > 0, true);
        done();
      });
    })
    
    it('should return ok when record updateById', function(done){
      Meeting.one({"username":"sss","password":"password"},function(err, user){
        if(err){
          console.dir(err);
        }

        Meeting.getById(user._id, function(err, new_user){
          Meeting.updateById(new_user._id, {
            username: 'updated_user'
          }, function(err2, result){
            // console.dir(result)

            assert.equal(result.ok, 1);
            assert.equal(result.nModified, 1);
            assert.equal(result.n, 1);
            
            done();
          });
          
        });
      });
    })
    
    
    it('should return ok when record update', function(done){
      Meeting.one({"password":"password"}, function(err, user){
        if(err){
          console.dir(err);
          done(err);
        }
        Meeting.getById(user._id, function(err, new_user){  
          // update with 3 params  
          Meeting.update({'_id': new_user._id}, {
            username: 'updated_user2'
          }, function(err2, result){
            // console.dir(err2)
            // console.dir(result)

            assert.equal(result.ok, 1);
            assert.equal(result.nModified, 1);
            assert.equal(result.n, 1);
            
            done();
          });
          
        });
      });
    })
    
    it('should return ok when record update', function(done){
      Meeting.one({"password":"password"}, function(err, user){
        if(err){
          console.dir(err);
          done(err);
        }
        Meeting.getById(user._id, function(err, new_user){
          // update with 4 params
          Meeting.update({'_id': new_user._id}, {
            username: 'updated_user3'
          }, {multi: false}, function(err2, result){
            // console.dir(err2)
            // console.dir(result)

            assert.equal(result.ok, 1);
            assert.equal(result.nModified, 1);
            assert.equal(result.n, 1);
            
            done();
          });
          
        });
      });
    })
    
  })
})
