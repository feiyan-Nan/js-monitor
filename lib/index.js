(function (window) {
  // 上传错误的网址
  const url = document.body.className;
  if (!url) {
    return false;
  }
  /**
   * @des 私有方法
   * @param {Object} arg, 错误信息对象
   * @private
   */
  function error(arg) {
    if (typeof arg === 'string') {
      return false;
    }
    var errorMsg = {
      viewUrl: decodeURIComponent(location.href), //URL
      date: dateFun(), //发生的时间
      platform: window.navigator.platform, //手机型号
      device: browserRedirect(), // 手机端还是pc端
      ua: window.navigator.userAgent.toString(), //UserAgent
      filePath: (document.currentScript && document.currentScript.src) || '', //出错的文件
      line: 0, //出错文件所在行
      col: (window.event && window.event.errorCharacter) || 0, //出错文件所在列
      lang: navigator.language || navigator.browserLanguage || '', //使用的语言
      screen: window.screen.width + ' * ' + window.screen.height, //分辨率
      charset: document.characterSet ? document.characterSet : document.charset, //浏览器编码环境
      info: '无错误描述!', //错误信息
      errStack: '', // 错误栈信息
    };

    for (var i in arg) {
      if (arg[i] != '') {
        errorMsg[i] = arg[i];
      }
    }
    console.log(errorMsg);
    //错误信息上报
    setTimeout(function () {
      send({
        url: url,
        data: errorMsg,
      });
    }, 0);
  }
  function browserRedirect() {
    var browser = {
      versions: (function () {
        var u = navigator.userAgent,
          app = navigator.appVersion;
        return {
          //移动终端浏览器版本信息
          trident: u.indexOf('Trident') > -1, //IE内核
          presto: u.indexOf('Presto') > -1, //opera内核
          webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
          gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
          mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
          android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
          iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
          iPad: u.indexOf('iPad') > -1, //是否iPad
          webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        };
      })(),
      language: (navigator.browserLanguage || navigator.language).toLowerCase(),
    };
    if (browser.versions.mobile) {
      //判断是否是移动设备打开。browser代码在下面
      var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        //在微信中打开
        return 'WeChat Browser';
      }
      if (ua.match(/WeiBo/i) == 'weibo') {
        //在新浪微博客户端打开
        return 'WeiBo Browser';
      }
      if (ua.match(/QQ/i) == 'qq') {
        //在QQ空间打开
        return 'QQ Brower';
      }
      if (browser.versions.ios) {
        //是否在IOS浏览器打开
        return 'IOS Brower';
      }
      if (browser.versions.android) {
        //是否在安卓浏览器打开
        return 'Android Brower';
      }
    } else {
      //否则就是PC浏览器打开
      return 'PC Brower';
    }
  }
  /**
   * @des 处理时间
   * @return YYYY-MM-DD hh:mm:ss
   * @private
   */
  function dateFun() {
    var date = new Date();
    return (
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1) +
      '-' +
      date.getDate() +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes() +
      ':' +
      date.getSeconds()
    );
  }
  /**
   * @des 将对象转为键值对参数字符串。
   * @param {Object} obj 参数列表对象
   * @return 返回拼接之后的参数列表字符串
   * @private
   */
  function param(obj) {
    if (Object.prototype.toString.call(obj) !== '[object Object]') {
      return false;
    }

    var array = [];
    for (var k in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, k)) {
        return false;
      }
      if (obj[k] != '') {
        array.push(k + '=' + encodeURIComponent(obj[k]));
      }
    }
    return array.join('&');
  }
  /**
   * @des 创建一个HTTP GET 请求
   * @param {Object} obj 参数列表对象 {url:'',data:{},callback:function(){}}
   * @private
   */
  function send(obj) {
    if (!obj.callback) {
      obj.callback = function () {};
    }

    var d = param(obj.data),
      url = obj.url + (obj.url.indexOf('?') < 0 ? '?' : '&') + d;
    // 忽略超长 url 请求，避免资源异常。
    if (url.length > 7713) {
      return;
    }

    if (window.navigator.onLine) {
      var img = new Image(1, 1);
      img.onload = img.onerror = img.onabort = function () {
        obj.callback();
        img.onload = img.onerror = img.onabort = null;
        img = null;
      };
      img.src = url;
    }
  }
  // 使用onerror事件捕获页面中的错误
  window.onerror = function (_message, _url, _line, _column, _error) {
    //没有URL不上报！上报也不知道错误
    if (_message === 'Script error.' && !_url) {
      return true;
    }
    var params_obj = {
      info: _message,
      filePath: _url,
      line: _line,
      col: _column,
    };
    // 如果有错误详情 赋值到stack属性中
    if (_error && _error.stack) {
      // 打印错误堆栈
      params_obj.errStack = (_error.stack || _error.stacktrace).toString();
    }
    error(params_obj);
    return true;
  };
})(window);
