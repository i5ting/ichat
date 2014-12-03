function save_obj_with_key_and_object(key, obj){
	var content = JSON.stringify(obj);
	window.localStorage.setItem(key, content);
}

function get_object_with_key(key){
	var str = window.localStorage.getItem(key);
	return JSON.parse(str);
}

