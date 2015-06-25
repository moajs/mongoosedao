var assert = require('chai').assert;
var expect = require('chai').expect;
require('chai').should();

require('./lib/db');

var Meeting = require('./lib/Meeting');



// Meeting.delete({"username":"sss","password":"password"},function(err, user){
//   console.log(user);
// });

describe('MongooseDao', function(){
	before(function(done) {
    // runs before all tests in this block
    
    Meeting.deleteAll(function(err){
      if(err){
        console.log(err);
      }
      
      Meeting.create({"username":"fixture-user","password":"password"},function(err, user){
        // console.log(user);
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
	
  describe('#create()', function(){
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
    
  })
})
