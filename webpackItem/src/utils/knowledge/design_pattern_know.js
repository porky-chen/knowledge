/*
	单例模式
*/
// 弹框例子
// 创建一个标签
const createLoginLayer = function(){
    const div = document.createElement('div')
    div.innerHTML = '登录浮窗'
    div.style.display = 'none'
    document.body.appendChild(div)
    return div
}
// 使用单例模式将创建代码解耦
const getSingle = function (fn){
    let result
    return function(){
        return result || (result = fn.apply(this, arguments))
    }
}
// 使用
const createSingleLoginLayer = getSingle(createLoginLayer)

document.getElementById('loginBtn').click = function () {
    createSingleLoginLayer()
}
// 当点击时最终再页面创建一个新标签



/*
	发布-订阅模式
*/
// 事件发布/订阅模式 (PubSub) 在异步编程中帮助我们完成更松的解耦, 甚至在 MVC、MVVC 的架构中以及设计模式中也少不了发布-订阅模式的参与。
var Event = function (){
    this.obj = {}
    this.cacheList = []
}

// 订阅
Event.prototype.on = function(eventType, fn){
    if(!this.obj[eventType]){
        this.obj[eventType] = []
    }
    this.obj[eventType].push(fn)

    for(let i = 0; i < this.cacheList.length; i++){
        this.cacheList[i]()
    }
}

// 发布
Event.prototype.emit = function (){
    const arg = arguments
    const that = this
    function cache(){
        var eventType = Array.prototype.shift.call(arg)
        var arr = that.obj[eventType]
        for(let i = 0;i < arr.length; i++){
            arr[i].apply(arr[i],arg)
        }
    }
    this.cacheList.push(cache)
}
//  实现发布函数先于订阅函数执行



/*
	迭代器模式
*/
// 能访问到聚合对象的顺序与元素
// 实现内部迭代器
function each(arr, fn){
    for(let i = 0; i<arr.length;i++){
        fn(i,arr[i])
    }
}

each([1,2,3],function(i,n){
    console.log(i) //0,1,2
    console.log(n) //1,2,3
})

const compare = function(arr1, arr2){
    each(arr1, function(i,n){
        if(arr2[i] !== n){
            console.log('两数不相等')
            return
        }
    })
    console.log('两数相等')
}

const arr1 = [1,2,3]
const arr2 = [1,2,3]
compare(arr1,arr2) // 两数相等


// 外部迭代器
const iterator = function(arr){
    let current = 0
    const next = function(){
        current = current + 1
    }
    const done = function(){
        return current >= arr.length
    }
    const vlaue = function(){
        return arr[current]
    }
    return {
        next,
        done,
        value,
    }
}
const arr1 = [1,2,3]
const arr2 = [1,2,3]
const iterator1 = iterator(arr1)
const iterator2 = iterator(arr2)

const compare = function(iterator1,iterator2){
    while(!iterator1.done() && !iterator2.done()){
        if(iterator1.value() !== iterator2.value()){
            console.log('两数不相等')
            return
        }
        iterator1.next()
        iterator2.next()
    }
    console.log('两数相等')
}

compare(iterator1,iterator2)


/*
	观察者模式
*/
class Observer {
    update() {}
}

