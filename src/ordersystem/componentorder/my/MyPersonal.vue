<template>
  <div class="all-view">
    <div class="person-title">个人中心</div>
    <div class="all-item">
      <div class="item" @click="myCoupon">
        <img class="item-icon" src="../../assetsorder/mycoupon.png" alt="">
        <span>我的优惠券</span>
        <img class="item-more" src="../../assetsorder/more.png" alt="">
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
    methods:{
      myCoupon(){
        this.$router.push({
          path:'/mycoupon'
        })
      }
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
</style>
