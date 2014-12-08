# server api


前置条件，mongodb已启动

进入server目录

	npm start

## add user

	post 
	
	http://127.0.0.1:5555/api/v0.1.0/users/new

	// username: { type: String, required: true, index: { unique: true } },
	// password: { type: String, required: true },
	// avatar:String,
	// address:String,
	
## user login

	post 
	
	http://127.0.0.1:5555/api/v0.1.0/users/login

	// username: sang
	// password: 0

## user del

	post 
	
	http://127.0.0.1:5555/api/v0.1.0/users/del

	// username: sang

