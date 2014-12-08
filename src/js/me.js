Zepto(function($){
  console.log('Ready to Zepto!')
	
	var config = window.ichat_config
	
	function log(t){
		console.log('[login.html LOG] '+ t);
	}
	
	var current_user = CURRENT_USER.get_current_user();	
	// var current_session = CURRENT_SESSION.get_current_session();
	// var user_sessions = USER_SESSION.get_user_sessions();
	//
	// var current_user_uid = current_user['_id'];
	// var current_session_id = current_session['sid'];
	//
	//
	// // {
		
		if(current_user){
			var username = current_user.username;
			var password = current_user.password;
			var avatar = current_user.avatar;
			var address = current_user.address;
			var _id = current_user['_id'];
			var create_at = current_user.create_at;
		
			$('.user_info_container').html('欢迎您，' + username + '。您已经登陆');
			$('.login_container').hide();
			$('.logout_container').show();
		}else{
			$('.user_info_container').html('您还没有登陆哦');
			$('.logout_container').hide();
			setTimeout(function(){
				$('.login_container').show();
			},2000);
		}
	//     "data": {
	//         "__v": 0,
	//         "username": "marco",
	//         "password": "000000",
	//         "avatar": "avatar.png",
	//         "address": "beijing",
	//         "_id": "54800ffb010d7bd837b4a8e0",
	//         "create_at": "2014-12-04T07:40:43.441Z"
	//     },
	//     "status": {
	//         "code": 0,
	//         "msg": "success"
	//     }
	// }
	
	$('#clear_history_btn').click(function(){
		config.clear_history();
		alert('清理完成！');
	});
	
});
