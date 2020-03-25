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

```js
/* 数据库名称：qinchao  表名称：userinfo */
show databases;	// 显示所有的数据库
use  数据库名称; 	// 使用指定的数据库
show tables; 		// 查看所有的表
desc 表名; 		// 查看表结构（<=> show columns from 表名）
select version(); // 服务器版本信息
select database(); // 查看当前使用的数据库
select user();  // 查看当前使用的用户
show status; // 服务器状态
show variables; // 服务器配置变量
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

create temporary table a(name varchar(32), age int); // 创建临时表
// 临时表无法使用 show tables 查看
show create table userinfo // 查看创建userinfo表的语句
```

### 使用数据库

```js
> mysql -u root -p
> 输入密码
> use 数据库名称
> 执行sql语句

-- 连接远程数据库
> mysql -h host -P 3306 -u 用户名 -p密码

-- 例
> mysql -h 10.10.10.10 -P 3306 -u qinchao -p123456
```

### 添加字段

```js
ALTER TABLE `partner_corp_contact` ADD COLUMN `job_name` VARCHAR(32) AFTER `name`;
```

### 删除字段

```js
ALTER TABLE `member` drop column `member_job_name`
```

### 更新

```js
update tablename set age='newage' where age='';
```

### 表中插入新的数据

```js
insert into userinfo values ('11', '22'); // 给表中插入数据
insert into userinfo(name, age) values ('11', '22'); // 给表中插入数据
insert into userinfo values ('11', '22', '33'); // ERROR 1136 (21S01): Column count doesn't match value count at row 1
```
|name|age|
|:---|:---:|
|11|22|

```js
insert into userinfo(age, name) values ('11', '22'); // 给表中插入数据
```
|name|age|
|:---|:---:|
|22|11|

### 回滚

```js
> start transaction; // 标识一个事务
> delete from userinfo;
> select * from userinfo; // Query OK, 0 rows affected (0.01 sec)
> rollback; // 回滚
```
<p class="fr_th">ROLLBACK 只能在一个事务处理内使用（在执行一条 START TRANSACTION 命令之后）</p>

### limit 和 offset 的用法

```js
select * from table limit 10; // 读取10条数据

select * from table limit 2,1; // 从第二条数据后取一条数据，即取第3条数据

select * from table limit 2 offset 1; // 从第一条数据后取2条数据，limit后面跟的是2条数据，offset后面是从第1条开始读取，即读取第2,3条
```

### alter操作

1. 修改字段的数据类型

```js
alter table userinfo modify column id varchar(32);
```
2. 修改字段名称

```js
alter table userinfo change id userinfo_id int;
```

3. 删除某个字段

```js
alter table userinfo drop name; // 只剩余一个字段则无法使用DROP来删除字段
```
4. 新增某个字段

```js
alter table userinfo add age int; // 需要指定字段的数据类型

alter table userinfo add age int after name; // 添加的字段位于name字段后
alter table userinfo add age int first; // 添加的字段位于第一列
```
5. 修改字段默认值

```js
alter table userinfo alter age set default 0; // 设置默认值为0
// 或
alter table userinfo modify age int default 0;

alter table userinfo alter age drop default; // 删除字段默认值
```
6. 修改字段不允许为null

```js
alter table userinfo modify age int not null; // 需要加上数据类型才能设置成功（如果已有的数据中的age存在null值则修改失败）

alter table userinfo modify age int null; // 允许设置为null
```
7. 修改表名

```js
alter table userinfo rename to user;
```
8. 修改字段的位置

```js
alter table userinfo modify age int first; // 需要指明数据类型才可

alter table userinfo modify age int after name;
```
9. 删除外键约束

```js
alter table tableName drop foreign key keyName;
```

### 注释

mysql支持三种注释

```js
# comment     （单行注释）

/* comment */ （多行注释）

-- comment    （此处--后至少有一个空格，单行注释）
```

### mysql 命令行格式化

使用 \G 符号，不需要 ;

```js
select * from student where student_id = 111\G
```

### 表操作

1. 创建

```js
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

```js
delete from userinfo where id = 'aa';

truncate table userinfo;

drop table userinfo;
```
3. 插入

（1）添加数据的时候可以规定列进行添加，如果所有的列都要添加数据可以不规定列进行添加数据。

（2）主键自增列的数据可以设置为null，其值会自动自增。

（3）插入多条数据语法：

 insert info 表名(字段名1, 字段名2, ...) values(value1, value2, ...), (value1, value2, ...);

```js
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

```js
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

```js
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

```js
mysql> select * from task where name like '/%ab/%%' escape '/';
// 等价于
mysql> select * from task where name like '\%ab\%%';
```

### UNION 操作符

作用：连接两个以上的 SELECT 语句的结果组合到一个结果集合中。多个 SELECT 语句会删除重复的数据。

```js
// 语法格式
SELECT expression1, expression2, ... expression_n
FROM tables
[WHERE conditions]
UNION [ALL | DISTINCT]
SELECT expression1, expression2, ... expression_n
FROM tables
[WHERE conditions];
```

1. DISTINCT: 可选，删除结果集中重复的数据。默认情况下 UNION 操作符已经删除了重复数据，所以 DISTINCT 修饰符对结果没啥影响。

2. ALL: 可选，返回所有结果集，包含重复数据。

集合操作时，两边的输入必须拥有相同的列数，如果数据类型不同的话，mysql会自动进行隐式转化 ；同时，结果列的名称由第一个查询的列的名称决定。

```js
mysql> select * from a;
+------+------+
| name | age  |
+------+------+
| aa   |   11 |
| bb   |   12 |
| aa   |   13 |
+------+------+

mysql> select * from b;
+------+-------+
| name | b_age |
+------+-------+
| aa   |    10 |
| bb   |    11 |
| cc   |    12 |
+------+-------+

mysql> select name, age from a union select name, b_age from b;
+------+------+
| name | age  |
+------+------+
| aa   |   11 |
| bb   |   12 |
| aa   |   13 |
| aa   |   10 |
| bb   |   11 |
| cc   |   12 |
+------+------+

mysql> select name from a union select name from b;
+------+
| name |
+------+
| aa   |
| bb   |
| cc   |
+------+

mysql> select name from a union all select name from b;
+------+
| name |
+------+
| aa   |
| bb   |
| aa   |
| aa   |
| bb   |
| cc   |
+------+
```

### 排序

语法：
```js
SELECT field1, field2,...fieldN FROM table_name1, table_name2...
ORDER BY field1 [ASC [DESC][默认 ASC]], [field2...] [ASC [DESC][默认 ASC]]
```
默认情况下，按升序排列。

#### 拼音排序

```js
// 1. 如果字符集采用的是 gbk(汉字编码字符集)，直接在查询语句后边添加 ORDER BY：
SELECT * FROM runoob_tbl ORDER BY runoob_title;

// 2. 如果字符集采用的是 utf8(万国码)，需要先对字段进行转码然后排序：
SELECT * FROM runoob_tbl ORDER BY CONVERT(runoob_title using gbk);
```

### 分组

```js
mysql> SELECT * FROM employee_tbl;
+----+--------+---------------------+--------+
| id | name   | date                | singin |
+----+--------+---------------------+--------+
|  1 | 小明 | 2016-04-22 15:25:33 |      1 |
|  2 | 小王 | 2016-04-20 15:25:47 |      3 |
|  3 | 小丽 | 2016-04-19 15:26:02 |      2 |
|  4 | 小王 | 2016-04-07 15:26:14 |      4 |
|  5 | 小明 | 2016-04-11 15:26:40 |      4 |
|  6 | 小明 | 2016-04-04 15:26:54 |      2 |
+----+--------+---------------------+--------+

mysql> SELECT name, COUNT(*) FROM   employee_tbl GROUP BY name;
+--------+----------+
| name   | COUNT(*) |
+--------+----------+
| 小丽 |        1 |
| 小明 |        3 |
| 小王 |        2 |
+--------+----------+
```

#### WITH ROLLUP 可以实现在分组统计数据基础上再进行相同的统计（SUM,AVG,COUNT…）

```js
// 将以上的数据表按名字进行分组，再统计每个人登录的次数
mysql> SELECT name, SUM(singin) as singin_count FROM  employee_tbl GROUP BY name WITH ROLLUP;
+--------+--------------+
| name   | singin_count |
+--------+--------------+
| 小丽 |            2 |
| 小明 |            7 |
| 小王 |            7 |
| NULL   |           16 |
+--------+--------------+
// 其中记录 NULL 表示所有人的登录次数
```
#### 使用 coalesce 来设置一个可以取代 NUll 的名称

coalesce 语法：

```js
select coalesce(a,b,c);
参数说明：如果a==null,则选择b；如果b==null,则选择c；如果a!=null,则选择a；如果a b c 都为null ，则返回为null（没意义）。
```
```js
mysql> SELECT coalesce(name, '总数'), SUM(singin) as singin_count FROM  employee_tbl GROUP BY name WITH ROLLUP;
+--------------------------+--------------+
| coalesce(name, '总数') | singin_count |
+--------------------------+--------------+
| 小丽                   |            2 |
| 小明                   |            7 |
| 小王                   |            7 |
| 总数                   |           16 |
+--------------------------+--------------+

mysql> SELECT coalesce(name, '总数') as name, SUM(singin) as singin_count FROM  employee_tbl GROUP BY name WITH ROLLUP;
+--------------------------+--------------+
| name                  | singin_count |
+--------------------------+--------------+
| 小丽                   |            2 |
| 小明                   |            7 |
| 小王                   |            7 |
| 总数                   |           16 |
+--------------------------+--------------+
```

### 连接

1. inner join 等价于 join：获取两个表中字段匹配关系的记录。
2. left join：获取左表所有记录，即使右表没有对应匹配的记录（记录数与左表相同）。
3. right join：获取右表所有记录，即使左表没有对应匹配的记录（记录数与右表相同）。

```js
mysql> select * from a;
+------+------+
| name | age  |
+------+------+
| aa   |   11 |
| bb   |   12 |
| aa   |   13 |
+------+------+

mysql> select * from b;
+------+-------+
| name | b_age |
+------+-------+
| aa   |    10 |
| bb   |    11 |
| cc   |    12 |
| aa   |    11 |
+------+-------+

mysql> select a.name, a.age, b.name, b.b_age from a join b on a.name = b.name;
+------+------+------+-------+
| name | age  | name | b_age |
+------+------+------+-------+
| aa   |   11 | aa   |    10 |
| aa   |   13 | aa   |    10 |
| bb   |   12 | bb   |    11 |
| aa   |   11 | aa   |    11 |
| aa   |   13 | aa   |    11 |
+------+------+------+-------+
// 等价于
mysql> select a.name, a.age, b.name, b.b_age from a, b where a.name = b.name;
+------+------+------+-------+
| name | age  | name | b_age |
+------+------+------+-------+
| aa   |   11 | aa   |    10 |
| aa   |   13 | aa   |    10 |
| bb   |   12 | bb   |    11 |
| aa   |   11 | aa   |    11 |
| aa   |   13 | aa   |    11 |
+------+------+------+-------+
```

### NULL 值处理

1. IS NULL: 当列的值是 NULL,此运算符返回 true。
2. IS NOT NULL: 当列的值不为 NULL, 运算符返回 true。
3. <=>: 比较操作符（不同于=运算符），当比较的的两个值为 NULL 时返回 true。

不能使用 = NULL 或 != NULL 在列中查找 NULL 值 。在 MySQL 中，NULL 值与任何其它值的比较（即使是 NULL）永远返回 false，即 NULL = NULL 返回false 。

```js
mysql> select * from a;
+------+------+
| name | age  |
+------+------+
| aa   |   11 |
| bb   |   12 |
| aa   |   13 |
| cc   | NULL |
+------+------+

mysql> select *, age + 1 from a;
+------+------+---------+
| name | age  | age + 1 |
+------+------+---------+
| aa   |   11 |      12 |
| bb   |   12 |      13 |
| aa   |   13 |      14 |
| cc   | NULL |    NULL |
+------+------+---------+

// 当 age 列中的值为 null 时会被替换成 1 进行运算
mysql> select *, ifnull(age, 1) + 1 from a; 
+------+------+--------------------+
| name | age  | ifnull(age, 1) + 1 |
+------+------+--------------------+
| aa   |   11 |                 12 |
| bb   |   12 |                 13 |
| aa   |   13 |                 14 |
| cc   | NULL |                  2 |
+------+------+--------------------+

mysql> select * from a where age = null;
Empty set (0.00 sec)

mysql> select * from a where age is null;
+------+------+
| name | age  |
+------+------+
| cc   | NULL |
+------+------+

mysql> select * from a where age is not null;
+------+------+
| name | age  |
+------+------+
| aa   |   11 |
| bb   |   12 |
| aa   |   13 |
+------+------+

mysql> select * from a where age <=> null;
+------+------+
| name | age  |
+------+------+
| cc   | NULL |
+------+------+
```

### 复制表

1. 方法一

```js
// 拷贝userinfo中的name，id至新的表userinfo1中
create table userinfo1 (name varchar(32), id int); // 创建新表
insert into userinfo1 (name, id) select name, id from userinfo; // 拷贝数据
```

2. 方法二

```js
create table userinfo1 like userinfo; // 创建一个表userinfo1结构和userinfo表结构一致
insert into userinfo1 select * from userinfo; // 拷贝所有的数据
```

3. 方法三

```js
create table userinfo1 select * from userinfo; // 拷贝表结构和数据

// 只拷贝表结构
create table userinfo1 select * from userinfo where 1 = 2; // 条件不满足不拷贝数据

// 拷贝部分数据
create table userinfo1 select name, id from userinfo;
```

### SUM IF 的用法

```sql
SELECT 
  member_id, SUM(IF(duration > 200, duration, 0))
FROM
  outbound_record
GROUP BY member_id;
```
含义：如果 SUM(duration) > 200, 则将值计为 SUM(duration), 否则计为 0。