---
title: 前端笔记
lang: zh-CN
sidebarDepth: 2
---
## JS类型比较和转化规则

### Number的转化规则

1.原始类型值

```js
Number(123) // 123
Number('123') // 123
Number('123abc') // NaN
Number('') // 0
Number(true) // 1
Number(false) // 0
Number(null) // 0
Number(undefined) // NaN

Number('\t\n\r123\t\n\r') // 123
Number(NaN) // NaN
```
Number()在进行转化时会忽略前后的空格。

如:\t (制表符) \r (回车符) \n (换行符)

2.对象

::: tip 转化规则：
第一步：先调用valueOf()，如果返回原始类型值，再使用Number()。否则执行第二步。

第二步：调用toString()，如果返回原始类型值，再使用Number()。否则报错。
:::

```js
Number({}) // NaN
Number([1]) // 1
Number([1, 2]) // NaN
```
对象和数组调用 valueOf() 返回自身，{} 再调用 toString() 返回 "[object Object]" (字符串类型)，再调用 Number() 返回NaN。

```js
// Number()转化对象等价于
if (typeof obj.valueOf() === 'object') {
  Number(obj.toString());
} else {
  Number(obj.valueOf());
}
```
覆写对象的 valueOf() 和 toString() 方法：
```js
// 例1：
var obj = {
  valueOf: function () {
    return {}
  },
  toString: function () {
    return {}
  }
}
Number(obj) // Uncaught TypeError: Cannot convert object to primitive value

// 例2：
Number({
  valueOf: function () {
    return 1;
  },
  toString: function () {
    return 2;
  }
}) // 1
```
### String的转化规则

1.原始类型值

```js
String('123') // '123'
String(123) // '123'
String(true) // 'true'
String(null) // 'null'
String(undefined) // 'undefined'
String(NaN) // 'NaN'
```
2.对象

::: tip 转化规则：（与Number相反）
第一步：先调用toString()，如果返回原始类型值，再使用String()。否则执行第二步：

第二步：调用valueOf()，如果返回原始类型值，再使用String()。否则报错。
:::

```js
String({a: 1}) // "[object Object]"
String([1, 2, 3]) // "1,2,3"

String({a: 1}) // "[object Object]"
// 等同于
String({a: 1}.toString()) // "[object Object]"
```
覆写对象的 toString() 和 valueOf() 方法：
```js
// 例1：
var obj = {
  toString: function () {
    return {};
  },
  valueOf: function () {
    return {};
  }
};
String(obj) // TypeError: Cannot convert object to primitive value

// 例2：
String({
  valueOf: function () {
    return 1;
  },
  toString: function () {
    return 2;
  }
}) // "2"
```
### Boolean的转化规则

#### 转化为Boolean为false的值
:::v-pre
`null、undefined、NaN、-0 或 +0、''、false`
:::

```js
Boolean({}) // true
Boolean([]) // true
Boolean(new Boolean(false)) // true
```
所有对象的布尔值都是true，原因：出于性能的考虑，对象转化为布尔值可能需要过多的计算。为了保证性能，统一规定对象的布尔值为true。

### 自动转化

#### 自动转化为布尔值

```js
if (undefined) {...} // if的隐式转化

expression ? true: false // 三元表达式

!!expression
```
#### 自动转化为字符串

在进行加法运算时，一个值为字符串，一个值为非字符串会自动将非字符串的值转化为字符串进行运算。

```js
'5' + 1 // '51'
'5' + true // "5true"
'5' + false // "5false"
'5' + {} // "5[object Object]"
'5' + [] // "5"
'5' + function (){} // "5function (){}"
'5' + undefined // "5undefined"
'5' + null // "5null"

// 例1：
var obj = {
  valueOf: function () {
    return 1
  },
  toString: function () {
    return 2
  }
}
console.log('1' + obj) // '11'

// 例2：
var obj = {
  valueOf: function () {
    return {}
  },
  toString: function () {
    return 2
  }
}
console.log('1' + obj) // '12'

// 例3：
var obj = {
  valueOf: function () {
    return {}
  },
  toString: function () {
    return {}
  }
}
console.log('1' + obj) // Uncaught TypeError: Cannot convert object to primitive value
```
在进行字符串和非字符串加法运算时，如果非字符串为一个对象会优先调用 valueOf() 转化为原始值类型，如果返回的是对象会再次调用 toString() 转化为原始值类型，再将其转化为字符串，再进行字符串拼接。

#### 自动转化为数值

先将非数值类型通过 Number() 转化为数值类型，再进行运算。
```js
'5' - '2' // 3
'5' * '2' // 10
true - 1  // 0
false - 1 // -1
'1' - 1   // 0
'5' * []    // 0
false / '5' // 0
'abc' - 1   // NaN
null + 1 // 1
undefined + 1 // NaN
+'abc' // NaN
-'abc' // NaN
+true // 1
-false // 0
```
::: tip 比较规则
1. 如果 x 或 y 中有一个为 NaN，则返回 false；
2. 如果 x 与 y 皆为 null 或 undefined 中的一种类型，则返回 true（null == undefined // true）；否则返回 false（null == 0 // false）；
3. 如果 x, y 类型不一致，且 x, y 为 String、Number、Boolean 中的某一类型，则将 x, y 使用 Number() 转化数值类型再进行比较；
4. 如果 x，y 中有一个为 Object，则先转化为原始类型，再进行比较。
:::
#### 注：在 ECMAScript 中规定，如果 < 为 false，则 >= 为 true。

```js
[] == ![] // true

/**转化过程：
1. [] 转化为''，![]转化为布尔值为false
2. 两边通过 Number() 转化为数值，均为0，故返回true */

NaN !== NaN // true
null > 0 // false
null < 0 // false
null == 0 // false
null >= 0 // true

null == undefined // true
// null只和undefined和null相等，和其他所有的值都不相等

{} + 1 // 1，这里的 {} 被当成了代码块
{ 1 + 1 } + 1 // 1

var obj = {}
obj + 1 // [object Object]1

{} + {} // Chrome 上显示 "[object Object][object Object]"，Firefox 显示 NaN
[] + {} // [object Object]
{} + [] // 0
{} + ({}) // NaN

[2,3] + [1,2] // '2,31,2'
[2] + 1 // '21'
[2] + (-1) // "2-1"
```
{} + [] 值为 0 的原因：{} 被解析为代码块，即 {} + [] === + []，+ []会先通过 Number()将 []转化为0。

{} + {} 在Chorme浏览器下被解析为({} + {})，因此返回'[object Object][object Object]'而在Firefox下第一个{}被解析为代码块返回值是NaN。这个和浏览器的解析引擎有关。


```js
var obj = {
  valueOf: function () {
    return 1
  },
  toString: function () {
    return 2
  }
}
console.log(obj === 1) // false
console.log(obj == 1) // true
```
## 变量提升带来的问题

1. 无法获取期望的值

```js
var num = 1
function f () {
  console.log(num)
  if (false) {
    var num = 2
  }
}
f() // undefined
```
2. for循环中的变量会泄漏为全局变量

```js
for (var i = 0; i < 10; i++){}
console.log(i) // 10
```
::: tip 用 var 声明变量的缺陷：
1. 存在变量提升。
2. 污染全局变量，声明的变量会作为window对象的属性。
:::

## 箭头函数

```js
// 例1：
function foo() {
  setTimeout(function () {
    console.log('id:', this.id);
  });
}

var id = 21;
foo(); // id: 21
foo.call({ id: 42 }); // id: 21

// 例2：
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  });
}

var id = 21;
foo.call({ id: 42 }); // id: 42
```
箭头函数中的this是定义时所在的对象，而不是使用时所在的对象。

题中箭头函数的定义生效是在foo函数生成时，如果是普通函数，执行时this应该指向全局对象window，这时应该输出21。但是，箭头函数导致this总是指向函数定义生效时所在的对象，所以输出的是42。

```js
// 箭头函数的行为可以理解为：
function foo() {
  var that = this
  setTimeout(function () {
    console.log('this', that)
  })
}
```
## 解构赋值

### 数组的解构赋值

1. 对象：其数据结构必须具有Iterator接口。

```js
// 具有iterator接口的数据结构
Array | Map | Set | 类数组对象 | NodeList | String
```

2. 原始类型数据：转化为对象时具备Iterator接口。

```js
let [foo] = {}; // Uncaught TypeError: {} is not iterable
// 对象是不具备Iterator接口的

let [a] = '123'
a // 1
// 此处的字符串会被转换成了一个类似数组的对象。具备Iterator接口，故解构成功

let [b] = new String('123')
b // 1
```
#### 数组：
![image](https://note.youdao.com/yws/api/personal/file/E703686725904ADD869488D764160D5A?method=download&shareKey=80cde9ca79b66d183498533c4ae4c10a)

#### 对象：
![image](https://note.youdao.com/yws/api/personal/file/FC91358DA1724891B3E28C9F1178201B?method=download&shareKey=92bbcb223d0b4eb83c845e669e0fe2f6)

#### 数组解构的原理其实是消耗数组的迭代器，把生成对象的value属性的值赋值给对应的变量

```js
// 执行 Generator 函数会返回一个遍历器对象
function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

let [first, second, third, fourth, fifth, sixth] = fibs();
sixth // 5
// 上述的解构赋值等同于调用了五次next()获取相应的value值。
```
### 对象的解构赋值

#### 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。

```js
{a, a: [b]} = {a: [10]}
a // [10]
b // 10

let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true

let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```
## 扩展运算符

扩展运算符的原理其实是利用了数组的迭代器，它会消耗3个点后面的数组的所有迭代器，读取所有迭代器生成对象的value属性。

```js
// 例1：
let [first, ...arr] = [1, 2, 3, 4]
first // 1
arr // [2, 3, 4]

// 例2：
let [...arr, last] = [1, 2, 3, 4] // Uncaught SyntaxError: Rest element must be last element
```
分析：例1中的first会先消耗掉一个迭代器，...arr 会消耗掉剩下的迭代器。而例2中的 ...arr 直接消耗掉了所有的迭代器，导致last没有迭代器可以消耗。

#### 扩展运算符拷贝数组是浅拷贝，类似于Object.assign，只能拷贝一层。

```js
let arr = [{a: {b: 11}}]
let s = [...arr]
s[0].a = 10
console.log('s', s) // [{a: 10}]
console.log('arr', arr) // [{a: 10}]
```

## for...of 循环

::: tip for...of 和 for...in 的区别：

1. for ... of遍历获取的是对象的键值,for ... in 获取的是对象的键名。
2. for ... in会遍历对象的整个原型链,性能非常差不推荐使用,而for ... of只遍历当前对象不会遍历原型链。
3. 对于数组的遍历,for ... in会返回数组中所有可枚举的属性(包括原型链上可枚举的属性),for ... of只返回数组的下标对应的属性值。
:::

#### for...of 循环内部实现机制可以理解为：

```js
let arr = [1, 2, 3, 4]
let iterator = arr[Symbol.iterator]()
for (let value, res; (res = iterator.next()) && !res.done;) {
  value = res.value
}
```
## microtask 和 macrotask

microtask：微任务

macrotask：宏任务
```js
macrotask: setTimeout, setInterval, setImmediate, I/O, UI rendering
microtask: process.nextTick, Promises, Object.observe(废弃), MutationObserver
```
执行顺序：microtask -> macrotask

## Promise对象

(1)Promise对象内部抛出的错误未捕获不会影响外层代码的执行。

```js
const promise = new Promise(function (resolve, reject) {
  resolve('ok');
  setTimeout(function () { 
    throw new Error('test') 
  })
});
promise.then(function (value) { 
  console.log(value) 
});
setTimeout(function () {
  console.log('test1')
})
/**
ok
Uncaught Error: test
test1 */
```
(2)如果有then或catch成功执行，其后所有的then在正常情况下都会执行。

调用then后正常情况下返回的状态就是一个resolved状态。
```js
// 例1：
new Promise((resolve, reject) => {
  console.log('111')
  return 222
}).then(res => {
  console.log('success')
})
// 111

// 例2：
new Promise((resolve, reject) => {
  resolve(x + 1)
}).catch (err => console.log(err))
.then(res => {
  console.log('res', res)
  console.log('catch success')
})
/**
ReferenceError: x is not defined
res undefined
catch success */

// 例3：
new Promise((resolve, reject) => {
  resolve(1)
}).then(res => {
  console.log('res', res)
}).then(res => {
  console.log('true')
})
/**
res 1
true */

// 例4：
new Promise((resolve, reject) => {
  resolve(1)
}).then(res => {
  console.log('res', res)
  throw new Error('1111')
}).then(res => {
  console.log('true')
})
/**
res 1
Uncaught (in promise) Error: 1111
    at Promise.then.res */

// 例5：
new Promise((resolve, reject) => {
  resolve(x + 1)
}).then(res => {
  console.log(1)
}).catch(err => {
  console.log('err', err)
}).then(res => {
  console.log(22)
})
/**
err ReferenceError: x is not defined
    at Promise (2.html:43)
    at new Promise (<anonymous>)
    at 2.html:42
22
*/

// 例6：
new Promise((resolve, reject) => {
  resolve(1)
}).then(res => {
  console.log(1)
}).catch(err => { // 没有报错时会跳过catch方法
  console.log('err', err)
}).then(res => {
  console.log(22)
})
/**
1
22
*/
```
## Generator函数

该函数返回一个遍历器对象。具备Iterator接口。

#### yield*

作用：

1. 允许在Generator函数内部执行另一个Generator函数。
2. 返回该Generator函数的遍历器对象的值。等同于使用 for...of 循环遍历该遍历器对象。
3. 如果该Generator函数内部使用了return返回某个值，则需要额外使用形如：let value = yield* test() 去接收return出来的值。

## Set  和 Map 

#### Set 和 Map 的区别：

Set -> 集合，Map -> 字典

1. 共同点：集合、字典可以存储不重复的值。
2. 不同点：集合是以[值，值]的形式存储元素，字典是以[键，值]的形式存储。

#### Set 和 Map函数中使用new创建时，其参数必须具备iterator接口。

任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构都可以当作Map构造函数的参数。

```js
Map.prototype[Symbol.iterator] === Map.prototype.entries //true
Set.prototype[Symbol.iterator] === Set.prototype.keys // true
Set.prototype[Symbol.iterator] === Set.prototype.values // true
```

```js
let s = new WeakSet()
s.add({a: 1})
console.log(s)

// 等价于

let s = new WeakSet([{a: 1}])
console.log(s)
```
#### WeakSet：成员只能是对象。

成员都是弱引用，不会发生内存泄漏。

#### WeakMap：只接受对象作为键名（null除外）。

作用：
1. 键名所引用的对象都是弱引用，垃圾回收机制不会将该引用考虑在内。即只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。
2. 有助于防止内存泄漏。

## Class

1. 类的数据类型就是函数

```js
class Point {
    constructor () {
        ...
    }
}
typeof Point // function
```
2. 类的所有方法都定义在类的prototype属性上

```js
class Point {
    constructor () {...}
    toString () {...}
}

// 等价于

Point.prototype = {
    constructor () {...},
    toString () {...}
}
```
3. 类内部定义的方法都是不可枚举的
4. 使用 new 创建对象时，contructor函数会默认执行，如果未显式定义，一个空的contructor函数会被默认添加。constructor方法默认返回实例对象（即this）。
5. 类必须使用new调用，而普通构造函数不用new也可以执行。
6. 类和模块内部默认启用严格模式。
7. 类class不存在变量提升。
```js
// 例 1：
class Point {
  constructor (x = 0, y = 0) {
    this.x = x
    this.y = y
    this.sayHello = function () { // 私有方法
      console.log('hello')
    }
  }
  test () { // 原型上的方法
    return '(' + this.x + this.y + ')'
  }
}
let p1 = new Point()
let p2 = new Point()
console.log(p1.test === p2.test) // true
p1.sayHello() // 'hello'
console.log(Object.getPrototypeOf(p1) === p1.__proto__) // true (获取实例的原型对象)
```

```js
// 例 2：
class Person {
  get name () {
    return this._name
  }
  set name (value) {
    this._name = value
  }
}
let p = new Person()
p.name = 'a'
console.log(p.name) // 'a'
let desc = Object.getOwnPropertyDescriptor(Person.prototype, 'name') // 获取属性描述符对象
// name属性部署在Person.prototype上,set 和 get 函数部署在该属性的属性描述符对象上。
console.log(desc) // {get: ƒ, set: ƒ, enumerable: false, configurable: true}
```

```js
// 例 3：
// 创建一个立即执行类实例
let person = new class {
  constructor (name) {
    this.name = name
  }
  sayName () { 
    console.log(this.name)
  }
}('aa')
person.sayName() // aa
```

```js
// 例 4：
function Person () {
  this.x = 20 // 实例属性
}
Person.x = 10 // 构造函数的属性
let p = new Person()
console.log(p.x) // 20
console.log(p.__proto__.constructor.x) // 10
console.log(p.__proto__.constructor.name) // Person

// 属性分为三种：实例属性，原型属性，构造函数的属性
```