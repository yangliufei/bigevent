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
  var editIndex = null
  $('body').on('click', '.btn-edit', function () {
    editIndex = layui.layer.open({
      type: 1,
      area: ['400px', '250px'],
      title: '修改文章分类',
      content: $('#dailog-edit').html()
    })
    var cataid = $(this).attr('data-id')
    $.ajax({
      type: 'get',
      url: `/my/article/cates/${cataid}`,
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg(res.message)
        }
        layui.form.val('edit-form', res.data)
      }
    })
  })

  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg(res.message)
        }
        layui.layer.msg('修改分类成功')
        xrcatalist()
        layui.layer.close(editIndex)

      }
    })
  })
  $('tbody').on('click', '.btn-delete', function () {
    var cataid = $(this).attr('data-id')
    layer.confirm('是否确认删除?', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        type: 'get',
        url: `/my/article/deletecate/${cataid}`,
        success: function (res) {
          if (res.status !== 0) {
            return layui.layer.msg(res.message)
          }
          layui.layer.msg('删除成功')
          xrcatalist()
          layui.layer.close()

        }

      })
    })
  })
})