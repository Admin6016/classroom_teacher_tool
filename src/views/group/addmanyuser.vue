<template>
  <div>
    <center>
      <el-upload
        style="width: 100%"
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将excel文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传xls/xlsx文件，且不超过500kb</div>
      </el-upload>
    </center>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  }
}
</script>

<style scoped>
</style>
