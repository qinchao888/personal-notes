function firstWordToUpperCase(word) { // 将所有单词首字母转化为大写
  return word.replace(/\b\w/g, function (letter) {
    return letter.toUpperCase();
  })
}

/* 规则：6-12位，数字、字母，且至少包含一个数字和一个字母 */
function checkPassword(password) { // 密码校验
  return (/(?=.*\d)(?=.*[a-zA-Z])^[0-9a-zA-Z]{6,12}$/).test(password);
}

/* 规则：4-16位，数字、字母、下划线、中划线、中文 */
function checkUserName(name) { // 用户名校验
  return (/^[\u4E00-\u9FA5\w-]{4,16}$/).test(name);
}

function checkEmail(email) { // 邮箱校验
  return (/^([A-Za-z0-9_\-\.])+@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/).test(email);
}

function checkPhone(number) { // 手机号校验
  return (/^(13[0-9]|14[579]|15[0-3|5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/).test(number);
}

/* 规则： 5-11位数字，首位不为0 */
function checkQQ(qq) { // QQ号校验
  return (/^[1-9]\d{4,10}$/).test(qq);
}

/* 规则： 6-20位，首位为字母，其他位为数字、字母、下划线、中划线 */
function checkWeixin(val) {
  return (/^[a-zA-Z][\w-]{5,19}$/).test(val);
}

function formatDate(str) { // 日期转化（将'20180818'转化为'2018-08-18'）
  return str.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
}

function NumberSeparator(value) { // 千分位分隔符（类似于1,234,567）
  return (value + '').replace(/(?!^)(?=(\d{3})+$)/g, ',');
}