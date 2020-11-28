<template>
  <div class="group-container">
    <!-- 卡片视图区域 -->
    <!--    <el-card class="group-card">-->
    <div style="margin-top: 15px; margin-bottom: 15px">
      <!--        <el-row :gutter="20">-->
      <!--          <el-col :span="8">-->

      <!--          </el-col>-->

      <!--          <el-col :span="4" :offset="12">-->

      <!--          </el-col>-->
      <!--        </el-row>-->
    </div>

    <a-spin :spinning="spinning" tip="加载中...">
      <el-table :data="groupList">
        <el-table-column type="index" />
        <el-table-column label="群组名称" prop="name" />
        <el-table-column label="群组描述" prop="description" />
        <el-table-column label="群组操作" align="right">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="showUserDialogVisiable(scope.row.seid)"
              >成员导入
            </el-button>
            <el-button
              type="info"
              size="mini"
              @click="showUserDrawer(scope.row.seid)"
              >成员详情</el-button
            >
            <el-popconfirm
              confirm-button-text="好的"
              cancel-button-text="不用了"
              icon="el-icon-info"
              icon-color="red"
              title="确定删除该群组吗？"
              @onConfirm="removeById(scope.row.seid)"
            >
              <el-button
                slot="reference"
                style="margin-left: 10px"
                type="danger"
                size="mini"
                >删除群组
              </el-button>
            </el-popconfirm>
          </template>
          <template slot="header">
            <el-input
              v-model="searchForm"
              placeholder="....."
              style="width: 200px; margin-right: 10px"
              @clear="getGroupList"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="searchGroup"
              />
            </el-input>

            <el-dropdown @command="handleCommand">
              <el-button type="primary">
                更多操作<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">添加群组</el-dropdown-item>
                <!--                <el-dropdown-item>狮子头</el-dropdown-item>-->
                <!--                <el-dropdown-item>螺蛳粉</el-dropdown-item>-->
                <!--                <el-dropdown-item>双皮奶</el-dropdown-item>-->
                <!--                <el-dropdown-item>蚵仔煎</el-dropdown-item>-->
              </el-dropdown-menu>
            </el-dropdown>
            <!--            <el-button-->
            <!--              type="success"-->
            <!--              icon="el-icon-plus"-->
            <!--              @click="addGroupFormVisable"-->
            <!--            >添加群组-->
            <!--            </el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </a-spin>
    <!--    </el-card>-->

    <!-- 添加群组的dialog -->
    <el-dialog
      title="添加群组"
      :visible.sync="DialogVisible"
      width="30%"
      @close="addDialogClosed"
    >
      <el-form ref="addGroupRef" :model="addGroupForm" label-width="80px">
        <el-form-item label="群组名称" prop="name">
          <el-input v-model="addGroupForm.name" />
        </el-form-item>
        <el-form-item label="群组描述" prop="description">
          <el-input v-model="addGroupForm.description" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="DialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addGroupTrue">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 用户管理的dialog -->
    <el-dialog
      title="群组成员导入"
      :visible.sync="userdialogVisible"
      width="50%"
    >
      <el-tabs>
        <el-tab-pane label="单个导入">
          <addoneuser :seid="seid_selected" />
        </el-tab-pane>
        <el-tab-pane label="批量导入">
          <addmanyuser :seid="seid_selected" />
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="userdialogVisible = false"
          >关闭</el-button
        >
      </span>
    </el-dialog>

    <!--    成员 抽屉 表格-->
    <el-drawer
      :with-header="false"
      :visible.sync="draw_show"
      direction="rtl"
      size="50%"
    >
      <a-spin :spinning="spin1" tip="用户数据加载中">
        <center>
          <el-table
            stripe
            :data="draw_user_data"
            style="width: 100%"
            height="700"
          >
            <el-table-column prop="number" label="学号" sortable width="120" />
            <el-table-column label="姓名" sortable width="100">
              <template slot-scope="scope">
                <el-tag
                  ><span>{{ scope.row.name }}</span></el-tag
                >
              </template>
            </el-table-column>
            <el-table-column prop="sex" label="性别" width="60" />
            <el-table-column prop="telephone" label="联系方式" width="160" />
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="console.log(scope.row)"
                  >踢出</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </center>
      </a-spin>

      <!--      <el-table :data="gridData">-->
      <!--        <el-table-column property="date" label="日期" width="150"></el-table-column>-->
      <!--        <el-table-column property="name" label="姓名" width="200"></el-table-column>-->
      <!--        <el-table-column property="address" label="地址"></el-table-column>-->
      <!--      </el-table>-->
    </el-drawer>

    <!--    分页-->

    <el-pagination
      style="margin-left: 35%; margin-right: 35%; margin-top: 20px"
      :current-page.sync="currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="sizes, prev, pager, next"
      :total="1000"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getGroup, addGroup, deleteGroup } from "@/api/group";

import addoneuser from "@/views/group/addoneuser";
import addmanyuser from "@/views/group/addmanyuser";
import { getGroupMember } from "@/api/groupdata";

export default {
  name: "Group",
  components: {
    addmanyuser,
    addoneuser,
  },

  data() {
    return {
      spin1: false,
      draw_user_data: [],
      draw_show: false,
      currentPage: 1,
      seid_selected: 0,
      spinning: false,
      groupList: [],
      DialogVisible: false,
      searchForm: "",
      addGroupForm: {
        name: "",
        description: "",
        uid: 0,
      },

      userdialogVisible: false,
    };
  },
  created() {
    this.getGroupList();
  },
  methods: {
    handleCommand(command) {
      if (command === "a") {
        this.addGroupFormVisable();
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 搜索群组
    async searchGroup() {
      const data = await getGroup(this.searchForm);
      console.log(data);
      this.groupList = data.data.content;
    },
    async getGroupList() {
      this.spinning = true;
      const { data } = await getGroup();
      // console.log(data);
      this.groupList = data.content;
      this.spinning = false;
      // console.log(this.groupList);
    },

    addGroupFormVisable() {
      this.DialogVisible = true;
    },

    async addGroupTrue() {
      this.addGroupForm.uid = this.uid;
      const { data } = await addGroup(this.addGroupForm);
      console.log(data);
      this.DialogVisible = false;
      this.getGroupList();
    },
    async removeById(id) {
      await deleteGroup(id);
      await this.getGroupList();
    },
    addDialogClosed() {
      this.$refs.addGroupRef.resetFields();
    },
    showUserDrawer(seid) {
      this.draw_show = true;
      this.spin1 = true;
      getGroupMember(seid).then((res) => {
        this.draw_user_data = res.data.content;
        this.spin1 = false;
      });
      setTimeout(() => {
        this.spin1 = false;
      }, 10000);
    },
    // 控制用户管理dialog的显示与隐藏
    showUserDialogVisiable(seid) {
      this.seid_selected = seid;
      this.userdialogVisible = true;
    },
  },
  computed: {
    ...mapGetters(["uid"]),
  },
};
</script>

<style  lang="scss" scoped>
.group-container {
  padding: 30px;
}
</style>
