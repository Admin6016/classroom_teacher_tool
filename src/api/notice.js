import request from '@/utils/request'


export const getNotice = (data) => {
    return request({
        url: "/notice?notice.isSystem=false&&bindCourse=true&&cid=" + data,
        method: 'GET',

    })
}

export const FindNoticeById = (id) => {
    return request({
        url: '/notice?notice.nid=' + id,
        method: 'GET'
    })
}

// 修改公告
export const editNotice = (data) => {
    return request({
        url: '/notice',
        method: 'PUT',
        data
    })
}