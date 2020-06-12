---
title: Css
lang: zh-CN
sidebarDepth: 2
---

## 常用属性

### var 变量

兼容性：不兼容 IE

[参考](https://www.zhangxinxu.com/wordpress/2016/11/css-css3-variables-var/)

<p class="fr_t">var(自定义属性名，[默认值])</p>

缺少自定义属性名，则使用默认值。

```css
body {
  --color: red;
}
p {
  color: var(--color);
}
```
### 改变浏览器默认选中文本的样式

<p class="fr_t">::selection只可以应用于少数的CSS属性：color, background, cursor,和outline。</p>

```css
/*应用于全部元素*/
::selection {
  color: #ff0000;
}
::-moz-selection {
  color: #ff0000;
}

/*应用于指定元素*/
.text::selection {
  color: red;
}
```

### currentColor

currentColor代表了当前元素被应用上的color颜色值。 使用它可以将当前这个颜色值应用到其他属性上，或者嵌套元素的其他属性上。

```html
<link rel="stylesheet" type="text/css" href="http://at.alicdn.com/t/font_969627_jl2dmljvfbn.css"/>
<style>
a {
  text-decoration: none;
}
a:link {
  color: salmon;
}
a:visited { /* currentColor 与 visited 不匹配的 */
  color: salmon;
}
a:hover {
  color: pink;
}
a:active {
  color: seagreen;
}
.qc-panda {
  font-size: 60px;
  vertical-align: middle;
  color: currentColor;
}
</style>
<div class="text">
  <a href="#"><i class="iconfont qc-panda"></i>返回</a>
</div>
```

### 禁用鼠标

```html
<!-- 禁用点击事件 -->
<style>
.btn {
  background: skyblue;
  width: 100px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  pointer-events: none;
  user-select: none;
  opacity: .6;
}
</style>
<div class="text">
  <div class="btn" onclick="handleClick()">点击</div>
</div>
<script>
function handleClick () {
  console.log('click')
}
</script>
```