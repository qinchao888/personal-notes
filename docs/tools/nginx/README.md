---
title: nginx
lang: zh-CN
sidebarDepth: 2
---

## 基础用法

### 代理至本地路径的文件

```js
server {
  server_name localhost;
  listen 80;
  location / {
    root /Users/careerfrog/test;
    index index.html;
  }
}

// 将 localhost:80 代理至本地的 /Users/careerfrog/test/index.html
nginx -s reload // 重启nginx
```

### 代理至其他端口

```js
server {
  server_name localhost;
  listen 80;
  location / {
    proxy_pass http://192.168.99.239:8000; // 或 http://localhost:8000;
    index index.html;
  }
}

// 将 localhost:80 代理至 http://192.168.99.239:8000;
```

### 绝对路径和相对路径匹配

1. 如果在proxy_pass后面的url加/，表示绝对根路径；
2. 如果没有/，表示相对路径，把匹配的路径部分也给代理走。

```js
// 例1:
server {
  ...
  location /a/ {
    proxy_pass http://localhost:8000; // 不加 /
    index index.html;
  }
}

1. localhost/a/   => http://localhost:8000/a/index.html
2. localhost/a/b/ => http://localhost:8000/a/b/index.html

// 例2:
server {
  ...
  location /a/ {
    proxy_pass http://localhost:8000/; // 加 /
    index index.html;
  }
}

1. localhost/a/   => http://localhost:8000/index.html
2. localhost/a/b/ => http://localhost:8000/b/index.html

// 例3:
server {
  ...
  location /a/ {
    proxy_pass http://localhost:8000/c/; // 加 /
    index index.html;
  }
}

localhost/a/1.jpg => http://localhost:8000/c/1.jpg;

// 例4:
server {
  ...
  location /a/ {
    proxy_pass http://localhost:8000/c; // 不加 /
    index index.html;
  }
}

localhost/a/1.jpg => http://localhost:8000/c1.jpg;（未附加/a/路径，但附加了/a/之后的路径）
```

### 匹配规则和优先级
模式|含义|
|--|--|
location = /uri     |  = 表示精确匹配，只有完全匹配上才能生效
location ^~ /uri    |  ^~ 开头对URL路径进行前缀匹配，并且在正则之前。
location ~ pattern  |  开头表示区分大小写的正则匹配
location ~* pattern |  开头表示不区分大小写的正则匹配
location /uri       |  不带任何修饰符，也表示前缀匹配，但是在正则匹配之后
location /          |  通用匹配，任何未匹配到其它location的请求都会匹配到，相当于switch中的default

#### 优先级

1. 首先精确匹配 =
2. 其次前缀匹配 ^~
3. 其次是按文件中顺序的正则匹配
4. 然后匹配不带任何修饰的前缀匹配。
5. 最后是交给 / 通用匹配
6. 当有匹配成功时候，停止匹配，按当前匹配规则处理请求

#### 案例

```js
location = / {
   #规则A
}
location = /login {
   #规则B
}
location ^~ /static/ {
   #规则C
}
location ~ \.(gif|jpg|png|js|css)$ {
   #规则D
}
location ~* \.png$ {
   #规则E
}
location !~ \.xhtml$ {
   #规则F
}
location !~* \.xhtml$ {
   #规则G
}
location / {
   #规则H
}

那么产生的效果如下：

访问根目录/， 比如http://localhost/ 将匹配规则A
访问 http://localhost/login 将匹配规则B，http://localhost/register 则匹配规则H
访问 http://localhost/static/a.html 将匹配规则C
访问 http://localhost/a.gif, http://localhost/b.jpg 将匹配规则D和规则E，但是规则D顺序优先，规则E不起作用，而http://localhost/static/c.png 则优先匹配到规则C
访问 http://localhost/a.PNG 则匹配规则E，而不会匹配规则D，因为规则E不区分大小写。
访问 http://localhost/a.xhtml 不会匹配规则F和规则G，http://localhost/a.XHTML不会匹配规则G，因为不区分大小写。规则F，规则G属于排除法，符合匹配规则但是不会匹配到，所以想想看实际应用中哪里会用到。
访问 http://localhost/category/id/1111 则最终匹配到规则H，因为以上规则都不匹配，这个时候应该是nginx转发请求给后端应用服务器，比如FastCGI（php），tomcat（jsp），nginx作为反向代理服务器存在。

建议设置的匹配规则：

第一个必选规则
location = / {
  proxy_pass http://tomcat:8080/index
}

第二个必选规则是处理静态文件请求，这是nginx作为http服务器的强项，有两种配置模式，目录匹配或后缀匹配,任选其一或搭配使用
location ^~ /static/ {
  root /webroot/static/;
}
location ~* .(gif|jpg|jpeg|png|css|js|ico)$ {
  root /webroot/res/;
}

第三个规则就是通用规则，用来转发动态请求到后端应用服务器，非静态文件请求就默认是动态请求。
location / {
  proxy_pass http://tomcat:8080/
}
```

### root 和 alias

```js
[root]
语法：root path
默认值：root html
配置段：http、server、location、if
[alias]
语法：alias path
配置段：location
```

作用：映射到本机的文件。（只能是本机上的文件）

1. root的处理结果是：root路径＋location路径。
2. alias的处理结果是：使用alias路径替换location路径。
3. alias后面必须要用“/”结束，而root可有可无。

```js
// 使用 root
server {
  ...
  location /a/ {
    root /Users/careerfrog/test;
    index index.html;
  }
}

localhost/a/ => /Users/careerfrog/test/a/index.html

// 使用 alias
server {
  ...
  location /a/ {
    alias /Users/careerfrog/test/;
    index index.html;
  }
}

localhost/a/ => /Users/careerfrog/test/index.html

/** 如果写成:
 * alias /Users/careerfrog/test; 使用 nginx -t 检查语法错误时并不会报错。
 * 但是在访问时会报 403 Forbidden。
 * /
```

### 使用nginx解决跨域问题

前端调用：http://localhost:8886/api/users

后端接口：http://localhost:8888/users

```js
server {
  server_name localhost;
  listen 8886;
  location /api/ {
    proxy_pass http://localhost:8888/;
    add_header 'Access-Control-Allow-Origin' '*'; // 解决跨域问题
  }
}
```
将项目文件夹置于：/usr/local/var/www/ 下

访问路径：localhost:8886/project/

### index的理解

```js
server {
  listen      80;
  server_name example.org www.example.org;    
  
  location / {
    root    /data/www;
    index   index.html index.php;
  }
  
  location ~ \.php$ {
    root    /data/www/test;
  }
}
```
如果你使用example.org或www.example.org直接发起请求，那么首先会访问到“/”的location，结合root与index指令，会先判断/data/www/index.html是否存在，如果不，则接着查看
/data/www/index.php ，如果存在，则使用/index.php发起内部重定向，就像从客户端再一次发起请求一样，Nginx会再一次搜索location，毫无疑问匹配到第二个~ \.php$，从而访问到/data/www/test/index.php。

### rewrite的理解

执行顺序：

1. 执行server块的rewrite指令。
2. 执行location匹配。
3. 执行选定的location中的rewrite指令。
4. 如果其中某步URI被重写，则重新循环执行1-3，直到找到真实存在的文件；循环超过10次，则返回500 Internal Server Error错误。

#### flag 标志位

1. last – 立刻跳出本 location 的匹配，同时会顺序继续搜寻其他 location 的匹配，如果还没匹配到，还会继续搜寻本 location。
2. break – 中止Rewirte，不在继续匹配（跳出本 location 后就不会再匹配其它 location 了）。
3. redirect – 返回临时重定向的HTTP状态302
4. permanent – 返回永久重定向的HTTP状态301

break和last都能组织继续执行后面的rewrite指令。

```js
// 例1:
location / {
  rewrite ^/a /b last;
  rewrite ^/b /c last;  
}

location = /b {
  return 401;
}

location = /c {
  return 402;
}

如果访问 https://www.simplehttps.com/a/，则返回 401；
如果访问 https://www.simplehttps.com/b/，则返回 402。

// 例2:
location / {
  rewrite ^/a /b break;
  rewrite ^/b /c break;  
}

location = /b {
  return 401;
}

location = /c {
  return 402;
}

访问 https://www.simplehttps.com/a/ 和 https://www.simplehttps.com/b/，都返回 404。

// 例3:
flag 配置在 server 段时，不管是 break 还是 last，其行为规则是一样的，不会有跳出的行为，会顺序执行。

rewrite ^/a /b break; # 或者 rewrite ^/a /b last;
rewrite ^/b /c break; # 或者 rewrite ^/b /c last;  

location = /b {
  return 401;
}

location = /c {
  return 402;
}
```

#### English

1. last：stops processing the current set of ngx_http_rewrite_module directives and starts a search for a new location matching the changed URI;
2. break：stops processing the current set of ngx_http_rewrite_module directives as with the break directive;
3. redirect：returns a temporary redirect with the 302 code;
4. permanent：returns a permanent redirect with the 301 code.


#### rewrite 和 location 的区别

rewrite是在同一域名内更改获取资源的路径，而location是对一类路径做控制访问或反向代理，可以proxy_pass到其他机器。

#### 其他

```js
location / {
  rewrite ^/test/ /test1/ break;
  // rewrite ^/test /test1/ break; 无效
  // rewrite ^/test/ /test1 break; 无效
  // rewrite ^/test /test1 break; 无效
  // rewrite ^/test/ /test/a/ break; 无效
}

// curl -i http://localhost:8000/test/ => http://localhost:8000/test1/
```

### 常用变量

```js
$args ： #这个变量等于请求行中的参数，同$query_string
$content_length ： 请求头中的Content-length字段。
$content_type ： 请求头中的Content-Type字段。
$document_root ： 当前请求在root指令中指定的值。
$host ： 请求主机头字段，否则为服务器名称。
$http_user_agent ： 客户端agent信息
$http_cookie ： 客户端cookie信息
$limit_rate ： 这个变量可以限制连接速率。
$status  请求状态
$body_bytes_sent 发送字节
$request_method ： 客户端请求的动作，通常为GET或POST。
$remote_addr ： 客户端的IP地址。
$remote_port ： 客户端的端口。
$remote_user ： 已经经过Auth Basic Module验证的用户名。
$request_filename ： 当前请求的文件路径，由root或alias指令与URI请求生成。
$scheme ： HTTP方法（如http，https）。
$server_protocol ： 请求使用的协议，通常是HTTP/1.0或HTTP/1.1。
$server_addr ： 服务器地址，在完成一次系统调用后可以确定这个值。
$server_name ： 服务器名称。
$server_port ： 请求到达服务器的端口号。
$request_uri ： 包含请求参数的原始URI，不包含主机名，如：”/foo/bar.php?arg=baz”。
$uri ： 不带请求参数的当前URI，$uri不包含主机名，如”/foo/bar.html”。
$document_uri ： 与$uri相同。
```

### if 的用法

1. 当表达式只是一个变量时，如果值为空或任何以0开头的字符串都会当做false。
2. 直接比较变量和内容时，使用 = 或 !=。
3. ~ 正则表达式匹配，~* 不区分大小写的匹配，!~ 区分大小写的不匹配。

可用来判断的表达式：

1. -f和!-f用来判断是否存在文件。
2. -d和!-d用来判断是否存在目录。
3. -e和!-e用来判断是否存在文件或目录。
4. -x和!-x用来判断文件是否可执行。

### 设置防盗链

```js
location / {
  valid_referers none blocked 192.168.99.239;
    if ($invalid_referer) {
      return 403;
  }
}

// curl -e 192.168.99.239  -I localhost:8000/test/  => 200
// curl -e www.baidu.com -I localhost:8000/test/ => 200
// curl -e https://www.baidu.com -I localhost:8000/test/ => 403

-e：设置 HTTP 的标头Referer，表示请求的来源（必须设置http或者https才有效）。

```

```nginx
# 图片、视频等防盗链设置
location ~* ^.+\.(gif|jpg|png|swf|flv|rar|zip)$ {
  valid_referers none blocked 192.168.99.239;
  if ($invalid_referer) {
      return 403;
  }
}
```

### 日志

日志文件所在路径：/usr/local/var/log/nginx

日志文件：access.log 和 error.log

```
// 过滤nginx日志
cat access.log | grep '17/Jul/2020' // 2020/7/17这天的日志记录

cat error.log | grep '2020/07/17' // 2020/7/17这天的日志记录

cat error.log | grep "$(date +"%Y/%m/%d")"  // 查看当天的日志

// access.log 和 error.log 中日期的格式不同，因此过滤的方式也不同

cat error.log | grep '2020/07/1[0-9]'  // 查询 2020-07-10 ~ 2020-07-19 时间段内的日志
```