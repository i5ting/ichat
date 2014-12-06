function a(req, res) {
	var User = req.model.UserModel;
	//
	var username = req.body.username;
	
	User.remove({username : username}, function (err) {
		if (err) {
			return res.status(200).json({
			 	 data: {},
				 status:{
				 	 code : err.code,
					 msg  : 'remove user failed;' + err.name + ' : ' + err.err
				 }
			 }); 
		}else{
	  	return res.status(200).json({
	  	 	 data:{},
	  		 status:{
	  			 code: 0,
	  			 msg : 'remove user success'
	  		 }
	  	 });
		}
	});	
}


module.exports =  a;