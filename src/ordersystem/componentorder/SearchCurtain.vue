<template>
  <div class="search-order">
    <div class="searchtop">
      <van-search
        class="search-more"
        v-model="inputValue"
        background="linear-gradient(to right, #BEDD81, #87CA81)"
        placeholder="输入窗帘型号"
        show-action
        @search="onSearchWall"
      >
        <div slot="action" @click="onSearchWall(inputValue)" style="color: white">搜索</div>
      </van-search>
      <div class="img" @click="back"></div>
    </div>
    <!--&lt;!&ndash;历史搜索&ndash;&gt;-->
    <!--<div v-show="showSearch" class="search-page">-->
      <!--<div class="recent-search-title">最近搜索</div>-->
      <!--<div>-->
        <!--<span class="currItem" v-for="hisSearch in historySearch" @click="onSearchWall(hisSearch)">{{hisSearch}}</span>-->
      <!--</div>-->
      <!--<div v-if="historySearch" class="clear-search" @click="clearHistory">-->
        <!--<span>清空历史搜索</span>-->
      <!--</div>-->
    <!--</div>-->
    <!--搜索结果-->
    <div class="search-result">
      <div class="single-wall" v-for="(singleCurtain,index) in allCurtain" :key="index">
        <table width="100%">
          <tr>
            <th width="40%">窗帘款式：</th>
            <td>{{singleCurtain.itemNo}}</td>
          </tr>
          <tr>
            <th>成品宽*成品高：</th>
            <td><input v-model="singleCurtain.width" type="number" class="curtain-width" placeholder="0.00">╳
              <input v-model="singleCurtain.height" type="number" class="curtain-width curtain-height" placeholder="0.00"></td>
          </tr>
          <tr v-show="singleCurtain.wbhFlag == '1'">
            <th>帘外包宽度：</th>
            <td><input v-model="singleCurtain.lwbWidth" type="number" class="curtain-width" placeholder="0.00"></td>
            <td class="need-head">
              <van-checkbox v-model="singleCurtain.isNeed" checked-color="#89cb81">需要</van-checkbox>
            </td>
          </tr>
          <tr @click="selectzzbs(index)">
            <th>褶皱倍数：</th>
            <td><input class="select-multiple" disabled v-model="singleCurtain.multiple"></td>
          </tr>
          <tr>
            <th>活动：</th>
            <td><input class="select-multiple" disabled v-model="singleCurtain.activity"></td>
          </tr>
          <tr>
            <th>位置：</th>
            <td><input class="myposition" v-model="singleCurtain.myposition"></td>
          </tr>
        </table>
        <span class="show-kucun" @click.stop="selectThis(index)">选择此款</span>
        <!--选择褶皱倍数-->
        <div class="show-multiple"  @click="noShowMul(index)">
          <van-popup v-model="singleCurtain.showMultiple">
            <van-radio-group v-model="singleCurtain.multiple" >
              <van-cell-group>
                <van-cell title="2.0" clickable @click="singleCurtain.multiple = '2.0' ">
                  <van-radio name="2.0" checked-color="#89cb81"/>
                </van-cell>
                <van-cell title="2.1" clickable @click="singleCurtain.multiple = '2.1'">
                  <van-radio name="2.1" checked-color="#89cb81"/>
                </van-cell>
                <van-cell title="2.2" clickable @click="singleCurtain.multiple = '2.2'">
                  <van-radio name="2.2" checked-color="#89cb81"/>
                </van-cell>
                <van-cell title="2.3" clickable @click="singleCurtain.multiple = '2.3'">
                  <van-radio name="2.3" checked-color="#89cb81"/>
                </van-cell>
                <van-cell title="2.4" clickable @click="singleCurtain.multiple = '2.4'">
                  <van-radio name="2.4" checked-color="#89cb81"/>
                </van-cell>
                <van-cell title="2.5" clickable @click="singleCurtain.multiple = '2.5'">
                  <van-radio name="2.5" checked-color="#89cb81"/>
                </van-cell>
                <van-cell title="2.6" clickable @click="singleCurtain.multiple = '2.6'">
                  <van-radio name="2.6" checked-color="#89cb81"/>
                </van-cell>
                <van-cell title="2.7" clickable @click="singleCurtain.multiple = '2.7'">
                  <van-radio name="2.7" checked-color="#89cb81"/>
                </van-cell>
                <van-cell title="2.8" clickable @click="singleCurtain.multiple = '2.8'">
                  <van-radio name="2.8" checked-color="#89cb81"/>
                </van-cell>
                <van-cell title="2.9" clickable @click="singleCurtain.multiple = '2.9'">
                  <van-radio name="2.9" checked-color="#89cb81"/>
                </van-cell>
                <van-cell title="3.0" clickable @click="singleCurtain.multiple = '3.0'">
                  <van-radio name="3.0" checked-color="#89cb81"/>
                </van-cell>
              </van-cell-group>
            </van-radio-group>
            <!--<div class="comfirm-bottom" @click="comfirmMultiple">-->
            <!--<span>确定</span>-->
            <!--</div>-->
          </van-popup>
        </div>
      </div>
      <!--<div v-show="resN">-->
        <!--暂无查询结果-->
      <!--</div>-->
    </div>
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
    <!--<navBottom v-show="hidshow"></navBottom>-->
  </div>
</template>

<script>
  import axios from 'axios'
  import {Search, Actionsheet,Toast,Checkbox, CheckboxGroup,Popup, RadioGroup, Radio, Cell, CellGroup, Collapse, CollapseItem,Pagination} from 'vant';
  import "../assetsorder/actionsheet.css"
  import navBottom from '../../components/navBottom'

  export default {
    name: "",
    data() {
      return {
        //搜索框输入值
        inputValue: "",
        showSearch:true,//是否显示历史搜索结果
        // historySearch:localStorage.historyItems.split("|"),//历史搜索内容
        //是否有查询结果
        resY: false,
        resN: false,
        allCurtain:[],
        needHead:false,//是否需要帘头外包
        // showMultiple: false, //选择褶皱倍数
        multiple: 2.0,//褶皱倍数
        myhd:"请选择活动",
        myposition:"",
        //当前页数
        currentPage: 1,
        //总页数
        totalPage: 0,
        //总记录数
        totalLists: 0,
        //每页记录数
        itemsPerPage: 10,
        //通过页数来判断change是执行哪个函数
        pageMark:0,
        docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
        showHeight: document.documentElement.clientHeight,   //实时屏幕高度
        hidshow:true  //显示或者隐藏footer
      }
    },
    components: {
      [Search.name]: Search,
      [Actionsheet.name]: Actionsheet,
      [Toast.name]: Toast,
      [Checkbox.name]: Checkbox,
      [CheckboxGroup.name]: CheckboxGroup,
      [Popup.name]: Popup,
      [RadioGroup.name]: RadioGroup,
      [Radio.name]: Radio,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Collapse.name]: Collapse,
      [CollapseItem.name]: CollapseItem,
      [Pagination.name]: Pagination,
      navBottom
    },
    methods: {
      dothis(val){
        console.log(val)
      },
      back() {
        this.$router.push({
          path:"/shopstore"
        });
      },
      //墙纸详情
      wallDetails() {
        // let xh = this.wallMegs.itemNo
        this.$router.push({
          name: "walldetails",
          params: {
            //墙纸类型,获取墙纸信息
            papertype: this.wallMegs.oldItemNo
          }
        })
        this.inputValue = ""
        this.resY = false
        this.resN = false
      },
      //窗帘模糊查询
      onSearchWall(inputValue) {
        this.allCurtain = []
        this.inputValue = inputValue
        let wallUrl = this.orderBaseUrl + "/item/getCurtainBySearch.do";
        let data = {
          "itemNo": inputValue,
          "limit": 10,//限制条数
          "page":this.currentPage //页数
        }
        axios.post(wallUrl, data).then(
          (data) => {
            // console.log(data);
            if (data.data.code == 1) {

            } else if (data.data.code == 0) {
              this.allCurtain = data.data.data;
              if (this.allCurtain.length == 0) {
                this.allCurtain = []
                this.currentPage = 1
                this.totalPage = 1
                Toast({
                  duration: 2000,
                  message: "暂无查询结果"
                })
              } else {
                //总页数
                // this.currentPage = 1
                this.allCurtain = data.data.data
                this.totalPage = parseInt(this.allCurtain[0].total/10) + 1
                for (let i = 0; i < this.allCurtain.length; i++) {
                  // this.allCurtain[i].isCheck = true
                  // this.allCurtain[i].showMultiple = false
                  this.allCurtain[i].multiple = "2.2"
                  this.allCurtain[i].width = ""
                  this.allCurtain[i].height = ""
                  this.allCurtain[i].lwbWidth = ""
                  // this.allCurtain[i].isNeed = false
                  this.$set(this.$data.allCurtain[i],'isNeed',false)
                  this.$set(this.$data.allCurtain[i],'showMultiple',false)
                  this.allCurtain[i].activity = ""
                  this.allCurtain[i].myposition = ""
                }
              }
            }
          }
        )
        this.showSearch = false
        // this.setHistoryItems(this.inputValue)
        // this.showSearch = false
      },
      // //历史搜索
      // setHistoryItems(keyword) {
      //   keyword = keyword.trim();
      //   let { historyItems } = localStorage;
      //   if (historyItems === undefined) {
      //     localStorage.historyItems = keyword;
      //   } else {
      //     const onlyItem = historyItems.split('|').filter(e => e != keyword);
      //     if (onlyItem.length > 0) historyItems = keyword + '|' + onlyItem.join('|');
      //     localStorage.historyItems = historyItems;
      //   }
      //   this.historySearch = localStorage.historyItems.split("|")
      //   console.log(localStorage.historyItems,this.historySearch)
      // },
      // //清空历史搜索
      // clearHistory(){
      //   localStorage.removeItem('historyItems');
      //   this.historySearch = localStorage.historyItems
      // },
      //获取窗帘型号列表
      getCurtainXh(){
        this.allCurtain = []
        let url = this.orderBaseUrl + "/item/getCurtainType.do"
        let data = {
          "limit": 10, //限制条数
          "page":this.currentPage //页数
        }
        axios.post(url,data).then(
          res => {
            // console.log(res)
            this.allCurtain = res.data.data
            this.totalLists = res.data.data[0].total
            this.pageMark = parseInt(this.allCurtain[0].total/10) + 1
            //获取总页数
            this.totalPage = parseInt(this.totalLists / 10) + 1
            for (let i = 0; i < this.allCurtain.length; i++) {
              // this.allCurtain[i].isCheck = true
              // this.allCurtain[i].showMultiple = false
              this.allCurtain[i].multiple = "2.2"
              this.allCurtain[i].width = ""
              this.allCurtain[i].height = ""
              this.allCurtain[i].lwbWidth = ""
              // this.allCurtain[i].isNeed = false
              this.$set(this.$data.allCurtain[i],'isNeed',false)
              this.$set(this.$data.allCurtain[i],'showMultiple',false)
              this.allCurtain[i].activity = ""
              this.allCurtain[i].myposition = ""
            }
            console.log(this.allCurtain)
          }
        )
      },
      //改变页数
      changePage() {
        if (this.pageMark == this.totalPage) {
          this.getCurtainXh()
        }else {
          this.onSearchWall(this.inputValue)
        }
      },
      comfirmMultiple() {
        this.showMultiple = false
      },
      //选择褶皱倍数
      selectzzbs(index){
        // console.log(this.allCurtain[0].showMultiple)
        this.allCurtain[index].showMultiple = true
        // console.log(this.allCurtain[0].showMultiple)
        // console.log(this.allCurtain)
      },
      //选择此款
      selectThis(index){
        this.$router.push({
          name:"curtaindetails",
          params:{
            "itemNO":this.allCurtain[index].itemNo,
            "width":this.allCurtain[index].width, //成品宽度
            "height":this.allCurtain[index].height, //成品高度
            "WBH":this.allCurtain[index].lwbWidth,  //帘头外包盒宽度
            "multiple":this.allCurtain[index].multiple, //褶皱倍数
            "location":this.allCurtain[index].myposition
          }
        })
      },
      noShowMul(index){
        console.log(1)
        this.allCurtain[index].showMultiple = false
      }
    },
    created(){
      // console.log(this.orderBaseUrl)
      this.getCurtainXh()
    },
    computed: {
      filteredProduct() {
        return this.products.filter((product) => {
          // console.log(product);
          return product.type.match(this.inputValue);
        })
      },
      //获取用户cid
      CID() {
        // if (this.$store.state.info.data.type != 'ECWEB') {
        //   return this.$store.state.CCID;
        // } else {
        //   return this.$store.state.info.data.loginName
        // }
        return this.$store.state.info.data.loginName
      }
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
  .search-order {
    height: 100vh;
    width: 375px;
    overflow: scroll;
  }
  .img {
    display: inline-block;
    width: 20px;
    height: 20px;
    z-index: 999;
    position: absolute;
    left: 17px;
    top: 12px;
    background-image: url(http://14.29.221.109:10250/upload/assets/arrow.png);
    background-repeat: no-repeat;
    background-size: contain;

  }

  .searchtop {
    height: 50px;
  }

  .search-page ul, .recent-search-title {
    text-align: left;
    margin: 0 15px;
  }

  .search-result {
    margin-bottom: 60px;
  }
  /*.recent-search{*/
  /*font-size: 15px;*/
  /*color: #8B8B7A;*/
  /*margin-top: 15px;*/
  /*}*/

  .recent-search li {
    height: 35px;
    line-height: 35px;
    border-bottom: 1px solid rgb(250, 255, 248);
  }

  .single-wall {
    position: relative;
    font-size: 13px;
    margin: 20px 20px;
    border-radius: 5px;
    padding: 8px 10PX;
    box-shadow: 0 4px 8px 0 rgba(19, 19, 19, 0.2), 0 6px 20px 0 rgba(12, 12, 12, 0.19);
  }

  .single-wall th, .single-wall td {
    text-align: left;
  }

  .curtain-width {
    width: 50px;
    border: none;
    /*background-color: #d5d5d5;*/
  }

  .select-multiple {
    display: inline-block;
    width: 70px;
    height: 15px;
    line-height: 15px;
    /*background: url("../assetsorder/zk.png") no-repeat center;*/
    /*background-position-x: 50px;*/
    /*background-position-y: 2px;*/
    /*background-size: 15PX;*/
    background-color: #ebebeb;
    border-radius: 2px;
    outline: none;
    border: none;
    /*color: white;*/
    text-decoration: none;
    padding: 3px 10px;

  }
  .myposition{
    display: inline-block;
    width: 70px;
    height: 15px;
    line-height: 15px;
    background-color: #ebebeb;
    border-radius: 2px;
    outline: none;
    border: none;
    /*color: white;*/
    text-decoration: none;
    padding: 3px 10px;
  }
  .curtain-height {
    text-align: right;
  }
  .wall-title {
    text-align: left;
    margin-bottom: 5px;
    padding: 0 0 5px 3px;
    border-bottom: 1px solid #ebedf0;
    font-size: 16px;
  }

  .show-kucun{
    position: absolute;
    padding: 5px 10px;
    border-radius: 15px;
    color: white;
    bottom: 10px;
    right: 17px;
    background: #89cb81;
  }

  .kucun-result table {
    font-size: 15px;
    /*padding: 20px;*/
    margin:10px 0 70px 0;
    border-collapse: collapse;
    border: none;
  }

  .kucun-result table th,.kucun-result table td{
    border: solid #000 1px;
  }
  .kucun-item {
    padding: 10px 0;
  }
  .recent-search-title{
    text-align: left;
    margin: 0 15px;
    font-size: 15px;

  }


  .currItem {
    display: inline-block;
    padding: 10px 15px;
    background: rgba(229, 229, 229, 0.8);
    border-radius: 15px;
    margin: 10px;
    font-size: 13px;
    /* float: left; */
  }
  .clear-search{
    width:150px;
    height: 50px;
    line-height: 50px;
    margin: 80px auto;
    border-radius: 30px;
    border: 1px solid #8B8B7A;
    clear: both;
  }
  .comfirm-bottom {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #89cb81;
    position: fixed;
    bottom: 0;
    z-index: 99;
  }

  .show-multiple .van-cell-group {
    height: 300px;
    overflow: scroll;
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
</style>
