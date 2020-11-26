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
        url: '/log?page=' + data,
        method: 'GET'
    })
}
// 根据id查
export const getLogById = (data) => {
    return request({
        url: '/log?opid=' + data,
        method: 'GET'
    })
}

