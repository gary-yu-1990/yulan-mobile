<template>
  <div class="view">
    <div class="customer">
      <div class="sidebar">
        <div class="user-img"></div>
        <p class="customer-name">{{customer}}</p>
        <!-- <div class="history-box">
            <div class="history"></div><p class="history-p">历年经销协议书</p>
          </div>
          <div class="revise-load-box">
            <div class="revise-load"></div><p class="revise-load-p">修改登陆密码</p>
          </div>
          <div class="revise-bill-box">
            <div class="revise-bill"></div><p class="revise-bill-p">修改对账密码</p>
          </div>
          <div class="about-box">
            <div class="about"></div><p class="about-p">关于APP</p>
        </div>-->
        <div class="quit-box" @click="unlogin">
          <div class="quit"></div>
          <p class="quit-p">退出登录</p>
        </div>
      </div>
      <section class="content" @click.stop="Sidebar">
        <CustomerBanner :IsSidebarOut="IsSidebarOut"></CustomerBanner>
        <div class="gnBlock">
          <div class="blockH">
            <div class="btn" @click="toClient">
              <div class="btn-img btn1-img"></div>
              <p class="btn-p">网络协议签订</p>
            </div>
            <div class="btn" @click="toShopStore">
              <div class="btn-img btn2-img"></div>
              <p class="btn-p">玉兰产品</p>
            </div>
            <div class="btn" @click="toBillmanage">
              <div class="btn-img btn3-img"></div>
              <p class="btn-p">对账单管理</p>
            </div>
          </div>
          <div class="blockH">
            <div class="btn" @click="toBank">
              <div class="btn-img btn4-img"></div>
              <p class="btn-p">银行汇款凭证</p>
            </div>
            <div class="btn" @click="toWtPh">
              <div class="btn-img btn5-img"></div>
              <p class="btn-p">委托喷绘</p>
            </div>
            <div class="btn" @click="toTuiHuo">
              <div class="btn-img btn6-img"></div>
              <p class="btn-p">退货赔偿</p>
            </div>
          </div>
          <div class="blockH">
            <div class="btn" @click="nodo">
              <div class="btn-img btn7-img"></div>
              <p class="btn-p">兰居设计</p>
            </div>
            <div class="btn" @click="nodo">
              <div class="btn-img btn8-img"></div>
              <p class="btn-p">形象店设计</p>
            </div>
            <div class="btn" @click="toSearchTask">
              <div class="btn-img btn9-img"></div>
              <p class="btn-p">任务查询</p>
            </div>
          </div>
        </div>
      </section>
      <navBottom :change-style="style"></navBottom>
    </div>
  </div>
</template>

<script>
import { bus } from "../utils/eventBus.js";
import CustomerBanner from "./CustomerBanner";
import navBottom from "@/components/navBottom";
import { Toast } from "vant";
import { QueryWebMenuByUserId } from "@/api/webMenuASP";

export default {
  data() {
    return {
      IsSidebarOut: false,
      style: "customer"
    };
  },
  components: {
    CustomerBanner,
    bus,
    navBottom,
    [Toast.name]: Toast
  },
  computed: {
    customer() {
      if (this.$store.state.info.data)
        return this.$store.state.info.data.realName;
    },
  },
  methods: {
    //获得菜单数组并传入store ,await并不会阻塞主线程，这里并不起作用
    async getMenuTree() {
      this.$store.commit("emptyMenuTreeList");
      await QueryWebMenuByUserId({
        userid: this.$store.state.info.data.userId
      }).then(res => {
        if (res.data.children.length > 0) {
          this.$store.commit("setMenuTreeList", res.data.children);
        } else {
          this.$alert("没有菜单权限，请联系管理员配置", "提示", {
            confirmButtonText: "确定",
            type: "success"
          });
        }
      });
    },
    clickToPath(path) {
      this.$router.push({
        path: "/" + path
      });
    },
    Sidebar() {
      // var customer = document.getElementsByClassName("customer")[0];
      // if (this.IsSidebarOut == true) {
      //   customer.classList.remove("active-option");
      //   customer.classList.add("noactive-option");
      //   setTimeout(() => {
      //     this.IsSidebarOut = false;
      //   }, 300);
      // }
    },
    unlogin() {
      this.$router.push({
        path: "/"
      });
    },
    toClient() {
          this.$router.push({
            path: "/client"
          });
    },
    //前往商城
    toShopStore() {
      this.$router.push({
        path: "/shopstore"
      });
    },
    toSearchTask() {
      this.$router.push({
        path: "/tasksearch"
      });
    },
    toBillmanage() {
      this.$router.push({
        path: "/billmanage"
      });
    },
    toBank() {
      this.$router.push({
        path: "/bank"
      });
    },
    toWtPh() {
      this.$router.push({
        path: "/wtphlists"
      });
    },
    toTuiHuo() {
      this.$router.push({
        path: "/tuihuolists"
      });
    },
    nodo() {
      Toast({
        duration: 2000,
        message: "功能正在完善，敬请期待"
      });
    }
  },
  created() {
    bus.$on("sidebarout", () => {
      this.IsSidebarOut = true;
    });
    this.getMenuTree(); //获得菜单权限树
  }
};
</script>

<style scoped>
p {
  margin: 0;
}
* {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.btn {
  height: 60px;
  line-height: 90px;
  width: 120px;
  margin: 0 10px;
  background-color: #fff;
  position: relative;
  z-index: 100;
  border-radius: 7px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
}
.btn-img {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 5px;
  left: 50%;
  margin-left: -15px;
  background-size: contain !important;
  background-position: center !important;
}

.btn1-img {
  background: url("../assets/form.png");
}

.btn2-img {
  background: url("../ordersystem/assetsorder/shopping.png");
}

.btn3-img {
  background: url("../ordersystem/assetsorder/dzd.png");
}
.btn4-img {
  background: url("../ordersystem/assetsorder/hkpz.png");
}
.btn5-img {
  background: url("../ordersystem/assetsorder/wtph.png");
}
.btn6-img {
  background: url("../ordersystem/assetsorder/thpc.png");
}
.btn7-img {
  background: url("../ordersystem/assetsorder/ljsj.png");
}
.btn8-img {
  background: url("../ordersystem/assetsorder/xxd.png");
}
.btn9-img {
  background: url("../ordersystem/assetsorder/shopping.png");
}
.btn-p {
  margin: 0;
  color: #051d05;
  font-size: 13px;
  /*margin-left: 40px;*/
}
.view {
  height: 100vh;
  width: 375px;
  overflow: hidden;
}
.sidebar {
  width: 200px;
  height: 100vh;
  position: relative;

  float: right;
  background-color: #efefef;
}
.user-img {
  width: 70px;
  height: 70px;
  background-image: url("../assets/userImg.png");
  background-position: center;
  background-size: contain;
  position: relative;
  margin: 0 auto;
  margin-top: 52px;
}
.customer-name {
  font-size: 15px;
  color: #7d7d7d;
  margin: 0;
  margin-top: 14px;
  margin-bottom: 15px;
}
.line {
  width: 100%;
  height: 1px;
  background-color: #d8d8d8;
  margin-bottom: 52px;
}
.history-box,
.about-box,
.quit-box,
.revise-load-box,
.revise-bill-box {
  height: 52px;
  line-height: 52px;
  width: 100%;
  font-size: 15px;
  color: #7d7d7d;
  border-top: 1px solid #d8d8d8;
  /* border-bottom: 1px solid #D8D8D8; */
  position: relative;
  box-sizing: border-box;
}
.quit-box {
  border-bottom: 1px solid #d8d8d8;
}
.history {
  width: 21px;
  height: 24px;
  background-image: url("../assets/aggrement2.png");
  background-position: center;
  background-size: contain;
  position: absolute;
  top: 50%;
  margin-top: -11px;
  left: 36px;
}
.history-p {
  position: absolute;
  left: 65px;
}
.about {
  width: 22px;
  height: 22px;
  background-image: url("../assets/about.png");
  background-position: center;
  background-size: contain;
  position: absolute;
  top: 50%;
  margin-top: -11px;
  left: 55px;
}
.revise-load {
  width: 22px;
  height: 22px;
  background-image: url("../assets/unlock.png");
  background-position: center;
  background-size: contain;
  position: absolute;
  top: 50%;
  margin-top: -11px;
  left: 43px;
}
.revise-bill-p {
  position: absolute;
  left: 72px;
}
.revise-load-p {
  position: absolute;
  left: 72px;
}
.revise-bill {
  width: 22px;
  height: 22px;
  background-image: url("../assets/edit.png");
  background-position: center;
  background-size: contain;
  position: absolute;
  top: 50%;
  margin-top: -11px;
  left: 43px;
}
.about-p {
  margin: 0;
  /* width: 60px;
      height: 22px; */
  font-size: 15px;
  color: #7d7d7d;
  position: absolute;
  left: 85px;
}
.quit-p {
  margin: 0;
  /* width: 60px; */
  /* height: 21px; */
  font-size: 15px;
  color: #7d7d7d;
  position: absolute;
  left: 82px;
}
.quit {
  width: 22px;
  height: 22px;
  background-image: url("../assets/quit.png");
  background-position: center;
  background-size: contain;
  position: absolute;
  top: 50%;
  margin-top: -11px;
  left: 52px;
}
.customer {
  width: 575px;
  height: 100vh;
  right: 0;
  position: relative;
  background-color: #efefef;
  overflow: hidden;
  transition: margin-left 0.3s;
  -webkit-transition: margin-left 0.3s;
  -moz-transition: margin-left 0.3s; /* Firefox 4 */
  -o-transition: margin-left 0.3s; /* Opera */
}
/* .slide-fade-enter-active {
      transition: all .3s ease;
  } */
.active-option {
  margin-left: -200px;
}
.noactive-option {
  margin-left: 0px;
}
.customer::-webkit-scrollbar {
  display: none;
}
.content {
  width: 375px;
  /* height: 100vh; */
  height: 100vh;
  float: left;
  position: relative;
  z-index: 10;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.gnBlock {
  position: relative;
}

.blockH {
  margin-bottom: 20px;
  position: relative;
  display: flex;
  justify-content: center;
}
</style>
