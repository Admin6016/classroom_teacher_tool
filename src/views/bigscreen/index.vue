<template>
  <div style="margin: 0">
    <dv-full-screen-container style="background-color: #000244">
      <dv-border-box-11 title="签到情况">
        <dv-border-box-8 style="width: 20%;height: 20%">
          <dv-active-ring-chart :config="config" style="width:200px;height:200px"/>
        </dv-border-box-8>
        <dv-border-box-8 style="width: 30%;height: 20%">
          <dv-active-ring-chart :config="config" style="width:200px;height:200px"/>
        </dv-border-box-8>
      </dv-border-box-11>

    </dv-full-screen-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      config: [
        {
          name: '周口',
          value: 55
        },
        {
          name: '南阳',
          value: 120
        },
        {
          name: '西峡',
          value: 78
        },
        {
          name: '驻马店',
          value: 66
        },
        {
          name: '新乡',
          value: 80
        }
      ]
    }
  }
}</script>

<style scoped>
</style>
