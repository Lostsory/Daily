let i = 0
let timer = setInterval(() => {
  i++
  if (i < 20) {
    // 发送信息给主进程
    postMessage(i)
  } else {
    this.close()
    postMessage('关闭了哦')
  }
}, 1000)