import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getUserById(id) {
  return request({
    url: '/user?uid=' + id,
    method: 'get'
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

// 修改用户名
export const editUser = (data) => {
  return request({
    url: '/user',
    method: 'PUT',
    data
  })
}
