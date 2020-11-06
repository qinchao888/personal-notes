---
title: 性能优化
lang: zh-CN
sidebarDepth: 2
---

## 性能监控

```js
// 代码执行时间
var start = window.performance.now();
...
var end = window.performance.now();
```
performance.now() 精确度为 1s 的百万分之一（1ms 的千分之一），而 Date.now() 的精确度只有 1s 的千分之一。

### DOM 结构解析完成 和 DOM 加载完成的区别：

DOM 结构解析完成：表示文档结构已经加载完成（不包含图片等非文字媒体文件）。

DOM 加载完成：表示页面包含图片等外部文件在内的所有元素都加载完成。

## 避免全局查找

访问局部变量的速度要比访问全局变量快些。

## 定时器

对于多次执行的代码，优先使用 setInterval， 因为 setTimeout 每次执行都会初始化一个定时器，而setInterval 只会在开始时初始化一次。

## 避免使用 with 语句

原因：with 语句会创建自己的作用域，内部的代码执行速度较慢。

## 数字转化为字符串

使用 '' + 1 转化为字符串效率最高。

性能：("" +) > String() > .toString() > new String()

## 浮点数转化成整型

使用 Math.floor() 或 Math.round()，不使用parseInt()，原因：parseInt() 是用来将字符串转化为数值的。

## 插入迭代器

```js
var a = arr[i]
i++
// 简写为
var a = arr[i++]
```
## 使用文档碎片(DocumentFragment)

在更新 DOM 时需要插入多个创建的 DOM 元素，可以先将创建的 DOM 元素添加到文档碎片上，最后再一次性添加到文档中。

```js
for (var i = 0; i < 100; i++) {
  var el = document.createElement('p')
  el.innerHTML = i
  document.body.appendChild(el)
}
// 替换为
var frag = document.createDocumentFragment()
for (var i = 0; i < 100; i++) {
  var el = document.createElement('p')
  el.innerHTML = i
  frag.appendChild(el)
}
document.body.appendChild(frag)
```
## 使用 innerHTML 代替构建 DOM 元素

```js
var frag = document.createDocumentFragment()
for (var i = 0; i < 100; i++) {
  var el = document.createElement('p')
  el.innerHTML = i
  frag.appendChild(el)
}
document.body.appendChild(frag)
// 替换为
var html = []
for (var i = 0; i < 100; i++) {
  html.push('<p>' + i + '<p>')
}
document.body.innerHTML = html.join('')
```
## 优化循环

### 简化终止条件

如：将数组的 length 保存在变量中，避免每次循环时重新取值。

```js
var arr = [1, 2, 3, 4]
for (var i = 0; i < arr.length; i++) {...}
// 优化为
for (var i = 0, len = arr.length; i < len; i++) {...}
```
### 优先使用 while 循环

循环：for() while() for(in)

三种循环中 for(in) 的效率极差，因为他需要查询散列键。for() 和 while 循环，while 循环的效率要优于 for()，可能是因为 for() 结构的问题，需要经常跳转回去。

```js
var arr = [1, 2, 3, 4]
var sum = 0
for (var i = 0, len = arr.length; i < len; i++) {
  sum += arr[i]
}
// 优化为：
var arr = [1, 2, 3, 4]
var sum = 0, len = arr.length
while (len--) {
  sum += arr[len]
}
```
## 避免双重解释

### 少用 eval 函数

1. 使用 eval 时相当于运行时再次调用解释引擎，消耗大量时间。
2. 可能存在安全问题

### 不要给 setTimeout 和 setInterval 传递字符串参数

```js
var num = 0
setTimeout('num++', 10)
// 替换为
var num = 0
function addNum () {
  num++
}
setTimeout(addNum, 10)
```

## 避免string的隐式装箱

对string的方法调用，比如'xxx'.length，浏览器会进行一个隐式的装箱操作，将字符串先转换成一个String对象。推荐对声明有可能使用String实例方法的字符串时，采用如下写法：

```js
var myString = new String('Hello World');
```

## return 语句

一条有返回值的return语句不要用()括号来括住返回值，如果返回表达式，则表达式应与return关键字在同一行，以避免压缩时，压缩工具自动加分号而造成返回与开发人员不一致的结果。
```js
function a () {
  return 
  10
}
console.log(a()) // undefined
```
## == 和 === 的使用

在进行比较时最好使用 === （全等运算符）,因为 == 和 != 会进行类型转化。

## 循环引用

```js
function init () {
  var el = document.getElementById('app')
  el.onclick = function () {...}
} 
init()
```
init 在执行的时候，当前上下文我们叫做 context。这个时候，context 引用了 el，el 引用了 function，function 引用了 context。这时候形成了一个循环引用。

```js
// 解决方案,置空 DOM 对象
function init () {
  var el = document.getElementById('app')
  el.onclick = function () {...}
  el = null
}
init()
```
将 el 置空，context 中不包含对 dom 对象的引用，从而打断循环应用

```js
// 获取返回的 DOM 对象
function init () {
  var el = document.getElementById('app')
  el.onclick = function () {...}
  try {
    return el
  } finally {
    el = null
  }
}
init()
```
构造新的 context：

```js
function elClickHangler () {...}
function init () {
  var el = document.getElementById('app')
  el.onclick = elClickHandler
}
init()
```
把 function 抽到新的 context 中，这样，function 的 context 就不包含对 el 的引用，从而打断循环引用。

<p class="fb_t">参考文章</p>

[JS性能优化](https://juejin.im/post/5c6e064c51882562eb50fc18)