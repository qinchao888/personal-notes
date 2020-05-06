---
title: 练习
lang: zh-CN
sidebarDepth: 2
---

```js
------

['1', '2', '3'].map(parseInt) // [1, NaN, NaN]
/**
 * 等价于
 * parseInt('1', 0);
 * parseInt('2', 1);
 * parseInt('3', 2);
 * parseInt(string, radix)
 * radix：如果省略该参数或其值为 0，则数字将以 10 为基础来解析
*/

------

[typeof null, null instanceof Object] // [object, false]

------

[3,2,1].reduce(Math.pow) // 9
[].reduce(Math.pow) // Uncaught TypeError: Reduce of empty array with no initial value

------

var name = 'World!';
(function () {
  if (typeof name === 'undefined') {
    var name = 'Jack';
    console.log('Goodbye ' + name);
  } else {
    console.log('Hello ' + name);
  }
})();
// Goodbye Jack
/**
 * 变量提升
 * 等价于
 * var name = 'World!';
 * (function () {
 *    var name;
 *    if (typeof name === 'undefined') {
 *      name = 'Jack';
 *      console.log('Goodbye ' + name);
 *    } else {
 *      console.log('Hello ' + name);
 *    }
 * })();
*/

------

var arr = [1]
arr[10] = [10]
arr.filter(value => value === undefined) // []

------

new String('aa') == 'aa' // true
new String('aa') === 'aa' // false
String('aa') === 'aa' // true

------

function showCase(value) {
  switch(value) {
    case 'A':
      console.log('Case A');
      break;
    case 'B':
      console.log('Case B');
      break;
    case undefined:
      console.log('undefined');
      break;
    default:
      console.log('Do not know!');
  }
}
showCase(new String('A')); // Do not know!
// switch 是严格比较, String 实例和 字符串不一样

------

Array.isArray(Array.prototype) // true

------

1 + - + + + - + 1 // 2

/**
 *  1 + (a)  => 2
 *  a = - (b) => 1
 *  b = + (c) => -1
 *  c = + (d) => -1
 *  d = + (e) => -1
 *  e = + (f) => -1
 *  f = - (g) => -1
 *  g = + 1   => 1
*/

------

function sidEffecting(ary) {
  ary[0] = ary[2];
}
function bar(a, b, c) {
  c = 10
  sidEffecting(arguments);
  return a + b + c;
}
bar(1, 1, 1) // 21
/** 当函数参数涉及到 any rest parameters, any default parameters or any destructured parameters 的时
* 这个 arguments 就不在是一个 mapped arguments object 了
*/
function sidEffecting(ary) {
  ary[0] = ary[2];
}
function bar(a, b, c = 3) {
  c = 10
  sidEffecting(arguments);
  return a + b + c;
}
bar(1, 1, 1) // 12

------

var a = 111111111111111110000, b = 1111;
a + b; // 111111111111111110000
// Lack of precision for numbers in JavaScript affects both small and big numbers.

------

Number.MIN_VALUE > 0 // true
// MIN_VALUE 属性是 JavaScript 中可表示的最小的数（接近 0 ，但不是负数）。它的近似值为 5 x 10-324

------

[1 < 2 < 3, 3 < 2 < 1] // [true, true]
/**
 * 等价于
 * 1 < 2 => true;
 * true < 3 =>  1 < 3 => true;
 * 3 < 2 => false;
 * false < 1 => 0 < 1 => true;
*/

------

3.toString() // Invalid or unexpected token
3..toString() // '3'
3...toString() // Invalid or unexpected token
// 因为 js 中 1.1, 1., .1 都是合法的数字

------

var a = [1, 2, 3], b = [1, 2, 3], c = [1, 2, 4]
a ==  b // false
a === b // false
a > c // false
a < c // true => 123 < 124

------

var a = {}, b = Object.prototype;
[a.prototype === b, a.__proto__ === b, Object.getPrototypeOf(a) === b] // [false, true, true]

------

function foo () {}
foo.name // foo
foo.name = 'fn'
foo.name // foo （函数名不可变）

------

'1 2 3'.replace(/\d/g, parseInt) // 1 NaN 3
/**
 * replace(reg, func)
 * func参数
 * match：匹配的字符串
 * p1, p2...：捕获组
 * index：索引
 * string：字符串本身
*/

------

var reg = /^(null|undefined)$/
[reg.test(null), reg.test(undefined), reg.test()] // [true, true, true]
/**
 * test 函数会将参数转为字符串 
 * null -> 'null'
 * undefined -> 'undefined'
*/

------

[,,,].join(', ') // ", , "
/**
 * 长度为3的稀疏数组
 * JS允许定义数组时，最后一个数组元素后有,
*/

------

new Date('aa') // Invalid Date
typeof new Date('aa') // object
new Date('aa') instanceof Date // true

------

Function.name // Function
Function.length // 1
new Function().length // 0
new Function('a', 'b').length // 1 （第二个参数为函数体）
function f (...args) {} // 0
function f (a, b, c) {} // 3
// length：函数形参的个数

------

var a = Date(0); // 当前时间的字符串形式
var b = new Date(0); // Thu Jan 01 1970 08:00:00 GMT+0800 (中国标准时间)
var c = new Date(); // 当前时间
[a === b, b === c, a === c] // [false, false, false]
Date.length // 7（对应七个参数：年 月 日 时 分 秒 毫秒）

------

var min = Math.min(), max = Math.max()
min < max // false
min > max // true
/**
 * Math.min() 返回 Infinity
 * Math.max() 返回 -Infinity
 * Math.min() 可以理解为在传入的数值和 Infinity 中取最小值
 * Math.max() 可以理解为在传入的数值和 -Infinity 中取最大值
*/

------

function captureOne(re, str) {
  var match = re.exec(str);
  return match && match[1];
}
var numRe  = /num=(\d+)/ig,
wordRe = /word=(\w+)/i,
a1 = captureOne(numRe,  "num=1"),
a2 = captureOne(wordRe, "word=1"),
a3 = captureOne(numRe,  "NUM=2"),
a4 = captureOne(wordRe,  "WORD=2");
[a1 === a2, a3 === a4] // [true, false]
// a1 = '1'; a2 = '1'; a3 = null; a4 = '2'

------

var a = new Date('2014-03-19'), b = new Date(2014, 03, 19);
[a.getDay() === b.getDay(), a.getMonth() === b.getMonth()] // [false, false]
/**
 * a -> Wed Mar 19 2014 08:00:00 GMT+0800 (中国标准时间)
 * b -> Sat Apr 19 2014 00:00:00 GMT+0800 (中国标准时间)
 * a.getMonth() -> 2
 * b.getMonth() -> 3
 * /
------

```