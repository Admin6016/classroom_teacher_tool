import request from '@/utils/request'

export const getPublicNotice = () => {
  return request({
    url: '/notice?notice.isSystem=true',
    method: 'GET'
  })
}

export const getNotice = (data) => {
  return request({
    url: '/notice?notice.isSystem=false&&bindCourse=true&&cid=' + data,
    method: 'GET'

  })
}

export const FindNoticeById = (id) => {
  return request({
    url: '/notice?notice.nid=' + id,
    method: 'GET'
  })
}

// 修改公告
export const editNotice = (data) => {
  return request({
    url: '/notice',
    method: 'PUT',
    data
  })
}
// 添加公告
export const addNotice = (data) => {
  return request({
    url: '/notice',
    method: 'POST',
    data
  })
}

// 删除公告
export const removeNotice = (id) => {
  return request({
    url: '/notice?id=' + id,
    method: 'DELETE'
  })
}
