---
title: JS
lang: zh-CN
sidebarDepth: 2
---

## 基础知识

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
### js 获取本机 ip 地址

原理：发送一个 http 请求，由后端将 ip 地址返回。

```html
/* 在 html 文件中引入，会暴露一个全局的 returnCitySN 对象*/
<script src="https://pv.sohu.com/cityjson?ie=utf-8"></script>

<script>
console.log('returnCity', returnCity)
</script>
```
