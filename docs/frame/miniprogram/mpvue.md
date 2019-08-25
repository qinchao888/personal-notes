---
title: mpvue
lang: zh-CN
sidebarDepth: 2
---
## mpvue中引用微信小程序原生组件

1. 将原生组件文件置于项目static文件夹下。
2. 给页面路由配置：

```json
{
  "usingComponents": {
    "filename": "/static/dir/filename/index"
  }
}
```
