---
title: 深入浅出webpack.pdf
lang: zh-CN
sidebarDepth: 2
---

## 模块化

### CommonJS

核心思想：通过 require 同步加载依赖。通过 module.exports 暴露接口。

#### 优点

1. 代码可复用于 Node.js 环境下井运行，例如做同构应用。
2. 通过Npm发布的很多第三方模块都采用了 CommonJS规范。

#### 缺点

代码无法直接在浏览器环境中运行，需要通过工具转换成标准的 ES5。

### AMD

采用异步的方式加载依赖的模块，代表的实现：requirejs。

#### 优点

1. 可异步加载依赖。
2. 可并行加载多个依赖。
3. 代码可运行在浏览器环境和Node.js环境。

#### 缺点

JavaScript运行环境没有支持原生的AMD环境，需要导入AMD库才能正常使用。

## 前端构建

1. 代码转换：将TypeScript编译成JavaScript，SCSS编译成CSS等。
2. 文件优化：压缩JavaScript、CSS、HTML代码，压缩合并图片等。
3. 代码分割：提取多个页面的公共代码，提取首屏不需要执行的代码，让其异步加载。
4. 模块合并：将多个模块文件合并成一个文件。
5. 自动刷新：监听本地源码的变化，自动重新构建，刷新浏览器。
6. 代码校验：校验代码是否符合规范。
7. 自动发布：更新代码后，自动构建出线上发布代码并传输给发布系统。

## webpack配置