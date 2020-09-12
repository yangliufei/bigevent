$(function () {
    huqu()
    $('.tuichu').click(function () {
        layui.layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token')
            location.href = '/login.html'

            layer.close(index);
        });
    })
})
function huqu() {
    $.ajax({
        url: "/my/userinfo",
        type: 'get',

        success: function (res) {
            console.log(res.data);
            if (res.status !== 0) {
                return layui.layer.msg('用户信息错误')
            }
            xrtouxiang(res.data)
        }
        
    })
}
function xrtouxiang(user) {
    var name = user.nickname || user.username
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.zititouxiang').hide()

    } else {
        $('.layui-nav-img').hide()
        var szm = name[0].toUpperCase()
        $('.zititouxiang').html(szm)
    }
}