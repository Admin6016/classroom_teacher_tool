<template>
  <div>
    <el-tabs :tab-position="tabPosition" style="height: 200px">
      <el-tab-pane label="公告管理"><coursex></coursex></el-tab-pane>
      <el-tab-pane label="群组管理"><group></group></el-tab-pane>
      <el-tab-pane label="人员管理"><people /></el-tab-pane>
      <el-tab-pane label="签到管理"><sign /></el-tab-pane>
      <el-tab-pane label="作业管理"><homework /></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import coursex from "@/views/coursex/index";
import group from "@/views/group/index";
import people from "@/views/people/index";
import sign from "@/views/sign/index";
import homework from "@/views/homework/index";
export default {
  components: {
    coursex,
    group,
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

