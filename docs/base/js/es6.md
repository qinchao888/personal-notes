---
title: ES6
lang: zh-CN
sidebarDepth: 2
---

## 基础

### 变量声明

```js
for (var i = 0; i < 10; i++) {
  setTimeout(function() { console.log(i); }, 100 * i);
}
// 输出结果：全为 10

// 期待结果：1，2，3，4...
// 方案一：
for (var i = 0; i < 10; i++) {
  (function(i) {
    setTimeout(function() { console.log(i); }, 100 * i);
  })(i);
}

// 方案二：
for (let i = 0; i < 10 ; i++) {
  setTimeout(function() {console.log(i); }, 100 * i);
}
```
### 箭头函数

箭头函数的 this 总是指向定义生效时所在的对象而不是运行时所在的对象。

理解：只有当函数被调用时，此时其内部的 this 才能被确定，即此时函数中的 this 指向调用的对象。该函数内部的箭头函数的 this 将全部指向该调用者。

```js
// 例1：
/* 箭头函数位于foo函数内部。只有foo函数运行后(被调用后，内部this确定)，
它才会按照定义生成，所以foo运行时所在的对象，恰好是箭头函数定义时所在的对象 */
function foo() {
  setTimeout( () => { // setTimeout 本身是一个函数，只有 foo 被调用后 this 才能确定
    console.log("id:", this.id);
  },100);
}
var id = 21; // 箭头函数运行时所在的环境
foo.call( { id: 42 } ); // 箭头函数定义时所在的环境
// 结果是 id: 42

// 例2：
function foo() {
  return () => {
    return () => {
      return () => {
        console.log("id:", this.id);
      };
    };
  };
}
var f = foo.call({id: 1});
var t1 = f.call({id: 2})()(); // 1
var t2 = f().call({id: 3})(); // 1
var t3 = f()().call({id: 4}); // 1

// 例3：
var a = 10
function test () {
  return function () {
    return () => { // 此处箭头函数生效是在上层函数调用时生效
      console.log(this.a)
    }
  }
}
test.call({a: 1})()() // 10
test().call({a: 1})() // 1
test()().call({a: 1}) // 10

// 例4：
var a = 10
function test () {
  return () => {
    console.log(this.a)
  }
}
test.call({a: 1})() // 1
test().call({a: 1}) // 10

// 例5：
function foo() {
  return () => {
    return () => {
      return () => {
        console.log("id:", this.id);
      };
    };
  };
}
var t0 = foo.call({id: 1})()()(); // 1
var t1 = foo().call({id: 2})()(); // undefined
var t2 = foo()().call({id: 3})(); // undefined
var t3 = foo()()().call({id: 4}); // undefined
// 返回 undefined 表明此时的 this 指向 window

// 例6：
var obj = {
  o: {
    s: () => {
      console.log(this)
    }
  }
}
obj.o.s() // window
// 可以理解：对象中的箭头函数的 this 始终指向 window，无论对象嵌套的层级多深。
```
### 扩展运算符

扩展运算符只能解构对象自身的可枚举属性。

```js
// 例1:
class C {
  p = 12;
  m() { // 挂载在原型上，不可枚举
  }
}
let c = new C();
let clone = { ...c };
clone.p; // ok
clone.m(); // error!

// 例2:
const obj = {a: 1};
Object.defineProperty(obj, 'b', {
  value: function () {
    return 1;
  },
  enumerable: true
})
console.log({...obj}); // {a: 1, b: ƒ}
```