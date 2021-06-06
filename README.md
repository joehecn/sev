
# vbclient

# mongo
``` bash
docker run -p 27017:27017 --name some-mongo -d mongo
```

# sev
- [] 根据卡号 和 门禁编码 判断权限并发送开门指令

- collections
users
- userName
- password

doors
- _id
- doorNo   string 门禁编码
- building string 楼号
- unit     string 单元号

cards
- _id
- cardNo   string 卡号         (可变)
- doorIds  [ObjectId]  拥有的门 (数组)
- username string 用户名
- realname string 姓名
- userInfo string 住户信息

cardHistorys
- _id
- cardId ObjectId cards._id (不变)
由 cardId 查询得到，相当于快照
- cardNo string   卡号       (可变)
- doorIds  [ObjectId]  拥有的门 (数组)
- username string 用户名
- realname string 姓名
- userInfo string 住户信息

- time   date     换卡时间

clockIns
- _id
- cardId   ObjectId cards._id (不变)
由 cardId 查询得到，相当于快照
- cardNo   string   卡号       (可变)
- doorIds  [ObjectId]  拥有的门 (数组)
- username string 用户名
- realname string 姓名
- userInfo string 住户信息

- doorId   ObjectId 开的门
由 doorId 查询得到，相当于快照
- doorNo   string   门禁编码    (可变)
- building string   楼号       (可变)
- unit     string   单元号      (可变)

- time     date     打卡时间

api
``` js
// localhost:4002/vue_api?method=OpenPort&portnum=3
{
    "code": 0,
    "data": {
        "open": "1",
        "t": "1622821872042_41"
    }
}
{
    "code": 10000,
    "message": "Open Port Failed 10005"
}
// localhost:4002/vue_api?method=ClosePort&portnum=3
{
    "code": 0,
    "data": {
        "close": "1",
        "t": "1622821866195_40"
    }
}
{
    "code": 10000,
    "message": "Close Port Failed 10005"
}
// localhost:4002/vue_api?method=VerChk&portnum=3
{
    "code": 0,
    "data": {
        "sVer": "UAC-TAC-44WIEG.0-",
        "t": "1622821875155_42"
    }
}
{
    "code": 10000,
    "message": "Port have not been opened"
}
// localhost:4002/vue_api?method=ReadIDm&portnum=3
// "00 00 00 00 01 83 BD 5C "
{
    "code": 0,
    "data": {
        "sIDm": "00 00 00 00 03 ED B1 24 ",
        "t": "1622821878758_43"
    }
}
{
    "code": 10000,
    "message": "Port have not been opened"
}
```

# vueclient
- [x] 登录
- [x] 配置门禁信息 ( 楼号, 单元号, 门禁编码)
- [x] 管理门禁卡
- [x] 换卡历史
- [x] 刷卡记录
