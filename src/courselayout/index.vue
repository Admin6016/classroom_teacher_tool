<template>
  <div>
    <div class="border">
      <!--   不太好看 暂时取消了    style="height: 800px"-->
      <el-tabs :tab-position="tabPosition">
        <el-tab-pane label="公告管理">
          <coursex></coursex>
        </el-tab-pane>

        <el-tab-pane label="人员管理">
          <people/>
        </el-tab-pane>
        <el-tab-pane label="签到管理">
          <sign/>
        </el-tab-pane>
        <el-tab-pane label="作业管理">
          <homework/>
        </el-tab-pane>
      </el-tabs>
    </div>
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
    homework
  },
  data() {
    return {
      tabPosition: 'right'
    }
  }
};
</script>
<style scoped>
.border {
  padding: 30px;
}
</style>

