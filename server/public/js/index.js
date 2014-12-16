Zepto(function($){
  console.log('Ready to Zepto!')
  console.log('Ready to Zepto!')
	var config = window.ichat_config;
		
	var myScroll;
	// var current_user = config.get_current_user();
	// var current_session = config.get_current_session();
	// var user_sessions = config.get_user_sessions();
	//
	// var current_user_uid = current_user['_id'];
	// var current_user_avatar = current_user['avatar'];
	// var current_session_id = current_session['sid'];
	// var current_session_name = current_session['name'];
	
	// var log = config.log;
	//
	var client = config.get_client();
	//
	// var current_topic = config.get_current_topic_with_session_id(current_session_id);
	//
 
	/**
	 * 发送消息
	 */
	function bind_send_msg_event(){
		var current_user = config.get_current_user();	
		var current_session = config.get_current_session();
		var user_sessions = config.get_user_sessions();
	
		var current_user_uid = current_user['_id'];
		var current_user_avatar = current_user['avatar'];
		var current_session_id = current_session['sid'];
		var current_session_name = current_session['name'];
		
		$('.send_msg_btn').click(function(){
			var input_text = $.trim($('#msg_input_text_id').val());
			log('发送信息内容是：'+input_text);
		
			// $.extend(target, [source, [source2, ...]])  ⇒ target
			var msg_content = {
				text: input_text
			}
			var msg_content_str = JSON.stringify(msg_content);
			
			var msg = config.get_msg({
				msg:msg_content_str
			});
			
			var current_topic = config.get_current_topic_with_session_id(current_session_id);
			
			// alert('send_msg_btn');
			client.send(current_topic, msg, function(){
				// alert('Message received by server!');
			},function(error){
				alert('There was a problem: ' + error.message);
			});
		});
	}

	function test(){
		setTimeout(function(){
			var current_topic = config.get_current_topic_with_session_id(current_session_id);
			
			client.send(current_topic, {
				text:'dssdjfkjkl'
			},function(){
				// alert('Message received by server!');
			},function(error){
				alert('There was a problem: ' + error.message);
			});
		},1000);
	}
	
	function leave(){
		client.leave('foo');
	}
	
	function get_message_content(message){
		var msg = new Message();
		var type = '0'
		if(message.type == 'undefined'){
			type = message.type;
		}
		msg.type = type;
		msg.mid = message.mid;
		msg.uid = message.uid;
		msg.uname = message.uname;
		msg.avatar = message.avatar;
		msg.sid = message.sid;
		msg.sname= message.sname;
		msg.timestamp = message.timestamp;
		msg.msg = message.msg;
 	 
		return msg.get_msg_content();
	}
	
	function write_msg_content_to_dom(msg){
		var current_user = config.get_current_user();	
		var current_user_uid = current_user['_id'];
		
		// 默认是别人，左侧
		var is_myself = false;
		
		// 如果当前是自己，则右侧
		if(msg.uid == current_user_uid){
			is_myself = true;
		}
		
		if(is_myself == false){
			write_left_msg_content_to_dom(msg);
		}else{
			write_right_msg_content_to_dom(msg);
		}
	}
	
	function write_left_msg_content_to_dom(msg){
		var msg_content = get_message_content(msg);
		
		var avatar = '../images/avatar/'+ msg.avatar +'';
		//../images/defaultimg.jpg
		var received_msg_html = "<li class='msgitem leftitem clearfix'>"
			+"	<div class='chathead pull-left'>"
			+"		<a target='_blank' href='#'>"
			+"			<img src='" + avatar + "' alt=''><p>"+ msg.uname +"</p>"
			+"		</a>"
			+"	</div>"
			+"	<div class='msg-content-header pull-left'></div>"
			+"	<div class='msg-content-body pull-left'>"
			+"		<a class='close' href='#' style='display: none;'></a>"
			+"		<div class='msg-content'>"
			+"			<p class='abstract'>" + msg_content + "</p>"
			+"			<span class='chat-time text-right'>2012-5-28 3:35</span>"
			+"		</div>"
			+"	</div>"
			+"</li>";
		
		$('#chat_container_id').append(received_msg_html);
	}
	
	function write_right_msg_content_to_dom(msg){
		var msg_content = get_message_content(msg);
		
		var received_msg_html = "<li class='msgitem rightitem clearfix'>"
 				+"<div class='msg-content-header pull-right'></div>"
 				+"<div class='msg-content-body pull-right'>"
 					+"<a class='close' href='#' style='display: none;'>"+"</a>"
 					+"<div class='msg-content'>"
 						+"<p class='abstract'>"+ msg_content +"</p>"
 						+"<span class='chat-time text-right'>2012-5-28 3:35</span>"
 					+"</div>"
 				+"</div>"
 				+"<div class='clear'>"+"</div>"
 			+"</li>"
		
		$('#chat_container_id').append(received_msg_html);
	}
	
	/**
	 * 自动滚动到最后一条
	 */
	function chat_scroll_to_bottom(){
		// dom变化，所以这里强制刷新一下。
 		myScroll.refresh();
		// 定位到最后一个li
		var c = $('#chat_container_id li').length;
		// 如果内容为空，iscroll会报错，或找不到节点的。
		if(c > 0){
			myScroll.scrollToElement(document.querySelector('#scroller li:nth-child(' + c + ')'))
		}
	}
	
	function init_chat_iscroll_for_msg_container(){
		function iScrollClick(){
			if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) return false;
			if (/Chrome/i.test(navigator.userAgent)) return (/Android/i.test(navigator.userAgent));
			if (/Silk/i.test(navigator.userAgent)) return false;
			if (/Android/i.test(navigator.userAgent)) {
			   var s=navigator.userAgent.substr(navigator.userAgent.indexOf('Android')+8,3);
			   return parseFloat(s[0]+s[3]) < 44 ? false : true
		    }
		}
		
		myScroll = new IScroll('#chat_wrapper', {
			click:iScrollClick(), //调用判断函数
      scrollbars: true,//有滚动条
      mouseWheel: true,//允许滑轮滚动
      fadeScrollbars: true//滚动时显示滚动条，默认影藏，并且是淡出淡入效果
	 	});
	}
	
	// init();
	
	function current_session_lisner(){
		var one_session = CURRENT_SESSION.get_current_session();
		var session = new SessionLisner(one_session);
		session.start_observe();
	}
	
	function bind_enter_event(){
		document.onkeydown = function(e){ 
	    var ev = document.all ? window.event : e;
	    if(ev.keyCode==13) {
				$('.send_msg_btn').trigger("click");
      }
		}
	}
	
	function init_with_chat(){
		var current_user = config.get_current_user();	
		var current_session = config.get_current_session();
		var user_sessions = config.get_user_sessions();
	
		var current_user_uid = current_user['_id'];
		var current_user_avatar = current_user['avatar'];
		var current_session_id = current_session['sid'];
		var current_session_name = current_session['name'];
		
		var title = '<font color=blue>正在和【'+ current_session_name + '】聊天中</font>';
		$('.title').html(title);
		
		current_session_lisner();
		
		Message.get_messages_with_current_session(function(messages){
			for(var i in messages){
				var msg = messages[i];
				
				// 只收不存，存的事儿交给Message Listners
				write_msg_content_to_dom(msg);
			}
			init_chat_iscroll_for_msg_container();
			chat_scroll_to_bottom()
		});
		
		var current_topic = config.get_current_topic_with_session_id(current_session_id);
		// 加入到聊天
		client.join(current_topic, function(message) {
		  // handle message
			
			// 只收不存，存的事儿交给Message Listners
			write_msg_content_to_dom(message);
			
			// 自动滚动到最后一条
			chat_scroll_to_bottom();
			
			config.dump_message(message);
		});
		
		init_chat_iscroll_for_msg_container();
		
		// 绑定发送按钮事件
		bind_send_msg_event();
		
		// 绑定发送按钮回车事件
		bind_enter_event();
		
		// 首次进入，不管有多少消息，一定是到最后一条
		chat_scroll_to_bottom();
	}
	
	// --------- index
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
		
		window.index_content = $('.content').html();
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
          +"<a href='" + chat_page + "' data-transition='slide-in'>"
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
          +"<a href='chat.html' data-transition='slide-in'>"
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
		// alert(c);
		var i  = $('#chat_session_container').children('li').index(c)
		var sesssion = JSON.parse($(c).attr('data'));
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
		// get_sessions_info();
	}
	
	main();

	$('.bar_right_add').click(function(){
		$(".group_chat_box").toggle();
	})
	
	//
	// login.js
	var config = window.ichat_config

	function log(t){
		console.log('[login.html LOG] '+ t);
	}

	function login_success_callback(){
		alert('登陆成功');
		window.location.href='/'
	}

	function login(username, password){
		log(config.get_api_user_login_url());
		$.post(config.get_api_user_login_url(),{
			username:'' + username,
			password:'' + password
		},function(data){
			// server response 
			log(data);
		
			if(data.status.code == 0){			
				var current_user = data.data;
				CURRENT_USER.set_current_user(current_user);
			
				// 登陆成功
				login_success_callback();
			}else{
				alert(data.status.msg);
			}
	
		});
	}

	function login_init(){
		$('#login_btn').click(function(){
			var username = $("input[name='username']").val();
			var	password = $("input[name='password']").val();
			log(username);
			log(password);
			login(username, password);
		});

		$('#logout_btn').live('click',function(){
			CURRENT_USER.remove_current_user();
			window.location.href='me.html'
		});
	}
	
	window.addEventListener('push', function(e){
		// alert(111);
		var url = e.detail.state.url;

		if(case_one(url,/chat\.html/g)){
			// alert("聊天");
			init_with_chat();
		}
		
		if(case_one(url,/me\.html/g)){
			// alert("聊天");
			login_init()
		}
		
		
		if(case_one(url,/\//g)){
			// alert("首页");
			// $('.content').html(index_content)
			main();
		}
		
		function case_one(url, pattern){
			return (url.match(pattern)) instanceof Array;
		}
	});
});

