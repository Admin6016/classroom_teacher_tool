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
                v-model="sign.data"

                placeholder="请输入签到密码"
                :style="item_style"

                clearable
              />
            </el-form-item>

          </div>
          <div
            v-if="sign.kind == 4"
            style="margin-top: 60px; width: 200px; margin: auto"
          >
            <el-alert
              v-if="this.shoushi.length==0"
              :style="item_style"
              title="请输入手势密码"
              type="warning"
              center
              show-icon
            />
            <el-alert v-if="this.shoushi>0" :style="item_style" title="已輸入手勢密碼" type="success" center show-icon/>

            <canvas-lock
              ref="canvas"
              :disbaled="false"
              @drawEnd="drawEnd($event)"
            />
          </div>
          <div v-if="sign.kind==5">
            <el-form-item label="签到周期" style="width:20%;margin:auto">
              <el-select v-model="value" :style="item_style" placeholder="请选择">
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
          style="width: 100% ;"
        >
          <el-select v-model="value1" multiple placeholder="请选择簽到群組" style="width:30%">
            <el-option
              v-for="item in options"
              :key="item.seid"
              :label="item.name"
              :value="item.seid"
            />
          </el-select>

          <el-form :model="findStuForm" label-width="100px" style="float:right;margin-left:20%;margin-right:5%">
            <el-form-item label="輸入學生姓名">
              <el-input v-model="findStuForm.name" clearable @clear="resetInput">
                <el-button slot="append" icon="el-icon-search" @click="getStuListByName"/>
              </el-input>
            </el-form-item>
          </el-form>
          <div style="margin-top:80px;width:100%;margin-right:5%">
            <el-table
              :data="studentList"
              stripe
              border
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                type="selection"
                label="選擇"
                width="80"
              />
              <el-table-column
                prop="name"
                label="姓名"
                width="260"
              />
              <el-table-column
                prop="number"
                label="學號"
                width="260"
              />
              <el-table-column
                prop="telephone"
                label="電話"
                width="260"
              />
              <el-table-column
                prop="location"
                label="地址"
                width="260"
              />
              <el-table-column
                prop="role"
                label="角色"
                width="170"
              />
            </el-table>
          </div>

        </div>
        <div v-if="active == 2">
          <span>确定要提交吗？</span>
        </div>
      </el-form>
      <footer style="width: 50%;margin-left: 25%;margin-right: 25%; display:flex">
        <el-button
          v-if="active == 1 || active == 2"
          style="width: 50% ;margin-top:5%"
          @click="prev"
        >上一步
        </el-button>
        <el-button
          v-if="active == 0 || active == 1"
          type="info"
          style="margin-top: 5%;width: 50%"
          @click="next"
        >下一步</el-button>
        <el-button
          v-if="active == 2"
          style="margin-top: 5%;width:50%"
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
      <!-- 对话框 -->
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        top="15%"
      >
        <span>添加签到成功，请选择下一步</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="backToIndex">回到主页</el-button>
          <el-button type="primary" @click="ToBigScreen">进入签到大屏</el-button>
        </span>
      </el-dialog>
    </a-spin>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { CanvasLock } from "vue-lock";
import {
  postSign,
  getSignList,
  addPeopleForSign,
  getStudent,
  getStudentByName,
  addSinglePeopleForSign,
} from "@/api/sign";
import { getGroup } from "@/api/group";
import screenfull from "screenfull";

export default {
  components: {
    CanvasLock,
  },
  data() {
    return {
      item_style: "width: 200px",
      active: 0,
      // 按需查詢學生信息的表單
      findStuForm: {
        name: "",
      },
      sign: {
        kind: 1,
        name: "",
        deadline: new Date(2020, 1, 1, 0, 0),
        cid: 0,
        uid: 0,
        data: "",
      },
      getSign: {
        cid: 0,
        uid: 0,
      },
      // 默认不全屏
      isFullscreen: false,
      checked: false,
      drawer: false,
      spinning: false,
      spinning1: false,
      // spinning2: false,
      signList: [],
      // 返回的当前签到条目id
      signInfo: {},
      // 选到的群组id
      value1: [],
      // 全部的群组信xi
      options: [],
      // 添加签到成功的对话框
      dialogVisible: false,
      // 添加簽到學生（個人）
      multipleSelection: [],
      addsingleStuForm: {
        cid: 0,
        siid: 0,
        uid: 0,
      },
      signForm: {
        cid: 0,
        uid: 0,
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
      studentList: [],
    };
  },

  created() {
    this.getAllGroup();
    this.getStudentList();
  },
  methods: {
    async getAllGroup() {
      const data = await getGroup();
      // console.log(data);
      this.options = data.data.content;
    },
    next() {
      if (this.active == 0) {
        if (this.sign.kind == 4) {
          this.shoushi = this.shoushi.join(",");
          this.sign.data = this.shoushi;
        }
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
      this.spinning = true;
      for (const key of this.value1) {
        this.signForm.cid = parseInt(this.$route.params.cid);
        this.signForm.siid = this.signInfo.siid;
        this.signForm.seid = key;
        const data = await addPeopleForSign(this.signForm);
        console.log(data);
      }
      for (const key1 of this.multipleSelection) {
        this.addsingleStuForm.cid = parseInt(this.$route.params.cid);
        this.addsingleStuForm.siid = this.signInfo.siid;
        this.addsingleStuForm.uid = key1.uid;
        const data1 = await addSinglePeopleForSign(this.addsingleStuForm);
        console.log(data1);
      }
      this.spinning = false;
      this.dialogVisible = true;
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
      this.shoushi = [];
      // console.log(e);
      for (var item of e) {
        console.log(item.index);

        this.shoushi.push(item.index);
      }
      console.log(this.shoushi);
    },
    // 獲取學生列表
    async getStudentList() {
      const data = await getStudent();
      console.log(data);
      this.studentList = data.data.content;
    },

    // 按需查找學生
    async getStuListByName() {
      const data = await getStudentByName(this.findStuForm);
      console.log(data);
      this.studentList = data.data.content;
    },
    // 清空輸入框
    resetInput() {
      this.getStudentList();
    },
    handleSelectionChange(val) {
      // console.log(val);
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    // 回到主页
    backToIndex() {
      this.dialogVisible = false;
      this.$router.push("/dashboard");
    },
    // 进入大屏
    ToBigScreen() {
      this.dialogVisible = false;
      let routeUrl = this.$router.resolve({
        path: "/bigscreen",
        query: { cid: this.$route.params.cid, siid: this.signInfo.siid },
      });

      window.open(routeUrl.href, "_blank");

      screenfull.toggle();
    },
  },
  computed: {
    ...mapGetters(["uid"]),
  },
};
</script>

<style lang="scss" scoped>
</style>
