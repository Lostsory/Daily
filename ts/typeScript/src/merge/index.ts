interface A{
  x: number,
  // y: string, // 错误
  foo(bar: number): number  // 5
  foo(bar: 'a'): number // 2
}

interface A{
  y: number,
  foo(bar: string) : string,  // 3
  foo(bar: number[]) : number[]  //4
  foo(bar: 'b'): number // 1

}

let mergeA: A = {
  x: 1,
  y: 2,
  foo(bar: any){
    return bar
  }
}