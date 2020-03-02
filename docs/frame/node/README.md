---
title: node
lang: zh-CN
sidebarDepth: 2
---

## 基础

### 优势

1. 学习成本低：使用 js 编写代码。
2. 性能：相比较 php，java 性能更好一点（运行在chrome's V8 javascript engine）。
3. 有利于前端代码整合：同一套表单校验规则在 node 端也可以使用。

### Node的三大模块

1. 全局模块：直接可以使用。
2. 系统模块：需要使用 require 引入，但不需要单独下载。
3. 自定义模块

```js
// process 全局模块

// index.js
console.log(process.argv)

// shell
chao.qin@cfdeMacBook-Pro ~/node-study % node index.js -a b c
[ '/usr/local/bin/node',
  '/Users/careerfrog/node-study/index.js',
  '-a',
  'b',
  'c' ]

第一个元素是 process.execPath(返回启动 Node.js 进程的可执行文件的绝对路径名)。
第二个元素将是正在执行的 JavaScript 文件的路径。 
其余元素将是任何其他命令行参数

// 访问 process.argv[0] 的原始值使用 process.argv0

console.log(process.env) // 查看环境变量

{ TMPDIR: '/var/folders/x0/nn5_z7ys1f554my9stx62mym0000gn/T/',
  XPC_FLAGS: '0x0',
  Apple_PubSub_Socket_Render: '/private/tmp/com.apple.launchd.a0A0TcwkVM/Render',
  TERM_PROGRAM_VERSION: '421.2',
  LANG: 'zh_CN.UTF-8',
  TERM_PROGRAM: 'Apple_Terminal',
  XPC_SERVICE_NAME: '0',
  TERM_SESSION_ID: '9F64809E-9164-48EC-8699-C8B85C7C8903',
  SSH_AUTH_SOCK: '/private/tmp/com.apple.launchd.PnMBNf8BbH/Listeners',
  TERM: 'xterm-256color',
  SHELL: '/bin/zsh',
  HOME: '/Users/careerfrog',
  LOGNAME: 'chao.qin',
  USER: 'chao.qin',
  PATH: '/usr/local/opt/mysql@5.7/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/mysql/bin',
  SHLVL: '1',
  PWD: '/Users/careerfrog/node-study',
  OLDPWD: '/Users/careerfrog',
  EDITOR: 'vim',
  PAGER: 'less',
  MAIL: '/var/mail/chao.qin',
  CLICOLOR: '1',
  LESS_TERMCAP_mb: '\u001b[01;31m',
  LESS_TERMCAP_md: '\u001b[01;31m',
  LESS_TERMCAP_me: '\u001b[0m',
  LESS_TERMCAP_se: '\u001b[0m',
  LESS_TERMCAP_so: '\u001b[01;44;33m',
  LESS_TERMCAP_ue: '\u001b[0m',
  LESS_TERMCAP_us: '\u001b[01;32m',
  COLORTERM: 'yes',
  _: '/usr/local/bin/node',
  __CF_USER_TEXT_ENCODING: '0x1F5:0x19:0x34' }
```

```js
// path 系统模块
const path = require('path');

console.log(path.dirname('/a/b/c/1.jpg'))  // /a/b/c
console.log(path.basename('/a/b/c/1.jpg')) // 1.jpg 
console.log(path.extname('/a/b/c/1.jpg'))  // .jpg

// 使用 path.resolve 拼接成绝对路径
console.log(path.resolve(__dirname, 'index.js')) 
// /Users/careerfrog/node-study/index.js
```

```js
// 自定义模块

// module.js
exports.a = 1;
exports.b = 2;

// 或者
module.exports = {
  a: 1,
  b: 2
}

/* 不可写成下述写法，原因：exports 实际就是 module.exports 的引用，
下述写法相当与重新赋值，断开了与 module.exports 的联系 */
exports = {
  a: 1,
  b: 2
}

// index.js
const obj = require('./module')
console.log(obj.a) // 1
console.log(obj.b) // 2
```

#### require

使用 require 引入文件时的规则：

1. 如果使用了路径，则按照相应的路径查找。
2. 如果没有指定，如：require('path')，则会先去当前目录下的 node_modules 中查找，如果没有找到则向上一级查找，直至查找到 node 安装目录下的 node_modules（安装的全局模块位于此处）。

### http 模块

```js
// 构建一个服务
const http = require('http')
const fs = require('fs')
http.createServer((req, res) => {
  let url = req.url
  console.log('url', url)
  if (url === '/') { // 默认为首页
    url = '/index.html'
  }
  fs.readFile(`.${url}`, (err, data) => {
    if (err) {
      res.writeHead(404)
      res.end('404 not found')
    } else {
      res.end(data) // 成功状态码默认为200
    }
  })
}).listen(9999)
```

#### get 请求

```js
// get url: localhost:9999/aaa?username=aa&password=123

const http = require('http')
const url = require('url')

http.createServer((req, res) => {
  console.log('req.url', req.url)
  console.log('data', url.parse(req.url))
  let { pathname, query } = url.parse(req.url, true) // 传入true表示解析query参数
  console.log(pathname, query) // /aaa { username: 'aaa', password: '123' }
}).listen(9999)

/*
data Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?username=aa&password=123',
  query: 'username=aa&password=123',
  pathname: '/aaa',
  path: '/aaa?username=aa&password=123',
  href: '/aaa?username=aa&password=123' }
*/
```

#### post 请求

```js
const http = require('http')
const querystring = require('querystring')

http.createServer((req, res) => {
  const result = []
  req.on('data', buffer => { // 添加数据监听，数据量大的时候会分段传输，多次触发data，所以需要将每次获取的数据添加到result数组中
    result.push(buffer)
  })
  req.on('end', () => { // 数据传输完成
    const data = Buffer.concat(result).toString()
    console.log(data) // username=aa&password=123
    const res = querystring.parse(data) // 将参数转化为对象形式
    console.log(res) // { username: 'aa', password: '123' }
  })
}).listen(9999)
```

|描述|get请求|post请求|
|-|-|-|
|参数|url中|body中|
|处理模块|url|querystring|
|方法|url.parse(req.url, true)|querystring.parse(data)|

#### 解决跨域

设置：'Access-Control-Allow-Origin': '*'即可

```js
...
res.writeHead(200, {
  'Access-Control-Allow-Origin': '*'
})
...
```

### Buffer

```js
> var buf = Buffer.from('aGVsbG8gd29ybGQ=', 'base64')

> buf
<Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>

> buf.toString()
'hello world'

> buf.toString('base64')
'aGVsbG8gd29ybGQ='
```

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

简单请求

- GET 
- HEAD 
- POST 
- Content-Type: (仅当POST方法的Content-Type值等于下列之一才算做简单需求) 
- text/plain 
- multipart/form-data 
- application/x-www-form-urlencoded

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
### 日志

1. stdin 输入流
2. stdout 输出流
3. stderr 错误流



```js
// 将console.error和console.warn的数据写入到error日志中
"scripts": {
  "start": "nodemon index.js 2> error"
}

// 将除console.error和console.warn的console数据写入到info日志中
"scripts": {
  "start": "nodemon index.js 1> info"
}

// 例：

> nano test.js
console.log('this is a log');
console.info('this is a info');
console.warn('this is a warn');
console.error('this is a error');

>node test.js 1>info 2>error

>ls
error   info    test.js

>cat info
this is a log
this is a info

>cat error
this is a warn
this is a error

/* 附：使用 cat 命令创建新文件
cat > a.txt  // cat 只能创建新文件,不能编辑已有文件 */
```
