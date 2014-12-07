# tips

## 统一技术词汇

- contact 联系人，通讯录
- register 注册
- avatar 头像

## 如何快速查找是否有冲突

![Tip Check Conflict](docs/tips/tip_check_conflict.png)
	
## 如何正确关闭issue

- 有回复，说明什么问题，以及修改了什么
- 说明如何测试

通过命令行，执行

	git commit -am 'fixed #14: comments'
	
说明

- #14是issue编号


## use  pre-commit


	npm install --save-dev pre-commit
	
##WebSQL

这种存储技术，相对于学过数据库的人来说，还是比较容易理解和上手的，主要就是它的存储风格和我们一般所学的SQL Server 和Oracle比较像，对于HTML5来说，当然还有其它的存储技术，比如说LocalStorage,这几天开发了一个真心话大冒险这个游戏，因为数据稍微复杂了一点点，本来想用LocalStorage,不过纠结了很久，想不出来怎么解决数据的分类等等问题，就选用了WebSQL,感觉也还行，就是代码可能就稍微复杂了点，现在就来看看几个重要的操作：

首先就是要创建一个数据库：

	db = openDatabase("ToDo", "0.1", "A list of to do items.", 200000); 
	
以上代码创建了一个数据库对象 db，名称是 Todo，版本编号为0.1。db 还带有描述信息和大概的大小值。用户代理（user agent）可使用这个描述与用户进行交流，说明数据库是用来做什么的。利用代码中提供的大小值，用户代理可以为内容留出足够的存储。如果需要，这个大小是可以改变的，所以没有必要预先假设允许用户使用多少空间。

为了检测之前创建的连接是否成功，你可以检查那个数据库对象是否为null：

	 if(!db)  
      alert("Failed to connect to database."); 
 
 
对数据库操作：

	`db.transaction(function(transaction){
		//当无表存在于数据库中时，调用handleError创建表，
	  操作语句；
	},handleError,success);`
 
当操作成功时，执行success函数，若失败，则执行handleError,

譬如说这里的操作语句是：

	strSQL = "select * from QType";
  transaction.executeSql(strSQL);
	
当数据库中不存在QType这个表时，就会执行handleError函数，此时即可在handleError该函数内创建该表了
 
创建一个表：
	db.transaction(function(transaction){
  	strSQL="create table if not exists QType(QTypeID INTEGER NOT NULL PRIMARY KEY   AUTOINCREMENT,QTDescribe TEXT NOT NULL)"; 
 transaction.executeSql(strSQL);   //执行语句，创建QTYpe  
  },error,success);
 
向表中插入数据：

	transaction.executeSql("INSERT INTO QContent(QTypeID,QDescribe) values(1，"你好")");
 
若是要插入一个变量，

	transaction.executeSql("INSERT INTO QContent(QTypeID,QDescribe) values(?,?)",[变量名1,变量名2]);//问号分别对应后面的变量名
 
查找数据：

	transaction.executeSql("select * from table where id=2");
 
更多的还有：

更新语句：update 

删除表：drop table tablename

