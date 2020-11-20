<template>
  <div>

    <a-spin :spinning="spinning" tip="加载中...">
      <div style="margin-left: 11%;margin-right: 11%;padding-top: 30px;">
        <a-list :grid="{ gutter: 3, column: 3 }" :data-source="courseList">

          <a-list-item slot="renderItem" slot-scope="item">
            <a-card  hoverable style="width: 80%">
              <img
                slot="cover"
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                @click="handleclick(item.cid)"
              >
              <template slot="actions" class="ant-card-actions">
                <a-icon key="setting" type="setting"/>
                <a-icon key="edit" type="edit"/>
              </template>
              <a-card-meta @click="handleclick(item.cid)" :title="item.name" :description="item.description">
                <a-avatar
                  slot="avatar"
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
              </a-card-meta>
            </a-card>
          </a-list-item>
        </a-list>


      </div>
    </a-spin>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getCourse } from '@/api/course'

export default {
  data() {
    return {
      courseList: [],
      spinning: false
    }
  },
  computed: {
    ...mapGetters(['name', 'uid'])
  },
  created() {
    this.spinning = true
    getCourse().then((res) => {
      console.log(res)
      this.courseList = res.data.content
      this.spinning = false
    })
  },
  methods: {
    handleclick(cid) {
      this.$router.push('/course/detail/' + cid + '/index')
    }
  }
}
</script>

<style scoped>

</style>
