/**
 * WebSocket
 * */
// 1、WebSocket 协议的底层协议也是TCP协议
// 2、WebSocket 协议的标识符为ws,安全为wss
// 3、WebSocket 协议没有同源限制,既WebSocket可以跨域通信
// 4、WS有状态，是前后端交互的长连接，既建立连接后可以保持连接状态，通信时可以省略部分状态信息，CONNECTING(0)\open(1)\closing(2)\close(3)
// 5、WS协议可以发送文本，也可以发送二进制数据。blob或ArrayBuffer和string数据参数也是如此

// 通过WebSocket构造函数创建websocket对象创建和管理WebSocket连接,并通过连接发送和接收数据的API
const webSocket = new WebSocket('ws://localhost:5000')
/**
 * readyState: 链接状态，0-正在链接中CONNECTING，1-已经链接可以通讯open，2-链接正在关闭closing,3-已关闭或者没有链接成功close
 * onopen: 连接成功后的回调
 * onerrpr: 连接失败后的回调
 * onmessage: 从服务器接收到信息的回调
 * onclose: 链接关闭后的回到
 * */
webSocket.onopen = function(){
    console.log('连接成功');
    webSocket.send('hellow')
};

webSocket.onerror = function(){
    console.log('连接失败')
}

webSocket.onmessage = function(event){
    console.log('接收信息' + event.data)
}

webSocket.onclose = function(){
    console.log('链接已关闭')
}


/**
 * WebSocket重连
 * 由于网络不确定性导致断开或者页面长时间打开情况下也会发生websocket断开，避免这类问题，让websocket每隔一段时间和服务器进行通信，重写建立连接
 * 心跳检测机制：客户端与服务器通过发送心跳向对方证明自己还活着
 * */
let lockReconnect = false; // 是否允许重写连接
let timeout = 1000 * 20; //心跳间隔
let reTimeout = 1000 * 10; // 重连间隔
let timeoutTimer = null; //心跳定时器
let reTimeoutTimer = null; // 重连定时器
let socket = null;

function heartCheckStart(){
    timeoutTimer = setTimeout(function(){
        socket.send('HeartBeat to Server')
    },timeout)
}

function heartCheckReset(){
    clearTimeout(timeoutTimer)
    heartCheckStart()
}

function createWebSocket(){
    socket = new WebSocket('ws://localhost:5001')
    socket.onopen = function(){
        console.log('连接成功')
        heartCheckStart()
    }
    socket.onerror = function (){
        console.log('连接失败')
        reConnect()
    }

    socket.onmessage = function(event){
        console.log(event.data)
        heartCheckReset() // 接收到信息重新检测心跳
    }

    socket.onclose = function(event){
        console.log('连接关闭')
        console.log('websock断开' + event.code + ' ' + event.reason + ' ' + event.wasClean)
        reConnect()
    }
}

// 重连
function reConnect(){
    if(lockReconnect) return
    lockReconnect = true
    // 没连接上会一直重连，设置延迟避免请求过多
    reTimeoutTimer && clearTimeout(reTimeoutTimer)
    reTimeoutTimer = setTimeout(function(){
        createWebSocket()
        lockReconnect = false
    },reTimeout)
}


createWebSocket()


/**
 * node服务端模拟搭建websock
 * */
// npm install ws
// 创建入口
const WebSocket = require('ws')

const ws = new WebSocket.Server({port:5001})
ws.on('connect',ws => {
    console.log('server connection')

    ws.on('message',msg => {
        console.log('服务端收到的信息',msg)
        ws.send('HeartBeat to Client')
    })

    ws.send('连接已建立 to client')
})
// node index.js 运行


// WebSocket属性
// webSocket.binaryType - 二进制的数据类型连接
let binaryType = webSocket.binaryType;
binaryTypek == DOMString\blob\arrayBuffer; //字符串、blob、arraybuffer
// readonly webSocket.bufferedAmount - 未发送至服务器的字节数（send的数据）
// readonly webSocket.extensions - 服务器选择的扩展值,空字符串或一个扩展列表
// readonly webSocket.protocol - 服务器选择的下属协议
// readonly webSocket.readyState - 当前链接状态 0，1，2，3
// readonly webSocket.url - 结对路径,构造函数创建链接的绝对路径URL

// WebSocket方法
webSocket.close([code[,reason[,wasClean]]); // 关闭链接
webSocket.send(data); // 对要传输的数据进行排队

// webSocket事件
// 通过addEventListener()将一个事件监听赋值给本接口oneventname属性,来监听事件或者on[eventname]
socket.addEventListener('open',(event)=>{})
// 或
socket.onopen((event)=>{});// error、message、close


/**
 * 继承 - EventTarget：是一个DOM接口，由可以接收事件、并且可以创建侦听器的对象实现 --- 扩展
 * */
// Element、document和window是常见的event targets,其他对象可以作为event targets,如XMLHttpRequest,AudioNode,AudioContext等
// 支持通过onevent特性和属性设置"事件处理程序(en-US)(event handlers(en-US))"

// EventTarget()构造函数 创建一个新的EventTarget对象实例
// 方法
EventTarget.addEventListener();
EventTarget.removeEventListener(); // 删除事件侦听器
EventTarget.dispatchEvent() // 将事件分派到次EventTarget
