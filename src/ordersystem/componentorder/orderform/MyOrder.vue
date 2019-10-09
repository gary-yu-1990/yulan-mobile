<template>
  <div class="reviseagreement">
    <div class="top">
      <div class="top-bottom">
        <div class="arrow">
          <div class="arrow-img" @click="back"></div>
          <div class="top-text">我的订单</div>
        </div>
      </div>
      <div class="search-title">
        <input type="text" class="search-input" v-model="xhInput" placeholder="输入订单型号">
        <!--<input type="text" class="status-input" @click="showStatus = true"  v-model="myStatu">-->
        <span class="search-button status-input" @click="showStatus = true">{{myStatu}}</span>
        <span class="search-button" @click="orderSearch">查询</span>
      </div>
      <div class="search">
        <ul class="ulhead" id="ulhead">
          <!--<li class="lileft">提交时间</li>-->
          <li class="licenter" @click="showks = true"><input class="time time-ks" type="text" v-model="ksDataSet"
                                                             disabled></li>
          <li><span>至</span></li>
          <li class="liright" @click="showjs = true"><input class="time time-js" type="text" v-model="jsDataSet"
                                                            disabled></li>
          <li class="licenter" @click="showType = true"><input class="time time-ks" type="text" v-model="myType"
                                                             disabled></li>
        </ul>
      </div>
    </div>
    <div class="orders" v-if="orderLists.length">
      <div class="single-order" v-for="(orderList,index) in orderLists" @click="toOrderDetails(index)" :key="index">
        <div class="nav">
          <div class="wall-icon"></div>
          <span class="title">订单号:{{orderList.ORDER_NO}}</span>
          <span class="state">{{orderList.STATUS_ID}}</span>
        </div>
        <div class="good">
          <table>
            <tr width="100%">
              <th class="good-msg" width="35%">型号</th>
              <th class="good-msg" width="10%">单价</th>
              <th width="30%">数量</th>
              <th width="30%">实际价格</th>
            </tr>
            <tr v-for="(product,inndex) in orderList.ORDERBODY" :key="inndex">
              <td>{{product.ITEM_NO}}</td>
              <td>￥{{product.UNIT_PRICE}}</td>
              <td>{{product.QTY_REQUIRED}}</td>
              <td>￥{{product.FINAL_COST}}</td>
            </tr>
          </table>
        </div>
        <div class="good-accout">
          <span>共件{{orderList.ORDERBODY.length}}商品</span>
          <span class="allhj">合计：￥{{orderList.ALL_SPEND}}元</span>
        </div>
        <!--欠款待提交（提交的话需要做库存判断）-->
        <!--欠款可提交（提交的话不用库存判断）-->
        <div class="next-do" v-if="orderList.showStatus">
          <span>取消订单</span>
          <span class="to-pay">提交</span>
        </div>
      </div>
    </div>
    <!--<div class="orders" v-else>-->
      <!--暂无此订单结果-->
    <!--</div>-->
    <!--底部分页-->
    <div class="fy-contain" v-show="hidshow">
      <van-pagination
        class="fy-bottom"
        v-model="currentPage"
        :page-count="totalPage"
        :items-per-page="itemsPerPage"
        :total-items="totalLists"
        mode="simple"
        @change="changePage"
      />
    </div>
    <!--<navBottom :tab-stage="myRoute" v-show="hidshow"></navBottom>-->
    <van-loading class="loading" type="spinner" v-if="loading" color="black" />
    <!--时间选择-->
    <van-popup v-model="showjs" position="bottom">
      <van-datetime-picker
        class="reset"
        v-model="jsData"
        type="date"
        @confirm="confirmTimejs"
      />
    </van-popup>
    <van-popup v-model="showks" position="bottom">
      <van-datetime-picker
        v-model="ksData"
        type="date"
        @confirm="confirmTimeks"
      />
    </van-popup>

    <!--订单状态选择-->
    <van-popup v-model="showStatus" position="bottom">
    <van-picker
      show-toolbar
      title="订单状态"
      :columns="orderStatus"
      @cancel="onCancel"
      @confirm="onConfirmStatu"
    />
  </van-popup>
    <!--订单类型-->
    <van-popup v-model="showType" position="bottom">
      <van-picker
        show-toolbar
        title="订单类型"
        :columns="orderType"
        @cancel="onCancelType"
        @confirm="onConfirmType"
      />
    </van-popup>
  </div>
</template>
<script>
  import axios from 'axios'
  import {DatetimePicker, Popup, Picker, Pagination,Toast,Loading} from 'vant';
  import navBottom from '../../../components/navBottom'
  import "../../assetsorder/actionsheet.css"

  export default {
    name: "",
    components: {
      navBottom,
      [DatetimePicker.name]: DatetimePicker,
      [Popup.name]: Popup,
      [Picker.name]: Picker,
      [Pagination.name]: Pagination,
      [Toast.name]: Toast,
      [Loading.name]: Loading
    },
    data() {
      return {
        url:"http://106.14.159.244:8080/yulan-order",
        loading:false,
        //底部导航栏样式切换
        myRoute: "order",
        //结束时间
        showjs: false,
        jsData: "",
        jsDataSet: "",
        //开始时间
        ksData: "",
        ksDataSet: "",
        showks: false,
        //默认开始时间
        mrksTime: '',
        //订单状态
        orderStatus: ['全部','已提交', '欠款可提交', '余额不足待提交', '已接收', '待审核', '已受理', '已完成', '已作废','窗帘待审核'],
        orderType:['全部产品',"墙纸配套类",'软装','窗帘'],
        showType:false,
        showStatus: false,
        //当前状态
        myStatu: "全部",
        //当前类型
        myType:"全部产品",
        myTypeCode:"",
        //当前页数
        currentPage: 1,
        //总页数
        totalPage: 0,
        //总记录数
        totalLists: 0,
        //每页记录数
        itemsPerPage: 10,
        //总页数
        totalPage: 0,
        //通过页数来判断change是执行哪个函数
        pageMark: 0,
        //订单数据
        orderLists: [],
        //型号输入
        xhInput: "",
        docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
        showHeight: document.documentElement.clientHeight,   //实时屏幕高度
        hidshow:true  //显示或者隐藏footer

      }
    },
    methods: {
      confirmTimejs(value) {
        console.log(value)
        this.jsSet(this.jsData);
        this.showjs = false
        // this.onConfirm(value);
        console.log(this.myStatu)
      },
      confirmTimeks(value) {
        console.log(value)
        this.ksSet2(this.ksData);
        this.showks = false
        // this.onConfirm(value);
        console.log(this.myStatu)
      },

      //结束时间设置
      jsSet(time) {
        // console.log(this.ksData)
        let current_date = time.getDate();
        let current_month = time.getMonth() + 1;
        let current_year = time.getFullYear();
        this.jsDataSet = current_year + '-' + current_month + '-' + current_date
      },
      //开始时间设置
      ksSet2(time) {
        // console.log(this.ksData)
        let current_date = time.getDate();
        let current_month = time.getMonth() + 1;
        let current_year = time.getFullYear();
        this.ksDataSet = current_year + '-' + current_month + '-' + current_date
      },
      //初始化开始时间(前三个月)
      ksSet(time) {
        // console.log(this.ksData)
        let current_date = time.getDate();
        let current_month = time.getMonth() + 1;
        let current_year = time.getFullYear();
        switch (current_month) {
          case 1:
          case 2:
          case 3:
            current_month += 9;
            current_year--;
            break;
          default:
            current_month -= 3;
            break;
        }
        current_month = (current_month < 10) ? ('0' + current_month) : current_month;
        this.ksDataSet = current_year + '-' + current_month + '-' + current_date
      },
      //订单状态选择
      onConfirmStatu(index) {
        this.myStatu = index
        this.orderSearch()
        this.showStatus = false
      },
      onCancel() {
        this.showStatus = false
      },
      onConfirmType(index){
        this.myType = index
        if (this.myType == "全部产品") {
          this.myTypeCode = ""
        }else if (this.myType == "墙纸配套类") {
          this.myTypeCode = "W"
        }else if (this.myType == "软装") {
          this.myTypeCode = "Y"
        }else if (this.myType == "窗帘") {
          this.myTypeCode = "X"
        }
        // this.orderSearch()
        this.showType = false
      },
      onCancelType(){
        this.showType = false
      },
      back() {
        this.$router.push({
          path:"/shopstore"
        })
      },
      //获取订单列表及订单查询
      orderSearch() {
        this.orderLists = []
        this.loading = true
        // this.$store.commit('showLoading')
        // console.log(this.currentPage,"C01613",this.statusExchange(this.myStatu),this.xhInput,this.ksDataSet + " 00:00:00",this.jsDataSet + " 23:59:59")
        let orderUrl = this.orderBaseUrl + "/order/getOrders.do";
        let data = {
          "limit": "10",//每页限制条数（必须）
          "page": this.currentPage,//页数，第几页（必须）
          "cid": this.$store.getters.getCId,//登录的用户账号（必须）
          // "cid": "C01613",//登录的用户账号（必须）
          "state_id": this.statusExchange(this.myStatu),//订单状态（（可传空串，空串表示全部状态） --1提交、12-接收、2--受理、3--作废、--5欠款待提交、--6欠款可提交、--7已完成）
          "find": this.xhInput,//查找订单好，可模糊查找（可传空串，获取全部）
          "beginTime": this.ksDataSet + " 00:00:00",//开始时间（开始结束时间同时传或不传）
          "finishTime": this.jsDataSet + " 23:59:59",//结束时间
          "orderType":this.myTypeCode,//订单类型，W为墙纸，X窗帘，Y是软装
          "curtainStatusId":"",//（new）窗帘状态,点击审核页面时传，其他页面传空串 （0待审核，客户待修改1，客户待确认2，兰居待修改3，可提交4）
          "companyId":this.$store.getters.getCMId//公司所属id(xing),必传，空串获取所有公司
        }
        axios.post(orderUrl, data).then(
          (data) => {
            this.loading = false
            // console.log(this.currentPage,this.statusExchange(this.myStatu),this.ksDataSet,this.jsDataSet)
            console.log(data);
            this.totalLists = data.data.count
            //获取总页数
            this.totalPage = parseInt(data.data.count / 10) + 1
            this.orderLists = data.data.data
            if (this.orderLists.length == 0) {
              Toast({
                message:"暂无订单",
                duration:2000
              })
            }
            for (let i = 0; i < this.orderLists.length; i++) {
              this.orderLists[i].showStatus = false;
              console.log(this.orderLists[i].STATUS_ID)
              if (this.statusExchange(this.myStatu) == "0") {
                switch (this.orderLists[i].STATUS_ID) {
                  case '0':
                    this.orderLists[i].STATUS_ID = "待审核"
                    continue;
                  case '1':
                    this.orderLists[i].STATUS_ID = "客户待修改"
                    continue;
                  case '2':
                    this.orderLists[i].STATUS_ID = "客户待确认"
                    continue;
                  case '3':
                    this.orderLists[i].STATUS_ID = "兰居待修改"
                  case '4':
                    this.orderLists[i].STATUS_ID = "可提交"
                }
              } else {
                switch (this.orderLists[i].STATUS_ID) {
                  case '1':
                    this.orderLists[i].STATUS_ID = "已提交"
                    continue;
                  case '12':
                    this.orderLists[i].STATUS_ID = "已接收"
                    continue;
                  case '2':
                    this.orderLists[i].STATUS_ID = "已受理"
                    continue;
                  case '3':
                    this.orderLists[i].STATUS_ID = "已作废"
                    continue;
                  case '5':
                    this.orderLists[i].STATUS_ID = "余额不足待提交"
                    continue;
                  case '6':
                    this.orderLists[i].STATUS_ID = "欠款可提交"
                    continue;
                  case '7':
                    this.orderLists[i].STATUS_ID = "已完成"
                    continue;
                }
              }
              if (this.orderLists[i].STATUS_ID == "余额不足待提交" ||
                this.orderLists[i].STATUS_ID == "欠款可提交") {
                this.orderLists[i].showStatus = true
              }
            }
          })
        // this.$store.commit('hideLoading')
      },

      //订单详情
      toOrderDetails(index) {
        this.$router.push({
          name: "orderdetails",
          params: {
            "state_id":this.statusExchange(this.orderLists[index].STATUS_ID),//订单状态（（可传空串，空串表示全部状态） --1提交、12-接收、2--受理、3--作废、--5欠款待提交、--6欠款可提交、--7已完成）
            "find":this.orderLists[index].ORDER_NO,//查找订单号，可模糊查找（可传空串，获取全部）
            "orderType":this.myTypeCode
          }
        })
      },
      //状态转换
      statusExchange(myStatu) {
        switch (myStatu) {
          case '全部':
            myStatu = ""
            break;
          case '已提交':
            myStatu = "1"
            break;
          case '已接收':
            myStatu = "12"
            break;
          case '已受理':
            myStatu = "2"
            break;
          case '已作废':
            myStatu = "3"
            break;
          case '余额不足待提交':
            myStatu = "5"
            break;
          case '欠款可提交':
            myStatu = "6"
            break;
          case '已完成':
            myStatu = "7"
            break;
          case '窗帘待审核':
            myStatu = "0"
            break;
        }
        return myStatu;
      },
      //改变页数
      changePage() {
        this.orderSearch()
      }
    },
    computed: {
      filteredProduct() {
        return this.orderLists.filter((orderList) => {
          return orderList.ORDER_NO.match(this.xhInput);
        })
      }
    },
    created() {
      let time = new Date();
      this.jsSet(time);
      this.ksSet(time)
      this.orderSearch()
    },
    mounted() {
      // window.onresize监听页面高度的变化
      window.onresize = ()=>{
        return(()=>{
          this.showHeight = document.body.clientHeight;
        })()
      }
    },
    watch:{
      showHeight:function() {
        if(this.docmHeight > this.showHeight){
          this.hidshow=false
        }else{
          this.hidshow=true
        }
      }
    }
  }

</script>

<style scoped>
  .reviseagreement {
    background-color: rgb(239, 239, 239);
    height: 100vh;
    position: relative;
    overflow: scroll;
  }

  li {
    display: inline-block;
  }

  .top {
    width: 100%;
    height: 135px;
    top: 0;
    position: fixed;
    z-index: 20;
    background: -webkit-linear-gradient(left, #BEDD81, #87CA81);
  }

  .top-bottom {
    width: 100%;
    height: 50px;
    line-height: 50px;
    position: absolute;
    top: 0;
  }

  .arrow {
    display: inline-block;
  }

  .arrow-img {
    background: url('http://14.29.221.109:10250/upload/assets/arrow.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    display: inline-block;
    width: 30px;
    height: 30px;
    z-index: 33;
    position: absolute;
    left: 10px;
    top: 10px;
    /* left: 17px;
    bottom: 16px; */
  }

  .top-text {
    display: inline-block;
    color: #F3FAFF;
    vertical-align: middle;
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    text-align: center;
  }

  .search-title input::-webkit-input-placeholder {
    color: white;
  }

  input {
    background-color: hsla(0, 0%, 100%, .3);
    border-radius: 3.467vw;
    outline: none;
    border: none;
    text-decoration: none;
    height: 25px;
    line-height: 25px;
  }

  .search-input {
    width: 120px;
    position: absolute;
    top: 60px;
    left: 15px;
    padding-left: 20px;
    font-size: 14px;
    /*background-image: url("../../assetsorder/search.png");*/
    /*background-repeat: no-repeat;*/
    /*background-position-x: 30vw;*/
    /*background-position-y: 1.9vw;*/
    /*background-size: 15PX;*/
  }

  .search-button {
    width: 80px;
    position: absolute;
    top: 60px;
    right: 15px;
    font-size: 14px;
    background-color: hsla(0, 0%, 100%, .3);
    border-radius: 3.467vw;
    outline: none;
    border: none;
    text-decoration: none;
    height: 25px;
    line-height: 25px;
    color: white;
  }
  .status-input {
    width: 115px;
    position: absolute;
    top: 60px;
    right: 100px;
    font-size: 14px;
    text-align: center;
    color: white;
    background-image: url("../../assetsorder/zk.png");
    background-repeat: no-repeat;
    background-position-x: 25vw;
    background-position-y: 1.5vw;
    background-size: 15PX;
  }

  .search {
    width: 100%;
    height: 44px;
    background: -webkit-linear-gradient(left, #BEDD81, #87CA81);
    position: absolute;
    bottom: 0;
  }

  ul {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-around;
  }

  #ulhead {
    position: fixed;
    top: 98px;
    line-height: 37px;
    width: 100%;
    height: 37px;
    /*font-size: 15px;*/
    background: -webkit-linear-gradient(left, #F2F2F2, #E1E1E1);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    font-size: 15px;
  }

  .time {
    width: 90px;
    height: 20px;
    line-height: 20px;
    background-color: hsl(0, 0%, 100%);
    font-size: 13px;
    border: none;
    padding-left: 15px;
    text-align: left;

    background-image: url("../../assetsorder/time-zk.png");
    background-repeat: no-repeat;
    background-position-x: 23vw;
    background-position-y: 1vw;
    background-size: 15PX;
  }

  .fy-contain {
    width: 100%;
    height: 50px;
    background: white;
    position: fixed;
    bottom: 0px;
    border-top: 1px solid #e8e8e8;
  }

  .fy-bottom {
    background: #f8f8f8;
    position: absolute;
    width: 100%;
    height: 50px;
    bottom: 0;
    color: white !important;
  }

  .fy-bottom .van-pagination__item {
    color: #89cb81;
  }

  /*单个订单*/
  .orders {
    margin: 135px 0 50px;
    padding: 10px 0;
    position: relative;
    font-size: 14px;
  }

  .single-order {
    /*height: 210px;*/
    padding: 10px 10px;
    margin: 10px 15px;
    /*border: 1px solid red;*/
    border-radius: 5px;
    background: white;
  }

  .single-order .nav {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ececec;
  }

  .good {
    /*background: #FCFCFC;*/
    border-bottom: 1px solid #ececec;
  }

  .title {
    float: left;
    margin-left: 1px;
  }

  .state {
    float: right;
    color: #ff8259;
  }

  .good-accout {
    text-align: left;
    margin: 10px 0;
  }

  .good-accout .allhj {
    /*float: right;*/
    margin: 0 20px;
  }

  .next-do {
    text-align: right;
    height: 50px;
    line-height: 50px;
  }

  .next-do span {
    padding: 8px 20px;
    margin-left: 10px;
    border: 1px solid #999686;
    border-radius: 20px;
    font-size: 13px;
  }

  .next-do .to-pay {
    border: 1px solid #ff6352;
    color: #ff6352;
  }
</style>
