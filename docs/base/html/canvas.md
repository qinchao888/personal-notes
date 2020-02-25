---
title: canvas
lang: zh-CN
sidebarDepth: 2
---

:::tip

:::

### canvas 中设置字体颜色时必须设置字体类型，否则无效

```js
ctx.font = '30px sans-serif' // 设置为 '30px'无效
// 默认值：10px sans-serif
```
### ctx.drawImage中的image对象为dom对象

```js
var img = new Image()
img.src = url
img.onload = function () {
  ctx.drawImage(img, x, y, width, height)
}
```

### 绘制圆形图片

```js
drawCircleImage (info) { // 创建离屏canvas绘制圆形图片(可控制图片大小)
  var offCanvas = document.createElement('canvas')
  var ctx = offCanvas.getContext('2d')
  offCanvas.width = 30
  offCanvas.height = 30
  var that = this
  var img = new Image()
  img.src = info.url
  img.onload = function () {
    ctx.drawImage(img, 0, 0, 30, 30)
    console.log('with', img.width)
    console.log('height', img.width)
    that.ctx.arc(15, 15, 15, 0, 2 * Math.PI);
    that.ctx.fillStyle = that.ctx.createPattern(offCanvas, 'no-repeat')
    that.ctx.fill()
  }
}

// 现在的微信头像默认大小应该是 132px * 132px
drawOriginCircleImage (info) { // 绘制原图大小的图片
  var img = new Image()
  var that = this
  img.src = info.url
  img.onload = function () {
    var width = img.width
    var height = img.height
    var r = Math.min(width, height) / 2
    that.ctx.arc(width / 2, height / 2, r, 0, 2 * Math.PI);
    that.ctx.fillStyle = that.ctx.createPattern(img, 'no-repeat')
    that.ctx.fill()
  }
}
```

### canvas绘制模糊

```js
var canvas = document.getElementById('canvas')
canvas.width = width * 2 // 放大两倍
canvas.height = height * 2 // 放大两倍
canvas.style.width = width + 'px'
canvas.style.height = height + 'px'
ctx = canvas.getContext('2d');
ctx.scale(2, 2)
// 绘制元素时按照原尺寸绘制即可
```