<template>
  <div>
    <a-spin :spinning="spinning">
      <el-button type="success" @click="getSignListTrue">查看签到</el-button>
      <el-divider />
      <el-steps :active="active" finish-status="success">
        <el-step title="签到类型" />
        <el-step title="签到内容" />
        <el-step title="发起签到" />
      </el-steps>

      <el-form
        :model="sign"
        label-width="80px"
        style="margin-top: 50px; margin-bottom: 60px; width: 100%"
      >
        <div v-if="active == 0">
          <el-form-item>
            <el-radio-group
              v-model="sign.kind"
              border
              style="width: 48%; margin-left: 26%; margin-right: 26%;margin-bottom:50px"
            >
              <el-radio-button label="1">密码签到</el-radio-button>
              <el-radio-button label="5">二维码签到</el-radio-button>
              <el-radio-button label="4">手势签到</el-radio-button>
              <el-radio-button label="3">位置签到</el-radio-button>
              <el-radio-button label="2">拍照签到</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form-item>

          <div style="margin-top: 100px; width: 20%; margin: auto">
            <el-form-item label="签到名称">
              <el-input v-model="sign.name" :style="item_style"/>
            </el-form-item>
            <el-form-item label="截止日期">
              <el-time-picker v-model="sign.deadline" :style="item_style" placeholder="截止日期"/>
            </el-form-item>
          </div>

          <div
            v-if="sign.kind == 1"
            style="margin-top: 60px; width: 20%; margin: auto"
          >
            <el-form-item label="签到密码">
              <el-input
                type="password"
                v-model="sign.data"
                placeholder="请输入签到密码"
                :style="item_style"
                maxlength="4"
                show-word-limit
                clearable
              />
            </el-form-item>

          </div>
          <div
            v-if="sign.kind == 4"
            style="margin-top: 60px; width: 200px; margin: auto"
          >
            <el-alert :style="item_style" title="请输入手势密码" type="warning" center show-icon/>

            <canvas-lock
              ref="canvas"
              :disbaled="false"
              @drawEnd="drawEnd($event)"
            />
          </div>
          <div v-if="sign.kind==5">
            <el-form-item label="签到周期" style="width:20%;margin:auto">
              <el-select :style="item_style" v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options5"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div
          v-if="active == 1"
          style="width: 44%; margin-left: 28%; margin-right: 28%"
        >
          <el-select v-model="value1" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.seid"
              :label="item.name"
              :value="item.seid"
            />
          </el-select>
        </div>
        <div v-if="active == 2">
          <span>确定要提交吗？</span>
        </div>
      </el-form>
      <footer style="width: 50%;margin-left: 25%;margin-right: 25%">
        <el-button
          v-if="active == 1 || active == 2"
          @click="prev"
          style="width: 50%"
        >上一步
        </el-button>
        <el-button
          type="info"
          v-if="active == 0 || active == 1"
          style="margin-top: 5%;width: 50%"
          @click="next"
        >下一步</el-button>
        <el-button
          v-if="active == 2"
          style="margin-top: 5%;"
          @click="postSignFormTrue"
        >提交</el-button>
      </footer>

      <!-- 抽屉 -->

      <el-drawer
        title="签到列表"
        :visible.sync="drawer"
        :with-header="false"
        size="50%"
      >
        <a-spin :spinning="spinning1" tip="加载中...">
          <el-table :data="signList">
            <el-table-column
              property="deadline"
              label="日期"
              width="150"
            />
            <el-table-column
              property="name"
              label="签到名称"
              width="200"
            />
          </el-table>
        </a-spin>
      </el-drawer>
    </a-spin>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { CanvasLock } from "vue-lock";
import { postSign, getSignList, addPeopleForSign } from "@/api/sign";
import { getGroup } from "@/api/group";
export default {
  components: {
    CanvasLock,
  },
  data() {
    return {
      item_style: 'width: 200px',
      active: 0,
      sign: {
        kind: 1,
        name: '',
        deadline: new Date(2020, 1, 1, 0, 0),
        cid: 0,
        uid: 0,
        data: ''
      },
      getSign: {
        cid: 0,
        uid: 0,
      },
      drawer: false,
      spinning: false,
      spinning1: false,
      signList: [],
      // 返回的当前签到条目id
      signInfo: {},
      // 选到的群组id
      value1: [],
      // 全部的群组信xi
      options: [],
      signForm: {
        cid: 0,
        seid: 0,
        siid: 0,
      },
      shoushi: [],
      options5: [
        {
          value: "10",
          label: "10秒",
        },
        {
          value: "30",
          label: "30秒",
        },
        {
          value: "60",
          label: "60秒",
        },
        {
          value: "90",
          label: "90秒",
        },
        {
          value: "180",
          label: "180秒",
        },
        {
          value: "300",
          label: "长期",
        },
      ],
      value: "",
    };
  },

  created() {
    this.getAllGroup();
  },
  methods: {
    async getAllGroup() {
      const data = await getGroup();
      // console.log(data);
      this.options = data.data.content;
    },
    next() {
      if (this.active === 0) {
        this.postSignTrue();
      }
      if (this.active++ > 2) this.active = 0;
    },
    prev() {
      this.active--;
      if (this.active < 0) this.active = 0;
    },
    // 发起签到条目
    async postSignTrue() {
      this.spinning = true;
      this.sign.uid = this.uid;
      this.sign.cid = parseInt(this.$route.params.cid);
      const data = await postSign(this.sign);
      this.spinning = false;
      console.log(data);
      this.signInfo = data.data;
    },
    // 发起签到
    async postSignFormTrue() {
      for (const key of this.value1) {
        this.signForm.cid = parseInt(this.$route.params.cid);
        this.signForm.siid = this.signInfo.siid;
        this.signForm.seid = key;
        const data = await addPeopleForSign(this.signForm);
        console.log(data);
      }
    },
    // 展示签到
    async getSignListTrue() {
      this.spinning1 = true;
      this.drawer = true;
      this.getSign.uid = this.uid;
      this.getSign.cid = this.$route.params.cid;
      const data = await getSignList(this.getSign);

      console.log(data);
      this.signList = data.data.content;
      this.spinning1 = false;
    },
    // 手势输入完成后
    drawEnd(e) {
      // console.log(e);
      for (var item of e) {
        console.log(item.index);

        this.shoushi.push(item.index);
      }
      // console.log(this.shoushi.toString());
      this.shoushi = this.shoushi.toString();
      this.sign.data = this.shoushi;
    },
  },
  computed: {
    ...mapGetters(["uid"]),
  },
};
</script>

<style lang="scss" scoped>
</style>
