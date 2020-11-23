<template>
  <div>
    <a-spin :spinning="spinning" tip="加载中...">
      <div style="margin-left: 11%; margin-right: 11%; padding-top: 30px">
        <a-list :grid="{ gutter: 12, column: 4 }" :data-source="courseList">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-card hoverable style="width: 80%">
              <img
                slot="cover"
                alt="http://lorempixel.com/"
                src="http://lorempixel.com/400/200/abstract"
                @click="handleclick(item.cid)"
              >
              <template slot="actions" class="ant-card-actions">
                <a-icon
                  key="setting"
                  type="edit"
                  @click="showEditCourseVisiable(item.cid)"
                />
                <a-icon key="edit" type="delete" @click="removeCourseTrue(item.cid)" />
              </template>
              <a-card-meta
                :title="item.name"
                :description="item.description"
                @click="handleclick(item.cid)"
              >
                <!--                <a-avatar-->
                <!--                  slot="avatar"-->
                <!--                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"-->
                <!--                />-->
              </a-card-meta>
            </a-card>
          </a-list-item>
        </a-list>
      </div>
    </a-spin>
    <!-- 展示修改课程的dialog -->
    <el-dialog title="修改课程" :visible.sync="EditCourseVisiable" width="30%">
      <a-spin tip="数据马上就来" :spinning="spinning2">
        <el-form :model="EditCourseForm" label-width="80px">
          <el-form-item label="课程名称">
            <el-input v-model="EditCourseForm.name"/>
          </el-form-item>
          <el-form-item label="课程描述">
            <el-input v-model="EditCourseForm.description"/>
          </el-form-item>
          <el-form-item label="课程容量">
            <el-input-number
              v-model="EditCourseForm.capacity"
              :min="1"
              :max="500"
              label="描述文字"
            />
          </el-form-item>
          <el-form-item label="课程学分">
            <el-input-number
              v-model="EditCourseForm.point"
              :min="1"
              :max="10"
              label="描述文字"
            />
          </el-form-item>
        </el-form>
      </a-spin>
      <span slot="footer" class="dialog-footer">
        <el-button @click="EditCourseVisiable = false">取 消</el-button>
        <el-button
          type="primary"
          @click="editCourseTrue"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import {
  getCourse,
  editCourse,
  removeCourse,
  findCourseById
} from '@/api/course'
// import { getSrc } from '@/api/other'

export default {
  data() {
    return {
      courseList: [],
      spinning: false,
      spinning2: false,
      EditCourseVisiable: false,
      EditCourseForm: {
        name: '',
        description: '',
        point: 0,
        capacity: 0,
        cid: 0
      },
      ccid: 0
    }
  },
  computed: {
    ...mapGetters(['name', 'uid'])
  },
  created() {
    this.spinning = true
    getCourse().then((res) => {
      console.log(res)
      this.courseList = res.data.content

      this.spinning = false
    })
  },
  methods: {
    handleclick(cid) {
      this.$router.push('/course/detail/' + cid + '/index')
    },
    // 控制修改课程的dialog的显示与隐藏
    async showEditCourseVisiable(id) {
      this.spinning2 = true
      this.EditCourseVisiable = true
      // console.log(id);
      this.ccid = id
      // console.log(this.ccid);
      const data = await findCourseById(id)
      // console.log(data);
      this.EditCourseForm = data.data.content[0]
      this.spinning2 = false
      // console.log(this.EditCourseForm);
    },

    // 修改课程信息
    async editCourseTrue() {
      this.EditCourseForm.cid = this.ccid
      const data = await editCourse(this.EditCourseForm)
      console.log(data)
      if (data.code < 0) {
        return this.$message.error('修改失败，请重试')
      }
      this.$message.success('修改成功')
      this.EditCourseVisiable = false
      getCourse().then((res) => {
        console.log(res)
        this.courseList = res.data.content
      })
    },
    // 删除课程
    async removeCourseTrue(id) {
      const data = await this.$confirm(
        '此操作将永久删除该课程, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch((err) => err)
      // console.log(data);
      if (data !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const res = await removeCourse(id)
      console.log(res)
      if (res.code < 0) {
        return this.$message.error('删除失败，请重试')
      }
      this.$message.success('删除成功')
      getCourse().then((res) => {
        console.log(res)
        this.courseList = res.data.content
      })
    }
  }
}
</script>

<style scoped>
</style>
