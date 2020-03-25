---
title: express
lang: zh-CN
sidebarDepth: 2
---

## 参数获取

### req.body req.query req.params 的区别

req.body：获取的是 post 请求中 body 中的数据。

req.query：获取的是 get 请求中参数中的数据。

req.params：获取的是 url 路径中 类似于 :id的数据 (形如：app.get('/user/:id'))。

### get 请求

使用 req.query 获取。

```js
app.get('/getTest', (req, res) => {
  console.log('query', req.query)
})
```

### post 请求

使用 req.body 获取。

post请求需要借助 body-parser 模块，对body进行解析。

```js
...
var bodyParser = require('body-parser')
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({extended:true})) // for parsing application/x-www-form-urlencoded
...
app.post('/postTest', (req, res) => {
  console.log('body', req.body)
})
```

### 参数转码

```js
http://192.168.0.109:9999/filetotxt?url=http://test.file.careerfrog.com.cn/api/files/585459?originalName=艾心怡-13588165743.pdf

// 需要对上述参数中的中文转码，再对参数转码才能获取正确的 url

1. 中文转码

http://192.168.0.109:9999/filetotxt?url=http://test.file.careerfrog.com.cn/api/files/585459?originalName=%E8%89%BE%E5%BF%83%E6%80%A1-13588165743.pdf

2. 参数转码

http://192.168.0.109:9999/filetotxt?url=http%3A%2F%2Ftest.file.careerfrog.com.cn%2Fapi%2Ffiles%2F585459%3ForiginalName%3D%25E8%2589%25BE%25E5%25BF%2583%25E6%2580%25A1-13588165743.pdf
```
## 总结

### 什么是 express

express 是一个简洁而灵活的 node.js 的 Web 应用框架，可以用于创建各种 Web 应用。

### 环境构建

方式一： 直接构建

```js
mkdir my-app
cd my-app
npm init -y
npm install express --save
```

```js
// 添加node程序热更新
npm install hotnode -g
"script": {
  "start": "hotnode index.js"
}

npm start // 启动
```

方式二：使用 express-generation 构建一个完整的脚手架

```js
npm install express-generator -g
express --view=pug myapp
cd myapp
npm install
```
### 端口配置

```js
// get-ip.js
// 获取本机 ip 地址
var os = require('os'), ip = '', ifaces = os.networkInterfaces()
out:
for (var i in ifaces) {
  for (var j in ifaces[i]) {
    var val = ifaces[i][j]
    if (val.family === 'IPv4' && val.address !== '127.0.0.1') {
      ip = val.address
      break out
    }
  }
}
module.exports = ip

// 配置服务端口
var server = app.listen(3000, ip, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Listen at http://%s:%s', host, port)
})
```

### debug

```js
// 普通项目
npm install debug --save-dev

// index.js
...
// 此处的 http 为自定义名称，启动时指定相同的名称即可
var debug = require('debug')('http') // 引入debug进行调试
...
app.get('/getTest', (req, res) => {
  // debug 请求的方式、url 和 参数
  debug(req.method + '' + req.url + '' + JSON.stringify(req.query))
})

// 使用 gitbash 
// 不能将 debug=http 配置到 package.json 中，此配置启动时会报错
// 方式一：启动
debug=http node index.js

// 方式二：hotnode 启动
debug=http hotnode index.js
```
```js
// 使用 express-generator 构建的项目
debug=项目名称:http node ./bin/www // ./ 可以省略
```
调试多个（使用逗号分隔）：DEBUG=http,mail,express:* node index.js

### 路由

作用：用于确定应用程序如何响应客户机请求。包含一个 url 地址和 一个特定的 http 请求方法。

```js
// get 请求
app.get('/getData', function (req, res) {
  ...
})

// post 请求
app.get('/postData', function (req, res) {
  ...
})

// 支持任何请求
app.all('/data', function (req, res) {
  ...
})
```

#### 路由路径匹配

字符串、字符串模式、正则

```js
// 字符串
// 匹配路径 /all
app.get('/all', function (req, res) {
  ...
})

// 字符串模式
// 匹配 /a 和 /ab
app.get('/a?b', function (req, res) {
  ...
})

// 正则
// 匹配路径中包含 a 的所有路由
app.get(/a/, function (req, res) {
  ...
})
// 匹配 /abcd
app.get(/^\/abcd$/, function (req, res) {
  ...
})
```

### 部署静态文件

作用：提供 图片、css、js 等文件的访问。

借助：express.static 内置中间件函数。

```js
// 对外开放静态资源文件
app.use(express.static('public')) 
// 访问：http://10.10.20.172:3000/images/icon.png

// 映射成虚拟路径
app.use('/static', express.static('public'))
// 访问：http://10.10.20.172:3000/static/images/icon.png

// 映射成绝对路径（更安全）
app.use('/static', express.static(path.join(__dirname, 'public')))
```

### 中间件函数

作用：
1. 执行任何代码
2. 更改请求和响应对象
3. 结束请求或响应循环
4. 调用堆栈中的下一个中间件

通过调用 next() 将控制权交给下一个中间件函数，如果未调用，将保持挂起状态。

#### 装入中间件函数

使用 app.use()

```js
...
var handle = function (req, res, next) {
  console.log('do')
  next()
}
app.use(handle)
...
```
中间件函数的执行顺序按照中间件的装入顺序。

### 中间件类型

1. 应用层中间件
2. 路由器层中间件
3. 错误处理中间件
4. 内置中间件
5. 第三方中间件

跳过路由器中间件中剩余堆栈的中间件函数，使用 next('route') 将控制权交给下一个路由。

```js
app.get('/abcd',  function (req, res, next) {
  console.log('1')
  next('route')
}, function (req, res) {
  console.log('2')
  res.send('this is 2')
})
app.get('/abcd', function (req, res) {
  console.log('3')
  res.send('this is 3')
})
// 1 3
```
#### 应用层中间件

定义：直接将中间件函数绑定在应用程序对象的实例上。

```js
var express = require('express')
var app = express()

// 方式一：使用 app.use()
app.use(function (req, res, next) {
  console.log('hello')
  next()
})

// 为路径 /user/:id 中的任何 HTTP 请求执行此函数
// /user/:id 相当于 /user/*
app.use('/user/:id', function (req, res, next) {
  console.log('hello')
  next()
})

// 方式二：使用app.METHOD()
app.get('/', function (req, res) {
  console.log('hello')
  res.send('hello')
})
```
#### 路由器层中间件

定义：中间件函数绑定在 app.Router() 的实例上

```js
var express = require('express')
var router = express.Router()
```
使用 router.use() 或 router.METHOD() 装入路由器层中间件。

```js
router.use(function (req, res, next) {
  console.log('this is router')
  next()
})

router.get('/a', function (req, res) {
  console.log('a')
  res.send('a')
})

app.use('/', router) // 只能挂载在根路径上
```
#### 错误处理中间件

```js
app.use(function (err, req, res, next) {
  console.log(err.stack)
  res.status(500).send('Something broke!')
})
```
错误处理中间件最后定义。

```js
...
app.use(function (req, res, next) {
  next('404 not found') // next(new Error('404 not found))
})
app.use(function (err, req, res, next) {
  res.render('error', { error: err })
})
// app.use(function (err, req, res, next) {
//   res.send('404 not found')
// })

app.use(function (req, res, next) {
  next({status: 404, result: '404 not found'})
})
app.use(function (err, req, res, next) {
  res.send(err)
})
```
```js
// 例：
app.get('/aaa', function (req, res, next) {
  next({status: 500, result: '服务器异常'})
})
app.use(function (req, res, next) {
  next({status: 404, result: '404 not found'})
})
app.use(function (err, req, res, next) {
  res.send(err)
})
// 访问：http://10.10.20.172:3000/aaa 返回：{"status":500,"result":"服务器异常"}
// 访问：http://10.10.20.172:3000/bbb 返回：{"status":404,"result":"404 not found"}
```
#### 内置中间件

Express 中唯一内置的中间件函数是 express.static。

### 模板引擎

借助 pug 文件，使用 res.render() 呈现模板文件内容。

```js
// 创建views文件夹，创建 index.pug 写入以下内容
// views/index.pug
html
  head
    title= title
  body
    h1= message
```
方式一：

```js
// 指定模板文件所在目录
app.set('views', './views')

// 使用
// 必须指定 view 文件的扩展名
app.get('/', function (req, res) {
  res.render('index.pug', { title: 'Hey', message: 'Hello there!'})
})
```
方式二：

```js
// 安装 pug
npm install pug --save

// 设置
app.set('view engine', 'pug')

// 使用
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'})
})
```
附：Pug是一款健壮、灵活、功能丰富的HTML模板引擎,专门为 Node.js 平台开发。

### 设置超时时间

```js
const server = app.listen(8888, () => {
  console.log('http://localhost:8888')
})

server.setTimeout(1000)

// 或
server.timeout = 1000
```