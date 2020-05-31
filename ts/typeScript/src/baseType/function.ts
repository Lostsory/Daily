// 函数定义
function fn1(x: number, y: number) {
  return x + y
}

let fn2: (x: number, y: number) => number
fn2 = (x, y) => x + y

interface fn3{
  (x: number, y: number): number
}

type fn4 = (x: number, y: number) => number

type fn5 = (x: number, y: number, z?: number) => number

function fn6(x: number, y: number, z = 0, ...rest: number[]) {
  return x + y
}