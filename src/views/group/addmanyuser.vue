<template>
  <div>
    <center>
      <el-upload
        style="width: 100%"
        drag
        :before-upload="handleUpload"
        action="default"
      >
        <i class="el-icon-upload"/>
        <div class="el-upload__text">将excel文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip"><p>请注意：表头占一行，数据列占一行，之后的数据才有效。</p>
          <p>支持学号、姓名、性别、位置、手机号信息录入</p></div>

      </el-upload>

      <div style="margin-top: 15px;">
        <el-table max-height="250" v-bind="table">
          <el-table-column
            v-for="(item, index) in table.columns"
            :key="index"
            :prop="item.prop"
            :label="item.label"
          />
        </el-table>
        <el-progress v-if="table.data.length > 0" :text-inside="true" style="margin-top: 10px;margin-bottom: 10px;"
                     :stroke-width="18" :percentage="process_1"/>
        <el-button v-if="table.data.length > 0" :loading="loading" type="warning"
                   style="background-color:black;border-color:white;width: 100%;margin-top: 10px;margin-bottom: 10px"
                   @click="forUser">导入预览的{{ table.data.length }}条数据
        </el-button>
      </div>
    </center>
  </div>
</template>
<script>
import { addUser, getUserByNumber } from '@/api/user'
import { addMember } from '@/api/groupdata'

export default {
  props: {
    seid: {
      type: Number,
      default: '1'
    }
  },
  data() {
    return {
      loading: false,
      process: {
        complete: 0,
        all: 0
      },
      table: {
        columns: [],
        data: [],
        size: 'mini',
        stripe: true,
        border: true
      }
    }
  },
  computed: {
    process_1() {
      return (this.process.complete / this.process.all) * 100
    }
  },
  methods: {
    // 处理导入的excel文件
    handleUpload(file) {
      this.$import.xlsx(file)
        .then(({ header, results }) => {
          this.table.columns = header.map(e => {
            return {
              label: e,
              prop: e
            }
          })
          // 放置数据
          this.table.data = results
          // 初始化进度
          this.process.all = this.table.data.length
          this.process.complete = 0
        })
      return false
    },
    async forUser() {
      this.loading = true
      // 挨个抽取数据
      for (const user of this.table.data) {
        // 组装数据
        const user_i = {
          name: user.姓名,
          number: user.学号,
          sex: user.性别,
          location: user.location ? user.location : '无',
          telephone: user.联系方式 ? user.联系方式 : (user.手机号码 ? user.手机号码 : '')
        }
        if (!user_i.telephone) {
          user_i.telephone = '13100000000'
        }
        // 查找用户是否存在
        if (user_i.number) {
          const res1 = await getUserByNumber(user_i.number)
          // 如果用户ID不存在，就直接创建
          if (res1.data.content.length === 0) {
            await addUser(user_i)

            // 如果用户存在，就不上传了
          }
        }

        const res2 = await getUserByNumber(user_i.number)
        const uid = res2.data.content[0].uid
        await addMember({ uid, seid: this.seid })
        this.process.complete++
      }
      this.loading = false
      this.$message({
        message: '恭喜你，成员导入完毕',
        type: 'success'
      })
      this.table.data = []
    }
  }
}
</script>

<style scoped>
</style>
