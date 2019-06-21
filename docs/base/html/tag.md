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