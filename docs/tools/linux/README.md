---
title: linux
lang: zh-CN
sidebarDepth: 2
---

## 命令用法

```shell
ls -alh # -a:显示全部文件(包括隐藏的文件) -l:显示的数据包括文件的属性和权限 -h:文件大小可视化

pwd # print working directory的缩写

mkdir -p d1/d2/d3 # -p:可自行创建多层目录

mkdir -m 711 temp # -m:指定权限

rmdir temp # 删除空文件夹

rmdir -p d1/d2/d3 # 使用-p一次性删除d1/d2/d3

cp -i b.txt ./tmp # 将b.txt文件复制到tmp文件夹下，-i表示如果文件已存在询问是否覆盖

rm -fir tmp # -i:删除前询问 -f:忽略不存在的文件 -r:递归删除

mv -i b.txt tmp # 将文件b.txt复制到tmp文件夹下 -i:移动前询问 -f:如果目标文件已存在，强制覆盖

mv tmp tmp1 # 目录更名

cat b.txt | grep 'ERROR\|INFO' # 使用\转义管道符
```

## 文件查看

```
cat  由第一行开始显示文件内容
tac  从最后一行开始显示，可以看出 tac 是 cat 的倒着写！
nl   显示的时候，顺道输出行号！
more 一页一页的显示文件内容
less 与 more 类似，但是比 more 更好的是，他可以往前翻页！
head 只看头几行
tail 只看尾巴几行
```
使用 man [命令]来查看各个命令的使用文档，如 ：man cp