<template>
  <div>
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
    async postSignTrue() {
      this.signForm.uid = this.uid;
      this.signForm.cid = this.$route.params.cid;
      const data = await postSign(this.signForm);
      console.log(data);
    },
  },
  computed: {
    ...mapGetters(["uid"]),
  },
};
</script>

<style lang="scss" scoped>
</style>