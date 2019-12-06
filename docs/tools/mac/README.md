---
title: Mac
lang: zh-CN
sidebarDepth: 2
---

## 基础用法

### 命令行操作

| 命令   |      描述     |
|----------|:-------------:|
| history | 查看操作历史 |
| ps | 查看当前终端运行的程序 | 
| ps ax | 列出这台电脑上正在运行的所有程序 |
| kill [PID] | 结束指定进程ID的进程 |
| sudo kill -9 [PID] | 强制结束进程 |
| ls\|more | 将ls的结果一行一行显示 |
| ifconfig | 查看ip地址和mac地址 |

![image](../../images/mac/dir.png)
![image](../../images/mac/file.png)
![image](../../images/mac/other.png)


### 快捷键

| 快捷键   |      描述     |
|----------|:-------------:|
| command + k |  清屏 |
| shift + command + z |   撤销恢复  |
| control + space + 输入terminal | 启动终端 |
| command + n | 打开新窗口 |
| fn+上键 | page up	|
| fn+下键 | page down |
| command + tab| 切换任务栏	 |
| ctrl + D | 退出命令行 |
| control + s | 保存 |
| control + x | 退出 |
| command + r | 刷新浏览器 |
| option + command + i | 打开调试工具 |
| CTRL+A | 移动光标至行首 |
| CTRL+E | 移动光标至行尾 |
| ESC+B | 光标向左移动一个单词 |
| ESC+F | 光标向右移动一个单词 |
| CTRL+U | 删除光标前所有字符 |
| CTRL+K | 删除光标后所有字符 |
| CTRL+W | 删除光标前一个单词（根据空格识别单词分隔） |
| CTRL+Y | 粘贴之前（CTRL+U/K/W）删除的内容 |
| CTRL+C | 中断操作 |

### 文件

#### .DS_Store文件

.DS_Store(英文全称 Desktop Services Store)是一种由苹果公司的Mac OS X操作系统所创造的隐藏文件，目的在于存贮目录的自定义属性，例如文件们的图标位置或者是背景色的选择。

只要打开 finder 就会生成.DS_Store文件。

```js
// 添加.gitignore过滤掉该文件

# 此为注释 – 将被 Git 忽略
.DS_Store
```

#### 重启访达

killall Finder 