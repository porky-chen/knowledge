//TODO:静态属性 static
export class Grid {
    static origin = {x: 0, y: 0};
    calculateDistanceFromOrigin(point: {x:number;y:number;}) {
        let xDist = (point.x - Grid.origin.x); // 访问origin需要加上类名Grid
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor(public scale:number) {}
}
let grid1 = new Grid(1.0)
let grid2 = new Grid(2.5)

console.log(grid1.calculateDistanceFromOrigin({x:1,y:3}),'grid1')
console.log(grid2.calculateDistanceFromOrigin({x:5,y:9}),'grid2')
// TODO:抽象类 abstract ： 定义抽象类和在抽象类内部定义抽象方法
// 一般作为其他派生类的基类,必须再派生类中实现
abstract class Animal {
    constructor(public name:string) {}
    printName():void{
        console.log('print Animal'+this.name)
    }
    abstract printMeeting():void // 必须再派生类实现
}
class accountAnimal extends Animal {

    constructor() {
        super('accountAnimal to Animal'); // 必须用super()调用基类
    }

    printMeeting():void {
        console.log('accountAnimal at 10')
    }

    generateReport():void{
        console.log('generateReport')
    }

}
let animal:Animal; // 创建一个对抽象类的引用
// animal = new Animal(); // error，不能创建抽象类的实例
animal = new accountAnimal(); // 允许子类进行实例化和赋值
animal.printName() // 抽象类中存在
animal.printMeeting() // 抽象类中定义了抽象方法
// animal.generateReport() // error,方法再声明抽象类中不存在

class Greeter {
    static standardGreeting = "hello world"
    greeting: string;
    greet() {
        if(this.greeting){
            return "hello," + this.greeting
        }else{
            return Greeter.standardGreeting;
        }
    }
}
let greeter1:Greeter; // 告诉greeter1引用了类Greeter
greeter1 = new Greeter(); // 实例化
console.log(greeter1.greet()) // hello world

let greeterMaker:typeof Greeter = Greeter; // 保存了这个类的构造函数,typeof Greeter意思是取Greeter的类型,告诉我Greeter标识符的类型
greeterMaker.standardGreeting = "hey there!"

let greeter2:Greeter = new greeterMaker(); // greeter2是greeterMaker的实例
console.log(greeter2.greet()) // hey there!

//TODO:类当作接口使用
class Point {
    x: number;
    y: number;
}
interface Point3d extends Point {
    z:number;
}
let point3d: Point3d = {x:1,y:2,z:3};

//TODO:函数类型
//为函数定义类型
function add(x:number,y:number): number {
    return x + y
}
//完整函数类型
let myAdd:(x:number,y:number) => number = function (x:number,y:number):number {return x + y}

//推断类型 按上下文归类
let myAdd2:(baseValue:number,increment:number)=> number = function(x,y){return x + y}

//TODO:TypeScript每个函数的参数都是必须的
function buildName(firstName:string,lastName?:string){ // ？可实现参数 可选 ，可选参数必须再必须参数后面
    if(lastName)
        return firstName + '-' +  lastName;
    else
        return firstName;
}
//1、在所有必须参数后面默认参数的都是可选的，（firstName:string.lastName = "smith"）lastName可选
//2、lastName = undefined 等同于 lastName?:string
//3、默认值放前面表示必选

//this和箭头函数
interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this:Deck): () => Card
}
let deck:Deck = {
    suits: ['a','b','c','d'],
    cards: Array(52),
    createCardPicker:function(this: Deck){  // 告诉typeScript，this是Deck类型,否在就是any类型,会报错 --noImplicinThis
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13)

            return {suit: this.suits[pickedSuit],card: pickedCard & 13}
        }
    }
}
// 重载
function pickCard(x: {suit:string;card:string}[]):number;
function pickCard(x: number):{suit:string;card:string};
// 定义两个重置不同的接收,编译器会根据对应的参数执行对应的重载

//TODO:泛型
// @ts-ignore
function  identity<T>(arg: T):T{ // <T>确保了传入类型和返回类型是一样的
    return arg
}
let output = identity<string>("myString"); // type of output will be 'string'
let output2 = identity("otherString"); // 类型推断，根据传入的参判断类型 'string'

// 使用泛型变量
function identity2<T>(arg: T[]): T[] {return []}
//等同于
function identity3<T>(arg: Array<T>): Array<T> {return []};

//泛型接口
interface Generic {
    <T>(arg: T):T
}
//Generic 等同于 Generic2
interface Generic2<T>{
    (arg: T):T;
}
function identity4<T>(arg:T): T{
    return arg
}
let myIdentity:Generic = identity4 // 就是传入的arg
let myIdentity4:Generic2<number> = identity4 // 定义了arg的类型和返回类型number

//泛型类
class GenericNumber<T>{
    zeroValue: T;
    add:(x :T,y:T) => T;
}

//TODO:泛型约束 使用接口和extends关键字约束
interface Lengthwise {
    length:number
}
function loggingNumLen<T extends Lengthwise>(arg: T):T {
    console.log(arg.length)
    return arg
}
//受到约束的loggingNumLen就不能是任意类型，是需要由length的类型，否在会报错 如对象则必须包含length属性,数组不需要等

//使用原型属性推断并约束构造函数与类实力的关系
function contructType<T>(c:new () => T):T{
    return new c()
}

//TODO:枚举 enum 支持数字和基于字符串的枚举
//通过枚举的属性来访问枚举成员，和枚举的名字来访问枚举类型：如Directory[0] == Up,Directory[Up] == 0
//数字
enum Directory {
    Up,// 不初始化默认为0，给了初始值下面自增
    Down,
    Left,
    Right
}
// 不带初始化器的枚举后面不定义会报错
enum E {
    // a= '1',
    // a = (() => 1)(),
    Read = 1 >> 1, // 右边移1位，1 -> 0,<<有符号位移，<<<无符号位移，
    Write = 1 << 2, // 左移2位，二进制里面1左移就是100十进制就是4
    //b, // Enum member must have initializer.
}
//联合枚举与枚举成员的类型  ->  进阶**
//运行时的枚举
enum K { x,y,z }
function f(obj:{x:number}):number {
    return obj.x
}
console.log(f(K)) // 枚举在允许时是真实存在的

//反向映射
//从枚举值到枚举名字
//字符串枚举成员不会生成方向映射
enum Enum{ A }
let a = Enum.A
let numOfA = Enum[a]
console.log(a,numOfA)//0,"A"

//const枚举
//常量枚举不允许包含计算成员
const enum Enum1{
    a= 1,
    b= a * 2,
}

//外部枚举 ： 描述已经存在的枚举类型的形状
//正常枚举中，没有初始化方法的成员被当成常数成员。
//外部枚举，非常数没有初始化方法被当作需要计算
declare enum Enum2{
    A = 1,
    B,
    C = 2,
}








