import request from '@/utils/request'


export const postSign = (data) => {
    return request({
        url: '/sign',
        method: 'POST',
        data
    })
}