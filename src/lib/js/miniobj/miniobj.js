(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
module.exports = global.Class = function() { 
	this.version = "1.2.4";
	
	function dump(obj){   
			console.log('--------------------------\n');  
	    var names="";       
	    for(var name in obj){       
	       names+=name+": "+obj[name]+", ";  
	    }  
	    console.log(names);  
	}  

	function cp(des, src) {
	    if (!des) {
	        des = {};
	    }
	    if (src) {
	        for (var i in src) {
	            des[i] = src[i];
	        }
	    }
	    return des;
	}

	function extend(obj, prop){    
		var o = this;
		// 对象集成	
		if(typeof obj == 'function'){
				obj.call(this);
				o = cp(this,obj.prototype)
		}
		return cp(o, prop);	
	}  

	function mo(arr){
		var before = function(){};
		for( var key in arr ){	
			var c = arr[key]
			before = extend(before ,c);
		}
		return before;
	}
		
	var o = [];
	for( var key in arguments ){	
		var c = arguments[key]
		o.push(c)
	}
	o.shift();
	
	var obj = mo(o);
	var src = arguments[arguments.length - 1];
	src.constructor.prototype = obj; 
	global[arguments[0]] = obj.constructor; 
}; 

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
