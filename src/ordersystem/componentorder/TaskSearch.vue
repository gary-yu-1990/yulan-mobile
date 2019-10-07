<template>
  <div class="all-view">
    <top :top="set"></top>
    <div class="monthSel" @click="selTime">
      {{thisyear}}/{{thismonth}}
    </div>
    <div v-if="taskResult.assignments">
      <div class="task-title">
        <span>月任务：{{taskResult.assignments.assignments}}元</span>
        <span>促销目标任务：{{taskResult.assignments.assignmentsTarget}}元</span>
        <span>完成差额：{{taskResult.assignments.assignmentsTarget-taskResult.assignments.assignments}}元</span>
      </div>
    </div>
    <div class="alllists" v-if="taskResult.orders">
      <div class="singleItem" v-for="taskItem in taskResult.orders">
        <table>
          <tr>
            <td>时间：</td>
            <td>{{taskItem.WEB_TJ_TIME}}</td>
          </tr>
          <tr>
            <td>订单号：</td>
            <td>{{taskItem.ORDER_NO}}</td>
          </tr>
          <tr>
            <td>订单金额：</td>
            <td>{{taskItem.ALL_SPEND}}（元）</td>
          </tr>
          <tr>
            <td>年返利/月返利：</td>
            <td>{{taskItem.ALLBACK_Y}}/{{taskItem.ALLBACK_M}}（元）</td>
          </tr>
          <tr>
            <td>实付金额：</td>
            <td>{{taskItem.ALL_SPEND-taskItem.ALLBACK_Y-taskItem.ALLBACK_M}}（元）</td>
          </tr>
          <tr>
            <td>返利金额：</td>
            <td>{{taskItem.REBATE_MONEY}}（元）</td>
          </tr>
          <tr>
            <td>备注：</td>
            <td>{{taskItem.REBATE_NOTES}}</td>
          </tr>
        </table>
        <span class="order-state">已接收</span>
      </div>
    </div>
    <div class="total-bottom">
      <span>订单总金额:20000元</span>
      <span>实付总金额:1000元</span>
      <span>返利金额(年返/月返):100/200元</span>
      <span>返利总金额:300元</span>
    </div>
    <!--选择时间-->
    <div class="timesel">
      <van-popup v-model="showtime">
        <van-datetime-picker
          v-model="currentDate"
          type="year-month"
          :formatter="formatter"
          @confirm="confirmTime"
          @cancel="cancelTime"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import top from '../../components/Top'
  import {DatetimePicker, Popup } from 'vant';

  export default {
    name: "",
    components: {
      top,
      [DatetimePicker.name]: DatetimePicker,
      [Popup.name]: Popup
    },
    data() {
      return {
        set: 29,
        showtime: false,
        currentDate: new Date(),
        thisyear: new Date().getFullYear(),
        thismonth: new Date().getMonth() + 1,
        taskResult:{}
      }
    },
    methods: {
      formatter(type, value) {
        if (type === 'year') {
          return `${value}年`;
        } else if (type === 'month') {
          return `${value}月`
        }
        return value;
      },
      taskSear() {
        this.taskResult = {}
        if (this.thismonth < 10) {
          this.thismonth = "0" + this.thismonth
        }
        let url = this.orderBaseUrl + "/assignments/getAssignments.do"
        let data = {
          "companyId":this.$store.getters.getCMId,//客户号
          "year":this.thisyear,//年份
          "month":this.thismonth//月份
        }
        console.log(data)
        axios.post(url,data).then(
          res => {
            console.log(res)
            this.taskResult = res.data.data
          }
        )
      },

      //时间选择
      selTime() {
        this.showtime = true
      },
      confirmTime(val) {
        console.log(val)
        this.showtime = false
        this.thismonth = val.getMonth() + 1
        this.thisyear = val.getFullYear()
        this.taskSear()
      },
      cancelTime() {
        this.showtime = false
      }
    },
    created() {
      this.taskSear()
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

  .monthSel {
    position: fixed;
    right: 10px;
    top: 14px;
    z-index: 999;
    width: 80px;
    height: 20px;
    line-height: 20px;
    background: #e9e9e9 url("../assetsorder/time-zk.png") no-repeat 70px;
    background-size: 15PX;
    border-radius: 10px;
    font-size: 13px;
    padding-right: 10px;
  }

  .timesel .van-popup {
    width: 280px;
    border-radius: 5px;
  }

  .task-title {
    position: fixed;
    z-index: 99;
    height: 30px;
    width: 100%;
    display: -webkit-box;
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    -webkit-overflow-scrolling:touch;
    line-height: 30px;
    margin-top: 50px;
    background: #FFFFFF;
    border-bottom: 1px solid #dedede;
    font-size: 10px;
  }

  .task-title span {
    margin: 0 10px;
    width: 70px;
  }
  .alllists{
    margin-top: 100px;
    margin-bottom: 60px;
  }
  .singleItem {
    position: relative;
    background: white;
    border-radius: 5px;
    margin: 10px;
    font-size: 14px;
    padding: 5px 12px;
  }
  .singleItem td {
    text-align: left;
  }
  .order-state {
    position: absolute;
    top: 5px;
    right: 12px;
    color: #ff5227;
  }
  .total-bottom {
    position: fixed;
    bottom: 0;
    height: 40px;
    width: 100%;
    display: -webkit-box;
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    -webkit-overflow-scrolling:touch;
    line-height: 40px;
    /*background: linear-gradient(90deg,#bedd81,#87ca81);*/
    background: #89cb81;
    font-size: 10px;
    color: white;
  }
  .total-bottom span {
    margin: 0 10px;
  }
</style>
