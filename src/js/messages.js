Zepto(function($){
  console.log('Ready to Zepto!')

	var config = window.ichat_config
		
	var myScroll;
	var current_user = CURRENT_USER.get_current_user();	
	
	var user_sessions = USER_SESSION.get_user_sessions();
	
	var current_user_uid = current_user['_id'];
	var current_session_id = current_session['sid'];
	var current_session_name = current_session['name'];

		
	function log(t){
		console.log('[LOG] '+ t);
	}
	
	var client = config.get_client();
 
  // 根据session获得信息
	function get_messages_from_session(session){
		
	}
	
  // 根据当前session获得信息
	function get_messages_from_session(){
		var current_session = CURRENT_SESSION.get_current_session();
		return get_messages_from_session(current_session)
	}
	
	//TODO: 分页
	
});
	