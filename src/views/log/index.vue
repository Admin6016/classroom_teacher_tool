<template>
  <div style="padding: 20px;">
    <a-spin :spinning="spinning1">
      <el-table :data="logList" stripe style="width: 100%; margin-top: 50px">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="time" label="日期" width="200">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="80"
          :filters="[
            { text: '系统日志', value: '2' },
            { text: '操作日志', value: '1' },
          ]"
        >
        </el-table-column>
        <el-table-column prop="description" label="内容" width="1000">
        </el-table-column>
        <el-table-column label="更多">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-view"
              size="mini"
              @click="open1(scope.row.opid)"
            ></el-button>
          </template
          >
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 25, 30, 35]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </a-spin>
    <el-dialog
      title="日志详情"
      :visible.sync="showlogdialogVisible"
      width="30%"
    >
      <div v-html="`${currentLog.description}`"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showlogdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="showlogdialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>


<script>
import {
  getLog,
  getLogByPagSize,
  getLogByPagNumber,
  getLogById,
} from "@/api/log";
export default {
  name: "LogIndex",
  data() {
    return {
      spinning1: false,
      logList: [],
      currentPage: 0,
      pageSize: 0,
      total: 0,
      showlogdialogVisible: false,
      currentLog: {},
    };
  },
  created() {
    this.getLogList();
  },
  methods: {
    async getLogList() {
      this.spinning1 = true;
      const data = await getLog();
      console.log(data);
      this.logList = data.content;
      this.currentPage = data.number + 1;
      this.pageSize = data.numberOfElements;
      this.total = data.totalElements;
      this.spinning1 = false;
    },
    // 当页面容量改变
    async handleSizeChange(pageSize) {
      const data = await getLogByPagSize(pageSize);

      this.logList = data.content;
      this.getLogList();
    },
    // 当页码值改变
    async handleCurrentChange(val) {
      const data = await getLogByPagNumber(val);
      console.log(data);
      this.logList = data.content;
      this.getLogList();
    },
    async open1(opid) {
      this.showlogdialogVisible = true;
      const data = await getLogById(opid);
      // console.log(data);
      this.currentLog = data.content[0];
    },
  },
};
</script>

<style scoped lang="scss">
</style>
