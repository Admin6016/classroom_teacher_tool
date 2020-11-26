<template>
  <div>
    <center>
      <el-upload
        style="width: 100%"
        drag
        :before-upload="handleUpload"
        action="default"
      >
        <i class="el-icon-upload"/>
        <div class="el-upload__text">将excel文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件，且不超过500kb</div>

      </el-upload>

      <div style="margin-top: 15px;">
        <el-table v-bind="table">
          <el-table-column
            v-for="(item, index) in table.columns"
            :key="index"
            :prop="item.prop"
            :label="item.label"
          />
        </el-table>
      </div>
    </center>
  </div>
</template>
<script>
export default {
  data() {
    return {
      table: {
        columns: [],
        data: [],
        size: 'mini',
        stripe: true,
        border: true
      }
    }
  },
  methods: {
    handleUpload(file) {
      this.$import.xlsx(file)
        .then(({ header, results }) => {
          this.table.columns = header.map(e => {
            return {
              label: e,
              prop: e
            }
          })
          this.table.data = results
        })
      return false
    }
  }
}
</script>

<style scoped>
</style>
