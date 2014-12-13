Zepto(function($){
  console.log('Ready to Zepto!')
	var config = window.ichat_config;
		
	var myScroll;
	var current_user = config.get_current_user();	
	var current_session = config.get_current_session();
	var user_sessions = config.get_user_sessions();
	
	var current_user_uid = current_user['_id'];
	var current_user_avatar = current_user['avatar'];
	var current_session_id = current_session['sid'];
	var current_session_name = current_session['name'];
	
	var log = config.log;
	
	var client = config.get_client();
	
	var current_topic = config.get_current_topic_with_session_id(current_session_id);
	
 
	/**
	 * 发送消息
	 */
	function bind_send_msg_event(){
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
	function scroll_to_bottom(){
		// dom变化，所以这里强制刷新一下。
 		myScroll.refresh();
		// 定位到最后一个li
		var c = $('#chat_container_id li').length;
		// 如果内容为空，iscroll会报错，或找不到节点的。
		if(c > 0){
			myScroll.scrollToElement(document.querySelector('#scroller li:nth-child(' + c + ')'))
		}
	}
	
	function init_iscroll_for_msg_container(){
		myScroll = new IScroll('#wrapper', { mouseWheel: true, click: true });
	}
	
	init();
	

	function init(){
		var title = '<font color=blue>正在和【'+ current_session_name + '】聊天中</font>';
		$('.title').html(title);
		
		Message.get_messages_with_current_session(function(messages){
			for(var i in messages){
				var msg = messages[i];
				
				// 只收不存，存的事儿交给Message Listners
				write_msg_content_to_dom(msg);
			}
			init_iscroll_for_msg_container();
			scroll_to_bottom()
		});
		
		// 加入到聊天
		client.join(current_topic, function(message) {
		  // handle message
			
			// 只收不存，存的事儿交给Message Listners
			write_msg_content_to_dom(message);
			
			// 自动滚动到最后一条
			scroll_to_bottom();
			
			config.dump_message(message);
		});
		
		// init_iscroll_for_msg_container();
		
		// 绑定发送按钮事件
		bind_send_msg_event();
		
		// 首次进入，不管有多少消息，一定是到最后一条
		scroll_to_bottom();
	}
	
});
