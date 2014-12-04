Zepto(function($){
  console.log('Ready to Zepto!')
	
	var config = window.ichat_config
	
	function log(t){
		console.log('[login.html LOG] '+ t);
	}
	
	function login_success_callback(){
		alert('登陆成功');
		window.location.href='index.html'
	}
	
	function login(username, password){
		log(config.get_api_user_login_url());
		$.post(config.get_api_user_login_url(),{
			username:'' + username,
			password:'' + password
		},function(data){
			// server response 
			log(data);
			
			if(data.status.code == 0){			
				var current_user = data.data;
				CURRENT_USER.set_current_user(current_user);
				
				// 登陆成功
				login_success_callback();
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
