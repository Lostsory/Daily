// 枚举
enum Role{
  role1,
  role2,
  role3,
  role4,
  role5,
}
console.log(Role.role1); // 0
console.log(Role.role2); // 1

enum Role1{
  role1 = 1,
  role2,
  role3,
  role4,
  role5,
}
console.log(Role1.role1); // 1
console.log(Role1.role2); // 2

enum Msg{
  success = '成功',
  fail = '失败'
}

enum Char{
  N,
  M = '异构枚举'
}

// 枚举成员
// Msg.M = '13123' // read only
enum Char1{
  a,
  b = Char1.a,
  // compute  值会保留到运行阶段
  c = '123'.length,
  d = Math.random(),
}

// 常量枚举  不会保留到运行阶段，只会存在于编译阶段
const enum Month{
  Jan,
  Feb,
  Mar
}

let month = [Month.Jan, Month.Feb, Month.Mar]

// 枚举类型
enum E {a, b}
enum F {a = 1, b = 2}
enum G {a = '1', b = '2'}

let e1: E.a = 1
let e2: E.b = 2

let g1: G = G.a
let g2: G.b = G.b

