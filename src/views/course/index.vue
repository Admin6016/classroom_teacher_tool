<template>
  <div>
    <div style="margin-left: 20px;margin-right: 20px;">
    <a-list :grid="{ gutter: 16, column: 3 }" :data-source="courseList">
      <a-list-item slot="renderItem" slot-scope="item">
        <!--        <a-card :title="item.title">-->
          <!--          Card content-->
          <!--        </a-card>-->
        <a-card hoverable style="width: 300px">
          <img
            slot="cover"
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          >
          <template slot="actions" class="ant-card-actions">
            <a-icon key="setting" type="setting" />
            <a-icon key="edit" type="edit" />
            <a-icon key="ellipsis" type="ellipsis" />
          </template>
          <a-card-meta :title="item.name" description="This is the description">
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </a-card-meta>
        </a-card>
      </a-list-item>
    </a-list>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getCourse } from '@/api/course'

export default {
  data() {
    return {
      courseList: []
    }
  },
  computed: {
    ...mapGetters(['name', 'uid'])
  },
  created() {
    getCourse().then((res) => {
      console.log(res)
      this.courseList = res.data.content
    })
  }
}
</script>

<style scoped>

</style>
