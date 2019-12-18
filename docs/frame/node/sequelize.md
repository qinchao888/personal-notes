---
title: sequelize
lang: zh-CN
sidebarDepth: 2
---
## 基本用法

:::tip 总结

1. sequelize中虽然定义了createdAt、updatedAt not null，但是在创建时可以不用传这两个字段，sequelize会自动使用当前时间创建。

:::

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

### 类方法和实例方法

tips：In sequelize V4 class and instance methods are removed.

```js
// sequelize v4.0+
var User = sequelize.define('user', {attributes}, {options})

// 类方法注册
User.method1 = function () {} // 类方法，通过User.method1()调用

// 实例方法注册
User.prototype.method2 = function () {} // 实例方法，通过创建的实例调用

User.build({...}).method2() // 创建实例并调用实例方法
```

```js
// sequelize v4.0以下
var User = sequelize.define('user', {attributes}, {
  classMethods: {
    method1: function () {
      ...
    }
  },
  instanceMethods: {
    method2: function () {
      ...
    }
  }
})
```

### scope

1. defaultScope 属性
2. scopes 属性
3. addScope() 函数

```js
var Task = sequelize.define('task', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  taskId: {
    type: Sequelize.STRING,
    field: 'task_id'
  },
  name: Sequelize.STRING,
  time: Sequelize.DATE
}, {
  freezeTableName: true,
  createdAt: false,
  updatedAt: false,
  defaultScope: { // 默认
    where: {
      task_id: 'a'
    }
  },
  scopes: {
    isA: { // 对象格式
      where: {
        name: 'a'
      }
    },
    fn: function (name, id) { // 函数格式
      return {
        where: {
          name,
          id
        }
      }
    }
  }
})

Task.findAll({raw: true})
// SELECT `id`, `task_id` AS `taskId`, `name`, `time` FROM `task` AS `task` WHERE `task`.`task_id` = 'a';

Task.scope({method: ['fn', 'a', 1]}).findAll({raw: true})
// SELECT `id`, `task_id` AS `taskId`, `name`, `time` FROM `task` AS `task` WHERE `task`.`name` = 'a' AND `task`.`id` = 1;

Task.scope('isA').findAll({raw: true})
// SELECT `id`, `task_id` AS `taskId`, `name`, `time` FROM `task` AS `task` WHERE `task`.`name` = 'a';

Task.addScope('isB', {
  where: {
    name: 'b'
  }
})

Task.scope('isB').findAll({raw: true})
// SELECT `id`, `task_id` AS `taskId`, `name`, `time` FROM `task` AS `task` WHERE `task`.`name` = 'b';

// 再次使用addScope定义一个同名的限制会抛出异常，需要使用override: true
Task.addScope('isB', {
  where: {
    name: 'bb'
  }
}, { override: true })

Task.scope('isB').findAll({raw: true})
// SELECT `id`, `task_id` AS `taskId`, `name`, `time` FROM `task` AS `task` WHERE `task`.`name` = 'bb';
```

### include 和 association

association的使用场景：连接查询时，如果要连接查询的两个模型间事先没有定义连接关系，或者要使用定义之外的连接关系。这时，可以通过association来定义或重新定义模型关系。

```js
// 使用 include
User.belongsTo(Company, {foreignKey:'companyId'});
var include = [{ // 条件：必须定义了User和Company的关系
	model: Company,
	as: 'company'
}];
User.findOne({include:include})

// 使用 association
var include = [{ // 只需在此处定义User和Company的关系
	association: Company.hasOne(User, {foreignKey:'companyId', as:'manager'}),
	where: {isManager:true}
}]
Company.findOne({include:include})
```

### sequelize.literal 的用法

```js
// 嵌套查询
User.findAll({
  where: sequelize.literal(`company_id in (select id from companies where name = '哈哈')`)
}).then(res => {
  console.log(JSON.stringify(res, null, ' '))
})
// SELECT `id`, `name`, `sex`, `company_id` AS `companyId`, `is_manager` AS `isManager`, `createdAt`, `updatedAt` FROM `users` AS `user` WHERE company_id in (select id from companies where name = '哈哈')
```
### 运算符

#### $in

```js
// 获取某些id的数据
User.findAll({
  where: {
    id: [1, 2, 3, 4]
  }
})
// 或
User.findAll({
  where: {
    id: {
      $in: [1, 2, 3, 4]
    }
  }
})
```

## 常用语法

### 自增自减

[参考](https://itbilu.com/nodejs/npm/N1pPjUdMf.html)

#### 单实例自增自减

1. 增：increment()
2. 减：decrement()

```js
Task.findOne().then(task => { // 自增1
  task.increment('taskId').then(res => { // 此处的taskId也可以写成task_id
    console.log('res00', res)
  })
})

Task.findOne().then(task => { // 自增3
  task.increment('taskId', {by: 3}).then(res => { // 此处的taskId也可以写成task_id
    console.log('res00', res)
  })
})
```

#### 批量自增自减

```js
Task.update({
  taskId: sequelize.literal('`task_id` + 1') // 此处需要使用数据库中定义的字段名称
}, {
  where: {
    name: 'abc'
  }
})
```
## 开发总结

### 获取数据库两列值相加在某个范围内的数据

```js
const startTime = moment(params.startTime).subtract(30, 'minutes').utc().format('YYYY-MM-DD HH:mm:ss');
const endTime = moment(params.startTime).add(+params.duration + 30, 'minutes').utc().format('YYYY-MM-DD HH:mm:ss'); 
// 时间不可直接用数据库存储的时间和时间戳进行计算，需要转化为相同类型
const res = await models.LessonSchedule.findAll({
  where: {
    tutorId,
    $and: [
      models.sequelize.literal(`DATE_ADD(start_time, INTERVAL duration MINUTE) >= '${startTime}' AND start_time <= '${endTime}'`)
    ]
  }
});

/*
SELECT 
  *
FROM
    `lesson_schedule` AS `LessonSchedule`
WHERE
    (DATE_ADD(start_time,
        INTERVAL duration MINUTE) >= '2019-12-11 16:00:00'
        AND start_time <= '2019-12-11 18:30:00')
        AND `LessonSchedule`.`tutor_id` = '1';
*/
```