var assert = require('chai').assert;
var expect = require('chai').expect;
require('chai').should();
require('log1')
var Promise = require("bluebird");
var mongoose = require('mongoose');

require('./lib/db');

var MongooseDao = require('../');

var Schema = mongoose.Schema;
 
StudentSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

var Student = mongoose.model('Student', StudentSchema);
var StudentDao = new MongooseDao(Student);

LessionSchema = new Schema({
  name: String,
  student: { // student_id
    type: Schema.ObjectId,
    ref: 'Student'
  },
  created_at: {
    type: Date,
    "default": Date.now
  }
});

var Lession = mongoose.model('Lession', LessionSchema);
var LessionDao = new MongooseDao(Lession);


var student = ({
  username: 'i5ting',
  password: '000000'
})

// var lession = new Lession({
//   name: 'English',
// })
  
var _s;
 
describe('MongooseDao', function(){
	before(function(done) {
    // runs before all tests in this block
    StudentDao.deleteAllAsync().then(function(){
      return LessionDao.deleteAllAsync();
    }).then(function(){
      return Student.createAsync(student)
    }).then(function(s){
      _s = s;
      done()
    }).catch(function(err){
      log(err)
    });
  })
	
  describe('#findAsync', function(){
    it('should return ok when lession.student exist', function(done){
      Lession.createAsync({
        name: 'English',
        student: _s._id
      }).then(function(l){
        // log(l)
        return LessionDao.findAsync({},'student')
      }).then(function(lessions){
        // console.log(lessions[0])
        assert.equal(lessions.length > 0, true);
        assert.equal(lessions[0].student.username, 'i5ting');
        done();
      }).catch(function(err){
        log(err)
      });
     
    })
  })

})
