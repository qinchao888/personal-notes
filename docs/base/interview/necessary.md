---
title: 面试必备
lang: zh-CN
sidebarDepth: 2
---

## HTML

### 行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？

（1）行内元素：a span img input select textarea button label

（2）块级元素：div ul ol li dl dt dd h1~h6 p pre form table tr td th thead tbody tfoot

（3）常见的空元素：br hr img input link meta

（4）inline-block元素：img input

### 常见的浏览器内核有哪些？

1. Trident内核：IE,MaxThon,TT,The World,360,搜狗浏览器等。[又称MSHTML]

2. Gecko内核：Netscape6及以上版本，FF,MozillaSuite/SeaMonkey等

3. Presto内核：Opera7及以上。 [Opera内核原为：Presto，现为：Blink;]

4. Webkit内核：Safari,Chrome等。 [ Chrome的：Blink（WebKit的分支）]

Webkit是苹果公司基于KHTML开发的。他包括Webcore和JavaScriptCore（SquirrelFish,V8）两个引擎。

小程序内核：

1. 在iOS 上，小程序的 javascript 代码是运行在 JavaScriptCore 中

2. 在Android 上，小程序的 javascript 代码是通过 X5 内核来解析

3. 在开发工具上， 小程序的 javascript 代码是运行在 nwjs(chrome内核) 中

X5内核和chrome内核都是基于webkit内核，可以认为它们是webkit内核的一个分支。
X5内核是腾讯基于优秀开源Webkit深度优化的浏览器渲染引擎，搭载在最新一代的手机QQ浏览器上，更快，更便捷。

### cookies，sessionStorage 和 localStorage 的区别？

1. 数据都是存储在客户端。
2. cookie存储的数据量要比sessionStorage和localStorage存储的数据量要少。cookie存储的数据不能超过4kb，而sessionStorage和localStorage存储的数据量可以达到5M或更大。
3. sessionStorage在用户关闭浏览器时，存储的数据消失。localStorage是持久存储，除非用户主动删除本地的数据。cookie在过期时间之前数据都是有效的。

### DOM对象和BOM对象

BOM对象的顶级对象是window对象，DOM对象的顶级对象是document对象，document对象是window对象的一个属性。
即 window.document === document

BOM对象中的navigator、location、screen、history对象均是window对象的一个属性。

### "use strict"的使用及优点

“use strict”：启用严格模式。

1. 使用未声明的变量会报错。
2. 不允许使用delete删除变量或对象。
3. 全局中的this值为undefined。
4. 不允许使用with等。

优点：消除了代码的不安全，提高了编译器效率，提升了运行速度。

附：

with作用：将代码的作用域设置到一个特定的作用域中。

缺点：js解释器会检查with块中的变量是否属于with包含的对象，降低了with语句的执行效率。

### 前端性能优化的方法？

1. 减少http请求次数，代码压缩，使用合适的图片大小。
2. 减少Dom操作。
3. 避免使用css表达式（expression）。
4. 将js脚本至底。
5. 使用浏览器缓存文件。
6. 使用CDN加速。

### input中的change事件和input事件的区别

input：输入框内容改变时触发。

change：输入框内容改变并且鼠标失焦时触发。（比较失焦后输入框内容和输入前是否一致，一致不触发，不一致触发）

如：input中初始值为空，输入1111然后删除为空，此时不会触发change事件。

## Css

### Css可以继承的属性

font-size、font-family、color、text-align、text-indent、line-height、visibility、opacity、cursor等。

### Css盒模型

每个盒子模型都是有margin、border、padding和内容content四个部分构成。

标准盒模型中元素的width等于content。

IE盒模型中元素的width等于border + padding + content。

box-sizing:content-box   W3C盒模型

box-sizing:border-box    IE盒模型

### margin塌陷

（1）兄弟关系的盒子。

（2）父子关系的盒子。

表现：兄弟关系的盒子在竖直方向上出现margin重叠，父子关系的盒子，当给子盒子设置margin-top时，实际上并没有作用在子盒子上，而是作用到了父盒子上。

margin重叠：兄弟关系的盒子，给第一个盒子设置margin-bottom，第二个盒子设置margin-top，两个盒子的margin会发生重叠，值取两者中的最大值。


解决办法：

父子关系的盒子

1. 给父元素设置border: 1px solid transparent
2. 给父元素设置padding值
3. 给父元素设置position: absolute或fixed
4. 给父元素设置 overflow: hidden
5. 给父元素设置 display: table或flex等

兄弟关系的盒子

1. 使用padding替代margin
2. 给其中一个子盒子添加一个父元素，并给父元素设置如上属性即可。

### BFC和IFC的理解

BFC决定一个元素的定位以及与其它元素之间的关系。

形成BFC的条件：
1. 根元素
2. float的属性不为none
3. position为absolute或fixed
4. display为inline-block，table-cell，flex
5. overflow不为visible

#### BFC布局规则：

1. 内部的盒子会在垂直方向上一个个地放置。
2. 盒子垂直方向的距离由margin决定，属于同一个BFC的两个相邻Box的上下margin会发生重叠。
3. 每个元素的左边，与包含的盒子的左边相接触，即使存在浮动也是如此。
4. BFC的区域不会与float box重叠。（设置float后该元素脱离文档流，不再占据原来的位置，后面的元素会占据该位置，如果触发该元素的BFC，则不再占据该位置）。
5. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之也如此。
6. 计算BFC的高度时，浮动元素也参与计算。

BFC的应用：清除浮动，防止margin重叠。

#### IFC布局规则：

1. 在一个行内格式化上下文中，盒是一个接一个水平放置的，从包含块的顶部开始。
2. 这些盒之间的水平方向的margin，border和padding都有效。

### 层叠上下文的理解

决定元素的堆叠顺序。

#### 层叠顺序

1. 层叠上下文的background和border
2. z-index负值
3. 块级元素
4. 浮动元素
5. 行内元素
6. z-index为0 或 auto
7. z-index为正值

#### 规则：

同一个层叠上下文中，层叠水平高的覆盖层叠水平低的，如果相同，后面的覆盖前面的。

```html
<div style="position:relative; z-index:auto;">
    <img src="mm1.jpg" style="position:absolute; z-index:2;">    <-- 1 -->
</div>
<div style="position:relative; z-index:auto;">
    <img src="mm2.jpg" style="position:relative; z-index:1;">    <-- 2 -->
</div>
<!--res: 1 覆盖在2上面-->

<div style="position:relative; z-index:0;">
    <img src="mm1.jpg" style="position:absolute; z-index:2;">    <-- 1 -->
</div>
<div style="position:relative; z-index:0;">
    <img src="mm2.jpg" style="position:relative; z-index:1;">    <-- 2 -->
</div>
<!--res: 2覆盖在1上面-->
```
原因：z-index:0所在的div元素是层叠上下文元素，而z-index:auto所在的div元素是一个普通的元素。
z-index:0的元素层叠水平相同，遵循后来居上的原则，即后面的覆盖前面的。而z-index:auto则是遵循谁的层叠水平高谁就在上面的原则。

#### 创建层叠上下文

1. 根元素（html）
2. z-index不为auto的定位元素
3. css3的新属性：如flex、transform、opacity、filter、will-change、-webkit-overflow-scrolling

### 居中布局

#### 水平居中

1. 行内元素：text-align: center;
2. 块级元素：margin: 0 auto;
3. 父元素设置 display: flex; 子元素设置justify-content: center;
4. 父元素设置 position: relative,子元素设置position: absolute;left: 50%;transform: translateX(-50%);

#### 垂直居中

1. 行内元素：line-height
2. 父元素设置 display: flex; 子元素设置align-items: center;
3. absolute + transform

#### 水平垂直居中

1. absolute + transform
2. flex + justify-content + align-items

#### 使用 display:table 实现多行文本垂直水平居中

```html
<style>
.wrap {
  width: 400px;
  height: 400px;
  background-color: pink;
  display: table;
}
.box {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  background-color: red;
}
</style>
<div class="wrap">
  <div class="box">box</div>
</div>
```
### 选择器优先级

!important > 行内样式 > #id > .class > tag > * > 继承 > 默认

### 选择器权重

1. !important
2. 行内样式 (1000)
3. id (100)
4. class、属性选择器、伪类 (10)
5. 标签、伪元素 (1)
6. 通配符(*) 相邻、子代、后代选择器 (0)


### 列举几个伪类

:link :hover :active :visited :checked :disabled :first-child :last-child

### 清除浮动

1. 设置伪元素，设置clear:both
2. 触发 BFC

### link 和 @import 的区别

1. link 除了可以加载css外还可以定义Rss，而 @import只能加载css。
2. 页面加载时，link 会被同时加载，而 @import 必须要在页面加载完才能加载。
3. @import 必须 IE5+ 才能使用。
4. link支持使用js控制DOM去改变样式，而@import不支持;

## JS

### 原型和原型链

每个对象都有自己的原型，对于构造函数来说，通过prototype属性访问其原型属性，对于构造函数创建的对象来说，通过__proto__访问他的原型对象。原型对象有自己的原型。由__proto__不断访问原型所形成的链称为原型链。

### 执行上下文

对于每个执行上下文，都有三个重要属性：

1. 变量对象(Variable object，VO)
2. 作用域链(Scope chain)
3. this

类型分为全局执行上下文和函数执行上下文以及eval执行上下文。

代码在执行过程中会先创建全局执行上下文，遇到函数时会创建函数执行上下文，执行函数中的代码，执行完成后会将控制权交还给全局上下文。

### 变量对象

变量对象是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明。

### 作用域

作用域：指程序源代码中定义变量的区域。

作用域规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。

JavaScript 采用词法作用域(lexical scoping)，也就是静态作用域。

### 静态作用域与动态作用域

因为 JavaScript 采用的是词法作用域，函数的作用域在函数定义的时候就决定了。

而与词法作用域相对的是动态作用域，函数的作用域是在函数调用的时候才决定的。

### 作用域链

在当前作用域访问某个变量或方法时，如果当前作用域没有，则会去它的上层作用域中寻找，直至全局作用域，形成作用域链。

当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。

### this的理解

this总是指向函数的调用者，this不是在函数定义时确定的，而是在函数执行的时候确定的。

### 闭包

访问另一个函数中变量的函数。

```js
function fn () {
  var a = 1
  return function () { // 闭包，能够访问函数fn中的变量a
    console.log('a')
  }
}
```
定义：

1. 从理论角度，能够访问自由变量的函数。（自由变量：指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量。）
```js
var a = 1;
function foo() {
  console.log(a);
}
foo();
```
2. 从实践角度，能够访问一个函数中变量的函数。

### JSON.parse(JSON.stringify(obj))的限制

1. 拷贝具有循环引用的对象时，报错。
2. 当值为函数、undefined、或symbol时，无法拷贝。

###  instanceof原理

在实例的原型链中能否找到构造函数的原型。

### JS实现继承的方式

1. 原型链继承

```js
function Super () {
  this.name = 'super'
}
Super.prototype.say = function () {
  console.log('hello')
}
function Sub () {
  this.age = '10'
}
Sub.prototype = new Super()
new Sub().say() // 'hello'
```
缺点：属性没有私有化，原型上属性的改变会作用到所有的实例上。

2. 构造函数继承

```js
function Super () {
  this.name = 'super'
}
function Sub () {
  Super.call(this)
}
```
优缺点：实现了属性的私有化，但是子类无法访问父类原型上的属性。

3. 组合继承

利用构造函数和原型链相结合实现继承。

```js

function Super(){  
    this.flag = true;  
}  
Super.prototype.getFlag = function(){  
    return this.flag;     //继承方法  
}  
function Sub(){  
    this.subFlag = flase  
    Super.call(this)    //继承属性  
}  
Sub.prototype = new Super;  
var obj = new Sub();  
Sub.prototype.constructor = Sub;  
Super.prototype.getSubFlag = function(){  
    return this.flag;  
} 
```
Sub.prototype = new Super; 会导致Sub.prototype的constructor指向Super;然而constructor的定义是要指向原型属性对应的构造函数的,Sub.prototype是Sub构造函数的原型，所以应该添加：Sub.prototype.constructor = Sub;

缺点：Super函数会被调用两次。

4. 寄生继承

将Sub.prototype = new Super 修改为 Sub.prototype = Object.create(Super.prototype)

### 模块化

es6: import export

common.js: require module.exports exports

### require与import的区别

1. require是同步加载，import是异步加载。
2. require运行时加载，import时编译时加载。

### 修改this指向的方式

apply、call 和 bind

apply传递的是参数数组，call传递的是参数列表，bind不会立即执行，而apply和call会立即执行。

### JS改变原数组的方法

push(), pop(), shift(), unshift(), sort(), reverse(), splice()

### 内存泄露

1. 意外的全局变量: 无法被回收

```
function leaks(){  
    leak = 'xxxxxx';//leak 成为一个全局变量，不会被回收
}
```
2. 定时器: 未被正确关闭，导致所引用的外部变量无法被释放
3. 循环引用

```js
var a = {}
var b = {a: a}
a.b = b
```

4. 闭包: 会导致父级中的变量无法被释放
5. dom 引用: dom 元素被删除时，内存中的引用未被正确清空

### null 和 undefined的区别

(1) null表示一个空对象，undefined表示一个变量声明未赋值。
(2) null转化为数值时为0，undefined转化为数值为NaN。
(3) null是原型链的终点。

### 值为undefined的情况

1. 变量声明未赋值。
2. 调用函数时，应该传入的参数未传入，该参数为undefined。
3. 访问对象中不存在的属性或数组中不存在的数据。
4. 函数没有返回值，默认为undefined。