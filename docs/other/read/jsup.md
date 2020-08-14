---
title: 你不知道的JS上卷
lang: zh-CN
sidebarDepth: 2
---

:::tip

:::

## LHS 和 RHS

LHS(left hand side)查询：当变量出现在赋值操作的左侧时进行 LHS 查询。

RHS(right hand side)查询：非左侧

### 区分 LHS 和 RHS

如果查找的目的是对变量进行赋值，那么就会使用 LHS 查询;如果目的是获取变量的值，就会使用 RHS 查询。

TypeError: 试图对一个非函数类型的值进行函数调用，或着引用 null 或 undefined 类型的值中的 属性，那么引擎会抛出另外一种类型的异常，叫作 TypeError。

1. 不成功的 RHS 引用会导致抛出 ReferenceError 异常。
2. 不成功的 LHS 引用会导致自动隐式 地创建一个全局变量(非严格模式下)，该变量使用 LHS 引用的目标作为标识符，或者抛 出 ReferenceError 异常(严格模式下)。

