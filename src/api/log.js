import request from '@/utils/request'

export const getLog = () => {
    return request({
        url: '/log',
        method: 'GET',

    })
}

//根据页面值获取日志
export const getLogByPagSize = (data) => {
    return request({
        url: '/log?size=' + data,
        method: 'GET'
    })
}

// 根据页码值获取日志
export const getLogByPagNumber = (data) => {
  return request({
    url: '/log?page=' + (data - 1),
    method: 'GET'
  })
}

export const getLogByParams = (data) => {
  return request({
    url: '/log',
    method: 'GET',
    params: {
      page: data.page ? data.page : 0,
      size: data.size ? data.size : 20
    }
  })
}
// 根据id查
export const getLogById = (data) => {
  return request({
    url: '/log?opid=' + data,
    method: 'GET'
  })
}

