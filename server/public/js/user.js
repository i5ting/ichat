Zepto(function($){
  console.log('Ready to Zepto!')
	
	var config = window.ichat_config
		
	function log(t){
		console.log('[LOG] '+ t);
	}
	
	//		 {
	// 			    "data": {
	// 			        "_id": "547fda0caaa020ae629865df",
	// 			        "username": "sang",
	// 			        "password": "000000",
	// 			        "avatar": "avatar.png",
	// 			        "address": "beijing",
	// 			        "__v": 0,
	// 			        "create_at": "2014-12-04T03:50:36.108Z"
	// 			    },
	// 			    "status": {
	// 			        "code": 0,
	// 			        "msg": "login success"
	// 			    }
	// 			}
	function register(obj){
		$.post(config.get_api_user_register_url(),{
			username:'sang',
			password:'000000',
			avatar:'avatar.png',
			address:'beijing'
		},function(data){
			// server response 
			log(data);
			save_data_to_local_storage(data);	
			
			if(data.status.code == 0){			
				var current_user = data.data;
				CURRENT_USER.set_current_user(current_user);
			
				// 会话
				sessions  = data.data.sessions;
				list(sessions);
				window.sessions = sessions
			}else{
				alert(data.status.msg);
			}
		
		});
	}
	

	 
	function main(){
		// 获取session列表
		get_sessions_info();
	}
	
	main();
});
