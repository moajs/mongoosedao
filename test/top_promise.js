var assert = require('chai').assert;
var expect = require('chai').expect;
require('chai').should();

var Promise = require("bluebird");

require('./lib/db');

var Top = require('./lib/Top2');
 
describe('MongooseDao', function(){
	before(function(done) {
    // runs before all tests in this block
    
    Top.deleteAll(function(err){
      if(err){
        console.log(err);
      }

      var files = [];
      for (var i = 0; i < 100; ++i) {
          files.push(Top.createAsync({"username":"fixture-user-" + i,"address":"password" + i}));
      }
      Promise.all(files).then(function() {
          console.log("all the tops were created");
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
  
  // console.dir(      Top)
  // console.log(      Top.model)
	
  describe('Top with Promise', function(){
    it('should return ok when Top count > 0', function(done){
      Top.getAll(function(err, tops){
        if(err){
          console.dir(err);
        }
        
        // console.dir(users);
        assert.equal(tops.length > 0, true);
        done();
      });
    })
  })
  
  describe('#createAsync', function(){
    it('should return ok when Top.createAsync() and result top to then ', function(done){
      Top.createAsync({username: "alfred"}).then(function(top){
        
        // console.log(top)
        assert.equal(top.username, "alfred");
        done();
      })
    })
  })
  
  describe('#allAsync', function(){
    it('should return ok when Top.createAsync() and result top to then ', function(done){
      Top.allAsync().then(function(tops){
        
        // console.log(tops)
        assert.equal(tops.length > 1, true);
        done();
      })
    })
  })
})
