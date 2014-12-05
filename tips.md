# tips

## 如何快速查找是否有冲突

	ack '<<<<<<<'
	
## 如何正确关闭issue

- 有回复，说明什么问题，以及修改了什么
- 说明如何测试

通过命令行，执行

	git commit -am 'fixed #14: comments'
	
说明

- #14是issue编号


## use  pre-commit


	npm install --save-dev pre-commit