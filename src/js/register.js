Zepto(function($){
  console.log('Ready to Zepto!')
	
	var config = window.ichat_config
	
	function log(t){
		console.log('[login.html LOG] '+ t);
	}
	
	function login_success_callback(){
		alert('注册并登陆成功');
		window.location.href='index.html'
	}
	
	function register(username, password, avatar, address){
		log(config.get_api_user_login_url());
		$.post(config.get_api_user_register_url(),{
			username:'' + username,
			address:'' + address,
			avatar:'' + avatar,
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
	
	$('#register_btn').click(function(){
		var username = $("input[name='username']").val();
		var	password = $("input[name='password']").val();
		var	avatar = $("input[name='avatar']").val();
		var	address = $("input[name='address']").val();
		
		if($.trim(username) == ''){
			alert('用户名为必选项，请确认是否填写');
			return;
		}
		
		log(username);
		log(password);
		register(username, password, avatar, address);
	});

});
