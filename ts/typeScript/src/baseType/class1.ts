// abstract class Animal {
//   eat() {
//     console.log('eat');
//   }
//   abstract sleep(): void // 类的多态
// }

// class Cat extends Animal{
//   constructor(public name: string) {
//     super()
//     this.name = name
//   }
//   sleep() {
//     console.log('cat sleep');
//   }
// }

// let cat1 = new Cat('qzx')
// cat1.eat()

// class Bird extends Animal{
//   sleep() {
//     console.log('bird sleep');
//   }
// }

// let bird1 = new Bird()

// let animals: Animal[] = [cat1, bird1]
// animals.forEach(item => {
//   item.sleep()
// })

// class WorkFlow{
//   step1() {
//     return this
//   }
//   step2() {
//     return this
//   }
// }

// class myflow extends WorkFlow{
  
// }

/* function Field(target?: any, name?: any): any {
  var descr = {
    enumerable: true,
    configurable: true,
    writable: true
  };
  console.log(name);
  return descr;
}

function g() {
  console.log("g(): evaluated");
  // return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
  //     console.log("g(): called");
  // }
}

class C {
  
  @Field
  public state: number[] = []

  public method() {
    console.log('method');
  }
}

var myC = new C()
myC.method()
console.log(myC); */

/* function Greeter(target: Function): void {
  target.prototype.greet = function (): void {
    console.log('hello');
  }
}

function DiyGreet(greeting: string) {
  return function(target: Function) {
    target.prototype.greet = function(): void {
      console.log(greeting);
    }
  }
}

// @Greeter
@DiyGreet('hello qzx')
class Greeting{
  constructor() {

  }
  greet: Function
}

let myGreeting = new Greeting()
myGreeting.greet() */

function LogProperty(target: any, key: string) {
  delete target[key]
  const backingFiled = '_' + key
  Object.defineProperty(target, backingFiled, {
    writable: true,
    enumerable: true,
    configurable: true
  })

  const getter = function(this: any) {
    const currentVal = this[backingFiled]
    console.log(`Get:${key} => ${currentVal}`);
    return currentVal
  }

  const setter = function(this: any, newVal: any) {
    console.log(`Set: ${key} => ${newVal}`);
  }

  Object.defineProperty(target, key, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true
  })
}

class ObjPerson{
  @LogProperty
  public name: string;

  constructor(name: string) {
    this.name = name
  }
}

const p1 = new ObjPerson('qzx')
p1.name = "lss"

console.log(p1.name);