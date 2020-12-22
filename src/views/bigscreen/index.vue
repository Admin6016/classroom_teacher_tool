<template>
  <div style="margin: 0">
    <dv-full-screen-container style="background-color: #000244">
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
                >签到进度</span
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
export default {
  data() {
    return {
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
        header: ["姓名", "角色"],
        rowNum: 10,
        data: [
          ["行1列1", "行1列2", "行1列3"],
          ["行2列1", "行2列2", "行2列3"],
          ["行3列1", "行3列2", "行3列3"],
          ["行4列1", "行4列2", "行4列3"],
          ["行5列1", "行5列2", "行5列3"],
          ["行6列1", "行6列2", "行6列3"],
          ["行7列1", "行7列2", "行7列3"],
          ["行8列1", "行8列2", "行8列3"],
          ["行9列1", "行9列2", "行9列3"],
          ["行10列1", "行10列2", "行10列3"],
          ["行2列1", "行2列2", "行2列3"],
          ["行3列1", "行3列2", "行3列3"],
          ["行4列1", "行4列2", "行4列3"],
          ["行5列1", "行5列2", "行5列3"],
          ["行6列1", "行6列2", "行6列3"],
          ["行7列1", "行7列2", "行7列3"],
          ["行8列1", "行8列2", "行8列3"],
          ["行9列1", "行9列2", "行9列3"],
          ["行10列1", "行10列2", "行10列3"],
        ],
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
      console.log(data);
      this.finshSign = data.data.content;
    },
    async getUnFinshSignList() {
      this.finshSignForm.cid = this.$route.query.cid;
      this.finshSignForm.siid = this.$route.query.siid;
      const data = await getUnFinshSign(this.finshSignForm);

      for (const item of data.data.content) {
        this.unfinshSign.push([item.name, item.role]);
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
