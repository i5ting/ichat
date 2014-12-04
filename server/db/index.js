var mongoose = require('mongoose');

// mongoose config
var mongoose = require('mongoose')  
  , connectionString = 'mongodb://localhost:27017/ichat'
  , options = {};
	
options = {  
  server: {
    auto_reconnect: true,
    poolSize: 5
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

exports.UserModel = require('./user');;