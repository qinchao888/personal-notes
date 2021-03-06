---
title: 开发总结
lang: zh-CN
sidebarDepth: 2
---

## h5

### 调试工具

1. vconsole
2. eruda

```html
<!-- 引入vconsole -->
<script src="https://cdn.bootcdn.net/ajax/libs/vConsole/3.3.4/vconsole.min.js"></script>
<script>new VConsole()</script>

<!-- 引入eruda -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/eruda"></script>
<script>eruda.init();</script>
```

### reset.css

```css
/* reset.css */
*, ::before, ::after { /* 选中所有的元素和伪元素 */
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-box-sizing: border-box; /* 主流浏览器兼容（主流浏览器的内核为webkit内核） */
  -webkit-tap-highlight-color: transparent; /* 清除点击高亮效果 */
}
body {
  font-size: 14px;
  font-family: "Helvetica Neue", Helvetica, sans-serif;
}
ul, ol {
  list-style: none;
}
a {
  text-decoration: none;
  color: #333;
}
input, textarea {
  border: none;
  outline: none;
  resize: none;
  -webkit-appearance: none; /* 清除移动端输入框特有样式 */
  -webkit-tap-highlight-color: transparent;
}
```

### h5初始字体设置

```css
html, body {
  font-family: "Helvetica Neue", Helvetica, sans-serif;
}

html, body {
  font-family: "Helvetica Neue",Helvetica, Arial,sans-serif; /*美团*/
  font-family: -apple-system,Helvetica,sans-serif; /*京东*/
  font-family: sans-serif; /*阿里云，腾讯*/
  font-family: "Helvetica Neue", Helvetica, STHeiTi, sans-serif; /*腾讯*/
}
```

### 设置 letter-spacing 后 文字不居中

```css
.text {
  letter-spacing: 2px;
  text-indent: 2px;
}
```
### 移动端元素点击时背景高亮显示

```css
/* 解决办法 */
.text {
  -webkit-tap-highlight-color: transparent;
}
```

### textarea 不显示右下角的角标

```css
textarea {
  resize: none;
}
```

### 移动端获取图片自适应高度

使用 rem 布局，图片宽高比假设为 2 : 1，则图片的自适应高度为 375 / 37.5 * 0.5 = 5rem

::: tip 注：
js 脚本中的 rem 适配设置了 540px 的限制，即超过该限制 rem 的值不再改变。
:::

### 移动端禁止页面缩放

当设置 user-scalable=0 或 user-scalable=no 无效。

```js
<script>
window.onload = function () {  
  document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {  
      event.preventDefault();  
    }  
  })
  var lastTouchEnd = 0;  
  document.addEventListener('touchend', function (event) {
    var now = (new Date()).getTime();  
    if (now - lastTouchEnd <= 300) {  
      event.preventDefault();  
    }  
    lastTouchEnd = now;  
  }, false)  
}
</script>
```
### 设置行高影响了其他的元素

需要：左侧文字内容超出换行，设置行高 line-height 调节行间距，导致右侧内容受行高影响。

解决方法：给右侧的元素嵌套一个 div 即可。

```html
<head>
<style>
.detail {
  display: flex;
}
.detail>.description {
  flex: 1;
  color: #999;
  margin-right: 10px;
  line-height: 22px;
}
.detail .apply {
  display: flex;
}
.detail .apply div {
  align-self: flex-end;
  color: #fff;
  background-color: #626dad;
  font-size: 13px;
  padding: 0.133333rem 0.4rem;
  border-radius: 30px;
}
</style>
</head>
<body>
  <div class="detail">
    <div class="description">描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述</div>
    <div class="apply"><div>立即申请</div></div>
  </div>
</body>
```
### h5页面缓存

需求：从h5跳转至第三方页面后返回仍旧保持之前访问的状态。避免微信进入h5页面安卓不缓存，IOS缓存h5页面引起的状态不一致。

使用sessionStorage存储需要缓存的数据

### 重置页面滚动条状态

```js
<script>
  history.scrollRestoration = 'manual'
</script>
```
### 电脑微信浏览器进入 h5 页面空白

原因：电脑版的微信浏览器有一部分 es6 语法不兼容，如：let 、箭头函数。页面中的 let 修改为 var ,箭头函数修改为     function。

### swiper 组件在 ios 下的 bug

描述：设置 loop: true 后的轮播图固定定位在顶部，ios 下的回弹效果导致图片显示为空白。

```
// 解决办法
.swiper-slide {
  transform: translateZ(1px);
}
```
### less 中使用 calc() 无效

原因：和 less 的语法冲突了，less 把 calc 的参数当作运算式执行了。解决方式是使用 Less 的转义字符~。

```css
min-height: calc(~"100% - 3rem");

div{
  @val: 0.20rem;
  width: calc(~"100% - @{val}");
}
```
### 1px 边框

```
.border_b(@color) {
  position: relative;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    border-bottom: 1px solid @color;
    transform: scaleY(0.5);
  }
}

/*单个边框*/
.qb-alert-confirm-btn {
  position: relative;
  font-size: 18px;
}
.qb-alert-confirm-btn::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #ddd;
  transform-origin: left top;
  transform: scaleY(0.5);
}

/*多个边框*/
.qb-alert-confirm-btn {
  position: relative;
  font-size: 18px;
}
.qb-alert-confirm-btn::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 200%;
  border: 1px solid #ddd;
  transform-origin: left top;
  transform: scale(0.5);
}
```
### 元素垂直居中

```
/*固定定位元素垂直居中*/
.qb-alert-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: table;
  margin: auto;
  width: 80%;
  max-width: 300px;
  border-radius: 3px;
  text-align: center;
  background-color: #fff;
}
``` 
### 清除定时器

setTimeout 设置后需要使用 clearTimeout 清除，否则虽然 setTimeout 执行完成，但其仍旧存在在内存中，并且其引用需要设为 null，否则即使计时器被清除，但返回值不会清除，之后设置的计时器的返回值是在之前的返回值上累加。

### flex布局设置overflow无效

设置 min-height: 0 或 min-width: 0 即可
```css
min-height: 0; /*min-width: 0;*/
overflow: auto;
```

### 固定高度的多行文本垂直水平居中

```html
<div style="display:table;height:400px;width:100%;">
  <span style="display:table-cell;vertical-align:middle;text-align:center;">你要填写的内容</span>
</div>
```

### 插值{{}}中使用换行符

```html
<!-- 方式一：使用 v-html -->
<body>
<div id = "app" v-html="msg"></div>
</body>
<script>
  new Vue({
    el: '#app',
    data: {
      msg: `1111<br/>222`
    }
  })
</script>

<!-- 方式二：使用 white-space: pre-wrap -->
<!-- 作用：类似于 pre 标签-->
<style>
  #app {
    white-space: pre-wrap;
  }
</style>
<body>
<div id = "app">{{msg}}</div>
</body>
<script>
  new Vue({
    el: '#app',
    data: {
      msg: `1111\n222`
    }
  })
// 或
  new Vue({
      el: '#app',
      data: {
        msg: `1111
222`
      }
    })
</script>
```

### 禁止输入框粘贴内容

```html
<input type="text" onpaste="return false;">
```

### 文本超出显示省略号

```css
.ellipsis {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
```

### 拷贝和剪切内容至剪贴板

```html
<input type="text"  id="url" value="http://www.baid.com/">
<!--拷贝-->
<input type="button" value="copyLink" onclick="url.select();document.execCommand('copy')">
<!--剪切-->
<input type="button" value="cutLink" onclick="url.select();document.execCommand('cut')">


<body>
<button onclick="copy()">1111</button>
<script>
function copy () {
  var text = Math.random() + '';
  var input = document.createElement('input')
  input.value = text
  /* 不能设置display:none或visibility:hidden */
  input.style = 'opacity: 0;position:absolute;z-index:-1000;'
  document.body.appendChild(input)
  input.select()
  document.execCommand('copy');
  console.log('复制成功！')
}
</script>
```
select()：选取文本。

### 可编辑段落

```html
<p contenteditable="true">这是一个可编辑的段落。</p>
```

### ios下某些文字变色

原因：safari总会把长串数字识别为电话号码，文字变成蓝色，点击还会弹出菜单添加到通讯录。

```html
<!--解决方案-->
<meta name="format-detection" content="telephone=no" />
```

### iphoneX下使用rem适配导致页面显示不全

```html
<!--解决方案-->
<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no,viewport-fit=cover">
```

### ios下时间无法解析

原因：ios不识别时间格式中的 '-'

```js
// 解决方案
var time = '2019-11-29 17:30:30';
time = time.replace(/-/g, '/');
```

### input type=button按钮在ios和android渲染效果不一致

在IOS系统下按钮显示的效果是：有渐变的效果-由白变灰

原因：IOS下有默认的按钮渲染方式（颜色渐变和圆角）

解决方法：添加样式  -webkit-appearance:none;

### ios input输入时白屏

描述：部分 ios 机型下，在 input 框中输入内容时会导致包含 input 的那个大的div白屏。

解决方案：给该父 div 添加 position: relative 即可。

### ios input 默认设置 autofocus 时无法弹出软键盘

在ios移动端， 弹出软键盘只能 行为事件才能触发 弹出软键盘， 脚本事件是不能触发 弹出软键盘。

1. 行为事件：如点击，触屏等。
2. 脚本事件：如 定时器定时触发。

```html
<input type="text" autofocus/>
```

### input 设置高度无效

给 input 设置一个 border 或者 background-color 即可。

```css
input {
  width: 100px;
  height: 60px;
  background-color: transparent; // 或设置 border: none
}
```

### vue中使用$route问题

使用this.$route.path 或 this.$router.currentRoute.path无法获取对应的path。

原因：使用路由懒加载导致的。

#### 不使用懒加载

生命周期顺序为：

父组件的beforeCreate、created、beforeMount --> 所有子组件的beforeCreate、created、beforeMount --> 所有子组件的mounted --> 父组件的mounted 

#### 使用懒加载

生命周期顺序为：

父组件的beforeCreate、created、beforeMount、mounted --> 子组件的beforeCreate、created、beforeMount、mounted,

异步加载组件会导致生命周期的顺序发生改变。

### 检测设备类型跳转至对应的pc或h5页面

```js
// main.js
// 此种方法的缺点：会等当前页面路由完成后在跳转，即会执行前一个页面中的生命周期函数
router.onReady(() => { // 检测设备类型跳转至相应的pc和移动页面
  const isMobile = checkIsMobile()
  const currentPath = router.currentRoute.path
  if (isMobile && !currentPath.includes('/mobile')) { // 移动设备
    router.replace( `/mobile${currentPath}`)
  } else if (!isMobile && currentPath.includes('/mobile')){ // pc设备
    router.replace(currentPath.replace('/mobile', '')
    )
  }  
})

// 较优的方法(直接在路由之前修改url路径)
// router/index.js
export default function createRouter () {
  
  const deviceIsMobile = checkIsMobile()
  const urlIsMobile = location.pathname.indexOf('/mobile/') === 0
  const fullPath = location.href.replace(`${location.origin}`, '')
  if (urlIsMobile && !deviceIsMobile) { // pc页面
    history.replaceState({}, '', fullPath.replace(/^\/mobile/i, ''))
  } else if (!urlIsMobile && deviceIsMobile) { // h5页面
    history.replaceState({}, '', `/mobile${fullPath}`)
  }

  return new VueRouter({
    mode: 'history',
    routes: [
      {
        path: '/order/:id',
        component: _import('pc/Index'),
      },
      {
        path: '/order/:id/finish',
        component: _import('pc/Finish')
      },
      {
        path: '/mobile/order/:id',
        component: _import('mobile/Index'),
      },
      // {
      //   path: '/mobile/order/:id/finish',
      //   component: _import('Finish')
      // },
      {
        path: '*',
        component: _import('NotFound'),
      }
    ],
    scrollBehavior (to, from, savedPosition) {
      if (!savedPosition) {
        return { x: 0, y: 0 };
      }
      return savedPosition;
    }
  })
}

function checkIsMobile () { // 检测是移动端还是pc端设备
  const reg = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone|Opera Mini|MiuiBrowser|XiaoMi)/i;
  return reg.test(navigator.userAgent);
}
```
### 使用rem布局或vw布局导致部分图片显示不圆的bug

解决方案：将图片放大 10 倍再缩小 10 倍即可。

### position: sticky在table中不生效

[参考](https://xiaotiandada.github.io/2019/07/15/Position-Sticky-and-Table-Headers%E3%80%90%E8%A1%A8%E6%A0%BC%E5%A4%B4%E9%83%A8%E5%9B%BA%E5%AE%9A%E3%80%91/)

简述：chrome 中 设置position: sticky; 在table，thead，tr中设置是无效的，只能设置在 th 中。

```css
.header-sticky tr th {
  position: sticky;
  top: 50px;
  background-color: #fff !important;
}
```
注：使用了 position: sticky; 后会忽略掉表格中的设置的border，即border的样式在顶部固定时并不会生效。

解决办法：使用伪元素。

[参考](https://stackoverflow.com/questions/41882616/why-border-is-not-visible-with-position-sticky-when-background-color-exists)

```css
.header-sticky tr th:after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  border-top: 3px solid #71D189;
}
```
### 禁用手机浏览器长按保存图片功能

```css
img {
  pointer-events: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
```

### 移动端video禁用进度条

```js
<video width="100%" height="100%" id="video" playsinline webkit-playsinline="true" x-webkit-airplay="true" x5-video-player-type="h5-page" x5-video-orientation="landscape" controlslist="nofullscreen" poster="../images/transparent.png">
```

### video中设置poster属性后在部分安卓机中点击无法播放视频的bug

部分安卓手机的微信浏览器中不识别 touchstart 事件，换成 click 事件即可。

```js
var video = document.getElementById('video');
document.addEventListener('touchstart', function(){ 
  video.play();
}, false);

document.addEventListener('click', function(){ 
  video.play();
}, false);
```

### input type="file" 上传相同的文件不会触发change事件

原因：input 会存储触发change事件的值，第二次上传时会判断两个是否相等，相等则不触发change事件。

解决办法：上传后清空input的value值即可。

```js
// <input ref="file" class="file" @change="fileChange" type="file"/>

function fileChange () {
  const file = this.$refs.file.files[0]
  ...
  this.$refs.file.value = null
}
```

### 微信二次分享异常

表现：从别人分享的页面再次进入后分享给别人，此时分享的页面异常。

原因：微信分享后的页面会携带参数，导致签名获取异常，分享失效。

解决办法：使用重定向

```js
/* 此写法使用与本身不携带参数的页面 */
if (window.location.search.length > 0) {
  window.location.replace('/')
}
```

### 关闭iOS键盘首字母自动大写

```html
<input type="text" autocapitalize="off" />
```

### 关闭iOS输入自动修正

```html
<input type="text" autocorrect="off" />
```

### 关闭input的拼写检查

行为：输入字母或数字时底部会出现红色的下划线。

```html
<input type="text" spellcheck="false" />
```

### 禁止复制图片

```css
img {
  pointer-events: none;
}
```

### 设置文字在指定的空间中两端对齐

```css
label {
  text-align-last: justify;
  width: 200px;
}
```

### input和label设置宽度溢出

```css
/* 样式重置 */
input {
  margin: 0;
  padding: 0;
  outline: none;
  border: none;
}
.form-wrap {
  width: 200px;
  font-size: 0; /* 解决空格 */
  margin: 0 auto;
}
label {
  display: inline-block;
  width: 60px;
  font-size: 16px;
}
input {
  padding: 0 6px;
  height: 24px;
  width: 140px;
  background-color: silver;
  box-sizing: border-box;
}
```
```html
<div class="form-wrap">
  <div class="form-item">
    <label>名称：</label>
    <input type="text"/>
  </div>
</div>
```

###  post请求数据量过大错误

1. node 中的 body-parser 允许传输的数据量默认为100kb。
2. nginx 中默认限制文件上传的大小为 1M。

```js
app.use(bodyParser.json({
  limit : '100000kb'
}))
```

```
// 路径： /usr/local/etc/nginx/nginx.conf

#user  nobody;
user root admin;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;
    client_max_body_size 35m; <- 设置此配置即可
    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;
```

### 使用 new Buffer() 报错

原因：由于安全性和可用性问题，不建议使用Buffer()和new Buffer()构造函数，请改用new Buffer.alloc()、Buffer.allocUnsafe()或Buffer.from()构造方法。

```js
Buffer.from(base64Data, 'base64')
```

### 文件转成base64数据至 oss 存储后文件损坏

原因：base64数据需要手动剔除头部。

```js
var base64Data = base64.replace(/^data:image\/\w+;base64,/, '')
```

### input="file"传输的file对象转化成base64

```js
function upload (e) {
  var img = e.target.files[0]
  if(img){
    var reader = new FileReader();
    reader.onload = function (evt) {
      var base64 = evt.target.result
      var base64Data = base64.replace(/^data:image\/\w+;base64,/, '')
      console.log('base64Data', base64Data)
    };
    reader.readAsDataURL(img); // 将 Blob 或 File 对象转成base64
  }
}
```

### ios 下的 select option 中的第一个选项无法选中

```html
<select v-model="optionValue">
  <option value="1">选项一</option>
  <option value="2">选项二</option>
</select>

<script>
new Vue({
  el: '#app',
  data: {
    optionValue: ''
  }
})
</script>
```

需要手动滑一下第一个选项才能选中。在选中 option 时必须要等选择的动画结束才能选中。

#### 解决方案：

1. 添加一个 “请选择“ 选项，设置为 disabled，display: none。
2. 添加一个”空“选项，设置 disabled，display: none。

```html
<select v-model="optionValue">
  <option style="display:none;" disabled>请选择</option>
  <option value="1">选项一</option>
  <option value="2">选项二</option>
</select>

<!-- 或 -->
<select v-model="optionValue">
  <option style="display:none;" disabled></option>
  <option value="1">选项一</option>
  <option value="2">选项二</option>
</select>
```

### node 连接 mysql 八小时自动断开

mysql中设置8小时内未访问则会自动断开链接

```sql
show global variables like '%timeout%';
-- 其中 wait_timeout 和 interactive_timeout 为28800，即8小时
```

```js
// 解决办法

// 方式一：使用监听
const mysql = require('mysql');
let connection;
function connect () {
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'qinchao'
  });
  connection.on('error', function (err) {
    console.log('err', err)
    console.log('errCode', err.code)
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      connect()
    }
  })
  connection.connect(function(){
    console.log('数据库连接成功！')
  });
}
connect()

// 调用
app.post('/test', (req, res) => {
  console.log('req', req.body)
  const name = req.body.name
  const sql = 'insert into test values(?, ?, ?, ?)'
  const time = new Date()
  const values = [null, name, time, time]
  console.log('values', values)
  connection.query(sql, values, function (err, result) {
    if (err) {
      console.log('err', err)
      return
    }
    res.send({
      result
    })
  })
})

// 方式二：使用连接池
const mysql = require('mysql')
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'qinchao'
})
const query = function(sql, callback) { // 查询操作  
  pool.getConnection(function(err, connection) {  
    connection.query(sql, function(err, result) {  
      callback(err, result) // 结果回调
        connection.release()
      }
    );
  })
}
const insert = function(sql, values, callback) { // 插入操作  
  pool.getConnection(function(err, connection) {  
    connection.query(sql, values, function(err, result) {  
      callback(err, result) // 结果回调
        connection.release() // 释放连接资源 | 跟 connection.destroy() 不同，它是销毁
      }
    );
  })
}

// 调用
app.get('/test', (req, res) => {
  query('select * from test', function (err, result) {
    if (err) {
      console.log('err', err)
      return
    }
    res.send({
      result: JSON.parse(JSON.stringify(result))
    })
  })
})

app.post('/test', (req, res) => {
  console.log('req', req.body)
  const name = req.body.name
  const sql = 'insert into test values(?, ?, ?, ?)'
  const time = new Date()
  const values = [null, name, time, time]
  console.log('values', values)
  insert('insert into test values(?, ?, ?, ?)', values, function (err, result) {
    if (err) {
      console.log('err', err)
      return
    }
    res.send({
      result
    })
  })
})
```

## 开发经验

1. 多个页面的Header部分结构大致相同，可将其抽离成组件，不同部分通过 slot 节点传入。

```js
/*HeaderTop组件*/
<div>
  <slot name="left"></slot>
  <div>common部分</div>
  <slot name="right"></slot>
</div>
```

2. 多个页面有的需要显示Footer部分，有的不需要显示。

先在App.vue中引入 Footer组件，通过在路由router中设置meta属性控制Footer组件是否显示。

```js
// router/index.js
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: _import(...),
      meta: {
        showFooter: true
      }
    },
    {
      path: '/other',
      name: 'other',
      component: _import(...)
    }
  ]
})

// App.vue
<div>
  ...
  <footer-guide v-show="$route.meta.showFooter"/>
</div>
```
3. 列表数据使用ul、li标签显示。
4. 默认数据显示需要一定的时间，因此可以通过图片显示大致的结构，通过v-if和v-else控制显示列表还是显示结构图。
5. 表单中使用按钮，点击时默认会触发表单的提交，解决办法：给按钮使用 @click.prevent 阻止表单的默认行为。
6. 获取图片验证码。

```html
<!-- http://localhost:4000/captcha 返回一个svg图片，每调用一次返回一个新的svg图片 -->
<img src="http://localhost:4000/captcha" @click="getCaptcha">
```

```js
getCaptcha (event) {
  // 保证每次设置的 src 值都不同，否则不会再次调用。
  event.target.src = 'http://localhost:4000/captcha?time=' + Date.now()
}
```
7. 设置精灵图

假设：现图片大小为 400px * 400px。使用二倍图解决图片失真问题。

```css
/* 设置公用样式 */
[class^="icon_"], [class*=" icon_"] { /* 包括了 class="icon_xxx 和 class="red icon_xxx" */
  background-image: url("../../images/sprites.png") no-repeat;
  background-size: 200px 200px; /* 对图片进行缩放 */
}
```
```html
<style>
.icon_search {
  width: 20px;
  height: 20px;
  background-position: 0 -103px;
}
</style>
<i class="icon_search"></i>
<i class="icon_logo"><i>
```

### 使用 date-fns 替代 moment.js 减少打包后文件的大小

```js
// 引入方式
import format from 'date-fns/format'

// 此种方式引入的包要比上面的大
import { format } from 'date-fns'
```

### 启动 dist 目录的方法

<p class="fg_t">方式一：使用 serve</p>

```
npm install -g serve

// 切换到指定的项目路径
serve dist
```

<p class="fg_t">方式二：使用anywhere（推荐）</p>

```
npm install -g anywhere
anywhere // 可自动打开浏览器
```

<p class="fg_t">方式三：使用 http-server</p>

```
npm install -g http-server
hs // 启动（或http-server）
```

配置：

```
// package.json
scripts:{
  "dist1": "serve dist",
  "dist2": "anywhere -d dist",
  "dist3": "hs dist -a 10.10.20.172 -o -c-1"
}

// 命令行启动
npm run dist1
// 或 
npm run dist2
// 或
npm run dist3
```
注：使用 http-server 访问时需要指向具体的文件，如：http://10.10.20.172:8083/index.html

<p class="fg_t">方式四：使用 chrome 插件</p>

安装：Web Server for Chrome

[链接地址]<a href="https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb">https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb</a>