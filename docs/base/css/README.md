---
title: Css
lang: zh-CN
sidebarDepth: 2
---
## flex

参考：[菜鸟教程](https://www.runoob.com/cssref/css3-pr-flex.html)
[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)

flex: flex-grow flex-shrink flex-basis（由这三部分构成）

flex-grow: 扩展量，数字，默认值为0，负数无效。

flex-shrink: 收缩量，数字，默认值为1，负数无效。

flex-basis: 带单位的数值，默认值为auto，如果设置为0需要加单位，避免被视作伸缩性。

<p class="fr_t">值：</p>

1. flex: auto 等价于 flex: 1 1 auto

2. flex: initial （默认值）等价于 0 1 auto

3. flex: inherit 继承自父元素

4. flex: none 等价于 0 0 auto

<p class="fr_t">单值语法：</p>

1. 一个无单位数，视作flex-grow的值。
2. 一个有效的宽度值，视作flex-basis的值。
3. 关键词 none、initial、auto。

<p class="fr_t">双值语法：</p>

第一个值必须为无单位数，视为flow-grow的值，第二个数：

1. 一个无单位数，视作flex-shrink的值。
2. 一个有效的宽度值，视作flex-basis的值。

<p class="fr_t">三值语法：</p>

1. 一个无单位数，视作flex-grow的值。
1. 一个无单位数，视作flex-shrink的值。
2. 一个有效的宽度值，视作flex-basis的值。

例：
```html
<style>
  .wrap {
    display: flex;
    height: 100px;
    width: 600px;
  }
  .item1 {
    flex: 1 1 100px;
    background-color: pink;
  }
  .item2 {
    flex: 1 1 200px;
    background-color: skyblue;
  }
</style>
<div class="wrap">
  <div class="item1"></div>
  <div class="item2"></div>
</div>
```
此时 item1 宽度为 250px，item2 宽度为 350px 。
计算方式：

item1 -> flex-basis为 100px，可扩展，可收缩。
item2 -> flex-basis为 200px，可扩展，可收缩。

基于flex-basis剩余 600 - 100 - 200 = 300px，再将其均分。

若将 item1设为 flex: 1 1 auto，则此时宽度分别为 200px、400px。

若将 item1 设为 flex: 1 1 auto，并且其div中写入部分内容，则此时 item1 的宽度为： 

<p class="fr_th">内容宽度 + (600 - 200 - 内容宽度) / 2</p>

## 2D 和 3D 转化

### transform

transform适用于：所有块级元素及某些内联元素(如：button)。

:::tip 规则
A transformable element is an element in one of these categories:
an element whose layout is governed by the CSS box model which is either a block-level or atomic inline-level element, or whose display property computes to table-row, table-row-group, table-header-group, table-footer-group, table-cell, or table-caption [CSS21]
an element in the SVG namespace and not governed by the CSS box model which has the attributes transform, ‘patternTransform‘ or gradientTransform[SVG11].
:::

例：未设置宽度的块级元素设置了 transform: translateX(100px); 该元素在水平方向上会出现滚动条。

```html
<!--例-->
<style>
  span {
    display: inline-block; 
    transform: rotate(45deg); // 生效
  }
</style>
<body>
  <span>222</span>
</body>
```
## background

### 实现上下蒙层，中间内容展示。

```html
<style>
  .wrap {
    position: relative;
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    height: 150px;
    width: 150px;
    border: 1px solid red;
    background-image: linear-gradient(to bottom, rgba(200,200,200,0.95), rgba(200,200,200,0.6)),
linear-gradient(to top, rgba(200,200,200,0.95), rgba(200,200,200,0.6));
    background-repeat: no-repeat;
    background-position: top, bottom;
    background-size: 100% 50px;
  }
  .content div {
    height: 50px;
  }
</style>
</head>
<body>
  <div class="wrap">
    <div class="mask"></div>
    <div class="content">
      <div>111</div>
      <div>222</div>
      <div>333</div>
    </div>
  </div>
</body>
```
![image](../../images/bg1.png)

### 实现左右蒙层

```html
<style>
  .wrap {
    position: relative;
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    height: 150px;
    width: 150px;
    border: 1px solid red;
    background-image: linear-gradient(to left, rgba(200,200,200,0.95), rgba(200,200,200,0.6)),
linear-gradient(to right, rgba(200,200,200,0.95), rgba(200,200,200,0.6));
    background-repeat: no-repeat;
    background-position: left, right;
    background-size: 50px 100%;
  }
  .content div {
    margin-left: 50px;
    height: 50px;
  }
</style>
</head>
<body>
  <div class="wrap">
    <div class="mask"></div>
    <div class="content">
      <div>111</div>
      <div>222</div>
      <div>333</div>
    </div>
  </div>
</body>
```
![image](../../images/bg2.png)

## css选择器

### nth-of-type

```html
<style type="text/css">
div .h2:first-of-type { /*设置无效*/
  color: red;
}
div :first-of-type { /*作用于第一个h1元素和第一个p元素*/
  color: red;
}
</style>

<body>
  <div>
    <h1 class="h1">标题1</h1>
    <h1 class="h2">标题2</h1>
    <h1 class="h2">标题2</h1>
    <p class="p1">段落1</p>
    <p class="p2">段落2</p>
  </div>
</body>
```
#### div .h2:first-of-type 设置无效的原因分析：

div .h2:first-of-type会查找.h2类名所对应的元素，这里是h1元素，所以:first-of-type会匹配第一个h1元素，也就是说，这里的class类名只是找到对应元素类型的作用。接下来结合起来看，第一个h1的元素的class并不是.h2，所以就无法匹配到。

#### 选择第一个 h1.h2 的方法

```css
div .h2 {
  color: red;
}
div .h2~.h2 {
  color: skyblue;
}
```
### ~ 选择器

例： a~b 表明选择a元素之后的每个b元素,其中a元素和b元素为兄弟元素。

### only-of-type

p:only-of-type：表明选择当前父元素下有且仅有一个p元素。

div :only-of-type：表明选择父元素div下的有且仅有一个同类子元素。

```html
<style>
div :only-of-type {
	background: #ff0000; /*选中p元素和h1元素*/
}
</style>
<div>
  <p>1111</p>
  <span>2222></span>
  <h1>3333</h1>
  <span>4444</span>
</div>
<div>5555</div> <!--css不作用于该元素-->
```

### css根据列表li个数设置不同样式

[参考](https://www.zhangxinxu.com/wordpress/2019/03/nth-last-child-css-layout/)

```css
li:only-child { /* 1个li */ }
li:first-child:nth-last-child(2) { /* 2个li */ }
li:first-child:nth-last-child(3) { /* 3个li */ }
```

li:first-child:nth-last-child(2)：li:first-child表明选择的是第一个li元素，并且这个元素又是从后往前的第二个元素。因此当前的li元素只有两个。

```css
/* 3个li项目的第1个列表项 */
li:first-child:nth-last-child(3) {}
/* 3个li项目的第1个列表项的后一个，也就是第2项的样式 */
li:first-child:nth-last-child(3) + li {}
/* 3个li项目的第一个列表项后面两个列表项，也就是第2项和第3项的样式 */
li:first-child:nth-last-child(3) ~ li {}
```

### :not 

:not伪类不像其它伪类，它不会增加选择器的优先级。

```html
<style>
h1#a { // 1 + 100
	color: silver;
}
h1:not(#b) { // 1 + 100
    color: red;
}
</style>
<h1 class="a" id="a">这是一个标题</h1> <!-- red -->

```

## 使用 css 管理事件

[摘自](https://segmentfault.com/a/1190000019342789)

### 事件禁用

1. disabled

```html
<style>
button:disabled { /* 设置禁用的样式 */
  color: skyblue;
}
</style>
<button disabled>click</button>
```
2. 禁用div等本身不具备disabled属性的元素

```html
<style>
div {
  cursor: pointer;
}
div.disabled {
  pointer-events: none;
}
</style>
<div class="disabled">click</div>
```
### 实现长按操作

```html
<style>
button:active {
  opacity: 0.99;
  transition: opacity 1s;
}
</style>

<button id="btn">click</button>
```
```js
var btn = document.getElementById('btn')
btn.addEventListener('transitionend', function () {
  console.log('long press')
})
```

### border-radius

<p class="fr_t">为什么设置 border-radius: 50% 和 border-radius: 100% 的效果一致。</p>

[参考](https://www.jianshu.com/p/0ad8e145bd82)

<p class="fr_t">border-radius 设置百分比作用机制</p>

四个角：

1. border-top-left-radius
2. border-top-right-radius
3. border-bottom-right-radius
4. border-bottom-left-radius

例：

```css
.wrap {
  width: 200px;
  height: 100px;
  background-color: skyblue;
  border-top-left-radius: 50%;
}
```
此时设置的是左上角的圆角，水平方向为 width 的 50%，竖直方向为 height 的 50%，此时的圆弧为椭圆的圆弧。水平方向的大小为短半径，竖直方向的大小为长半径。

## 动画

### transition

作用机制：需要一个初始化的属性，当其发生变化时才能触发过渡效果。

transition失效：display: none -> display:block，当初始属性为 display: none，浏览器读不到这个初始属性，所以当其变化为 display: block时，不会产生过渡效果。

transition后面不要跟all，因为会造成浏览器大量的计算资源，可能会导致页面卡顿。

#### 常见闪动的解决办法

使用3d元素开启硬件减速。

perpective、backface-visibility

```html
<style>
.box {
  width: 100px;
  height: 100px;
  transition: width 2s;
  background-color: #000;
  /* transform: translateZ(0); */
}
.box:hover {
  width: 500px;
}
</style>
<body>
  <div class="box"></div>
</body>
```

### animation

step：作用于每个关键帧，而不是整个时间。

```html
<style>
@keyframes run {
  100% {
    background-position-x: -2400px;
  }
}
.rabbit {
  width: 200px;
  height: 200px;
  background: url("./images/rabbit.png") no-repeat;
  animation: run .5s steps(12) infinite;
}
</style>
<div class="rabbit"></div>
```

```html
<style>
@keyframes run {
  50% {
    background-position-x: -1200px;
  }
  100% {
    background-position-x: -2400px;
  }
}
.rabbit {
  width: 200px;
  height: 200px;
  background: url("./images/rabbit.png") no-repeat;
  animation: run .5s steps(6) infinite;
}
</style>
<div class="rabbit"></div>
```