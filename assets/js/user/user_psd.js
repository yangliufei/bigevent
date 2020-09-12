$(function () {
  layui.form.verify({
    psd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    samePsd: function (value) {
      if (value === $('[name=oldPwd]').val()) {
        return '新旧密码不能相同'
      }
    },
    rePsd: function (value) {
      if (value !== $('[name=newPwd]').val()) {
        return '俩次密码输入不一致'
      }
    },
  })
  $('.layui-form').submit(function (e) {
    e.preventDefault()
    $.ajax({
      url: '/my/updatepwd',
      type: 'post',
      data: $(this).serialize(),
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layui.layer.msg(res.message)
        }
        layui.layer.msg('修改密码成功')
        $('.layui-form')[0].reset()
        localStorage.removeItem('token')
        top.window.location.href = '/login.html'
      }
    })
  })
})