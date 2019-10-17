---
title: mysql
lang: zh-CN
sidebarDepth: 2
---

## 基础语法

### 语法汇总

```
show databases;	// 显示所有的数据库
use  数据库名称; 	// 使用指定的数据库
show tables; 		// 查看所有的表
desc 表名; 		// 查看表结构
select database(); // 查看当前使用的数据库
select user();  // 查看当前使用的用户
set password for root@localhost=password('123'); // 给当前用户重新设置密码
exit; // 退出mysql

create database qinchao; // 创建一个数据库
drop database qinchao; // 删除数据库

create table userinfo(name varchar(32), age int); // 在当前数据库下创建一个新表
create table qinchao.userinfo(name varchar(32), age int); // 给指定的数据库创建一个新表
drop table userinfo; // 删除指定的表
insert into userinfo(age, name) values ('11', '22'); // 给表中插入数据
delete from userinfo; // 删除表中的所有数据
```

### 使用数据库

```
> mysql -u root -p
> 输入密码
> use 数据库名称
> 执行sql语句
```

### 添加字段

```
ALTER TABLE `partner_corp_contact` ADD COLUMN `job_name` VARCHAR(32) AFTER `name`;
```

### 删除字段

```
ALTER TABLE `member` drop column `member_job_name`
```

### 表中插入新的数据

```
insert into userinfo values ('11', '22'); // 给表中插入数据
insert into userinfo(name, age) values ('11', '22'); // 给表中插入数据
insert into userinfo values ('11', '22', '33'); // ERROR 1136 (21S01): Column count doesn't match value count at row 1
```
|name|age|
|:---|:---:|
|11|22|

```
insert into userinfo(age, name) values ('11', '22'); // 给表中插入数据
```
|name|age|
|:---|:---:|
|22|11|

### 回滚

```
> start transaction; // 标识一个事务
> delete from userinfo;
> select * from userinfo; // Query OK, 0 rows affected (0.01 sec)
> rollback; // 回滚
```
<p class="fr_th">ROLLBACK 只能在一个事务处理内使用（在执行一条 START TRANSACTION 命令之后）</p>