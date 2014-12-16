var express = require('express');
var router = express.Router();

var sessions = {
  "data": {
    "user": {
      "uid": "1",
      "name": "世龙",
      "avatar": "shilong.png",
      "address": "beijing"
    },
    "sessions": [
      {
        "sid": "100000001",
        "name": "新浪网财经部门讨论组",
        "type": "p2g",
        "avatar": "avatar_finance.png",
        "last_message": "这是一个那啥的是群，讨论一些关于采集的事儿",
        "last_update_time": "2014-12-02 14:18:05",
        "users": [
          {
            "uid": "12",
            "name": "阿虎",
            "avatar": "1.png",
            "address": "beijing"
          },
          {
            "uid": "13",
            "name": "marco",
            "avatar": "2.png",
            "address": "beijing"
          },
          {
            "uid": "14",
            "name": "李文虎",
            "avatar": "3.png",
            "address": "beijing"
          },
          {
            "uid": "15",
            "name": "张卓",
            "avatar": "4.png",
            "address": "beijing"
          }
        ]
      },
      {
        "sid": "100000002",
        "name": "高宁",
        "type": "p2p",
        "avatar": "avatar_gaoning.png",
        "last_message": "我是高宁，要加你为好友",
        "last_update_time": "2014-12-02 4:18:05",
        "users": [
          {
            "uid": "19",
            "name": "高宁",
            "avatar": "5.png",
            "address": "beijing"
          }
        ]
      },
      {
        "sid": "100000003",
        "name": "柯织",
        "type": "p2p",
        "avatar": "avatar_kezhi.png",
        "last_message": "我是柯老师",
        "last_update_time": "2014-12-02 11:18:05",
        "users": [
          {
            "uid": "19",
            "name": "高宁",
            "avatar": "6.png",
            "address": "beijing"
          }
        ]
      },
      {
        "sid": "100000004",
        "name": "柯织",
        "type": "p2p",
        "avatar": "avatar_kezhi.png",
        "last_message": "我是柯老师",
        "last_update_time": "2014-12-02 11:18:05",
        "users": [
          {
            "uid": "19",
            "name": "高宁",
            "avatar": "6.png",
            "address": "beijing"
          }
        ]
      },
      {
        "sid": "100000005",
        "name": "柯织",
        "type": "p2p",
        "avatar": "avatar_kezhi.png",
        "last_message": "我是柯老师",
        "last_update_time": "2014-12-02 11:18:05",
        "users": [
          {
            "uid": "19",
            "name": "高宁",
            "avatar": "6.png",
            "address": "beijing"
          }
        ]
      },
      {
        "sid": "100000006",
        "name": "柯织",
        "type": "p2p",
        "avatar": "avatar_kezhi.png",
        "last_message": "我是柯老师",
        "last_update_time": "2014-12-02 11:18:05",
        "users": [
          {
            "uid": "19",
            "name": "高宁",
            "avatar": "6.png",
            "address": "beijing"
          }
        ]
      },
      {
        "sid": "100000007",
        "name": "柯织",
        "type": "p2p",
        "avatar": "avatar_kezhi.png",
        "last_message": "我是柯老师",
        "last_update_time": "2014-12-02 11:18:05",
        "users": [
          {
            "uid": "19",
            "name": "高宁",
            "avatar": "6.png",
            "address": "beijing"
          }
        ]
      },
      {
        "sid": "100000008",
        "name": "柯织",
        "type": "p2p",
        "avatar": "avatar_kezhi.png",
        "last_message": "我是柯老师",
        "last_update_time": "2014-12-02 11:18:05",
        "users": [
          {
            "uid": "19",
            "name": "高宁",
            "avatar": "6.png",
            "address": "beijing"
          }
        ]
      },
      {
        "sid": "100000009",
        "name": "柯织",
        "type": "p2p",
        "avatar": "avatar_kezhi.png",
        "last_message": "我是柯老师",
        "last_update_time": "2014-12-02 11:18:05",
        "users": [
          {
            "uid": "19",
            "name": "高宁",
            "avatar": "6.png",
            "address": "beijing"
          }
        ]
      },
      {
        "sid": "100000010",
        "name": "柯织",
        "type": "p2p",
        "avatar": "avatar_kezhi.png",
        "last_message": "我是柯老师",
        "last_update_time": "2014-12-02 11:18:05",
        "users": [
          {
            "uid": "19",
            "name": "高宁",
            "avatar": "6.png",
            "address": "beijing"
          }
        ]
      },
      {
        "sid": "100000011",
        "name": "柯织",
        "type": "p2p",
        "avatar": "avatar_kezhi.png",
        "last_message": "我是柯老师",
        "last_update_time": "2014-12-02 11:18:05",
        "users": [
          {
            "uid": "19",
            "name": "高宁",
            "avatar": "6.png",
            "address": "beijing"
          }
        ]
      },
      {
        "sid": "100000012",
        "name": "柯织",
        "type": "p2p",
        "avatar": "avatar_kezhi.png",
        "last_message": "我是柯老师",
        "last_update_time": "2014-12-02 11:18:05",
        "users": [
          {
            "uid": "19",
            "name": "高宁",
            "avatar": "6.png",
            "address": "beijing"
          }
        ]
      },
      {
        "sid": "100000013",
        "name": "柯织",
        "type": "p2p",
        "avatar": "avatar_kezhi.png",
        "last_message": "我是柯老师",
        "last_update_time": "2014-12-02 11:18:05",
        "users": [
          {
            "uid": "19",
            "name": "高宁",
            "avatar": "6.png",
            "address": "beijing"
          }
        ]
      },
      {
        "sid": "100000014",
        "name": "柯织",
        "type": "p2p",
        "avatar": "avatar_kezhi.png",
        "last_message": "我是柯老师",
        "last_update_time": "2014-12-02 11:18:05",
        "users": [
          {
            "uid": "19",
            "name": "高宁",
            "avatar": "6.png",
            "address": "beijing"
          }
        ]
      },
      {
        "sid": "100000015",
        "name": "柯织",
        "type": "p2p",
        "avatar": "avatar_kezhi.png",
        "last_message": "我是柯老师",
        "last_update_time": "2014-12-02 11:18:05",
        "users": [
          {
            "uid": "19",
            "name": "高宁",
            "avatar": "6.png",
            "address": "beijing"
          }
        ]
      },
      {
        "sid": "100000016",
        "name": "柯织",
        "type": "p2p",
        "avatar": "avatar_kezhi.png",
        "last_message": "我是柯老师",
        "last_update_time": "2014-12-02 11:18:05",
        "users": [
          {
            "uid": "19",
            "name": "高宁",
            "avatar": "6.png",
            "address": "beijing"
          }
        ]
      },
      {
        "sid": "100000017",
        "name": "柯织",
        "type": "p2p",
        "avatar": "avatar_kezhi.png",
        "last_message": "我是柯老师",
        "last_update_time": "2014-12-02 11:18:05",
        "users": [
          {
            "uid": "19",
            "name": "高宁",
            "avatar": "6.png",
            "address": "beijing"
          }
        ]
      },
      {
        "sid": "100000018",
        "name": "柯织",
        "type": "p2p",
        "avatar": "avatar_kezhi.png",
        "last_message": "我是柯老师",
        "last_update_time": "2014-12-02 11:18:05",
        "users": [
          {
            "uid": "19",
            "name": "高宁",
            "avatar": "6.png",
            "address": "beijing"
          }
        ]
      },
      {
        "sid": "100000019",
        "name": "柯织",
        "type": "p2p",
        "avatar": "avatar_kezhi.png",
        "last_message": "我是柯老师",
        "last_update_time": "2014-12-02 11:18:05",
        "users": [
          {
            "uid": "19",
            "name": "高宁",
            "avatar": "6.png",
            "address": "beijing"
          }
        ]
      },
      {
        "sid": "100000020",
        "name": "柯织",
        "type": "p2p",
        "avatar": "avatar_kezhi.png",
        "last_message": "我是柯老师",
        "last_update_time": "2014-12-02 11:18:05",
        "users": [
          {
            "uid": "19",
            "name": "高宁",
            "avatar": "6.png",
            "address": "beijing"
          }
        ]
      },
      {
        "sid": "100000021",
        "name": "柯织",
        "type": "p2p",
        "avatar": "avatar_kezhi.png",
        "last_message": "我是柯老师",
        "last_update_time": "2014-12-02 11:18:05",
        "users": [
          {
            "uid": "19",
            "name": "高宁",
            "avatar": "6.png",
            "address": "beijing"
          }
        ]
      },
      {
        "sid": "100000022",
        "name": "柯织",
        "type": "p2p",
        "avatar": "avatar_kezhi.png",
        "last_message": "我是柯老师",
        "last_update_time": "2014-12-02 11:18:05",
        "users": [
          {
            "uid": "19",
            "name": "高宁",
            "avatar": "6.png",
            "address": "beijing"
          }
        ]
      },
      {
        "sid": "100000023",
        "name": "柯织",
        "type": "p2p",
        "avatar": "avatar_kezhi.png",
        "last_message": "我是柯老师",
        "last_update_time": "2014-12-02 11:18:05",
        "users": [
          {
            "uid": "19",
            "name": "高宁",
            "avatar": "6.png",
            "address": "beijing"
          }
        ]
      },
      {
        "sid": "100000024",
        "name": "柯织",
        "type": "p2p",
        "avatar": "avatar_kezhi.png",
        "last_message": "我是柯老师",
        "last_update_time": "2014-12-02 11:18:05",
        "users": [
          {
            "uid": "19",
            "name": "高宁",
            "avatar": "6.png",
            "address": "beijing"
          }
        ]
      }
    ]
  },
  "status": {
    "code": 0,
    "msg": "success"
  }
}
 
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: '微信',sessions: sessions.data.sessions });
});

module.exports = router;
