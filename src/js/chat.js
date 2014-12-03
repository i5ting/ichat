Zepto(function($){
  console.log('Ready to Zepto!')
	
	var client = new iChatClient({
		url : 'http://at35.com:4567/faye',
		timeout : 120,
		retry		: 5
	});

	
	function bind_send_msg_event(){
		$('.send_msg_btn').click(function(){
			alert('send_msg_btn');
			client.send('foo',{
				text:'dssdjfkjkl'
			},function(){
				alert('Message received by server!');
			},function(error){
				alert('There was a problem: ' + error.message);
			});
		});
	}
	
	setTimeout(function(){
		client.send('foo',{
			text:'dssdjfkjkl'
		},function(){
			alert('Message received by server!');
		},function(error){
			alert('There was a problem: ' + error.message);
		});
	},1000);
	
	function leave(){
		client.leave('foo');
	}
	
	init();
	
	function init(){
		client.join('foo', function(message) {
		  // handle message
			alert(message.text);
			console.log(message);
		});
		
		// 绑定发送按钮事件
		bind_send_msg_event();
	}
	
});
