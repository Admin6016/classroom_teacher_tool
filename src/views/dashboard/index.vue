<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="24">
        <div class="top-item">
          <div class="top-item-1">
            <img
              class="top-item-icon"
              src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
              alt=""
            />
          </div>
          <div class="top-item-2">
            <div class="dashboard-text">{{ words_time }}{{ name }}</div>
            <div class="dashboard-text1">中原工学院 || 彼得堡航空学院</div>
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="xiangqing">
          <div>
            <a-spin :spinning="spinning" tip="用户修改中">
              <a-card title="资料" :bordered="true" style="width: 100%">
                <a-spin :spinning="spinning_c" tip="用户信息加载中">
                  <a-descriptions title="用户信息">
                    <a-descriptions-item label="用户名">
                      {{ user.username }}
                      <el-popover
                        placement="right-end"
                        width="160"
                        v-model="visible"
                        trigger="manual"
                      >
                        <div>
                          <el-input
                            prefix-icon="el-icon-s-data"
                            size="mini"
                            v-model="user.username"
                            placeholder="输入要修改的值"
                          ></el-input>
                          <div style="margin-top: 10px;">
                            <el-button
                              size="mini"
                              type="info"
                              @click="visible = false"
                            >取消
                            </el-button
                            >
                            <el-button
                              style="margin-left: 21px"
                              type="primary"
                              size="mini"
                              @click="editUserTrue"
                              >确定</el-button
                            >
                          </div>
                        </div>

                        <el-button
                          slot="reference"
                          @click="visible = true"
                          icon="el-icon-edit"
                          circle
                          size="mini"
                        ></el-button>
                      </el-popover>
                    </a-descriptions-item>
                    <a-descriptions-item label="手机号">
                      {{ user.telephone }}
                      <el-popover
                        placement="right-end"
                        width="160"
                        v-model="visible1"
                        trigger="manual"
                      >
                        <div>
                          <el-input
                            prefix-icon="el-icon-s-data"
                            size="mini"
                            v-model="user.telephone"
                            placeholder="输入要修改的值"
                          ></el-input>
                          <div style="margin-top: 10px;">
                            <el-button
                              size="mini"
                              type="info"
                              @click="visible1 = false"
                            >取消
                            </el-button
                            >
                            <el-button
                              style="margin-left: 21px"
                              type="primary"
                              size="mini"
                              @click="editUserTrue"
                            >确定
                            </el-button
                            >
                          </div>
                        </div>

                        <el-button
                          slot="reference"
                          @click="visible1 = true"
                          icon="el-icon-edit"
                          circle
                          size="mini"
                        ></el-button>
                      </el-popover>
                    </a-descriptions-item>
                    <a-descriptions-item label="位置">
                      {{ user.location }}
                      <el-popover
                        placement="right-end"
                        width="160"
                        v-model="visible2"
                        trigger="manual"
                      >
                        <div>
                          <el-input
                            prefix-icon="el-icon-s-data"
                            size="mini"
                            v-model="user.location"
                            placeholder="输入要修改的值"
                          ></el-input>
                          <div style="margin-top: 10px;">
                            <el-button
                              size="mini"
                              type="info"
                              @click="visible2 = false"
                            >取消
                            </el-button
                            >
                            <el-button
                              style="margin-left: 21px"
                              type="primary"
                              size="mini"
                              @click="editUserTrue"
                            >确定
                            </el-button
                            >
                          </div>
                        </div>

                        <el-button
                          slot="reference"
                          @click="visible2 = true"
                          icon="el-icon-edit"
                          circle
                          size="mini"
                        ></el-button>
                      </el-popover>
                    </a-descriptions-item>
                    <a-descriptions-item label="性别">
                      {{ user.sex }}
                    </a-descriptions-item>
                    <a-descriptions-item label="备注">
                      {{ input }}
                      <el-popover
                        placement="right-end"
                        width="160"
                        v-model="visible3"
                        trigger="manual"
                      >
                        <div>
                          <el-input
                            prefix-icon="el-icon-s-data"
                            size="mini"
                            v-model="user.note"
                            placeholder="输入要修改的值"
                          ></el-input>
                          <div style="margin-top: 10px;">
                            <el-button
                              size="mini"
                              type="info"
                              @click="visible3 = false"
                            >取消
                            </el-button
                            >
                            <el-button
                              style="margin-left: 21px"
                              type="primary"
                              size="mini"

                            >确定
                            </el-button
                            >
                          </div>
                        </div>

                        <el-button
                          slot="reference"
                          @click="visible3 = true"
                          icon="el-icon-edit"
                          circle
                          size="mini"
                        ></el-button>
                      </el-popover>
                    </a-descriptions-item>
                  </a-descriptions>
                </a-spin>
              </a-card>
            </a-spin>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div style="padding: 30px">
          <a-card title="消息" :bordered="true" style="width: 100%">
            <a-list item-layout="horizontal" :data-source="data">
              <a-list-item slot="renderItem" slot-scope="item, index">
                <a-list-item-meta
                  description="language for background applications, is refined by Ant UED Team"
                >
                  <a slot="title" href="https://www.baidu.com/">{{
                    item.title
                  }}</a>
                  <a-avatar
                    slot="avatar"
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  />
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div style="padding: 30px">
          <a-card title="考勤率" :bordered="false" style="width: 100%">
            <div id="container" />
          </a-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Chart, registerShape } from "@antv/g2";
const data = [
  {
    title: "Title 1",
  },
  {
    title: "Title 2",
  },
  {
    title: "Title 3",
  },
  {
    title: "Title 4",
  },
];
import { mapGetters } from "vuex";
import { getUserById, editUsername, editUser } from "@/api/user";
export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name", "uid"]),
    words_time() {
      const hour = new Date().getHours();
      if (hour < 3) {
        return "夜深了，";
      }
      if (hour < 6) {
        return "凌晨了，";
      }
      if (hour < 11) {
        return "上午好，";
      }
      if (hour < 14) {
        return "中午好，";
      }
      if (hour < 17) {
        return "下午好，";
      }
      if (hour < 20) {
        return "傍晚了，";
      }
      return "晚上好，";
    },
  },
  data() {
    return {
      visible: false,
      visible1: false,
      visible2: false,
      visible3: false,
      input: "",
      data,
      user: {},
      spinning_c: false,
      spinning: false,
    };
  },
  mounted() {
    registerShape("point", "pointer", {
      draw(cfg, container) {
        const group = container.addGroup();
        const center = this.parsePoint({ x: 0, y: 0 }); // 获取极坐标系下画布中心点
        // 绘制指针
        group.addShape("line", {
          attrs: {
            x1: center.x,
            y1: center.y,
            x2: cfg.x,
            y2: cfg.y,
            stroke: cfg.color,
            lineWidth: 5,
            lineCap: "round",
          },
        });
        group.addShape("circle", {
          attrs: {
            x: center.x,
            y: center.y,
            r: 9.75,
            stroke: cfg.color,
            lineWidth: 4.5,
            fill: "#fff",
          },
        });

        return group;
      },
    });

    const data = [{ value: 5.6 }];
    const chart = new Chart({
      container: "container",
      autoFit: true,
      height: 290,
      padding: [0, 0, 30, 0],
    });
    chart.data(data);
    chart.scale("value", {
      min: 0,
      max: 9,
      tickInterval: 1,
    });
    chart.coordinate("polar", {
      startAngle: (-9 / 8) * Math.PI,
      endAngle: (1 / 8) * Math.PI,
      radius: 0.75,
    });

    chart.axis("1", false);
    chart.axis("value", {
      line: null,
      label: {
        offset: -36,
        style: {
          fontSize: 18,
          textAlign: "center",
          textBaseline: "middle",
        },
      },
      subTickLine: {
        count: 4,
        length: -15,
      },
      tickLine: {
        length: -24,
      },
      grid: null,
    });
    chart.legend(false);
    chart
      .point()
      .position("value*1")
      .shape("pointer")
      .color("#1890FF")
      .animate({
        appear: {
          animation: "fade-in",
        },
      });

    // 绘制仪表盘背景
    chart.annotation().arc({
      top: false,
      start: [0, 1],
      end: [9, 1],
      style: {
        // 底灰色
        stroke: "#CBCBCB",
        lineWidth: 18,
        lineDash: null,
      },
    });

    // 绘制指标
    chart.annotation().arc({
      start: [0, 1],
      end: [data[0].value, 1],
      style: {
        stroke: "#1890FF",
        lineWidth: 18,
        lineDash: null,
      },
    });
    // 绘制指标数字
    chart.annotation().text({
      position: ["50%", "85%"],
      content: "合格率",
      style: {
        fontSize: 20,
        fill: "#545454",
        textAlign: "center",
      },
    });
    chart.annotation().text({
      position: ["50%", "90%"],
      content: `${data[0].value * 10} %`,
      style: {
        fontSize: 36,
        fill: "#545454",
        textAlign: "center",
      },
      offsetY: 15,
    });

    chart.render();
  },
  methods: {
    renderUser() {
      this.spinning_c = true;
      getUserById(this.uid).then((res) => {
        this.user = res.data.content[0];
        this.spinning_c = false;
      });
    },
    // 修改用户
    async editUserTrue() {
      this.spinning = true;
      this.visible = false;
      this.visible1 = false;
      this.visible2 = false;
      this.visible3 = false;

      const data = await editUser(this.user);
      // console.log(data);
      if (data.code < 0) {
        return this.$message.error("修改失败");
      }
      this.spinning = false;
      this.$message.success("修改成功");
    },
  },
  created() {
    this.renderUser();
  },
};
</script>

<style lang="scss" scoped>
//.app-main{
//  background-color: #fff;
//}
.dashboard {
  &-container {
    //margin: 30px;
    //padding-left: 30px;
    //padding-right: 30px;
    padding-bottom: 100px;
    width: 100%;
    height: 100%;
    background: #ececec;

    .top-item {
      // height: 72px;
      padding-top: 20px;
      padding-left: 20px;
      background-color: #fff;
      display: flex;
      justify-content: flex-start;
      padding-bottom: 20px;

      .top-item-1 {
        .top-item-icon {
          height: 72px;
          width: 72px;
          margin-right: 24px;
        }
      }

      .top-item-2 {
        .dashboard-text {
          font-size: 28px;
        }
        .dashboard-text1 {
          font-size: 14px;
        }
      }
    }
    .xiangqing {
      margin-top: 30px;
      margin-left: 30px;
      margin-right: 30px;
    }
  }
}
</style>
