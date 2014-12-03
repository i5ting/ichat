Zepto(function($){
  console.log('Ready to Zepto!')
		
	function log(t){
		console.log('[LOG] '+ t);
	}
	
	function get_sessions_info(){
		$.get('http://at35.com:4566/session.json',function(data){
			log(data);
			save_data_to_local_storage(data);	
			
			// 会话
			var sessions = data.data.sessions;
			list(sessions);
		});
	}
	
	function save_data_to_local_storage(data){
		window.localStorage.setItem();
		
	}
	
	function storage_current_user(data){
		window.localStorage.setItem();
		
	}
	
	function storage_user_sesssion(data){
		var sessions = data.data.sessions;
		window.localStorage.setItem();
		
	}
	
	function list(sessions){
		for(var i in sessions){
			var session = sessions[i];
			var html = get_list_item_html(session)
			$('#chat_session_container').append(html);
		}
	}
	
	function get_list_item_html(session){
		var result = '';
		// 单人
		if(session.type == 'p2p'){
			log('当前session属于【单人】聊天');
			result = get_p2p_html(session);
		}else if(session.type == 'p2g'){
			// 群组
			log('当前session属于【群组】聊天');
			result = get_p2g_html(session);
		}else {
			//其他
			log('当前session属于其他聊天');
		}
		
		return result;
	}
	
	function get_p2p_html(session){
		var html = "<li class='table-view-cell'>"
          +"<a href='chat.html' data-ignore='push'>"
            +"<img class='media-object pull-left' src='http://placehold.it/42x42'>"
            +"<div class='media-body'>"
              + session.last_message + "<span>昨天12:00</span>"
              +"<p>Lorem ipsum dolor sit amet...</p>"
            +"</div>"
          +"</a>"
		+"</li>";
		
		return html;
	}
	
	
	function get_p2g_html(session){
		var html = "<li class='table-view-cell'>"
          +"<a href='chats.html' data-ignore='push'>"
            +"<img class='media-object pull-left' src='http://placehold.it/42x42'>"
            +"<div class='media-body'>"
							+ session.last_message + "<span> 昨天12:00 </span>"
              +"<p>Lorem ipsum dolor sit amet...+</p>"
            +"</div>"
          +"</a>"
		+"</li>";
		
		return html;
	}
	
	$('a').live('click',function(){
		var c = $(this).parent();
		var i  = $('#chat_session_container').children('li').index(c)
			
		alert(i);
	});
	
	function main(){
		// 获取session列表
		get_sessions_info();
	}
	
	main();
});
