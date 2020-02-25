---
title: 开发总结
lang: zh-CN
sidebarDepth: 2
---

## h5

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
  transform: scaleY(0.5);
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