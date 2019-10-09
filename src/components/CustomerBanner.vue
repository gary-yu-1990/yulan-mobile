<template>
  <div class="banner">
    <!-- <div class="option-img" ref="option" @click="Sidebar"></div> -->
    <div class="app-name">玉兰B2B</div>
    <div class="customer-name">{{customer}}</div>
    <div class="login-time">
      <span>登陆:</span>
      <span class="time">{{logintime}}</span>
    </div>
    <!-- <div class="suona-img" @click="toAnnouncement"></div> -->
    <!-- <p class="notice"  @click="toAnnouncement">{{notice}}</p> -->
    <div class="left-img"></div>
    <div class="right-img"></div>
  </div>
</template>

<script>
import Protocol from "./Protocol";
// import sidebar from '../utils/move492.js'
import { bus } from "../utils/eventBus.js";
// import Salesman from './Salesman'

export default {
  name: "Banner",
  data() {
    return {};
  },
  props: ["IsSidebarOut"],
  computed: {
    notice() {
      return "公告";
    },
    customer() {
      if (this.$store.state.info.data)
        return this.$store.state.info.data.realName;
    },
    logintime() {
      return this.$store.state.info.logintime;
    }
  },
  mounted() {
    if (this.$store.state.info.data.realName.length >= 7) {
      document.getElementsByClassName("customer-name")[0].style.fontSize =
        "12px";
      document.getElementsByClassName("customer-name")[1].style.fontSize =
        "18px";
    } else {
      document.getElementsByClassName("customer-name")[0].style.fontSize =
        "15px";
      document.getElementsByClassName("customer-name")[1].style.fontSize =
        "25px";
    }
    if (this.$store.state.info.data.realName.length >= 10) {
      document.getElementsByClassName("customer-name")[0].style.fontSize =
        "8px";
      document.getElementsByClassName("customer-name")[1].style.fontSize =
        "16px";
    }
  },
  methods: {
    Sidebar() {
      console.log(this.IsSidebarOut);
      var customer = document.getElementsByClassName("customer")[0];
      // console.log(this.IsSidebarOut)
      if (this.IsSidebarOut == false) {
        customer.classList.remove("noactive-option");
        customer.classList.add("active-option");
        setTimeout(() => {
          bus.$emit("sidebarout");
        }, 300);
      }
    }
    // toAnnouncement() {
    //   this.$router.push({
    //     path:'/announcement'
    //   })
    // }
  }
};
</script>

<style scoped>
p {
  margin: 0;
}
.banner {
  width: 375px;
  height: 225px; /*205*/
  position: relative;
  background-color: #efefef;
}
.option-img {
  background-image: url("../assets/setting.png");
  width: 24px;
  height: 24px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  z-index: 3;
  top: 43px;
  left: 321px;
}
.app-name {
  font-size: 32px;
  color: #89cb81;
  position: absolute;
  top: 53px;
  left: 27px;
}
.customer-name {
  font-size: 25px;
  color: #000000;
  position: absolute;
  z-index: 1000;
  left: 27px;
  top: 119px;
  text-align: left;
}
.login-time {
  font-size: 13px;
  color: #7d7d7d;
  position: absolute;
  top: 170px;
  left: 27px;
}
.right-img {
  background: url("../assets/right-img.png");
  /* background-position: center; */
  background-size: contain;
  width: 250px;
  height: 250px;
  position: absolute;
  right: -18px;
  top: -23px;
}
.left-img {
  background: url("../assets/left-img.png");
  /* background-position: center; */
  background-size: contain;
  width: 115px;
  height: 114px;
  position: absolute;
  left: -28px;
  top: 85px;
}
.suona-img {
  background-image: url("../assets/suona2.png");
  width: 24px;
  height: 20px;
  background-size: contain;
  background-position: center;
  position: absolute;
  bottom: 45px;
  left: 31px;
  z-index: 100;
}
.notice {
  font-size: 15px;
  color: #7d7d7d;
  position: absolute;
  z-index: 100;
  bottom: 45px;
  left: 72px;
}
</style>
