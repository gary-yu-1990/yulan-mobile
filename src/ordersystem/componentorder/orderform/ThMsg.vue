<template>
  <div class="thmsg">
    <top :top="set"></top>
    <div class="top-nav">
      <table width="100%">
        <tr>
          <th width="40%">型号</th>
          <th width="30%">总数量</th>
          <th width="30%">待发数量</th>
        </tr>
        <tr>
          <td>{{itemno}}</td>
          <td>{{total}}卷</td>
          <td>{{waitNum}}卷</td>
        </tr>
      </table>
    </div>
    <div class="all-th">
      <div class="single-th" v-for="singleTh in thMsg">
        <table>
          <tr>
            <td>提货单号：</td>
            <td>{{singleTh.saleNo}}</td>
          </tr>
          <tr>
            <td>数量/批号：</td>
            <td>{{singleTh.qtyDeliver}}卷/{{singleTh.batchNo}}批</td>
          </tr>
          <tr>
            <td>发货日期：</td>
            <td>{{singleTh.dateOutStock}}</td>
          </tr>
          <tr>
            <td>物流公司：</td>
            <td>{{singleTh.transcompany}}</td>
          </tr>
          <tr>
            <td>物流单号：</td>
            <td>{{singleTh.transId}}</td>
          </tr>
        </table>
        <div class="check-wl">查看物流</div>
      </div>
    </div>
    <!--<div class="df-num">-->
      <!--<span>待发数量：5卷</span>-->
    <!--</div>-->
  </div>
</template>

<script>
  import top from '../../../components/Top'
  import axios from 'axios'

  export default {
    name: "",
    components: {
      top
    },
    data() {
      return {
        url:"http://106.13.32.172:8080/yulan-order",
        set: 25,
        //提货详情(数组)
        thMsg:[],
        itemno:this.$route.params.itemNo,
        total:"",//总数量
        waitNum:"", //待发数量
        yfNum:""//已发总数量
      }
    },
    methods:{
      checkWl(){
        this.$router.push({
          path:'/checkwl'
        })
      },
      initdata(){
        let Thurl = this.orderBaseUrl + "/packDetail/getPackDetailAppoint.do"
        let data = {
          "itemNo":this.$route.params.itemNo,
          "orderId":this.$route.params.orderId
          // "itemNo":"E350003",
          // "orderId":"X1809060001"
        }
        axios.post(Thurl,data).then(
          res => {
            // console.log(res)
            this.thMsg = res.data.packDetails
            this.yfNum = 0
            for (let i = 0;i < res.data.packDetails.length; i++) {
              this.yfNum += res.data.packDetails[i].qtyDeliver
            }
            this.total = res.data.allCount
            this.waitNum = this.total - this.yfNum
          }
        )
      }
    },
    created(){
      this.initdata()
    }
  }
</script>

<style scoped>
  .thmsg {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    background-color: #f8f8f8;
    overflow: scroll;
  }

  .top-nav {
    position: fixed;
    width: 100%;
    top: 50px;
    height: 50px;
    background: white;
    -moz-box-shadow: 0px 2px 9px #858585;
    -webkit-box-shadow: 0px 2px 9px #858585;
    box-shadow: 0px 2px 9px #858585;
    font-size: 15px;
  }

  .all-th {
    margin-top: 120px;
  }
  .single-th {
    border-radius: 15px;
    background: white;
    margin: 10px;
    padding: 10px;
    position: relative;
    font-size: 15px;
  }

  .single-th th {
    text-align: right;
  }

  .single-th td {
    text-align: left;
  }

  .check-wl {
    position: absolute;
    right: 10px;
    bottom: 10px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    width: 70px;
    border-radius: 15px;
    background: #89cb81;
    padding: 0 10px;
    color: white;
    font-size: 15px;
  }

  .df-num {
    height: 50px;
    width: 100%;
    line-height: 50px;
    position: fixed;
    bottom: 0;
    left: 0;
    text-align: right;
    /*padding-right: 20px;*/
    -moz-box-shadow: 0px -2px 9px #858585;
    -webkit-box-shadow: 0px -2px 9px #858585;
    box-shadow: 0px -2px 9px #858585;
  }

  .df-num span {
    margin: 0 30px;
  }
</style>
