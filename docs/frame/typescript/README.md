---
title: typescript
lang: zh-CN
sidebarDepth: 2
---

## 数据类型

### 数组

```ts
// 普通定义
let arr: number[] = [1, 2, 3];
// 数组泛型
let arr: Array<number> = [1, 2, 3];
// 元组：用于定义已知数量和数据类型的数组
let arr: [number, string] = [1, 'a'];
// 定义数据类型不同的数组
let arr: any[] = [1, 'a', true];
```

### void、null、和 undefined

#### void:
1. 用于定义函数没有返回值。
2. void 类型的变量只能赋值为 undefined 和 null。

#### null、undefined
null和undefined的值只能赋值个void类型和它们各自。

```ts
function a(): void {
  console.log('void');
}

let a: void = undefined;
let b: void = null;

let u: undefined = undefined;
let n: null = null;
```

### 类型断言

```ts
// 语法一：
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// 语法二：
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```