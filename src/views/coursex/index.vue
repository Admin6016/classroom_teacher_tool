<template>
  <div class="coursex-container">
    <el-row style="margin-top: 24px">
      <el-col :offset="12">
        <el-button
          type="primary"
          class="btn-top"
          @click="showaddNoticeDialogVisiable"
        >+添加公告
        </el-button>
      </el-col>
    </el-row>

    <div style="margin-left: 11%; margin-right: 11%; padding-top: 30px">
      <a-empty v-if="noticeData.length === 0" />
      <a-list
        v-if="noticeData.length !== 0"
        :grid="{ gutter: 24, column: 3 }"
        :data-source="noticeData"
      >
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-card hoverable>
            <template slot="title">
              <el-tag type="info">标题</el-tag>
              {{ " " + item.title }}
            </template>
            <el-tooltip
              class="item"
              effect="dark"
              content="查看公告详情"
              placement="top"
            >
              <div @click="lookNotice(index)">
                <h3>
                  <el-tag>作者</el-tag>
                  {{ " " + item.author }}
                </h3>
                <!-- <h3>内容：{{ item.context }}</h3> -->
                <h4>
                  <el-tag type="warning">创建日期</el-tag>
                  {{ " " + item.createTime.substr(0, 10) }}
                </h4>
              </div>
            </el-tooltip>
            <template slot="actions" class="ant-card-actions">
              <a-icon
                key="setting"
                type="edit"
                @click="showEditNoticeVisiable(item)"
              />
              <el-popover
                v-model="visible2"
                placement="top"
                width="200"
              >
                <p style="text-align: center"><i class="el-icon-warning" style="color: red;margin-right: 5px"></i>确定删除该公告吗？
                </p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="visible2 = false;removeNoticeTrue(item.nid)">确定
                  </el-button>
                </div>
                <a-icon
                  slot="reference"
                  key="edit"
                  type="delete"
                  @confirm="removeNoticeTrue(item.nid)"
                />
                <!--                <el-button slot="reference">删除</el-button>-->
              </el-popover>
              <!--              <el-popconfirm title="确定删除该公告吗？">-->
              <!--                <a-icon-->
              <!--                  slot="reference"-->
              <!--                  key="edit"-->
              <!--                  type="delete"-->

              <!--                  @confirm="removeNoticeTrue(item.nid)"-->
              <!--                />-->
              <!--              </el-popconfirm>-->
            </template>
          </a-card>
        </a-list-item>
      </a-list>
    </div>

    <!-- 展示修改公告的diaolog -->
    <el-dialog
      title="修改公告"
      :visible.sync="editNoticedialogVisible"
      width="650px"
    >
      <quill-editor v-model="editNotice.context" />
      <!--          <el-input-->
      <!--            type="textarea"-->
      <!--            rows="3"-->
      <!--            clearable-->
      <!--            v-model="editNotice.context"-->
      <!--          ></el-input>-->

      <span slot="footer" class="dialog-footer">
        <el-button @click="editNoticedialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editNoticeTrue">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 展示公告详情的页面 -->
    <el-dialog
      title="公告预览"
      :visible.sync="looNoticedialogVisible"
      width="30%"
    >
      <!--      <el-card class="box-card">-->
      <!--        <div slot="header">-->
      <!--          <span>公告详情</span>-->
      <!--        </div>-->
      <!--        <div>作者：{{ noticeData[0].author }}</div>-->
      <!--        <div>标题：{{ noticeData[0].title }}</div>-->
      <div
        v-if="noticeData[item_id]"
        v-html="`${noticeData[item_id].context}`"
      />
      <!--        <div>创建时间：{{ noticeData[0].createTime }}</div>-->
      <!--        <div>修改时间：{{ noticeData[0].updateTime }}</div>-->
      <!--      </el-card>-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="looNoticedialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="looNoticedialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 展示添加公告的页面 -->
    <el-dialog
      title="添加公告"
      :visible.sync="addNoticeDialogVisiable"
      width="650px"
    >
      <el-form ref="form" :model="addNoticeForm" label-width="80px">
        <div style="margin-left: 15%; margin-right: 20%">
          <el-form-item label="作者">
            <el-input v-model="addNoticeForm.notice.author"/>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="addNoticeForm.notice.title"/>
          </el-form-item>
        </div>

        <quill-editor
          v-model="addNoticeForm.notice.context"
          class="editor"
          :options="editorOption"
        />

        <el-form-item label="绑定课程">
          <el-switch v-model="addNoticeForm.bindCourse"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addNoticeDialogVisiable = false">取 消</el-button>
        <el-button type="primary" @click="addNoticeTrue">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { quillEditor } from 'vue-quill-editor' // 调用编辑器

import {
  getNotice,
  FindNoticeById,
  editNotice,
  addNotice,
  removeNotice
} from '@/api/notice'

export default {
  name: 'Index',
  components: { quillEditor },
  data() {
    return {
      visible2: false,
      editorOption: {
        // 配置项
        theme: 'snow', // or 'bubble'
        placeholder: '请输入文章内容'
      },
      content_garbage: '',
      item_id: 0,
      noticeData: [],
      cid: 0,
      editNoticedialogVisible: false,
      editNotice: {
        context: ''
      },
      looNoticedialogVisible: false,
      addNoticeDialogVisiable: false,
      addNoticeForm: {
        notice: {
          author: '',
          context: '',
          isSystem: false
        },

        bindCourse: true,

        cid: 0
      }
    }
  },
  created() {
    this.getNoticeList()
  },

  computed: {
    ...mapGetters(['name'])
  },
  methods: {
    // 获取所有公告列表 生成一个数组  给列表
    async getNoticeList() {
      const loading = this.$loading({
        lock: true,
        text: '公告加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.cid = this.$route.params.cid
      const { data } = await getNotice(this.cid)
      console.log(data)
      if (data.content.length > 0) {
        this.noticeData = data.content
        // console.log(this.noticeData);
        loading.close()
      }
      setTimeout(() => {
        loading.close()
      }, 10000)
    },
    // 按需查询公告 并且生成一个对象 赋值给form
    showEditNoticeVisiable(item) {
      // this.editNotice = {};
      // console.log(item);

      this.editNotice = item
      console.log(this.editNotice)
      this.editNoticedialogVisible = true
    },
    // 删除公告
    async removeNoticeTrue(id) {
      console.log(id)
      const data = await removeNotice(id)
      console.log(data)
      if (data.code < 0) {
        return this.$message.error('删除失败，请稍后重试')
      }
      this.$message.success('删除成功')
      this.getNoticeList()
    },
    // 修改公告
    async editNoticeTrue() {
      const data = await editNotice(this.editNotice)
      console.log(data)
      if (data.code < 0) {
        return this.$message.error('修改失败，请重试')
      }
      this.$message.success('修改成功')
      this.editNoticedialogVisible = false
      this.getNoticeList()
    },
    // 查看详情
    lookNotice(id) {
      this.item_id = id
      this.looNoticedialogVisible = true
    },
    // 添加公告对话框的显示与隐藏
    showaddNoticeDialogVisiable() {
      this.addNoticeForm.notice.author = this.name
      this.addNoticeDialogVisiable = true
      // console.log(this.$route.params.cid);
    },
    // 添加公告
    async addNoticeTrue() {
      this.addNoticeForm.cid = this.$route.params.cid
      const data = await addNotice(this.addNoticeForm)
      console.log(data)
      this.addNoticeDialogVisiable = false
      this.getNoticeList()
    }
  }
}
</script>

<style scoped lang="scss">
.editor {
  line-height: normal !important;
  height: 300px;
  width: 80%;
  margin: 1px auto;
  margin-bottom: 120px;
}
</style>
