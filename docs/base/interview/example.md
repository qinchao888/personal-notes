---
title: JS算法案例
lang: zh-CN
sidebarDepth: 2
---

## 练习

### 统计下面案例中名称相同的次数

```js
var data = [
  {id: '01', name: 'a'},
  {id: '02', name: 'b'},
  {id: '03', name: 'c'},
  {id: '04', name: 'a'},
  {id: '05', name: 'b'}
];

var res = data.reduce(function (total, item) {
  total[item.name] = total[item.name] ? total[item.name] + 1 : 1
  // total[item.name] = total[item.name] + 1 || 1
  // total[item.name]为 undefined 时 +1 时返回 NaN
  return total
}, {})
console.log(res) // {a: 2, b: 2, c: 1}
```

### 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素

示例 1:

输入: [2,2,1]
输出: 1

示例 2:

输入: [4,1,2,1,2]
输出: 4

```js
/**
 * 方法一：
 * 思路：使用 ^ 运算符
 * 1. 两个操作数相应的比特位有且仅有一个1时，返回1，否则返回0
 * 2. 任何一个数与 0 异或返回该值本身
 * 3. 2 ^ 2 = 0  0 ^ 0 = 0  0 ^ 1 = 1  2 ^ 3 ^ 2 = 3
*/
function singleNumber (nums) {
  for (var i = 1, len = nums.length; i < len; i++) {
    nums[0] = nums[0] ^ nums[i]
  }
  return nums[0]
}

/**
 * 方法二
 * 思路：
 * 1. 排序
 * 2.判断相邻的两个是否相等
*/
function singleNumber (nums) {
  nums.sort()
  for (var i = 0, len = nums.length; i < len; i += 2) {
    if (nums[i] !== nums[i + 1]) {
      return nums[i]
      break
    }
  }
}
```
### 值传递和引用传递

<p class="fr_th">ECMAScript中所有的函数的参数都是按值传递的。</p>

```js
let obj = {};
function changeValue(obj){
  obj.name = 'ConardLi';
  obj = {name:'code秘密花园'};
}
changeValue(obj);
console.log(obj.name); // ConardLi
```
### 实现 a == 1 && a == 2 && a == 3

```js
const a = {
  value:[3,2,1],
  valueOf: function () {return this.value.pop(); },
} 
```

### 获取当前日期第二天凌晨 00:00:00 的时间戳

```js
const d = new Date();
d.setDate(d.getDate() + 1);
d.setHours(0, 0, 0, 0);
console.log(d.getTime());
```

### 将下面的数据归类

```js
/*
归类为：将数据按照age相同的归为同一类 [[{..}], [{...}, ...]
*/
let nameList = [{
  name: 'mark',
  age: 15,
  hair: 'long'
}, {
  name: 'tuwen',
  age: 16,
  hair: 'short'
}, {
  name: 'xiaoming',
  age: 16,
  hair: 'short'
}, {
  name: 'lilei',
  age: 15,
  hair: 'short'
},
{
  name: 'lilei1',
  age: 15,
  hair: 'short'
},
{
  name: 'lilei2',
  age: 15,
  hair: 'short'
}, {
  name: 'hanmei',
  age: 17,
  hair: 'long'
}]

let res = []
while (nameList.length !== 0) {
  let list = nameList.shift()
  let arr = [list]
  for (let i = 0; i < nameList.length; i++) {
    if (nameList[i].age === list.age) {
      arr = arr.concat(nameList.splice(i, 1))
      i--
    }
  }
  res.push(arr)
}
console.log(res)
```
### 输出结果为

```js
function a() {
  var num = 0;
  for (var i = 0; i < 10; i++) {
    num = num++;
  }
  console.log(num);
};
a(); // 0
```
### 将下列数组中相同name数据的num值相加

```JS
const list = [
  {name: 'aa', num: '1'},
  {name: 'bb', num: '2'},
  {name: 'cc', num: '3'},
  {name: 'aa', num: '4'},
  {name: 'bb', num: '5'},
]

/*res:
[{name: "aa", num: "5"}
{name: "bb", num: "7"}
{name: "cc", num: "3"}]
*/

function merge (list) {
  let res = []
  list.forEach(item => {
    let curData = res.find(data => data.name === item.name)
    if (curData) {
      curData.num = Number(item.num) + Number(curData.num) + '' 
    } else {
      res.push(item)
    }
  })
  return res
}
```
### 传递两个参数m，n，返回长度为m，所有元素都为n的数组，要求不能用循环

#### 实现：使用递归和 concat 方法

```js
function fn (m, n) {s
  return m ? fn(m - 1, n).concat(n) : [] 
}
console.log(fn(3, 2)) // [2, 2, 2]
```
### 以下代码输出

```js
var length = 10;
function fn(){
  console.log(this.length);
}

var obj = {
  length:5,
  method:function(){
    fn() // 10, 由window对象调用
    arguments[0]() // 2, 由arguments对象调用
  }
}

obj.method(fn,1)
```
### 传入一个值length，输出从0 ~ length构成的数组

```js
function getArr (len) {
  return Array.from({length: len}, (item, index) => index)
}
console.log(getArr(4)) // [0, 1, 2, 3]
```

### 给定有序并且数值递增的数组，求三数相加等于100

```js
function getArr () { // 返回从 0~99的数组
  return Array.from({length: 100}, (item, index) => index)
}
let arr = getArr ()
// console.log('arr', arr)

function threeSum (arr) {
  let res = []
  for (let i = 0; i < arr.length - 2; i++) {
    let val1 = arr[i]
    let left = i + 1
    let right = arr.length - 1
    while (left < right) { // 定义左指针和右指针
      let val2 = arr[left]
      let val3 = arr[right]
      if (val1 + val2 + val3 === 100) {
        res.push([val1, val2, val3])
      }
      if (val1 + val2 + val3 >= 100) {
        right--
      }
      if (val1 + val2 + val3 <= 100) {
        left++
      }
    }
  }
  return res
}
console.log(threeSum(arr))
```

### 给定一个数组，求其中三数相加等于10，并且这三个数只会在结果中出现一次

```js
let arr = [0, 1, 1, 1, 2, 2, 3, 4, 9, 8, 8 ,7, 10]
arr.sort()
console.log(arr)
function threeSum (arr) {
  let res = []
  for (let i = 0; i < arr.length - 2; i++) {
    let val1 = arr[i]
    if (val1 === arr[i - 1]) continue // arr[i]值必须唯一，否则会出现重复的值
    let left = i + 1
    let right = arr.length - 1
    while (left < right) { // 定义左指针和右指针
      let val2 = arr[left]
      let val3 = arr[right]
      if (val1 + val2 + val3 === 10) {
        res.push([val1, val2, val3])
      }
      if (val1 + val2 + val3 <= 10) {
        while(arr[left] === val2) {
          left++
        }
      }
      if (val1 + val2 + val3 >= 10) {
        while(arr[right] === val3) {
          right--
        }
      }
    }
  }
  return res
}
console.log(threeSum(arr))
```

###  JS实现斐波那契数列

数列：1，1，2，3，5，8，13，21…
给定f(1) = 1， f(2) = 1，之后每项值等于前两项之和，求f(n)？

```js
// 方法一：递归
function f(n) {
  if (n === 1 || n === 2) {
    return 1
  } else {
    return f(n - 1) + f(n - 2)
  }
}

// 方法二：非递归
function fn (n) {
  let n1 = 1, n2 = 1, res
  if (n == 1 || n == 2) return 1
  for (let i = 0; i < n - 2; i++) {
    res =  n1 + n2
    n1 = n2
    n2 = res
  }
  return res
}
```

### 给定一个数，求其阶乘

```js
// 方法一：递归
function f(n) {
  if (n === 1) {
    return 1
  } else {
    return n * f(n - 1)
  }
}

// 方法二：
function f(n) {
  var res = 1
  for (var i = n; i >= 1; i--) {
    res = res * i
  }
  return res
}

console.log(f(5)) // 120
```

### 求一个数组中最大值和最小值之差

```js
var arr = [10, 5, 11, 7, 8, 9]
var max = Math.max(...arr) // 或使用Math.max.apply(null, arr)
var min = Math.min(...arr)
console.log(max - min) // 6
```
附：apply方法中传入null或undefined时执行的JS对象是window对象。

### 找出给定字符串中出现次数最多的字符

```js
var str = "abcdabbcdcc"

// 方法一：
function getMax(str) {
  var maxStr = ''
  var maxCount = 0
  for (var i = 0; i < str.length; i++) {
    var s = str.charAt(i)
    var count = 0
    for (var j = 0; j < str.length; j++) {
      if (s === str.charAt(j)) {
        count += 1
      }
    }
    if (count > maxCount) {
      maxCount = count
      maxStr = s
    }
  }
  return maxStr
}

// 方法二：
function getMax(str) {
  if (str.length <= 1) {
    return str
  }
  var obj = {}
  for (var i = 0; i < str.length; i++) {
    if (!obj[str.charAt(i)]) { // 为每个字符初始化
      obj[str.charAt(i)] = 1
    } else { // 对已存在的字符值加一
      obj[str.charAt(i)] += 1
    }
  }
  var maxCount = obj[str.charAt(0)]
  var maxStr = str.charAt(0)
  for (var key in obj) {
    if (obj[key] > maxCount) {
      maxCount = obj[key]
      maxStr = key
    }
  }
  return maxStr
}

console.log(getMax(str)) // "c"
```

### 数组排序

```js
// 快速排序
var arr = [10, 33, 44, 4, 12, 15, 0];
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr
  }
  var index = Math.floor((arr.length - 1) / 2)
  var val = arr.splice(index,1) // 删除中间值
  var left = []
  var right = []
  for (var i = 0; i <= arr.length - 1; i++) {
    if (arr[i] < val) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat(val, quickSort(right))
}
console.log(quickSort(arr)) // [0, 4, 10, 12, 15, 33, 44]
  
// 冒泡排序
var arr = [10, 33, 44, 4, 12, 15, 0];
function sort(arr) { // 每相邻的两个元素比较，大的沉底
  for (var i = 0; i < arr.length - 1; i++) { // 控制比较的次数
    for (var j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
  return arr
}
console.log(sort(arr)) // [0, 4, 10, 12, 15, 33, 44]
  
// 选择排序
var arr = [10, 33, 44, 4, 12, 15, 0];
function sort(arr) { // 每一个元素和后面的所有元素比较，小的元素上浮
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j =  i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        var temp = arr[j]
        arr[j] = arr[i]
        arr[i] = temp
      }
    }
  }
  return arr
}
console.log(sort(arr)) // [0, 4, 10, 12, 15, 33, 44]
```