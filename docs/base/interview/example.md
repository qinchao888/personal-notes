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
