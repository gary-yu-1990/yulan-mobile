<template>
  <div>
    <div class="examShow" v-show="show">
      <div>
        <div class="exam">
        <div id="record2" @click="showIt"></div>
        <span @click="showIt">评审记录</span>
        </div>
        <div class="status">

          <p>当前状态：<span>{{ customerInfo }}</span></p>
          <!-- <p>当前状态：<span>????</span></p> -->
        </div>
        </div>
        <hr />

        <!-- <div class="statusMsg"> -->
            <!-- <div class="point" v-for="(time, index) in times" :key="index">
            <div class="time">
              <span>{{ time.text }}</span>
              <p>客户提交</p>
            </div>
            </div> -->
            <!-- <div class="point" v-for="(time, index) in times" :key="index">
              <div class="time">
                <span>{{ time.text }}</span>
                <p>客户提交</p>
              </div>
            </div> -->
            <div class="scoll">
              <div class="message" v-for="(text, index) in texts" :key="index">
              <div class="point"></div>
            <div class="time">
              <p>{{texts[index]}}</p>
              <!-- <p>{{text}}</p> -->
            </div>
            </div>
            </div>
        <!-- </div> -->
          </div>
  </div>
</template>

<script>
export default {
  props:["show","message","customerInfo"],
  data(){
    return{
      statusNum:0,
      isShow:"",
      texts:[],
    }
  },
  watch:{
    message(){
      this.texts = this.message;
  },
    customerInfo(){
    }
  },
computed:{
  CID() {
    if(this.$store.state.info.data.type != 'ECWEB'){
      return this.$store.state.CCID;
    }else {
      return this.$store.state.info.data.loginName
    }
  }
},
  methods:{
    showIt:function(){
      this.isShow = !this.show
      this.$emit("set", this.isShow)
    },
  }
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  list-style: none;
}
.exam{
  display: flex;
  align-items: center;
  color: #89CB81;
  font-size: 15px;
  justify-content: center;
  /* align-self: flex-end; */
  margin-bottom: 8px;
}
.exam span{
  display: block;
  text-decoration: underline;
  margin-left: 6px;
}
.examShow{
  z-index: 99;
  width: 300px;
  /* height: 239px; */
  background: white;
  /* background: pink; */
  position: absolute;
  right: 11px;
  top: 115px;
  border-radius: 7px;
  border: 1px solid #D9D9D9;
}
/* .status>p{
  margin-left:35px;
} */
#record2{
  width: 12px;
  height: 12px;
  background: url("http://14.29.221.109:10250/upload/assets/triangle_right_fill.png");
  background-size: 100% 100%;
  margin-left: 10px;
}
/* .status span{
  margin-right: 38px;
  color: #7D7D7D;
  font-size: 15px;
}
.status p{
  color: #F15656;
  font-size: 13px;
  width: 80px;
  text-decoration: underline;
  margin-left: 35px;
} */
.status{
  font-size: 15px;
}
.status span{
  color: red;
}
hr{
  margin-top: 14px;
  border: 1px solid #DEDEDE;
}
.message{
  display: flex;
}
.scoll{
  height: 250px;
  overflow-y: scroll;
}
.point{
  width: 5px;
  height: 5px;
  background: #89CB81;
  border-radius: 50%;
  border: none;
  margin-left: 10px;
  margin-top: 20px;
}
.time span{
  align-self: center;
  font-size: 13px;
  margin-right: 18px;
}
.time p{
  font-size: 13px;
  text-align: left;
}
.time{
  margin-top: 15px;
  margin-left: 6px;
}
</style>
