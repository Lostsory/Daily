const axios =require('axios')
const service = axios.create({
  baseURL: `http://localhost:9000/api/`, // api的base_url
  timeout: 5000 // 请求超时时间
})
axios({
  url: 'rubbishImg',
  method: 'post',
  data: {
    a:1
  }
})
