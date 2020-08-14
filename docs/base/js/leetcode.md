---
title: leet-code
lang: zh-CN
sidebarDepth: 2
---

## 算法汇总

1. 滑动窗口
2. 双指针
3. 递归
4. 动态规划

## 练习

### 算法：滑动窗口

[原题](https://leetcode-cn.com/problems/substring-with-concatenation-of-all-words/)

给定一个字符串 s 和一些长度相同的单词 words。找出 s 中恰好可以由 words 中所有单词串联形成的子串的起始位置。

注意子串要与 words 中的单词完全匹配，中间不能有其他字符，但不需要考虑 words 中单词串联的顺序。

```js
/**
输入：
  s = "barfoothefoobarman",
  words = ["foo","bar"]
输出：[0,9]
解释：
从索引 0 和 9 开始的子串分别是 "barfoo" 和 "foobar" 。
输出的顺序不重要, [9,0] 也是有效答案。
*/

/**
 * 1. 计算总的单词长度， 按照该长度去截取字符串
 * 2. 将该字符串按照word长度分割成数组，排序，再将原words数组排序
 * 3. 将两个数组join成字符串比较是否相等
*/
var findSubstring = function(s, words) {
  if (s.length === 0 || words.length === 0) return []
  var wordLen =  words[0].length
  var len = wordLen * words.length
  var res = []
  for (var i = 0; i < s.length; i++) {
    var str = s.substr(i, len)
    var reg = new RegExp(`(?:([^]{${wordLen}}))`)
    var same = str.split(reg).filter(val => !!val).sort().join('') === words.sort().join('')
    if (same) {
      res.push(i)
    }
  }
  return res
};
```

### 算法：动态规划

给定 m * n个方格，求从左上角到右下角的所有路径之和。

```js
/**
解题思路：
状态方程：ways[m][n] = ways[m -1][n] + ways[m][n-1]
1. ways[m][n]的走法有ways[m-1][n]个走法加上ways[m][n-1]个走法
2. 边界控制：在[1]][0]~[m][0] 和 [0][1]~[0][n]的位置上只有一种走法，即往右走或往下走。
3. ways[0][0] = 0
4. 结果即为： ways[m-1][n-1]
*/
function countPaths(m, n) {
  // 二维数组初始化
  var ways = new Array(m)
  for (var i = 0; i < m; i++) {
    ways[i] = new Array(n)
  }
  console.log(ways)
  for (var s = 1; s < m; s++) {
    ways[s][0] = 1
  }
  for (var t = 1; t < n; t++) {
    ways[0][t] = 1
  }
  ways[0][0] = 0
  console.log(ways)
  for (var j = 1; j < m; j++) {
    for (var k = 1; k < n; k++) {
      ways[j][k] = ways[j - 1][k] + ways[j][k - 1]
    }
  }
  return ways[m - 1][n - 1]
}
console.log(countPaths(3,2));//3
console.log(countPaths(7,3));//28
```

最小路径和： m * n 方格，从左上角至右下角的最小路径和。

```js
/*
状态方程：sum[m][n] = Math.min(sum[m-1][n], sum[m][n-1]) + grid[m][n]
*/
function minPathSum(grid) {
  // 初始化二维数组
  var m = grid.length
  var n = grid[0].length
  var sum = new Array(m)
  for (var s = 0; s < m; s++) {
    sum[s] = new Array(n)
  }
  sum[0][0] = grid[0][0]
  // 初始化边界值
  for (var i = 1; i < m; i++) {
    sum[i][0] = sum[i - 1][0] + grid[i][0]
  }
  for (var j = 1; j < n; j++) {
    sum[0][j] = sum[0][j - 1] + grid[0][j]
  }
  for (var k = 1; k < m; k++) {
    for (var t = 1; t < n; t++) {
      sum[k][t] = Math.min(sum[k - 1][t], sum[k][t - 1]) + grid[k][t]
    }
  }
  return sum[m - 1][n - 1]
}
```