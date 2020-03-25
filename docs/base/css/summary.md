---
title: Css
lang: zh-CN
sidebarDepth: 2
---

## 样式

### :empty

1. 不显示页面上没有内容的元素。

```css
:empty {
  display: none;
}
```

2. 给没有内容的元素填充默认内容。

```css
:empty::after {
  content: "暂无";
  color: #aaa;
}

/* 或 */

:empty::after {
  content: "-";
  color: #aaa;
}
```

3. 列表没有内容时显示“暂无数据”。

```html
<style>
html, body {
  margin: 0;
  padding: 0;
}
.list:empty::after {
  content: "暂无数据";
  margin-top: 100px;
  display: block;
  color: orangered;
  text-align: center;
}
</style>
<body>
  <div id="app">
    <div class="list">
      <div v-for="(item, index) in list" :key="index">{{index}}</div>
    </div>
  </div>
</body>
<script>
```
