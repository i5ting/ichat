Zepto(function($){
  console.log('Ready to Zepto!')
	
	var config = window.ichat_config
		
	function log(t){
		console.log('[LOG] '+ t);
	}
	
	function register(){
		$.post(config.get_api_user_register_url(),{
			username:'sang',
			password:'000000',
			avatar:'avatar.png',
			address:'beijing'
		},function(data){
			log(data);
			save_data_to_local_storage(data);	
			
			// 会话
			sessions  = data.data.sessions;
			list(sessions);
			window.sessions = sessions
		});
	}
	 
	function main(){
		// 获取session列表
		get_sessions_info();
	}
	
	main();
});
