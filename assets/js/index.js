$(function() {
    const layer = layui.layer
    $('#btnLogOut').on('click',function(){
        // console.log('ok');
        layer.confirm('确认推出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            // 1.清除本地存储
            localStorage.removeItem('token')
            location.href = './login.html'

            // 关闭confirm询问框
            layer.close(index);
          });
    })

    getUserInfo()
})

// 获取用户基本信息
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // headers: {
        //     Authorization:localStorage.getItem('token')  || ''

        // },
        success:function(res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')                
            }
            randerAvatar(res.data) 
        },

        // 是否登录成功都有complete属性
      
        // complete:function(res) {
        //     // console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message == '身份认证失败！') {
        //         // 1.强制清空token
        //         localStorage.removeItem('token')
        //         // 2.跳转登录页面
        //         location.href = './login.html'
        //     }
        // }
    })

}

function randerAvatar(user) {
    // 获取用户的名称
    var name = user.nickname || user.username
    // 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name )
    // 3.按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1渲染图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show()    
        // 隐藏文字头像
        $('.text-avatar').hide()
    } else {
        // 渲染文字头像
            // 隐藏图片头像
        $('.layui-nav-img').hide()
            // 获取第一个字母，并装换成大写
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }

}