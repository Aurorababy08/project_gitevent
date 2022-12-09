$(function(){
    var layer = layui.layer
    var form = layui.form
    initCate()
    // 初始化富文本编辑器
    initEditor()

    // 定义加载文章分类的方法
    function initCate() {
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('初始化文章失败！')
                }
                var htmlStr = template('tpl-Cate',res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }

      // 1. 初始化图片裁剪器
    var $image = $('#image')
    
    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    
    // 3. 初始化裁剪区域
    $image.cropper(options)

    $('#btnchooseImage').on('click',function() {
       $('#coverFile').click() 
    })

    // 给coerFile绑定change事件，监听用户选择的文件
    $('#coverFile').on('change',function(e) {
        // 获取选择文件的数组
        var files =  e.target.files  
        if (files.length === 0) {
            return layer.msg('请选择文件')
        }
        // 根据用户选择的文件创建对应的url地址
        var newImgURL =  URL.createObjectURL(files[0])
        // 为裁剪去重新设置图片
        $image
        .cropper('destroy')      // 销毁旧的裁剪区域
        .attr('src', newImgURL)  // 重新设置图片路径
        .cropper(options)        // 重新初始化裁剪区域
    })

    // 定义文章发布的状态
    var art_state = '已发布'

    // 为存为草稿按钮绑定点击事件处理函数
    $('#btnSave2').on('click',function(){
        art_state = '草稿'
    })

    // 为表单绑定submit事件
    $('#btn-pub').on('submit',function(e) {
        e.preventDefault()
        // 2.基于表单创建一个formData事件
        var fd = new FormData($(this)[0])
        fd.append('state',art_state)
        // 将裁剪后的图片存为一个文件对象
          // 4. 将封面裁剪过后的图片，输出为一个文件对象
          $image
          .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 400,
            height: 280
          })
          .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
            // 将文件对象追加到formdata中
            fd.append('cover_img',blob)
            console.log(fd);
            // 调用ajax请求
            publishArticle(fd)
          })
    })
    // 定义发起ajax请求方法
    function publishArticle(fd) {
        $.ajax({
            method:'POST',
            url:'/my/article/add',
            data:fd,
            // 如果向服务器发起formData格式的数据，需要配置一下两个参数
            contentType:false,
            processData:false,
            success:function(res) {
                if (res.status !== 0) {
                    console.log(res);
                    return layer.msg('发布失败！')
                }
                layer.msg('发布成功！')
                // 发布成功后跳转到文章列表页面
                location.href = '../article/art_list.html'
            }
        })
    }
})