// 接口定义函数

let sub: (x: number, y: number) => number

interface Sub{
  (x: number, y: number): number
}

// type Sub = (x: number, y: number) => number

let fn: Sub = (x, y) => x - y


interface Lib{
  (): void,
  version: string,
  dosomething(): void
}



function getLib() {
  let lib: Lib = (() => {}) as Lib
  lib.version = '1.0.0'
  lib.dosomething = () => {}
  return lib
}

let lib1 = getLib()
lib1()
lib1.dosomething()

let lib2 = getLib()