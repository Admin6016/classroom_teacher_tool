import request from '@/utils/request'

// 获 取 配 置
export const getSettings = (data) => {
  return request({
    url: '/setting?name=' + data,
    method: 'GET'
  })
}

// 修 改 配 置
export const saveSettings = (data) => {
  return request({
    method: 'POST',
    url: '/setting',
    data
  })
}

