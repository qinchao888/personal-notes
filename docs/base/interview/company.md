---
title: 公司面试题
lang: zh-CN
sidebarDepth: 2
---

## 51job

### 1. watch 和 computed 的区别?

### 2. 导航守卫有哪些。

### 3. beforeEach 和 afterEach 中常用的操作

#### beforeEach：

1. 页面跳转时检测用户是否登录，未登录跳转至登录页。
2. 修改当前页面的title。
3. 加载页面loading。

#### afterEach：

1. 修改当前页面的title。
2. 关闭页面loading。

```js
router.afterEach(function (to, from, next) {
  console.log('meta', to.meta)
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
```
### 4. rem适配

### 5. vue组件传值，父子组件，兄弟组件

兄弟组件传值：

1. 使用vuex

2. 使用事件总线

```js
// main.js
window.bus = new Vue() // 可以挂载在window对象上，也可以挂载在Vue.prototype上

// b1.vue
...
window.bus.$on('myEvent', function (data) {...})

// b2.vue
window.bus.$emit('myEvent', data)
```

### 6. 实现三数相加

### 7. class的使用，写一个简单的class

使用class的优点：使对象原型的写法更加清晰，更像面向对象编程。

特性：

1. 数据类型为function
2. 内部定义的方法都是挂载在原型上，方法都是不可枚举的。
3. 类的内部默认启用严格模式，不存在变量提升。
4. 调用时必须使用new创建，而构造函数可以使用new也可以不使用。
5. 使用new创建对象时，内部的constructor函数会默认执行，如果未定义，会有个默认的空的constructor函数被添加。constructor中定义的方法为该对象的私有方法。

```js
function Person () {
  this.sayHello = function () {
    console.log('sayHello')
  }
}
var person = new Person()
person.sayHello()
// {value: ƒ, writable: true, enumerable: true, configurable: true}
console.log(Object.getOwnPropertyDescriptor(person, 'sayHello')) 

class Person {
  sayHello () {
    console.log('sayHello')
  }
}
// {value: ƒ, writable: true, enumerable: false, configurable: true}
console.log(Object.getOwnPropertyDescriptor(Person.prototype, 'sayHello'))
```

### 8. 闭包及在项目中的应用

概念：

理论上的闭包：能够访问自由变量的函数。（自由变量：不是在函数中定义的或不是函数参数）

```js
var a = 1
function fn () { // 闭包
  console.log(a)
}
```

实践中的闭包：能够访问一个函数中变量的函数。

```js
function fn () {
  var a = 1
  return function () {
    console.log(a)
  }
}
va s = fn()
s()
```

应用：节流和防抖函数

### 9. vue跳转至新页面返回时数据不刷新怎么实现

使用 keep-alive，在router中配置meta判断哪些页面需要被缓存，也可以使用include。

```js
// router.js
...
{
  path: '/main',
  name: 'main',
  component: Main,
  meta: {
    keepAlive: true
  }
}

// App.vue
<keep-alive :include="['a', 'b']">
  <router-view>...</router-view>
</keep-alive>
```

### 10. 小程序登录流程以及授权登录