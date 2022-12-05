// $.ajaxPrefilter(function(options) {
//     // console.log(options.url);
//     options.url = 'http://api-breakingnews-web.itheima.net' + options.url
//     console.log(opions.url);
// })

$.ajaxPrefilter(function(options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    // 统一为有权限的接口设置headers

    if (options.url.indexOf('/my/' !== -1)) { //判断是否以 /my开头的url地址
      options.headers = {
        Authorization:localStorage.getItem('token')  || ''
      }
    }

    // 统一全局挂载complete回调函数
    options.complete = function(res) {
      if (res.responseJSON.status === 1 && res.responseJSON.message == '身份认证失败！') {
                // 1.强制清空token
                localStorage.removeItem('token')
                // 2.跳转登录页面
                location.href = './login.html'
            }
    }
  })
  