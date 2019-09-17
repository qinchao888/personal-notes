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

DOM：操作文档，dom节点。BOM：操作浏览器，如调整窗口大小。

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

### HTML中页面渲染过程

1. 解析HTML生成DOM树，解析CSS生成CSSOM树。
2. 将DOM树和CSSOM树结合，生成渲染树(Render Tree)。
3. 布局绘制，回流和重绘。（回流一定引起重绘而重绘不一定会引起回流）

### url中输入地址的流程

1. URL解析：判断是否是一个合法的url地址。
2. DNS解析
3. TCP连接
4. 发起HTTP请求
5. 接受响应结果
6. 浏览器解析html，进行布局和渲染。

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

### 提高css加载速度的方式

1. 使用CDN加速
2. 代码压缩
3. 缓存css文件（为避免更新css文件后浏览器不更新，给css文件后添加当前的版本号）

```html
<link href="/static/css/index.css?version=20190905" rel="stylesheet">
<!--不要使用时间戳，因为时间戳每次都在变化，浏览器无法缓存-->
```
4. 减少http请求，合并多个css文件

### transition 的属性值

transition：名称 过渡时间 速度曲线 延迟

### box-shadow 的属性值

box-shadow：水平阴影 垂直阴影 模糊距离 阴影尺寸 颜色 内侧阴影还是外侧阴影（inset，默认outset）

1. 水平阴影：正负值，正值x轴右方向扩展。
2. 垂直阴影：正负值，正值y轴下方向扩展。
3. 模糊距离：正值，值越大越模糊，为 0 时没有模糊效果。
4. 阴影尺寸：正负值，正值阴影扩大，负值阴影缩小。

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

```js
//  动态作用域：
function foo() {
    console.log(a);
}

function bar() {
    var a = 3;
    foo();
}

var a = 2;
bar(); // 2;
```
如果js采用的时动态作用域，那么foo在bar中调用，就会先在bar中查询a,输出为3。

### 作用域链

在当前作用域访问某个变量或方法时，如果当前作用域没有，则会去它的上层作用域中寻找，直至全局作用域，形成作用域链。

当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。

### this的理解

this总是指向函数的调用者，this不是在函数定义时确定的，而是在函数执行的时候确定的。

1. 全局中的this指向window，严格模式下为undefined。
2. call，apply，bind可以修改this的指向。
3. setTimeout、setInterval中的this指向window。
4. 箭头函数的 this 总是指向定义生效时所在的对象而不是运行时所在的对象。

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
3. import是es6的语法，最终会转化为require。
4. 使用require引入文件时可以使用变量，而import不可以。

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

### 判断一个对象是否为数组

1. Array.isArray(obj)

2. obj instanceof Array

3. Array.prototype.isPrototypeOf(obj)

4. Object.prototype.toString.call(obj)

```js
var obj = []
Array.isArray(obj) // true
obj instanceof Array // true
Array.prototype.isPrototypeOf(obj) // true
Object.prototype.toString.call(obj) // [object Array]
```
### 判断一个对象为一个空对象

1. 使用 JSON.stringify()

2. 使用 Object.getOwnPropertyNames()

3. 使用 Object.keys()

4. 使用 for ... in ...

```js
var obj = {}
JSON.stringify(obj) === '{}' // true
Object.getOwnPropertyNames(obj).length === 0 // true
Object.keys().length === 0 // true

function isEmptyObject (obj) {
  for (var key in obj) {
    return false
  }
  return true
}
```

### Object.getOwnPropertyNames()、Object.keys()和for...in...的区别

#### Object.getOwnPropertyNames()：返回对象本身的所有属性名组成的数组（包括不可枚举、但不包括Symbol值作为名称的属性）。

#### Object.keys()：返回对象的自身可枚举属性组成的数组。

#### for...in... ：遍历对象本身和原型链上的所有可枚举的属性名。

### 判断对象中是否有某个属性

1. . 和 []

2. in

3. hasOwnProperty()

```js
var obj = {a: 1}
obj.a // true
'a' in obj // true
obj.hasOwnProperty('a') // true
```

### hasOwnProperty() 和 in 的区别

#### hasOwnProperty()：检测一个对象是否含有特定的自身属性，会忽略原型链上继承的属性。

#### in：包括原型链上继承的属性。

### for ... in 和 for ... of 的区别

1. for ... in 会遍历原型链上的可枚举属性。

2. for ... of 遍历的对象必须部署了 iterator 接口，用于遍历可迭代对象。

3. for ... in 遍历数组获取的是key，即索引值，而 for ... of 获取的是数组的值。

```js
// 使用 for ... of 遍历普通对象时会报错
var obj = {a: 1, b: 2}
for (var value of obj) {
  console.log(value) // Uncaught TypeError: obj is not iterable
}

var arr = ['a', 'b', 'c']
for (var key in arr) {
  console.log(key) // 0 1 2
}
for (var value of arr) {
  console.log(value) // a b c
}
```

### == 和 === 的区别

#### 基本数据类型比较：

1. == 先比较数据类型是否一致，一致返回true，不一致转化为相同数据类型比较。
2. === 比较数据类型是否一致，不一致返回false。

#### 复杂数据类型比较：

== 和 === 对于 Object和Array来说没有区别，指向同一个对象（同一个内存地址）返回true，否则返回false。

#### 基本数据类型和复杂数据类型比较：

1. == 将复杂数据类型转化为基本数据类型后再比较（对象和数组类型先调用valueOf()再调用toString()）
2. === 数据类型不一致，返回false

<p class="fr_th">附：如果 x, y 类型不一致，且 x, y 为 String、Number、Boolean 中的某一类型，则将 x, y 使用 Number() 转化数值类型再进行比较。</p>

### 将伪数组转化为数组的方式

1. [...arguments]
2. Array.from(arguments)
3. Array.prototype.slice.call(arguments)

## vue

### MVVM的理解

Model：代表数据模型，用来处理数据和业务逻辑。

View：将数据模型转化成UI进行展示。

ViewModel：监听模型数据的改变和控制视图行为、处理用户交互。

View 和 Model 是通过 ViewModel 进行交互，View 的变化会同步到 Model 上，而 Model 的变化也会同步到 View 上。

优点：通过双向数据绑定将View层和Model层连接起来，开发者只需关注业务逻辑，不需要手动操作dom。

缺点：Model层数据较多，不便于维护。由于数据的双向绑定也使用View层的代码不便于重用。

### Vue生命周期

beforeCreate：实例初始化之后，this指向当前的实例，此时不能访问data、computed、watch、methods中的方法和数据。（加载页面的loading，初始化一些非响应式变量）

created：实例创建完成，可以访问data、computed、watch和methods中的方法和数据，此时未挂载到DOM，$el属性不能访问，$refs属性为空数组。（关闭页面的loading）。

beforeMount：将template编译成render函数。

mounted：实例挂载到DOM上。（发起ajax请求）

beforeUpdate：数据更新时调用。

updated：数据更新后调用。

activated：keep-alive 组件激活时调用。

deactivated：keep-alive 组件失活时调用。

beforeDestroy：实例销毁之前调用。

destroyed：实例销毁后调用。（移除事件监听和定时器）

附：

$refs：注册过的所有DOM元素和组件实例。

$el：vue实例使用的根DOM元素。

### el 和 $el 的区别

el是vue实例的挂载目标，提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标。可以是 CSS 选择器，也可以是一个 HTMLElement 实例。在实例挂载之后可以通过vm.$el访问，如果在实例化时存在这个选项，实例将立即进入编译过程，否则，需要显式调用 vm.$mount() 手动开启编译。

### 什么是vue生命周期

vue实例从创建到销毁的过程就是生命周期。从开始创建、初始化数据、模板编译、挂载DOM->渲染、更新->渲染、销毁等一系列过程，称之为vue的生命周期。

### vue中的生命周期updated如何使用

data中的数据发生变化并且导致页面重新渲染触发updated。

```html
<!--此处必须绑定value，否则只修改value值无法触发页面渲染，不会触发updated-->
<div>{{value}}</div>
```
```js
data () {
  return {
    value: 1
  }
},
mounted () {
  this.value = 2
},
updated () {
  console.log('updated')
}
```
### vue中hash模式和history模式的区别

hash表示的是地址栏URL中#符号(也称作为锚点), hash虽然会出现在URL中, 但是不会被包含在Http请求中, 因此hash值改变不会重新加载页面。页面刷新时不会出现问题。

```js
window.onhashchange = function(e) {}
```

history利用history.pushState()和history.replaceState()使得URL跳转不会重载页面。页面刷新时，如果服务器中没有相应的资源就会返回404。因此需要服务端配置对应的404页面。

```js
window.onpopstate = function (e) {}
```

api|hash|history
---|---|---
push | window.location.assign | window.history.pushState
replace | window.location.replace | window.history.replaceState
go | window.history.go | window.history.go
back | window.history.go(-1) | window.history.go(-1)
forward | window.history.go(1) | window.history.go(1)

### vue中如何新增自定义指令

1. 全局指令：Vue.directive()
2. 局部指令：使用directives

```js
// 全局指令
Vue.directive('focus', {
  inserted: function (el) {
    el.focus() // 聚焦元素
  }
})
// 局部指令
directives: {
  focus: {
    inserted: function (el) {
      el.focus()
    }
  }
}
// 使用 <input v-focus>
```

### vue中如何自定义一个过滤器

1. 全局过滤器：Vue.filter()
2. 局部过滤器：使用filters

```js
// 全局
Vue.filter('formatMoney', function (value) {
  return +value > 0 ? parseFloat((value / 100).toFixed(2)) : value
})
// 局部
filters: {
  formatMoney: function (value) {
    return +value > 0 ? parseFloat((value / 100).toFixed(2)) : value
  }
}
```
### vue中data数据初始化

Object.assign(this.$data, this.$options.data())

### vue的事件修饰符

.stop：阻止事件冒泡

.prevent：阻止默认事件

.capture：添加事件监听器时使用事件捕获模式

.self：触发当前元素上的事件

.once：点击事件只触发一次

.passive：可以提升移动端的性能。浏览器每次都会去查询是否有preventDefault阻止此次事件。使用passive就是告诉浏览器，不用查询了，没有使用preventDefault阻止默认动作。一般用在滚动监听，@scoll，@touchmove。

### $router 和 $route的区别

$router：是VueRouter的实例，包括路由的跳转方法。

$route：指当前的路由信息对象，可以获取name，path，params，query等信息。

### vue.js的两个核心

1. 数据驱动
2. 组件系统（组件化）

###  vue-router 使用params与query传参有什么区别

1. params和name一起使用，query和path一起使用。
2. params使用this.$route.params获取，query使用this.$route.query获取。
3. params在页面刷新时数据会丢失，query不会。
4. params中的参数在url中不能看见，表现行为类似于post，query中的参数可以在url中看见，表现行为类似于get。

```js
// router.js
{
  path: '/test/:id'
  name: 'test',
  component: Test
}

// 页面A -> 页面B
this.$route.push({name: 'test', params: {id: '123'}})
// url: /test/123，刷新页面后this.$route.params返回{id: '123}，此时参数没有丢失

this.$route.push({name: 'test', params: {id: '123', name: 'aaa'}})
// url: /test/123，刷新页面后this.$route.params返回{id: '123}，此时参数name丢失

// 若路由为：
{
  path: '/test'
  name: 'test',
  component: Test
}
this.$route.push({name: 'test', params: {id: '123', name: 'aaa'}})
// url: /test，刷新页面后this.$route.params返回{}，此时参数全部丢失
```

### vue-router中页面跳转有哪些方式

1. router.push()
2. router.replace()
3. router.forward()
4. router.back()
5. router.go(n)

## es6

### Promise的优缺点

#### 优点：

1. 避免请求的多层嵌套，如果存在多个请求并且每个请求依赖于前一个请求，使用Promise可以通过多个then处理。
2. 内部抛出的错误方便处理，可以在catch中处理。

#### 缺点：

1. Promise一旦创建就会立即执行，无法取消。
2. 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
3. 当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

### async/await 对比 Promise 的优势

1. 写法简洁，多个嵌套的请求不需要太多的.then。
2. Promise内部抛出的错误无法被try...catch，而async/await可以。
3. 发生错误时，async/await的错误提示信息比Promise更加友好。

## 小程序

### 小程序页面间有哪些传递数据的方法

1. 使用globalData

```js
App({
  globalData: {
    userInfo: null
  }
})

// 获取
const app = getApp()
console.log(app.globalData)
```
2. 通过页面跳转 wx.navigateTo、wx.redirectTo、wx.reLaunch 中的url携带参数。

获取：在Page中的onLoad中获取或App中的onLaunch和onShow中获取。

附：wx.switchTab 和 wx.navigateBack不能携带参数。

3. 使用缓存。

wx.setStorageSync() 和 wx.setStorage()

## 其他

#### 网络协议的七大层

1. 物理层
2. 数据链路层
3. 网络层  
4. 传输层 
5. 会话层
6. 表示层 
7. 应用层 

[参考](https://www.cnblogs.com/carlos-mm/p/6297197.html)