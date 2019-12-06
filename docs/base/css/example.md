---
title: Css
lang: zh-CN
sidebarDepth: 2
---

## 常见动画实现

### 点击按钮，区块放大缩小动画

使用 transition 实现

```css
/* 核心代码 */
.box {
  position: fixed;
  top: 60px;
  left: 120px;
  height: 200px;
  width: 200px;
  border-radius: 10px;
  background-color: #fff;
  text-align: center;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, .5);
  
  transform: scale(0); /* 初始状态 */
  transform-origin: left top; /* 缩放位置 */
  transition: all ease 1s;
}
```

```html
<button class="btn" @click="changeBox">点我啊</button>
<div class="box" ref="box">
  <p>我是内容</p>
  <p>我是内容</p>
  <p>我是内容</p>
</div>
```

```js
changeBox () {
  const value = this.$refs.box.style['transform'];
  if (value === 'scale(1)') {
    this.$refs.box.style['transform'] = 'scale(0)';
  } else {
    this.$refs.box.style['transform'] = 'scale(1)';
  }
}
```