<template>
  <div>
    <el-tabs :tab-position="tabPosition" style="height: 800px">
      <el-tab-pane label="公告管理"><coursex></coursex></el-tab-pane>

      <el-tab-pane label="人员管理"><people /></el-tab-pane>
      <el-tab-pane label="签到管理"><sign /></el-tab-pane>
      <el-tab-pane label="作业管理"><homework /></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import coursex from "@/views/coursex/index";

import people from "@/views/people/index";
import sign from "@/views/sign/index";
import homework from "@/views/homework/index";
export default {
  components: {
    coursex,

    people,
    sign,
    homework,
  },
  data() {
    return {
      tabPosition: "right",
    };
  },
};
</script>

