<template>
  <div class="protocol">
    <div class="point-out" v-show="IsPonitOut">
      <p>是否确定我已知悉上述条款,同意在玉兰B2B在线平台签订2018年合作协议,并使用该系统进行日常订单往来，同时本人确认所有平台 操作行为均代表本人意愿！</p>
      <div class="btn1" @click="Check">确定</div>

      <div class="btn2" @click="Cancel">取消</div>
    </div>

    <div class="shadow" v-show="IsPonitOut"></div>

    <Top :top="set"></Top>
    <section class="content-box">
      <div class="content">
        <!-- <div class="content-body"> -->
        <p class="content-title">网络订单交易提示</p>
        <p
          class="content-text"
        >为提高年度经销协议签订效率，便于双方管理，从2015年开始，经销商年度协议的签订将通过玉兰经销商B2B平台进行，为保证您的交易安全，玉兰提醒您，请务必细读以下交易提示。</p>
        <div class="content-div">使用正确网址登陆我司网站</div>
        <p class="content-text">请直接输入玉兰B2B平台网址(地址名)登录，建议您将网站地址添加到浏览器的"收藏夹"以便随时进入。</p>
        <div class="content-div">请保管好您的账号密码</div>
        <p class="content-text">请确保使用本系统的人员为经销商法人或授权代表，并务必保管好您的账号、密码，不要泄露给其他人。</p>
        <div class="content-div">密码设置提醒</div>
        <p class="content-text">使用系统默认的密码登陆系统后请立即修改，并尽量避免规律组合，忘记密码的，可向区域主管人员申请办理密码重置。</p>
        <div class="content-div">法律效应确认</div>
        <p class="content-text">我司对通过该系统签订的年度协议或提交的网络订单均默认为经销商法人代表操作，与纸质协议及订单具同等效力。</p>
        <div class="content-div">保护计算机安全</div>
        <p class="content-text text">1.建议您定期安装最新的操作系统和浏览器安全程序或补丁。</p>
        <p class="content-text text">2.请您安装个人防火墙，防止黑客入侵您的计算机。</p>
        <p class="content-text text">3.请您安装杀毒软件，并养成定期查杀病毒及升级更新杀毒软件的习惯，防止病毒入侵。</p>
        <p class="content-text text">4.不要随意打开不明来历的电子邮件，防止计算机感染病毒。</p>
        <hr>
        <p class="content-text text">
          我已知悉上述条款，同意在玉兰B2B在线平台签订2019年合作协议，并使用该系统进行日常订单往来，
          同时本人确定所有平台操作行为均代表本人意愿！
        </p>
      </div>
      <!-- <div class="footer-block"></div> -->
      <!-- </div> -->
    </section>
    <div @click="PointOut" class="footer-button">我同意以上条款</div>
  </div>
</template>

<script>
import Top from "./Top";
import Client from "./Client";
import { bus } from "../utils/eventBus.js";

export default {
  data() {
    return {
      IsPonitOut: false,
      set: 0
    };
  },
  methods: {
    Check() {
      this.$http
        .post("/web_user/updateUserState.do", {
          cid: this.$store.state.info.data.loginName,
          userState: "1",
          year: this.$store.state.year
        })
        .then(res => {
          if (this.$store.state.info.data.type == "ECWEB") {
            this.$store.commit("userCheck", "1");
            this.$router.push({
              path: "/client"
              // query: { checked: 'true' }
            });
          }
          this.IsPonitOut = false;
        });
    },
    PointOut() {
      // this.$router.push({
      //   path:'/client',
      //   query: { a: 'sss' }
      // })
      this.IsPonitOut = true;
    },
    // toClient() {
    //   this.$router.push({
    //     path: '/client'
    //   })
    // },
    Cancel() {
      this.IsPonitOut = false;
    }
  },
  components: {
    Top
  }
};
</script>

<style scoped>
a,
u {
  color: rgb(0, 0, 0);
}
* {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.protocol {
  background-color: rgb(239, 239, 239);
  margin: 0;
  padding: 0;
}
.protocol::-webkit-scrollbar {
  display: none;
}
.shadow {
  position: absolute;
  z-index: 101;
  width: 100%;
  height: 100%;
  opacity: 0.4;
  background-color: #3b3b3b;
}
.point-out {
  border-radius: 10px;
  width: 286px;
  height: 268px;
  position: fixed;
  z-index: 150;
  left: 50%;
  top: 195px;
  margin-left: -143px;
  background-color: #fff;
}
.point-out > p {
  text-align: center;
  position: relative;
  height: 139px;
  width: 198px;
  box-sizing: border-box;
  margin: 0 auto;
  margin-top: 48px;
  left: 50%;
  margin-left: -99px;
  font-size: 15px;
  color: #7d7d7d;
}
.btn1 {
  width: 143px;
  height: 49px;
  line-height: 49px;
  position: absolute;
  left: 0;
  bottom: 0;
  font-size: 18px;
  border-radius: 0 0 0 7px;
  color: #ffffff;
  background-color: #4b4b4b;
}
.btn2 {
  width: 143px;
  height: 49px;
  line-height: 49px;
  position: absolute;
  right: 0;
  bottom: 0;
  color: #7d7d7d;
  font-size: 18px;
  border-radius: 0 0 7px 0;
  background-color: #f2f2f2;
}
.content-box {
  height: 100vh;
  padding-top: 81px;
  box-sizing: border-box;
  width: 375px;
  position: relative;
  overflow: scroll;
  box-sizing: border-box;
  background-color: rgb(239, 239, 239);
}
.content {
  width: 318px;
  border-radius: 7px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin: auto;
  padding: 0 26px;
  margin-bottom: 87px;
  box-sizing: border-box;
  padding-bottom: 40px;
  background-color: rgb(255, 255, 255);
  overflow: hidden;
  /* letter-spacing: 1px; */
}
.content-title {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin: 0;
  margin-top: 20px;
}
.content-text {
  text-align: left;
  width: 240px;
  margin: 15px auto;
  font-size: 13px;
  text-indent: 26px;
  color: #7d7d7d;
}
.text {
  margin: 0 auto;
}
.content-div {
  margin: 13px auto;
  padding-left: 10px;
  border-radius: 5px;
  padding-top: 2px;
  text-align: left;
  font-size: 13px;
  height: 22px;
  color: #000;
  box-sizing: border-box;
  background: -webkit-linear-gradient(
    to right,
    rgb(242, 242, 242),
    rgb(225, 225, 225)
  );
}
.footer-button {
  position: fixed;
  border-radius: 30px;
  bottom: 11px;
  width: 350px;
  height: 52px;
  margin-left: -175px;
  left: 50%;
  line-height: 52px;
  color: #fff;
  background: -webkit-linear-gradient(
    to right,
    rgb(173, 213, 107),
    rgb(134, 202, 129)
  );
}
</style>
