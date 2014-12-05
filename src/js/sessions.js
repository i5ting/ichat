Zepto(function($){
  console.log('Ready to Zepto!')

	var config = window.ichat_config
		
	//TODO: 考虑和index.js里的sessions循环，能否避免，整合到一处
	function init_job_for_sessions(){
		var user_sessions = USER_SESSION.get_user_sessions();
		for(var i in user_sessions){
			var one_session = user_sessions[i];
			single_session_lisner(one_session);
		}
	}

	function single_session_lisner(one_session){
		var session = new SessionLisner(one_session);
		session.start_observe();
	}
	
	init_job_for_sessions();
});
	