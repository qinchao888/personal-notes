---
title: 标签用法
lang: zh-CN
sidebarDepth: 2
---
## 常用标签
### meta

```html
<meta name="format-detection" content="telephone=no">
<meta name="format-detection" content="email=no">
<meta name="format-detection" content="address=no">
<!--或-->
<meta name="format-detection" content="telephone=no,email=no,address=no">
```
<p class="fg_t">1. telephone</p>

iPhone会自动给一串数字加链接样式、并且点击这个数字可以自动拨号。

<p class="fg_t">2. email</p>

email=no 告诉设备不识别邮箱，点击之后不自动发送。

<p class="fg_t">3. address</p>

address=no 禁止跳转至地图！

注：上述只适用于原生iOS和一些Android电子邮件客户端，而不是普遍适用于不同的移动电子邮件应用和移动设备。

```html
<!--hack-->
<html>
<head>
  <meta name="format-detection" content="telephone=no">
  <meta name="format-detection" content="date=no">
  <meta name="format-detection" content="address=no">
  <meta name="format-detection" content="email=no">
  <style type="text/css">
    a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
    }
  </style>
</head>
<body>
  123 Main Street<br/>
  Columbus, Ohio 43215
</body>
</html>
```

###  video

属性：

```js
webkit-playsinline="true"  /*这个属性是ios 10中设置可以让视频在小窗内播放，也就是不是全屏播放*/  
x-webkit-airplay="true"  /*这个属性还不知道作用*/ 
playsinline="true"  /*IOS微信浏览器支持小窗内播放*/ 
x5-video-player-type="h5" /*启用H5播放器,是wechat安卓版特性*/
x5-video-orientation="h5" /*播放器支付的方向，landscape横屏，portraint竖屏，默认值为竖屏*/
x5-video-player-fullscreen="true" /*全屏设置，设置为 true 是防止横屏*/
preload="auto" /*这个属性规定页面加载完成后载入视频*/ 
```

css属性：

#### style="object-fit:fill": 会导致视频被缩放至video的宽高大小。

```html
<!--放大至全屏大小-->
<video id="video" width="100%" height="100%" poster="./logo.png" style="object-fit:fill">
  <source src="./movie.mp4"  type="video/mp4">
</video>
```
