---
title: node
lang: zh-CN
sidebarDepth: 2
---

## 总结

### 热更新

```js
// package.json
"scripts": {
  "start": "node index.js"
}

// 启用node程序热更新
npm install hotnode -g
"script": {
  "start": "hotnode index.js"
}
// 此时修改文件后会自动更新
```

### 请求

post 请求在浏览器中查看会发现其发送了两次请求。

原因：发送了一个非简单请求，第一次请求是预检请求，查询是否支持跨域，请求方式为 OPTIONS，第二次请求才是真正的 POST 请求。

简单请求的 Content-Type 类型仅限：

1. text/plain
2. multipart/form-data
3. application/x-www-form-urlencoded

解决方案：请求的参数以 FormData 的形式传递。即对应 Content-Type 类型为 'application/x-www-form-urlencoded'。

```js
// 使用qs模块将数据转化成 & 形式进行拼接即可
import qs from 'qs'
let data = qs.stringify(data)
axios.post(url, data)
```

<p class="fg_t">Form Data 和 Request Payload 的区别</p>

1. 如果请求头里设置Content-Type: application/x-www-form-urlencoded，那么这个请求被认为是表单请求，参数出现在Form Data里，格式为key=value&key=value&key=value。

2. 原生的AJAX请求头里设置Content-Type:application/json，或者使用默认的请求头Content-Type:text/plain;参数会显示在Request payload块里提交。格式为JSON对象。

附：multipart/form-data：用于上传文件时设置。

### 跨域

```js
// 设置
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  // res.header('Content-type', 'application/json;charset=utf-8')
  next()
})

// 或使用cors模块
// npm install cors --save-dev
const cors = require('cors')
app.use(cors())
```