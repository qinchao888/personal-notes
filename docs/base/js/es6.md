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

### async 和 await的理解

1. async函数的await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。
2. 返回值是 Promise。

#### 错误处理

async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态。抛出的错误对象会被catch方法回调函数接收到。

```js
async function test () {
  const res = await 1
  throw new Error(res)
}
test().then(res => console.log(res.message)).catch(err => console.log('err', err.message)).then(console.log)
// err 1
// undefined
```
await命令后面的 Promise 对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到。

```js
async function test () {
  await Promise.reject('error')
}
test().catch(err => console.log('err', err))
// err error
```
任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行。

```js
async function test () {
  await Promise.reject('error')
  await Promise.resolve('resolve') // 不会执行
}
test().then(res => console.log('resolve', res))
.catch(err => console.log('err', err))
```

错误处理的两种方式

1. 使用 try {} catch(err) {}
2. 使用 .catch

```js
// 方式一
async function test () {
  try {
    await ajax(url)
  } catch (err) {}
}

// 方式二
async function test () {
  await ajax(url).catch(err => ...)
}
```

#### 请求失败多次请求

```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
async function ajax(data, count) {
  let response = null
  for (let i = 0; i < count; i++) {
    try {
      response = await axios(data)
      break
    } catch (err) {}
  }
  return response.data
}
ajax({
  url: 'https://icanhazip.com/',
  method: 'get'
}, 3).then(result => {
  console.log('result', result)
})
</script>
```

#### 两个独立的异步操作同时触发

```js
// 方式一
const [res1, res2] = Promise.all([getRes1(), getRes2()])

// 方式二
const res1Promise = getRes1()
const res2Promise = getRes2()
const res1 = await res1Promise
const res2 = await res2Promise
```

#### forEach 函数中使用async函数

```js
function dbFuc(db) { //这里不需要 async
  let docs = [{}, {}, {}];

  // 可能得到错误结果
  docs.forEach(async function (doc) {
    await db.post(doc);
  });
}
```
此时三个db.post操作是并发执行，也就是同时执行，而不是继发执行。正确的写法是采用for循环。

```js
async function dbFuc(db) {
  let docs = [{}, {}, {}];

  for (let doc of docs) {
    await db.post(doc);
  }
}
```
多个请求并发执行

```js
// 方式一
async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = await Promise.all(promises);
  console.log(results);
}

// 方式二

async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = [];
  for (let promise of promises) {
    results.push(await promise);
  }
  console.log(results);
}
```

### promise.all控制任务执行数量

[参考](https://segmentfault.com/a/1190000020992680?utm_source=tag-newest)

要点：使用 iterator 实现

```js
function sleep (time) {
  return new Promise(resolve => setTimeout(resolve, time))
}

async function execute (id) {
  console.log('start', id)
  await sleep(1000)
  console.log('end', id)
}

function promiseLimit(arr, func, count = 1) {
  const iterator = arr.values();
  return new Array(count).fill(iterator).map(async it => {
    for (const value of it) {
      await func(value)
    }
  });
}
/* 每次执行两个任务，当其中一个执行完成，下一个任务开始执行 */
Promise.all(promiseLimit(Array.from({length:10}, (v, i) => i), execute, 2))

/* 每次执行两个任务，当两个任务全部执行完成，执行后面的两个任务 */
async function promiseLimit2(arr, func, count = 1) {
  const iterator = arr.values();
  const taskList = new Array(count).fill(iterator).map(async it => {
    for (const value of it) {
      await func(value)
      break;
    }
  });
  await Promise.all(taskList);
  arr.splice(0, count);
  arr.length && promiseLimit2(arr, execute, count);
}
promiseLimit2(Array.from({length:10}, (v, i) => i), execute, 2)
```

### 其它

#### 多个文件 import 的相同模块里的对象，是否永远都是同一个对象？

vue项目中是的。

[参考](zhihu.com/question/266129549)

## import

```html
<!-- html 文件中使用 import -->

<!-- 方式一： 使用 type="module" -->
<script type="module">
import { data } from './data.js'
console.log('data', data) // {text: "this is data"}
</script>

<!-- 方式二： 使用import函数 (这是一个处于第三阶段的提案) -->
<script>
(async function () {
  const { data } = await import('./data.js')
  console.log('data', data) // {text: "this is data"}
})()
</script>
```

### import require 和 import()

1. import 是编译时加载，require 是运行时加载。
2. import 时ES6的语法，require 是 commonJS的语法，import 可以转化成 require。
3. import 可以导出模块的所有内容或部分内容，而 require 只能导出整个模块对象，不能导出模块的部分内容。
4. import 函数可以动态加载，返回一个promise对象，是异步操作。

## Symbol

::: tip tips
Symbol是一种基本数据类型，它不是对象，因此不能使用new操作符。它是一种类似于字符串的数据类型。可以用来创建一个独一无二的值。

Symbol函数中的参数会被转化成字符串后再生成一个Symbol值。

Symbol 值不能与其他类型的值进行运算。

Symbol值可以转为字符串(toString)或布尔值(Boolean)。

Symbol 作为属性名，遍历对象的时候，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。可以使用Object.getOwnPropertySymbols()方法，获取指定对象的所有 Symbol 属性名。使用 Reflect.ownKeys()方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。
:::

1. for ... in ... ：主要用于遍历对象的可枚举属性，包括自有属性、继承自原型的属性。
2. Object.keys()：返回一个由一个给定对象的自身可枚举属性组成的数组。
3. Object.getOwnPropertyNames()：返回一个由指定对象的所有自身属性的属性名（包括可枚举和不可枚举的属性但不包括Symbol值作为名称的属性）组成的数组。
4. Reflect.ownKeys()：目标对象自身的属性键组成的数组。
5. Object.getOwnPropertySymbols()：返回一个给定对象自身的所有 Symbol 属性的数组。

```js
typeof Symbol() // symbol

// 如果 Symbol 的参数是一个对象，就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值
var obj = {toString () {return 123}}
Symbol(obj) // Symbol(123)

var a = Symbol({a: 1, b: 2})
a // Symbol([object Object])

var b = Symbol([1, 2])
b // Symbol(1,2)

// 转为字符串
b.toString() // 'Symbol(1,2)'

// 转为布尔值
Boolean(b) // true

// 获取描述（被转为字符串后的参数值）
Symbol({a: 1, b: 2}).description // '[object Object]'
Symbol('a').description // 'a'
```
### Symbol.for()，Symbol.keyFor()

Symbol.for()：先去全局中查找指定的 key，有则返回，无则新增。

Symbol.keyFor()：返回一个已登记的 Symbol 类型值的key。

#### Symbol.for()与Symbol()的区别：

前者会被登记在全局环境中供搜索，后者不会。Symbol.for() 会先去全局中查找指定的 key 是否存在，如果不存在才会新建一个值。而Symbol每次都会创建一个新的值。

```js
Symbol.for('bar') === Symbol.for('bar') // true
Symbol('bar') === Symbol('bar') // false

let s1 = Symbol.for('foo');
Symbol.keyFor(s1) // 'foo'

let s2 = Symbol('foo');
Symbol.keyFor(s2) // undefined
```