<template>
  <div>
    <el-alert
      :closable="false"
      title="从学号添加"
      class="item"
      type="info"
    />
    <el-input
      v-model="number"
      class="item"
      style="width: 60%;margin-left: 20%;margin-right: 20%"
      placeholder="请输入学号"
      type="number"
      prefix-icon="el-icon-user"
    >
      <el-button slot="append" :loading="load1" icon="el-icon-plus" @click="addOne">添加到群组</el-button>
    </el-input>
    <el-alert
      :closable="false"
      class="item"
      title="新建人员添加"
      type="success"
    />
  </div>
</template>
<script>
import { addMember } from '@/api/groupdata'

export default {
  props: {
    seid: {
      type: Number,
      default: '1'
    }
  },
  data() {
    return {
      load1: false,
      number: ''
    }
  },
  mounted() {
    // TODO
  },
  methods: {
    addOne() {
      this.load1 = true
      setTimeout(() => {
        this.load1 = false
      }, 5000)
      const data = { seid: this.seid, uid: this.number }
      addMember(data).then((res) => {
        this.load1 = false
        this.$message({
          showClose: true,
          message: res.description,
          type: 'success'
        })
      })
    }
  }
}
</script>

<style scoped>
.item {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
<!--<style scoped></style>-->
<!--<style scoped src="src/assets/css/icon.css"></style>-->

