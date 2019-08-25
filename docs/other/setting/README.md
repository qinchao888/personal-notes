---
title: 配置
lang: zh-CN
sidebarDepth: 2
---
<span class="fw_16">清除DNS缓存：</span><span class="fr_t">ipconfig/flushdns</span>

如果出现突然无法上网，可能是DNS缓存的地址错误，此时刷新DNS缓存即可。

<span class="fw_16">显示本机DNS缓存：</span><span class="fr_t">ipconfig/displaydns</span>

<span class="fw_16">域名解析：</span>将域名解析成IP地址，这个过程由DNS服务器完成。

<span class="fw_16">DNS缓存：</span>加速了网址的解析。

<span class="fw_16">DNS Client服务：</span>客户端对DNS解析内容的缓存服务。禁用不会影响DNS解析，只是不会对DNS解析的内容进行缓存。

#### 访问一个站点流程

1. 在DNS缓存中读取域名对应的IP地址，查找不到执行第二步；
2. 查找系统中的hosts文件，找到对应的IP地址，查找不到执行第三步；
3. 向DNS服务器发起一个DNS查询，DNS服务器返回该域名对应的IP地址并将其存入DNS缓存中。