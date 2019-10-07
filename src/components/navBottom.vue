<template>
  <div class="nav" ref="nav">
    <div class="nav-list">
      <div class="home" @click="clickHome">
        <div class="home-pic1" ref="homePic"></div>
        <div class="home-font">主页</div>
      </div>
      <div class="form" @click="clickForm">
        <div class="form-pic1" ref="formPic"></div>
        <div class="form-font">订单查询</div>
      </div>
      <div class="shop" @click="clickShop">
        <div class="shop-pic1" ref="shopPic"></div>
        <div class="shop-font">购物车</div>
      </div>
      <div class="my" @click="clickMy">
        <div class="my-pic2" ref="myPic"></div>
        <div class="my-font">我的</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    //order
    name: 'navBottom',
    props: ['changeStyle', 'tabStage'],
    methods: {
      clickMy() {
        this.$router.push({
          path:'/mypersonal'
        })
      },
      clickHome() {
        this.$router.push({
          path: '/customer'
        });
      },
      clickShop() {
        this.$router.push({
          path: '/shoppingcart'
        });
      },
      clickForm() {
        this.$router.push({
          path: '/myorder'
        });
      }
    },
    mounted() {
      if (this.changeStyle == "customer" || this.changeStyle == "shopstore") {
        let a = this.$refs.nav;
        a.className = "nav2";
      }
      if (this.tabStage == "customer") {
        this.$refs.homePic.classList.remove('home-pic2');
        this.$refs.homePic.classList.add('home-pic1');
        this.$refs.myPic.classList.remove('my-pic1');
        this.$refs.myPic.classList.add('my-pic2');
        this.$refs.formPic.classList.remove('form-pic2');
        this.$refs.formPic.classList.add('form-pic1');
        this.$refs.shopPic.classList.remove('shop-pic2');
        this.$refs.shopPic.classList.add('shop-pic1');
      }
      if (this.tabStage == "cart") {
        this.$refs.homePic.classList.remove('home-pic1');
        this.$refs.homePic.classList.add('home-pic2');
        this.$refs.myPic.classList.remove('my-pic1');
        this.$refs.myPic.classList.add('my-pic2');
        this.$refs.formPic.classList.remove('form-pic2');
        this.$refs.formPic.classList.add('form-pic1');
        this.$refs.shopPic.classList.remove('shop-pic1');
        this.$refs.shopPic.classList.add('shop-pic2');
      }
      if (this.tabStage == "order") {
        this.$refs.homePic.classList.remove('home-pic1');
        this.$refs.homePic.classList.add('home-pic2');
        this.$refs.myPic.classList.remove('my-pic1');
        this.$refs.myPic.classList.add('my-pic2');
        this.$refs.formPic.classList.remove('form-pic1');
        this.$refs.formPic.classList.add('form-pic2');
        this.$refs.shopPic.classList.remove('shop-pic2');
        this.$refs.shopPic.classList.add('shop-pic1');
      }
      if (this.tabStage == "personal") {
        this.$refs.myPic.classList.remove('my-pic2');
        this.$refs.myPic.classList.add('my-pic1');
        this.$refs.homePic.classList.remove('home-pic1');
        this.$refs.homePic.classList.add('home-pic2');
        this.$refs.formPic.classList.remove('form-pic2');
        this.$refs.formPic.classList.add('form-pic1');
        this.$refs.shopPic.classList.remove('shop-pic2');
        this.$refs.shopPic.classList.add('shop-pic1');
      }
    }
  }
</script>

<style scoped>
  .nav {
    width: 375px;
    height: 60px;
    background-color: #fff;
    position: fixed;
    z-index: 999;
    bottom: 0;
  }

  .nav2 {
    width: 375px;
    height: 60px;
    background-color: #fff;
    position: absolute;
    z-index: 100;
    bottom: 0;
  }

  .nav-list {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 60px;
  }

  .home {
    height: 45px;
  }

  .my {
    height: 45px;
  }

  .form {
    height: 45px;
  }

  .form-pic1 {
    width: 30px;
    height: 30px;
    background-image: url('http://14.29.221.109:10250/upload/assets/form1.png');
    background-size: contain;
    margin: 0 auto;
    background-repeat: no-repeat;
  }

  .form-pic2 {
    width: 30px;
    height: 30px;
    background-image: url('http://14.29.221.109:10250/upload/assets/form2.png');
    background-size: contain;
    margin: 0 auto;
    background-repeat: no-repeat;
  }

  .form-font {
    font-size: 10px;
    color: #7D7D7D;
  }

  .shop {
    height: 45px;
  }

  .shop-pic1 {
    width: 30px;
    height: 30px;
    background-image: url('http://14.29.221.109:10250/upload/assets/shop.png');
    background-size: contain;
    margin: 0 auto;
    background-repeat: no-repeat;
  }

  .shop-pic2 {
    width: 30px;
    height: 30px;
    background-image: url('http://14.29.221.109:10250/upload/assets/shop1.png');
    background-size: contain;
    margin: 0 auto;
    background-repeat: no-repeat;
  }

  .shop-font {
    font-size: 10px;
    color: #7D7D7D;
  }

  .home-pic1 {
    width: 30px;
    height: 30px;
    background-image: url('http://14.29.221.109:10250/upload/assets/home.png');
    background-size: contain;
    background-repeat: no-repeat;
  }

  .home-pic2 {
    width: 30px;
    height: 30px;
    background-image: url('http://14.29.221.109:10250/upload/assets/home2.png');
    background-size: contain;
    background-repeat: no-repeat;
  }

  .home-font {
    font-size: 10px;
    color: #7D7D7D;
  }

  .my-pic2 {
    width: 30px;
    height: 30px;
    background-image: url('http://14.29.221.109:10250/upload/assets/my2.png');
    background-size: contain;
    background-repeat: no-repeat;
  }

  .my-pic1 {
    width: 30px;
    height: 30px;
    background-image: url('http://14.29.221.109:10250/upload/assets/my.png');
    background-size: contain;
    background-repeat: no-repeat;
  }

  .my-font {
    font-size: 10px;
    color: #7D7D7D;
  }

</style>
