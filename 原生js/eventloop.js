setImmediate(function() {
  console.log(7)
})
setTimeout(function() {
  console.log(1);
}, 0)
process.nextTick(function() {
  console.log(6)
  process.nextTick(function() {
    console.log(8)
  })
})
new Promise(function (resolve) {
  console.log(2)
  for(var i = 0; i < 1000; i++) {
    i == 999 && resolve()
  }
  console.log(3)
}).then(function() {
  console.log(4)
})
console.log(5)


/* 

2 -3 -5
宏任务列表： 1 - 7 
微任务列表： 6 - 8 - 4 
2 -3 -5 - 6 - 8 - 4 — 1 - 7

主线程顺序执行，
遇到 7 发现是宏任务，当前的宏任务列表为 7，不执行 
遇到 1 发现是宏任务，当前的宏任务列表为 1 - 7，不执行 （没办法setImmediate等级低只能往后push）
遇到 6 发现是微任务， 当前的微任务列表为 6，不执行
遇到 8 发现是微任务， 当前的微任务列表为 6 - 8，不执行
遇到Promise, 它的特性就是定义之后便会立即执行，所以可以执行，输出 2 ，
遇到resolve， 将.then加入微任务列表， 当前的微任务列表为 6 - 4，不执行
遇到 3，可以执行， 输出3
遇到 5，可以执行，输出5，
没的干了处理微任务，按照微任务列表顺序输出6（过程中发现tmd还有微任务，此时微任务列表为 8 - 4，没办法nextTick等级高只能往前pop）
继续按照微任务列表执行，输出8，输出4
只剩宏任务了，来吧，按照宏任务列表顺序输出1，输出7

*/
