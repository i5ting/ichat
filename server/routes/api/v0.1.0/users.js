var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/new', function(req, res) {
	
	var User = req.model.UserModel;
	//
	// username: { type: String, required: true, index: { unique: true } },
	// password: { type: String, required: true },
	// avatar:String,
	// address:String,
	
	var username = req.body.username;
	var password = req.body.password;
	var avatar = req.body.avatar;
	var address = req.body.address;
	
	var user = new User({ 
		username: username ,
		password: password,
		avatar: avatar,
		address: address
	});
	
	
	user.save(function (err, sur) {
	  if (err) {
	  	 console.error(err);
			 return res.status(200).json({
			 	 data:{},
				 status:{
				 	 code : err.code,
					 msg  : err.name + ' : ' + err.err
				 }
			 }); 
	  }

	 res.status(200).json({
	 	 data:sur,
		 status:{
			 code: 0,
			 msg : 'success'
		 }
	 });
	});
	
});

router.post('/login', function(req, res) {
	var User = req.model.UserModel;
	//
	var username = req.body.username;
	var password = req.body.password;
	
	var user = new User({ 
		username: username ,
		password: password
	});
	
	user.is_exist(function (err, sur) {
	  if (err) {
	  	 console.error(err);
			 return res.status(200).json({
			 	 data:{},
				 status:{
				 	 code : err.code,
					 msg  : err.name + ' : ' + err.err
				 }
			 }); 
	  }

	 res.status(200).json({
	 	 data:sur,
		 status:{
			 code: 0,
			 msg : 'login success'
		 }
	 });
	});
	
});

router.get('/check', function(req, res) {
  res.send('respond with a resource');
});


module.exports = router;
