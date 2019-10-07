<template>
  <div class="announcement">
    <top :top="set"></top>
    <div class="content">
      <div class="content-box"></div>
      <li v-for="notice in notices" :key="notice.id">
        <Notice :notice='notice'></Notice>
      </li>
    </div>
  </div>
</template>

<script>
import top from './Top'
import Notice from './Notice'
export default {
  data() {
    return {
      set: 6
    }
  },
  mounted() {

    this.$http.post('/infoState/getCustomerInfoCardState.do',{
      "cid": "C15056"
    }).then(res => {
      console.log(res);
    })
  },
  computed: {
    notices() {
      return [
        {
          text: '关于优化售后工作流程的通知',
          date: '2017-11-27'
        },
        {
          text: '您的网签协议书已被退回',
          date: '2017-11-26'
        },
      ]
    }
  },
  components:{
    top,Notice
  }
}
</script>

<style scoped>
  .announcement{
    width: 375px;
    height: 100vh;
    position: relative;
    background-color: #EFEFEF;
  }
  .content{
    width: 375px;
    position: relative;
    margin-top: 50px;
  }
  li{
    list-style: none;
  }
  .content-box{
    width: 375px;
    height: 25px;
  }
</style>
