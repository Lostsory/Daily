// 原始类型
let bool: boolean = false
let num: number = 123
let str: string = 'qzx'

// 数组
let arr1: number[] = [1,2,3,4,5]
let arr2: Array<number> = [1,2,3,4,5]
let arr3: Array<number | string | boolean> = [1,2,3,4,5, '6', true]

// 元组(限制了数组每个元素的类型和个数)
let tuple: [number, string] = [1, '2']
// tuple.push(3)  // 错误用法
// console.log(tuple);
// console.log(tuple[2]); // 不能越界访问

let add = (x:number, y:number): number => x + y
let compute: (x: number, y: number) => number
compute = (x, y) => x + y

// 对象
let obj1: object = {x: 1, y: '2'}
let obj2: {x: number, y: string} = {x: 1, y: '2'}

// symbol
let symbol1: symbol = Symbol()
let symbol2 = Symbol()
// console.log(symbol1 === symbol2);

// undefine null
let un: undefined = undefined
let nu: null = null

// num = un // "strictNullChecks": false,     

// any
let x
x = 1
x = '2'
x = false

// never
let error = () => {
  throw new Error('error')
}
let endless = () => {
  while(true) {}
}
