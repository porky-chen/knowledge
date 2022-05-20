var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer')
var util = require('util')

var indexRouter = require('./routes/index');
var upload = require('./routes/upload')

// 使用express框架
var app = express();

app.listen(5000,() => { console.log('******【express服务器搭建成功】******') })

// view engine setup ; set .pug as the default extension
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json()); // for parsing application/json  为了解析 application/json 数据
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.join(__dirname, 'public')));
// app.use('/public', express.static('public'));


//跨域问题解决方面
const cors = require('cors');
app.use(cors({
    origin:['http://localhost:8081'],
    methods:['GET','POST','Put','Delete'],
}));


app.use('/', indexRouter); // indexRouter就是子应用程序，在index.js另外创建的express()对象
// app.use('/upload', upload);
upload(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});




//Buffer 缓冲区
// let buf1 = Buffer.from('abcdefg')
// let buf2 = Buffer.from('CDE')
// const json = JSON.stringify(buf)
//
// console.log('buf',buf)
// console.log('json',json)
// const copy = JSON.parse(json,(key, value) => {
//   return value && value.type === 'Buffer' ?
//       Buffer.from(value.data):
//       value
// })
//
// console.log(copy,'copy')
// console.log(copy.toString())

// buf2.copy(buf1,2)
// console.log(buf2.toString(),buf1.toString())
//

//Stream 流
let fs = require('fs')
let data = '写入流中的数据：hello node stream'

// 管道流
// // 创建一个写入流到output.txt文件
// let writerStream = fs.createWriteStream('output.txt');
// // 使用utf8编码写入数据
// writerStream.write(data,'UTF8');
// // 标记文件末尾
// writerStream.end()
// // 处理流时间-> finish,error
// writerStream.on('finish',function(){
//   console.log('写入完成')
// })
// writerStream.on('error',function(err){
//   console.log(err)
// })
// console.log('程序执行完毕')

let zlib = require('zlib');
//链式流
// 压缩 output.txt 文件为 output.txt.gz
// fs.createReadStream('output.txt')
//     .pipe(zlib.createGzip())
//     .pipe(fs.createWriteStream('output.txt.gz'));
// console.log("文件压缩完成。");

// 解压 output.txt.gz 文件为 input.txt
fs.createReadStream('output.txt.gz')
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream('input.txt'));
console.log("文件解压完成。");
fs.readFile('output.txt',(err,data)=>{
  if(err) {
    return console.error(err)
  }else{
    console.log('异步读取:',data.toString())
  }
})

fs.open('output.txt','r+',(err,data)=>{
  if(err){
    return console.error(err)
  }
  console.log('打开成功',data)
})

fs.readdir(__dirname,(err,files)=>{
  console.log(err,files)
})
//



//跨域问题解决方面
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  req.method == "OPTIONS" ? res.send(200) : next()
})

// app.all('/api/*',requireAuthentication)

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

/**
 * 1、express.static(root,options={})  静态文件
 * 2、express.text(options = {})  将传入的请求有效负载（参数）解析为字符串
 * 3、express.urlencoded(options = {})  将有效的负载（参数）解析传入的请求
 * 4、app.locals  如app.locals对象中属性是app中的局部变量整个生命周期中保持不变，而res.locals仅在请求的生命周期中有效
 * 5、app.mountpath 属性包含一个或多个安装子应用程序的路径模式。
 * 6、app.on('mount', 回调(父))
 * 7、app.all（path，callback）
 * 8、app.delete(path,callback)  使用指定的回调函数将 HTTP DELETE 请求路由到指定路径
 * 9、app.disable（名称） app.set('foo', false)布尔属性与调用相同app.disable('foo')。把name为foo禁止
 * 10、app.disabled（名称）如果禁用true布尔设置( )，则返回
 * 11、app.enable（名称）启用 名称 的功能或程序..
 * 12、app.enabled（名称）返回是否启用true了设置
 * 13、app.engine(ext, 回调) 将给定的模板引擎注册callback为ext.  例如 app.engine('pug', require('pug').__express)、app.engine('html', require('ejs').renderFile)
 * 14、app.get(名称)  返回应用设置的值name
 * 15、app.get(path，callback)  使用指定的回调函数将 HTTP GET 请求路由到指定路径。
 * 16、app.listen（path，callback）  启动一个 UNIX 套接字并侦听给定路径上的连接
 * 17、app.listen(port,callback)  绑定并监听指定主机和端口上的连接
 * 18、app.METHOD（path，callback） 路由 HTTP 请求，其中 METHOD 是请求的 HTTP 方法，如 GET、PUT、POST 等，小写
 * 19、app.param（[name]，callback）为路由参数添加回调触发器
 * 20、app.post(path，callback)  使用指定的回调函数将 HTTP POST 请求路由到指定路径。
 * 21、app.put(path，callback)  使用指定的回调函数将 HTTP PUT 请求路由到指定路径。
 * 22、app.delete(path，callback)  使用指定的回调函数将 HTTP DELETE 请求路由到指定路径。
 * 23、app.render(试图，[本地]，callback) 将app.render()其视为生成渲染视图字符串的实用程序函数。内部res.render()用于app.render()渲染视图
 * 24、app.router(path) 返回单个路由的实例
 * 25、app.set（名称，值）将设置分配name给value(any)
 * 26、app.use([path,callback]/callback)  在指定路径挂载指定的中间件函数或函数 path可以是path、path pattern、regular Expression、Array
 * 27、req.app  应用程序的app同等功能
 * 28、req.baseUrl  获取在父应用程序中的baseUrl，如app.use('/api',app.router()) // baseUrl 为 ‘/api’
 * 29、req.body  获取key-value数据，默认为undefined 需要在express.json()或express.urlencoded({ extended: true })
 * 30、req.cookies  解析cookies数据，引用中间件require('cookie-parser') if cookie signed use req.signedCookies
 * 31、req.fresh  return Boolean  判断请求是否fresh新鲜，
 * 32、req.hostname  req的主机名,  req.ip,  req.ips
 * 33、req.method  http method GET\POST\PUT\DELETE and so on
 * 34、req.originalUrl,req.baseUrl,req.path
 * 35、req.params
 * 36、req.protocol  return http\https  协议
 * 37、req.query   获取url ?后值
 * 38、req.res  请求中的响应对象
 * 39、req.router
 * 40、req.secure  请求安全 https true if TLS connection
 * 40、req.signedCookies  已签名的cookie，use cookie-parser 中间件
 * 41、req.stale  是否过时
 * 42、req.subdomains  请求子域
 * 43、req.xhr  Boolean  判断是否client send XMLHttpRequest
 * 44、req.accepts(types)  接收的内容类型 如:req.accepts('html'),req.accepts('application/json'),req.accepts(['json', 'text'])
 * 45、req.acceptsCharsets(charset[,...]) 接收的字符集
 * 46、req.acceptsEncodings(encoding[,...]) 接收的编码
 * 47、req.acceptsLanguages(lang[,...])  接收的语言
 * 48、req.get(fieId) 获取req对象的值
 * 49、req.is(types)  判断content-type的类型  都不是 return false
 * 50、req.range(size[,options])  资源大小
 * 51、res.headersSent  服务端是否发送响应 Boolean
 * 52、res.locals  响应局部变量  此属性对于公开请求级信息（例如请求路径名、经过身份验证的用户、用户设置等）很有用
 * 53、res.append(fieId[,value])  往响应对象里面设置值 res.set() after res.append() reset set header value
 * 54、res.attachment([filename])
 * 55、res.cookie(name,value[,options]) 设置cookie
 * 56、res.clearCookie(name[,options])  不包括expires and maxAge 到期日期 and 到期时间
 * 57、res.download(path [, filename] [, options] [, fn])  将文件作为附件传输下载
 * 58、res.end([data][,encoding]) 结束响应过程，用于无数据返回 如：res.status(404).end()
 * 59、res.format(object)  如果未定义accepts可以通过该方法定义不同类型的响应
 * 60、res.get(fieId)
 * 61、res.json([body])  发送一个json响应，相当于JSON.stringify()转换为json字符串的参数
 * 62、res.jsonp([body])  发送一个jsonp回调支持的json响应
 * 63、res.links(links)
 * 64、res.location(path) set the response location HTTP header to specified path parameter
 * 65、res.redirect([status,]path)  重定向到派生自定义的url path，指定status，未指定默认为302；重定向可以是用于重定向到不同站点的完全限定 URL；重定向可以相对于主机名的根目录
 * 66、** res.render(view[,locals][,callback]) view是要渲染的视图文件的文件路径,可以是绝对路径，也可以是相对于views设置的路径;
 * 67、res.req  引用请求对象数据
 * 68、res.send([body]) send http response
 * 69、res.sendFile(path[,options][,fn])  响应文件
 * 70、res.sendStatus(状态码)
 * 71、res.set(field [, value])
 * 72、res.status(code)  发送状态，可链接别名，如res.status(200).send('')
 * 73、res.type(type) 发送content-type指定type设定 ，如res.type('.html')可以接收指定类型或者mime类型
 * 74、res.vary(field)   将字段添加到Vary响应标头  如 res.vary('User-Agent').render('docs')
 * 75、router.all(path,[callback,...]callback) 匹配所有HTTP方法 router.all('*',requireAuthentication,loadUser) == router.all('*',requireAuthentication) router.all('*',loadUser)
 * 76、router.all('/api/*',requireAuthentication)  白名单限制/api开头的的path
 * 77、router.METHOD(path,[callback,...]callback)
 * 78、router.param(name,callback) 在mini application 中参数匹配的方法
 * 79、router.route(path) 相同path的不同HTTP METHOD  来指定各种 HTTP 方法处理程序 router.route(path).all(callback).get(cb).post(cb) and so on
 * 80、router.use(path,callback,callback) 类似 app.use() 使用指定的中间件函数或函数，带有可选的挂载路径path，默认为“/”。 按顺序执行，重要
 * 81、
 * 82、
 * 83、
 * 84、
 * 85、
 * 86、
 * 87、
 * 88、
 * 89、
 * 90、
 */
