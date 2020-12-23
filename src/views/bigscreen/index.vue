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
              ><span style="margin-left: 15px; margin-right: 15px"
                >已签到</span
              ></dv-decoration-7
            >
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
              ><span style="margin-left: 15px; margin-right: 15px"
                >签到进度</span
              ></dv-decoration-7
            >
            <dv-percent-pond
              :config="config1"
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
              ><span style="margin-left: 15px; margin-right: 15px"
                >签到二维码</span
              ></dv-decoration-7
            >
            <vue-qr
              :logoSrc="downloadData.icon"
              :text="downloadData.url"
              :size="200"
              :margin="2"
              style="
                margin-left: 25%;
                margin-right: 30%;
                margin-top: 20px;
                margin-bottom: 20px;
              "
            ></vue-qr>
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
              ><span style="margin-left: 15px; margin-right: 15px"
                >未签到</span
              ></dv-decoration-7
            >
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
import { getFinshSign, getUnFinshSign } from "@/api/signdata";
import VueQr from "vue-qr";
export default {
  components: {
    VueQr,
  },
  data() {
    return {
      downloadData: {
        url: "http://www.baidu.com",

        icon:
          "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2212207577,3515555468&fm=26&gp=0.jpg",
      },

      config: {
        header: ["姓名", "角色"],
        rowNum: 10,
        data: [],
      },
      config1: {
        value: 66,
        localGradient: true,
      },
      config2: {
        header: ["姓名", "学号"],
        rowNum: 10,
        data: [],
      },
      finshSignForm: {
        cid: 0,
        siid: 0,
      },
      finshSign: [],
      unfinshSign: [],
    };
  },
  created() {
    this.getFinshSignList();
    this.getUnFinshSignList();
  },
  methods: {
    async getFinshSignList() {
      this.finshSignForm.cid = this.$route.query.cid;
      this.finshSignForm.siid = this.$route.query.siid;
      const data = await getFinshSign(this.finshSignForm);
      for (const item of data.data.content) {
        this.finshSign.push([item.name, item.number]);
      }
      let newData = this.config2;
      newData.data = this.finshSign;
      this.config2 = { ...newData };
      this.finshSign = data.data.content;
    },
    async getUnFinshSignList() {
      this.finshSignForm.cid = this.$route.query.cid;
      this.finshSignForm.siid = this.$route.query.siid;
      const data = await getUnFinshSign(this.finshSignForm);
      for (const item of data.data.content) {
        this.unfinshSign.push([item.name, item.number]);
      }
      let newData = this.config;
      newData.data = this.unfinshSign;
      this.config = { ...newData };
    },
  },
};
</script>

<style scoped>
</style>
