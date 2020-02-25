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

### 弹球动画

```html
<style>
.box {
  width: 100px;
  height: 100px;
  background-color: #000;
  border-radius: 50%;
  animation: jump 1s cubic-bezier(0, 0, 0.84, 0.11) infinite alternate;
}
@keyframes jump {
  0% {
    transform: translateY(0);
  }
  90% {
    transform: translateY(200px);
    clip-path: ellipse(50% 50% at 50% 50%);
  }
  100% {
    transform: translateY(210px);
    clip-path: ellipse(50% 45% at 50% 48%);
  }
}
</style>
<body>
  <div class="box"></div>
</body>
```

### 落雨动画

```html
<style>
@keyframes drops {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate3d(10px, 100vh, -10px);
  }
}
.content {
  height: 100%;
  position: relative;
  overflow: hidden;
}
.rain {
  position: absolute;
  opacity: 0;
  width: 8px;
  height: 12px;
  clip-path: ellipse(10% 30% at 50% 50%);
  background: #ccc;
  /* transform: scale(10); */
  animation: drops .8s cubic-bezier(0.86,-0.02, 0.25, 0.43) infinite;
}
</style>

<div id="content" class="content"></div>

<script>
var content = document.getElementById('content')
var distance = 0
for (var i = 0; i < 30; i++) {
  var el = document.createElement('div')
  el.className = 'rain'
  var val = Math.random() * 5 + 2
  var delay = Math.random() * 20 + 2
  distance += val
  el.style.left = `${distance}%`
  el.style.top = `${val}%`
  el.style.animationDelay = `${delay / 10}s`
  content.appendChild(el)
}
</script>
```