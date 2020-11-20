<template>
  <div>
    <el-tabs :tab-position="tabPosition" style="height: 200px;">
      <el-tab-pane label="公告管理">111</el-tab-pane>
      <el-tab-pane label="人员管理">111</el-tab-pane>
      <el-tab-pane label="签到管理">111</el-tab-pane>
      <el-tab-pane label="作业管理">111</el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>

export default {
  data() {
    return {
      tabPosition: 'right'
    }
  }
}
</script>

