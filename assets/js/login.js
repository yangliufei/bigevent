$(function () {
    $('#toreg').on('click', function () {
        $('.login_box').hide()
        $('.reg_box').show()
    })
    $('#tologin').on('click', function () {
        $('.login_box').show()
        $('.reg_box').hide()
    })
    var form = layui.form
    var layer = layui.layer
    form.verify({
        psd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repsd: function (value) {
            var a = $('.reg_box [name=password]').val()
            if (a !== value) {
                return '输入密码不一致'
            }
        }

    })
    $('#form_reg').on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            url: "http://ajax.frontend.itheima.net/api/reguser",
            type: 'post',
            data: {
                username: $("#form_reg [name=username]").val(),
                password: $("#form_reg [name=password]").val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功,请登录');
                $('#tologin').click()
            }
        })
    })
    $('#login_form').submit(function(e){
        e.preventDefault()
        $.ajax({
            url:"http://ajax.frontend.itheima.net/api/login",
            type:'post',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0){
                    return layer.msg(res.message)
                }
                layer.msg('登录成功')

                localStorage.setItem('token',res.token)
                location.href='/index.html'
                
            }
        })
    })
})