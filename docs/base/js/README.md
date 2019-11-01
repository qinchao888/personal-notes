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

## 常见方法

### sort

sort：对数组进行排序，如果函数返回负数或 0，则顺序保持不变。如果返回正数，则交换元素顺序。

```js
const arr = [1, 3, 2, 4]
arr.sort((a, b) => b - a) // 降序
```