<template>
  <div style="padding: 20px;">
    <a-spin :spinning="spinning1" tip="数据加载中">
      <el-table max-height="600" :data="logList" stripe style="width: 100%; margin-top: 50px">
        <el-table-column label="#">
          <template slot-scope="scope">
            {{ scope.row.opid }}
          </template>
        </el-table-column>
        <el-table-column prop="time" label="日期" width="200"/>
        <el-table-column
          prop="type"
          label="类型"
          width="80"
          :filters="[
            { text: '系统日志', value: '2' },
            { text: '操作日志', value: '1' },
          ]"
        />
        <el-table-column prop="description" label="内容" width="1000"/>
        <el-table-column label="更多">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-view"
              size="mini"
              @click="open1(scope.row.opid)"
            />
          </template>
        </el-table-column>
      </el-table>

      <center>
        <!-- 分页 -->
        <el-pagination
          style="margin-top: 20px;"
          :current-page="currentPage"
          :page-sizes="[20, 25, 30, 35]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </center>
    </a-spin>
    <el-dialog
      title="日志详情"
      :visible.sync="showlogdialogVisible"
      width="30%"
    >
      <div v-html="`${currentLog.description}`"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showlogdialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="showlogdialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getLog,
  getLogByPagSize,
  getLogByPagNumber,
  getLogById, getLogByParams
} from '@/api/log'
export default {
  name: 'LogIndex',
  data() {
    return {
      lock: 0,
      spinning1: false,
      logList: [],
      currentPage: 1,
      pageSize: 0,
      total: 0,
      showlogdialogVisible: false,
      currentLog: {}
    }
  },
  created() {
    this.getLogList()
  },
  methods: {
    async getLogList() {
      // if (this.spinning1) {
      //   return
      // }
      clearTimeout(this.lock)
      this.spinning1 = true
      const data = await getLogByParams({ page: this.currentPage - 1, size: this.pageSize })
      this.logList = data.content
      this.currentPage = data.number + 1
      this.pageSize = data.numberOfElements
      this.total = data.totalElements
      this.spinning1 = false
    },
    // 当页面容量改变
    async handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.lock = setTimeout(this.getLogList, 200)
      // this.getLogList()
    },
    // 当页码值改变
    async handleCurrentChange(val) {
      this.currentPage = val
      this.lock = setTimeout(this.getLogList, 200)
      // this.getLogList()
    },
    async open1(opid) {
      this.showlogdialogVisible = true
      const data = await getLogById(opid)
      // console.log(data);
      this.currentLog = data.content[0]
    }
  }
}
</script>

<style scoped lang="scss">
</style>
