enum Type{ Strong, week }
class Java{
  helloJava(){
    console.log('hello Java');
  }
  java: any = 0
}
class JavaScript{
  helloJavaScript(){
    console.log('hello JavaScript');
  }
  javaScript: any = 0
}

function isJava(lang: Java | JavaScript): lang is Java {
  return (lang as Java).helloJava !== undefined
}

function getLang(type: Type, x?: string | number) {
  let lang = type === Type.Strong ? new Java() : new JavaScript()
  console.log(lang);

  // 1.类型断言
  // if ((lang as Java).helloJava) {
  //   (lang as Java).helloJava()
  // } else {
  //   (lang as JavaScript).helloJavaScript()
  // }

  // 2.instanceof
  // if (lang instanceof Java) {
  //   lang.helloJava()
  // } else {
  //   lang.helloJavaScript()
  // }

  // 3.in
  // if ('java' in lang) {
  //   lang.helloJava()
  // } else {
  //   lang.helloJavaScript
  // }

  // if (typeof x === 'string') {
  //   x.length
  // } else {
  //   x.toFixed(2)
  // }

  if (isJava(lang)) {
    lang.helloJava()
  } else {
    lang.helloJavaScript()
  }
}
// getLang(Type.Strong)
// getLang(Type.week)

// 接口交叉类型
interface DogInterface{
  run(): void
}

interface CatInterface{
  jump(): void
}

let pet: DogInterface & CatInterface = {
  run() {},
  jump() {}
}

// 联合类型
let a: number | string = 1 || '1'
let b: 'a' | 'b' | 'c' = 'a'
let c: 1 | 2 | 3 = 1

class DogClasss implements DogInterface{
  run() {}
  eat() {}
}

class CatClass implements CatInterface{
  jump() {}
  eat() {}
}
enum Master{ dog, cat }
function getPet(master: Master) {
  let pet = master === Master.cat ? new CatClass() : new DogClasss() // pet: DogClasss | CatClass
  pet.eat()
}

interface Square{
  kind: 'square',
  size: number
}
interface Rect{
  kind: 'rect',
  width: number,
  heigh: number
}
interface Circle{
  kind: 'circle',
  r: number
}
type shape = Square | Rect | Circle
function area(s: shape) {
  if (s.kind === 'square') {
    return s.size * s.size 
  } else if(s.kind === 'rect') {
    return s.width * s.heigh
  } else if(s.kind === 'circle') {
    return Math.PI * s.r * s.r
  } else {
    return ((err: never) => {throw new Error(err)})(s)
  }
}

console.log(area({kind: 'circle', r: 24}));
// console.log(area({kind: '123', r: 24}));

// 索引类型
let obj = {
  a: 1,
  b: 2,
  c: 3
}

function getVal(obj: any, keys: string[]) {
  return keys.map(k => obj[k])
}
// console.log(getVal(obj, ['a', 'b']));
// console.log(getVal(obj, ['e', 'f']));

// keyof
interface Obj{
  a: number,
  b: number,
  c: number
}
let key: keyof Obj

// T[K]
let val: Obj['a']

// T extends U
function getVal1<T extends Obj, K extends keyof T>(obj: T, keys: K[]): T[K][] {
  return keys.map(k => obj[k])
}
// console.log(getVal1(obj, ['a', 'b']));

// 映射类型
interface Obj1{
  a: string,
  b: string,
  c: string
}

type ReadonlyObj = Readonly<Obj1>

type PartialObj = Partial<Obj1>

type PickObj = Pick<Obj1, 'a' | 'b'>

type RecordObj = Record<'x' | 'y', Obj1>

// 条件类型
//  T extends U ? X : Y
type TypeName<T> = 
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" :
  T extends undefined ? "undefined" :
  T extends Function ? "function" : 
  "object"

type T1 = TypeName<string>
type T2 = TypeName<string[]>

// (A | B) extends U ? X : Y
// (A extends U ? X : Y) | B extends U ? X : Y
type T3 = TypeName<string | string[]>

type DIff<T, U> = T extends U ? never : T

type T4 = DIff<"a" | "b" | "c", "a" | "e">
type T41 = Exclude<"a" | "b" | "c", "a" | "e">

type NotNUll<T> = DIff<T, undefined | null>
type T5 = NotNUll<string | undefined | null>
type T51 = NonNullable<string | undefined | null>

type T6 = Extract<"a" | "b" | "c", "a" | "e">

type T7 = ReturnType<(x: number) => number>
type T8 = ReturnType<(x: number) => void>

