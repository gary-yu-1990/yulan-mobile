<template>
  <div id="app">
      <!-- <router-view/> -->
      <keep-alive>     <!--使用keep-alive会将页面缓存-->
    <router-view v-if="$route.meta.keepAlive"></router-view>
   </keep-alive> 
     <router-view v-if="!$route.meta.keepAlive"></router-view>
    <van-loading class="loading" type="spinner" v-if="LOADING" color="black"/>
  </div>
</template>
<script>
window.alert = function(name){
 var iframe = document.createElement("IFRAME");
iframe.style.display="none";
iframe.setAttribute("src", 'data:text/plain,');
document.documentElement.appendChild(iframe);
window.frames[0].window.alert(name);
iframe.parentNode.removeChild(iframe);
}
import { Loading } from 'vant';
import { mapState } from 'vuex'
export default {
  name: 'App',
  watch:{
    $route(to,from){
      // console.log(from.path);
      if(to.path == "/client"){
        this.$store.commit("getRoute",to.path)
      }else{
        this.$store.commit("getRoute","")
      }
    }
  },
  components:{
    [Loading.name]:Loading
  },
  computed:{
    ...mapState([
      'LOADING'
    ])
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
