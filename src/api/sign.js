import request from '@/utils/request'

// 发起签到
export const postSign = (data) => {
    return request({
        url: '/sign',
        method: 'POST',
        data
    })
}


// 获取签到列表

export const getSignList = (data) => {
    return request({
        url: '/sign',
        method: 'GET',
        params: { data }
    })
}