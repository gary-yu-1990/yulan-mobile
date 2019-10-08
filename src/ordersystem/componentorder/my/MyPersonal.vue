<template>
  <div class="all-view">
    <div class="person-title">个人中心</div>
    <div class="all-item">
      <div class="user-img"></div>
        <p class="customer-name">{{customer}}</p>
      <div class="item" @click="myCoupon">
        <img class="item-icon" src="../../assetsorder/mycoupon.png" alt="">
        <span>我的优惠券</span>
        <img class="item-more" src="../../assetsorder/more.png" alt="">
      </div>
      <div class="item" style="margin-top:20px;text-align:center;" @click="unlogin">
          <span style="margin:auto 0;">退出登录</span>
        </div>
    </div>
    <navBottom :tab-stage="myRoute"></navBottom>
  </div>
</template>

<script>
  import top from '../../../components/Top'
  import navBottom from '../../../components/navBottom'

  export default {
    name: "",
    components: {
      top,
      navBottom
    },
    data() {
      return{
        set:26,
        myRoute:"personal"
      }
    },
    computed:{
      customer() {
        return this.$store.state.info.data.realName;
      },
    },
    methods:{
      myCoupon(){
        this.$router.push({
          path:'/mycoupon'
        })
      },
      unlogin() {
        this.$router.push({
          path: "/"
        });
      },
    }
  }
</script>

<style scoped>
  .all-view {
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0px;
    background-color: #f8f8f8;
    overflow: scroll;
  }
  .person-title {
    height: 50px;
    line-height: 50px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    font-size: 15px;
    background: linear-gradient(to right, #BEDD81, #87CA81);
    color: white;
  }
  .all-item {
    margin-top: 50px;
  }
  .item {
    position: relative;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #DEDEDE;
    text-align: left;
    background: white;
  }
  .item-icon {
    width: 20px;
    height: 20px;
    position: absolute;
    left: 10px;
    top: 50%;
    margin-top: -10px;
  }
  .item-more{
    width: 20px;
    height: 20px;
    position: absolute;
    right:10px;
    top: 50%;
    margin-top: -10px;
  }
  .item span{
    font-size: 15px;
    margin-left: 40px;
  }
    .user-img {
    width: 73px;
    height: 73px;
    background-image: url("http://14.29.221.109:10250/upload/assets/userImg.png");
    background-position: center;
    background-size: contain;
    position: relative;
    margin: 0 auto;
    margin-top: 55px;
  }
    .customer-name {
    font-size: 15px;
    color: #7d7d7d;
    margin: 0;
    margin-top: 14px;
    margin-bottom: 15px;
  }
  .quit-box {
    border-bottom: 1px solid #d8d8d8;
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
    background-image: url("http://14.29.221.109:10250/upload/assets/quit.png");
    background-position: center;
    background-size: contain;
    position: absolute;
    top: 50%;
    margin-top: -11px;
    left: 52px;
  }
</style>
