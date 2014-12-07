Zepto(function($){
  console.log('Ready to Zepto!')
		
	function log(t){
		console.log('[LOG] '+ t);
	}
	
	function get_contacts_info(){
		$.get('http://at35.com:4566/contact.json',function(data){
			log(data);
			// 会话
			sessions  = data.data.contacts;
			list(sessions); 
		});
	}
	
 
	function list(contacts){
		for(var i in contacts){
			var contact_group = contacts[i];
			
			log(contact_group);
			
			
			//for render
			//var html = get_list_item_html(session)
			//$('#chat_session_container').append(html);
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
		var chat_page = 'chat.html';
		var html = "<li class='table-view-cell'>"
          +"<a href='" + chat_page + "' data-ignore='push' data-transition='fade'>"
            +"<img class='media-object pull-left' src='http://placehold.it/42x42'>"
            +"<div class='media-body'>"
              + "<span>昨天12:00</span><p style='color:#000;width:70%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'>"+session.name + "</p>"
              +"<p style='font-size:12px;color:#bbb;width:90%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'>"+ session.last_message + "</p>"
            +"</div>"
          +"</a>"
		+"</li>";
		
		return html;
	}
	
	function get_p2g_html(session){
		var html = "<li class='table-view-cell'>"
          +"<a href='chat.html' data-ignore='push' data-transition='fade'>"
            +"<img class='media-object pull-left' src='http://placehold.it/42x42'>"
            +"<div class='media-body'>"
				+ "<span>昨天12:00</span><p style='color:#000;width:70%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'>"+ session.name + "</p>"
              +"<p style='font-size:12px;color:#bbb;width:90%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'>"+ session.last_message + "</p>"
            +"</div>"
          +"</a>"
		+"</li>";
		
		return html;
	}
	
	$('a').live('click',function(){
		var c = $(this).parent();
		var i  = $('#chat_session_container').children('li').index(c)
		
		var sesssion = window.sessions[i];

		storage_current_sesssion(sesssion);
		log('选择了第 '+i + ' 个会话。');
	});
	
	function main(){
		// 获取联系人列表
		get_contacts_info();
	}
	
	main();

	$('.bar_right_add').click(function(){
		$(".group_chat_box").toggle();
	})
});
