---
title: vscode
lang: zh-CN
sidebarDepth: 2
---

## 汇总

### 快捷键

作用|名称
----|----
多行注释|shift + alt + a

### 配置

禁用 vscode 中的 auto import 功能（表现：书写代码时会提示自动引入对应的包）

```json
// settings.json
{
  "typescript.suggest.autoImports": false,
  "javascript.suggest.autoImports": false
}
```