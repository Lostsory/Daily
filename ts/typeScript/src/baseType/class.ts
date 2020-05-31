class Dog{
  // private constructor  表示这个类不能被实例化和继承
  // protected constructor  表示这个类不能被实例化和只能被继承（基类）
  constructor(name: string) {
    this.name = name
  }
  public name: string

  readonly legs: number = 4

  static food: string = 'bones' // 只能通过类名字调用

  age?: number

  run() {
    this.pri()
  }

  private pri() { // 只能在类申明内调用,c不能被类的实例和子类调用
    console.log('private');
  }  

  protected pro() { // 只能在类和子类的申明内调用
    console.log('protected');
  } 
}
console.log(Dog.food);


let dog = new Dog('qzx')
console.log(dog);
dog.run()
// dog.pri()

class Husky extends Dog {
  constructor(name: string, color: string) {
    super(name)
    this.color = color
    // this.pri()
    this.pro()
  }
  color: string
}
console.log(Husky.food);

let hu = new Husky('lss', 'red')

