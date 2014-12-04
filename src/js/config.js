window.ichat_config = {
	version: 'v0.1.0',
	chat_server_url:'127.0.0.1:4567',
	// chat_server_url:'127.0.0.1:4567',
	get_chat_server_url : function(){
		return 'http://' + this.chat_server_url + '/faye'
	},
	api_server_url:'at35.com:5555',
	//api_server_url:'127.0.0.1:5555',
	get_api_server_url : function(){
		return 'http://' + this.api_server_url + '/api/' + this.version;
	},
	get_api_base_url : function(patten){
		return this.get_api_server_url()+ patten
	},
	/**
	 * 获取用户注册url
	 */
	get_api_user_register_url : function(){
		return this.get_api_base_url('/users/new')
	},
	/**
	 * 用户登陆
	 */
	get_api_user_login_url : function(){
		return this.get_api_base_url('/users/login')
	}
	
}

