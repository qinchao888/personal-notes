---
title: 视频学习
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

### 使用 date-fns 替代 moment.js 减少打包后文件的大小

```js
// 引入方式
import format from 'date-fns/format'

// 此种方式引入的包要比上面的大
import { format } from 'date-fns'
```

### 启动 dist 目录的方法

<p class="fg_t">方式一：使用 serve</p>

```
npm install -g serve

// 切换到指定的项目路径
serve dist
```

<p class="fg_t">方式二：使用anywhere（推荐）</p>

```
npm install -g anywhere
anywhere // 可自动打开浏览器
```

<p class="fg_t">方式三：使用 http-server</p>

```
npm install -g http-server
hs // 启动（或http-server）
```

配置：

```
// package.json
scripts:{
  "dist1": "serve dist",
  "dist2": "anywhere -d dist",
  "dist3": "hs dist -a 10.10.20.172 -o -c-1"
}

// 命令行启动
npm run dist1
// 或 
npm run dist2
// 或
npm run dist3
```
注：使用 http-server 访问时需要指向具体的文件，如：http://10.10.20.172:8083/index.html

<p class="fg_t">方式四：使用 chrome 插件</p>

安装：Web Server for Chrome

[链接地址]<a href="https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb">https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb</a>


### 大图片打包成base64字符串的缺点

大图片会导致打包后会占据较大的空间。影响页面渲染。

### stylus 和 stylus-loader

stylus是把stylus转化为css。

stylus-loader是使webpack能够理解和处理stylus类型的文件。

### in 关键字的使用

1. 数组：判断索引是否存在

```js
var arr = ['a', 'b']
0 in arr // true
2 in arr // false
'a' in arr // false
```

2. 对象：判断对象的属性是否存在

```js
var obj = {a: 1, b: 2}
a in obj // true
1 in obj // false
```

### 引入路由 router

```
可以使用 <router-view> <router-link> <keep-alive> ，提供了 $route 和 $router
```
### vue 中模板数据来源

1. data：自身数据
2. props：传入的数据
3. computed：数据来源：data/props/别的compute/state/getters

### 页面报错

1. Cannot read property 'a' of null

```js
var obj = null
obj.a // Cannot read property 'a' of null
```
2. Cannot read property 'b' of undefined 

```js
var obj = {}
obj.a.b // Cannot read property 'b' of undefined 
```
### 创建 better-scroll 实例的时机

滚动原理：子元素内容总高度超出父元素高度。

```js
// 方法一：
/*
1. 异步获取数据和页面更新完成才能创建实例
2. 利用回调函数
*/

// store
actions: {
  getGoodsInfo ({commit}, cb) {
    reqGoodsInfo().then(res => { // 发起请求
      if (res.status === 200) {
        const data = res.result
        commit('GOODS_INFO', data) // 执行 mutation
        cb && cb() // 执行回调
      }
    })
  }
}

// 页面
this.$store.dispatch('getGoodsInfo', () => { // 异步请求获取数据
  this.$nextTick(() => { // 页面数据更新完成
    new BScroll('.category') // 此处创建 better-scroll 实例
  })
})

// 方法二：
/* 通过 watch 监听数据，然后再 nextTick 中创建实例 */
watch: {
  goodList () { // 数据 goodList 已经异步获取成功
    this.$nextTick(() => {
      new BScroll('.category')
    })
  }
}
```
### 滚动的三种方式

1. 手指触摸滚动

2. 手机触摸滚动后离开产生的惯性滚动

3. 调用方法产生的滚动

## 开发经验

1. 多个页面的Header部分结构大致相同，可将其抽离成组件，不同部分通过 slot 节点传入。

```js
/*HeaderTop组件*/
<div>
  <slot name="left"></slot>
  <div>common部分</div>
  <slot name="right"></slot>
</div>
```

2. 多个页面有的需要显示Footer部分，有的不需要显示。

先在App.vue中引入 Footer组件，通过在路由router中设置meta属性控制Footer组件是否显示。

```js
// router/index.js
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: _import(...),
      meta: {
        showFooter: true
      }
    },
    {
      path: '/other',
      name: 'other',
      component: _import(...)
    }
  ]
})

// App.vue
<div>
  ...
  <footer-guide v-show="$route.meta.showFooter"/>
</div>
```
3. 列表数据使用ul、li标签显示。
4. 默认数据显示需要一定的时间，因此可以通过图片显示大致的结构，通过v-if和v-else控制显示列表还是显示结构图。
5. 表单中使用按钮，点击时默认会触发表单的提交，解决办法：给按钮使用 @click.prevent 阻止表单的默认行为。
6. 获取图片验证码。

```html
<!-- http://localhost:4000/captcha 返回一个svg图片，每调用一次返回一个新的svg图片 -->
<img src="http://localhost:4000/captcha" @click="getCaptcha">
```

```js
getCaptcha (event) {
  // 保证每次设置的 src 值都不同，否则不会再次调用。
  event.target.src = 'http://localhost:4000/captcha?time=' + Date.now()
}
```
7. 设置精灵图

假设：现图片大小为 400px * 400px。使用二倍图解决图片失真问题。

```css
/* 设置公用样式 */
[class^="icon_"], [class*=" icon_"] { /* 包括了 class="icon_xxx 和 class="red icon_xxx" */
  background-image: url("../../images/sprites.png") no-repeat;
  background-size: 200px 200px; /* 对图片进行缩放 */
}
```
```html
<style>
.icon_search {
  width: 20px;
  height: 20px;
  background-position: 0 -103px;
}
</style>
<i class="icon_search"></i>
<i class="icon_logo"><i>
```