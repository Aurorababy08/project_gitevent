$(function(){
    const layer = layui.layer
    const form = layui.form
    initArticleCateList()
   
    // 获取文章分类的列表
    function initArticleCateList() {
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res) {
                var htmlStr = template('tpl-table',res)
                $('tbody').html(htmlStr)
            }
        })
    }

    // 为类别添加按钮绑定点击事件
    indexAdd = null
    $('#btnAddCate').on('click',function(){
        indexAdd = layer.open({
            type: 1,            //去掉默认的按钮
            title: '在线调试',
            area: ['500px', '250px'] ,       //设置弹框的宽高,
            content: $('#dialog-add').html(),
          });     
            
    })

    // 为弹出层form表单，添加submit提交事件,由于form表单是动态生成的，所以通过代理添加
    $('body').on('submit','#form-add',function(e) {
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),   
            success:function(res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                // 调用获取文章分类函数
                initArticleCateList()
                layer.msg('新增分类成功')
                // 根据索引关闭弹出层
                layer.close(indexAdd)
            }
        })
    })

    // 通过代理为编辑按钮添加事件
    indexAdd = null
    $('tbody').on('click','#btnEdit',function() {
        indexAdd = layer.open({
            type: 1,            //去掉默认的按钮
            title: '修改文章类别',
            area: ['500px', '250px'] ,       //设置弹框的宽高,
            content: $('#dialog-edit').html(),
          });  

        var id = $(this).attr('data-id')
        // console.log(id);
        // 发起请求获取对应数据
        $.ajax({
            method:'GET',
            url:'/my/article/cates/' + id,
            success:function(res) {
                // console.log(res);
                form.val('form-edit',res.data)
            }
        })

        // 通过代理为修改表单绑定提交事件
        $('body').on('submit','#form-edit',function(e){
            e.preventDefault()
            $.ajax({
                method:'POST',
                url:'/my/article/updatecate',
                data:$(this).serialize(),
                success:function(res) {
                    if (res.status !== 0) {
                        return layer.msg('修改数据失败！')
                    }
                    layer.msg('修改成功！')
                    layer.close(indexAdd)
                    initArticleCateList()
                }
            })
        })
    })

     // 通过代理为删除按钮绑定删除事件
     $('tbody').on('click','#btnDelet',function() {
        var id = $(this).attr('data-id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' },function(index) {
            $.ajax({
                method:'GET',
                url:'/my/article/deletecate/' +id,
                success:function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)
                    initArticleCateList()
                }
            })
        })
    })

    
})