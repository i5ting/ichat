window.ichat_config ={
	version: 'v0.1.0',
	chat_server_url:'127.0.0.1:4567',
	get_chat_server_url : function(){
		retrn 'http://' + this.chat_server_url + '/faye'
	},
	api_server_url:'127.0.0.1:5555',
	get_api_server_url : function(){
		retrn 'http://' + this.api_server_url + '/api/' + this.version;
	},
	get_api_base_url : function(patten){
		retrn this.get_api_server_url()+ patten
	},
	/**
	 * 获取用户注册url
	 */
	get_api_user_register_url : function(){
		retrn this.get_api_base_url('/users/new')
	},
	
}

