<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div class="dashboard-text">id: {{ uid }}</div>
    <a-card hoverable style="width: 300px">
      <img
        slot="cover"
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
      <template slot="actions" class="ant-card-actions">
        <a-icon key="setting" type="setting" />
        <a-icon key="edit" type="edit" />
        <a-icon key="ellipsis" type="ellipsis" />
      </template>
      <a-card-meta title="Card title" description="This is the description">
        <a-avatar
          slot="avatar"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
      </a-card-meta>
    </a-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name', 'uid'])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
