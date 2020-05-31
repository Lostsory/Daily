/// <reference path="b.ts" />
namespace Shape{
  export function circle(x: number) {
    return Math.PI * x * x
  }
}

console.log(Shape.circle(3));
console.log(Shape.square(3));