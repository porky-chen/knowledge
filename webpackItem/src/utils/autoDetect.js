/**
 * 浏览器检测
 * */
window.onerror = function (msg,url,line,col,error){
    // 没有url不上报错误，因为不知道错误
    if(msg !== "Script error" && !url){
        return true
    }
    setTimeout(function (){
        let data = {}
        //不一定所有浏览器都支持col参数
        col = col || (window.event && window.event.errorCharacter) || 0;

        data.url = url;
        data.line = line;
        data.col = col;
        if(!!error && !!error.stack){
            // 如果浏览器有堆栈信息
            // 直接使用
            data.msg = error.stack.toString()
        }else if(!!arguments.callee){
            // 通过callee拿到堆栈信息 arguments.callee代表函数名用于递归,用于松耦合
            let ext = []
            let f = arguments.callee.caller, c = 3;
            // caller表示调用该函数的函数，父级函数，无为null
            // 三层堆栈信息
            while (f && (--c > 0)){
                ext.push(f.toString());
                if(f === f.caller){
                    break;
                }

                f = f.caller;
            }
            ext = ext.join(',')
            data.msg = ext
        }
        // data上报到后台
        console.error('error capture:',data)
    },0)
    return true
}
// window.addEventListener('error',function(){}) 捕获资源加载错误 、 全局监控静态资源异常
// window.onerror() iframe异常、Script error跨域问题、全局监控JS异常
// window.addEventListener('unhandledrejection'，function(e){})  监听uncaught promise error
// try{}catch{} 捕获同步错误
// 页面崩溃 window.load和beforeunload
//vue异常
// vue.config.errorHanlder = (err,vm,info) => {}
//React异常 componentDidCatch
// 请求异常 axios.interceptors

//线上前端错误监控日志 ARMS、fundebug、BadJS、Sentry
