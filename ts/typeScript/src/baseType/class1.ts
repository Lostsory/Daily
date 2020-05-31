abstract class Animal {
  eat() {
    console.log('eat');
  }
  abstract sleep(): void // 类的多态
}

class Cat extends Animal{
  constructor(public name: string) {
    super()
    this.name = name
  }
  sleep() {
    console.log('cat sleep');
  }
}

let cat1 = new Cat('qzx')
cat1.eat()

class Bird extends Animal{
  sleep() {
    console.log('bird sleep');
  }
}

let bird1 = new Bird()

let animals: Animal[] = [cat1, bird1]
animals.forEach(item => {
  item.sleep()
})

class WorkFlow{
  step1() {
    return this
  }
  step2() {
    return this
  }
}

class myflow extends WorkFlow{
  
}
