<template>
  <div class="group-container">
    <!-- 卡片视图区域 -->
    <el-card class="group-card">
      <div style="margin-top: 15px; margin-bottom: 15px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input
              placeholder="请输入群组名称 "
              class="input-with-select"
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
          </el-col>

          <el-col :span="2" :offset="12">
            <el-button type="success" @click="addGroupFormVisable"
              >+添加群组</el-button
            >
          </el-col>
        </el-row>
      </div>

      <el-table :data="groupList">
        <el-table-column type="index"> </el-table-column>
        <el-table-column label="群组名称" prop="name"></el-table-column>
        <el-table-column label="群组描述" prop="description"></el-table-column>

        <el-table-column label="群组操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="showUserDialogVisiable"
              >成员管理</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="removeById(scope.row.seid)"
              >删除群组</el-button
            >
            <el-button type="info" size="mini">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加群组的dialog -->
    <el-dialog
      title="添加群组"
      :visible.sync="DialogVisible"
      width="30%"
      center
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
      title="群组成员管理"
      :visible.sync="userdialogVisible"
      width="50%"
    >
      <el-tabs>
        <el-tab-pane label="单个导入"><addoneuser></addoneuser></el-tab-pane>
        <el-tab-pane label="批量导入"><addmanyuser></addmanyuser></el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="userdialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
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
    //搜索群组
    async searchGroup() {
      const data = await getGroup(this.searchForm);
      console.log(data);
      this.groupList = data.data.content;
    },
    async getGroupList() {
      const { data } = await getGroup();
      // console.log(data);
      this.groupList = data.content;
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
    showUserDialogVisiable() {
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
</style>