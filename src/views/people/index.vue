<template>
  <div>
    <a-spin :spinning="spinning">
      <el-button icon="el-icon-plus" circle @click="addStuToCourse"/>
      <el-table :data="userlist" stripe style="width: 100%; margin-top: 2%">
        <el-table-column prop="name" label="姓名" width="150"/>
        <el-table-column prop="number" label="学号" width="200"/>
        <el-table-column prop="location" label="地址" width="280"/>
        <el-table-column prop="telephone" label="电话" width="250"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-popconfirm
              title="确定要删这位学生吗?"
              @onConfirm="removeTrue"
            >
              <el-button
                slot="reference"
                type="danger"
                icon="el-icon-delete"
                circle
                @click="removeFromCourse(scope.row.uid)"
              />
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </a-spin>
    <el-dialog title="添加学生" :visible.sync="dialogVisible" width="50%">
      <el-alert title="通过学号添加学生" type="info"/>
      <div style="margin-top: 15px; margin-bottom: 15px">
        <el-input
          v-model="input"
          placeholder="请输入学生学号"
          clearable
          style="width: 50%"
        >
          <el-button
            slot="append"
            icon="el-icon-plus"
            @click="addStuForCourseTrue"
          />
        </el-input>
      </div>

      <el-alert title="通过群组添加学生" type="success"/>
      <el-select
        v-model="value1"
        multiple
        placeholder="请选择要添加的群组"
        style="width: 30%"
      >
        <el-option
          v-for="item in options"
          :key="item.seid"
          :label="item.name"
          :value="item.seid"
        />
      </el-select>
      <el-button
        icon="el-icon-plus"
        @click="addGroupForCourseTrue"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getCourseStu,
  removeFromCourseTrue,
  addStuForCourse
} from '@/api/coursedata'
import { getGroup } from '@/api/group'

export default {
  data() {
    return {
      // 全部的群组信xi
      options: [],
      userlist: [],
      cid: 0,
      uid: 0,
      spinning: false,
      dialogVisible: false,
      input: '',
      removeForm: {
        cid: 0,
        uid: 0
      },
      value1: 0
    }
  },
  created() {
    this.getAllGroup()
    this.getStuList()
  },
  methods: {
    async getStuList() {
      this.cid = parseInt(this.$route.params.cid)
      const data = await getCourseStu(this.cid)
      console.log(data)
      this.userlist = data.data.content
    },
    removeFromCourse(id) {
      this.uid = id
    },
    async removeTrue() {
      this.spinning = true
      this.removeForm.cid = this.cid
      this.removeForm.uid = this.uid
      // console.log(this.removeForm);
      const data = await removeFromCourseTrue(this.removeForm)
      console.log(data)
      this.getStuList()

      this.spinning = false
    },
    addStuToCourse() {
      this.dialogVisible = true
      console.log('455')
    },
    // 得到所有群组
    async getAllGroup() {
      const data = await getGroup()
      console.log(data)
      this.options = data.data.content
    },
    // 通过添加群组增加学生
    addGroupForCourseTrue() {
      console.log(this.value1)
    },
    // 通过学号添加单个学生
    addStuForCourseTrue() {
      console.log(this.input)
    }
  }
}
</script>

<style scoped>
</style>
