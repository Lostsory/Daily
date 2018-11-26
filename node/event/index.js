var events = require('events')

var event = new events.EventEmitter()

console.log(events.EventEmitter.prototype);

/* event.on('addEvent', function() {
  console.log('event is added');
})

setTimeout(function() {
  event.emit('addEvent')
}, 2000) */

/* event.on('sum', function(a, b){
  console.log(`值是${a+b}`);
})

event.on('sum', function(a, b){
  console.log(`值是${a-b}`);
})

setTimeout(function() {
  event.emit('sum', 2, 3)
}, 1000)

event.on('error', function() {
  console.log('出错了哦');
})

setTimeout(function(){
  event.emit('sum')
}, 2000) */

/* // 返回监听器的数量
event.emitter.listenerCount('sum') //推荐 */
