import request from '@/utils/request'

export const addMember = (data) => {
  return request({
    method: 'POST',
    url: '/section/data/add/single',
    data
  })
}

/*
查 询 群 组 成 员 数 据
 */
export const getGroupMember = (data) => {
  return request({
    method: 'GET',
    url: '/section/data',
    params: {
      seid: data,
      cid: null
    }
  })
}
