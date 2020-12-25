<template>
  <div style="margin: 0">
    <dv-full-screen-container
      style="
        background-image: linear-gradient(to top, #09203f 0%, #537895 100%);
      "
    >
      <dv-border-box-11 title="签到情况">
        <div
          style="
            padding: 4%;
            height: 100%;
            display: flex;
            justify-content: space-around;
          "
        >
          <dv-border-box-10 style="width: 30%; height: 80%; margin-top: 5%">
            <dv-decoration-7
              style="
                width: 150px;
                height: 10%;
                color: #7ec699;
                font-weight: 700;
                margin: 0 auto;
              "
            ><span
              style="margin-left: 15px; margin-right: 15px"
            >已签到</span></dv-decoration-7>

            <dv-scroll-board
              :config="config2"
              style="width: 100%; height: 90%"
            />
          </dv-border-box-10>

          <dv-border-box-10 style="width: 30%; height: 80%; margin-top: 5%">
            <dv-decoration-7
              style="
                width: 150px;
                height: 10%;
                color: #7ec699;
                font-weight: 700;
                margin: 0 auto;
              "
            ><span
              style="margin-left: 15px; margin-right: 15px"
            >签到进度</span></dv-decoration-7>
            <dv-percent-pond
              ref="pond"
              :config.sync="config1"
              style="
                width: 80%;
                height: 20%;
                margin-left: 10%;
                margin-right: 10%;
                margin-top: 20px;
                margin-bottom: 20px;
              "
            />
            <dv-decoration-7
              style="
                width: 150px;
                height: 10%;
                color: #7ec699;
                font-weight: 700;
                margin: 0 auto;
              "
            ><span
              style="margin-left: 15px; margin-right: 15px"
            >签到二维码</span></dv-decoration-7>
            <div>
              <center>
                <vue-qr
                  ref="qr"
                  :text="downloadData.url"
                  :size="200"
                  :margin="2"
                  style="
                margin-top: 20px;
                margin-bottom: 20px;
              "
                />
              </center>
            </div>
          </dv-border-box-10>

          <dv-border-box-10 style="width: 30%; height: 80%; margin-top: 5%">
            <dv-decoration-7
              style="
                width: 150px;
                height: 10%;
                color: #7ec699;
                font-weight: 700;
                margin: 0 auto;
              "
            ><span
              style="margin-left: 15px; margin-right: 15px"
            >未签到</span></dv-decoration-7>

            <dv-scroll-board
              :config="config"
              style="width: 100%; height: 90%"
            />
          </dv-border-box-10>
        </div>
      </dv-border-box-11>
    </dv-full-screen-container>
  </div>
</template>

<script>
import { getFinshSign, getUnFinshSign } from '@/api/signdata'
import VueQr from 'vue-qr'
import Safe from '@/utils/safe'

export default {
  components: {
    VueQr
  },
  data() {
    return {
      downloadData: {
        // window.location.host
        url: 'http://' + '' + window.location.host + '/qr?siid=' + this.$route.query.siid + '&name=' + this.$route.query.name + '&flag=' + Math.ceil(Safe.Encrypt(new Date().getTime())),
        icon:
          'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2212207577,3515555468&fm=26&gp=0.jpg'
      },

      config: {
        header: ['姓名', '学号'],
        rowNum: 10,
        data: []
      },
      config1: {
        value: 0,
        localGradient: true
      },
      config2: {
        header: ['姓名', '学号'],
        rowNum: 10,
        data: []
      },

      finshSignForm: {
        cid: 0,
        siid: 0
      },

      finshSign: [],
      unfinshSign: [],

      finish: 0,
      unfinish: 100
    }
  },
  computed: {
    val1() {
      return Math.ceil((this.unfinish / (this.unfinish + this.finish)) * 100)
    }
  },
  created() {
    this.renderData()
  },
  methods: {
    async renderData() {
      console.log('renderData-start')
      await this.getFinshSignList()
      await this.getUnFinshSignList()
      this.config1.value = Math.ceil(
        (this.finish / (this.unfinish + this.finish)) * 100
      )
      this.$refs.pond.mergeConfig()
      this.downloadData.url = 'http://' + '' + window.location.host + '/qr?siid=' + this.$route.query.siid + '&name=' + this.$route.query.name + '&flag=' + Math.ceil(Safe.Encrypt(new Date().getTime()))
      console.log('renderData-end')
      setTimeout(this.renderData, 10000)
    },
    async getFinshSignList() {
      this.finshSignForm.cid = this.$route.query.cid
      this.finshSignForm.siid = this.$route.query.siid
      const data = await getFinshSign(this.finshSignForm)
      this.finish = data.data.totalElements
      for (const item of data.data.content) {
        this.finshSign.push([item.user_name_cache, item.user_number_cache])
      }
      const newData = this.config2
      newData.data = this.finshSign
      this.config2 = { ...newData }
      this.finshSign = data.data.content
    },
    async getUnFinshSignList() {
      this.finshSignForm.cid = this.$route.query.cid
      this.finshSignForm.siid = this.$route.query.siid
      const data = await getUnFinshSign(this.finshSignForm)
      this.unfinish = data.data.totalElements
      for (const item of data.data.content) {
        this.unfinshSign.push([item.user_name_cache, item.user_number_cache])
      }
      const newData = this.config
      newData.data = this.unfinshSign
      this.config = { ...newData }
    }
  }
}
</script>

<style scoped>
</style>
