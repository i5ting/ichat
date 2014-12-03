Zepto(function($){
  console.log('Ready to Zepto!')
	
	var client = new iChatClient({
		url : 'http://at35.com:4567/faye',
		timeout : 120,
		retry		: 5
	});

	function init(){
		client.join('foo', function(message) {
		  // handle message
			alert(message.text);
			console.log(message);
		});
		
		// 绑定发送按钮事件
		bind_send_msg_event();
	}
	
	function bind_send_msg_event(){
		$('发送按钮').click(function(){
				client.send('foo',{
					text:'dssdjfkjkl'
				},function(){
					alert('Message received by server!');
				},function(error){
					alert('There was a problem: ' + error.message);
				});
		});
	}
	
	function leave(){
		client.leave('foo');
	}
	
	init();
});
