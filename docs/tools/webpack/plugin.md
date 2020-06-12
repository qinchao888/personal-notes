---
title: plugin
lang: zh-CN
sidebarDepth: 2
---

## html-webpack-plugin

生成新的 index.html 

```js
...
const HtmlWebpackPlugin = require('html-webpack-plugin');
...

plugins: [
  new HtmlWebpackPlugin({
    title: 'this is a test'
  })
]
```

## clean-webpack-plugin

清理文件

```js
// 清理dist目录 旧版
...
const CleanWebpackPlugin = require('clean-webpack-plugin');
...

plugins: [
  new CleanWebpackPlugin(['dist']),
]

// 新版
...
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
...
plugins: [
  new CleanWebpackPlugin(),
]
```
