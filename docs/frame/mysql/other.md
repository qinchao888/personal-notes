---
title: mysql
lang: zh-CN
sidebarDepth: 2
---

## 语法

### 取消外键约束

Mysql中如果表和表之间建立的外键约束，则无法删除表及修改表结构。
 
解决方法是在Mysql中取消外键约束:  SET FOREIGN_KEY_CHECKS=0;  
 
然后将原来表的数据导出到sql语句，重新创建此表后，再把数据使用sql导入，
 
然后再设置外键约束: SET FOREIGN_KEY_CHECKS=1;  

```js
SET FOREIGN_KEY_CHECKS = 0;
...
SET FOREIGN_KEY_CHECKS = 1;
```

### show status

查看服务器状态

```js
mysql> show status like 'uptime'; // 当前服务器启动后的运行时间
+---------------+-------+
| Variable_name | Value |
+---------------+-------+
| Uptime        | 18897 |
+---------------+-------+
1 row in set (0.01 sec)

mysql> show status like 'com_select'; // 查询本次服务器启动之后执行select语句的次数
+---------------+-------+
| Variable_name | Value |
+---------------+-------+
| Com_select    | 94    |
+---------------+-------+
1 row in set (0.00 sec)

mysql> show status like 'connections'; // 查看试图连接到MySQL(不管是否连接成功)的连接数
+---------------+-------+
| Variable_name | Value |
+---------------+-------+
| Connections   | 39    |
+---------------+-------+
1 row in set (0.00 sec)
```
[详见](https://dev.mysql.com/doc/refman/5.7/en/server-status-variables.htm)