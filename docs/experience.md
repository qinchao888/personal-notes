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