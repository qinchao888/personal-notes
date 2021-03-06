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

// 或
var a = {
  num: 0,
  valueOf: function () {
    this.num += 1
    return this.num
  }
}
```

### 获取当前日期第二天凌晨 00:00:00 的时间戳

```js
new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(0, 0, 0, 0))
// 或
new Date(new Date(Date.now() + 1000 * 24 * 3600).setHours(0, 0, 0, 0))
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

// 方法一
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

// 方法二
function mergeCategoryByAge (arr) {
  return Object.values(arr.reduce((t, v) => (t[v.age] = t[v.age] ? t[v.age].concat(v) : [v]) && t, {}))
}
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

// 方法一
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

// 方法二
function merge (list) {
  return list.reduce((total, val) => {
    const sameItem = total.find(item => item.name === val.name)
    if (sameItem) {
      sameItem.num = +val.num + +sameItem.num
    } else {
      total.push(val)
    }
    return total
  }, [])
}
```
### 传递两个参数m，n，返回长度为m，所有元素都为n的数组，要求不能用循环

#### 实现：使用递归和 concat 方法

```js
function fn (m, n) {
  return m ? fn(m - 1, n).concat(n) : [] 
}
console.log(fn(3, 2)) // [2, 2, 2]

// 或
function fn (m, n) {
  return new Array(m + n).fill(n)
}
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

function fn (n) {
  var p1 = 1, p2 = 1
  if (n === 1 || n === 2) return 1
  for (var i = 3; i < n; i++) {
    var t = p1 + p2
    p1 = p2
    p2 = t
  }
  return p1 + p2
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
var arr = [10, 33, 44, 4, 12, 15, 0];

/** 冒泡排序（时间复杂度O(n²)）
* 1. 第一层循环控制比较多少轮，第二层循环用于比较相邻的两个元素
* 2. 每一轮比较使得大的元素在最后面。
*/
function bubble (arr) {
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
  return arr
}

/** 选择排序（时间复杂度O(n²)）
* 1. 将每一个元素和后面的所有元素比较，将当前元素和后面所有元素中的最小元素互换
* 2. 每一轮比较能使得小的元素在最前面
*/
function selectSort (arr) {
  var minIndex, temp
  for (var i = 0; i < arr.length - 1; i++) {
    minIndex = i
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j
      }
    }
    temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = temp
  }
  return arr
}

/** 快速排序（时间复杂度o(nlogn)）
* 1. 取中间值，删除当前中间值元素，将比其小的置于left数组中，比其大的置于right数组中
* 2. 再对left和right数组进行同样的操作，直至获取的left和right中的元素个数小于等于1
* 3. 将所有的数组结果进行concat
*/
function quickSort (arr) {
  if (arr.length <= 1) return arr
  var mid = Math.floor((arr.length - 1) / 2)
  var left = [], right = []
  var val = arr.splice(mid, 1)
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < val) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat(val, quickSort(right))
}

/** 插入排序（时间复杂度o(n²)）
 * 1. 原理：类似于打牌，将当前元素和前面的元素一个一个的相比，比其大的元素往后移动一位。
 * 2. 直至 preIndex小于0 或没有比其大的元素为止。
*/
function insertSort (arr) {
  var preIndex, current
  for (var i = 1; i < arr.length; i++) {
    preIndex = i - 1
    current = arr[i]
    while(preIndex >=0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex]
      preIndex--
    }
    arr[preIndex + 1] = current
  }
  return arr
}
```

### 判断一个字符串是否是回文字符串

```js
// 方法一：
function isPalindrome (str) {
  return str === str.split('').reverse().join('')
}

// 方法二：
function isPalindrome (str) {
  var left = 0, right = str.length - 1
  while(left < right) {
    if (str[left] !== str[right]) {
      return false
    }
    left++
    right--
  }
  return true
}

// 方法三：
function isPalindrome (str) {
  for (var i = 0, j = str.length - 1; i < j; i++, j--) {
    if (str[i] !== str[j]) {
      return false
    }
  }
  return true
}
```

### 获取一段字符串中的最长回文字符串

方法一：

思路：
1. 提供一个函数用于判断一个字符串是否是回文字符串。
2. 使用for循环，从第一个位置开始不断向后取字符直至最后，每取一次便判断其是否为回文字符串，然后从第二个位置开始不断向后取字符，依次类推。

```js
var str = "abddbahfjikgafghjjhgfalve"
function isPalindrome(str) {
  return str === str.split('').reverse().join('')
}
function longestPalindrome(str) {
  var res = ''
  for (var i = 0; i < str.length; i++) {
    var temp = ''
    for (var j = i; j < str.length - 1; j++) {
      temp += str.charAt(j)
      if (isPalindrome(temp) && temp.length > res.length) {
        res = temp
      }
    }
  }
  return res
}
console.log(longestPalindrome(str)) // afghjjhgfa
```

方法二：

思路:
1. 只使用一层for循环遍历，先获取单个字符，设置指针i，j指向该字符，判断该字符左侧（i - 1）和右侧（j + 1）是否相等，如果相等，继续递减i，递增j判断。
2. 需要处理形如 ‘aab’ 这样的字符串，应该返回 ‘aa’ ，而不是 ‘a’

```js
var longestPalindrome = function(s) {
  var res = ''
  function checkPalindrome(l, r) {
    while(l >= 0 && r < s.length) {
      if (s[l] === s[r]) {
        l -= 1
        r += 1  
      } else {
        break
      }
    }
    l = l + 1
    r = r - 1
    if (res.length < r - l + 1) {
      res = s.substring(l, r + 1)
    }
  }
  for (var i = 0; i < s.length; i++) {
    if (i > 0 && s[i] === s[i - 1]) { // 处理形如 'aab' 这样的字符
      checkPalindrome(i, i - 1)
    }
    checkPalindrome(i, i) // 需要再次调用，否则 'aaa' 此类字符串输出 'aa'
  }
  return res
}
```

### 将以下数据结构转化为树形结构

```js
// 数据：
let arr = [
  {
    id: 1,
    name: 'js',
    parent: '前端'
  },
  {
    id: 2,
    name: '前端'
  },
  {
    id: 3,
    name: 'react',
    parent: 'js'
  },
  {
    id: 4,
    name: 'jquery',
    parent: 'js'
  },
  {
    id: 5,
    name: 'css3',
    parent: 'css'
  },
  {
    id: 6,
    name: 'css',
    parent: '前端'
  }
];

// 方法一：递归
function findRoot (arr) {
  var root = arr.find(item => !item.parent)
  findChild(root)
  return root
}
function findChild (parent) {
  var child = arr.filter(item => item.parent === parent.name)
  if (child.length > 0) {
    parent.child = child
    child.forEach(item => findChild(item))
  }
}
console.log(findRoot(arr))

// 方法二：非递归
function findChild (arr) {
  var data = {}, res = {}
  arr.forEach(item => data[item.name] = item)
  arr.forEach(item => {
    if (item.parent) {
      if (!data[item.parent].child) {
        data[item.parent].child = []
      }
      data[item.parent].child.push(item)
    } else {
      res = item
    }
  })
  return res
}
console.log(findChild(arr))
```
### js中使用二分查找

原理：

low 和 hight 标识，取其中间值，比较寻找的值与该中间值的大小，若中间值>寻找的值，则表明寻找的值在左侧，hight = mid - 1，若相等则返回 mid，中间值<寻找的值，则表明寻找的值在右侧， low = mid + 1

```js
// 非递归实现的js代码
function binary_search(arr, key) {
  var low = 0, high = arr.length - 1
  while(low <= high) {
    var mid = parseInt((high + low) /2)
    if(key == arr[mid]) {
      return mid
    } else if(key > arr[mid]) {
      low = mid + 1
    } else {
      high = mid -1
    }
  }
  return -1
}

var arr = [1,2,3,4,5,6,7,8,9,10,11,23,44,86];
var result = binary_search(arr, 10);
console.log(result);   // 9
var resultNone = binary_search(arr, 100);
console.log(resultNone);  // -1

```
```js
// 递归实现的js代码
function binary_search2(arr, low, high, key) {
	if(low > high) {
		return -1;
	}
	var mid = parseInt((high + low) / 2);
	if(arr[mid] == key) {
		return mid;
	} else if(arr[mid] > key) {
		high = mid -1;
		return binary_search2(arr, low, high, key);
	} else if(arr[mid] < key) {
		low = mid +1;
		return binary_search2(arr, low, high, key);
	}
}

var arr = [1,2,3,4,5,6,7,8,9,10,11,23,44,86];
var result2 = binary_search2(arr, 0, 13, 10);
console.log(result2);   // 9
```

```
因为二分查找每次排除掉一半的不适合值，所以对于n个元素的情况：
一次二分剩下：n/2
两次二分剩下：n/2/2 = n/4
...
m次二分剩下：n/(2^m)
在最坏情况下是在排除到只剩下最后一个值之后得到结果，所以为
n/(2^m)=1;
2^m=n;
所以时间复杂度为：log2(n)
```

### 自定义函数实现数组去重

```js
// 第一种：不操作原数组，返回一个新数组
Array.prototype.distinct = function () {
  return [...new Set(this)]
}
var arr = [1, 2, 1, 3]
console.log(arr.distinct()) // [1, 2, 3]
console.log(arr) // [1, 2, 1, 3]

// 第二种：操作原数组
/**
清空数组
1. this.splice(0, this.length)
2. this.length = 0
*/
Array.prototype.distinct = function () {
  var res = [...new Set(this)]
  this.length = 0
  this.push(...res) // 直接修改原数组this
  return this
}
var arr = [1, 2, 1, 3]
console.log(arr.distinct()) // [1, 2, 3]
console.log(arr) // [1, 2, 3]
```

### 以下代码执行结果

```js
var p = [];
var A = new Function();
A.prototype = p;
var a = new A;
console.log(a) // Array {}
a.push(1);
console.log(a) // [1]
console.log(a.length); // 1
console.log(p.length); // 0
```
分析：new操作符过程：

```js
1. var obj = {}
2. obj.__proto__ = A.prototype
3. A.apply(obj)
```

### 多维数组降维

```js
var arr= [2,3,3,4,[2,3,4,[13,3,[3,4,6],4]]]

// 方法一：
var res = (arr + '').split(',').map(item => +item)

// 方法二：递归
var res = []
function fn (arr) {
  arr.forEach(item => {
    if (item instanceof Array) {
      fn(item)
    } else {
      res.push(item)
    }
  })
}
fn(arr)

// 方法三：
arr.flat(Infinity)
```

### 变量提升和函数提升

```js
// 例1:
console.log(typeof a) // function 
function a () {}
var a = 10
console.log(typeof a) // number

// 例2:
// Uncaught SyntaxError: Identifier 'a' has already been declared
console.log(typeof a)
function a () {}
let a = 10
console.log(typeof a)
```
函数提升优先级要高于变量提升，且不会被变量声明覆盖，但是会被变量赋值覆盖，也会被后面的同名函数替换。

<p class="fr_th">原文（参考《JavaScript高级程序设计》第7.3章节）：JavaScript从来不会告诉你是否多次声明了同一个变量；遇到这种情况，它只会对后续的声明视而不见（不过，它会执行后续声明中的变量初始化）。</p>

### 将以下数据转化为树状结构

```js
const list = [
  { id: '1', pId: '', name: '1' },
  { id: '1.1', pId: '1', name: '1.1' },
  { id: '1.1.1', pId: '1.1', name: '1.1.1' },
  { id: '2', pId: '', name: '2' },
  { id: '2.1', pId: '2', name: '2.1' },
  { id: '2.1.1', pId: '2.1', name: '2.1.1' },
  { id: '2.1.2', pId: '2.1', name: '2.1.2' }
]
function findChild (list) { // 方法一
  var data = {}, res = []
  arr.forEach(item => data[item.name] = item)
  arr.forEach(item => {
    if (item.pId) {
      if (!data[item.pId].children) {
        data[item.pId].children = []
      }
      data[item.pId].children.push(item)
    } else {
      res.push(item)
    }
  })
  return res
}

function findChild (list) { // 方法二
  const res = list.map(item => {
    const children = list.filter(child => item.id === child.pId)
    if (children.length) {
      item.children = children
    }
    return item;
  })
  return res.filter(item => !item.pId)
}
console.log(JSON.stringify(findChild(list), null, ' '))
```

### LRU (least recently use最近最少使用)

1. 获取数据 get(key) - 如果密钥 ( key ) 存在于缓存中，则获取密钥的值（总是正数），否则返回 -1 。
写入数据 put(key, value) - 如果密钥不存在，则写入数据。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据，从而为新数据留出空间。
2. O(1) 时间复杂度。

```js
const cache = new LRU( 2 /* 缓存容量 */ );
cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // 返回  1
cache.put(3, 3);    // 该操作会使得密钥 2 作废
cache.get(2);       // 返回 -1 (未找到)
cache.put(4, 4);    // 该操作会使得密钥 1 作废
cache.get(1);       // 返回 -1 (未找到)
cache.get(3);       // 返回  3
cache.get(4);       // 返回  4
```
```js
function LRU (size) {
  this.size = size
  this.cache = new Map()
}
LRU.prototype = {
  get (key) {
    const value = this.cache.get(key)
    if (!value) return -1
    this.cache.delete(key)
    this.cache.set(key, value)
    return value
  },
  put (key, value) {
    if (this.cache.size >= this.size) {
      this.cache.delete(this.cache.keys().next().value)
    }
    this.cache.set(key, value)
  }
}
```
