<template>
  <div class="box">
    <div class="wrap"></div>
    <div class="warn">
      <!-- <img src="http://14.29.221.109:10250/upload/assets/warn.png" alt="" class="img-warn"> -->
      <!-- <div class="img-warn"></div> -->
      <!-- <img src="http://14.29.221.109:10250/upload/assets/close.png" alt="" class="img-close" @click="close"> -->
      <div class="img-close" @click="close"></div>
      <p>{{msg}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["set", "msg"],
  // data() {
  //     return {
  //         msg:'账号或密码错误 ！',
  //     }
  // },
  methods: {
    close() {
      //this.set = false;
      this.$emit("reloadMsg");
      this.$emit("listen", false);
    }
  }
  // watch:{
  //     set(){
  //         this.reload();
  //     }
  // }
};
</script>

<style scoped>
.box {
  font-family: "PingFang-Regular", sans-serif;
}
.wrap {
  /* display: none; */
  width: 100%;
  height: 1000px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(59, 59, 59, 0.15);
}
.warn {
  width: 267px;
  height: 137px;
  position: fixed;
  left: 54px;
  top: 231px;
  z-index: 20;
  background-color: #ffffff;
  border-radius: 10px;
}
/* .img-warn{
        width: 65px;
        height: 65px;
        margin-top:57px;
        position: relative;
        left: -2px;
        margin-left: 100px;
        background: url("http://14.29.221.109:10250/upload/assets/warn.png");
        background-size: 100% 100%
    } */
.img-close {
  width: 15px;
  height: 15px;
  position: absolute;
  right: 10px;
  top: 10px;
  /* background: url("http://14.29.221.109:10250/upload/assets/close.png"); */
  background: url(../assets/close.png);
  background-size: 100% 100%;
}
.warn p {
  font-size: 18px;
  letter-spacing: 1px;
  position: relative;
  top: 40px;
  /* font-weight: bold; */
  color: #7d7d7d;
  line-height: 18px;
  margin: 22px 0 0 0;
  padding-left: 20px;
}
</style>
