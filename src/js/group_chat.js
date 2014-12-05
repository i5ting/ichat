$(function(){
  $('.table_radio_people li input[type = checkbox]').click(function(){ 
    var img_src = $(this).parent('li').find('span.media-object').find('img').attr('src');
    var index = $(this).parent('li').index(); 
    if($(this).attr("checked")){
      $('<img src="'+img_src+'" class="img_'+index+'" />').appendTo($('div.checked_box'));
    }else{
      $('div.checked_box').find($('img.img_'+index+' ')).remove();
    }
  })
});