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

```
{
  "pages":[
    "pages/index/index", // 第一项默认为首页
    "pages/other/other"
  ]
}
```
:::

### 生命周期

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

[触发方式和生命周期对应关系（位于底部）](https://developers.weixin.qq.com/ebook?action=get_post_info&docid=0004eec99acc808b00861a5bd5280a)

### 装载顺序

1. 先根据 .json 文件生成界面。
2. 然后装载页面的 WXML 结构和 WXSS 样式。
3. 最后装载 .js。

### wx:key

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
### 样式

```html
<!-- 动态样式 -->
<view style="color: {{eleColor}}; font-size: {{eleFontsize}}"></view>
```

### 数据驱动

[参考](https://developers.weixin.qq.com/ebook?action=get_post_info&docid=0000286f908988db00866b85f5640a)

1. 逻辑层和渲染层是两个分开的线程。
2. 在渲染层，宿主环境会把WXML转化成对应的JS对象。在逻辑层发生数据变更时，通过setData把数据从逻辑层传递到渲染层，对比两个JS对象变化的部分，将差异应用到原先的Dom树上，从而实现UI的更新。

### setData

1. 由于小程序的渲染层和逻辑层分别在两个线程中运行，所以setData传递数据实际是一个异步的过程。
2. setData完成后触发可以通过回调函数。格式： setData(data, callback)。
3. 更改对象中某个指定的属性：this.setData({"d[0]": 100});
4. 直接修改 Page实例的this.data 而不调用 this.setData 是无法改变页面的状态的，还会造成数据不一致。
5. 由于setData是需要两个线程的一些通信消耗，为了提高性能，每次设置的数据不应超过1024kB。
6. 不要把data中的任意一项的value设为undefined，否则可能会有引起一些不可预料的bug。

### 缓存

1. 不同小程序的本地缓存空间是分开的，每个小程序的缓存空间上限为10MB，如果当前缓存已经达到10MB，再通过wx.setStorage写入缓存会触发fail回调。
2. 考虑到同一个设备可以登录不同微信用户，宿主环境还对不同用户的缓存进行了隔离，避免用户间的数据隐私泄露。

### 组件

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