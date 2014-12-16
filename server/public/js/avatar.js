Zepto(function($){

	var config = window.ichat_config;
	

	function main(){
		var current_user = CURRENT_USER.get_current_user();	
		var avatar = current_user.avatar;
		var avatar_url = './images/avatar/'+ avatar +'';
		$("#user_avatar").attr('src', avatar_url);
	}
	
	main()
	
	
	$('#change_avatar_btn').click(function(){
		var a = $("select[name='avatar']").val();
		config.change_avatar(a,function(){
			alert('保存成功');
		});		
	});
	
	$('#avatar_select').change(function(){		
		var avatar = $("#avatar_select").val();
		var avatar_url = './images/avatar/'+ avatar +'';
		$("#user_avatar").attr('src', avatar_url);
	});
});


