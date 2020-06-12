---
title: 小程序
lang: zh-CN
sidebarDepth: 2
---

## 基础

::: tip details

1. 在小程序开发中，开发者不需要像Web开发那样去优化样式文件的请求数量，只需要考虑代码的组织即可。样式文件最终会被编译优化。
2. 小程序的每个页面由单独的webView线程渲染，而JS共用同一个JsCore线程，因此页面在使用setTimeout和setInterval等计时器后跳转至其他页面，定时器并未被清除，因此需要在离开页面时手动处理。
3. pages/index/index表示的是wxml/wxss/json/js四个文件，四个文件的前缀一致。一个页面必须具备wxml和js文件，wxss和json文件可选。
4. 小程序页面栈层级最多为10层。
5. 小程序的运行环境分成渲染层和逻辑层，其中 WXML 模板和 WXSS 样式工作在渲染层，JS 脚本工作在逻辑层。
小程序的渲染层和逻辑层分别由2个线程管理：渲染层的界面使用了WebView 进行渲染；逻辑层采用JsCore线程运行JS脚本。一个小程序存在多个界面，所以渲染层存在多个WebView线程，这两个线程的通信会经由微信客户端（采用Native来代指微信客户端）做中转，逻辑层发送网络请求也经由Native转发。
6. 页面加载过程：先根据json中的配置生成页面，然后装载wxml结构和wxss样式，最后加载js文件。
7. request请求异常时，可以在开发者工具的console面板输入showRequestInfo()查看相关信息。
8. 一个小程序主体部分由三个文件组成，其中app.js和app.json为必需的文件，一个小程序页面由四个文件组成，其中page.wxml和page.js为必需的文件。
9. 静态的样式统一写到 class 中。style 接收动态的样式，在运行时会进行解析，请尽量避免将静态的样式写进 style 中，以免影响渲染速度。
10. 小程序顶部高度64px，底部高度48px，中间624px （iphone6）。
11. 小程序的text组件支持 \n \r\n 换行，但是不支持 \r 换行。
```
{
  "pages":[
    "pages/index/index", // 第一项默认为首页
    "pages/other/other"
  ]
}
```
:::

### 小程序获取测试号

1. 登录微信开放社区：https://developers.weixin.qq.com/community/develop/mixflow
2. 登录：https://developers.weixin.qq.com/sandbox

测试号无法获取 unionid。（原因：小程序必须绑定在微信开放平台上，不绑定是无法获取到unionid）

### 小程序的运行环境

|  运行环境  |  逻辑层  | 渲染层  |
| ----  | ----  | ----  |
| iOS | JavaScriptCore  | WKWebView |
| 安卓  | V8  | chromium定制内核  |
| 小程序开发者工具  | NWJS  | Chrome WebView  |

微信小程序运行在三端：iOS（iPhone/iPad）、Android 和 用于调试的开发者工具。

三端的脚本执行环境以及用于渲染非原生组件的环境是各不相同的：

1. 在 iOS 上，小程序逻辑层的 javascript 代码运行在 JavaScriptCore 中，视图层是由 WKWebView 来渲染的，环境有 iOS8、iOS9、iOS10；

2. 在 Android 上，

①旧版本，小程序逻辑层的 javascript 代码运行中 X5 JSCore 中，视图层是由 X5 基于 Mobile Chrome 57 内核来渲染的；

②新版本，小程序逻辑层的 javascript 代码运行在 V8 中，视图层是由自研 XWeb 引擎基于 Mobile Chrome 67 内核来渲染的；

3. 在 开发工具上，小程序逻辑层的 javascript 代码是运行在 NW.js 中，视图层是由 Chromium 60 Webview 来渲染的。

### 配置

#### icon

tabBar中的icon仅支持 .png、.jpg、.jpeg 格式。大小限制为 40kb，建议尺寸为 81px * 81px，不支持网络图片。

### wxml

1. WXML 要求标签必须是严格闭合的，没有闭合将会导致编译错误。WXML中的属性是大小写敏感的。
2. 没有被定义的变量的或者是被设置为 undefined 的变量不会被同步到 wxml 中 ，但 null 值会被输出。

```html
data: {
  val1: null,
  val2: undefined
}
<view class="container">
  <text>{{val1}}</text>
  <text>{{val2}}</text>
</view>

<!-- 渲染结果：
<view class="container">
  <text>null</text>
  <text></text>
</view> 
-->
```
#### 装载顺序

1. 先根据 .json 文件生成界面。
2. 然后装载页面的 WXML 结构和 WXSS 样式。
3. 最后装载 .js。

#### template模板与component组件的区别

1. template主要是展示，方法则需要在调用的页面中定义。
2. component组件有自己的业务逻辑，可以看做一个独立的page页面。如果只是单纯的用来展示，使用template就可以了。

#### wx:key

值：

1. 字符串，为 item 中的某个为字符串或数字的值且该值不能动态改变。
2. *this，代表 item 本身，item 为字符串或数字。

```js
<view wx:for="{{arr1}}" wx:key="*this">{{item}}</view>
<view wx:for="{{arr2}}" wx:key="name">{{item.name}}</view>

data: {
  arr1: [1, 2],
  arr2:[
    {
      name: 'a',
      age: 1
    },
    {
      name: 'b',
      age: 2
    }
  ]
}
```

#### 小程序退出

目前退出小程序的方式只有通过navigator退出。

```html
<navigator open-type="exit" target="miniProgram">退出小程序</navigator>
```

### wxss

1. 在小程序开发中，开发者不需要像Web开发那样去优化样式文件的请求数量，只需要考虑代码的组织即可。样式文件最终会被编译优化（原因：WXSS最终会被编译打包到目标文件中，用户只需要下载一次，在使用过程中不会因为样式的引用而产生多余的文件请求）。

```html
<!--内联样式-->
<view style="color: red; font-size: 48rpx"></view>

<!-- 动态内联样式 -->
<view style="color: {{eleColor}}; font-size: {{eleFontsize}}"></view>
```

### js

#### 数据驱动

[参考](https://developers.weixin.qq.com/ebook?action=get_post_info&docid=0000286f908988db00866b85f5640a)

1. 逻辑层和渲染层是两个分开的线程。
2. 在渲染层，宿主环境会把WXML转化成对应的JS对象。在逻辑层发生数据变更时，通过setData把数据从逻辑层传递到渲染层，对比两个JS对象变化的部分，将差异应用到原先的Dom树上，从而实现UI的更新。

#### setData

1. 由于小程序的渲染层和逻辑层分别在两个线程中运行，所以setData传递数据实际是一个异步的过程。
2. setData完成后触发可以通过回调函数。格式： setData(data, callback)。
3. 更改对象中某个指定的属性：this.setData({"d[0]": 100});this.setData({"d[1].text": 'Goodbye'}); 
4. 直接修改 Page实例的this.data 而不调用 this.setData 是无法改变页面的状态的，还会造成数据不一致。
5. 由于setData是需要两个线程的一些通信消耗，为了提高性能，每次设置的数据不应超过1024kB。
6. 不要把data中的任意一项的value设为undefined，否则可能会有引起一些不可预料的bug。

#### 缓存

1. 不同小程序的本地缓存空间是分开的，每个小程序的缓存空间上限为10MB，如果当前缓存已经达到10MB，再通过wx.setStorage写入缓存会触发fail回调。
2. 考虑到同一个设备可以登录不同微信用户，宿主环境还对不同用户的缓存进行了隔离，避免用户间的数据隐私泄露。

### 生命周期

#### 应用生命周期

1. onLaunch：初始化小程序时触发，全局只触发一次
2. onShow：小程序启动或切前台
3. onHide：小程序从前台切换到后台
4. onError：小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息

前台：再次进入微信或再次打开小程序，相当于从后台进入前台。

后台： 点击左上角关闭，或者按了设备 Home 键离开微信，并没有直接销毁，而是进入后台。

App的生命周期中 onLaunch 和 onShow 都可以获取参数。

#### 页面生命周期

1. onLoad：首次进入页面加载时触发，可以在 onLoad 的参数中获取打开当前页面路径中的参数。
2. onShow：加载完成后、后台切到前台或重新进入页面时触发
3. onReady：页面首次渲染完成时触发
4. onHide：从前台切到后台或进入其他页面触发
5. onUnload：页面卸载时触发

Page实例

调用顺序：onLoad -> onShow -> onReady

1. onLoad在页面没被销毁之前只会触发1次。可以通过option获取页面传递的参数。

```js
// url: /pages/logs/logs?name=11
onLoad (option) {
  console.log('option', option) // option {name: "11"}
}
```
2. onShow每次页面打开时都会被调用一次。
3. onReady在页面没被销毁前只会触发1次，此时页面首次渲染完成，可以和视图层进行交互。

[触发方式和生命周期对应关系](https://developers.weixin.qq.com/ebook?action=get_post_info&docid=0004eec99acc808b00861a5bd5280a)

#### 页面生命周期和组件生命周期执行顺序：

```js
created
attached
onLoad
onShow
ready
onReady
```

### npm

使用方式：

1.在项目目录下执行：

```npm
npm init -y // 初始化一个package.json文件

// 扩展 watch 和 computed 方法
npm install --save miniprogram-computed
```

2.开发工具：

① 详情 -> 本地设置 -> 勾选npm 模块

② 点击：工具 -> 构建 npm

3.使用

```js
const computedBehavior = require('miniprogram-computed')
Component({
  behaviors: [computedBehavior],
  properties: {
    test: String
  },
  watch: {
    'test': function (newVal) { // 没有oldVal
      console.log('newVal', newVal)
    }
  },
  computed: {
    sum (data) {
      console.log('computed', data.test)
      return data.test
    }
  }
})

/**
 * computed 中的没有 this，直接通过参数中的 data 操作数据。
*/
```
[miniprogram-computed地址](https://github.com/wechat-miniprogram/computed)

### 问题汇总

#### 为什么脚本内不能使用window等对象

页面的脚本逻辑是在JsCore中运行，JsCore是一个没有窗口对象的环境，所以不能在脚本中使用window，也无法在脚本中操作组件

#### 为什么 zepto/jquery 无法使用

zepto/jquery 会使用到window对象和document对象，所以无法使用。

### 其他

#### 小程序文件上传白名单

在项目目录中，以下文件会经过编译，因此上传之后无法直接访问到：.js、app.json、.wxml、*.wxss（其中 wxml 和 wxss 文件仅针对在 app.json 中配置了的页面）。除此之外，只有后缀名在白名单内的文件可以被上传，不在白名单列表内文件在开发工具能被访问到，但无法被上传。具体白名单列表如下：

1. wxs
2. png
3. jpg
4. jpeg
5. gif
6. svg
7. json
8. cer
9. mp3
10. aac
11. m4a
12. mp4
13. wav
14. ogg
15. silk

#### rpx

换算关系： px = rpx * 屏幕宽度 / 750

例： iPhone6 上，屏幕宽度为375px，共有750个物理像素。其 1px = 2rpx * 375 / 750，即 1px = 2rpx。

[参考](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html)

#### 互斥事件

一个 mut-bind 触发后，如果事件冒泡到其他节点上，其他节点上的 mut-bind 绑定函数不会被触发。它完全不影响 bind 和 catch 的绑定效果。

[参考](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html)

#### mark

mark 和 dataset 很相似，主要区别在于： mark 会包含从触发事件的节点到根节点上所有的 mark: 属性值；而 dataset 仅包含一个节点的 data- 属性值。

1. 如果存在同名的 mark ，父节点的 mark 会被子节点覆盖。
2. 在自定义组件中接收事件时， mark 不包含自定义组件外的节点的 mark 。
3. 不同于 dataset ，节点的 mark 不会做连字符和大小写转换。

```html
<view mark:parentMark="parent" bindtap="handleParentClick">parent
  <button mark:childMark="child" bindtap="handleChildClick">child</button>
</view>
```

```js
handleChildClick (e) {
  console.log('child event', e.mark)
},
handleParentClick (e) {
  console.log('parent event', e.mark)
}

/**
 * 点击child后，handleChildClick 和 handleParentClick 均为：{childMark: "child", parentMark: "parent"}
 * 点击parent后，handleParentClick 为：{parentMark: "parent"}
*/
```

## 组件

### 组件样式

1. 小程序组件中使用标签选择器，如：view，设置的样式会覆盖父组件中的设置的 view 样式。

```css
/* 父组件 */
view {
  color: red;
}
/* 子组件 */
view {
  color: pink;
}

/* 在权重一致的情况下，此时显示的color为pink */
```
<p class="fr_th">父组件使用标签选择器设置的样式会影响到子组件，子组件使用标签选择器设置的样式也会影响到父组件。因此小程序中规定在组件和引用组件的页面不能使用id选择器（#a）、属性选择器（[a]）和标签名选择器。</p>

<p class="fr_th">在样式设置符合规范的情况下：默认父组件设置的样式和子组件设置的样式互不影响。</p>

2. 继承样式，如 font 、 color ，会从组件外继承到组件内。除继承样式外，app.wxss中设置的样式和组件所在页面设置的样式不会影响组件中的样式。除了两种情况：

(1) 使用标签选择器设置样式。

(2) 修改了特殊的样式隔离选项 styleIsolation。
```js
Component({
  options: {
    styleIsolation: 'isolated' // 默认值
  }
})
```