<template>
  <div class="add-container">
    <el-card class="box-card">
      <el-form :model="addCourseForm" label-width="80px">
        <el-form-item label="课程名称" required>
          <el-input v-model="addCourseForm.name" clearable/>
        </el-form-item>
        <el-form-item label="课程容量" required>
          <el-input v-model="addCourseForm.capacity" clearable type="number">
            <template slot="append">人</template>
          </el-input>
        </el-form-item>
        <el-form-item label="学分" required>
          <el-input v-model="addCourseForm.point" clearable type="number">
            <template slot="append">分</template>
          </el-input>
        </el-form-item>
        <el-form-item label="课程描述" required>
          <el-input
            v-model="addCourseForm.description"
            type="textarea"
            rows="3"
            clearable
          />
        </el-form-item>
        <div class="btn-form">
          <el-button
            type="primary"
            :loading="load11"
            @click="addCourseSubmit"
          >立即创建
          </el-button>
          <el-button>取消</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { addCourse } from '@/api/course'

export default {
  name: 'Add',
  data() {
    return {
      load11: false,
      addCourseForm: {
        capacity: '',
        description: '',
        name: '',
        point: '',
        uid: 0
      }
    }
  },
  computed: {
    ...mapGetters(['uid'])
  },
  methods: {
    async addCourseSubmit() {
      this.load11 = true
      this.addCourseForm.uid = this.uid
      const { data } = await addCourse(this.addCourseForm)
      console.log(data)
      this.$message.success('添加成功')
      this.load11 = false
      this.$router.push('/course/index')
    }
  }
}
</script>

<style scoped lang="scss">
.add-container {
  margin: auto;
  margin-top: 70px;
  background-color: #fff;
  width: 500px;
  .box-card {
    width: 510px;
    .btn-form {
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
