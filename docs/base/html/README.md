---
title: HTML
lang: zh-CN
sidebarDepth: 2
---

## 总结

### 媒体查询

#### 语法：

@media 媒体类型 (媒体功能)

媒体类型：默认值all

除非使用not或only操作符，否则媒体类型是可选的，默认值是all(全部)。

使用了not或only操作符，必须明确指定一个媒体类型。

#### 用法：

1. 使用 link 表示
2. 直接在 style 中使用 @media

```html
<link rel="stylesheet" type="text/css" href="test.css" media="(max-width: 800px)">
<!-- 即使媒体查询返回false，<link> 标签指向的样式表也将会被下载(但是它们不会被应用) -->

<style>
@media (max-width: 600px) { /* 左括号前必须有一个空格，否则无效 */
  .color {
    color: red
  }
}
</style>
```

#### 逻辑操作符

and、only 和 not，也可以使用逗号分隔符。

only：仅在媒体查询匹配成功的情况下被用于应用一个样式，这对于防止让选中的样式在老式浏览器中被应用到。

逗号分隔符：任何一个媒体查询返回真，样式就是有效的，等同于 or。

```js
media="only screen and (max-width:1000px)"{...}
// 在老式浏览器中被解析为media="only"，因为没有一个叫only的设备，所以实际上老式浏览器不会应用样式

media="screen and (max-width:1000px)"{...}
// 在老式浏览器中被解析为media="screen"，它把后面的逻辑表达式忽略了。所以老式浏览器会应用样式
```

### rem 适配 

1. rem基于html元素的font-size计算的，即：1rem 和 html的font-size是一致的。
2. 一般适配时使用 js 计算基准值，而不是使用 @media ，因为移动端设备太多，宽度不一致，使用 @media 不方便。
3. 一般使用 当前屏幕的宽度 / 10 作为rem计算的基准值，因为除以的值过大会导致font-size太小，而浏览器无法识别过小的font-size。

```js
var width = document.documentElement.clientWidth || document.body.clientWidth
document.getElementsByTagName('html')[0].style.fontSize = width / 10 + 'px'
```