<template>
  <div>
    <a-spin :spinning="spinning">
      <el-button type="success" @click="getSignListTrue">查看签到</el-button>
      <el-divider></el-divider>
      <el-steps :active="active" finish-status="success">
        <el-step title="签到类型"></el-step>
        <el-step title="签到内容"></el-step>
        <el-step title="发起签到"></el-step>
      </el-steps>

      <el-form
        :model="signForm"
        label-width="80px"
        style="margin-top: 100px; margin-bottom: 100px; width: 500px"
      >
        <div v-if="active == 0">
          <el-form-item label="签到类型">
            <el-radio-group v-model="signForm.type" border>
              <el-radio-button label="1">密码签到</el-radio-button>
              <el-radio-button label="2">二维码签到</el-radio-button>
              <el-radio-button label="3">收拾签到</el-radio-button>
              <el-radio-button label="4">位置签到</el-radio-button>
              <el-radio-button label="5">拍照签到</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </div>
        <div v-if="active == 1">
          <el-form-item label="签到名称">
            <el-input v-model="signForm.name"></el-input>
          </el-form-item>
          <el-form-item label="截止日期">
            <el-time-picker v-model="signForm.deadline" placeholder="截止日期">
            </el-time-picker>
          </el-form-item>
        </div>
        <div v-if="active == 2">
          <span>确定要提交吗？</span>
        </div>
      </el-form>
      <footer>
        <el-button
          style="margin-top: 12px"
          @click="prev"
          v-if="active == 1 || active == 2"
          >上一步</el-button
        >
        <el-button
          style="margin-top: 12px"
          @click="next"
          v-if="active == 0 || active == 1"
          >下一步</el-button
        >
        <el-button
          style="margin-top: 12px"
          @click="postSignTrue"
          v-if="active == 2"
          >提交</el-button
        >
      </footer>

      <!-- 抽屉 -->
      <el-drawer
        title="签到列表"
        :visible.sync="drawer"
        :with-header="false"
        size="50%"
      >
        <el-table :data="signList">
          <el-table-column
            property="date"
            label="日期"
            width="150"
          ></el-table-column>
          <el-table-column
            property="name"
            label="姓名"
            width="200"
          ></el-table-column>
          <el-table-column property="address" label="地址"></el-table-column>
        </el-table>
      </el-drawer>
    </a-spin>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import { postSign } from "@/api/sign";
export default {
  data() {
    return {
      active: 0,
      signForm: {
        type: 1,
        name: "",
        deadline: new Date(2020, 1, 1, 0, 0),
        cid: 0,
        uid: 0,
      },
      drawer: false,
      spinning: false,
    };
  },
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    prev() {
      this.active--;
      if (this.active < 0) this.active = 0;
    },
    // 发起签到
    async postSignTrue() {
      this.spinning = true;
      this.signForm.uid = this.uid;
      this.signForm.cid = this.$route.params.cid;
      const data = await postSign(this.signForm);
      this.spinning = false;
      console.log(data);
      if (data.code < 0) {
        return this.$message.error("发起失败，请重试");
      }
      this.$message.success("发起成功");
    },
    // 展示签到
    getSignListTrue() {},
  },
  computed: {
    ...mapGetters(["uid"]),
  },
};
</script>

<style lang="scss" scoped>
</style>