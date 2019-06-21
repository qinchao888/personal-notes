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