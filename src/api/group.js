import request from '@/utils/request'

export const getGroup = (data) => {
    return request({
        method: 'GET',
        url: '/section',
        params: { name: data }


    })
}
export const addGroup = (data) => {
    return request({
        method: 'POST',
        url: '/section',
        data
    })
}
export const deleteGroup = (id) => {
    return request({
        method: 'DELETE',
        url: '/section/?id=' + id,

    })
}
