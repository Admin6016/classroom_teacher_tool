<template>
  <div>
    <el-alert :closable="false" title="从学号添加" class="item" type="info" />
    <el-input
      v-model="number"
      class="item"
      style="width: 60%; margin-left: 20%; margin-right: 20%"
      placeholder="请输入学号"
      type="number"
      prefix-icon="el-icon-user"
    >
      <el-button
        slot="append"
        :loading="load1"
        icon="el-icon-plus"
        @click="addOne"
        >添加到群组
      </el-button>
    </el-input>
    <div :loading="load2">
      <el-alert
        :closable="false"
        class="item"
        title="新建人员添加"
        type="success"
      />
      <el-input
        v-model="user.name"
        class="item"
        style="width: 60%; margin-left: 20%; margin-right: 20%"
        placeholder="请输入姓名"
        prefix-icon="el-icon-user"
      />
      <el-input
        v-model="user.location"
        class="item"
        style="width: 60%; margin-left: 20%; margin-right: 20%"
        placeholder="请输入住址"
        prefix-icon="el-icon-user"
      />
      <el-input
        v-model="user.number"
        class="item"
        style="width: 60%; margin-left: 20%; margin-right: 20%"
        placeholder="请输入学号"
        type="number"
        prefix-icon="el-icon-user"
      />
      <el-input
        v-model="user.role"
        class="item"
        style="width: 60%; margin-left: 20%; margin-right: 20%"
        placeholder="请输入角色"
        prefix-icon="el-icon-user"
      />
      <el-input
        v-model="user.sex"
        class="item"
        style="width: 60%; margin-left: 20%; margin-right: 20%"
        placeholder="请输入性别"
        prefix-icon="el-icon-user"
      />
      <el-input
        v-model="user.telephone"
        class="item"
        style="width: 60%; margin-left: 20%; margin-right: 20%"
        placeholder="请输入电话"
        type="number"
        prefix-icon="el-icon-user"
      />
      <el-input
        v-model="user.username"
        class="item"
        style="width: 60%; margin-left: 20%; margin-right: 20%"
        placeholder="请输入用户名"
        prefix-icon="el-icon-user"
      />
      <el-button
        @click="newStuAdd"
        type="primary"
        style="width: 60%; margin-left: 20%; margin-right: 20%"
        >新建并添加
      </el-button>
    </div>
  </div>
</template>
<script>
import { addMember } from "@/api/groupdata";
import { getUserByNumber, addUser, getUserByName } from "@/api/user";
import { get } from "js-cookie";

export default {
  props: {
    seid: {
      type: Number,
      default: "1",
    },
  },
  data() {
    return {
      load1: false,
      load2: false,
      number: "",
      user: {
        name: "",
        location: "",
        number: "",
        role: "",
        sex: "",
        telephone: "",
        username: "",
      },
      number1: "",
    };
  },
  mounted() {
    // TODO
  },
  methods: {
    async addOne() {
      this.load1 = true;

      const res2 = await getUserByNumber(this.number);
      this.number = res2.data.content[0].uid;
      const data = { seid: this.seid, uid: this.number };
      setTimeout(() => {
        this.load1 = false;
      }, 5000);
      addMember(data).then((res) => {
        this.load1 = false;
        this.$message({
          showClose: true,
          message: res.description,
          type: "success",
        });
      });
    },
    async newStuAdd() {
      this.load2 = true;
      const data = await addUser(this.user);
      console.log(data);
      this.load2 = false;
      this.$message({
        showClose: true,
        message: data.description,
        type: "success",
      });
      this.addOneByUid();
    },
    async addOneByUid() {
      this.load2 = true;
      const data1 = await getUserByName(this.user.name);
      console.log(data1);
      this.number1 = data1.data.content[0].uid;
      console.log(this.number1);
      const data = await addMember({ seid: this.seid, uid: this.number1 });
      console.log(data);
      this.load2 = false;
      this.$message({
        showClose: true,
        message: data.description,
        type: "success",
      });
    },
  },
};
</script>

<style scoped>
.item {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
<!--<style scoped></style>-->
<!--<style scoped src="src/assets/css/icon.css"></style>-->

