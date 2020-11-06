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

ps -efv # 查看进程及cpu使用量

tee -a test.txt # 向test.txt中追加内容，无该文件则创建

cp -r a b # 拷贝a目录下的所有文件至b文件
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

## shell

### sh 和 bash 的区别

sh 遵循POSIX规范：“当某行代码出错时，不继续往下解释”。bash 就算出错，也会继续向下执行。

::: tip
使用变量在变量名前添加一个 $ 符即可

只读变量：readonly value 删除变量：unset value

单引号里的任何字符都会原样输出，单引号字符串中的变量是无效的

双引号里可以有变量

双引号里可以出现转义字符
:::

### 字符串

#### 获取字符串长度

```bash
string="abcd"
echo ${#string} # 4
```

#### 提取子字符串

```bash
# 从字符串第 2 个字符开始截取 4 个字符
string="runoob is a great site"
echo ${string:1:4} # unoo
```

### 运算符

```bash
# 判断两个值是否相等
echo $[ 1 == 1 ] # 1
echo $[ 1 == 2 ] # 0

# 运算
echo `expr 100 + 100` # 200
echo $[100 + 100]  # 200
echo `expr 100 \* 100` # 10000
echo $[100 * 100] # 10000
echo $(expr 100 \* 100) # 10000 使用 $() 替代 ``

# 输出当前日期
echo `date`  # 2020年10月10日 星期六 15时03分00秒 CST
echo $(date) # 2020年10月10日 星期六 15时03分00秒 CST
```

### 文件

```
> 重定向输出到某个位置，替换原有文件的所有内容。

>> 重定向追加到某个位置，在原有文件的末尾添加内容。

< 重定向输入某个位置文件。

2> 重定向错误输出。

2>> 重定向错误追加输出到文件末尾。

&> 混合输出错误的和正确的都输出。
```

```bash
% cat test.sh
echo 'this is normal'
this is an error

% sh test.sh
this is normal
test.sh: line 2: this: command not found

% sh test.sh > log.txt
test.sh: line 2: this: command not found

% cat log.txt
this is normal

% sh test.sh 2> error.txt
this is normal

% cat error.txt
test.sh: line 2: this: command not found

# 追加错误
% sh test.sh 2>> error.txt 
this is normal

% cat error.txt 
test.sh: line 2: this: command not found
test.sh: line 2: this: command not found
```

### 循环

```bash
# 方式一
for((i=1;i<=5;i++))
do
  echo $i
done

# 方式二
for j in {1..5}
do
  echo $j
done
```