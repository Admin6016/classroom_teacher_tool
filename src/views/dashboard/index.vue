<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="24">
        <div class="top-item">
          <div class="top-item-1">
            <img
              class="top-item-icon"
              src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
              alt=""
            >
          </div>
          <div class="top-item-2">
            <div class="dashboard-text">{{ words_time }}{{ name }}</div>
            <div class="dashboard-text1">中原工学院 || 彼得堡航空学院</div>
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="xiangqing">
          <div>
            <a-spin :spinning="spinning" tip="用户修改中">
              <a-card title="资料" :bordered="true" style="width: 100%">
                <a-spin :spinning="spinning_c" tip="用户信息加载中">
                  <a-descriptions title="用户信息">
                    <a-descriptions-item label="用户名">
                      {{ user.username }}
                      <el-popover
                        v-model="visible"
                        placement="right-end"
                        width="160"
                        trigger="manual"
                      >
                        <div>
                          <el-input
                            v-model="user.username"
                            prefix-icon="el-icon-s-data"
                            size="mini"
                            placeholder="输入要修改的值"
                          />
                          <div style="margin-top: 10px;">
                            <el-button
                              size="mini"
                              type="info"
                              @click="visible = false"
                            >取消
                            </el-button>
                            <el-button
                              style="margin-left: 21px"
                              type="primary"
                              size="mini"
                              @click="editUserTrue"
                            >确定
                            </el-button>
                          </div>
                        </div>

                        <el-button
                          slot="reference"
                          icon="el-icon-edit"
                          circle
                          size="mini"
                          @click="visible = true"
                        />
                      </el-popover>
                    </a-descriptions-item>
                    <a-descriptions-item label="手机号">
                      {{ user.telephone }}
                      <el-popover
                        v-model="visible1"
                        placement="right-end"
                        width="160"
                        trigger="manual"
                      >
                        <div>
                          <el-input
                            v-model="user.telephone"
                            prefix-icon="el-icon-s-data"
                            size="mini"
                            placeholder="输入要修改的值"
                          />
                          <div style="margin-top: 10px;">
                            <el-button
                              size="mini"
                              type="info"
                              @click="visible1 = false"
                            >取消
                            </el-button>
                            <el-button
                              style="margin-left: 21px"
                              type="primary"
                              size="mini"
                              @click="editUserTrue"
                            >确定
                            </el-button>
                          </div>
                        </div>

                        <el-button
                          slot="reference"
                          icon="el-icon-edit"
                          circle
                          size="mini"
                          @click="visible1 = true"
                        />
                      </el-popover>
                    </a-descriptions-item>
                    <a-descriptions-item label="位置">
                      {{ user.location }}
                      <el-popover
                        v-model="visible2"
                        placement="right-end"
                        width="160"
                        trigger="manual"
                      >
                        <div>
                          <el-input
                            v-model="user.location"
                            prefix-icon="el-icon-s-data"
                            size="mini"
                            placeholder="输入要修改的值"
                          />
                          <div style="margin-top: 10px;">
                            <el-button
                              size="mini"
                              type="info"
                              @click="visible2 = false"
                            >取消
                            </el-button>
                            <el-button
                              style="margin-left: 21px"
                              type="primary"
                              size="mini"
                              @click="editUserTrue"
                            >确定
                            </el-button>
                          </div>
                        </div>

                        <el-button
                          slot="reference"
                          icon="el-icon-edit"
                          circle
                          size="mini"
                          @click="visible2 = true"
                        />
                      </el-popover>
                    </a-descriptions-item>
                    <a-descriptions-item label="性别">
                      {{ user.sex }}
                    </a-descriptions-item>
                    <a-descriptions-item label="备注">
                      {{ input }}
                      <el-popover
                        v-model="visible3"
                        placement="right-end"
                        width="160"
                        trigger="manual"
                      >
                        <div>
                          <el-input
                            v-model="user.note"
                            prefix-icon="el-icon-s-data"
                            size="mini"
                            placeholder="输入要修改的值"
                          />
                          <div style="margin-top: 10px;">
                            <el-button
                              size="mini"
                              type="info"
                              @click="visible3 = false"
                            >取消
                            </el-button>
                            <el-button
                              style="margin-left: 21px"
                              type="primary"
                              size="mini"
                            >确定
                            </el-button>
                          </div>
                        </div>

                        <el-button
                          slot="reference"
                          icon="el-icon-edit"
                          circle
                          size="mini"
                          @click="visible3 = true"
                        />
                      </el-popover>
                    </a-descriptions-item>
                  </a-descriptions>
                </a-spin>
              </a-card>
            </a-spin>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div style="padding: 30px">
          <a-card title="消息" :bordered="true" style="width: 100%">
            <a-list item-layout="horizontal" :data-source="this.data_">
              <a-list-item slot="renderItem" slot-scope="item, index">
                <a-list-item-meta
                  :description="item.desc"
                >
                  <a slot="title" href="#">{{
                      item.title
                    }}</a>
                  <a-avatar
                    slot="avatar"
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  />
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div style="padding: 30px">
          <a-card title="课程分数" :bordered="false" style="width: 100%">

            <div id="container"/>

          </a-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { _deepClone } from 'lodash'
// eslint-disable-next-line no-unused-vars
import { Chart, getTheme } from '@antv/g2'
import { mapGetters } from 'vuex'
import { getUserById, editUser } from '@/api/user'
import { getCourse } from '@/api/course'
import { getPublicNotice } from '@/api/notice'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name', 'uid']),
    words_time() {
      const hour = new Date().getHours()
      if (hour < 3) {
        return '夜深了，'
      }
      if (hour < 6) {
        return '凌晨了，'
      }
      if (hour < 11) {
        return '上午好，'
      }
      if (hour < 14) {
        return '中午好，'
      }
      if (hour < 17) {
        return '下午好，'
      }
      if (hour < 20) {
        return '傍晚了，'
      }
      return '晚上好，'
    }
  },
  data() {
    return {
      visible: false,
      visible1: false,
      visible2: false,
      visible3: false,
      input: '',
      course_data: [],
      data_: [
        {
          title: '无标题',
          desc: '无描述'
        }
      ],
      user: {},
      spinning_c: false,
      spinning: false
    }
  },
  mounted() {
    getPublicNotice().then((res) => {
      this.data_ = res.data.content
      for (let i in this.data_) {
        this.data_[i].desc = this.data_[i].context
      }
      console.log(this.data_)
    })
    this.renderUser()

    getCourse().then((res) => {
      this.course_data = res.data.content
      this.renderPic()
      // this.course_data = res.data.content;
    })
  },
  methods: {
    renderPic() {
      const chart = new Chart({
        container: 'container',
        autoFit: true,
        height: 300
      })
      chart.data(this.course_data)
      chart.coordinate('polar')
      chart.legend('name', {
        position: 'right'

      })
      chart.axis(false)
      chart.tooltip({
        showMarkers: false
        // showTitle: true,
      })
      chart.interaction('element-highlight')
      chart
        .interval()
        .position('name*point')
        .color('name')
        .style({
          lineWidth: 1,
          stroke: '#fff'
        })
      chart.render()
    },
    // 渲染用户信息
    renderUser() {
      this.spinning_c = true
      getUserById(this.uid).then((res) => {
        this.user = res.data.content[0]
        this.spinning_c = false
      })
    },
    // 修改用户
    async editUserTrue() {
      this.spinning = true
      this.visible = false
      this.visible1 = false
      this.visible2 = false
      this.visible3 = false

      const data = await editUser(this.user)
      // console.log(data);
      if (data.code < 0) {
        return this.$message.error('修改失败')
      }
      this.spinning = false
      this.$message.success('修改成功')
    }
  }
}
</script>

<style lang="scss" scoped>
//.app-main{
//  background-color: #fff;
//}
.dashboard {
  &-container {
    //margin: 30px;
    //padding-left: 30px;
    //padding-right: 30px;
    padding-bottom: 100px;
    width: 100%;
    height: 100%;
    background: #ececec;

    .top-item {
      // height: 72px;
      padding-top: 20px;
      padding-left: 20px;
      background-color: #fff;
      display: flex;
      justify-content: flex-start;
      padding-bottom: 20px;

      .top-item-1 {
        .top-item-icon {
          height: 72px;
          width: 72px;
          margin-right: 24px;
        }
      }

      .top-item-2 {
        .dashboard-text {
          font-size: 28px;
        }
        .dashboard-text1 {
          font-size: 14px;
        }
      }
    }
    .xiangqing {
      margin-top: 30px;
      margin-left: 30px;
      margin-right: 30px;
    }
  }
}
</style>
