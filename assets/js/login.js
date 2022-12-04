    $(function() {
        $('#link_reg').on('click',function() {
            $('.login-box').hide()
            $('.reg-box').show()
        })

        //点击去登录的链接
        $('#link_login').on('click',function() {
            $('.reg-box').hide()
            $('.login-box').show()
        })

        // 从layui获取form
        const form = layui.form
        const layer = layui.layer
        form.verify({
            pwd: [
                /^[\S]{6,12}$/
                ,'密码必须6到12位，且不能出现空格'
            ],
            // 验证两次输入的密码是否一致
            repwd:function(value) {
                // 获取第一次输入的密码
                const pwd = $('.reg-box [name=password]').val()
                if(pwd !== value) {
                    return '两次输入的密码不一致！'
                }
            }
        })

        // 监听表单提交事件
        $('#form_reg').on('submit',function(e){
            // 阻止默认提交行为
            e.preventDefault()
            // 发起ajax请求
            var data = {
                username:$('#form_reg [name=username]').val(),
                password:$('#form_reg [name=password]').val()
            }
            $.post('/api/reguser',data,function(res){
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                    layer.msg('注册成功！')
                    $('#link_login').click()
            })
        })

        // 监听表单登录事件
        $('#form_login').submit(function(e) {
            // 阻止默认提交行为
            e.preventDefault()
            console.log($(this).serialize());
            $.ajax({
              url: '/api/login',
              method: 'POST',
              // 快速获取表单中的数据
              data: $(this).serialize(),   //
              success: function(res) {
                if (res.status !== 0) {
                  return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html'
              }
            })
          })

    })
    
    
