Zepto(function($){
  console.log('Ready to Zepto!')
	
	var config = window.ichat_config
	
	function log(t){
		console.log('[login.html LOG] '+ t);
	}
	
	var current_user = CURRENT_USER.get_current_user();	
	$('.logout_container').hide();
	
	setTimeout(function(){
		if(current_user){
			var username = current_user.username;
			var password = current_user.password;
			var avatar = current_user.avatar;
			var address = current_user.address;
			var _id = current_user['_id'];
			var create_at = current_user.create_at;
		
			$('.user_info_container').html('欢迎您，' + username + '。您已经登陆');
			$('.login_container').hide();
			$('.logout_container').show();
			
			var avatar_url = './images/avatar/'+ avatar +'';
			$("#user_avatar").attr('src', avatar_url);
		}else{
			$('.user_info_container').html('您还没有登陆哦');
			$('.logout_container').hide();
			setTimeout(function(){
				$('.login_container').show();
			},2000);
		}
	},200);
 
	$('#clear_history_btn').click(function(){
		config.clear_history();
		alert('清理完成！');
	});
	
});
