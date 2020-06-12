---
title: css
lang: zh-CN
sidebarDepth: 2
---

[参考](https://juejin.im/post/5ee0cf335188254ec9505381)

## a 链接设置顺序及原理

设置顺序 a:link a:visited a:hover a:active

或      a:visited a:link a:hover a:active

其中 hover 和 active 的顺序必须设置 link 和 visited 之后，active 必须设置在 hover 之后。

原因：

1. 当鼠标移入时会同时触发 link 和 hover 或同时触发 visited 和 hover。如果没有点击过链接，则同时触发 link 和 hover，因此要求 hover 设置在 link 之后，如果点击过链接，则同时触发 visited 和 hover，因此要求 hover 设置 在visited 之后。综上：hover 必须设置在 link 和 visited 之后。
2. 当点击链接时同时触发 hover 和 active，因此 active 样式必须设置在 hover 之后才可以生效。
3. link 和 visited 样式的顺序设置则没有要求，因为默认显示的是 link，访问后 显示的是 visited，并不会同时触发 link 和 visited。

```html
<style>
a:link {
  color: seagreen;
}
a:visited {
  color: firebrick;
}
a:hover {
  color: skyblue;
}
a:active {
  color: black;
}
</style>
<body>
  <a href="#">this is a test</a>
</body>
```

重置浏览器对a链接访问后显示的样式：在历史记录删除该条访问记录即可。