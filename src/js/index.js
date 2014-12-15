Zepto(function($){
  console.log('Ready to Zepto!')
	var myScroll;
	
	function log(t){
		console.log('[LOG] '+ t);
	}
	
	function get_sessions_info(){
		var api = new StaticApi();
		var url = api.get_session_url();
		
		$.get(url,function(data){
			log(data);
			save_data_to_local_storage(data);	
			
			// 会话
			sessions  = data.data.sessions;
			list(sessions);
			window.sessions = sessions
			myScroll.refresh();
		});
	}
	
	function save_data_to_local_storage(data){
		storage_user_sesssion(data);
	}
	
	// 存储当前会话列表信息
	function storage_user_sesssion(data){
		var sessions = data.data.sessions;
		USER_SESSION.set_user_sessions(sessions);
	}
	
	// 存储当前会话信息
	function storage_current_sesssion(sesssion){
		CURRENT_SESSION.set_current_session(sesssion);
	}
	
	function list(sessions){
		for(var i in sessions){
			var session = sessions[i];
			
			//for render
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
		var chat_page = 'chat.html';
		var html = "<li class='table-view-cell' onclick='myclick()'>"
          +"<a href='" + chat_page + "' data-transition='fade'>"
            +"<img class='media-object pull-left' src='http://placehold.it/42x42'>"
            +"<div class='media-body'>"
              + "<span>昨天12:00</span><p style='color:#000;width:70%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'>"+session.name + "</p>"
              +"<p style='font-size:12px;color:#bbb;width:90%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'>"+ session.last_message + "</p>"
            +"</div>"
          +"</a>"
		+"</li>";
		
		return html;
	}
	
	var t1 = null;//这个设置为全局
	function myclick(){
	    if (t1 == null){
	        t1 = new Date().getTime();
	    }else{       
	        var t2 = new Date().getTime();
	        if(t2 - t1 < 500){
	            t1 = t2;
	            return;
	        }else{
	            t1 = t2;
	        }
	    }
	    /*自己的代码*/
	}
	function get_p2g_html(session){
		var html = "<li class='table-view-cell'>"
          +"<a href='chat.html' data-transition='fade'>"
            +"<img class='media-object pull-left' src='http://placehold.it/42x42'>"
            +"<div class='media-body'>"
				+ "<span>昨天12:00</span><p style='color:#000;width:70%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'>"+ session.name + "</p>"
              +"<p style='font-size:12px;color:#bbb;width:90%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'>"+ session.last_message + "</p>"
            +"</div>"
          +"</a>"
		+"</li>";
		
		return html;
	}
	
	$('.table-view-cell').live('click',function(){
		var c = $(this);
		var i  = $('#chat_session_container').children('li').index(c)
		var sesssion = window.sessions[i];
		storage_current_sesssion(sesssion);
	});
	
	/**
	 * 自动滚动到最后一条
	 */
	function scroll_to_bottom(){
		// dom变化，所以这里强制刷新一下。
 		myScroll.refresh();
		// 定位到最后一个li
		var c = $('#chat_session_container li').length;
		// 如果内容为空，iscroll会报错，或找不到节点的。
		if(c > 0){
			myScroll.scrollToElement(document.querySelector('#scroller li:nth-child(' + c + ')'))
		}
	}
	
	function init_iscroll_for_msg_container(){
		function iScrollClick(){
			if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) return false;
			if (/Chrome/i.test(navigator.userAgent)) return (/Android/i.test(navigator.userAgent));
			if (/Silk/i.test(navigator.userAgent)) return false;
			if (/Android/i.test(navigator.userAgent)) {
			   var s=navigator.userAgent.substr(navigator.userAgent.indexOf('Android')+8,3);
			   return parseFloat(s[0]+s[3]) < 44 ? false : true
		    }
		}
		
		myScroll = new IScroll('#wrapper', {
			click:iScrollClick(), //调用判断函数
      scrollbars: true,//有滚动条
      mouseWheel: true,//允许滑轮滚动
      fadeScrollbars: true//滚动时显示滚动条，默认影藏，并且是淡出淡入效果
	 	});
	}
	
	function main(){
		init_iscroll_for_msg_container();
		// 获取session列表
		get_sessions_info();
	}
	
	main();

	$('.bar_right_add').click(function(){
		$(".group_chat_box").toggle();
	})
});
