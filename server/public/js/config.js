// <script src="./lib/js/iChatClient.js"></script>
// <script src="./js/config.js"></script>

/*!
Math.uuid.js (v1.4)
http://www.broofa.com
mailto:robert@broofa.com

Copyright (c) 2010 Robert Kieffer
Dual licensed under the MIT and GPL licenses.
*/

/*
 * Generate a random uuid.
 *
 * USAGE: Math.uuid(length, radix)
 *   length - the desired number of characters
 *   radix  - the number of allowable values for each character.
 *
 * EXAMPLES:
 *   // No arguments  - returns RFC4122, version 4 ID
 *   >>> Math.uuid()
 *   "92329D39-6F5C-4520-ABFC-AAB64544E172"
 *
 *   // One argument - returns ID of the specified length
 *   >>> Math.uuid(15)     // 15 character ID (default base=62)
 *   "VcydxgltxrVZSTV"
 *
 *   // Two arguments - returns ID of the specified length, and radix. (Radix must be <= 62)
 *   >>> Math.uuid(8, 2)  // 8 character ID (base=2)
 *   "01001010"
 *   >>> Math.uuid(8, 10) // 8 character ID (base=10)
 *   "47473046"
 *   >>> Math.uuid(8, 16) // 8 character ID (base=16)
 *   "098F4D35"
 */
(function() {
  // Private array of chars to use
  var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

  Math.uuid = function (len, radix) {
    var chars = CHARS, uuid = [], i;
    radix = radix || chars.length;

    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      // rfc4122, version 4 form
      var r;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }

    return uuid.join('');
  };

  // A more performant, but slightly bulkier, RFC4122v4 solution.  We boost performance
  // by minimizing calls to random()
  Math.uuidFast = function() {
    var chars = CHARS, uuid = new Array(36), rnd=0, r;
    for (var i = 0; i < 36; i++) {
      if (i==8 || i==13 ||  i==18 || i==23) {
        uuid[i] = '-';
      } else if (i==14) {
        uuid[i] = '4';
      } else {
        if (rnd <= 0x02) rnd = 0x2000000 + (Math.random()*0x1000000)|0;
        r = rnd & 0xf;
        rnd = rnd >> 4;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
    return uuid.join('');
  };

  // A more compact, but less performant, RFC4122v4 solution:
  Math.uuidCompact = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  };
})();

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
 
window.chat_singlton_client = undefined;
window.ichat_config = {
	version: 'v0.1.0',
	debug:true,
	chat_server_url:'at35.com:4567',
	staic_api_server_url:'at35.com:4566',
	// chat_server_url:'127.0.0.1:4567',
	chat_server_options:{
		url : 'http://at35.com:4567/faye',
		// url : 'http://127.0.0.1:4567/faye',
		timeout : 120,
		retry		: 5
	},
	contact_cell_height:44,
	get_websql_db:function(){
		if(!window.openDatabase) {
			alert("Databases are not supported in this browser");
		}
			
		return openDatabase('db_ichat', '1.0', 'DB of im', 2 * 1024 * 1024); 
	},
	
	exec_sql:function(sql){
		var db = this.get_websql_db();
		
		this.log_sql(sql);
		
		db.transaction(function (tx) {	
			tx.executeSql(sql);
		},function(){
			if(this.debug){
				alert('exec_sql ' + sql + ' fail');	
			}
			
			return 0;
		},function(){
			// alert('succ');
			return 1;
		});
	},
	/** Select Row from Table **/ 
	exec_sql_with_result:function(query, cb){ // <-- extra param
		 var db = this.get_websql_db();
		 
 		 this.log_sql(query);
		 
	   db.transaction(function (tx) {
				var result = [];
	      tx.executeSql(query, [], function(tx, rs){
	         for(var i=0; i<rs.rows.length; i++) {
	            var row = rs.rows.item(i);
							result.push(row);
	         }
	         console.log(result);
	         cb(result); // <-- new bit here
	      }, this.sql_error_handler);
				result = [];
	   });
	},
	sql_error_handler:function(){
		alert('sql 执行出错');
	},
	get_client:function(){
		if(window.chat_singlton_client == undefined){
			window.chat_singlton_client = new iChatClient(this.chat_server_options);
		}
		window.chat_singlton_client.leave_all();
		return window.chat_singlton_client;
	},
	get_chat_server_url : function(){
		return 'http://' + this.chat_server_url + '/faye'
	},
	api_server_url:'at35.com:5555',
	//api_server_url:'127.0.0.1:5555',
	get_api_server_url : function(){
		return 'http://' + this.api_server_url + '/api/' + this.version;
	},
	get_api_base_url : function(patten){
		return this.get_api_server_url()+ patten
	},
	/**
	 * 获取用户注册url
	 */
	get_api_user_register_url : function(){
		return this.get_api_base_url('/users/new')
	},
	/**
	 * 用户登陆
	 */
	get_api_user_login_url : function(){
		return this.get_api_base_url('/users/login')
	},
	/**
	 * 修改用户头像地址
	 */
	get_api_user_update_avatar_url : function(){
		return this.get_api_base_url('/users/login')
	},
	get_current_topic_with_session_id:function(current_session_id){
		return 'foo' + '_' + current_session_id;
	}
	//user
	,
	set_current_user: function(user){
		return CURRENT_USER.set_current_user(user);	
	}	
	,
	get_current_user: function(){
		return CURRENT_USER.get_current_user();	
	}	,
	get_current_session: function(){
		return CURRENT_SESSION.get_current_session();
	}	,
	get_user_sessions: function(){
		return USER_SESSION.get_user_sessions();
	},
	is_login:function(){
		var current_user = this.get_current_user();	
		var cuid  = current_user['_id'];
		if(current_user == null || cuid == null || cuid == undefined){
			alert('当前用户未登录，所以不记录历史');
			console.log('当前用户未登录，所以不记录历史');
			return false;
		}else{
			return true;
		}
	},
	change_avatar:function(pic,cb_succ){
		var user = this.get_current_user();
		user.avatar = pic;
		this.set_current_user(user);
		
		var current_user_uid = user['_id'];
		
		var url = this.get_api_user_update_avatar_url();
		$.post(url, {
			uid:current_user_uid,
			pic:pic
		}, function(data){
			if(data.status.code == 0){
				cb_succ();
			}else{
				alert("保存出错："+data.status.msg);
			}
		});
	},
	clear_history:function(){
		var sql = 'drop table message;';
		this.exec_sql(sql);
		
		var m = new Collection('Message');
		m.empty();
	},
	// messsage
	/**
	 * 1. 消息体本身（支持各种类型）
	 * 2. 用户信息
	 * 3. 会话信息
	 * 4. 时间
	 */
	get_msg: function(msg){
		var current_user = this.get_current_user();	
		var current_session = this.get_current_session();
		var user_sessions = this.get_user_sessions();
	
		var current_user_uid = current_user['_id'];
		var current_user_avatar = current_user['avatar'];

		var current_session_id = current_session['sid'];
		var current_session_name = current_session['name'];
		
		var _msg = msg;
		
		var message_id = Math.uuid();
		$.extend(_msg, {
			type:'0'
		},{
			// 整合用户信息
			uid		: current_user_uid,
			uname : current_user['username'],
			avatar: current_user_avatar
		}, {
			// 整合会话信息
			sid 	: current_session_id,
			sname	: current_session_name
		},{
			mid: message_id,
			timestamp : new Date().Format("yyyy-MM-dd hh:mm:ss")
		});
		
		return _msg;
	},
	dump_message: function (msg){
		var content = '';
		for(var attr in msg){
			content += ' ' + attr + '=' + msg[attr];
		}
		this.log('收到的信息是：'+content);
	}
	
	//
	,log:function(t){
		if(this.debug){
			console.log('[LOG] '+ t);	
		}
	}
	
	,log_sql:function(t){
		if(this.debug){
			console.log('[SQL LOG] '+ t);	
		}
	}
}


Class('MessageBase',{
	config:function(){
		return ichat_config;
	},
	exec_sql:function(sql){
		ichat_config.exec_sql(sql);
	}
});

var messageBase = new MessageBase
	
Class('Message', messageBase, {
	constructor:function(type,mid, uid, uname,avatar, sid, sname, timestamp, msg){
		this.type = type;
		this.mid = mid;
		this.uid = uid;
		this.uname = uname;
		this.avatar = avatar;
		this.sid = sid;
		this.sname= sname;
		this.timestamp = timestamp;
		this.msg = msg;
		
		// this.drop();
		// this.create();
		
		this.db = new Collection('Message');
		this.db.use_websql();
	},
	values:function(obj){
		Class('Dummy', obj);
		Dummy.call(this);
	},
	drop:function(){
		// var sql = 'DROP TABLE message;';
		//
		// this.exec_sql(sql);
		this.db.drop(function(){
			console.log('drop ok');
		});
	},
	//cuid是当前用户id
	create:function(){
		var sql = 'CREATE TABLE IF NOT EXISTS message ('
			+'id INTEGER PRIMARY KEY AUTOINCREMENT,'
			+'type string, '
			+'mid string, '
			+'uid string, '
			+'uname string, '
			+'avatar string,'
			+'sid string,'
			+'sname string,'
		  +'cuid string, ' 
			+'timestamp string,'
			+'msg text)';
	
		this.exec_sql(sql);
	},
	save:function(){
		var current_user = this.config().get_current_user();	
		var cuid  = current_user['_id'];
		if(this.config().is_login() == false){
			console.log('当前用户未登录，所以不记录历史');
			return;
		}
		
		var obj = {
			'type':this.type,
			'mid':this.mid, 
			'uid':this.uid,
			'uname':this.uname,
			'avatar':this.avatar,
			'sid':this.sid,
			'sname':this.sname,
			'timestamp':this.timestamp,
			'msg':this.msg,
			'cuid':cuid
		}
		
		this.db.add(obj);
		this.db.save();

		// var sql = "insert into message ('type','mid','uid','uname','avatar','sid','sname','timestamp','cuid','msg') values('"
		// 		+ this.type +"','"
		// 		+ this.mid +"','"
		// 		+ this.uid +"','"
		// 	  + this.uname +"','"
		// 		+ this.avatar + "','"
		// 		+ this.sid + "',' "
		// 		+ this.sname+"','"
		// 		+ this.timestamp +"',' "
		// 		+ cuid +"',' "
		// 		+ this.msg
		// 	+ "')";
		
		// ichat_config.exec_sql(sql);
	},
	get_msg_content:function(){
		if(this.type=='undefined'){
			this.type = 0;
		}
		// 0 = 普通文本类型
		if(this.type == 0){
			var o = JSON.parse(this.msg);
			return "" + o.text
		}else{
			return "未知类型，无法解析"
		}
	},
	to_string:function(){
		return  'object=('
				+ this.uid +',' 
				+ this.uname +',' 
				+ this.avatar + ',' 
				+ this.sid + ', ' 
				+ this.sname+','
				+ this.timestamp +', '
				+ this.msg 
			+ ')';
	}
});

Message.get_messages_with_current_session = function(cb){
	var config = ichat_config;
		
	var current_session = config.get_current_session();
	var current_session_id = current_session['sid'];
	var current_session_name = current_session['name'];
	
	var current_user = config.get_current_user();	
	var cuid  = current_user['_id'];
	if(config.is_login() == false){
		console.log('当前用户未登录，所以不记录历史');
		return;
	}
	
	// var sql = "SELECT * FROM message where sid='" + current_session_id
	// 	+ "' and trim(cuid)='" + cuid + "' order by timestamp;";
	// config.log_sql(sql)
	// config.exec_sql_with_result(sql, function(pleaseWork) {
	//     console.log(pleaseWork);
	//     // any further processing here
	// 	cb(pleaseWork);
	//   });
	//
	
	var collection = new Collection('Message');
	collection.use_websql();
	
	var obj = {
		cuid : cuid,
		sid: current_session_id
	}
	collection.search(obj, function(data){
		cb(data);
	});
	
}

Class('SessionLisner',messageBase, {
	constructor:function(one_session){
		this.session = one_session;
		
		this.config = ichat_config;
		this.client = this.config.get_client();
		this.last_msg_id = undefined;
		this.stop_observe();
		this.last_msg = "";
		this.topic_queue = [];
	},
	start_observe:function(){
		var current_session_id = this.session['sid'];
		var current_topic = this.config.get_current_topic_with_session_id(current_session_id);
	
		var _instance = this;
		console.log("开始关注topic=" + current_topic);
		
		this.topic_queue.push(current_topic);
		
		this.client.join(current_topic, function(message) {
		  // handle message
			
			console.log("最近2条信息是一样的。" + _instance.last_msg != message)
			if(_instance.last_msg =="" &&_instance.last_msg != message){
				console.log('收到的信息是：'+message.text);
				
				
				//TODO: 写到websql里
				_instance.save_message_to_web_sql(message);
				
				_instance.last_msg = message;
			}else{
				console.log('收到的信息是重复的，丢弃');
			}
		});
	},
	stop_observe:function(){
		var current_session_id = this.session['sid'];
		var current_topic = this.config.get_current_topic_with_session_id(current_session_id);
	
		var _instance = this;
		this.client.leave(current_topic, function() {
		  // handle message
			console.log('leave...');
		 
		});
	},
	stop_all_observe:function(){
		for(var i in this.topic_queue){
			var topic = this.topic_queue[i];
			this.client.leave(topic, function() {
			  // handle message
				console.log('stop_all_observe leave.' + topic + '..');
			});
		}
	},
	save_message_to_web_sql:function(message){
		var msg = new Message();
		msg.type = message.type;
		msg.mid = message.mid;
		msg.uid = message.uid;
		msg.uname = message.uname;
		msg.avatar = message.avatar;
		msg.sid = message.sid;
		msg.sname= message.sname;
		msg.timestamp = message.timestamp;
		msg.msg = message.msg;
		 
		msg.save();
	}
});

/**
	function get_contacts_info(){
		var api = new StaticApi();
		var url = api.get_contact_url();
		
		$.get(url,function(data){
			log(data);
			// 会话
			sessions  = data.data.contacts;
			list(sessions); 
			
			var contact_storage = new ContactStorage();
			contact_storage.save_to_db(sessions);
			
		});
	}
*/
Class('CurrentUserContactStorage',messageBase, {
	constructor:function(){
		this.current_user = ichat_config.get_current_user();	
		this.cuid = this.current_user['_id'];
		this.contacts_array = [];
	},
	save_to_db:function(json){
		this.json = json;
		this.create_table();
		
		// 清理当前用户的联系人，以后可能要改的。
		this.clear_data_for_current_user();
		
		var contacts = this.json;
		for(var i in contacts){
			var contact_group = contacts[i];
			
			// save
			this.save_contact_group(contact_group);
		}
	},
	create_table:function(){
		ContactStorageItem.create_table();
	},
	clear_data_for_current_user:function(){
		var sql = "delete from contact where trim(cuid)='"
				+ this.cuid
			+ "'";
		
		ichat_config.exec_sql(sql);
	},
	save_to_contacts_array:function(obj){
		this.contacts_array.push(obj);
	},
	get_contacts_array:function(obj){
		//  var sql = "SELECT * FROM contact where sid='" + current_session_id
		// 		+ "' and trim(cuid)='" + cuid + "' order by timestamp;";
		// 	config.log_sql(sql)
		// 	config.exec_sql_with_result(sql, function(pleaseWork) {
		//     console.log(pleaseWork);
		//     // any further processing here
		// 		cb(pleaseWork);
		//   });
		//
		// 	this.contacts_array.push(obj);
		return this.contacts_array;
	},
	save_contact_group:function(contact_group){
		if(ichat_config.is_login() == false){
			alert('当前用户未登录，所以不记录历史');
			return;
		}
		
		var group_id		= contact_group['group_id'];
		var	group_name	= contact_group['group_name'];
		
		for(var i in contact_group['users']){
			var user = contact_group['users'][i];

			var obj = {
				'group_id'   : group_id,
				'group_name' : group_name,
				'cuid'			 : this.cuid
			}
			
			$.extend(obj,user);
			console.log(obj);
			
			// 对象缓存
			this.save_to_contacts_array(obj);
			
			// 存储
			var contact = new ContactStorageItem(obj);
			contact.save();
		}
	},
	search:function(search_content, limit){
 	  // 缓存，不能每次搜索都创建这么大得对象。
		this.sifter = new Sifter(this.contacts_array);
		
		ichat_config.log('contact search_content = ' + search_content);

		//
		// see @ContactStorageItem
		//
		// - 'group_id'
		// - 'group_name'
		// - 'uid'
		// - 'name'
		// - 'avatar'
		// - 'address'
		// - 'cuid'
		//
		var result = this.sifter.search('' + search_content, {
		  fields: ['group_id','group_name','uid','name','avatar','address','cuid'],
		  sort: [{field: 'name', direction: 'asc'}],
			limit: limit
		});
	
		return result;
	},
	search_5:function(search_content){
		var result = this.search(search_content, 5);
		var arr = [];
		for(var i in result.items){
			var cid = result.items[i]['id']
			var contact = this.contacts_array[cid];
			arr.push(contact);
		}
		return arr
	}
});

Class('ContactStorageItem',messageBase, {
	constructor:function(obj){
		this.group_id = obj.group_id;
		this.group_name = obj.group_name;
		this.uid = obj.uid;
		this.name = obj.avatar;
		this.avatar = obj.avatar;
		this.address = obj.address;
		this.cuid = obj.cuid;
	},
	save:function(){	
		var sql = "insert into contact ('group_id','group_name','uid','name','avatar','address','cuid') values('"
				+ this.group_id +"','" 
				+ this.group_name+"','" 
				+ this.uid +"','" 
				+ this.name +"','" 
				+ this.avatar +"','" 
				+ this.address +"','" 
				+ this.cuid
			+ "')";
		
		ichat_config.exec_sql(sql);
	}
});

ContactStorageItem.create_table = function(){
	var sql = 'CREATE TABLE IF NOT EXISTS contact ('
		+'id INTEGER PRIMARY KEY AUTOINCREMENT,'
		+'cuid string, '
		+'group_id string, '
		+'group_name string, '
		+'uid string, '
		+'name string, '
		+'avatar string,'
		+'address string)';

	ichat_config.exec_sql(sql);
}


Class('StaticApi',{
	session : 'session.json',
	contact : 'contact.json'
}, {
	constructor:function(){
		this.base_url = ichat_config.staic_api_server_url;
	},
	get_url:function(url){
		return 'http://' + this.base_url + "/" + url
	},
	get_session_url:function(){
		return this.get_url(this.session);
	},
	get_contact_url:function(){
		return this.get_url(this.contact);
	}
});

Zepto(function($){
  console.log('Zepto Ready to Message Listners!')
		
	//TODO: 考虑和index.js里的sessions循环，能否避免，整合到一处
	function init_job_for_sessions(){
		var user_sessions = USER_SESSION.get_user_sessions();
		for(var i in user_sessions){
			var one_session = user_sessions[i];
			single_session_lisner(one_session);
		}
	}

	function single_session_lisner(one_session){
		var session = new SessionLisner(one_session);
		session.start_observe();
	}


	//监听所有的session，会特别特别慢，所以还是改成监听当前session
	// init_job_for_sessions();
	
});
	