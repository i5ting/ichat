// <script src="./lib/js/iChatClient.js"></script>
// <script src="./js/config.js"></script>

window.ichat_config = {
	version: 'v0.1.0',
	chat_server_url:'127.0.0.1:4567',
	// chat_server_url:'127.0.0.1:4567',
	chat_server_options:{
		url : 'http://at35.com:4567/faye',
		timeout : 120,
		retry		: 5
	},
	get_websql_db:function(){
		if(!window.openDatabase) {
			alert("Databases are not supported in this browser");
		}
			
		return openDatabase('db_ichat', '1.0', 'DB of im', 2 * 1024 * 1024); 
	},
	
	exec_sql:function(sql){
		var db = this.get_websql_db();
		
		db.transaction(function (tx) {
			tx.executeSql(sql);
		});
	},
	/** Select Row from Table **/ 
	exec_sql_with_result:function(query, cb){ // <-- extra param
	   var result = [];
		 var db = this.get_websql_db();
		 
	   db.transaction(function (tx) {
	      tx.executeSql(query, [], function(tx, rs){
	         for(var i=0; i<rs.rows.length; i++) {
	            var row = rs.rows.item(i)
	            result[i] = { id: row['id'],
	                          name: row['name']
	            }
	         }
	         console.log(result);
	         cb(result); // <-- new bit here
	      }, this.sql_error_handler);
	   });
	},
	sql_error_handler:function(){
		alert('sql 执行出错');
	},
	get_client:function(){
		return new iChatClient(this.chat_server_options);
	},
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
	,
	get_current_topic_with_session_id:function(current_session_id){
		return 'foo' + '_' + current_session_id;
	}
	//user
	,
	get_current_user: function(){
		return CURRENT_USER.get_current_user();	
	}	,
	get_current_session: function(){
		return CURRENT_SESSION.get_current_session();
	}	,
	get_user_sessions: function(){
		return USER_SESSION.get_user_sessions();
	},
	
	// messsage
	/**
	 * 1. 消息体本身（支持各种类型）
	 * 2. 用户信息
	 * 3. 会话信息
	 */
	get_msg: function(msg){
		var current_user = this.get_current_user();	
		var current_session = this.get_current_session();
		var user_sessions = this.get_user_sessions();
	
		var current_user_uid = current_user['_id'];
		var current_user_avatar = current_user['avatar'];

		var current_session_id = current_session['sid'];
		var current_session_name = current_session['name'];
		
		var _msg = msg;
		
		$.extend(_msg, {
			// 整合用户信息
			uid		: current_user_uid,
			avatar: current_user_avatar
		}, {
			// 整合会话信息
			sid 	: current_session_id,
			sname	: current_session_name
		});
		
		return _msg;
	}
}

