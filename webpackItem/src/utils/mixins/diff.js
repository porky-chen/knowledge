/*
* Diff算法实现过程 - Vue
* O(n)
* */
// 数据发生变化时，vue是怎么更新节点的? - diff实现当修改某个值的时候只更新相应dom而不更新整个dom
// 由于渲染真实DOM的开销很大，在修改某个数据直接渲染DOM时会导致整个DOM数的重绘和重排；
// 根据真实DOM形成一颗虚拟dom树(virtual dom)，但虚拟dom某个节点的数据改变后形成一个新的Vnode,然后Vnode和oldVnode做对比，发现不一样直接修改在真实dom上，然后oldVnode的值为Vnode
// diff过程就是调用patch函数，比较新旧点节点，一边比较一边给真实的DOM打补丁
// 同类节点，那么Vue会直接复用旧DOM节点，只要更新节点中的内容即可

// 真实的DOM
<div>
    <p>123</p>
</div>

// virtual DOM
var Vnode = {
    tag: 'div',
    children: [
        {
            tag: 'p',
            text: '123'
        }
    ]
}

// Vnode 和 oldVnode 都是对象

//diff流程
//当数据发生改变时，set方法会让调用Dep.notify通知所有订阅者Watcher，订阅者就会调用patch给真实的DOM打补丁
// 被订阅者setter -> Dep.notify -> patch(oldVnode, Vnode) -> isSameVnode ? no  |  yes
// no -> replace  -> return Vnode
// yes -> patchVnode(oldVnode有子节点, Vnode没有 | oldVnode没有, Vnode有子节点 | 都只有文本节点 | 都有子节点)  该过程就是Diff算法实现


// TODO： main - 旧节点、新节点
function patch (oldVnode, vnode) {
    // some code
    if (sameVnode(oldVnode, vnode)) {
        patchVnode(oldVnode, vnode)
    } else {
        const oEl = oldVnode.el // 当前oldVnode对应的真实元素节点
        let parentEle = api.parentNode(oEl)  // 父元素
        createEle(vnode)  // 根据Vnode生成新元素
        if (parentEle !== null) {
            api.insertBefore(parentEle, vnode.el, api.nextSibling(oEl)) // 将新元素添加进父元素
            api.removeChild(parentEle, oldVnode.el)  // 移除以前的旧元素节点
            oldVnode = null
        }
    }
    // some code
    return vnode
}

// 判断两节点是否值得比较，值得比较则执行patchVnode - 走 yes流程;不值得比较则用Vnode替换oldVnode -  走 no 流程
function sameVnode (a, b) {
    return (
        a.key === b.key &&  // key值
        a.tag === b.tag &&  // 标签名
        a.isComment === b.isComment &&  // 是否为注释节点
        // 是否都定义了data，data包含一些具体信息，例如onclick , style
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b) // 当标签是<input>的时候，type必须相同
    )
}

//patchVnode方法实现功能
/*
* 找到对应的真实dom，称为el
* 判断Vnode和oldVnode是否指向同一个对象，如果是，那么直接return
* 如果他们都有文本节点并且不相等，那么将el的文本节点设置为Vnode的文本节点。
* 如果oldVnode有子节点而Vnode没有，则删除el的子节点
* 如果oldVnode没有子节点而Vnode有，则将Vnode的子节点真实化之后添加到el
* 如果两者都有子节点，则执行updateChildren函数比较子节点，这一步很重要
* */
function patchVnode (oldVnode, vnode) {
    const el = vnode.el = oldVnode.el
    let i, oldCh = oldVnode.children, ch = vnode.children
    if (oldVnode === vnode) return
    if (oldVnode.text !== null && vnode.text !== null && oldVnode.text !== vnode.text) {  // 文本节点
        api.setTextContent(el, vnode.text)
    }else {
        updateEle(el, vnode, oldVnode)
        if (oldCh && ch && oldCh !== ch) { // 如果Vnode 和 oldVnode 都有子节点，执行updateChildren函数比较子节点
            updateChildren(el, oldCh, ch)
        }else if (ch){ // Vnode有子节点,oldVnode没有，el添加子节点
            createEle(vnode) //create el's children dom
        }else if (oldCh){ // oldVnode有子节点、Vnode没有 直接删除el子节点
            api.removeChildren(el)
        }
    }
}

/*
1.如果是oldS和E匹配上了，那么真实dom中的第一个节点会移到最后.
2.如果是oldE和S匹配上了，那么真实dom中的最后一个节点会移到最前，匹配上的两个指针向中间移动.
3.如果四种匹配没有一对是成功的，那么遍历oldChild，S挨个和他们匹配，匹配成功就在真实dom中将成功的节点移到最前面，如果依旧没有成功的，
那么将S对应的节点插入到dom中对应的oldS位置，oldS和S指针向中间移动。
*/
function updateChildren (parentElm, oldCh, newCh) {
    let oldStartIdx = 0, newStartIdx = 0 // oVn、VN的开始索引
    let oldEndIdx = oldCh.length - 1 // oVN的结束索引
    let oldStartVnode = oldCh[0] // oVN的开始值
    let oldEndVnode = oldCh[oldEndIdx] // oVN的结束值
    let newEndIdx = newCh.length - 1 // VN的结束索引
    let newStartVnode = newCh[0] // VN的开始值
    let newEndVnode = newCh[newEndIdx] // VN的结束值
    let oldKeyToIdx
    let idxInOld
    let elmToMove
    let before
    // 当其中两个能匹配上那么真实dom中的相应节点会移到Vnode相应的位置
    // oldS > oldE表示oldCh先遍历完，那么就将多余的vCh根据index添加到dom中去
    // S > E表示vCh先遍历完，那么就在真实dom中将区间为[oldS, oldE]的多余节点删掉
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) { // 判断oVN开始索引小于等于结束索引、VN开始索引小于等于结束索引
        if (oldStartVnode == null) {   // TODO:对于vnode.key的比较，会把oldVnode = null
            oldStartVnode = oldCh[++oldStartIdx] // 如果oVN开始值为null，把索引下一个赋值给oVN开始值
        }else if (oldEndVnode == null) { // TODO: 判断oVN结束值是否为null
            oldEndVnode = oldCh[--oldEndIdx] // 从末尾递减赋值给oVN结束值
        }else if (newStartVnode == null) {  //TODO: 判断VN的开始值是否为null
            newStartVnode = newCh[++newStartIdx] // 把索引下一位赋值给VN
        }else if (newEndVnode == null) { // TODO:判断VN的结束值是否为Null
            newEndVnode = newCh[--newEndIdx] // 从末尾递减赋值给VN的结束值
        }else if (sameVnode(oldStartVnode, newStartVnode)) { // TODO：判断 oVN的开始值 和 VN的开始值 是否相同
            patchVnode(oldStartVnode, newStartVnode) // 相同则调用patchVode方法
            oldStartVnode = oldCh[++oldStartIdx] // 索引下一位赋值给oVN的开始值
            newStartVnode = newCh[++newStartIdx] // 索引下一位赋值给VN的开始值
        }else if (sameVnode(oldEndVnode, newEndVnode)) { // TODO：判断 oVN的结束值 和 VN的结束值 是否相同
            patchVnode(oldEndVnode, newEndVnode) // 相同调用patchVndoe方法
            oldEndVnode = oldCh[--oldEndIdx]  // 末尾递减赋值给oVN结束值
            newEndVnode = newCh[--newEndIdx]  // 末尾递减赋值给VN结束值
        }else if (sameVnode(oldStartVnode, newEndVnode)) { // TODO：判断 oVN的开始值 和 VN的结束值 是否相同
            patchVnode(oldStartVnode, newEndVnode)  // patchVnode(oVN的开始值，VN的结束值)
            api.insertBefore(parentElm, oldStartVnode.el, api.nextSibling(oldEndVnode.el))
            oldStartVnode = oldCh[++oldStartIdx]  // 索引下一位赋值给oVN的开始值
            newEndVnode = newCh[--newEndIdx]    // 末尾递减赋值给VN结束值
        }else if (sameVnode(oldEndVnode, newStartVnode)) { // TODO：判断 oVN的结束值 和 VN的开始值 是否相同
            patchVnode(oldEndVnode, newStartVnode) // patchVnode(oVN的结束值，VN的开始值)
            api.insertBefore(parentElm, oldEndVnode.el, oldStartVnode.el)
            oldEndVnode = oldCh[--oldEndIdx]  // 末尾递减赋值给oVN结束值
            newStartVnode = newCh[++newStartIdx] // 索引下一位赋值给VN的开始值
        }else { // 当不符合这四种情况
            // 使用key时的比较
            if (oldKeyToIdx === undefined) {
                oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx) // 有key生成index表
            }
            idxInOld = oldKeyToIdx[newStartVnode.key]
            if (!idxInOld) { // 如果找不到对应项索引直接放到当前对于的oldS的真实DOM位置
                api.insertBefore(parentElm, createEle(newStartVnode).el, oldStartVnode.el)
                newStartVnode = newCh[++newStartIdx]
            }
            else {// 如果在oldVnode中找到,则S放到找到与oldS相同值在真实DOM的位置
                elmToMove = oldCh[idxInOld]
                if (elmToMove.sel !== newStartVnode.sel) {
                    api.insertBefore(parentElm, createEle(newStartVnode).el, oldStartVnode.el)
                }else {
                    patchVnode(elmToMove, newStartVnode)
                    oldCh[idxInOld] = null
                    api.insertBefore(parentElm, elmToMove.el, oldStartVnode.el)
                }
                newStartVnode = newCh[++newStartIdx]
            }
        }
    }
    if (oldStartIdx > oldEndIdx) { // 当old走完,Vnode剩余的会放到剩余对应真实DOM的位置
        before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].el
        addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx)
    }else if (newStartIdx > newEndIdx) { // 而当Vnode先走完,会把oldVnode剩余的移除
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
    }
}
