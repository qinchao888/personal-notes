---
title: HTML
lang: zh-CN
sidebarDepth: 2
---

## 总结

### viewport 的理解

[参考](https://www.cnblogs.com/zaoa/p/8630393.html)

1. viewport 是移动端用来承载页面的虚拟容器，大部分设备的默认宽度为980px，可以设置尺寸，可以缩放。
2. 网页是显示在 viewport 上，然后 viewport 再显示在浏览器上。
3. 如果使用 375 * 667 的设备，viewport 会被缩放显示在该设备上，但是此缩放并不改变 viewport 的原始尺寸980px。因此在该种情况下，页面的字体会变小。（将980px的viewport显示在375px的设备上，如果存在元素的宽度 >980px，此时在水平方向上则会出现滚动条。如果小于980px则会出现空白部分）
4. iphon4默认的viewport 980px，其对应的initial-scale的默认值即为：320 / 980 = 0.333333。

属性：

1. width：viewport的宽度
2. initial-scale：缩放比 （> 1 放大 、> 0 && < 1 缩小）
3. user-scalable：是否允许缩放 （值：0 | no | 1 | yes）
4. minimum-scale：最小缩放比
5. maximum-scale：最大缩放比

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
设置 width=device-width 和 设置 initial-scale=1.0 效果一致。两个都设置是由于兼容性问题（在iphone和ipad上，无论是竖屏还是横屏，宽度都是竖屏时ideal viewport的宽度）。

1. 布局视口(layout viewport)：用于承载页面的viewport。
2. 视觉视口(visual viewport)：浏览器。
3. 理想视口(ideal viewport)：设备。

公式：设备宽度 / layout viewport 宽度 = 缩放比

<p class="fr_t">当同时设置 width 和 initial-scale 时，布局视口的宽度取两者中的最大值。</p>

以 设备iphone7为例（375 * 667）：

```html
<!--layout viewport 宽度为375px，文字放大-->
<meta name="viewport" content="width=device-width, initial-scale=2.0">

<!--layout viewport 宽度为187px，文字放大-->
<meta name="viewport" content="initial-scale=2.0">
```
1. initial-scale>1，字体变大，viewport变小。
2. initial-scale<1，字体变小，viewport变大。

### 逻辑像素和物理像素

1. css像素属于逻辑像素的一种。
2. iphone7中的 375 * 667 对应的是逻辑像素，750 * 1334 对应的是物理像素，即屏幕分辨率。
3. 老设备中一个css像素对应一个物理像素的宽度，而高清屏（retina）屏中，一个css像素可能对应多个物理像素的宽度。

设备 | 逻辑分辨率pt | 物理分辨率px | 倍数
---|---|---|---
iphone4 | 320x480 | 640x960 | 二倍
iphone5 | 320x568 | 640x1136 | 二倍
iphone6 | 375x667 | 750x1334 | 二倍
iphone6p | 414x736 | 1242x2208 | 三倍
iphoneX | 375x812 | 1125x2436 | 三倍
iphontXR | 414x896 | 828x1792 | 二倍
iphontXS_Max | 414x896 | 1242x2688 | 三倍

4. 逻辑像素又称设备独立像素。设备像素比（Device Pixel Ratio，DPR） = 物理像素 / 设备独立像素。
5. 通过 window.devicePixelRatio 获取设备像素比。
6. 普通屏：1px * 1px 的css像素使用1个物理像素点渲染，二倍屏中使用4个物理像素点渲染，三倍屏中使用9个物理像素点渲染。

<p class="fr_t">移动端图片显示模糊</p>

在 iphone7 中使用 20px * 20px 尺寸的图片在显示宽和高均为20px的图片时图片显示模糊。

原因：

[参考](https://www.cnblogs.com/superlizhao/p/8729190.html)

1. 理论上，1个位图像素对应于1个物理像素，图片才能得到完美清晰的展示。对于dpr=2的Retina屏幕而言，1个位图像素对应于4个物理像素，由于单个位图像素不可以再进一步分割，所以只能就近取色，导致图片看起来比较模糊。
2. 对于dpr=2的屏幕，用40*40的图片，位图像素点个数就是原来的4倍，在Retina屏幕下，位图像素点个数就可以跟物理像素点个数形成 1 : 1的比例，图片自然就清晰了。但在普通屏幕下，就出现一个物理像素点对应4个位图像素点，但它的取色也只能通过一定的算法取某一个位图像素点上的色值，这个过程叫做(downsampling)，肉眼看上去虽然图片不会模糊，但是会觉得图片缺少一些锐利度，或者是有点色差。
3. 最好的解决办法是：不同的dpr下，加载不同的尺寸的图片。不管是通过CSS媒体查询，还是通过JS条件判断都是可以的。

<p class="fr_t">一像素边框</p>

事实上该一像素边框对应的是一个物理像素。设置 border: 0.5px，但此设置可能部分浏览器不识别，被当成 0px 处理。

<p class="fr_t">淘宝适配</p>

原理：设备的dpr为多大，就将页面放大dpr倍，保证页面的一个逻辑像素对应于一个物理像素。

原先使用20px * 20px 的图片现在使用40px * 40px的图片，设置图片大小也为 40 * 40。

```html
<meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
<!-- dpr等于1时使用 -->

<meta name="viewport" content="initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no" />
<!-- dpr等于2时使用 -->

<meta name="viewport" content="initial-scale=0.333333, maximum-scale=0.333333, minimum-scale=0.333333, user-scalable=no" />
<!-- dpr等于3时使用 -->

<meta name="viewport" content="initial-scale=0.25, maximum-scale=0.25, minimum-scale=0.25, user-scalable=no" />
<!-- dpr等于4时使用 -->
```
<p class="fr_t">设计稿</p>

1. 早期标准：640px，以iphone4为代表。（目的不失真）
2. 现在主流的标准：750px，以iphone6、7、8为代表。

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