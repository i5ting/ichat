function save_obj_with_key_and_object(key, obj){
	try {
		var content = JSON.stringify(obj);
		window.localStorage.setItem(key, content);
	}catch (e) {
    //使用cookie替代实现
		alert(e);
		store.clear();
  }
}

function get_object_with_key(key){
	var str = window.localStorage.getItem(key);
	return JSON.parse(str);
}

function del_object_with_key(key){
	window.localStorage.removeItem(key);
}

// 定义localstorage常量
CONST_CURRENT_USER = 'CONST_CURRENT_USER';
CONST_USER_SESSION = 'CONST_USER_SESSION';
CONST_CURRENT_SESSION = 'CONST_CURRENT_SESSION';

// 当前用户信息
window.CURRENT_USER = {
	set_current_user: function(obj){
		save_obj_with_key_and_object('CONST_CURRENT_USER', obj);
	},
	get_current_user: function(){
		return get_object_with_key('CONST_CURRENT_USER');
	},
	remove_current_user: function(){
		return del_object_with_key('CONST_CURRENT_USER');
	},
	get_current_user_uid:function(){
		if(get_object_with_key('CONST_CURRENT_USER') == null){
			// alert('user is null');
			return;
		}
		return get_object_with_key('CONST_CURRENT_USER')['_id'];
	}
}


// 当前用户会话列表
// 需要带有用户状态，不能只保存一个用户，而是多个用户
window.USER_SESSION = {
	set_user_sessions: function(obj){
		var uid = CURRENT_USER.get_current_user_uid();
		save_obj_with_key_and_object('CONST_USER_SESSION'+ '_' + uid, obj);
	},
	get_user_sessions: function(){
		var uid = CURRENT_USER.get_current_user_uid();
		return get_object_with_key('CONST_USER_SESSION'+ '_' + uid);
	}
}

// 当前会话信息
// 需要带有用户状态，不能只保存一个用户，而是多个用户
window.CURRENT_SESSION = {
	set_current_session: function(obj){
		var uid = CURRENT_USER.get_current_user_uid();
		save_obj_with_key_and_object('CONST_CURRENT_SESSION'+ '_' + uid, obj);
	},
	get_current_session: function(){
		var uid = CURRENT_USER.get_current_user_uid();
		return get_object_with_key('CONST_CURRENT_SESSION'+ '_' + uid);
	}
}
