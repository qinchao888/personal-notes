---
title: node
lang: zh-CN
sidebarDepth: 2
---
## 路由的去中心化

#### 目的：随着项目的扩大，路由会越来越多，路由嵌套也越深。不便于代码的维护。此时可以使用路由的去中心化对路由按照业务模块进行拆分。

主要使用require.context()方法，通过正则匹配引入相应的文件模块。

```
项目结构：
|--router
   |--moduleA
      |--index.js
   |--moduleB
      |--index.js
   |--index.js 
```
```js
// router/index.js
import Router from 'vue-router'
const _import = dirname => () => import('@/views/' + dirname + '/index.vue')
// const matches = require.context('./', true, /^\.\/[^/]+\/.+\.js$/) // 剔除当前router/index.js文件
// console.log(matches.keys().map(val => matches(val).default)) // res: [[{...}]]
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'mainIndex',
      component: mainIndex
    },
  ].concat(...(r => {return r.keys().map(val => r(val).default)})(require.context('./', true, /^\.\/[^/]+\/.+\.js$/))) // 匿名自执行函数
})

// moduleA/index.js
const _import = dirname => () => import('@/views/' + dirname + '/index.vue')
const routes = [
  {
    path: '/a',
    name: 'a',
    component: _import('a')
  },
  {
    path: '/b',
    name: 'b',
    component: _import('b')
  }
]
export default routes
```