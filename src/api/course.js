import request from '@/utils/request'

export function getCourse() {
  return request({
    url: '/teacher/course',
    method: 'get'
    // params: { token }
  })
}

export const addCourse = (data) => {
  return request({
    url: '/course',
    method: 'POST',
    data

  })
}



