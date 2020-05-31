// 泛型

// function log<T>(value: T): T{
//   console.log(value);
//   return value
// }
// log<string[]>(['a', 'b', 'c'])
// log([1,2,3,4])

// type Log = <T>(value: T) => T
// let myLog: Log = (v) => {
//   console.log('log:' + v);
//   return v
// }
// myLog('hello')

// interface Log<T = number>{
//   (value: T): T
// }
// let myLog: Log<string> = (v) => {
//   console.log('log:' + v);
//   return v
// }

// let myLog1: Log = (v) => {
//   console.log(v)
//   return v
// }

// class Log<T> {
//   run(value: T): T {
//     console.log(value)
//     return value
//   }

//   // static time: T
// }
// let log1 = new Log()
// log1.run(1)
// log1.run('2')

// let log2 = new Log<number>()
// // log2.run('2')
// log2.run(1)


interface Animal1{
  age: number,
  name: string,
  leg: number,
}
interface Human1 extends Animal1{
  school: string
}
function log<T extends Human1>(value: T) {
  console.log(value);
}

log({
  age: 12,
  name: 'qzx',
  leg: 2,
  school: 'small'
})




