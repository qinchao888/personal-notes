---
title: mysql
lang: zh-CN
sidebarDepth: 2
---

## 基础语法

:::tip
执行顺序：select –>where –> group by–> having–>order by
:::

### 语法汇总

```
/* 数据库名称：qinchao  表名称：userinfo */
show databases;	// 显示所有的数据库
use  数据库名称; 	// 使用指定的数据库
show tables; 		// 查看所有的表
desc 表名; 		// 查看表结构（<=> show columns from 表名）
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

show create table userinfo; // 查看表的注释
show full columns from userinfo; // 查看所有字段的注释
select count(*) from information_schema.columns where table_schema = 'qinchao' and table_name = 'userinfo'; // 统计当前表中的所有字段数量
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

### limit 和 offset 的用法

 ```
select * from table limit 10; // 读取10条数据

select * from table limit 2,1; // 从第二条数据后取一条数据，即取第3条数据

select * from table limit 2 offset 1; // 从第一条数据后取2条数据，limit后面跟的是2条数据，offset后面是从第1条开始读取，即读取第2,3条
 ```

 ### 修改现有字段

 1. 修改现有字段的数据类型

 ```
 alter table userinfo modify column id varchar(32);
 ```

 ### 注释

 mysql支持三种注释

```
# comment     （单行注释）

/* comment */ （多行注释）

-- comment    （此处--后至少有一个空格，单行注释）
```

### mysql 命令行格式化

使用 \G 符号，不需要 ;

```
select * from student where student_id = 111\G
```

### 表操作

1. 创建
```
mysql> create table userinfo(name varchar(32), id int auto_increment, primary key (id, name));
Query OK, 0 rows affected (0.02 sec)

mysql> desc userinfo;
+-------+-------------+------+-----+---------+----------------+
| Field | Type        | Null | Key | Default | Extra          |
+-------+-------------+------+-----+---------+----------------+
| name  | varchar(32) | NO   | PRI | NULL    |                |
| id    | int(11)     | NO   | PRI | NULL    | auto_increment |
+-------+-------------+------+-----+---------+----------------+
```
2. 删除

（1）当你不再需要该表时， 用 drop;

（2）当你仍要保留该表，但要删除所有记录时， 用 truncate;

（3）当你要删除部分记录时， 用 delete。

执行的速度：drop > truncate > delete。

```
delete from userinfo where id = 'aa';

truncate table userinfo;

drop table userinfo;
```
3. 插入

（1）添加数据的时候可以规定列进行添加，如果所有的列都要添加数据可以不规定列进行添加数据。

（2）主键自增列的数据可以设置为null，其值会自动自增。

（3）插入多条数据语法：

 insert info 表名(字段名1, 字段名2, ...) values(value1, value2, ...), (value1, value2, ...);

```
mysql> desc task;
+---------+-------------+------+-----+---------+----------------+
| Field   | Type        | Null | Key | Default | Extra          |
+---------+-------------+------+-----+---------+----------------+
| task_id | varchar(32) | YES  |     | NULL    |                |
| name    | varchar(32) | YES  |     | NULL    |                |
| id      | int(11)     | NO   | PRI | NULL    | auto_increment |
| time    | datetime    | YES  |     | NULL    |                |
+---------+-------------+------+-----+---------+----------------+

insert into task(task_id, time) values(11, now()); // 添加一条数据
+---------+------+----+---------------------+
| task_id | name | id | time                |
+---------+------+----+---------------------+
| 11      | NULL |  1 | 2019-10-23 17:53:05 |
+---------+------+----+---------------------+

insert into task values(11, 'aa', null, now()), (22, 'bb', null, now()); // 添加多条数据
+---------+------+----+---------------------+
| task_id | name | id | time                |
+---------+------+----+---------------------+
| 11      | NULL |  1 | 2019-10-23 17:53:05 |
| 11      | aa   |  2 | 2019-10-23 17:53:18 |
| 22      | bb   |  3 | 2019-10-23 17:53:18 |
+---------+------+----+---------------------+

insert into task values(11, 'aa', 5, now()); // 将id赋值为5后后续的数据将会从5递增
insert into task values(11, 'aa', null, now());
+---------+------+----+---------------------+
| task_id | name | id | time                |
+---------+------+----+---------------------+
| 11      | NULL |  1 | 2019-10-23 17:53:05 |
| 11      | aa   |  2 | 2019-10-23 17:53:18 |
| 22      | bb   |  3 | 2019-10-23 17:53:18 |
| 11      | aa   |  5 | 2019-10-23 17:54:46 |
| 11      | aa   |  6 | 2019-10-23 17:54:55 |
+---------+------+----+---------------------+
```
4. 更新

语法： update 表名 set 字段一 = value1, 字段二 = value2, ... where ...

```
update task set name = 'cc', task_id = 5 where id = 5;

update task set name = default where id = 5; // 将指定的name设置为null
// 等价于
update task set name = null where id = 6;

update task set task_id = task_id + 1; // 将所有的task_id加1

update task set name = replace(name, 'aa', 'cc'); // 将name字段中值为aa的全部替换为cc
// 等价于
update task set name = 'cc' where name = 'aa';
```

### 通配符

1. like

常用通配符：% 、_ 、escape

```
% : 匹配0个或任意多个字符

_ : 匹配任意一个字符

escape ： 转义字符，可匹配%和_。如SELECT * FROM table_name WHERE column_name LIKE '/%/_%_' ESCAPE'/'
```

2. rlike 和 REGEXP

常用通配符：. 、* 、 [] 、 ^ 、 $ 、{n}

```
. : 匹配任意单个字符

* ： 匹配0个或多个前一个得到的字符

[] : 匹配任意一个[]内的字符，[ab]*可匹配空串、a、b、或者由任意个a和b组成的字符串。

^ : 匹配开头，如^s匹配以s或者S开头的字符串。

$ : 匹配结尾，如s$匹配以s结尾的字符串。

{n} : 匹配前一个字符反复n次。
```

like是完全匹配。rlike和regexp是不完全匹配。只要不同时匹配^和 $， 其他的包含即可。如 ^ba可以匹配baaa和baab，a也可以匹配baaa和baab，但是^bab$不能匹配baab。

```
mysql> select * from task;
+---------+---------+----+---------------------+
| task_id | name    | id | time                |
+---------+---------+----+---------------------+
| 12      | abcdefg |  1 | 2019-10-23 17:53:05 |
| 12      | defg    |  2 | 2019-10-23 17:53:18 |
| 23      | abcd    |  3 | 2019-10-23 17:53:18 |
| 6       | bbcd    |  5 | 2019-10-23 17:54:46 |
| 12      | NULL    |  6 | 2019-10-23 17:54:55 |
| 12      | dd      | 11 | 2019-10-23 17:56:25 |
+---------+---------+----+---------------------+

mysql> select * from task where name rlike '^a.cd$';
+---------+------+----+---------------------+
| task_id | name | id | time                |
+---------+------+----+---------------------+
| 23      | abcd |  3 | 2019-10-23 17:53:18 |
+---------+------+----+---------------------+

mysql> select * from task where name rlike '^b{2}cd$';
+---------+------+----+---------------------+
| task_id | name | id | time                |
+---------+------+----+---------------------+
| 6       | bbcd |  5 | 2019-10-23 17:54:46 |
+---------+------+----+---------------------+

mysql> select * from task where name rlike '^bbb*cd$';
+---------+------+----+---------------------+
| task_id | name | id | time                |
+---------+------+----+---------------------+
| 6       | bbcd |  5 | 2019-10-23 17:54:46 |
+---------+------+----+---------------------+
1 row in set (0.00 sec)

mysql> select * from task where name rlike '^bb*cd$';
+---------+------+----+---------------------+
| task_id | name | id | time                |
+---------+------+----+---------------------+
| 6       | bbcd |  5 | 2019-10-23 17:54:46 |
+---------+------+----+---------------------+
1 row in set (0.00 sec)

mysql> select * from task where name rlike '^b*cd$';
+---------+------+----+---------------------+
| task_id | name | id | time                |
+---------+------+----+---------------------+
| 6       | bbcd |  5 | 2019-10-23 17:54:46 |
+---------+------+----+---------------------+
1 row in set (0.00 sec)

mysql> select * from task where name rlike '^bb*bcd$';
+---------+------+----+---------------------+
| task_id | name | id | time                |
+---------+------+----+---------------------+
| 6       | bbcd |  5 | 2019-10-23 17:54:46 |
+---------+------+----+---------------------+

mysql> select * from task where name rlike '^[ab]*cd$';
+---------+------+----+---------------------+
| task_id | name | id | time                |
+---------+------+----+---------------------+
| 23      | abcd |  3 | 2019-10-23 17:53:18 |
| 6       | bbcd |  5 | 2019-10-23 17:54:46 |
+---------+------+----+---------------------+
```

### 转义字符

```
mysql> select * from task where name like '/%ab/%%' escape '/';
// 等价于
mysql> select * from task where name like '\%ab\%%';
```