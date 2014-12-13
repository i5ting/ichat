function avatar(req, res) {
	var User = req.model.UserModel;
	//
	var uid = req.body.uid;
	var pic = req.body.pic;
	
	User.where({ _id: uid }).update({ avatar: pic }, function (err) {
		if (err) {
			return res.status(200).json({
			 	 data: {},
				 status:{
				 	 code : err.code,
					 msg  : 'update user avatar failed;' + err.name + ' : ' + err.err
				 }
			 }); 
		}else{
	  	return res.status(200).json({
	  	 	 data:{},
	  		 status:{
	  			 code: 0,
	  			 msg : 'update user avatar success'
	  		 }
	  	 });
		}
	});	
}


module.exports = avatar;