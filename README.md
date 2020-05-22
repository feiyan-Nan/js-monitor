# js-monitors v1.0.8

The js-monitors library as Front-end code exception monitoring

## Installation

Using npm:

```shell
$ npm i -g npm
$ npm i --save js-monitors
```

In Browser.js:

```shell
// It only takes two steps to use
// first:
// <body class="服务器日志记录地址"></body>
<body class="https://www.baidu.com/"></body>

// second
require('js-monitors');
```

> See the [package source](https://github.com/nanfeiyan123/js-monitor) for more details.

| 字段名称 |               功能                | 可能值                                                                                                                                      |
| :------: | :-------------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------- |
| charset  |          浏览器编码环境           | utf-8 \|\| gbk                                                                                                                              |
|   col    |          出错文件所在列           | number                                                                                                                                      |
|   date   |            发生的时间             | 2020-5-22 15:4:15                                                                                                                           |
|  device  | 手机端(WeChat,QQ,WeiBo)还是 pc 端 | IOS Brower                                                                                                                                  |
| errStack |            错误栈信息             | Error: 程序抛出的错误信息 ↵ at http://127.0.0.1:5500/test/index.html:48:11                                                                  |
| filePath |            出错的文件             | http://127.0.0.1:5500/test/index.html                                                                                                       |
|   info   |             错误信息              | Error: 程序抛出的错误信息                                                                                                                   |
|   lang   |            使用的语言             | zh-CN                                                                                                                                       |
|   line   |          出错文件所在行           | number                                                                                                                                      |
| platform |        win32 还是苹果系统         | Win32                                                                                                                                       |
|  screen  |              分辨率               | 375 \* 667                                                                                                                                  |
|    ua    |             UserAgent             | Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 |
| viewUrl  |                URL                | http://127.0.0.1:5500/test/index.html                                                                                                       |

#### 发送的数据

![发送的数据](https://oss.guangmangapp.com/2fc7ee9b-42b1-40e3-bf56-7dfc42109429.png)

#### 发送的请求

![发送的请求](https://oss.guangmangapp.com/b2672ce3-e870-4002-a1af-f7e19c43fc2a.png)

**有问题请联系 `3328921305@qq.com`**
