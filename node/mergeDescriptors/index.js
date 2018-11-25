var minix = require('merge-descriptors');
// console.log(minix); // func

/**
 *  @param desc 
 *  @param source 
 *  @param {Boolean | source是否重新定义desc.默认为true}
 */
minix(desc, source, Boolean)
var obj1 = {
  name: 'qzx',
  age: '16',
  sayName () {
    console.log(this.name);
  },
  sayAge: function() {
    console.log(this.age);
  }
}

/* obj1.sayName()
obj1.sayAge() */

var obj2 = {
  name: 'wn',
  age: '17',
  sex: 'w'
}

// minix(obj1, obj2)
minix(obj1, obj2, false)

console.log(obj1.name);
console.log(obj1);
console.log(obj2);
