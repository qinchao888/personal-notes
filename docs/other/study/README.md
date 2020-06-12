---
title: 总结
lang: zh-CN
sidebarDepth: 2
---

## 编码

### Ascii Unicode UTF-8 编码

[参考](https://segmentfault.com/a/1190000014324711)

#### Unicode

使用2个字节编码一个字符。（2 ^ 16 -> 0 ~ 65535） 

#### UTF-8（8-bit Unicode Transformation Format）

1. UTF-8用1到6个字节编码Unicode字符。
2. 使用可变长字符编码方式。
3. ASCII所表示的字符集使用1个字节表示
4. 相比 Unicode 统一使用2个字节表示一个字符，大部分字符可以使用1个字节表示，可以节省存储空间。但是如果需要使用超过3个字节表示一个字符，则会消耗更多的存储空间。
5. 英文字母1个字节，汉字3个字节，生僻字4-6个字节

#### Ascii

### base64编码和解码

[参考](https://juejin.im/post/5edc2c3d518825433e1fb86a)

base64编码原理：

1. 将需要编码的每个字符转化为utf-8编码，再转为二进制。ascii字符可以直接使用charCodeAt转化为unicode码，再使用toString(2)转化为二进制。非ascii码，如中文字符等使用encodeURI编码，过滤掉 % 剩下的是16进制utf-8编码，再将16进制解析成10进制，再转化为2进制。
2. 补0，总二进制数需要能够被6整除。
3. 每6位转为10进制按照base64编码表编码。
4. 补齐的6个0编码为 '=' 而不是编码为 'A'。

ascii字符在unicode中使用两个字节编码，转化为二进制只有八位，原因：八位足够表示ascii码，高位补0，在JS中高位0会被隐藏掉，因此需要手动补齐 8 位。

中文字符在utf-8中使用三个字符编码，转化为二进制共24位。所以一般来说一个中文字符转化为base64为4个字符。

```html
<!-- js实现base64编码 -->

<script>
/* base64编码表 */
function base64Map () {
  return Array.from({length: 26}, (item, index) => String.fromCharCode(65 + index)).concat(Array.from({length: 26}, (item, index) => String.fromCharCode(97 + index))).concat(Array.from({length: 10}, (item, index) => index)).concat(['+', '/', '='])
}
console.log(base64Map(), base64Map().length)
/**
* step1: 将每个字符转化为2进制，补齐八位（一个字节）
*     -- 中文和英文需要进行区分
* step2: 总二进制数需要能够被6整除，即 8y/6 = 4y/3，即y必为3的整数倍，不足补0。一个字节补16个0，两个字节补8个0
* step3: 将得到的二进制数每6位分隔，将6位二进制数转为10进制后按照base64编码表编码
* step4: 补足的0，每八位为'='而不是'A'
*/
function asciiToBase64 (str) {
  var binary = ''
  str.split('').forEach((char) => {
    var ch = encodeURI(char)
    var list = ['>', '<', '{', '}', '[', ']', '|', '\\', '`', '%', '^', '"']; // 不需要转义的字符
    if (ch === char || list.includes(char)) { // 未转义
      binary += char.charCodeAt(0).toString(2).padStart(8, 0)
    } else {
      binary += parseInt(ch.replace(/%/g, ''), 16).toString(2)
    }
  })
  var len = Math.ceil(binary.length / 6)
  switch (binary.length % 6) {
  case 2:
    binary += new Array(16).fill(0).join('')
    break;
  case 4:
    binary += new Array(8).fill(0).join('')
    break;
  default:
  }
  var byteArr = binary.match(/\d{6}/g)
  var base64 = ''
  byteArr.forEach((byte, index) => { // 4
    if (index > len - 1) {
      base64 += '='
    } else {
      base64 += base64Map()[parseInt(byte, 2)]
    }
  })
  return base64
} 
var testCharList = [',', '<', '.', '>', '/', '?', ':', ';', '"', "'", '{', '[', '}', ']', '|', '\\', '`', '-', '_', '+', '=', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')' ];
testCharList.forEach(item => {
  console.log(item, asciiToBase64(item), window.btoa(item), window.btoa(item) === asciiToBase64(item))
})
</script>
```
