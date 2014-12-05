ichat
=====

it's an im client like webchat

![](chat.gif)

## History

- v0.1.0
	- 支持1--9.jpg作为头像
	- 聊天
	- 注册，登录
	- 用户消息历史，支持用户切换，消息正常
	- 发送消息后自动滚到底部
	- 引入了miniobject
	- add pre-commint for check conflict

## run

启动服务器（src目录下面）

	npm start 
	
启动静态接口服务（api目录下面）

	npm run api
	
## 文档

- 接口说明[api  ](api.md)
- 技巧积累[tips ](tips.md)

## 技术栈

- http://goratchet.com/
- http-server 
- https://github.com/TroyGoode/node-cors

## API

### session.json

url : http://127.0.0.1:4566/get_session_by_uid?uid=12

type

- p2g 群聊
- p2p 私聊

#### 左侧cell模板

 			<li class="msgitem leftitem clearfix">
 				<div class="chathead pull-left">
 					<a target="_blank" href="#">
 						<img src="../images/defaultimg.jpg" alt="">
 					</a>
 				</div>
 				<div class="msg-content-header pull-left"></div>
 				<div class="msg-content-body pull-left">
 					<a class="close" href="#" style="display: none;"></a>
 					<div class="msg-content">
 						<p class="abstract">jdjfkdskffjdkssfdsfdsfsefsf</p>
 						<span class="chat-time text-right">2012-5-28 3:35</span>
 					</div>
 				</div>
 			</li>
			
#### 右侧cell模板			

			<li class="msgitem rightitem clearfix">
 				<div class="msg-content-header pull-right"></div>
 				<div class="msg-content-body pull-right">
 					<a class="close" href="#" style="display: none;"></a>
 					<div class="msg-content">
 						<p class="abstract">jdjfkdskffjdkjdjfkdskffjdkssfdsfdsfsefsfjdjfkdkffjdkssfdsfdsfsefsfjdjfkdskffjdkssfdsfkffjdkssfdsfdsfsefsfjdjfkdskffjdkssfdsfkffjdkssfdsfdsfsefsfjdjfkdskffjdkssfdsfskffjdkssfdsfkffjdkssfdsfdsfsefsfjdjfkdskffjdkssfdsfkffjdkssfdsfdsfsefsfjdjfkdskffjdkssfdsfdsfsefsfssfdsfdsfsefsf</p>
 						<span class="chat-time text-right">2012-5-28 3:35</span>
 					</div>
 				</div>
 				<div class="clear"></div>
 			</li>



## 测试方法

必须是2端口，不然current user会重复的。

用户1：index.html 

用户2：index2.html 


开始聊吧