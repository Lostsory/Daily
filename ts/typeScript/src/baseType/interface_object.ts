// 接口定义对象

interface listItem{
  readonly id: number,
  value: string,
  age?: number
  // [x: string]: any // 字符串索引签名,
}

interface Result{
  data: listItem[]
}

function render(result: Result) {
  result.data.forEach((item) => {
    console.log(item.id, item.value)
    if (item.age) {
      console.log(item.age);
    }
    // item.id ++   
  })
}

var result = {
  data: [
    {
      id: 1,
      value: '香蕉'
    },
    {
      id: 2,
      value: '苹果'
    }
  ]
}

render(result)

render({
  data: [
    {
      id: 1,
      value: '香蕉'
    },
    {
      id: 2,
      value: '苹果'
    }
  ]
})

// render({
//   data: [
//     {
//       id: 1,
//       value: '香蕉',
//       num: 12, // 多余的属性会报错，解决方法，1.render(result)（result变量存储）， 2,类型断言 render({} as Result)， 3,字符串索引签名
//     },
//     {
//       id: 2,
//       value: '苹果'
//     }
//   ]
// })

// 类型断言语法一
render({
  data: [
    {
      id: 1,
      value: '香蕉',
      num: 12,
    },
    {
      id: 2,
      value: '苹果'
    }
  ]
} as Result)
// 类型断言语法二，不常用，在react有歧义
render(<Result>{
  data: [
    {
      id: 1,
      value: '香蕉',
      num: 12,
    },
    {
      id: 2,
      value: '苹果'
    }
  ]
})

interface StringArray{
  [index: number]: string
}

let chars: StringArray = ['A', 'B']
