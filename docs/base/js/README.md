---
title: JS
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

// google调试工具console上输入以下内容
{} + {}; // NaN
{} + {} // [object Object][object Object]
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

## JS开发技巧

### 幂运算

```js
2 ** 3 // 8
// 等价于
Math.pow(2, 3)
```

### 获取数组最后一个元素

```js
var arr = [1, 2, 3]
arr.slice(-1) // [3]
```
### 判断数组中是否存在某个元素

```js
var arr = [1, 2, 3]

// 推荐使用
arr.includes(1)

// 不推荐使用
arr.indexOf(1) !== -1
```

[参考](https://segmentfault.com/a/1190000020783448)

### 删除数组的重复项

```js
const arr = [2, 2, 3]
[...new Set(arr)]; // 或 Array.from(new Set(arr))
```

### 使用 Array.from 达到 .map 的效果

```js
const list = [
  {
    name: 'a',
    age: 10
  },
  {
    name: 'b',
    age: 11
  }
]

const newList = list.map(item => item.name)
// 等价于
const newList = Array.from(list, ({name}) => name)
```

### 置空数组

```js
const list = [1, 2, 3]
list.length = 0 
list // []
```

### 数组转化为对象

```js
const list = [1, 2, 3]
const objList = {...list} // {0: 1, 1: 2, 2: 3}
```

### 用指定的值填满数组

fill() 方法用于将一个固定值替换数组的元素。

语法：array.fill(value, start, end)

|参数|描述|
|---|---|
value	|必需。填充的值。
start	|可选。开始填充位置。
end	|可选。停止填充位置 (默认为 array.length)

```js
const arr = new Array(10).fill(1) // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
```

### 从数组中删除虚值

虚值：false, 0, '', null, NaN, undefined

```js
const arr = [false, 0, '', null, NaN, undefined]
const res = arr.filter(Boolean) // []
```

### 数组中获取随机值

```js
Math.floor(Math.random() * arr.length)
```

### 获取数组中的最大值

```js
const arr = [1, 2, 3, 4]

// 方式一
Math.max(...arr)

// 方式二
Math.max.apply(null, arr)

// 方式三
Math.max.call(null, ...arr)
```

### arguments转化为数组的方式

```js
// 方式一
Array.prototype.slice.call(arguments)

// 方式二
[].slice.call(arguments)

// 方式三
Array.from(arguments)

// 方式四
[...arguments]
```
#### arguments 和 es6 中的rest的区别：

arguments是伪数组，而rest是真实的数组可以使用数组的方法。

### JS 实现数据存入excel中并导出

```js
function start () {
  const str = 'name,age\r\n111,222' // 此处\r或\n或\r\n好像都可以
  const filename = '下载.csv'
  download(str, filename)
}
function download (str, filename) { // 导出成csv格式
  const blob = new Blob([str], { type: 'type/plain' })
  if (navigator.userAgent.indexOf('Edge') > -1) { // IE10+
    window.navigator.msSaveBlob(blob, filename); 
  } else if (window.saveAs) {
    window.saveAs(blob, filename);
  } else {
    const url = window.URL.createObjectURL(blob);
    const a = document.querySelector('a');
    a.href = url;
    a.download = filename;
    a.click();
  }
}
/** 
 * window.navigator.msSaveOrOpenBlob: 提供保存和打开按钮 
 * window.navigator.msSaveBlobb: 只提供一个保存按钮 
*/
```
### JS 实现随机颜色值

核心代码：((Math.random() * 0xffffff + 1) | 0).toString(16).padStart(6, '0');

(Math.random() * 0xffffff + 1)：生成 0 ～ ffffff之间的数值，|0：剔除小数部分再通过toString转化成16进制。

```js
var frag = document.createDocumentFragment();
Array.from({length: 1000}).forEach(i => {
  var div = document.createElement('span');
  var color = ((Math.random() * 0xffffff + 1) | 0).toString(16).padStart(6, '0'); // 需要补齐六位
  div.style = 'display:inline-block;width:50px;height:50px;padding:10px;background-color:#' + color;
  frag.appendChild(div);
})
document.body.appendChild(frag)
```

### 生成从A-Z的数组

```js
// [A, B, ..., Z]
Array.from({length: 21}, (item, index) => String.fromCharCode(index + 65));
```

### 将给定的字符串每10个分割成一个数组

```js
var value = '测试12345678哈哈12345678aa？+-；‘’“”l';
// var re = /\s*(?:;|$)\s*/;
var result = value.split(/(?:([^]{10}))/);
// ["", "测试12345678", "", "哈哈12345678", "", "aa？+-；‘’“”", "l"]
/*
出现空字符串的原因：
第一次匹配会生成一个""和匹配的字符,
第二次匹配是在剩下的字符中继续匹配，所以会再次生成一个""和匹配的字符,
最后一次匹配是因为不满足匹配条件所以没有匹配成功，因此没有生成多余的""。
*/
var results = result.filter(item => !!item);
// ["测试12345678", "哈哈12345678", "aa？+-；‘’“”", "l"]
```

### 判断奇偶数

奇数的二进制最后一位必然为1，所以任意一个奇数 & 1 一定等于1。

```js
val & 1 === 1 // 奇数
val & 1 === 0 // 偶数
```

### rgb与16进制颜色名转化

```js
// rgb转16进制
function RGBToHex (rgb) { // FF0000 | FF00 | FF = FFFFFF
  var arr = rgb.match(/\d+/g)
  return `#${(arr[0] << 16 | arr[1] << 8 | arr[2]).toString(16).padStart(6, '0')}`
}

// 16进制转rgb
function HexToRGB (hex) {
  return `rgb(${hex.replace('#', '').match(/[a-zA-Z\d]{2}/g).reduce((total, item, index, arr) => total + parseInt(item, 16) + (index === arr.length - 1 ? '' : ', '), '')})`
}

// 16进制转为rgba
function HexToRGB (hex) {
  var arr = hex.replace(/([0-9a-fA-F])/g, '$1$1')
  return `rgba(${arr[0] >> 16}, ${arr[1] >> 8 & 0xff}, ${arr[2] & 0xff}})`
}
```

### for 循环和 forEach中删除元素

1. for循环可以使用break跳出循环，但forEach不能。
2. for循环可以在函数中使用return退出循环，而forEach则不能。
3. for循环可以控制循环起点（i初始化的数字决定循环的起点），forEach只能默认从索引0开始。
4. for循环过程中支持修改索引（修改 i），但forEach做不到（底层控制index自增，我们无法左右它）。

```js
var arr = [{a:1}, {a:2}, {a:3}, {a:4}]
for (var i = 0; i < arr.length; i++) { // 每次循环arr.length都会重新计算
  console.log(arr.length)
  if (arr[i].a === 2) {
    arr.splice(i, 1)
  }
  console.log('i', arr[i]) // {a: 1} {a: 3} {a: 4}
}

for (var i = 0, len = arr.length; i < len; i++) {
  console.log(arr.length)
  if (arr[i].a === 2) {
    arr.splice(i, 1)
  }
  console.log('i', arr[i]) // 会报错，删除元素后数据少了一个，但len并未改变
}

arr.forEach((item, index) => {
  if (item.a === 2) {
    arr.splice(index, 1)
  }
  console.log('i', arr[index]) // {a: 1} {a: 3} {a: 4}
})
```

### 统计数组中某个字符出现的次数

```js
function count (arr, value) {
  arr.reduce((total, val) => val === value ? total + 1: total, 0)
}
```

### 统计数组中所有字符出现的次数

```js
function count(arr) {
  return arr.reduce((total, val) => (total[val] !== undefined ? total[val] += 1 : total[val] = 1) && total, {})
}
console.log(count(['a', 'b', 'c', 'a', 'd', 'c', 'c'])); // {a: 2, b: 1, c: 3, d: 1}
```

### JS获取当天日期加一天的凌晨和晚23:59:59

```js
new Date(new Date(Date.now() + 24 * 3600 * 1000).setHours(0, 0, 0, 0))
new Date(new Date(Date.now() + 24 * 3600 * 1000).setHours(23, 59, 59, 99))
```

### JS实现倒计时

```js
function getTime (time) {
  var date = new Date('2020/09/30 23:59:59') - time
  var day = format(Math.floor(date / (24 * 3600 * 1000)))
  var hour = format(Math.floor((date / (3600 * 1000)) % 24))
  var minute = format(Math.floor((date / (60 * 1000)) % 60))
  var second = format(Math.floor((date / 1000) % 60))
  timeEl.innerHTML = `${day}天${hour}时${minute}分${second}秒`
}
/**
 * var time = Date.now()
 * ...
 * time = time + 1000
*/
setInterval(() => {
  getTime(Date.now()) 
}, 1000)
function format (time) {
  return +time < 10 ? `0${time}` : time
}
```

## 常见方法

### sort

sort：对数组进行排序，只有为负值时才会交换元素顺序。

```js
const arr = [1, 3, 2, 4]
arr.sort((a, b) => b - a) // 降序

// 以下写法无效
arr.sort((a, b) => a > b)
arr.sor((a, b) => a < b)
// 原因：a > b 的返回值为 true或 false，对应的数值类型为 1 和 0，没有负值，无法进行元素的交换。
```
