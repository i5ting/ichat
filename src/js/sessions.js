Zepto(function($){
  console.log('Ready to Zepto!')

	var config = window.ichat_config
		
	var myScroll;
	var current_user = CURRENT_USER.get_current_user();	
	var current_session = CURRENT_SESSION.get_current_session();
	var user_sessions = USER_SESSION.get_user_sessions();
	
	var current_user_uid = current_user['_id'];
	var current_session_id = current_session['sid'];
	var current_session_name = current_session['name'];

		
	function log(t){
		console.log('[LOG] '+ t);
	}
	

	
	//TODO: 考虑和index.js里的sessions循环，能否避免，整合到一处
	function init_job_for_sessions(sessions){
		for(var i in sessions){
			single_session_process(sessions[i]);
		}
	}

	function single_session_lisner(one_session){
		var current_session_id = one_session['sid'];
		var current_topic = config.get_current_topic_with_session_id(current_session_id);
		
		client.join(current_topic, function(message) {
		  // handle message
			log('收到的信息是：'+message.text);
			
			//TODO: 写到websql里
			save_message_to_web_sql(message);
		});
	
	}
	
	function save_message_to_web_sql(message){
		
		var msg = new Message();
		msg.values(message);
	}
 
	
});
	