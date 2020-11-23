<template>
  <div class="coursex-container">
    <el-row style="margin-top: 24px">
      <el-col :offset="12">
        <el-button type="primary" class="btn-top">+添加公告</el-button></el-col
      >
    </el-row>

    <el-divider></el-divider>
    <div style="margin-left: 11%; margin-right: 11%; padding-top: 30px">
      <a-list :grid="{ gutter: 20, column: 4 }" :data-source="noticeData">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-card :title="item.title" hoverable
            ><el-tooltip
              class="item"
              effect="dark"
              content="查看公告详情"
              placement="top"
              ><div @click="lookNotice(item.nid)">
                <h3>作者：{{ item.author }}</h3>
                <!-- <h3>内容：{{ item.context }}</h3> -->
                <h4>创建时间：{{ item.createTime.substr(0, 10) }}</h4>
              </div>
            </el-tooltip>
            <template slot="actions" class="ant-card-actions">
              <a-icon
                key="setting"
                type="edit"
                @click="showEditNoticeVisiable(item.nid)"
              ></a-icon>
              <a-icon
                key="edit"
                type="delete"
                @click="removeNoticeTrue(item.nid)"
              />
            </template>
          </a-card>
        </a-list-item>
      </a-list>
    </div>

    <!-- 展示修改公告的diaolog -->
    <el-dialog
      title="修改公告"
      :visible.sync="editNoticedialogVisible"
      width="30%"
    >
      <el-form :model="editNotice" label-width="80px">
        <el-form-item label="公告内容" required>
          <el-input
            type="textarea"
            rows="3"
            clearable
            v-model="editNotice.context"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editNoticedialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editNoticeTrue">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 展示公告详情的页面 -->
    <el-dialog
      title="公告详情"
      :visible.sync="looNoticedialogVisible"
      width="30%"
    >
      <el-card class="box-card">
        <div slot="header">
          <span>公告详情</span>
        </div>
        <div>作者：{{ noticeData[0].author }}</div>
        <div>标题：{{ noticeData[0].title }}</div>
        <div>内容：{{ noticeData[0].context }}</div>
        <div>创建时间：{{ noticeData[0].createTime }}</div>
        <div>修改时间：{{ noticeData[0].updateTime }}</div>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="looNoticedialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="looNoticedialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getNotice, FindNoticeById, editNotice } from "@/api/notice";
export default {
  name: "Index",
  data() {
    return {
      noticeData: [],
      cid: 0,
      editNoticedialogVisible: false,
      editNotice: {},
      looNoticedialogVisible: false,
    };
  },
  created() {
    this.getNoticeList();
  },
  methods: {
    // 获取所有公告列表 生成一个数组  给列表
    async getNoticeList() {
      this.cid = this.$route.params.cid;
      const data = await getNotice(this.cid);
      console.log(data);
      this.noticeData = data.data.content;
    },
    // 按需查询公告 并且生成一个对象 赋值给form
    async showEditNoticeVisiable(id) {
      this.editNoticedialogVisible = true;
      console.log(id);
      const data = await FindNoticeById(id);
      console.log(data);
      this.editNotice = data.data.content[0];
    },
    //删除公告
    removeNoticeTrue() {
      console.log(3);
    },
    // 修改公告
    async editNoticeTrue() {
      const data = await editNotice(this.editNotice);
      console.log(data);
      if (data.code < 0) {
        return this.$message.error("修改失败，请重试");
      }
      this.$message.success("修改成功");
      this.editNoticedialogVisible = false;
      this.getNoticeList();
    },
    // 查看详情
    lookNotice(id) {
      console.log(id);
      this.looNoticedialogVisible = true;
    },
  },
};
</script>

<style scoped lang="scss">
// .coursex-container {
//   position: relative;
//   .btn-top {
//     position: absolute;
//     left: 50%;
//     top: 50%;
//   }
// }
</style>
