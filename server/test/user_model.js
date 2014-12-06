var assert = require('chai').assert;
var expect = require('chai').expect;
require('chai').should();
var model = require('../db/index');
// mongoose config
var mongoose = require('mongoose')  
  , connectionString = 'mongodb://localhost:27017/exam_weixin_teset'
  , options = {};

options = {  
  server: {
    auto_reconnect: true,
    poolSize: 10
  }
};

mongoose.connect(connectionString, options, function(err, res) {  
  if(err) {
    console.log('[mongoose log] Error connecting to: ' + connectionString + '. ' + err);
  } else {
    console.log('[mongoose log] Successfully connected to: ' + connectionString);
  }
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoose connection error:'));
db.once('open', function callback () {
  // yay!
	console.log('mongoose open success');
});

describe('UserModel', function(){
	before(function() {
    // runs before all tests in this block
		// create a user a new user
		var testUser = new User({
		    username: 'sang_test1',
		    password: 'Password123'
		});
		
		testUser.save(function(err,user) {
		    if (err) throw err;
				console.log('add mock data ok');
		});
		
  })
  after(function(){
    // runs after all tests in this block
		User.remove({}, function (err) {
		  if (err) return handleError(err);
		  // removed!
			console.log('remove all data');
		});
		
  })
  beforeEach(function(){
    // runs before each test in this block
  })
  afterEach(function(){
    // runs after each test in this block
  })
	
  describe('#save()', function(){
    it('should return sang_test2 when user save', function(done){

				var User = model.UserModel;
  			// // save user to database
  			testUser.save(function(err,user) {
  			    if (err) throw err;
						
  					assert.equal(user.username, 'sang_test2');
						done()
  			});
    })
  })

 
  })
})