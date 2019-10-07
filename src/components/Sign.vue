<template>
    <div class="sign" :style="{height:bodyHeight + 'px'}">
      <IDSel v-if='IsShow' v-on:listen='listenShow' :pos="pos" :name="realName"></IDSel>
        <!-- <div class="sign-box"> -->
          <warn  v-on:listen='listenset' :set="set" v-show="set"></warn>
          <div class="signlogo"></div>
          <div class="signmessage">
              <div class="username">
                  <div class="userlogo"></div>
                  <input type="text" placeholder="用户名" v-model="name">
              </div>
              <div class="password">
                  <div class="passlogo"></div>
                  <input type="password" placeholder="密码" v-model="password" @keyup.enter="normalsign()" >
              </div>
          </div>
          <div class="signbutton">
              <input type="button" class="normalsign" value="登录" @click="normalsign()" >
          </div>
       <!-- </div> -->
    </div>
</template>
<script>
import warn from '@/components/passwordwarn'
import IDSel from './IdSelection'

export default {
    data(){
        return {
            set:false,
            name:'',
            password:'',
            IsShow:false,
            pos:[],
            realName:'',
            bodyHeight:'',
        }
    },
      beforeRouteEnter (to, from, next) {
        // ...
        console.log(from.path)
        console.log(window.apple)
        // location.reload()
        // let that = this
        // if(from.path == "/customer"){
        //     if(window.apple == "apple"){
        //         location.replace("/");
        //     }
        //     else if(window.apple == "other"){
        //         history.go(0)
        //       location.replace("/");
        //     }
        // }
        // if(from.path == "/client"){
        //     if(window.apple == "apple"){
        //         location.replace("/");
        //     }
        //     else if(window.apple == "other"){
        //         history.go(0)
        //       location.replace("/");
        //     }
        // }
        next()
    },
    mounted(){
      // this.bodyHeight = document.documentElement.clientHeight
      // this.$store.initState()
      this.isai()
      this.$store.commit('initState')
      console.log(this.$store.state);

//         this.$http.post('/areaRegion/getCity.do',{
//             "cityType":"1",
// "country"
// :
// "UN",
// "dateCre"
// :
// 1354760177000,
// "dateUpdate"
// :
// 1354760177000,
// "parentArea"
// :
// "HK",
// "parentDistrict"
// :
// "HK",
// "parentProvince"
// :
// "HK",
// "regionId"
// :
// "P33",
// "regionLevel"
// :
// 1,
// "regionName"
// :
// "香港特别行政区"
//             // "regionId": "P33",
//             // "regionName": "香港特别行政区",
//             // "parentCity": null,
//             // "parentArea": "HK",
//             // "parentProvince": "HK",
//             // "regionLevel": 1,
//             // "country": "UN",
//             // "dateCre": 1354760177000,
//             // "dateUpdate": 1354760177000,
//             // "cityType": "1",
//             // "parentDistrict": "HK"
//         }).then(function(res){
//             console.log(res.data);
//         })
    },
    methods:{
        normalsign() {
            let th = this;
            var date = new Date();
            let year = date.getFullYear();
                this.$store.commit("getYear",2019)
      // console.log('this.$store.state.year: '+this.$store.state.year);
            // const url = '/customerInfo/getCustomerInfo.do';
            // this.$http.post(url,{ CID:'C15056'})
            // .then((res)=>{
            //     console.log(res);
            // })
            // console.log("this.password.toUpperCase(): "+this.password.toUpperCase());

            this.$http.post('http://14.29.223.114:10250/yulan-order/web_user/login.do',{
              "loginName": this.name.toUpperCase(),
              "password": this.password,
              "year":this.$store.state.year
            }
            ).then(res => {
              console.log(res);
              var info = res.data;
              this.realName = info.data.realName;
              console.log(info,'this.realName: '+this.realName);

              if(info.code ==0&& info.data.type != 'ECWEB'){

                this.$store.commit('getPos',info.pos)
                this.$store.commit('loginSuccess',info)
                // // this.$store.commit('getToken',info)

                this.pos = this.$store.state.pos;
                console.log(this.$store.state.pos);

                if(this.pos.length == 1){
                  this.$store.commit("getposition",this.pos[0].position)
                  // console.log(this.$store.state.position);
                  this.$router.push({
                    path:'/salesman'
                  })
                }else if(this.pos.length > 1){
                  this.IsShow = true;
                }
                // if(this.$store.state.pos[0]){
                //   this.$store.state.pos[0].position
                // }
                // this.$router.push({
                //   path:'/salesman'
                // })
              }
              // else if(info.code ==0&& info.data.type == 'ECWEB'){

              //   this.$store.commit('loginSuccess',info)

              //   this.IsShow = true;
              //   // this.$router.push({
              //   //   path:'/customer'
              //   // })
              // }
              if(info.code ==0&& info.data.type == 'ECWEB'){
                  this.$store.commit('loginSuccess',info)
                    this.$router.push({
                      path:'/customer'
                    })
              }
              else if(info.code ==1){
                this.set = true;
              }
            }).catch( err =>{
                th.set = true;
                console.log(this.set)
            })

        },
        listenset(data) {
            this.set = data;
        },

        listenShow(data) {
            this.IsShow = data;
        },
        isai(){
            var u = navigator.userAgent;
            console.log(u)
            if(u.indexOf("iPhone") > -1){
                window.apple = "apple"
            }
            else{
                window.apple = "other"
            }
        }
    },
    watch: {
      bodyHeight(){
        return document.documentElement.clientHeight
      }
    },
    components:{
        warn,
        IDSel
    },
}
</script>

<style scoped>
    /* 玉兰logo */
    .sign{
        width: 100vw;
        height: 100vh;
        background-color: #EFEFEF;
        position: absolute;
        /* background-image: url('http://14.29.221.109:10250/upload/assets/sign2.png'); */
        background-size: 100% 100%;
        background-repeat: no-repeat;
        /* bottom: 0; */
    }
    .sign-box{
      /* height: 486px; */
      width: 288px;
      position: absolute;
      top: 51px;
      left: 50%;
      margin-left:-144px;
      /* background-color: #EFEFEF; */
      opacity: 1;
    }
    .signlogo{
        width: 186px;
        height: 61px;
        background-image: url(http://14.29.221.109:10250/upload/assets/yulan.png);
        background-size: contain;
        background-repeat: no-repeat;
        position: relative;
        left: 50%;
        top: 50px;
        margin-left: -93px;
    }
    /* 登录信息，用户填写 */
    .signmessage{
        margin-top: 100px;
    }
    .signmessage input{
        display: inline-block;
        border-style:none;
        border-bottom: 1px solid #707070;
        width: 138px;
        height: 28px;
        margin-left: 2px;
        margin-top: 25px;
        padding-left: 10px;
        font-size: 10px;
        outline: none;
        background-color: #EFEFEF;
    }
    .signmessage input::-webkit-input-placeholder{
        color:#A4A4A4;
    }
    .signmessage input:-moz-placeholder{
        color:#A4A4A4;
    }
    .signmessage input::-moz-placeholde{
        color:#A4A4A4;
    }
    .signmessage input:-ms-input-placeholder{
        color:#A4A4A4;
    }
    .passlogo,.userlogo{
        display: inline-block;
        width: 20px;
        height: 20px;
        vertical-align: middle;
        margin-left: -18px;
        margin: 0;
        background-size: contain;
        background-repeat:no-repeat;
    }
    .userlogo{
        background-image: url(http://14.29.221.109:10250/upload/assets/userlogo.png);
    }
    .passlogo{
        background-image: url(http://14.29.221.109:10250/upload/assets/passlogo.png);
    }
    /* 登录按钮 */
    .signbutton{
        position: relative;
        margin: 0 auto;
        margin-top: 48px;
    }
    .signbutton input{
        border-radius: 25px;
        text-align:center;
        width: 163px;
        height: 45px;
        border:1px solid #A7D470;
        outline:none;
        font-size: 14px;
    }
    .normalsign{
        background:-webkit-linear-gradient(left,#BEDD81,#87CA81);
        color: #ffffff;
    }
</style>
