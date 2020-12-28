<template>
  <div style="padding: 50px">
    <h2>系统开关（允许使用）
      <el-switch
        v-model="value"
        style="margin-left: 100px"
        active-color="#13ce66"
        inactive-color="#ff4949"
      />
    </h2>
    <p>该配置可以决定，系统是否允许任何用户使用该系统，可用于维护处理</p>

    <h2 style="margin-top: 50px">是否只读（保护模式）
      <el-switch
        v-model="value1"
        style="margin-left: 100px"
        active-color="#13ce66"
        inactive-color="#ff4949"
      />
    </h2>
    <p>该配置可以决定，系统是否只能读取数据，而禁止一切修改操作</p>
  </div>
</template>

<script>
import { saveSettings, getSettings } from '@/api/settings'

export default {
  name: 'Index',
  data() {
    return {
      value: true,
      value1: false
    }
  },
  watch: {
    value(nv) {
      saveSettings({ name: 'run', value: nv ? 'true' : 'false' })
    },
    value1(nv1) {
      saveSettings({ name: 'onlyread', value: nv1 ? 'true' : 'false' })
    }
  },
  async mounted() {
    const res = await getSettings('run')
    if (res.data.content[0].value === 'true') {
      this.value = true
    } else {
      this.value = false
    }

    const res2 = await getSettings('onlyread')
    if (res2.data.content[0].value === 'true') {
      this.value1 = true
    } else {
      this.value1 = false
    }
  }

}
</script>

<style scoped>

</style>
