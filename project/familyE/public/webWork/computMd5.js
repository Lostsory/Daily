import CryptoJS from 'crypto-js'

this.addEventListener('message', function (e) {
  const dataBin = e.data
  const buffer = new Uint8Array(dataBin.length)
  for (let i = 0; i < dataBin.length; i++) {
    buffer[i] = dataBin.charCodeAt(i)
  }
  blob = new Blob([buffer.buffer], {type})
  let md5Instance = CryptoJS.algo.MD5.create()
  let reader = new FileReader()
  reader.readAsBinaryString(blob)
  reader.onload = (e) => {
    md5Instance.update(CryptoJS.enc.Latin1.parse(e.target.result))
    let md5 = md5Instance.finalize()
    postMessage({md5, blob})
  }
})
