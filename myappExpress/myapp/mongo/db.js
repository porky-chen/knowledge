// 引入mongoose
const mongoose = require('mongoose');
// 连接mongodb数据库
// 参数1：mongodb数据库启动的地址
// 参数2：回调函数，用于判断是否连接成功


/*
* 通过promise实现
* */
// const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb://localhost/mydb';
// MongoClient.connect(url).then(conn => {
//     console.log('数据库已连接')
//     var dbase = conn.db('mydb')
//     dbase.createCollection('logins').then(res => {
//         console.log('已经创建logins集合')
//     }).catch(err => {
//         console.log('数据库操作错误')
//     }).finally(() => {
//         conn.close()
//     })
// }).catch(err => {
//     console.log('数据库连接失败！')
// })


// 连接数据库 如果不自己创建 默认test数据库会自动生成
// mongoose.connect('mongodb://localhost/text');


// const db = mongoose.connection;
// db.once('error',() => console.log('****【Mongo连接失败】****'));
// db.once('open',() => console.log('****【Mongo连接成功】****'));

 //连接数据库服务器
 mongoose.connect('mongodb://localhost/mydb', {
     useNewUrlParser: true,
     useUnifiedTopology: true
 }, function (error) {
     if (error) {
         console.log("数据库连接失败")
     } else {
         console.log("数据库连接成功")
     }
 })

// 登录模式
/************** 定义模式Schema **************/
const logins = new mongoose.Schema({
    account: {type:String},
    password: {type:String}
});

const files = new mongoose.Schema({
    fileUrl: {type: String},
    fileName: {type: String},
    fileSize: {type: Number},
})

// 要导出的模型Model
/************** 定义模型Model **************/
const Models = {
    Login: mongoose.model("Login", logins),
    Files: mongoose.model("Files", files)
};
module.exports = Models;
