$(function () {
  xrcatalist()
  function xrcatalist() {
    $.ajax({
      type: 'get',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg(re.message)
        }
        var lll = template('tpl-table', res)
        $('tbody').html(lll)
      }
    })
  }
  var addIndex = null
  $('#btnAddCate').on('click', function () {
    addIndex = layui.layer.open({
      type: 1,
      area: ['400px', '250px'],
      title: '添加文章分类',
      content: $('#dailog-add').html()
    })
  })
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg(res.message)
        }
        layui.layer.msg('添加成功')
        layui.layer.close(addIndex)
        xrcatalist()
      }
    })
  })
})