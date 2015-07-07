var assert = require('chai').assert;
var expect = require('chai').expect;
require('chai').should();

var Promise = require("bluebird");

require('./lib/db');

var Top = require('./lib/Top');
 
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
	
  describe('#MongooseDao()', function(){
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
    
    it('should return ok when Top.top().length == 20', function(done){
      Top.top(function(err, tops){
        if(err){
          console.dir(err);
        }
        
        // console.dir(tops.length);
        assert.equal(tops.length == 20, true);
        done();
      });
    })
    
    it('should return ok when Top.first().length == 20', function(done){
      Top.first(function(err, tops){
        if(err){
          console.dir(err);
        }
        
        // console.dir(tops.length);
        assert.equal(tops.length == 20, true);
        done();
      });
    })
    
    
    it('should return  Top.top().length == 25 whenTop.pagesize = 25', function(done){
      Top.pagesize = 25;
      Top.top(function(err, tops){
        if(err){
          console.dir(err);
        }
        
        // console.dir(tops.length);
        assert.equal(tops.length == 25, true);
        done();
      });
    })
    
    it('should return ok when Top.top(30).length == 30', function(done){
      Top.top(30, function(err, tops){
        if(err){
          console.dir(err);
        }
        
        // console.dir(tops.length);
        assert.equal(tops.length == 30, true);
        done();
      });
    })
    
    
    it('should return ok when Top.top(30).length == 30', function(done){
      Top.top(30, function(err, tops){
        if(err){
          console.dir(err);
        }
        
        // console.dir(tops.length);
        assert.equal(tops.length == 30, true);
        done();
      });
    })
    
    
    it('should return Top.pageByLastId(_id).length == 20 when Top.pagesize = 20;', function(done){
      Top.pagesize = 20;
      Top.top(30, function(err, tops){
        if(err){
          console.dir(err);
        }
        var one = tops[0];
        Top.pageByLastId(one._id, function(err, new_tops){
          // console.dir(new_tops.length);
          assert.equal(new_tops.length == 20, true);
          done();
        });
        
      });
    })
    
    it('should return Top.pageByLastId(_id,50).length == 50 when Top.pageByLastId(_id,50)', function(done){
      Top.pagesize = 20;
      Top.top(30, function(err, tops){
        if(err){
          console.dir(err);
        }
        var one = tops[0];
        Top.pageByLastId(one._id, 50, function(err, new_tops){
          // console.dir(new_tops.length);
          assert.equal(new_tops.length == 50, true);
          done();
        });
        
      });
    })
    
    it('should return Top.pageByLastId(_id,50,sort).length == 50 when Top.pageByLastId(_id,5,{created_at:desc})', function(done){
      Top.pagesize = 20;
      Top.top(30, function(err, tops){
        if(err){
          console.dir(err);
        }
        var one = tops[0];
        
        Top.pageByLastId(one._id, 100, {created_at:'asc'}, function(err, new_tops){
          // console.dir(new_tops.length);
          var first = new_tops[0];
          // console.dir(first)
          Top.pageByLastId(one._id, 100, {created_at:'desc'}, function(err, new_tops2){
            // console.dir(new_tops2.length);
            var last = new_tops2[new_tops.length - 1];
            
            // console.dir(last)
            assert.equal(first.username == last.username, true);
            done();
          });
        });
      });
    })
    
    
  })
})
