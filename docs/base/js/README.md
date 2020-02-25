---
title: JS
lang: zh-CN
sidebarDepth: 2
---
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
2. for循环可以控制循环起点（i初始化的数字决定循环的起点），forEach只能默认从索引0开始。
3. for循环过程中支持修改索引（修改 i），但forEach做不到（底层控制index自增，我们无法左右它）。

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

## 常见方法

### sort

sort：对数组进行排序，如果函数返回负数或 0，则顺序保持不变。如果返回正数，则交换元素顺序。

```js
const arr = [1, 3, 2, 4]
arr.sort((a, b) => b - a) // 降序
```
