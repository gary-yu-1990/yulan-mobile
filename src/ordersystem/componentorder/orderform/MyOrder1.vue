<template>
  <div class="my-order">
    <top :top="set"></top>
    <img class="search-order" @click="toSearchOrder" src="../../assetsorder/search.png" alt="">
    <div class="order-nav">
      <ul>
        <li>
          <router-link to="/myorder/allorder" exact>全部</router-link>
        </li>
        <li>
          <router-link to="/myorder/notpay" exact>欠款待提交</router-link>
        </li>
        <li>
          <router-link to="/myorder/waitreceive" exact>欠款可提交</router-link>
        </li>
        <li>
          <router-link to="/myorder/checked" exact>已接收</router-link>
        </li>
        <li>
          <router-link to="/myorder/checked" exact>已受理</router-link>
        </li>
        <li>
          <router-link to="/myorder/waitcheck" exact>待审核</router-link>
        </li>
        <li>
          <router-link to="/myorder/checked" exact>已作废</router-link>
        </li>
        <li>
          <router-link to="/myorder/completed" exact>已完成</router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
    <navBottom :tab-stage="myRoute"></navBottom>
  </div>
</template>

<script>
  import top from '../../../components/Top'
  import navBottom from '../../../components/navBottom'


  export default {
    name: "myorder",
    components: {
      top,
      navBottom
    },
    data() {
      return {
        set: 13,
        //底部导航栏样式切换
        myRoute: "order"
      }
    },
    methods: {
      toSearchOrder() {
        this.$router.push({
          path: '/searchorder'
        })
      }
    }
  }
</script>

<style scoped>
  .my-order {
    margin: 15px 0;
    width: 100%;
    height: 100%;
    position: fixed;
    background: #FCFCFC;
  }

  /* 设置滚动条宽度 */
  ::-webkit-scrollbar {
    width: 0px;
  }
  ::-webkit-scrollbar {
    display: none; /*隐藏滚轮*/
  }

  .order-nav {
    width: 100%;
    /*height: 50px;*/
    overflow-x: scroll;
    background-color: white;
    margin: 50px 0px 5px 0px;
    position: fixed;
    z-index: 999;
    top: 0;
    -moz-box-shadow: 0px 1px 0 #e7e7e7;
    -webkit-box-shadow: 0px 1px 0 #e7e7e7;
    box-shadow: 0px 1px 0 #e7e7e7;
  }

  .order-nav ul {
    width: 130%;
    display: flex;
    justify-content: space-around;
    /*border-bottom: 1px solid #ebedf0*/
  }

  .order-nav li {
    display: inline-block;
    margin: 10px 0px;
    font-size: 13px;
    height: 15px;
    line-height: 18px;
  }

  .order-nav li a {
    color: #4B4B4B;
    padding-bottom: 5px;
  }

  .order-nav li a.router-link-active {
    border-bottom: 3px solid #8cbb44;
    color: #8cbb44;
    font-size: 15px;
    font-weight: bold;
  }

  .search-order {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 0;
    right: 15px;
    z-index: 999;
  }

</style>
