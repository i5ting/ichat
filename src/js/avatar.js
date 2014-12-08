Zepto(function($){

	var config = window.ichat_config;
	
	$('#change_avatar_btn').click(function(){
		var a = $("select[name='avatar']").val();
		config.change_avatar(a);
		alert('保存成功');
	});
});


