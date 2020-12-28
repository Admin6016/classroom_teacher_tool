import request from '@/utils/request'

// 根据id查找课程人员
export const getCourseStu = (id) => {
  return request({
    url: '/course/data?cid=' + id + "&size=999",
    method: 'GET'
  })
}
// 删除
export const removeFromCourseTrue = (data) => {
  return request({
    method: 'DELETE',
    url: '/course/data/del?cid=' + data.cid + '&uid=' + data.uid

  })
}


// 为课程单个添加学生
export const addStuForCourse = (data) => {
  return request({
    url: '/course/data/add?cid=' + data.cid + '&uid=' + data.uid,
    method: 'POST'
  })
}


