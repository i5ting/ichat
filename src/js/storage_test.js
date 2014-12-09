// use https://github.com/marcuswestin/store.js
// 最核心的想法，
// 用localstorage怎么存储现在的数据
// 
/* Copyright (c) 2010-2013 Marcus Westin */
this.JSON||(this.JSON={}),function(){function f(e){return e<10?"0"+e:e}function quote(e){return escapable.lastIndex=0,escapable.test(e)?'"'+e.replace(escapable,function(e){var t=meta[e];return typeof t=="string"?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function str(e,t){var n,r,i,s,o=gap,u,a=t[e];a&&typeof a=="object"&&typeof a.toJSON=="function"&&(a=a.toJSON(e)),typeof rep=="function"&&(a=rep.call(t,e,a));switch(typeof a){case"string":return quote(a);case"number":return isFinite(a)?String(a):"null";case"boolean":case"null":return String(a);case"object":if(!a)return"null";gap+=indent,u=[];if(Object.prototype.toString.apply(a)==="[object Array]"){s=a.length;for(n=0;n<s;n+=1)u[n]=str(n,a)||"null";return i=u.length===0?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+o+"]":"["+u.join(",")+"]",gap=o,i}if(rep&&typeof rep=="object"){s=rep.length;for(n=0;n<s;n+=1)r=rep[n],typeof r=="string"&&(i=str(r,a),i&&u.push(quote(r)+(gap?": ":":")+i))}else for(r in a)Object.hasOwnProperty.call(a,r)&&(i=str(r,a),i&&u.push(quote(r)+(gap?": ":":")+i));return i=u.length===0?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+o+"}":"{"+u.join(",")+"}",gap=o,i}}typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(e){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(e){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;typeof JSON.stringify!="function"&&(JSON.stringify=function(e,t,n){var r;gap="",indent="";if(typeof n=="number")for(r=0;r<n;r+=1)indent+=" ";else typeof n=="string"&&(indent=n);rep=t;if(!t||typeof t=="function"||typeof t=="object"&&typeof t.length=="number")return str("",{"":e});throw new Error("JSON.stringify")}),typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(e,t){var n,r,i=e[t];if(i&&typeof i=="object")for(n in i)Object.hasOwnProperty.call(i,n)&&(r=walk(i,n),r!==undefined?i[n]=r:delete i[n]);return reviver.call(e,t,i)}var j;text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),typeof reviver=="function"?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}(),function(e){function o(){try{return r in e&&e[r]}catch(t){return!1}}var t={},n=e.document,r="localStorage",i="script",s;t.disabled=!1,t.version="1.3.17",t.set=function(e,t){},t.get=function(e,t){},t.has=function(e){return t.get(e)!==undefined},t.remove=function(e){},t.clear=function(){},t.transact=function(e,n,r){r==null&&(r=n,n=null),n==null&&(n={});var i=t.get(e,n);r(i),t.set(e,i)},t.getAll=function(){},t.forEach=function(){},t.serialize=function(e){return JSON.stringify(e)},t.deserialize=function(e){if(typeof e!="string")return undefined;try{return JSON.parse(e)}catch(t){return e||undefined}};if(o())s=e[r],t.set=function(e,n){return n===undefined?t.remove(e):(s.setItem(e,t.serialize(n)),n)},t.get=function(e,n){var r=t.deserialize(s.getItem(e));return r===undefined?n:r},t.remove=function(e){s.removeItem(e)},t.clear=function(){s.clear()},t.getAll=function(){var e={};return t.forEach(function(t,n){e[t]=n}),e},t.forEach=function(e){for(var n=0;n<s.length;n++){var r=s.key(n);e(r,t.get(r))}};else if(n.documentElement.addBehavior){var u,a;try{a=new ActiveXObject("htmlfile"),a.open(),a.write("<"+i+">document.w=window</"+i+'><iframe src="/favicon.ico"></iframe>'),a.close(),u=a.w.frames[0].document,s=u.createElement("div")}catch(f){s=n.createElement("div"),u=n.body}var l=function(e){return function(){var n=Array.prototype.slice.call(arguments,0);n.unshift(s),u.appendChild(s),s.addBehavior("#default#userData"),s.load(r);var i=e.apply(t,n);return u.removeChild(s),i}},c=new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]","g");function h(e){return e.replace(/^d/,"___$&").replace(c,"___")}t.set=l(function(e,n,i){return n=h(n),i===undefined?t.remove(n):(e.setAttribute(n,t.serialize(i)),e.save(r),i)}),t.get=l(function(e,n,r){n=h(n);var i=t.deserialize(e.getAttribute(n));return i===undefined?r:i}),t.remove=l(function(e,t){t=h(t),e.removeAttribute(t),e.save(r)}),t.clear=l(function(e){var t=e.XMLDocument.documentElement.attributes;e.load(r);for(var n=0,i;i=t[n];n++)e.removeAttribute(i.name);e.save(r)}),t.getAll=function(e){var n={};return t.forEach(function(e,t){n[e]=t}),n},t.forEach=l(function(e,n){var r=e.XMLDocument.documentElement.attributes;for(var i=0,s;s=r[i];++i)n(s.name,t.deserialize(e.getAttribute(s.name)))})}try{var p="__storejs__";t.set(p,p),t.get(p)!=p&&(t.disabled=!0),t.remove(p)}catch(f){t.disabled=!0}t.enabled=!t.disabled,typeof module!="undefined"&&module.exports&&this.module!==module?module.exports=t:typeof define=="function"&&define.amd?define(t):e.store=t}(Function("return this")())

Class('CollectionBase',{
	config:function(){
		return ichat_config;
	},
	exec_sql:function(sql){
		this.config().exec_sql(sql);
	}
});


Class('LocalStore',{
	constructor:function(key){
		if(this.check_if_not_support() == false){
		  console.log('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser.')
			return;
		}
		this.store = store;
	},
	debug:true,
	log:function(t){
		if(debug == true)
			console.log('[LocalStore LOG] '+t);
	},
	dump:function(t){
		if(debug == true)
			console.log('[LocalStore Dump] '+t);
	},
	check_if_not_support:function(){
		return !store.enabled;
	},
	save_array:function(){
		var contents = JSON.stringify(this.content_arr);
		this.store.set(this.key, contents);
	},
	get_array:function(){
		var contents = JSON.parse(store.get(this.key));
		return contents;
	},
	all:function(){
		return this.get_array();
	},
	get:function(index){
		var contents = this.get_array();
		if(index >= 0 && index <= (contents.length + 1)){
			return contents[index];
		}else{
			this.log(''+this.key + ' index = '+ index +'异常');
		}
	},
	drop:function(){
		store.remove(this.key)
	}
});

LocalStore.clear = function(){
	// Clear all keys
	store.clear()
}

/**
 *
			//清楚所有缓存
			LocalStore.clear();
			
			var collection = new Collection('message_test');
			
			var obj = {
				type :'type',
				mid :'mid',
				uid :'uid',
				uname :'uname',
				avatar :'avatar',
				sid :'sid',
				sname:'sname',
				timestamp :'timestamp',
				msg :'msg'
			}
			collection.add(obj);
			
			collection.save();
			
			var arr = collection.all();
			
			console.log(arr);
			
			var m = collection.get(0);
			console.log(m.type);
			
			
			collection.drop();
 */ 
Class('Collection',{
	MEMORY : 0,		
	WEBSQL : 1,
	INDEXDB : 2,
	LOCALS_TORAGE : 3
}, LocalStore, CollectionBase, {
	constructor:function(key){
		this.key = key;
		
		// 默认引擎使用localstorage
		this.engine = this.LOCALS_TORAGE;
		
		// this.drop();
		this.content_arr = [];
	},
	_add:function(obj){
		if(this.check_if_exist() == true){
			console.log('重复不能添加');
			return;
		}
		//
		this.content_arr.push(obj);
	},
	_add_force:function(obj){
		this.content_arr.push(obj);
	},
	use_websql:function(){
		this.engine = this.WEBSQL;
	},
	change_engine:function(){
		// 此处继承
		var engine = this.engine();
		switch (engine)
		{
		case this.WEBSQL:
		  return new WebsqlDataLayer(); 
		  break;
		case this.INDEXDB:
			return new IndexdbDataLayer(); 
		  break;
		case this.LOCALS_TORAGE:
			return new LocalstorageDataLayer(); 
		  break;
		default:
		  return new MemoryDataLayer();
		}
		
	},
	check_if_exist:function(){
		//TODO:
		return true;
	},
	add_if:function(obj){
		//如果使用此方法，就是要检测是否已存在的。
		this._add(obj);
	},
	add:function(obj){
		this._add_force(obj);
	},
	save:function(){
		this.save_array();
	}
	
	
});