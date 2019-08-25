---
title: 总结
lang: zh-CN
sidebarDepth: 2
---

## 基础

### delete操作符

1. 返回值为布尔值，一般返回true，即使删除不存在的属性。
2. 如果属性为不可配置，删除时非严格模式下返回false，严格模式下抛出语法错误(即此时执行的delete是无效的)。
3. 删除时只会删除自身属性，不会将原型链上的同名属性一并删除。
4. 使用var声明的变量或函数，严格模式下删除报错，非严格模式下返回false(不论是全局作用域还是函数作用域)。
5. Math, Array, Object等内置对象的属性不可删除。

```js
// 例1:
var obj = {}
Object.defineProperty(obj, 'a', {value:10, configurable: false})
console.log(delete obj.a) // false
console.log(obj) // {a: 10}

// 例2:
'use strict';
var obj = {}
Object.defineProperty(obj, 'a', {value:10, configurable: false})
console.log(delete obj.a) // Uncaught TypeError: Cannot delete property 'a' of #<Object> at <anonymous
console.log(obj) // {a: 10}

// 例3:
var a = 10
console.log(delete a) // false

// 例4:
'use strict'
var a = 10
console.log(delete a) // Uncaught SyntaxError: Delete of an unqualified identifier in strict mode.

// 例5:
var arr = [1, 2, 3]
delete arr[0]
console.log(arr) // [empty, 2, 3]
console.log(arr[0]) // undefined

// 例6: (特例)
// eval函数中使用var声明的变量可以使用 delete 删除
eval('var a = 10')
window.a // 10
delete a // true
a // Uncaught ReferenceError: a is not defined
```
### 图片使用 Data Url 引入

即将图片打包成base64的形式引入到页面中，可以减少http请求次数，提升网页性能。

Base64编码的数据体积通常是原数据的体积4/3，即Data URL形式的图片会比二进制格式的图片体积大1/3，因此大图片并不适合使用Data URL。

### 拥有全局作用域的几种情形

1. 全局中定义的函数或变量。

2. 未声明直接赋值的变量。

```
function f () {
  a = 10
}
console.log(a) // 10
```

3. window对象自身拥有的方法和属性。

### 函数声明的方式

1. 使用函数定义function

2. 使用函数直接量（可以是匿名函数，也可以是带函数名的函数）

3. 使用构造函数Function

```js
// 方式一
function f () {}

// 方式二
var f = function () {}
// 或
var f = function a() {}

// 方式三
var f = new Function('return hello')
```
<p class="fg_th">三种方式的区别：</p>

1. 从作用域上来说，函数声明式和函数直接量使用的是局部变量，而 Function()构造函数却是全局变量。

2. 从执行效率上来说，Function构造函数执行效率低，每次被调用的时候都创建一个新的函数对象。

3. 从加载顺序上来说，function 方式(即函数声明式)是在 JavaScript 编译的时候就加载到作用域中,而其他两种方式则是在代码执行的时候加载。

```js
var s = 'global'
function f () {
  var s = 'part'
  var fn = new Function ('return s') // 使用的是全局变量
  console.log(fn()) // global
}
f()
```

### 变量提升和函数提升

在变量提升和函数提升时，如果变量名和函数名声明时相同，函数优先声明。

```js
console.log(a) // ƒ a () {}
var a = 10
function a () {}
```
### 浏览器的缓存机制

[参考](https://heyingye.github.io/2018/04/16/%E5%BD%BB%E5%BA%95%E7%90%86%E8%A7%A3%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9A%84%E7%BC%93%E5%AD%98%E6%9C%BA%E5%88%B6/)

1. 强制缓存和协商缓存。

2. 强制缓存包含 from disk cache 和 from memory cache。

3. 协商缓存在资源未更新时返回304，表示使用缓存。

<p class="fg_th">内存缓存(from memory cache)：</p>

1. 快速读取，文件存入该进程的内存中。

2. 时效性，该进程关闭，进程中的内存清空。即关闭浏览器，资源被释放。

<p class="fg_th">硬盘缓存(from disk cache)：</p>

1. 读取缓存时需要对硬盘进行I/O操作，读取速度慢。

2. 存储在硬盘中，关闭浏览器资源仍存在。

状态 | 类型 | 说明
---- | ---- | ---- 
200	| form memory cache	| 不请求网络资源，资源在内存当中，一般脚本、字体、图片会存在内存当中
200	| form disk ceche	| 不请求网络资源，在磁盘当中，一般非脚本会存在内存当中，如css等
200	| 资源大小数值 | 从服务器下载最新资源
304	| 报文大小 | 请求服务端发现资源没有更新，使用本地资源

样式表一般在磁盘中，不会缓存到内存中去，因为css样式加载一次即可渲染出网页,
但是脚本却可能随时会执行，如果脚本在磁盘当中，在执行该脚本需要从磁盘中取到内存当中来,
这样的IO开销是比较大的，有可能会导致浏览器失去响应。

### 内存泄漏

1. 全局变量

2. 循环引用

3. 计时器

4. dom 引用

5. 闭包

```js
function example(){
  var element = document.getElementByID("div1");
  element.onclick = function() {
      alert("This is a leak!"); //element变量无法被释放
  }
}

// 解决方案
function example(){
  var element = document.getElementByID("div1");
  element.onclick = function() {
      alert("This is a leak!");
  }
  element = null
}
```

### 时间复杂度和空间复杂度

时间复杂度：代码的执行次数。

空间复杂度：一个算法在运行过程中临时占用存储空间大小。

### 为什么 0.1 + 0.2 != 0.3？

原因：JS采用64位双精度浮点数编码，其中符号位占 1 位，指数位占 11 位，尾数位占 52 位，受计算机存储空间的限制，0.1 和 0.2 在转化为二进制时会丢失部分精度，因此会导致 0.1 + 0.2 != 0.3。

<p class="fg">附：</p>

Number.MAX_SAFE_INTEGER 9007199254740991，表示最大安全数字，小于该值时不会出现精度丢失（小数除外）

Number.MAX_VALUE 1.7976931348623157e+308，大于该值时返回Infinity，介于Infinity和安全值之间的无法精确表示。

### 为什么 11.length 会报错？

原因：整数后的 . 会被认为是小数点，所以会报错。写成 (11).length 即可。11.0.length 也不会报错。

### 检测数据类型的方式

1. typeof

返回值：string、number、boolean、undefined、object、function、symbol 七种。

```js
typeof NaN // number
typeof null // object
```
2. instanceof

定义：判断构造函数的prototype属性是否在对象的原型链上。

只能判断引用类型，不能判断基本数据类型。

3. toString()

使用：Object.prototype.toString.call()

使用 call 的原因：保证调用的是Object.prototype上的toString方法，而不是对象自身的toString方法。

### 判断一个字符串是否为JSON字符串

```js
function isJSON (str) { // 判断是否是JSON字符串
  if (typeof str === 'string') {
    try {
      if (typeof JSON.parse(str) === 'object') {
        return true
      }
      return false
    } catch (e) {
      console.log(e)
      return false
    }
  } else {
    return false
  }
}
console.log(isJSON(null)) // false
console.log(isJSON('{"a":1}')) // true
console.log(isJSON('{a: 1}')) // SyntaxError: Unexpected token a in JSON at position 1
```
### 根据条件禁止 a 链接跳转

```js
<a onclick="check(event)" href="./2.html">跳转至2.html</a>

function check (e) {
  if (condition) { // 禁止跳转
    window.event ? window.event.returnValue = false : e.preventDefault()
  }
}
```

### 实现图片上传并显示

```html
<body>
  <div id="app">
    <input type="file" onchange="change(event)"/>
    <div id="img"></div>
  </div>
</body>
<script>
  function change(e) {
    let img = document.getElementById('img')
    let file = e.target.files[0]
    // 使用FileReader对象将图片url转换成base64格式
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function(e) {
      console.log('this', this)
      let imgUrl = this.result
      img.style.backgroundImage = 'url(' + imgUrl + ')'
    }
  }
</script>
<style>
#img {
  width: 200px;
  height: 200px;
  border: 1px dashed #ddd;
  background-size: cover;
}
</style>
```