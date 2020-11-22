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

// 修改课程
export const editCourse = (data) => {
  return request({
    url: '/course',
    method: 'PUT',
    data
  })
}



// 删除课程
export const removeCourse = (id) => {
  return request({
    url: '/course/?id=' + id,
    method: 'DELETE'
  })
}


// 根据id查找课程
export const findCourseById = (id) => {
  return request({
    url: '/course?cid=' + id,
    method: 'GET'
  })
}
