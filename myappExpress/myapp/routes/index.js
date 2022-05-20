/*
* 1、
* let router = express.Router([options])
* options参数包括:
* caseSensitive Boolean 启动区分大小写  默认：false，不区分
* mergeParams   Boolean 保留req.params来自父路由器的值。如果父项和子项的参数名称冲突，则子项的值优先。  默认：false
* strict        Boolean 启用严格模式  默认：false  “/foo”和“/foo/”被路由器视为相同。
* */
var express = require('express');
var router = express.Router();
var md5 = require('md5')
const Models = require('../mongo/db')
var multiparty = require('multiparty');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 创建账号接口
router.post('/user/register',(req,res) => {
    console.log(req,'req-register')
    var form = new multiparty.Form();
    form.parse(req, function(err,fields){
      console.log(fields)
      if(err) res.send({'code': 1, 'message': '注册失败!', 'data': err})
      Models.Login.find({account: fields.account[0]}, (err, data) => {
        if(err){
            console.log(err)
             // res.send(err);
             let newAccount = [{
              account : fields.account[0],
              password : md5(md5(fields.password[0]))
          }]
            // 保存数据newAccount数据进mongoDB
            Models.Login.create(newAccount,(err,data) => {
                if (err) {
                    res.send({'code': 1, 'message': '注册失败!', 'data': err});
                } else {
                    res.send({'code': 0, 'message': '注册成功!', 'data': null});
                }
            });
        } else {
            console.log(data)
            if (data.length > 0) {
                res.send({'code': 1, 'message': '账户已经存在!'});
            } else {
                let newAccount = [{
                  account : fields.account[0],
                  password : md5(md5(fields.password[0]))
              }]
                // 保存数据newAccount数据进mongoDB
                Models.Login.create(newAccount,(err,data) => {
                    if (err) {
                        res.send({'code': 1, 'message': '注册失败!', 'data': err});
                    } else {
                        res.send({'code': 0, 'message': '注册成功!', 'data': null});
                    }
                });
            }
        }
    })
    })

})

// 登录账号接口
router.post('/user/login',(req,res) => {
    // 通过模型去查找数据库
    var form = new multiparty.Form();
    // json、application/x-www-....(key-value)
    console.log(req.body,'req-login')
    Models.Login.find({account: req.body.account, password : md5(md5(req.body.password))}, (err,data) => {
        if (err) {
            console.log('err',err)
            // res.send(err);
            res.send({'code': 1, 'message': '错误请求!', 'data': err});
        } else {
            console.log('data',data)
            // res.render(data);
            if (data.length > 0) {
                res.send({'code': 0, 'message': '登陆成功!', 'data': null});
            } else {
                res.send({'code': 1, 'message': '账户或密码错误!', 'data': err});
            }
        }
    });
    // 表单格式
    // form.parse(req, function(err,fields){
    //   console.log(fields)
    //   Models.Login.find({account: fields.account[0], password : md5(md5(...fields.password))}, (err,data) => {
    //     if (err) {
    //         console.log('err',err)
    //         // res.send(err);
    //         res.send({'code': 1, 'message': '错误请求!', 'data': err});
    //     } else {
    //         console.log('data',data)
    //         // res.render(data);
    //         if (data.length > 0) {
    //             res.send({'code': 0, 'message': '登陆成功!', 'data': null});
    //         } else {
    //             res.send({'code': 1, 'message': '账户或密码错误!', 'data': err});
    //         }
    //     }
    // });
    // })

});

// 更新，修改密码
router.put('/user/put',(req,res) => {
  Models.Login.find({'_id':req.query.id},(err,data) => {
    console.log(req)
    if(err) res.send({'code': 1, 'message': 'id错误!', 'data': err})
    else {
      Models.Login.updateOne({'_id':req.query.id},{$set: {password : md5(md5(fields.password[0]))}},(err, data) => {
        console.log(data)
        if(err) res.send({'code': 1, 'message': '更新失败!', 'data': err})
        else{
          if(data.acknowledged){
            res.send({'code': 0, 'message': '更新成功!', 'data': data.modifiedCount})
          }else{
            res.send({'code': 0, 'message': '更新成功!', 'data': 0})
          }

        }
      })
    }
})
})

// 删除用户
router.delete('/user/delete',(req,res) => {
      Models.Login.find({'_id':req.query.id},(err,data) => {
    if(err) res.send({'code': 1, 'message': 'id错误!', 'data': err})
    else {
      Models.Login.deleteOne({'_id':req.query.id},(err, data) => {
        console.log(data)
        if(err) res.send({'code': 1, 'message': '删除失败!', 'data': err})
        else{
          res.send({'code': 0, 'message': '删除成功!', 'data': data.deletedCount})
        }
      })
    }
})
})


let limitNum = null,skipNum = null
// 获取所有账号接口
router.get('/user/all',(req,res) => {
    // 通过模型去查找数据库
    console.log(req.query)
    console.log(limitNum)
    limitNum = Number(req.query.pageSize) || limitNum
    skipNum = (Number(req.query.pageIndex) - 1) * limitNum
    Models.Login.find({},{'account':1,'_id':1}).skip(skipNum).limit(limitNum).exec((err,data) => {
        if (err) {
            res.send(err);
        } else {
          console.log(data)
          res.send({'code': 0, 'message': '查询成功!', 'data': data});
        }
    });
});

module.exports = router;
