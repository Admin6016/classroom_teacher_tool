<template>
  <div>
    <el-card v-loading="loading" class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ name }} - 签到页面</span>
        <el-button @click="trysign" style="float: right; padding: 3px 0" type="text">签到</el-button>
      </div>
      <div>
        <el-alert
          title="若提交超时，请重新扫描二维码填写！"
          type="warning"
          style="margin-bottom: 10px"
          show-icon
        />

        <el-input v-model="number" placeholder="请输入学号" type="number">
          <template slot="prepend">学号</template>
        </el-input>

      </div>
    </el-card>
  </div>
</template>

<script>
import { finishSign } from '@/api/signdata'

export default {
  name: 'Index',
  data() {
    return {
      loading: false,
      number: ''
    }
  },
  computed: {
    siid() {
      return this.$route.query.siid
    },
    name() {
      return this.$route.query.name
    },
    flag() {
      return this.$route.query.flag
    }
  },
  mounted() {
    document.body.style.backgroundImage = 'linear-gradient(15deg, #13547a 0%, #80d0c7 100%)'
  },
  methods: {
    async trysign() {
      this.loading = true
      const res = await finishSign({ number: this.number, siid: this.siid, data: this.flag })
      console.log(res)
      this.loading = false
      if (res.code === 0) {
        this.$notify({
          title: '成功',
          message: res.description || '成功',
          type: 'success'
        })
      }
    }
  }
}
</script>

<style scoped>
.box-card {
  width: 90%;
  margin-left: 5%;
  margin-top: 10px;
  min-width: 300px;
}
</style>
