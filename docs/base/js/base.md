---
title: JS
lang: zh-CN
sidebarDepth: 2
---

## 基础知识

### 事件循环（Event Loop）的理解

#### 知识点

1. Call Stack （调用栈、后进先出（Last In, First Out. 即 LIFO）)
2. Event Table
3. Event Loop （事件循环）
4. Event Queue（任务队列、事件队列或称为回调函数队列 ）

当调用一个函数时，函数会被添加到调用栈中（调用栈是JS引擎的一部分，而不是浏览器特有的）。当函数调用完成时会从调用栈中弹出。

当一个定时器被创建时，定时器内部的函数会被添加到 Web API 中，等时间到后，函数会被添加到任务队列中。注意：并不是时间到后立即添加到调用栈中执行。

事件循环的唯一任务就是连接任务队列和调用栈。它会不停的检查调用栈中是否有任务执行，如果没有，就检查任务队列，从中弹出一个任务，放入调用栈中，如此循环往复。

Event Table：可以理解成一张 事件->回调函数 对应表，用来存储 JavaScript 中的异步事件 (request, setTimeout, IO等) 及其对应的回调函数的列表。

#### 流程

1. 开始，任务先进入 Call Stack
2. 同步任务直接在栈中等待被执行，异步任务从 Call Stack 移入到 Event Table 注册
3. 当对应的事件触发（或延迟到指定时间），Event Table 会将事件回调函数移入 Event Queue 等待
4. 当 Call Stack 中没有任务，就从 Event Queue 中拿出一个任务放入 Call Stack

[参考：事件循环](https://segmentfault.com/a/1190000021445387)

###  Microtask 和 Macrotask

在事件循环中 queue 一共有两种，一种称为 Event Queue，还有一种称为 Job Queue。

Event Queue 在 HTML 规范中被称为 Task Queue，但是为了区分，一般都叫作 Macrotask Queue
Job Queue 是在 ECMAScript 规范中谈及处理 Promise 回调时提到的，但是由于和 V8 中的实现比较相似，所以一般都称为 Microtask Queue。

#### Macrotask

Macrotasks 包含了解析 HTML、生成 DOM、执行主线程 JS 代码和其他事件如 页面加载、输入、网络事件、定时器事件等。从浏览器的角度，Macrotask 代表的是一些离散的独立的工作。

常见应用：

setTimeout, setInterval, setImmediate, requestAnimationFrame, I/O, UI rendering

#### Microtask

Microtasks 则是为了完成一些更新应用程序状态的较小的任务，如处理 Promise 的回调和 DOM 的修改，以便让这些任务在浏览器重新渲染之前执行。Microtask 应该以异步的方式尽快执行，所以它们的开销比 Macrotask 要小，并且可以使我们在 UI 重新渲染之前执行，避免了不必要的 UI 渲染。

常见应用：

process.nextTick, Promises, Object.observe, MutationObserver

[参考：Microtask 和 Macrotask](https://segmentfault.com/a/1190000019415672)

### 节流 和 防抖动

节流：一段时间内一定会触发一次。(类似于滴水的水龙头)

防抖动：终止操作时触发一次。(如在输入框中输入内容，只有结束输入时才会执行一次。类似于坐电梯)

```js
// 节流
var timer
function handleInput () {
  if (!timer) {
    timer = setTimeout(() => {
      console.log('input')
      timer = null
    }, 1000)
  }
}

// 防抖动
var timer
function handleInput () {
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    console.log('input')
  }, 1000)
}
```
封装后的节流和防抖动函数

```js
// 节流
function throttle (fn, delay) {
  var timer
  return function () {
    var args = arguments
    if (!timer) {
      timer = setTimeout(function () {
        fn.apply(this, args)
        timer = null
      }, delay)
    }
  }
}

// 用法：
var test = throttle(function () { // 共用同一个匿名函数
    console.log('input')
}, 1000)
function handleInput () { // oninput时触发
  test()
}

// 防抖动
function debounce (fn, delay) {
  var timer
  return function () {
    var args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function () {
      fn.apply(this, args)
    }, delay)
  }
}

// 用法：
var test = debounce(function () { // 共用同一个匿名函数
    console.log('input')
}, 1000)
function handleInput () {
  test()
}
```
```js
// 节流（保证最后一次操作一次会执行）
function throttle(func, delay) {
  let timer = null;
  let startTime = Date.now();
  return function () {
    let curTime = Date.now();
    let remaining = delay - (curTime - startTime);
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    if (remaining <= 0) {
      func.apply(context, args);
      startTime = Date.now();
    } else {
      timer = setTimeout(func, remaining);
    }
  }
}
```

```js
// 请求时间大于delay时，保证最后一次请求一定能够发出
function debounce (fn, delay) {
  var timer = null
  return function () {
    var args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function () {
      fn.apply(this, args)
    }, delay)
  }
}
var f = debounce(async function (value) {
    // 发起请求
  var res = await new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve({code: 200})
    }, 1200)
  })
  console.log('res', res)
}, 1000)
f()
setTimeout(f, 1100)
```
### scrollTop，innerHeight等用法

获取当前的滚动距离：

```js
let top = document.body.scrollTop || document.documentElement.scrollTop
```
<p class="fg_th">document.body.scrollTop 值一直为0的原因？</p>

原因：

页面指定了DTD，即指定了DOCTYPE时，使用document.documentElement.scrollTop。

页面没有DTD，即没指定DOCTYPE时，使用document.body.scrollTop。

1.页面滚动离开首屏(这时可显示回到顶部的按钮):

```js
(document.body.scrollTop || document.documentElement.scrollTop) > window.innerHeight
```

2.页面滚动到底部了(这时可去调接口获取更多内容):

```js
window.scrollY + window.innerHeight > document.body.offsetHeight
```

### window.location.search

<p class="fg_th">地址：http://10.10.20.67:8084/#/?token=111</p>

```js
location.search // 返回：''
```
<p class="fg_th">地址：https://www.baidu.com/?token=111</p>

```js
location.hash // ''
location.search // ?token=111
```
<p class="fg_th">地址：https://www.baidu.com/?token=111#222</p>

```js
location.hash // '#222'
location.search // ?token=111
```
<p class="fg_th">地址：https://www.baidu.com/#/?token=111#222</p>

```js
location.hash // '#/?token=111#222'
location.search // ''
```
<p class="fr_th">hash：返回#后的内容(包含#)</p>
<p class="fr_th">search：返回?后的内容</p>
<p class="fr_th">search返回?之后#之前的内容，如果#之前没有?则返回空</p>

[参考地址](https://www.jianshu.com/p/04590d2b7d31)

### sessionStorage 和 localStorage

相同点：

1. 存储数据量为5MB
2. 只能存储字符串类型的数据
3. 共享sessionStorage和localStorage的页面必须同源

不同点：

sessiongStorage:生命周期为当前窗口或标签页，窗口或标签页关闭，数据消失。刷新页面sessionStorage仍存在。

localStorage: 除非被清除，否则永久保存。

不同浏览器无法共享localStorage或sessionStorage中的信息。相同浏览器的不同页面间可以共享相同的 localStorage（页面属于相同域名和端口），但是不同页面或标签页间无法共享sessionStorage的信息。这里需要注意的是，页面及标 签页仅指顶级窗口，如果一个标签页包含多个iframe标签且他们属于同源页面，那么他们之间是可以共享sessionStorage的。

### 区分 clientHeight、offsetHeight、scrollHeight、scrollTop 和 offsetTop

clientHeight：padding + height

offsetHeight：border + padding + height

scrollHeight：scrollTop + clientHeight（无滚动条时 scrollHeight = clientHeight）

scrollTop：滚动的高度（无滚动条时 scrollTop = 0）

clientTop：返回元素客户区左上角与整个元素左上角的垂直尺寸，即返回上边框的厚度（borderTopWidth）。返回值为整数，等价于 Math.round(parseFloat(getComputedStyle))。

offsetTop：返回当前元素相对于其 offsetParent 元素的顶部的距离。

<p class="fr_th">offsetParent定义：</p>

1. 返回距离当前元素最近的采用定位祖先元素。

2. 如果祖先元素中没有采用定位的元素，则返回body元素。

### pc端实现长按操作

通过 mousedown 事件和 mouseup 事件判断。

```js
var timer = null
function mousedown() {
  timer && clearTimeout(timer)
  timer = setTimeout(function () {
    console.log('long press')
  }, 1000)
  console.log('mouse down')
}
function mouseup() {
  clearTimeout(timer)
  console.log('mouse up')
}
```

### 前端解析后端传输的图片binary数据并显示图片

```js
// 第一种情况
// app.js(node)，图片数据以 buffer 传输
app.get('/source', async (req, res) => {
  const result = fs.readFileSync('./images/1.jpg') 
  // 如果指定了 encoding 选项，则此函数返回字符串。 否则，返回 buffer
  res.send(result)
})
```

```js
// 第二种情况
// app.js(node)，图片数据以 binary 传输
app.get('/source', async (req, res) => {
  const result = await new Promise((resolve, reject) => {
    fs.readFile('./images/1.jpg', 'binary', function(err, file) {
      if (err) {
        reject(err);
      } else {
        resolve(file)
      }
    })
  })
  /**
   * 或使用 fs.readFileSync 同步读取
   * const result = fs.readFileSync('./images/1.jpg', 'binary')
  */
  res.write(result, 'binary')
  res.end()
  // 注：此处不能使用 res.send，原因：res.send 无法设置 charset，其默认的charset为 'utf-8'
})

// 前端
function createImg (url) {
  var img = document.createElement('img')
  img.src = url
  document.body.appendChild(img)
}

// 解析方式一：使用 arraybuffer
axios.get('http://localhost:8888/source', {
  responseType: 'arraybuffer'
}).then(res => {
  var url = window.URL.createObjectURL(new Blob([res.data])) // arraybuffer
  createImg(url)
})

// 解析方式二：使用 blob
axios.get('http://localhost:8888/source', {
  responseType: 'blob'
}).then(res => {
  var url =  window.URL.createObjectURL(res.data) // blob
  createImg(url)
})
```

```js
// 第三种情况
// app.js(node)，图片数据以 base64 传输
app.get('/source', async (req, res) => {
  const result = await new Promise((resolve, reject) => {
    fs.readFile('./images/1.jpg', 'base64', function(err, file) {
      if (err) {
        reject(err);
      } else {
        resolve(file)
      }
    })
  })
  res.send(result)
})

// 前端解析 base64 数据
axios.get('http://localhost/source').then(res => {
  var url = 'data:image/jpg;base64,' + res.data // base64方式，需要手动拼接头部或者由后端拼好直接显示
  createImg(url)
})

// 后端拼接 base64 头部示例
app.get('/source', async (req, res) => {
  const path = './images/1.jpg'
  const result = fs.readFileSync(path, 'base64')
  const reg = /^[^]+\.([^\.]+)$/
  res.send(`data:image/${path.match(reg)[1]};base64,${result}`)
})
```

### js 获取本机 ip 地址

原理：发送一个 http 请求，由后端将 ip 地址返回。

```html
/* 在 html 文件中引入，会暴露一个全局的 returnCitySN 对象*/
<script src="https://pv.sohu.com/cityjson?ie=utf-8"></script>

<script>
console.log('returnCity', returnCity)
</script>
```

### js 实现图片加载完成再加载 dom

```js
// 第一种：处理所有图片，包括 background 和 img 引入的图片
function loadAllImg (imgUrlList, box) { // 加载函数（核心代码）
  var lenth = imgUrlList.length
  var count = 0
  imgUrlList.forEach(function (url) {
    var image = new Image()
    image.src = url
    image.onload = function () {
      count++
      if (count === lenth) {
        box.style.display = 'block'
      }
    }
  })
}

// 第二种：只处理 img 引入的图片
/**
 * querySelectorAll 返回的是一个 NodeList 对象，自带 forEach，因此可以直接遍历
 * getElementsByTagName 返回的是一个 HTMLCollection 对象，不能使用 forEach，需要使用
 * Array.from 转成数组后才能使用 forEach。
*/
function loadAllImg (box) {
  var imgUrlList = document.querySelectorAll('img')
  var lenth = imgUrlList.length
  var count = 0
  imgUrlList.forEach(function (image) {
    image.onload = function () {
      count++
      if (count === lenth) {
        box.style.display = 'block'
      }
    }
  })
}
```
```html
<!-- 例 -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<style>
  .container {
    display: none;
  }
  img {
    width: 200px;
    height: 200px;
  }
</style>
<body>
  <div class="container" id="container">
    <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1370867500,3998288814&fm=26&gp=0.jpg"/>
    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595329878511&di=b4774e656c65edcb3b1924f51a37489d&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201312%2F03%2F165620x7cknad7vruvec1z.jpg"/>
    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595329878509&di=65fc8cc5959644e794a94e4d67f5df46&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201204%2F17%2F214513vw9rzxo9hxsszy9s.jpg"/>
    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595329878508&di=ab36747f1a6dfebb915308d81246f7e5&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201408%2F07%2F214722z7679t6i71p4lp7j.jpg"/>
    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595329878508&di=9803229afc8a0f5d6f79ba5a6e1fc64d&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201103%2F13%2F1246421us5o5nzszl9ls2n.jpg"/>
  </div>
</body>
<script>
var imgUrlList = [
  'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1370867500,3998288814&fm=26&gp=0.jpg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595329878511&di=b4774e656c65edcb3b1924f51a37489d&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201312%2F03%2F165620x7cknad7vruvec1z.jpg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595329878509&di=65fc8cc5959644e794a94e4d67f5df46&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201204%2F17%2F214513vw9rzxo9hxsszy9s.jpg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595329878508&di=ab36747f1a6dfebb915308d81246f7e5&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201408%2F07%2F214722z7679t6i71p4lp7j.jpg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595329878508&di=9803229afc8a0f5d6f79ba5a6e1fc64d&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201103%2F13%2F1246421us5o5nzszl9ls2n.jpg'
]
var container = document.getElementById('container')
function loadAllImg (imgUrlList, box) {
  var lenth = imgUrlList.length
  var count = 0
  imgUrlList.forEach(function (url) {
    var image = new Image()
    image.src = url
    image.onload = function () {
      count++
      if (count === lenth) {
        box.style.display = 'block'
      }
    }
  })
}
loadAllImg(imgUrlList, container)
</script>
</html>
```

### js 实现图片渐进式加载

#### 第一种：微信浏览器会出现过渡白屏

```html
<style>
html, body {
  margin: 0;
  padding: 0;
}
img {
  width: 100%;
  opacity: 0;
  filter: blur(5px);
  /* this is needed so Safari keeps sharp edges */
  /* transform: scale(1); */
  transition: all 1s linear;
}
.img-small {
  opacity: 1;
}
.img-large {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1306px;
}
.img-large-show {
  filter: none;
  opacity: 1;
  background: transparent;
}
</style>
<body>
  <div id="app" class="box">
    <img data-src="./images/test.png" src="./images/test.jpg"/>
    <img class="img-large" src="./images/test.png"/>
  </div>
</body>
<script>
var imgEl = document.querySelector('img')
var imgLarge = document.querySelector('.img-large')
var imgSmall = new Image()
imgSmall.src = imgEl.src
imgSmall.onload = function () {
  imgEl.classList.add('img-small')
}
imgLarge.onload = function () {
  imgLarge.classList.add('img-large-show')
}
</script>
```

#### 第二种：微信浏览器一定几率会出现过渡白屏，使用blob方式加载

```html
<style>
html, body {
  margin: 0;
  padding: 0;
}
img {
  width: 100%;
  opacity: 0;
  filter: blur(5px);
  /* this is needed so Safari keeps sharp edges */
  /* transform: scale(1); */
  transition: all 1s linear;
}
.img-small {
  opacity: 1;
}
.img-large {
  filter: none;
}
</style>
<body>
  <div id="app" class="box">
    <img data-src="./images/test.png" src="./images/test.jpg"/>
  </div>
</body>
<script>
var imgEl = document.querySelector('img')
var imgLarge = document.querySelector('.img-large')
var imgSmall = new Image()
imgSmall.src = imgEl.src
imgSmall.onload = function () {
  imgEl.classList.add('img-small')
}
let xhr = new XMLHttpRequest();
xhr.open("get", "http://192.168.11.135:8088/images/test.png", true);
xhr.responseType = "blob";
xhr.onload = function (res) {
  if (this.status == 200) {
    var blob = this.response;
    imgEl.src = window.URL.createObjectURL(blob);
    imgEl.classList.add('img-large')
  }
}
xhr.send();
</script>
```

#### 第三种：perfect，使用canvas绘制图片

```html
<style>
html, body {
  margin: 0;
  padding: 0;
}
.img {
  opacity: 0;
  filter: blur(5px);
  /* this is needed so Safari keeps sharp edges */
  transform: scale(1);
  transition: all 1s linear;
}
.img-small {
  opacity: 1;
}
.img-large {
  filter: none;
}
</style>
<body>
  <div id="app" class="box">
    <canvas id="canvas" class="img"></canvas>
  </div>
</body>
<script>
var width = window.innerWidth
var height = 1306
var canvas = document.getElementById('canvas')
canvas.width = width * 2 // 放大两倍
canvas.height = height * 2 // 放大两倍
canvas.style.width = width + 'px'
canvas.style.height = height + 'px'
ctx = canvas.getContext('2d');
ctx.scale(2, 2)

var imgSmall = new Image()
imgSmall.src = './images/test.jpg'
imgSmall.onload = function () {
  canvas.classList.add('img-small')
  ctx.drawImage(imgSmall, 0, 0, width, height);
}
var imgLarge = new Image()
imgLarge.src = './images/test.png'
imgLarge.onload = function () {
  canvas.classList.add('img-large')
  ctx.drawImage(imgLarge, 0, 0, width, height);  
}
</script>
```

### 练习

```js
var str = 'a1b1c1d' // 分割为 [a1, b1, c1, d1]
str.split(/(?<=1)/) // 后行断言，表示当前位置左边将出现匹配字符
```

### JS的赋值

```js
var s = {};
s[s['name'] = 1] = 'name';
s[s['age'] = 2] = 'age';
s // {1: "name", 2: "age", name: 1, age: 2}
```
s['name'] = 1 返回值为 1。赋值语句的返回值为等号右边的值。

```js
// 例1:
var a = {};
b = a;
a.x = a = 3;
console.log(a); // 3
console.log(b); // {x:3}

// 例2:
var a = {};
b = a;
a.x = a = {c: 1};
console.log(a); // {c: 1}
console.log(b); // {x: {c: 1}}
```
分析：

1. '.' 的运算的优先级高于赋值 '='，所以先执行 a.x，此时 a 为 {x: undefined}
2. 从右往左进行赋值运算，由于一开始js已经先计算了a.x，所以在同一条公式的情况下再回来给a.x赋值，也不会重新解析这个a.x为对象a的x。

### 变量和值

1. 不是每一个值都有地址，但每一个变量有。
2. 变量没有类型，值有。变量可以用来保存任何类型的值。

变量都是有内存地址的，变量有用来保存各种类型的值；不同类型的值，占用的空间不同。

基本类型和引用类型的本质区别是，当这个变量被分配值时，它需要向操作系统申请内存资源，如果你向操作系统申请的内存空间的大小是固定的，那么就是基本类型，反之，则为引用类型。

[参考](https://segmentfault.com/a/1190000017407403)

### 逗号运算符

返回值为最后一个表达式。

```js
// 当我们要编写短的 lambda 函数（匿名函数）时，这会派上用场
const fn = (a, b, arr) => (arr.push(a, b), a * b)
var arr = [1, 2]
fn(3, 4, arr) // 12
arr // [1, 2, 3, 4]
```

### void

返回未定义，使用 void 运算符可确保你得到一个真正的 undefined。

```js
function test () { return 1 } 
console.log(void test()) // undefined
```

### blob的用法

```js
mounted () {
  this.getBlobUrl('http://localhost:8082/static/b.png')
  this.canvasToBase64('http://localhost:8082/static/b.png')
},
methods: {
  getBlobUrl (imgUrl) {
    const that = this
    const xhr = new XMLHttpRequest()
    xhr.open('get', imgUrl, true)
    xhr.responseType = 'blob'
    xhr.onload = function () {
      if (this.status === 200) {
        var blob = this.response
        that.url = URL.createObjectURL(new Blob([blob], {type: 'image/png'}))
        that.getBase64(blob)
        console.log('url', that.url)
        console.log('blob', blob)
      }
    }
    xhr.send()
  },
  getBase64 (blob) { // 使用FileReader将blob转化成base64
    const that = this
    const fileReader = new FileReader()
    fileReader.onload = function (res) {
      that.imgBase64 = res.target.result
    }
    fileReader.readAsDataURL(blob) // 将blob转化成base64
  },
  canvasToBase64 (imgSrc) { // 使用canvas将图片转化成base64(可以处理网络图片，但该图片必须允许跨域)
    const that = this
    var image = new Image()
    // image.crossOrigin = ''
    image.src = imgSrc
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')
    image.onload = function () {
      console.log('this', this)
      canvas.width = this.width
      canvas.height = this.height
      ctx.drawImage(this, 0, 0)
      // ctx.drawImage(this, 0, 0, canvas.width, canvas.height)
      that.dataURL = canvas.toDataURL()
    }
  }
}
```

### Date

当月第一天：new Date(year, date - 1, 1)

当月最后一天：new Date(year, date, 0)

### Array.prototype

鲜为人知的事实：Array.prototype 本身也是一个 Array。

```js
Array.isArray(Array.prototype) // true
Object.prototype.toString.call(Array.prototype) // '[object Array]'

var arr = []
arr[0] = 1
arr['a'] = 2
arr // [1, a: 2]
arr[0] // 1
arr[1] // undefined
arr.a // 2
```

### new.target

可以用于判断一个函数是否由 new 调用。当使用 new 调用时指向调用的构造函数，当使用普通函数调用时，返回 undefined。

```js
function A () {
  console.log(new.target.name)
}
new A() // A

function B () {
  console.log(new.target.name)
  console.log(this.constructor.name)
}
new B() // B B
```

### 形参和实参个数统计

arguments.length: 统计实参的个数，即实际传递几个参数，arguments 的 length 就为几。

fn.length: 统计形参的个数，但是只包括第一个具有默认值之前的参数个数。

```js
function a () {
  console.log(arguments.length)
}
a() // 0
a(1) // 1
a(1, 2) // 2

function b () {}
b.length // 0

function b (a, b) {}
b.length // 2

function b (a, b, c = 1) {}
b.length // 2

function b (a, b = 1, c) {}
b.length // 1
```

### window.location

[参考](https://segmentfault.com/a/1190000023020230)

唯一不能设置的属性是window.location.origin，此属性是只读的。

#### window.location.host 和 window.location.hostname 的区别

window.location.host 包括端口名，window.location.hostname 不包括端口名。

```js
// url : http://test.test.com:8080/a

window.location.host // "test.test.com"
window.location.hostname // "test.test.com:8080"
```

#### window.location.toString()

window.location.toString() 返回 window.location.href 的只读版本。

```js
window.location.toString() === window.location.href // true
```

#### window.location.assign()

效果等价于 window.location.href

```js
window.location.assign('https://www.baidu.com')
```

### getBoundingClientRect()

返回元素的大小及其相对于视口的位置。

```js
var box = document.getElementById('box')
var res = box.getBoundingClientRect()
// DOMRect {x: 720, y: 102, width: 100, height: 100, top: 84, left: 720, right: 820, bottom: 202}
```

1. 其中 x 和 left 的值一致，y 和 top 的值一致。在 ie 中不支持 x 和 y 值，因此在使用时尽量避免使用 x 和 y。
2. 返回的该对象的值可以被手动修改，但修改后的结果并不会影响到原元素所在的位置，重新获取该元素位置时，其值并未发生变化。
3. 返回的该对象无法使用 Object.assign 和 rest 语法拷贝。但可以被 for in 遍历。

```js
// 拷贝
var obj = {}
for (var key in res) {
  obj[key] = res[key]
}
obj // 拷贝成功
```

### 具名函数和匿名函数

```js
// 例一
var i = 0
var config = {
  test: function () {
    console.log(i)
    if (i < 3) {
      i += 1
      test() // ReferenceError: test is not defined
    }
  }
}
config.test()

// 例二
var i = 0
var config = {
  test: function test () { // 具名函数可以在函数内部进行递归调用
    console.log(i)
    if (i < 3) {
      i += 1
      test() // 0 1 2 3
    }
  }
}
config.test()

// 例三
var i = 0
var config = {
  test: function () {
    console.log(i)
    if (i < 3) {
      i += 1
      arguments.callee() // 0 1 2 3
      // this.test()
      // config.test()
    }
  }
}
config.test()
```

## 位运算符的应用

### 按位或(|)

#### 取整

```js
function toInt(num) {
  return num | 0
}
toInt(1.1111) // 1
```

### 按位与(&)

#### 判断奇偶数

奇数的二进制最后一位必然为1，所以任意一个奇数 & 1 一定等于1。

```js
val & 1 === 1 // 奇数
val & 1 === 0 // 偶数
```

#### 系统权限设计

假设某个管理系统有a, b, c, d四级权限，其中不同帐号分别有不同的权限（可能有1个或多个），例如admin 账户有a + b +c +d 四级权限，guest用户有b + c权限。

基本思路：

我们把权限分别用0001, 0010, 0100, 1000表示（即最通俗的1，2，4，8），如果admin用户有a, b, c, d四种权限，则admin的权限为 1 | 2 | 4 | 8 = 15，而guest用户权限为 4 | 8 = 12, 则判断用户是否有某种权限可以如下判断：

```js
admin & 4 === 4
admin & 8 === 8
admin & 2 === 2
admin & 1 === 1
```

### 按位异或(^)

#### 切换变量0和1

```js
function toggle(num) {
  return num ^ 1
}
toggle(0) // 1
toggle(1) // 0
/**
 * true ^ 1  -> 0
 * false ^ 1 -> 1
*/
```

#### 交换两个变量的值

原理剖析：a = a ^ b; b = a ^ b 相当与 b = a ^ b ^ b = a ^ (b ^ b) = a ^ 0 = a;

```js
let a = 5,
    b = 6;

a = a ^ b;
b = a ^ b;
a = a ^ b;

// 还可以通过运算
a = a + b;
b = a - b;
a = a - b;

// es 6
[a, b] = [b, a]
```

### 按位非(~)

负数的计算方式：其正数取反加一，即 -a = ~a + 1 <=> ~a = -(a + 1)

公式：～a = -(a + 1)

```js
~10 // -11

// 使用 ~~ 取整
~~1.9999 // 1
~~-1.999 // 2

// 判断数组中某项是否存在
if (~arr.indexOf(item)) {
  // code
}
```

### 按位移动操作符

#### 左移

向左移动指定的位数。向左被移出的位被丢弃，右侧用 0 补充。

公式：x * 2^n

```js
3 << 2 // 12
-3 << 2 // -12
```
```js
// rgba转16进制
/**
 * 即为：FF0000 | FF00 | FF = FFFFFF
 * 等价于16进制：FF << 4, FF << 2, FF
 * 等价于2进制：FF << 16, FF << 8, FF
 * x * 16 ^ 4  = x * 2 ^ 16
 */
function RGBToHex (rgb) { // FF0000 | FF00 | FF = FFFFFF
  var arr = rgb.match(/\d+/g).slice(0, 3)
  return `#${(arr[0] << 16 | arr[1] << 8 | arr[2]).toString(16).padStart(6, '0')}`
}

RGBToHex('rgb(0, 16, 255)') // 0010ff
```

#### 有符号右移(>>)

向右移动指定的位数。向右被移出的位被丢弃，拷贝最左侧的位以填充左侧。即正数左侧补0，负数左侧补1。

公式：x / 2^n

```js
4 >> 2 // 1
-4 >> 2 // -1
```
```js
// 16进制转为rgba
function HexToRGB (hex) {
  var arr = hex.replace(/([0-9a-fA-F])/g, '$1$1')
  return `rgba(${arr[0] >> 16}, ${arr[1] >> 8 & 0xff}, ${arr[2] & 0xff}})`
}

HexToRGB('#fafbfc') // rgb(250, 251, 252)

/**
 * r: 0xfafbfc -> 0x0000fa
 * g: 0xfafbfc -> 0x00fafb & 0xff
 * b: 0xfafbfc -> 0x0000fc & 0xff
*/
```
#### 无符号右移(>>>)

向右被移出的位被丢弃，左侧用0填充。(结果一定是正数)

```js
4 >>> 2 // 1
-4 >>> 2 // 1073741823
```

<p class="fg_th">例：一只青蛙一次可以跳上1级台阶，也可以跳上2级……它也可以跳上n级。求该青蛙跳上一个n级的台阶总共有多少种跳法？</p>

```js
/**
 * 因为n级台阶，第一步有n种跳法：跳1级、跳2级、到跳n级
 * 跳1级，剩下n-1级，则剩下跳法是f(n-1)
 * 跳2级，剩下n-2级，则剩下跳法是f(n-2)
 * 所以f(n)=f(n-1)+f(n-2)+...+f(1)
 * 那么f(n-1)=f(n-2)+f(n-3)+...+f(1)
 * f(n) = 2f(n-1) = 4f(n-2) = 8f(n-3) = 2^(n-1)f(1)
 * f(1) = 1
 * 故f(n) = 1 << (n - 1)
*/
function jumpFloorII(number){
  return 1 << (number-1);
}
```
[参考](https://www.cnblogs.com/mopagunda/p/11221928.html)