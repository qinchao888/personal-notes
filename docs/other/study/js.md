---
title: js
lang: zh-CN
sidebarDepth: 2
---

[参考一](https://juejin.im/post/5e8b163ff265da47ee3f54a6)

##  执行上下文

执行上下文（execution context，EC）：当Javascript代码执行时，会进入不同的上下文。

### Javascript中的执行上下文分为三种：

1. 全局执行上下文：默认的全局环境。全局上下文只有一个。
2. 函数执行上下文：每次调用函数都会创建一个函数执行上下文。
3. eval函数执行上下文：执行eval函数时，会创建一个属于eval函数的执行上下文，执行内部的代码。

### 执行上下文包含三个重要的属性

1. 变量对象(Variable object，VO)：存储了在上下文中定义的变量和函数声明。
2. 作用域链(Scope chain)
3. this

### 执行上下文的分为两个阶段：

1. 创建阶段

-- 创建作用域链

-- 创建变量、函数、参数（体现了变量提升）

-- 设置 this

2. 执行代码阶段

-- 设置变量的值、函数的引用，然后解释/执行代码

```js
executionContextObj = {
  scopeChain: { /* 变量对象（variableObject）+ 所有父执行上下文的变量对象*/ }, 
  variableObject: { /*函数 arguments/参数，内部变量和函数声明 */ }, 
  this: {} 
}
```

### 执行栈（LIFO（后进先出））

用来存储代码运行时创建的执行上下文。

[参考](https://yanhaijing.com/javascript/2014/04/29/what-is-the-execution-context-in-javascript/)

## this

1. 由new调用：绑定到新创建的对象
2. 由call或apply、bind调用：绑定到指定的对象
3. 由上下文对象调用：绑定到上下文对象
4. 默认：全局对象

注意：箭头函数不使用上面的绑定规则，根据外层作用域来决定this，继承外层函数调用的this绑定。

[参考](https://github.com/axuebin/articles/issues/6)

## promise

### 如何在全局捕捉Promise异常

当Promise 被 reject 且没有 reject 处理器的时候，会触发 unhandledrejection 事件。

[参考](https://developer.mozilla.org/zh-CN/docs/Web/Events/unhandledrejection)

```js
window.addEventListener('unhandledrejection', function (event) {
  console.log(event.reason) // this is a error
});
new Promise((resolve, reject) => {
  reject('this is a error')
})

new Promise((resolve, reject) => { // Uncaught (in promise) this is a error
  reject('this is a error')
})

// 使用 event.preventDefault();可以使异常不在控制台中打印
window.addEventListener('unhandledrejection', function (event) {
  event.preventDefault()
});
```