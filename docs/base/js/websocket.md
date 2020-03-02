---
title: JS
lang: zh-CN
sidebarDepth: 2
---

## 基本用法

[官方文档](https://socket.io/docs/)

### 案例

```
npm install socket.io --save
```

例：

```html
<!-- index.html -->
<body>
  <button onclick="logout()">退出</button>
</body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js"></script>
<script>
const val = Math.random();
function logout () {
  socket.emit('logout', val)
}
function create (text) {
  var div = document.createElement('div');
  div.innerHTML = text;
  document.body.appendChild(div);
  console.log('create');
}
const socket = io('http://localhost:9999');
socket.on('connect', () => {
  console.log('socket已连接！');
  socket.emit('login', val)
});
socket.on('loginEvent', msg => {
  console.log(`${msg}上线！`)
  window.create(`${msg}上线！`)
})
socket.on('logoutEvent', msg => {
  console.log(`${msg}下线！`)
  window.create(`${msg}下线！`)
})
<script>
```

```js
// app.js
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', socket => {
  console.log('socket已连接！');
  socket.on('login', msg => {
    console.log(`${msg}login`);
    socket.broadcast.emit('loginEvent', msg);
    // socket.emit('loginEvent', msg);
  })
  socket.on('logout', msg => {
    console.log(`${msg}logout`);
    socket.broadcast.emit('logoutEvent', msg);
    // socket.emit('logoutEvent', msg);
  })
})

app.get('/', (req, res) => {
  res.render('index');
})

server.listen(9999, () => {
  console.log('http://localhost:9999');
})
```

### broadcast

socket.broadcast.emit(eventName, msg)

此为广播。除本对象所有客户端均可以接收到此数据msg。若需要本对象也接收到消息，需添加 socket.emit(eventName, msg)。