class A {
  a: number = 1
}

let [x, y] = [1, 2]
let {a, ...z} = {
  a: 1,
  b: 2,
  c: 3,
  d: 4
}

let n = {
  a, ...z
}