import request from '@/utils/request'
import { data } from 'autoprefixer'

// 发起签到条目
export const postSign = (data) => {
    return request({
        url: '/sign',
        method: 'POST',
        data
    })
}

export const getOneSign = (data) => {
  return request({
    url: '/sign?siid=' + data.siid,
    method: 'GET'

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

//簽到時 獲取學生列表
export const getStudent = () => {
    return request({
        url: '/user?role=' + 'student',
        method: 'GET'

    })
}

// 根據姓名按需查找學生
export const getStudentByName = (data) => {
    return request({
        url: '/user?role=' + 'student' + '&name=' + data.name,
        method: 'GET'
    })
}

// 給簽到添加個人
export const addSinglePeopleForSign = (data) => {
    return request({
        url: '/sign/data/add/single?cid=' + data.cid + '&siid=' + data.siid + '&uid=' + data.uid,
        method: 'POST'
    })
}


