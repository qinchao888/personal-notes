---
title: 响应式Web设计：HTML5和CSS3实战.pdf
lang: zh-CN
sidebarDepth: 2
---

## media

### max-device-width和max-width的区别

1. max-device-width：设备显示区域（如：设备屏幕宽度）
2. max-width：目标显示区域（如：浏览器宽度）
3. max-width在窗口大小改变或横竖屏转换时会发生变化
4. max-device-width只与设备相关，横竖屏转换或改变尺寸，缩放都不会发生变化（部分android的宽高会互换而IOS不会）

## form

### form 表单

1. 表单提交不存在跨域问题，原因：原页面的脚本无法获取新页面中的内容，所以浏览器认为这是安全的。form表单只是将请求发送出去，无法获取响应的。
2. 默认提交完成后会跳转至提交的接口。
3. method的默认值：get。
4. method设置为 get，则参数以 URL?name=value&name=value 传递，设置为 post，参数以 body 的方式传递，node 中获取参数使用 req.body。

### autocomplete

默认值：on

提交表单后，再次输入内容会自动填充内容。即表现为：会出现一个下拉框内容选择(内容可能为多个)。

```html
<form action="#" autocomplete="on">
  <input type="text" placeholder="输入内容" name="name"/>
  <input type="submit" value="提交"/>
</form>
```
注：
1. 必须为 input 指定 name 属性，否则 autocomplete 无法触发。提示的内容即为属性值相同的输入框中之前输入的内容。
2. 输入的内容必须提交触发action后才可以被浏览器记录，下次输入时才会有相应内容的提示。

### type="number" 和 type="tel"的不同表现

在输入小数时，type="number"在输入小数点时不会显示小数点，而type="tel"可以。

```html
<body>
  <div class="list">
    <input type="number" id="input1" oninput="change1()"/>
    <input type="tel" id="input2" oninput="change2()"/>
  </div>
</body>
<script>
var input1 = document.getElementById('input1')
var input2 = document.getElementById('input2')
function change1 () {
  console.log(input1.value) // 1 12 12 12.1 12.12
}
function change2 () {
  console.log(input2.value) // 1 12 12. 12.1 12.12
}
</script>
```