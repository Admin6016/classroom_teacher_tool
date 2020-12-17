import request from '@/utils/request'

// 发起签到条目
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
        url: '/sign?uid=' + data.uid + '&cid=' + data.cid,
        method: 'GET',

    })
}


// 给签到添加群组
export const addPeopleForSign = (data) => {
    return request({
        url: '/sign/data/add/section?cid=' + data.cid + '&seid=' + data.seid + '&siid=' + data.siid,
        method: 'POST',

    })
}