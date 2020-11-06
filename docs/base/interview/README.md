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

### 时间复杂度和空间复杂度

时间复杂度：执行的代码行数之和。

空间复杂度：存储空间的量度。

### 变量提升带来的问题

1. 无法获取期望的值

```js
var num = 1
function f () {
  console.log(num)
  if (false) {
    var num = 2
  }
}
f() // undefined
```
2. for循环中的变量会泄漏为全局变量

```js
for (var i = 0; i < 10; i++){}
console.log(i) // 10
```
::: tip 用 var 声明变量的缺陷：
1. 存在变量提升。
2. 污染全局变量，声明的变量会作为window对象的属性。
:::

### 1.为页面所有元素添加轮廓线：

```js
[].forEach.call($$("*"), function(a) {
  a.style.outline =
    "1px solid #" + (~~(Math.random() * (1 << 24))).toString(16);
});
```

### 2.子元素设置absolute父元素无法撑开

设置绝对定位，子元素脱离文档流，无法实现撑开父元素。其与float不同，设置float的子元素，如果给父元素触发BFC，即可在计算时将floa的元素的高度也一并计算。

### 3.获取鼠标的键值

左键：0   滚轮：1  右键：2

```js
obj.onmousedown = function(e){
    console.log(e.button)
}
```
### 4.dependencies和devDependencies的区别：

devDependencies
里面的插件只用于开发环境，不用于生产环境

dependencies 是需要发布到生产环境的。

### 5.format中的HH和hh以及SS和ss的区别

HH：24小时格式

hh：12小时格式

SS：毫秒数

ss：秒数

### 6.JS中的严格模式

全局启用严格模式：

```js
"use strict";
console.log(this === window) // true
function test() {
    console.log(this === undefined) // true
}
```

[详见](https://www.jb51.net/article/118506.htm)

### 7.栅格系统

名称 | 大小(px) | 对应的设备
---|---|---
xs | <768 | 超小屏幕(手机)
sm | >=768 | 小屏幕(平板)
md | >=992 | 中等屏幕(桌面显示器)
lg | >=1200 | 大屏幕(大桌面显示器)
xl | >=1920 | 超大屏幕

### 8.等宽字体

```html
font-family: Consolas, Monaco, monospace;
  
// 例：使的 a 和 M 等宽
  <div>aaaaaa</div>
  <div>MMMMMM</div>
```
### 9.css 中的 step-start 和 step-end 的用法

用于animation-timing-function属性

首先：两者都可以看成是从一个点到另一个点的运动，
中间没有动画的过程，而是从一个点立即将效果跳转至另一个点。

当设置：

animation-timing-function:step-start; 会忽略第一个点

animation-timing-function:step-end; 会忽略最后一个点

例：

```css
#div1 {
    animation-timing-function:step-start;
}
@keyframes move {
	0% {left: 0;}
	33% {left:100px;}
	66% {left:200px;}
	100% {left: 300px;}
}
```
animation-timing-function:step-start; 0%时 的效果会被忽略，即整个动画过程不会显示 0% 时的状态。

animation-timing-function:step-end; 100%时的效果会被忽略，即整个动画过程不会显示 100% 时的状态。

例：实现 ... loading动画效果。

```js
// CSS代码：
@supports (display:none) {
      dot {
        display: inline-block; 
        width: 3ch;
        text-indent: -1ch;
        vertical-align: bottom; 
        overflow: hidden;
        animation: dot 3s infinite step-start both;
        font-family: Consolas, Monaco, monospace;
    }
}

@keyframes dot {
    33% { text-indent: 0; }
    66% { text-indent: -2ch; }
}
// HTML代码：
<a href="javascript:" class="grebtn">订单提交中<dot>...</dot></a>
```
### 10. 正则

#### 匹配中文 [\u4e00-\u9fa5]

```js
var reg = /^[\u4e00-\u9fa5]+$/
var str1 = 'a你好'
var str2 = 'abc'
var str3 = '你好'
console.log(reg.exec(str1)) // null
console.log(reg.exec(str2)) // null
console.log(reg.exec(str3)) // ["你好", index: 0, input: "你好", groups: undefined]
```
?= ^ $ 等字符匹配的都是位置，可以将位置理解为空字符。

```js
var result = "hello".replace(/(?=l)/g, '#');
console.log(result); 
// => "he#l#lo"

var result = /(?=he)^^he(?=\w)llo$\b\b$/.test("hello");
console.log(result); 
// => true
// 分析：(?=he)匹配的是he前的位置，可以理解为空字符
```

#### 匹配任意字符 [\d\D]、[\w\W]、[\s\S]和[^]

?: 和 ?= 都用于子表达式里面，?: 表示匹配且获取，?= 表示匹配但不获取。

```js
/1(?:2)/ 匹配12

/1(?=2)/ 匹配1，而且是后面有2的那个1
```

### 11. sessionStorage

1. a -> b (新窗口打开), b页面中包含a和b中设置的sessionKey，a页面只包含a中设置的sessionKey。
2. a -> b (共用同一个标签页)，b页面中包含a和b中设置的sessionKey，b返回a，a中包含a和b中的sessionKey。
3. 通过带target="_blank"的a标签、window.open等方式打开新窗口时，会把旧窗口（或标签）的sessionStorage数据带过去，但从此之后，新窗口（或标签）的sessionStorage的增删改和旧窗口已经没有关系了。即旧窗口中的sessionStorage不受新窗口的影响。
4. sessionStorage的session存在周期仅限当前标签页或者当前标签页打开的新标签页，通过其它方式新开的窗口或标签不认为是同一个session。

### 12. background

```css
background-position:50% 50%;

图片水平和垂直居中。与 background-position:center center;效果等同。

等同于x：{容器(container)的宽度—背景图片的宽度}*x百分比，超出的部分隐藏。
等同于y：{容器(container)的高度—背景图片的高度}*y百分比，超出的部分隐藏。

```
<p class="fg">background-size: cover;</p>

将图片等比缩放，直至宽或高能够覆盖给定的区域，因此可能会导致水平方向或竖直方向有部分图片被裁剪（只可能有一个方向上的图片会被裁剪）。

#### 保持图片缩放比

```js
// 1.图片完全显示，不裁剪，但给定的容器会出现部分空白区域
.wrap {
    width: 300px;
    height: 300px;
}
.image {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
}

<div class="wrap">
  <img src="./a.png" class="image"/>
</div>

// 2.竖直或水平方向完全显示，多余部分裁剪
// 如：容器为正方形，图片宽>高，高完全显示，宽裁剪。高>宽，宽完全显示，高裁剪。
.img {
    width: 300px;
    height: 300px;
    background: url(./a.png);
    background-size: cover;
}
<div class="wrap">
    <div class="img"></div>
</div>

// 3.水平方向完全显示，竖直方向裁剪或空白
.wrap {
    width: 300px;
    height: 300px;
    overflow: hidden;
}
.image {
    width: 300px;
}
<div class="wrap">
  <img src="./a.png"/>
</div>
```
### 13. setTimeout的返回值问题

setTimeout中无法return一个值

解决办法：

1. 通过promise
2. 通过callback

```js
// promise
function getValue (val) {
  return new Promise(function (resolve, reject){
    setTimeout(() => {
      resolve(val)
    }, 1000)
  })
}
getValue(888).then(val => {
  console.log(val)
})

// callback
function getValue (val, callback) {
  return new Promise(function (resolve, reject){
    setTimeout(() => {
      callback && callback(val)
    }, 1000)
  })
}
getValue(888, function (val) {
  console.log(val)
})
```
### 14. 解决搜索时防止下一个请求在上一个请求之前返回


```js
data () {
    return {
        canSubmit: true
    }
},
...
getResult: function () {
    if (!this.canSubmit) return
    this.canSubmit = false
    get_merchant_list({
        ... // params
    }).then(res => {
        setTimeout(()=>{
      		this.canSubmit = true
      	},500)
      	if ((res.status+'').charAt(0) == '2') {
      		this.results = res.result.list
      		...
      	}
    })
}
```
### 15. 合并两个数组

```js
var arr1 = [1, 2]
var arr2 = [3, 4, 5]

// 方式一
var res1 = arr1.concat(arr2)

// 方式二
var s2 = [].push.apply(arr1, arr2)
console.log(arr1)

// 方式三
var s3 = [].unshift.apply(arr2, arr1)
console.log(arr2)

// 方式四
var s4 = [].splice.apply(arr2, [0, 0, ...arr1])
console.log(arr2)

// 方式五
var s5 = [].splice.call(arr2, 0, 0, ...arr1)
console.log(arr2)
```
### 16. 动画animation和过渡transition的区别

1. 过渡需要事件才能触发，动画可以自动运行。
2. 过渡只有起始和结束两种状态，而动画可以有多个状态(关键帧)。
3. 动画执行完成会回到起始状态。

附：可以设置animation-fill-mode: forwards，使动画停留在最后一个关键帧。
```js
animation-fill-mode : none | forwards | backwards | both;

值                 描述
none               不改变默认行为。
forwards           当动画完成后，保持最后一个属性值（在最后一个关键帧中定义）。
backwards          在 animation-delay 所指定的一段时间内，在动画显示之前，应用开始属性值（在第一个关键帧中定义）。
both               向前和向后填充模式都被应用。
```

### 17. 数组常用方法

<p class="fg">forEach</p>

返回值：undefined

用法：循环遍历数组，对于空数组不执行。

```
var arr = [1, 2, 3]
var sum = 0
arr.forEach(item => sum += item)
console.log(sum) // 6
```
<p class="fg">find</p>

返回值: 数组中符合条件的值 | undefined

用法：找到数组中第一个符合条件的元素。

例：

```
var arr = [{name: 'aa', value: 1}, {name: 'bb', value: 2}]
var res = arr.find(item => item.name === 'aa')
console.log(res) // {name: 'aa', value: 1}
```

<p class="fg">filter</p>

返回值：数组 | undefined

用法：获取数组中所有符合条件的元素构成的数组。

例：

```
var arr = [1, 2, 3, 4, 1]
var res = arr.filter(item => item === 1)
console.log(res) // [1, 1]
```
<p class="fg">map</p>

返回值：数组（空数组返回 []）

```
var a = [1, 2]
var res = a.map(item => ({value: item})) // [{value: 1}, {value: 2}]
```

<p class="fg">Array.from</p>

返回值：数组对象

参数：
1. 需要转化为数组的对象（具备length属性或可迭代对象）
2. 回调函数
3. 回调函数中this的指向

可迭代对象：对象或原型链上具备Symbol.iterator属性。

String，Array，TypedArray，Map 和 Set 都内置可迭代对象，因为它们的原型对象都有一个 Symbol.iterator 方法。
```js
// 例1：
var arr = Array.from([1, 2, 3], function (x) {
  console.log(this) // {}
  return x * 10
}, {});
console.log(arr) // [10, 20, 30]

// 例2：
var arr = Array.from([1, 2, 3], function (x) {
  console.log(this) // window
  return x * 10
});
console.log(arr) // [10, 20, 30]

// 例3：
var arr = Array.from([1, 2, 3], x => {
  console.log(this) // window,受箭头函数的影响
  return x * 10
}, {});
console.log(arr) // [10, 20, 30]
```
### 18. this 与 window

```js
function all (val) {
  console.log(val)
}
var obj = {
  test: function () {
    console.log(this === obj) // true
    // all.call(this, 'test') // test
    all('test') // test
  }
}
obj.test()
// 两种方式都是由window调用的。
// 原因：函数独立调用（不论这个函数在哪调用），this默认指向到window。
```
### 19. 跨域

1. html中带有src属性的，如img，script不受同源策略的影响，link中的href,a中的href。
2. window.name
3. h5的 postMessage
4. jsonp（只支持get请求）
5. document.domain + iframe
6. websocket（ws非加密和wss加密作为协议前缀）
7. CORS（跨源资源分享Cross-Origin Resource Sharing）

### 20. return的问题

return语句后不能有空行。
```js
function test () {
  return     
  1
}
console.log(test()) // undefined
```
### 21. 在函数前加分号和感叹号的原因：

```js
// 分号
;(function () {
    ...
})()
// 目的：避免压缩后由于前一个脚本最后没有添加分号导致压缩后的脚本不能使用

// 感叹号
!function () {
    ...
}()
// 使用一元运算符保证函数能够正常执行。+ 、 - 、 ~ 均可使用。
```
### 22. 异步

定义：不连续执行的任务，即先执行一部分任务，转而去执行其他任务，一会再回来继续执行。

#### 异步编程的方式

1. 回调函数
2. 事件监听
3. 发布/订阅
4. Promise 对象
5. Generator函数

所谓回调函数，就是把任务的第二段单独写在一个函数里面，等到重新执行这个任务的时候，就直接调用这个函数。

### 23. 函数作用域

```js
// 例1：
let a = 10
function test (a) {
  a = 20
  console.log(window.a) // undefined
}
test()
console.log(a) // 10
console.log(window.a) // undefined

// 例2：
let a = 10
function test () {
  a = 20
}
test()
console.log(a) // 20
```
函数参数拥有自己的局部作用域，修改函数参数的值时不会影响到全局变量。并且函数参数变量是默认声明的，所以不能用let或const再次声明。但可以用var再次声明。

```js
let a = 10
function test (a) {
  const a = 20
}
test()
// Uncaught SyntaxError: Identifier 'a' has already been declared
```
### 24.Form Data 和 Request Payload 区别

如果请求头里设置Content-Type: application/x-www-form-urlencoded，那么这个请求被认为是表单请求，参数出现在Form Data里，格式为key=value&key=value&key=value...

原生的AJAX请求头里设置Content-Type:application/json，或者使用默认的请求头Content-Type:text/plain;参数会显示在Request payload块里提交。

### 25.content-type 的常见类型

::: tip 类型
1.application/x-www-form-urlencoded

(1)浏览器的原生form表单。

(2)提交的数据按照 key1=val1&key2=val2 的方式进行编码，key和val都进行了URL转码。

2.multipart/form-data

用于上传文件时设置。

3.application/json

4.text/plain | text/html | text/xml
:::

### 26.调试工具

1. 正常情况下，选中元素时显示的元素宽高等于元素内容的宽高和padding之和。

### 27.css 3d 坐标轴

几何坐标轴：

![image](../../images/3d-origin.png)

css 3d 坐标轴：

![image](../../images/3d-css.png)

### css 阻塞

1. css加载不会阻塞DOM树的解析。
2. css加载会阻塞DOM树的渲染。（DOM树解析完成但未显示在页面上）
3. css加载会阻塞后面js语句的执行。

## 你不知道的浏览器页面渲染机制

[链接](https://segmentfault.com/a/1190000018811208)

浏览器内核包括两个部分：JS引擎和渲染引擎。

页面加载过程：

1. 浏览器根据DNS服务器得到域名的IP地址。
2. 向这个IP地址的机器发球HTTP请求。
3. 服务器收到，处理并返回HTTP请求。
4. 浏览器得到返回的内容。

### 回流和重绘

<p class="fg_th">减少回流和重绘对性能的影响？</p>

<p class="fb_th">1. 动画效果应用到position属性为absolute或fixed的元素上。</p>

动画效果应用到position属性为absolute或fixed的元素上，它们不影响其他元素的布局，只会导致重新绘制，而不是一个完整回流。消耗会更低。

<p class="fb_th">2. css3硬件加速（GPU加速）。</p>

使用css3硬件加速，设置 transform、opacity、filter、will-change 这些属性不会引起回流重绘。

<p class="fb_th">3. 合并多次对DOM和样式的修改。</p>

```js
var el = document.getElementById('test');
el.style.padding = '5px';
el.style.borderLeft = '1px';
el.style.borderRight = '2px';
```
每个样式的修改都会引起回流，大部分现代浏览器都对其做了优化，因此，只会触发一次重排。但是如果在旧版的浏览器或者在上面代码执行的时候，有其他代码访问了布局信息(上文中的会触发回流的布局信息)，那么就会导致三次重排。

```js
// 解决方案
var el = document.getElementById('test'); 
el.style.cssText += 'border-left: 1px; border-right: 2px; padding: 5px;';
```
### css3硬件加速带来的问题

1. 不能让每个元素都启用硬件加速，这样会暂用很大的内存，使页面会有很强的卡顿感。
2. GPU渲染会影响字体的抗锯齿效果。这是因为GPU和CPU具有不同的渲染机制，即使最终硬件加速停止了，文本还是会在动画期间显示得很模糊。

css3硬件加速：通过GPU进行渲染，解放cpu。

设置了transform会创建一个图层，使用GPU去执行transform操作，该图层又称为复合图层。

<p class="fg_th">创建层的条件：</p>

::: tip 条件

1. 3D 或透视变换(perspective transform) CSS 属性
使用加速视频解码的 元素

2. 拥有 3D (WebGL) 上下文或加速的 2D 上下文的 元素
混合插件(如 Flash)

3. 对自己的 opacity 做 CSS 动画或使用一个动画 webkit 变换的元素

4. 拥有加速 CSS 过滤器的元素(filter)

5. 元素有一个包含复合层的后代节点(换句话说，就是一个元素拥有一个子元素，该子元素在自己的层里)

6. 元素有一个 z-index 较低的并且是一个复合层的兄弟元素

:::

存在一个元素，其兄弟元素在复合层中并且其z-index较小，那么复合层后使用相对或绝对定位的元素<span class="fb_th">可能</span>会被放在复合层中。导致页面卡顿。

解决方案：给当前处于复合层的元素设置<span class="fb_th"> position:relative; z-index:1; </span>即可。

<p class="fb_th">查看：More tools -> Rendering -> Layer borders，黄色的边框表示一个复合层。</p>

[参考](https://div.io/topic/1348)

### 浏览器渲染过程

1. 解析HTML生成DOM树，解析CSS生成CSSOM树。

2. 将DOM树和CSSOM树结合，生成渲染树(Render Tree)。

3. Layout(回流):根据生成的渲染树，进行回流(Layout)，得到节点的几何信息（位置，大小）。

4. Painting(重绘):根据渲染树以及回流得到的几何信息，得到节点的绝对像素。

5. Display:将像素发送给GPU，展示在页面上。（涉及GPU将多个合成层合并为同一个层，并展示在页面中。而css3硬件加速的原理则是新建合成层）。

#### 构建渲染树过程

1. 从DOM树的根节点开始遍历每个可见节点。

2. 对于每个可见的节点，找到CSSOM树中对应的规则，并应用它们。

3. 根据每个可见节点以及其对应的样式，组合生成渲染树。

#### 不可见的节点包括：

1. 一些不会渲染输出的节点，比如script、meta、link等。

2. 一些通过css进行隐藏的节点。比如display:none。注意，利用visibility和opacity隐藏的节点，还是会显示在渲染树上的。只有display:none的节点才不会显示在渲染树上。

### DOM操作影响性能

1. JS 操作依赖 JS 引擎，DOM 属于渲染引擎，JS操作DOM，本质上是 JS 引擎和渲染引擎之间进行了“跨界交流”。

2. DOM操作可能会引起页面的回流和重绘，导致性能问题。

### DOMContentLoaded

1. 在页面加载和解析完成后触发。

2. 触发时机在 onload 事件之前。

3. 在页面JS（非动态插入的JS脚本）执行完成后触发，不包括图片加载完成。

4. 如果其所属 script 标签前引入 css，则必须等样式表加载解析完成才会触发。如果在 script 之后引入样式则不会。

## 总结一

[摘自](https://segmentfault.com/a/1190000019364550)

### addEventListener 

参数：addEventListener(type, listener, options)

```js
element.addEventListener('click', doSomething, {
  capture: false,
  once: false,
  passive: false
});
```
capture:  Boolean，表示 listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发。

once:  Boolean，表示 listener 在添加之后最多只调用一次。如果是 true， listener 会在其被调用之后自动移除。

passive: Boolean，设置为true时，表示 listener 永远不会调用 preventDefault()。如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。

[参考MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)

### scrollTo

传入ScrollToOptions对象参数，设置 behavior: 'smooth' 启用平滑滚动。

```js
window.scrollTo({
  left: 0,
  top: 1000,
  behavior: 'smooth' // 启用平滑滚动
});
```
[兼容性](https://caniuse.com/#feat=element-scroll-methods)

### setTimeout 和 setInterval

向回调函数中传入参数

```js
setTimeout(function (a, b) {
  console.log(a) // 10
  console.log(b) // 20
}, 1000, 10, 20)
```
### defaultChecked

找出默认被选中的单选按钮或复选框，即便更改选择后，defaultChecked的值也不会随之改变。

```html
<form>
  <input type="radio" value="one" name="group1"/>One
  <input type="radio" value="two" name="group1" checked/>Two
  <input type="radio" value="three" name="group1"/>Three
  <label for="box1">box1</label>
  <input type="checkbox" value="box1" id="box1"/>
  <label for="box2">box2</label>
  <input type="checkbox" value="box2" id="box2" checked/>
  <label for="box3">box3</label>
  <input type="checkbox" value="box3" id="box3"/>
</form>
```
```js
var inputList = document.getElementsByTagName('input')
for (var el of inputList) {
  if (el.defaultChecked === true) {
    console.log('当前默认选中', el.value)
  }
}
```
### normalize() 和 wholeText 

normalize()：合并单独的文本节点。

wholeText：相邻的节点的所有文本。

```html
<p id="el">This is default text</p>
```

```js
let el = document.getElementById('el');
el.appendChild(document.createTextNode(' new text'));
console.log(el.childNodes.length); // 2

// 操作一
el.normalize()
console.log(el.childNodes.length); // 1

// 操作二
console.log(el.childNodes[0].wholeText); // This is default text new text
console.log(el.childNodes[1].wholeText); // This is default text new text
console.log(el.childNodes.length); // 2
```
注：

1. 必须在文本节点上调用wholeText，而不是在元素上调用。因此 el.childNodes[0] 和 el.childNodes[1] 均可以正常工作。

2. 文本节点必须相邻，不能被 HTML 分隔。