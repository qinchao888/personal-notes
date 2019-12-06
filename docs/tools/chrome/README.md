---
title: chrome
lang: zh-CN
sidebarDepth: 2
---

## 常见用法

[参考1](https://segmentfault.com/a/1190000021158037)
[参考2](https://segmentfault.com/a/1190000016841971)

### 查看hover后出现的元素样式

先打开调试 -> hover当前元素 -> 右键弹出弹框，不点击鼠标 -> 鼠标移动至调试面板（elements）-> 按下N键会自动定位到当前hover的元素

### console.table

```js
var arr = [{name: 'aa', age: 10}]
console.table(arr) // 浏览器的console中将以table的形式显示arr
```

### document.body.contentEditable

在浏览器的console中设置 document.body.contentEditable = true，整个浏览器中的内容将可以被编辑。

或设置 document.designMode='on';（控制整个文档是否可编辑。有效值为 "on" 和 "off" 。根据规范，该属性默认为 "off" 。）

### 选择DOM元素

Chrome控制台输入：

1. $(selector)：返回匹配指定CSS选择器的DOM元素的第一个引用，相当于document.querySelector()函数。
2. $$(selector)：返回匹配指定CSS选择器的DOM元素数组，相当于document.querySelectorAll()函数。
3. $x(path)：返回一个与给定XPath表达式匹配的DOM元素数组。

```
例：$x('//p[a]')表示返回包含<a>元素的所有<p>元素。
```

### 获取console中前一个输出的值

使用 _$获取。

```js
1 + 2 + 3 + 4 // -> 10

$_ // -> 10

$_ * $_ // -> 100

Math.sqrt($_) // -> 10

$_ // -> 10
```

### 获取DOM元素上注册的监听器

使用 getEventListeners($('selector'))

### 监听DOM元素上注册的监听器

使用  monitorEvents($('selector'))

1. monitorEvents($('selector')): 监听所有事件。
2. monitorEvents($('selector'), 'eventName'): 监听特定的事件。
3. monitorEvents($('selector'), [eventName1, eventName2, ...]): 监听多个事件。
4. unmonitorEvents($('selector')): 停止监视选择器匹配的元素关联的所有事件。

### 检查DOM元素

使用inspect()方法让我们可以直接从控制台中检查一个DOM元素。

inspect($('selector'))：将检查与选择器匹配的元素，并且会自动跳转到Chrome Developer Tools的Elements选项卡中。即跳转到指定位置的元素中。

### 标记DOM元素

在 Elements 中点击想要选择的DOM元素，控制上输入 $0 即可获取刚才点击的DOM元素。

1. Chrome 检测器会保留其历史记录中的最后 5 个元素，即只有最后点击的 5个元素能够被获取到。
2. 第一个点击的使用 $4 获取，最后一次点击的使用 $0 获取。
3. 只有 $0、$1、$2、$3、$4 是有效的。

### 获取函数的堆栈跟踪信息

使用 console.trace() 追踪。

```js
function f1() {
  f2()
}
function f2() {
  f3()
}
function f3() {
  console.trace();
  console.log('哈哈哈')
}
f1()

/**
console.trace
f3 @ (index):84
f2 @ (index):81
f1 @ (index):78
(anonymous) @ (index):87
*/

```

### console.log的格式化打印

1. %s：字符串占位符
2. %d：整数占位符
3. %f：浮点数占位符
4. %o：对象占位符(注意是字母o，不是数字0)
5. %c：CSS样式占位符

```js
console.log('%c%s%s%s', 'color: yellow;', '–', 1234, '–');
console.log('%c%s%s%s', 'color: skyblue;background-color:pink', '–', 1234, '–');
```

### 监听函数的调用和函数参数

在 Chrome 控制台中，可以使用 monitor() 监听指定函数，每次调用该函数时，都会对传入的参数值进行记录。

```js
function f(a, b){console.log(a + b)}
monitor(f)
f(1, 2)
// function f called with arguments: 1, 2
// 3
```