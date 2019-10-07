<template>
<div class="tax">
  <top :top='set'></top>
  <div class="nothing"></div>
    <div class="content">
      <div class="content-all">
          <p id="topp">增值税发票开票信息</p>
        <div class="topBox"><p>地址<input type="text" v-model="address" readonly name="address"></p></div>
        <div class="box"><p>电话<input type="text" v-model="phone" readonly name="phone"></p></div>
        <div class="bank"><p>开户银行<input type="text" v-model="bank" readonly name="bank"></p></div>
        <div class="bank"><p>银行账户<input type="text" v-model="banknumber" readonly name="banknumber"></p></div>
    </div>
  </div>
</div>
</template>

<script>

import top from './Top'
export default {
  data(){
    return{
      set:4,
      address: " ",
      phone: " ",
      bank: " ",
      banknumber: " ",
    }
  },
  components:{
    top
  },
  computed: {
    CID() {
    if(this.$store.state.info.data.type != 'ECWEB'){
      return this.$store.state.CCID;
    }else{
      return this.$store.state.info.data.loginName
    }
  }
  },
  mounted(){
    this.getdata()
  },
  methods:{
    getdata(){
      let url = "customerInfo/getCustomerInfo.do";
      let data = {
        "CID": this.CID
      };
      this.$http.post(url,data)
      .then( res => {
        console.log(res);

        if(res.data.code == 0 && res.data.data != null){
        var alldata = res.data.data;
        this.address = alldata.invAddress;
        this.phone = alldata.invTelephone;
        this.bank = alldata.invBankname;
        this.banknumber = alldata.invBanmaccount;
        }
        else if(res.data.code === 1 || res.data.data == null){
        console.log("哦豁，完蛋!")
        }
    })
    },
  }
}
</script>

<style scoped>
*{
  margin:0;
  padding:0;
  list-style: none;
}
.tax{
  background: #EFEFEF;
  height: 100vh;
}
.nothing{
  height: 50px;
  width: 100%;
}
.content{
  margin: 46px 22px 23px 22px;
  height: 478px;
  width: 331px;
  background: white;
  overflow: hidden;
  box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
}
.content-all{
  width: 318px;
  height: 308px;
  margin: 37px 19.1px 81.6px 37.9px;
}
#topp{
  font-size: 18px;
  color: #000000;
  margin-bottom: 30px;
}
.content-all p{
  font-size: 15px;
  color: #000000;
  text-align: left;
}
.topBox{
  width: 100%;
  height: 20px;
  text-align: left;
}
.topBox input{
  height: 19px;
  width: 158px;
  background:-webkit-linear-gradient(left,#F2F2F2,#E1E1E1);
  font-size: 13px;
  color:#7D7D7D;
  border: 0px;
  border-radius: 5px;
  margin-top:1px;
  margin-left: 55px;
  padding:0 8px;
}
.box{
  width: 100%;
  height: 20px;
  text-align: left;
  margin-top:18px;
}
.box input{
  height: 19px;
  width: 158px;
  background:-webkit-linear-gradient(left,#F2F2F2,#E1E1E1);
  font-size: 13px;
  color:#7D7D7D;
  border: 0px;
  border-radius: 5px;
  margin-top:1px;
  margin-left: 55px;
  padding: 0 8px;
}
.bank{
  width: 100%;
  height: 20px;
  text-align: left;
  margin-top:18px;
}
.bank input{
  height: 19px;
  width: 158px;
  background:-webkit-linear-gradient(left,#F2F2F2,#E1E1E1);
  font-size: 13px;
  color:#7D7D7D;
  border: 0px;
  border-radius: 5px;
  margin-top:1px;
  margin-left: 25px;
  padding: 0 8px;
}
</style>
