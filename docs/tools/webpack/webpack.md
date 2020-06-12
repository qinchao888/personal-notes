---
title: webpack基础知识
lang: zh-CN
sidebarDepth: 0
---
:::tip tips
1. webpack不建议全局安装，全局安装后，构建项目时使用的是全局安装的webpack版本，可能会导致构建失败。
2. webpack可以指定多个入口，但是只能指定一个输出配置。
3. 类似于 NodeJS，JSON 支持实际上是内置的。即webpack可以处理JSON类型的文件，而不需要额外引入loader处理。
:::