Zepto(function($){
  console.log('Ready to Zepto!')
	// Global
	var contact_storage = new CurrentUserContactStorage();
	var myScroll;
	
	function log(t){
		console.log('[LOG] '+ t);
	}
	
	function get_contacts_info(){
		var api = new StaticApi();
		var url = api.get_contact_url();
		
		$.get(url,function(data){
			log(data);
			// 会话
			sessions  = data.data.contacts;

			// 存储到数据库中
			contact_storage.save_to_db(sessions);
			
			// dom write
			write_dom_with_current_user_contacts();
			
			test_search_5();
		});
	}
	
	function write_dom_with_current_user_contacts(){
		var contacts = contact_storage.get_contacts_array();
		for(var i in contacts){
			var contact = contacts[i];
			
			//for render
			var html = get_contacts_html(contact)
			$('#contact_container').append(html);
		}
		
		myScroll.refresh();
	}
	
	function test_search_5(){
		var arr = contact_storage.search_5("李");
		console.log(arr);
	}
	
	function write_dom_with_search_contacts(val){
		var contacts = contact_storage.search_5(val);
		$('#contact_container').html('');
		for(var i in contacts){
			var contact = contacts[i];
			
			//for render
			var html = get_contacts_html(contact)
			$('#contact_container').append(html);
		}
	}

	function get_contacts_html(contact){
		var html = "<li class='table-view-cell media'>"
							    +"<a href='user_details.html' data-ignore='push' data-transition='slide-out'>"
							    +"<span class='media-object pull-left'>"
										+"<img class='media-object pull-left' style='width: "+ ichat_config.contact_cell_height +"px;' src='images/avatar/"+ contact.avatar +"'>"
									+"</span>"
							    +"<div class='media-body media_address_name'>"
							      + contact.name
							    +"</div>"
							    +"</a>"
							 +"</li>";
		
		return html;
	}
	
	/**
	 * 自动滚动到最后一条
	 */
	function scroll_to_bottom(){
		// dom变化，所以这里强制刷新一下。
 		myScroll.refresh();
		// 定位到最后一个li
		var c = $('#chat_container_id li').length;
		myScroll.scrollToElement(document.querySelector('#scroller li:nth-child(' + c + ')'))
	}
	
	function init_iscroll_for_msg_container(){
		myScroll = new IScroll('#wrapper', { mouseWheel: true, click: true });
		
		document.addEventListener('touchmove', function (e) { 
			e.preventDefault(); 
		}, false);
		
		myScroll.refresh();
	}
	
	
	function main(){
		init_iscroll_for_msg_container();
		
		// 获取联系人列表
		get_contacts_info();
	}
	
	main();

	$("#contact_search_id").change(function() {
		var val = $("#contact_search_id").val();
		if($.trim(val) == ''){
			write_dom_with_current_user_contacts();
		}else{
			write_dom_with_search_contacts(val);
		}
		
		myScroll.refresh();
	});
	
	$('.bar_right_add').click(function(){
		$(".group_chat_box").toggle();
	})
});
