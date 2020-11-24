<template>
  <div class="group-container">
    <!-- 卡片视图区域 -->
    <!--    <el-card class="group-card">-->
    <div style="margin-top: 15px; margin-bottom: 15px">
      <el-row :gutter="20">
        <el-col :span="8"> </el-col>

        <el-col :span="4" :offset="12"> </el-col>
      </el-row>
    </div>

    <a-spin :spinning="spinning" tip="加载中...">
      <el-table :data="groupList">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="群组名称" prop="name"></el-table-column>
        <el-table-column label="群组描述" prop="description"></el-table-column>
        <el-table-column label="群组操作" align="right">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="showUserDialogVisiable(scope.row.seid)"
              >成员导入
            </el-button>
            <el-button type="info" size="mini">成员详情</el-button>
            <el-button
              type="danger"
              size="mini"
              @click="removeById(scope.row.seid)"
              >删除群组
            </el-button>
          </template>
          <template slot="header">
            <el-input
              placeholder="请输入群组名称"
              style="width: 250px; margin-right: 20px"
              v-model="searchForm"
              clearable
              @clear="getGroupList"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="searchGroup"
              ></el-button>
            </el-input>
            <el-button
              type="success"
              @click="addGroupFormVisable"
              icon="el-icon-plus"
              >添加群组
            </el-button>
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
      <el-form :model="addGroupForm" label-width="80px" ref="addGroupRef">
        <el-form-item label="群组名称" prop="name">
          <el-input v-model="addGroupForm.name"></el-input>
        </el-form-item>
        <el-form-item label="群组描述" prop="description">
          <el-input v-model="addGroupForm.description"></el-input>
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
          <addoneuser :seid="seid_selected"></addoneuser>
        </el-tab-pane>
        <el-tab-pane label="批量导入">
          <addmanyuser></addmanyuser>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="userdialogVisible = false"
          >关闭</el-button
        >
      </span>
    </el-dialog>

    <el-pagination
      style="margin-left: 35%; margin-right: 35%; margin-top: 20px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="sizes, prev, pager, next"
      :total="1000"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getGroup, addGroup, deleteGroup } from "@/api/group";
import { MessageBox } from "element-ui";

import addoneuser from "@/views/group/addoneuser";
import addmanyuser from "@/views/group/addmanyuser";

export default {
  name: "Group",
  components: {
    addmanyuser,
    addoneuser,
  },

  data() {
    return {
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
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //搜索群组
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
      const data = await this.$confirm(
        "此操作将永久删除该群组, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      // console.log(data);
      if (data !== "confirm") {
        return this.$message.info("已取消删除");
      }
      await deleteGroup(id);
      this.getGroupList();
    },
    addDialogClosed() {
      this.$refs.addGroupRef.resetFields();
    },
    // 控制用户管理dialog的显示与隐藏
    showUserDialogVisiable(seid) {
      this.seid_selected = seid;
      this.userdialogVisible = true;
    },
  },
  created() {
    this.getGroupList();
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
