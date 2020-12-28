<template>
  <div>
    <a-spin style="padding:50px" :spinning="spinning">
      <el-table :data="userlist" stripe style="width: 100%">
        <el-table-column
          label="日期"
          width="180"
        >
          <template slot-scope="scope">
            {{ scope.row.creatTime.substr(0, 10) }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="280">
        </el-table-column>
        <el-table-column prop="number" label="学号" width="280">
        </el-table-column>
        <el-table-column prop="location" label="地址" width="280">
        </el-table-column>
        <el-table-column prop="telephone" label="电话" width="380">
        </el-table-column>
        <el-table-column
          prop="number"
          label="管理"
        >
          <template slot-scope="scope">
            <el-popover
              placement="bottom"
              :title="scope.row.name"
              width="200"
              trigger="click"
              :content="`
            该学生为${scope.row.sex}性，所属地区是${scope.row.location}，其用户ID是${scope.row.uid}，状态正常`"
            >
              <el-button slot="reference" type="primary" size="small">查看</el-button>
            </el-popover>

            <el-popconfirm
              title="确定要删掉这位学生吗?"
              @onConfirm="removeTrue"
            >
              >
              <el-button type="primary" size="mini" @click="visible = false"
              >确定
              </el-button
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
