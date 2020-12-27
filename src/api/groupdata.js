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
    url: '/section/data?size=90000',
    params: {
      seid: data,
      cid: null
    }
  })
}

/*
删除某成员
 */
export const deleteGroupMember = (data) => {
  return request({
    method: 'DELETE',
    url: '/section/data/del/single',
    params: {
      uid: data.uid,
      seid: data.seid
    }
  })
}
