---
title: JS
lang: zh-CN
sidebarDepth: 2
---

## 原型

```js
function Person () {}

Person.prototype === new Person().__proto__ // true

Person.prototype === Object.getPrototypeOf(new Person()) // true

Person.prototype.constructor === Person // true

Object.prototype.__proto__ === null // true

Person.prototype.__proto__ === Object.prototype // true
```

### __proto__

```js
/**
 * __proto__：绝大部分浏览器都支持这个非标准的方法访问原型，然而它并不存在于 Person.prototype 中，
 * 实际上，它是来自于 Object.prototype ，与其说是一个属性，不如说是一个 getter/setter，
 * 当使用 obj.__proto__ 时，可以理解成返回了 Object.getPrototypeOf(obj)。
 * 
 */

function Person () {}

Person.prototype.hasOwnProperty('__proto__') // false

Object.prototype.hasOwnProperty('__proto__') // true
```

## 作用域

作用域：定义变量的区域。作用域规定了如何查找变量，即确定了当前执行的代码对变量的访问权限。

JavaScript 采用词法作用域(lexical scoping)，也就是静态作用域。

```js
var scope = "global scope";
function checkscope(){
  var scope = "local scope";
  function f(){
      return scope;
  }
  return f();
}
checkscope(); // local scope

var scope = "global scope";
function checkscope(){
  var scope = "local scope";
  function f(){
      return scope;
  }
  return f;
}
checkscope()(); // local scope

// 函数的作用域是函数定义时决定的，而不是运行时决定的。
```

## 执行上下文

三个属性：
1. 变量对象(Variable object，VO)
2. 作用域链(Scope chain)
3. this

### 变量对象

变量对象是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明。

1. 全局上下文的变量对象初始化是全局对象
2. 函数上下文的变量对象初始化只包括 Arguments 对象
3. 在进入执行上下文时会给变量对象添加形参、函数声明、变量声明等初始的属性值
4. 在代码执行阶段，会再次修改变量对象的属性值

```js
this === this.self === window === this.window

function foo() {
  console.log(a);
  a = 1;
}
foo(); // Uncaught ReferenceError: a is not defined

function foo() {
  console.log(a);
  var a = 1;
}
foo(); // undefined
```

### 作用域链

当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。

## this

Reference

1. base value
2. referenced name
3. strict reference

::: tip description
 A Reference consists of three components, the base value, the referenced name and the Boolean valued strict reference flag. The base value is either undefined, an Object, a Boolean, a String, a Number, or an environment record (10.2.1). A base value of undefined indicates that the reference could not be resolved to a binding. The referenced name is a String.
:::

GetBase: 返回 reference 的 base value。

GetValue: 返回对象属性真正的值（不再是一个 Reference）。

IsPropertyReference: 如果 base value 是一个对象，就返回true。

## 数组

### 密集数组与稀疏数组

稀疏数组再执行 forEach， map， filter等方式时会被跳过

```js
new Array(3) // [empty × 3]（稀疏数组）

var arr = []
arr[2] = 1 // [empty × 2, 1]（稀疏数组）
0 in arr // false
2 in arr // true

Array.apply(null, Array(3)) // [undefined, undefined, undefined]（密集数组）

var arr = new Array(3)
arr.map(value => console.log(value)) // 

var arr = Array.apply(null, Array(3))
arr.map(value => console.log(value)) // undefined undefined undefined
```

### 慢数组和快数组

JS数组的特点：相对于传统的数组，连续、固定长度、相同数据类型。JS数组可以存放多种数据类型，可以改变数组的长度。

#### 为什么C，Java等数组中的数据要定义成相同数据类型

[参考](https://www.cnblogs.com/vivotech/p/12029196.html)

由于数组长度固定，那么如果数据类型不固定会导致数据的长度可变，进而导致数组的长度可变。

#### 为什么JS数组可以存放不同的数据类型

数组是一个特殊的对象，内部是key-value的存储形式

```c
// c语言数组声明
double balance[10]
```

#### 快数组

快数组是一种线性的存储方式。新创建的空数组，默认的存储方式是快数组，快数组长度是可变的，可以根据元素的增加和删除来动态调整存储空间大小，内部是通过扩容和收缩机制实现。

#### 慢数组

慢数组是一种字典的内存形式。不用开辟大块连续的存储空间，节省了内存，但是由于需要维护这样一个 HashTable，其效率会比快数组低。

#### 快数组和慢数组的区别：

1. 存储方式方面：快数组内存中是连续的，慢数组在内存中是零散分配的。
2. 内存使用方面：由于快数组内存是连续的，可能需要开辟一大块供其使用，其中还可能有很多空洞，是比较费内存的。慢数组不会有空洞的情况，且都是零散的内存，比较节省内存空间。
3. 遍历效率方面：快数组由于是空间连续的，遍历速度很快，而慢数组每次都要寻找 key 的位置，遍历效率会差一些。

