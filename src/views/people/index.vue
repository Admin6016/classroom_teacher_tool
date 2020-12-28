<template>
  <div>
    <a-spin :spinning="spinning">
      <el-button icon="el-icon-plus" circle @click="addStuToCourse"></el-button>
      <el-table :data="userlist" stripe style="width: 100%; margin-top: 2%">
        <el-table-column prop="name" label="姓名" width="280">
        </el-table-column>
        <el-table-column prop="number" label="学号" width="280">
        </el-table-column>
        <el-table-column prop="location" label="地址" width="280">
        </el-table-column>
        <el-table-column prop="telephone" label="电话" width="380">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-popconfirm
              title="确定要删出这位学生吗?"
              @onConfirm="removeTrue"
            >
              >
              <el-button type="primary" size="mini" @click="visible = false"
                >确定ddd</el-button
              >
              <el-button
                slot="reference"
                type="danger"
                icon="el-icon-delete"
                circle
                @click="removeFromCourse(scope.row.uid)"
              ></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </a-spin>
  </div>
</template>
<script>
import { getCourseStu, removeFromCourseTrue } from "@/api/coursedata";
export default {
  data() {
    return {
      userlist: [],
      cid: 0,
      uid: 0,
      spinning: false,
      removeForm: {
        cid: 0,
        uid: 0,
      },
    };
  },
  created() {
    this.getStuList();
  },
  methods: {
    async getStuList() {
      this.cid = parseInt(this.$route.params.cid);
      const data = await getCourseStu(this.cid);
      console.log(data);
      this.userlist = data.data.content;
    },
    removeFromCourse(id) {
      this.uid = id;
    },
    async removeTrue() {
      this.spinning = true;
      this.removeForm.cid = this.cid;
      this.removeForm.uid = this.uid;
      // console.log(this.removeForm);
      const data = await removeFromCourseTrue(this.removeForm);
      console.log(data);
      this.getStuList();
      this.spinning = false;
    },
  },
};
</script>

<style scoped>
</style>