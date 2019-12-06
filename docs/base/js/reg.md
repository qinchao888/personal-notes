---
title: 正则
lang: zh-CN
sidebarDepth: 2
---
[正则文章](https://juejin.im/post/5965943ff265da6c30653879)

## 基础知识

### 基础介绍

:::tip 量词

{m,} 表示至少出现m次。 // 注：逗号后不能有空格，如：{1, 3}为错误的写法

{m} 等价于{m,m}，表示出现m次。

? 等价于{0,1}，表示出现或者不出现。

\+ 等价于{1,}，表示出现至少一次。

\* 等价于{0,}，表示出现任意次，有可能不出现。

\w 等价于 [0-9a-zA-Z_]

\W 等价于 [^0-9a-zA-Z_]

转义字符：\

[100-999] // 错误的写法，只有 [0-9] 这种写法

$1,$2,...,$99 匹配第1~99个分组里捕获的文本

$& 匹配到的子串文本

$` 匹配到的子串的左边文本 

$' 匹配到的子串的右边文本

$$ 美元符号

:::

### 惰性匹配

<p class="fr_th">在量词后面加个问号实现惰性匹配。</p>

:::tip 所有惰性匹配情形

{m,n}? {m,}? ?? +? *?

:::
```js
var reg = /12+/g
var str = '12222'
console.log(str.match(reg)) // ['12222']

var reg = /12+?/g
var str = '12222'
console.log(str.match(reg)) // ['12']

var reg = /12?/g
var str = '12222'
console.log(str.match(reg)) // ['12']

var reg = /12??/g
var str = '12222'
console.log(str.match(reg)) // ['1']

var reg = /12*/g
var str = '12222'
console.log(str.match(reg)) // ['12222']

var reg = /12*?/g
var str = '12222'
console.log(str.match(reg)) // ['1']
```

<p class="fg_t">多选分支</p>

使用管道符 |

分支结构也是惰性的，即当前面的匹配上了，后面的就不会再匹配。

```js
var reg = /good|goodbye/g
var str = 'goodbye'
console.log(str.match(reg)) // good

var reg = /goodbye|good/g
var str = 'goodbye'
console.log(str.match(reg)) // goodbye

var reg = /good|bye/g
var str = 'goodbye'
console.log(str.match(reg)) // ['good', 'bye']
```

### 匹配位置

<p class="fr_th">匹配位置的6个字符：^ $ \b \B (?=p) (?!p)</p>

<p class="fg_th">位置可以替换成字符！</p>

```js
var reg = /(^|$)/g
var str1 = 'hello'.replace(/(^|$)/, '#') // #hello
var str2 = 'hello'.replace(/(^|$)/g, '#') // #hello#
```
<p class="fg_th">多行匹配模式</p>

```js
var reg = /(^|$)/g
var str = 'hello\nworld'.replace(/(^|$)/gm, '#')
/*
#hello#
#world#
*/
```
<p class="fg_th">正则表达式m修饰符</p>

m 修饰符规定正则表达式可以执行多行匹配。

m 修饰符的作用是修改 ^ 和 $ 在正则表达式中的作用，让它们分别表示行首和行尾。

在默认状态下，一个字符串无论是否换行只有一个开始 ^ 和结尾 $，如果采用多行匹配，那么每一行都有一个 ^ 和结尾 $。

<p class="fg_th">\b 和 \B</p>

\b是单词边界，具体就是\w和\W之间的位置，也包括\w和^之间的位置，也包括\w和$之间的位置。

```js
var reg = /(^|$)/g
var str = '[J-S] Lesson_01.mp4'.replace(/\b/g, '#')
console.log(str) // [#J#-#S#] #Lesson_01#.#mp4#

var str1 = '1a_'
(/^\w*$/).test(str) // true

var str2 = '1a_-'
(/^\w*$/).test(str) // false
```
<p class="fg_th">(?=p)和(?!p)</p>

(?=p)，其中p是一个子模式，即p前面的位置。

(?=p)：正向先行断言。

(?!p)：负向先行断言。

```js
var reg = /(^|$)/g
var str = 'hello'.replace(/(?=l)/g, '#') // he#l#lo

var reg = /(^|$)/g
var str = 'hello'.replace(/(?!l)/g, '#') // #h#ell#o#
```
对于位置的理解，我们可以理解成空字符""。

### 捕获组

```js
var reg = /(\d{4})-(\d{2})-(\d{2})/
var str = '2018-08-18'
console.log(str.match(reg)) // ["2018-08-18", "2018", "08", "18", index: 0, input: "2018-08-18", groups: undefined]

// 注意加 g 修饰符和不加的区别：
var reg = /(\d{4})-(\d{2})-(\d{2})/g
var str = '2018-08-18'
console.log(str.match(reg)) // ["2018-08-18"]

// 使用构造函数的全局属性$1至$9来获取
var reg = /(\d{4})-(\d{2})-(\d{2})/g
var str = '2018-08-18'
reg.test(str) // 执行正则操作
console.log(RegExp.$1) // 2018
console.log(RegExp.$2) // 08
console.log(RegExp.$3) // 18
```

### 命名捕获组

目前暂时只有 Chrome 和 Node 支持。

通过在要命名的每个组的括号的开头放置 ? 来分配这些子匹配项（或捕获组）的名称。

```js
const getNameParts  = /(?<first>\w+)\s(?<last>\w+)/g;
const name = "Weyland Smithers";
const subMatches = getNameParts.exec(name);

const {first, last} = subMatches.groups
first === 'Weyland'
last === 'Smithers'
```

### 反向引用

<p class="fr_t">括号嵌套</p>

以左括号（开括号）为准

```js
var reg = /^((\d)(\d(\d)))\1\2\3\4$/
var str = '1231231233'
console.log(reg.test(str)) // true
console.log(RegExp.$1) // 123
console.log(RegExp.$2) // 1
console.log(RegExp.$3) // 23
console.log(RegExp.$4) // 3
```

<p class="fr_t">\10的含义</p>

\10 表示第 10 个分组，而不是表示 \1 和 0
```js
var reg = /(1)(2)(3)(4)(5)(6)(7)(8)(9)(#)\10/
var str = '123456789##'
console.log(reg.test(str)) // true
```

### 非捕获分组

(?:p)：使用括号最原始的功能，但不会引用它，即既不在API里引用，也不在正则里反向引用。

```js
var reg = /(ab)+/g
var str = 'ababa abbb ababab'
console.log(str.match(reg)) // ["abab", "ab", "ababab"]

var reg = /(ab)+/
var str = 'ababa abbb ababab'
console.log(str.match(reg)) // ["abab", "ab", index: 0, input: "ababa abbb ababab", groups: undefined]

var reg = /(?:ab)+/
var str = 'ababa abbb ababab'
console.log(str.match(reg)) // ["abab", index: 0, input: "ababa abbb ababab", groups: undefined]
```
### 回溯

因为回溯的存在，需要引擎保存多种可能中未尝试过的状态，以便后续回溯时使用。注定要占用一定的内存。

### 操作符优先级

:::tip 优先级
1. 转义符 \
2. 括号和方括号 (...)、(?:...)、(?=...)、(?!...)、[...]
3. 量词限定符 {m}、{m,n}、{m,}、?、*、+
4. 位置和序列 ^ 、$、 \元字符、 一般字符
5. 管道符（竖杠）|
:::

```js
// 匹配整个字符串 abc 或 def
var str = 'abccc'
console.log(/^abc|def$/.test(str)) // true
console.log(/^(abc|def)$/.test(str)) // false
```
<p class="fr_t">元字符：^ $ . * + ? | \ / ( ) [ ] { } = ! : - ,</p>

<p class="fr_t">需要转义的字符</p>

1. 如 = ! : - ,等符号，只要不在特殊结构中，也不需要转义。
2. ^ $ . * + ? | \ /等字符，只要不在字符组内，都需要转义。

### 效率

1. 括号的作用之一是，可以捕获分组和分支里的数据。那么就需要内存来保存它们。当我们不需要使用分组引用和反向引用时，此时可以使用非捕获分组。

```js
/^[+-]?(\d+\.\d+|\d+|\.\d+)$/
// 修改成
/^[+-]?(?:\d+\.\d+|\d+|\.\d+)$/
```

### 方法实践

<p class="fr_t">split</p>

1. 设置第二个参数表示限制返回的数组的最大长度。
2. 正则使用分组时，返回的结果中包含分组的内容。

```js
var str = 'html,css,js'
console.log(str.split(/,/)) // ['html', 'css', 'js']
console.log(str.split(/,/, 2)) // ['html', 'css']
console.log(str.split(/(,)/)) // ['html', ',', 'css', ',', 'js']
```

## 用法案例

<p class="fg_th">匹配 “a”、“-”、“z” 这三者中任意一个字符的表示方法</p>

```js
[-az] 或 [az-] 或 [a\-z]
```

### 匹配任意字符</p>

```js
[\d\D] 或 [\w\W] 或 [\s\S] 或 [^]
```

### 匹配16进制颜色

规则： 

1. 0-9，a-f， A-F
2. 3位或6位

```js
var reg = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g
```

### 匹配时间

规则：24小时制（如：20:00）

```js
var reg = /^([01][0-9]|[2][0-3]):[0-5][0-9]$/g

// 允许省略前面的0（如：7:9）
var reg = /^(0?[0-9]|1[0-9]|[2][0-3]):(0?[0-9]|[1-5][0-9])$/g
```

### 匹配日期

规则：yyyy-mm-dd 格式（如：2019-04-24）

```js
var reg = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/g
```

### 匹配id

```html
<!--如：-->
<div id="container" class="main"></div>
```
```js
var reg = /id=".*?"/ // 使用惰性匹配，否则会匹配到最后的 "
// 问题：涉及到回溯，效率较低
var reg = /id=".*"/ // id="container" class="main"
```

### 千分位分隔符

```js
function formatAmount (amount) { // 千分位分隔符 1,234,567
  return (amount + '').replace(/(?!^)(?=(\d{3})+$)/g, ',')
  // 或 return (amount + '').replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')
}
console.log(formatAmount(123)) // 123
console.log(formatAmount(123456)) // 123,456
console.log(formatAmount(1234567)) // 1,234,567
```
### 用户名校验

规则：
1. 4-16位
2. 数字、字母、下划线、中划线、中文

```js
function checkUserName (name) { // 用户名校验
  return(/^[\u4E00-\u9FA5\w-]{4,16}$/).test(name)
}
// 中文算1个字符
```

### 密码校验

规则：
1. 6~12位
2. 数字，字母且至少包含两种字符

```js
/*方案一：使用(?=)
1. 包含数字和小写字母
2. 包含数字和大写字母
3. 包含小写字母和大写字母
*/
function checkPassword (password) { // 密码校验
  return (/((?=.*\d)(?=.*[a-zA-Z])|(?=.*[a-z])(?=.*[A-Z]))^[0-9a-zA-Z]{6,12}$/g).test(password +'')
}
console.log(checkPassword(123123)) // false
console.log(checkPassword('123456a')) // true
console.log(checkPassword('123456A')) // true
console.log(checkPassword('aaaAAA')) // true
console.log(checkPassword('aaaaaaa')) // false

/*
(?=.*\d) 和 ^ 表示开头前还有个位置，也是开头（当成空字符串）。
(?=.*\d) 表示该位置后面的字符匹配 .*\d，即有任何多个任意字符，后面再跟个数字。
理解为：接下来的字符必须包含数字。
*/

/*方案二：使用(?!)
1. 不能全为数字
2. 不能全为小写字母
3. 不能全为大写字母
*/
function checkPassword (password) { // 密码校验
  return (/(?!^[0-9]{6,12}$)(?!^[a-z]{6,12}$)(?!^[A-Z])^[0-9a-zA-Z]{6,12}$/g).test(password +'')
}
```

### 将yyyy-mm-dd格式，替换成mm/dd/yyyy

```js
// 方法一：
var reg = /(\d{4})-(\d{2})-(\d{2})/g
var str = '2018-08-18'
var res = str.replace(reg, '$2/$3/$1')
console.log(res) // 08/18/2018

// 方法二：
var res = str.replace(reg, function () {
  return RegExp.$2 + '/' + RegExp.$3 +'/' + RegExp.$1
})

// 方法三：
var res = str.replace(reg, function (match, year, month, day) {
  return month + '/' + day + '/' +  year
})
```
### 自定义实现 trim 方法

```js
var str = ' ab c d'
console.log(str.replace(/^\s*(.*?)\s*$/, '$1')) // 'ab c d'
console.log(str.replace(/^\s*|\s*$/, '')) // 'ab c d'
```
### 首字母转化为大写

```js
var str = 'my name is haha'
console.log(str.replace(/\b\w/g, function (letter) {
  return letter.toUpperCase() // My Name Is Haha
}))

var str = 'this is a test'
console.log(str.replace(/\b(\w)/g, '$1'.toUpperCase())) // this is a test
/* 此处直接调用toUpperCase()为什么没有将首字母转化为大写呢？
原因：此处相当于将$1字符串转化为大写，其还是$1，而不是把$1的结果转化为大写*/
```
### IPV4地址校验

分析：

1. 匹配一位数，补齐0，0的个数可能为 0~3 个
2. 匹配两位数，补齐0，0的个数可能为 0~1 个
3. 匹配三位数，100~199，200~249，250~255
```js
var reg = /^((0{0,2}\d|0?\d{2}|1\d{2}|2[0-4]\d|25[0-5])\.){3}(0{0,2}\d|0?\d{2}|1\d{2}|2[0-4]\d|25[0-5])$/
```

### 其它

匹配如下三种格式：
1. 2016-06-12
2. 2016/06/12
3. 2016.06.12
```js
// 使用反向引用 /1
var reg = /\d{4}(-|\/|\.)\d{2}\1\d{2}/  
var str1 = '2018-08-18'
var str2 = '2018/08/18'
var str3 = '2018.08.18'
var str4 = '2018.08/18' // 如果使用(-|\/|\.)替代\1则此项也为true
console.log(reg.test(str1)) // true
console.log(reg.test(str2)) // true
console.log(reg.test(str3)) // true
console.log(reg.test(str4)) // false
```
### JS中写在[ ]中的小数点(.)不需要转译？

[] 代表一个字符集合，.+ 等放在里面不会产生歧义。除了 []- 应该都不用转义。即 [] 中的 [] 和 - 需要转义，其它字符均不需要转义。

```js
var reg = /^[^.]$/;
reg.test('.') // false
reg.test(1) // true
```