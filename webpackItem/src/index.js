import _ from 'lodash'
import printMe from "./print"

// function component() {
//     const element = document.createElement('div')
//     const button = document.createElement('button');
//
//     // lodash 在当前 script 中使用 import 引入
//     element.innerHTML = _.join(['Hello','webpack'],'')
//
//     button.innerHTML = 'click me'
//     button.onclick = printMe
//
//     element.appendChild(button)
//
//     return element
// }
//
// document.body.appendChild(component())
/*
* dynamic import
* import() 会返回一个promise 所以可以和async函数一起使用
* */
// function getComponent() {
//     return import('lodash')
//         .then(({ default:_ }) => { // webpack4导入CommonJS模块将不再解析module.exports
//             const element = document.createElement('div')
//
//             element.innerHTML = _.join(['hello','webpack'],'')
//
//             return element
//         })
//         .catch(error => {
//             console.error(error,'error')
//         })
// }

//async简化
// async function getComponent(){
//     const element = document.createElement('div')
//     const { default:_ } = await import('lodash')
//
//     // element.innerHTML = _.join(['hello','webpack'],'123')
//     element.innerHTML = 'hello webpack 123'
//     if(process.env.NODE_ENV === 'production'){
//         console.log('production')
//     }
//     return element
// }
//
// getComponent().then((component) => {
//     document.body.appendChild(component);
// }).catch(e => {
//     console.log(e,'err')
// })
console.log(navigator,'navigator')
if('serviceWorker' in navigator){
    window.addEventListener('load',() => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered:',registration)
        }).catch(err => {
            console.log('SW registered error: ',err)
        })
    })
}

function component(){
    const element = document.createElement('div')
    const button  = document.createElement('button')
    const br = document.createElement('br')

    button.innerHTML = 'click me'
    // element.innerHTML = _.join(['webpack','thin','tools'],'')

    element.appendChild(br)
    element.appendChild(button)

    button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
        // 调用ES6模块的import()方法时，必须指向模块的.default值，因为它才是promise被处理后返回的实际的module对象
        // const print = module.default
        const print = module
        console.log(print,'print')
        print.fn()
        console.log(new print.C())
    })

    return element
}

document.body.appendChild(component())


/*
* 预获取/预加载模块(prefetch/preload module)内置指令：告知浏览器
*  prefetch(预获取)：将来某些导航下可能需要的资源
*  preload module(预加载模块)：当前导航下可能需要的资源
* */
/*
* 二则浏览器支持程度不同
* preload：
*    chunk 会在父 chunk 加载时，以 并行 方式开始加载。
*    具有中等优先级，并立即下载。
*    会在父 chunk 中立即请求，用于当下时刻
* prefetch：
*    chunk 会在父 chunk 加载结束后开始加载。
*    在闲置时间加载。
*    用于未来某个时刻
* */
// import(/* webpackPrefetch: true */ './print.js'); // 在父chunk完成加载后加载
// 会生成<link rel="prefetch" href="print.js"></link>指示浏览器在闲置时间获取print.js文件
// import(/* webpackPreload: true */ './print.js')
// 在请求此页面同时会通过<link rel="preload">请求print.js;不正确使用会影响性能
