console.log('only first render !')
//export 关键字
export default () => {
    console.log('export default a () => {}')
}

export const CONSTANT = 42

export let variable = 69

function Super(name){
    this.name = name
}

export class C extends Super {
    method(){
        console.log('method')
    }
}

export function fn(){
    console.log('export a fun')
}

let a,b,other;
export { a, b, other as c };

/*
* TODO:import 关键字
*
* import { CONSTANT, variable } from './print.js
*
* import * as module from './print.js'
* 导入包含所有导出内容的命名空间对象
* module.fn()
*
* import theDefaultValue from './print.js'
* 导入 'default' 导出的快捷方式
* */


