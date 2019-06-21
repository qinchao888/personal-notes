---
title: 读后感
lang: zh-CN
sidebarDepth: 2
---

## 你不知道的浏览器页面渲染机制

[链接](https://segmentfault.com/a/1190000018811208)

浏览器内核包括两个部分：JS引擎和渲染引擎。

页面加载过程：

1. 浏览器根据DNS服务器得到域名的IP地址。
2. 向这个IP地址的机器发球HTTP请求。
3. 服务器收到，处理并返回HTTP请求。
4. 浏览器得到返回的内容。

### 回流和重绘

<p class="fg_th">减少回流和重绘对性能的影响？</p>

<p class="fb_th">1. 动画效果应用到position属性为absolute或fixed的元素上。</p>

动画效果应用到position属性为absolute或fixed的元素上，它们不影响其他元素的布局，只会导致重新绘制，而不是一个完整回流。消耗会更低。

<p class="fb_th">2. css3硬件加速（GPU加速）。</p>

使用css3硬件加速，设置 transform、opacity、filter、will-change 这些属性不会引起回流重绘。

<p class="fb_th">3. 合并多次对DOM和样式的修改。</p>

```js
var el = document.getElementById('test');
el.style.padding = '5px';
el.style.borderLeft = '1px';
el.style.borderRight = '2px';
```
每个样式的修改都会引起回流，大部分现代浏览器都对其做了优化，因此，只会触发一次重排。但是如果在旧版的浏览器或者在上面代码执行的时候，有其他代码访问了布局信息(上文中的会触发回流的布局信息)，那么就会导致三次重排。

```js
// 解决方案
var el = document.getElementById('test'); 
el.style.cssText += 'border-left: 1px; border-right: 2px; padding: 5px;';
```
### css3硬件加速带来的问题

1. 不能让每个元素都启用硬件加速，这样会暂用很大的内存，使页面会有很强的卡顿感。
2. GPU渲染会影响字体的抗锯齿效果。这是因为GPU和CPU具有不同的渲染机制，即使最终硬件加速停止了，文本还是会在动画期间显示得很模糊。

css3硬件加速：通过GPU进行渲染，解放cpu。

设置了transform会创建一个图层，使用GPU去执行transform操作，该图层又称为复合图层。

<p class="fg_th">创建层的条件：</p>

::: tip 条件

1. 3D 或透视变换(perspective transform) CSS 属性
使用加速视频解码的 元素

2. 拥有 3D (WebGL) 上下文或加速的 2D 上下文的 元素
混合插件(如 Flash)

3. 对自己的 opacity 做 CSS 动画或使用一个动画 webkit 变换的元素

4. 拥有加速 CSS 过滤器的元素(filter)

5. 元素有一个包含复合层的后代节点(换句话说，就是一个元素拥有一个子元素，该子元素在自己的层里)

6. 元素有一个 z-index 较低的并且是一个复合层的兄弟元素

:::

存在一个元素，其兄弟元素在复合层中并且其z-index较小，那么复合层后使用相对或绝对定位的元素<span class="fb_th">可能</span>会被放在复合层中。导致页面卡顿。

解决方案：给当前处于复合层的元素设置<span class="fb_th"> position:relative; z-index:1; </span>即可。

<p class="fb_th">查看：More tools -> Rendering -> Layer borders，黄色的边框表示一个复合层。</p>

[参考](https://div.io/topic/1348)

### 浏览器渲染过程

1. 解析HTML生成DOM树，解析CSS生成CSSOM树。

2. 将DOM树和CSSOM树结合，生成渲染树(Render Tree)。

3. Layout(回流):根据生成的渲染树，进行回流(Layout)，得到节点的几何信息（位置，大小）。

4. Painting(重绘):根据渲染树以及回流得到的几何信息，得到节点的绝对像素。

5. Display:将像素发送给GPU，展示在页面上。（涉及GPU将多个合成层合并为同一个层，并展示在页面中。而css3硬件加速的原理则是新建合成层）。

#### 构建渲染树过程

1. 从DOM树的根节点开始遍历每个可见节点。

2. 对于每个可见的节点，找到CSSOM树中对应的规则，并应用它们。

3. 根据每个可见节点以及其对应的样式，组合生成渲染树。

#### 不可见的节点包括：

1. 一些不会渲染输出的节点，比如script、meta、link等。

2. 一些通过css进行隐藏的节点。比如display:none。注意，利用visibility和opacity隐藏的节点，还是会显示在渲染树上的。只有display:none的节点才不会显示在渲染树上。

### DOM操作影响性能

1. JS 操作依赖 JS 引擎，DOM 属于渲染引擎，JS操作DOM，本质上是 JS 引擎和渲染引擎之间进行了“跨界交流”。

2. DOM操作可能会引起页面的回流和重绘，导致性能问题。

### DOMContentLoaded

1. 在页面加载和解析完成后触发。

2. 触发时机在 onload 事件之前。

3. 在页面JS（非动态插入的JS脚本）执行完成后触发，不包括图片加载完成。

4. 如果其所属 script 标签前引入 css，则必须等样式表加载解析完成才会触发。如果在 script 之后引入样式则不会。