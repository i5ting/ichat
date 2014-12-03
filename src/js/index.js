Zepto(function($){
  console.log('Ready to Zepto!')
		
	function log(t){
		console.log('[LOG] '+ t);
	}
	
	
	$.get('http://at35.com:4566/session.json',function(data){
		alert(data);
	});
	
	$('a').click(function(){
		alert(1);
	});
	
});
