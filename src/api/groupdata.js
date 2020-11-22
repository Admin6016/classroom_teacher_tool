import request from '@/utils/request'

export const addMember = (data) => {
  return request({
    method: 'POST',
    url: '/section/data/add/single',
    data
  })
}
