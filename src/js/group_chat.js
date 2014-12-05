Zepto(function($){
	$('.table_radio_people li').click(function(){
        var img_src = $(this).find('span.media-object').find('img').attr('src');
        var index=  $(this).index(); 
		if($(this).hasClass('false')){
			$(this).find('input[type = checkbox]').attr('checked',true); 
			$('<img src="'+img_src+'" class="img_'+index+'" />').appendTo($('div.checked_box'));
			$(this).removeClass('false').addClass('true');
		} else if($(this).hasClass('true')){
			$(this).find('input[type = checkbox]').removeAttr('checked'); 
			$('div.checked_box').find($('img.img_'+index+' ')).remove();
			$(this).removeClass('true').addClass('false');
		}  
    })
});

