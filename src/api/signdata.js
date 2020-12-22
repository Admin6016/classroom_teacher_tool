import request from '@/utils/request'

// 获取以及签到的用户
export const getFinshSign = (data) => {
    return request({
        url: '/sign/data/get/signed?cid=' + data.cid + '&siid=' + data.siid + '&size=999',
        method: 'GET'
    })
}

//获取未签到的学生
export const getUnFinshSign = (data) => {
    return request({
        url: '/sign/data/get/nonsign?size=999' + '&siid=' + data.siid + '&cid=' + data.cid,
        method: 'GET'
    })
}