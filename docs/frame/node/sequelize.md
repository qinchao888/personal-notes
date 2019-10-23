---
title: express
lang: zh-CN
sidebarDepth: 2
---
## 基本用法

### 配置操作

1. 设置 raw: true 返回数据库中的原始数据。

```js
Project.findOne({raw: true }) // 形如{ id: 11, name: '12', age: 12, year: 11 }
```
2. Project.sum()：该方法在计算时会自动将字符串类型转化为数值类型进行运算。

```
Project.sum('id');
```

### 常用操作

#### 表名设置

```js
var Sequelize = require('sequelize')
var sequelize = new Sequelize('qinchao', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})
var User = sequelize.define('userinfo', {
  name: Sequelize.STRING,
  age: Sequelize.INTEGER
}, {
  freezeTableName: true //禁止修改表名(原因：sequelize默认会自动将模型名称修改为复数，即此时表名为userinfos，此设置只针对sequelize的默认修改)
  /**
   * 或设置tableName: 'userinfo'
   */
})
User.findAll({
  where: {name: 11},
  attributes: ['name', 'age']
}).then((res) => {
  console.log('result', res)
})
module.exports = sequelize

```

#### 同步数据库表结构

```js
User.drop() // 删除数据库中的表
User.sync() // 根据模型将数据结构同步到数据库中
// 等价于 => User.sync({force: true})
```

#### limit 和 offset 的用法

1. offset: 偏移量
2. limit:  读取的数据量

```js
User.findAndCountAll({
  offset: 1,
  limit: 1
})
// 等价于 => SELECT * FROM `userinfo` AS `userinfo` LIMIT 1, 1;

User.findAndCountAll({
  limit: 10
})
// 等价于 => SELECT * FROM `userinfo` AS `userinfo` LIMIT 10;

User.findAndCountAll({
  offset: 2
})
// 等价于 => SELECT * FROM `userinfo` AS `userinfo` LIMIT 2, 10000000000000;
```

### 模型关系

#### hasOne：一对一关系

向目标模型中插入关联键

```
Coach.hasOne(Team)  // `coachId` 会添加到 Team
```

#### belongsTo：一对一关系

向源模型中插入关联键

```
Player.belongsTo(Team)  // `teamId` 会添加到 Player
```

#### hasMany：一对多关系（一个源模型连接多个目标模型）

```
Project.hasMany(User) // 向 User 中添加一个 projectId 或 project_id 属性
```

#### belongsToMany：多对多关系（一个源模型连接多个目标模型，目标模型也可以有多个相关的源）

```
Project.belongsToMany(User, {through: 'UserProject'});
User.belongsToMany(Project, {through: 'UserProject'});
// 创建一个新模型UserProject其中会有 projectId 和 userId 两个外键

User.belongsToMany(Project, { as: 'Tasks', through: 'worker_tasks', foreignKey: 'userId' })
Project.belongsToMany(User, { as: 'Workers', through: 'worker_tasks', foreignKey: 'projectId' }) 
```
1. foreignKey：设置through关系中的源模型。
2. otherKey：设置through关系中的目标模型。

#### 源模型与目标模型

```
// source：源模型 target：目标模型

source.hasOne(target)
source.belongsTo(target)
source.hasMany(target)
source.belongsToMany(target)
```