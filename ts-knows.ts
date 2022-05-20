/*
* TypeScript
*/
let list: number[] = [1,2,3] // 表示类型元素组成的数组 元素类型[]
let list: Array<number> = [1,2,3]  // 类型泛型 Array<元素类型>

// 元组Tuple
let x : [string,number]; // 定义一对值分别为字符串和数字
x = ['str',1]; // ok
x = [1,'str']; // error 报错须符合[string,number]

// 当访问一个越界的元素，会使用联合类型替代:只要符合string|number
x[3] = 'word'; // ok
x[4] = false; // Error,Boolean not (string|number) type

// 枚举 enum 使用枚举类型，可通过枚举的值获取属性名
enum Color {Red, Green, Blue}
let c: Color = Color.Green

enum Color {Red = 1,Green = 2,Bule}
let colorName : string = Color[2];// colorName 显示 Green

// Any类型 可以包含任意类型，和调用该类型的方法
let notSure : any = 4;
notSure.ifItExists(); // ok,ifItExists might exist at runtime
notSure.toFixed(); // ok 
// Object类型 可以任意类型，但不能调用任意的方法
let prettySure: Object = 3
prettySure.toFixed() // error:property 'toFixed' dosen't exist on type 'object'
let list: any[] = [可以定义任意类型元素，也可以替换]

// Void 表示没有任意类型。当一个函数无返回值时，返回值类型就是void
function warnUser(): void { console.log('xxx') }
// 声明一个void类型只能为它赋予undefined和null,无意义
let unusable: void = null | undefined;


// Null 和 Undefined, 类型用处不大,默认是所有类型的子类型，
// 指定了--strictNullChecks标记,null和undefined只能赋值给void和他们各自

// Never类型,永不存在的值的类型，如抛出错误使用，没有类型是never的子类
function error(message: string): never {
	throw new Error(message)
}

// Object类型，非原始类型,除了string,number,Boolean,null,undefined,Symbol


// 类型断言  尖括号 | as 语法
let someValue: any = 'this'
let stringLenth: number = (<string>someValue).length // someValue必须得是string
let strLength : number = (someValue as string).length; //  someValue必须得是string

/*
* TODO：接口 核心原则 - 对值所具有的结构进行类型检查 ,对类型命名和代码或第三方代码定义锲约
*/
interface LabelValue { // 接口(interface)描述必须包含一个label其类型为string，LabelValue就是描述=>{}的内容
	label: string;
	color?: string; // ?表示color是可选属性,不是必传 - 可进行预定义，catch不存在的报错
	readonly x: number; // readonly 表示只读属性：只能在刚创建时修改值，一旦赋值不可修改
}
// ReadonlyArray<元素类型> | Array<元素类型> 前者表示数组的只读类型 赋值给别的变量也是error
// 可以通过断言重写 as 改变类型,如 ra as number [];ra是只读的数组类型

// readonly和const具有同样功能，区分使用是属性(readonly)还是变量(const)

// 如果一个对象字面量存在任何"目标类型"不包含的属性，会报错：not expected in type xxx
// 解决一：可使用as断言
// 解决二：可以下面这样定义，可以有任意数量的属性只要不是color和width，可以实任意类型
interface configVal {
	color? : string;
	width? : number;
	[propName: string] : any;
}
// 解决三：直接传入参数，不进行类型检查，普通函数传参


/**
 * 函数类型 - (类型检查) : 参数列表每个参数都需要名字和类型
 * */
 interface searchFun {
 	(source: string, subString: string) : boolean; // 表示参数名/类型，函数返回值(boolean)
 }
 let mySearch: searchFun;
 mySearch = function(source:string,subString:string){
 	return 1 > 0
 }
// 函数检查-函数参数名不需要一样，只要对应位置的类型一样即可，如function(str:string,sub:string) 成立

/**
 * 可索引类型 - 可以通过索引得到的类型如a[10]或ageMap['danile']
 *   索引类型 具有 索引签名 描述对象索引类型 ， 和相应索引返回值类型
 *   TypeScript支持两种 索引签名：字符串 和 数字
 *   数字（索引签名）返回值必须是字符串索引返回值类型的子类型，因为js会把number索引转换成string再去索引对象如,传100索引是"100"去索引
 *   字符串索引一般用在对象,支持obj.property和obj["property"]
 *   字符串签名可以很好描述dictionary模式,确保所有属性与其返回值类型相匹配。
 * */
interface stringArray {
	[index:number]:string;  // index：number表示传入的值类型,string表示返回值类型
}
let myArray:stringArray;
myArray = ["blob","arrayBuffer"]
let myStr:string = myArray[0] // 成立

interface NumberDictionary{
	[index:string]:number; // 由于obj["property"]是number 
	length:number; // ok,同上obj.length是number
	name:string; // 失败，因为obj.name是string与上不符合索引类型返回值number类型
}

interface readonlyArray{
	readonly [index:number]:string; //定义数组的时候，可以将索引签名设置为只读，防止修改索引值，一旦初始化值不能修改
}
let myArr:readonlyArray = ['Mark','Merry']
myArray[1] = 'Juliy'; // error,不可修改

/**
 * 类 类型 - 明确的强制一个类去符合某种锲约
 * */
 // 接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员
 interface ClockInterface {
 	currentTime: Date;
 	setTime(d: Date);
 }

 class Clock implements ClockInterface { // implements实现了
 	currentTime: Date;
 	setTime(d: Date){
 		this.currentTime = d     // 实例部分进行类型检查
 	};
 	constructor(h: number,m: number){}; // 存在类的静态部分，不会检查
 }

//  继承接口 - 从一个接口里复制成员到另一个接口里，将接口分割到可重用的模块里
interface Shape {
    color: string
}
interface PenStroke {
    penWidth: number;
}
interface Square extends Shape {
    sideLength: number;
}
let square = <Square>{}
square.color = 'bule'
square.sideLength = 10

// 一个接口继承多个接口
interface Square extends Shape,PenStroke {
    sideLength:number;
}

// 混合类型:一个对象同时作为函数和对象使用，并带有额外属性
interface Counter {
    (start:number):string;
    interval: number;
    reset():void;
}

function getCounter():Counter {
    let counter = <Counter>function (start:number){};
    counter.interval = 123
    counter.reset = function(){};
    return counter;
}

let c = getCounter()
c(10)
c.reset();
c.interval = 5;

// 接口继承类 - 会继承类的成员不包括其实现,类似生命了类中存在的成员,
class Control {
    private state:any;
}
interface SelectableControl extends Control { // 包含Control的所有成员包括私有state,私有成员只能Control的子类才能实现SelectableContral接口
    select():void                             // 因为只有Control的子类才能够拥有一个生命与Control的私有成员state，这对私有成员的兼容性是必须的
}
class Button extends Control implements SelectableControl {
    select(){}
}
class TextBox extends Control {
    select(){}
}
// 错误：image类型缺少state属性
class Image implements SelectableControl {
    select(){}
}
// Button和TextBox类是SelectableControl的子类（因为都继承自Control并由select方法），Image类并不是


/**
 * 类
 * */
 // 基类存在constructor构造函数需要用super()来调用
 // 1、公共 public，默认成员都是public公共可以自由访问
 // 2、私有 private，不能在声明它的类的外部访问
class Animal {
    private name:string;
    constructor(theName:string){this.name = theName;}
}
new Animal('cat').name // error,name是私有的

// 只有来自同一处声明时，才认为两个类型时兼容的。
// 3、受保护的修饰符 protected
class Person {
    protected name:string;
    constructor(name:string){this.name = name}
}
class Employee extends Person {
    private department:string;

    constructor(name:string,department:string){
        super(name)
        this.department = department
    }

    public getElevatorPitch(){
        return `${this.name}${this.department}`
    }
}
let howard = new Employee('JOY','Sales')
howard.getElevatorPitch() // JOY Sales
howard.name; // 错误，
// 不能再Person类外使用name,但是仍然可以通过Employee类的实例方法访问，因为Employee是由Person派生而来的
// 被保护的不能直接实例化，只能被继承

// 4、readonly 只读修饰符
// 一旦初始化不能更改

// 5、存取器 - TypeScript支持通过getters/setters来截取对象成员的访问。有效控制对象成员的访问
// 只有get没有set默认为只读，readonly

// 6、静态属性 static - 静态成员只存在于类的本身不在实力上 
