import request from '@/utils/request'

// 根据id查找课程人员
export const findMumberById = (id) => {
  return request({
    url: '/course/data?cid=' + id,
    method: 'GET'
  })
}

export const deleteMumberById = (data) => {
  return request({
    method: 'DELETE',
    url: '/course/data/del?cid=' + data.cid + '&uid=' + data.uid

  })
}

