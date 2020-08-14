---
title: shell
lang: zh-CN
sidebarDepth: 2
---

```shell
for((i=1;i<=1000;i++));do
  echo "这是第 $i 次调用"
  curl -d 'name=1234' http://localhost:8889/test
  # 这里是注释
  echo "\n"
done
```