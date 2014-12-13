Zepto(function($){
  console.log('Ready to Zepto!')
	FastClick.attach(document.body);

	document.addEventListener('touchmove', function (e) { 
		e.preventDefault(); 
	}, false);
	
});
