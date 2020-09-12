$(function () {
  layui.form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度应该在1-6个字符之间'
      }
    }
  })
  initUserInfo()
  function initUserInfo() {
    $.ajax({
      url: '/my/userinfo',
      type: 'get',
      success: function (res) {
        if(res.status!==0){
          return layui.layer.msg(res.massage)
        }
        //快速填写表单数据，name值要对应才行,第一个参数为给要快速填写表单加上的属性lay-filter="userinfo"
        //第二个参数为要快速填写的数据
        layui.form.val('userinfo',res.data)
      }
    })
  }
  $('#resetBtn').click(function(e){
    e.preventDefault()
    //重置后再次获取快速填写
    initUserInfo()
  })
  $('#changeuserinfo').submit(function(e){
    e.preventDefault()
    $.ajax({
      url:'/my/userinfo',
      type:'post',
      data:$(this).serialize(),
      success:function(res){
        if(res.status!==0){
          return layui.layer.msg(res.message)
        }
        //ifrmas 调用父级页面的方法 window.parent....
        window.parent.huqu()
      }
    })
  })
})