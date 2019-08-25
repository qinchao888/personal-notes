---
title: JS
lang: zh-CN
sidebarDepth: 2
---
## JS开发技巧

#### 幂运算

```js
2 ** 3 // 8
// 等价于
Math.pow(2, 3)
```
#### 数组

获取数组最后一个元素

```js
var arr = [1, 2, 3]
arr.slice(-1) // [3]
```
判断数组中是否存在某个元素

```js
var arr = [1, 2, 3]

// 推荐使用
arr.includes(1)

// 不推荐使用
arr.indexOf(1) !== -1
```