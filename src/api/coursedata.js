import request from '@/utils/request'



// 获取课程所有人
export const getCourseStu = (data) => {
    return request({
        url: '/section/data?cid=' + data + '&size=' + '999',
        method: 'GET'
    })
}


// 从课程中删人
export const removeFromCourseTrue = (data) => {
    return request({
        url: '/course/data/del?cid=' + data.cid + '&uid=' + data.uid,
        method: 'DELETE'
    })
}