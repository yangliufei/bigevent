$(function () {
    $('#tologin').on('click', function () {
        $('.login_box').hide()
        $('.reg_box').show()
    })
    $('#toreg').on('click', function () {
        $('.login_box').show()
        $('.reg_box').hide()
    })
    var form = layui.form
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
})