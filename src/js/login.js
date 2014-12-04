Zepto(function($){
  console.log('Ready to Zepto!')
	
	var config = window.ichat_config
	
	function log(t){
		console.log('[login.html LOG] '+ t);
	}
	
	function login(username, password){
		log(config.get_api_user_login_url());
		$.post(config.get_api_user_login_url(),{
			username:'' + username,
			password:'' + password
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
	
	$('#login_btn').click(function(){
		var username = $("input[name='username']").val();
		var	password = $("input[name='password']").val();
		
		login(username, password);
	});
});
