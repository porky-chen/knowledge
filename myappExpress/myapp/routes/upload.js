var express = require('express')
var Upload = require('../mongo/db').Files
var multiparty = require('multiparty');
var fs = require('fs');

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/
// 获取上传成功时时间戳
function getNowFormatDate() {
    var date = new Date();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var hours = String(date.getHours())
    var minutes = String(date.getMinutes())
    var seconds = String(date.getSeconds())
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = `${date.getFullYear()}${month}${strDate}${hours}${minutes}${seconds}`
    return currentdate.toString();
}

const router = (app) => {
    // 上传文件
    app.post('/upload',(req,res,next) => {
        var form = new multiparty.Form();
        form.parse(req, function(err,fields,files){
        if(err) console.log('error')
        else {
            console.log(fields,files)
            var file = files.file[0]
            var rs = fs.createReadStream(file.path)
            var newPath = '/uploads/' + getNowFormatDate() + '_' + file.originalFilename
            var ws = fs.createWriteStream('./public' + newPath)
            rs.pipe(ws)
            ws.on('close', function () {
                console.log('文件上传成功')
                let uploadFile = [{
                    fileName: file.originalFilename,
                    fileUrl: 'http://localhost:5000/public' + newPath
                }]
                Upload.create(uploadFile,(err, data) => {
                    if(err){
                        res.send({code: 1, message: '文件上传失败!', data: err})
                    }else{
                        res.send({code: 0, message: '文件上传成功!', data: uploadFile.length || 0})
                    }
                })
            })
        }
        })
    })
    // 查询文件
    app.get('/files', (req, res) => {
        Upload.find({}, (err, data) => {
            if(err){
                res.send({'code': 1, 'message': '查询失败!', 'data': err})
            }else {
                let newData = data
                newData.map(x => {
                    x.id = x['_id']
                })
                res.send({'code': 0, 'message': '查询成功!', 'data': newData})
            }
        })
    })
    app.get('/view/:name',function(req,res,next){
        console.log('__dirname')
        let options = {
            root:'D:/myProgram/vue-demo/myappExpress/myapp/public/uploads/',
            header:{
                'x-timestamp':getNowFormatDate(),
                'x-sent':true
            }
        }
        let filename = req.params.name
        res.sendFile(filename,options,function(err){
            if(err){
                console.log(err)
                res.status(err.status).end()
            }else{
                console.log('send',filename)
            }
        })
    })
}
module.exports = router
