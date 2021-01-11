// function identity(arg){
//   return arg;
// }

// interface Fun{
//   <T>(arg: T): T
// }

// let myIdentity: Fun = identity;
// console.log(myIdentity(12));


// interface Len{
//   length: number
// }
// function identity<T extends Len>(arg: T): T{
//   console.log(arg.length);
//   return arg
// }
// identity([1,2,3,4,5,6])

// 检查对象上的键是否存在 keyof
/* interface Person{
  name: string;
  age: number;
  loacation: string
}
type K1 = keyof Person
type K2 = keyof Person[]
type K3 = keyof { [x:string]: Person }

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  console.log(obj[key]);
  return obj[key]
}

const P1: Person = {
  name: 'qzx',
  age: 23,
  loacation: 'BJ'
}

const P1Name: string =  getProperty(P1, 'name')
const P1Sex: string =  getProperty(P1, 'sex') */

// 泛型参数默认类型
// interface DefaultInterface<T=string> {
//   name: T
// }


// const strA: DefaultInterface = {
//   name: "qzx"
// }
// const strb: DefaultInterface<number> = {
//   name: 123
// }


// 泛型条件类型 T extends U ? X : Y  (infer用法)
// interface Dictionary<T = any>{
//   [x:string]: T
// }

// type Strdict = Dictionary<number>

// type DictMember<T> = T extends Dictionary<infer V> ? V : never

// type StrDictMember = DictMember<Strdict>


/* async function stringPromise() {
  return 'hello qzx'
}

interface Person {
  name: string;
  age: number
}

async function personPromise() {
  return { name: 'lss', age: 30 } as Person
}

type Promisetype<T> = (arg: any[]) => Promise<T>

type UnProimsify<T> = T extends Promisetype<infer U> ? U : never

type extractStringPromise = UnProimsify<typeof stringPromise>
type extractPersonPromise = UnProimsify<typeof personPromise>

type MyReturnType<T extends (...arg: any) => any> = T extends (...arg: any) => infer V ? V : any */


/* interface TestReturn{
  (): Person
}
type TestReturnType = MyReturnType<() => number>
type TestReturnType1 = MyReturnType<TestReturn>
type TestReturnType2 = MyReturnType<never> */


// 要求 Translate
//  1. 提取出为函数类型的属性，丢弃掉其它类型的属性
//  2. 将函数返回类型调整为形参类型(假定有且只有一个参数)
/* interface Logger {
  time: number;
  asyncLog:(msg: string) => Promise<string>;
  syncLog:(msg: string) => number;
}

type Pickdemo = Pick<Logger, "time">

type FilterKeyOfFunction<T> =  {
  [P in keyof T]: T[P] extends Function ? P : never
}[keyof T]

type Demo1 = FilterKeyOfFunction<Logger>

type SubType<T> = Pick<T, FilterKeyOfFunction<T>>

type Demo2 = SubType<Logger>

type ArgAsReturn<T> = {
  [P in keyof T]: T[P] extends ((arg: infer U) => any) ? ((arg: U) => U) : never
}

type Demo3 = ArgAsReturn<SubType<Logger>> */

// 要求tuple 转 union 
/* type TTuple = [string, number]

type ElementOf<T> = T extends Array<infer U> ? U : never
// type ElementOf<T> = T extends (infer U)[] ? U : never

type ToUnion = ElementOf<TTuple> */



