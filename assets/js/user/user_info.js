$(function(){
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname:function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1-6个字符之间!'
            }
        }
    })


UnitUserInfo() 


// 初始化用户的基本信息
function UnitUserInfo() {
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        success:function(res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败!')
            }
            // console.log(res);
            form.val('formUserInfo',res.data)
        }
    })
}

// 重置表单的数据
$('#btnRest').on('click',function(e) {
    // 阻止默认提交行为
    e.preventDefault()
    UnitUserInfo() 
})
})