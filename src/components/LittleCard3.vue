<template>
  <div class="little-card3">
    <div class="area">{{card.area}}</div
    ><div class="manager">{{card.manager}}</div
    ><div class="status">{{card.status}}</div
    ><div class="count">{{card.count}}</div>
  </div>
</template>

<script>
export default {
  props:['card'],
  data(){
    return{

    }
  }
}
</script>

<style scoped>
.little-card3{
  width: 349px;
  height: 37px;
  position: relative;
  margin: 0 auto;
  border-radius: 7px;
  margin-top: 7px;
  box-sizing: border-box;
}
.little-card3 div{
  display: inline-block;
  margin: 0;
  padding: 0;
  font-size: 13px;
  margin-right: 3px;
}
.area{
  width: 80px;
  background-color: #fff;
  height: 37px;
  line-height: 37px;
  border-radius: 7px 0 0 7px;
}
.manager{
  width: 75px;
  background-color: #fff;
  height: 37px;
  line-height: 37px;
}
.status{
  width: 127px;
  height: 37px;
  line-height: 37px;
  background-color: #fff;
}
.count{
  width: 53px;
  height: 37px;
  line-height: 37px;
  background-color: #fff;
  border-radius:  0 7px 7px 0;
}
</style>
