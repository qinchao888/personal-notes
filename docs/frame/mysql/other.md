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

## 常见问题

### ONLY_FULL_GROUP_BY

使用 GROUP BY 查询时发生错误：... this is incompatible with sql_mode=only_full_group_by

```sql
SELECT 
  MAX(id), student_id, opportunity_search
FROM
  opportunity_match_record
GROUP BY student_id;

-- 此时会报 only_full_group_by 的错误，不建议直接修改 sql_mode，可以使用 any_value 函数

SELECT 
  MAX(id), any_value(student_id), any_value(opportunity_search)
FROM
  opportunity_match_record
GROUP BY student_id;
```

## 配置

### brew 安装的 mysql 设置自启动

```shell
> cd ~/Library/LaunchAgents
> ls
# 查看是否存在 homebrew.mxcl.mysql@5.7.plist 文件
# 若没有则 copy一份过来
> cd /usr/local/Cellar/mysql@5.7/5.7.27_1
> ls
# 查看文件homebrew.mxcl.mysql@5.7.plist，copy这个文件
> cp /usr/local/Cellar/mysql@5.7/5.7.27_1/homebrew.mxcl.mysql@5.7.plist ~/Library/LaunchAgents/homebrew.mxcl.mysql@5.7.plist  
# 设置自启动
> launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.mysql@5.7.plist
# 关闭自启动
> launchctl unload -w ~/Library/LaunchAgents/homebrew.mxcl.mysql@5.7.plist
```

### mysql 启动

```shell
mysql.server start
mysql.server stop
mysql.server restart
mysql.server status # 查看当前服务状态
```

### mysql 权限管理

```shell
SHOW GRANTS; # 查看权限
GRANT ALL PRIVILEGES ON *.* TO root@localhost WITH GRANT OPTION; # 赋予特级权限
# WITH GRANT OPTION 表示其他用户也可修改该权限
REVOKE ALL PRIVILEGES ON *.* from root@localhost; # 收回特级权限
flush privileges; # 更新权限
```

### mysql logbin 日志管理

```shell
show variables like '%log_bin%'; # 查看log_bin 的配置，是否开启(默认OFF)

# 开启log_bin
> nano /usr/local/etc/my.cnf 
# 添加如下代码
server-id=1 # 日志id
log-bin=/Users/chao.qin/Desktop/mysql-bin # 日志存储路径

show binary logs; # 查看所有的 bin_log
show master logs; # 查看当前正在使用的 bin_log
show master status;
show binlog events in 'mysql-bin.000001'; # 查看内容

# bin_log 二进制文件内容输出成 sql
mysqlbinlog --base64-output=DECODE-ROWS -vv Desktop/mysql-bin.000001 > /USERS/chao.qin/Desktop/1.sql
```

注：bin_log：记录DDL、DCL、DML(除select)类的sql语句，不能记录 select 操作。如果需要记录所有操作需要开启 general_log。