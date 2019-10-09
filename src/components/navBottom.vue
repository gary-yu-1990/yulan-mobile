<template>
  <div class="nav" ref="nav">
    <div class="nav-list">
      <div class="home" @click="clickToPath('customer')">
        <div class="home-pic1" ref="homePic"></div>
        <div class="home-font">主页</div>
      </div>
      <div v-if="isContainAttr('myorder')" class="form" @click="clickToPath('myorder')">
        <div class="form-pic1" ref="formPic"></div>
        <div class="form-font">订单查询</div>
      </div>
      <div v-if="isContainAttr('shoppingcart')" class="shop" @click="clickToPath('shoppingcart')">
        <div class="shop-pic1" ref="shopPic"></div>
        <div class="shop-font">购物车</div>
      </div>
      <div class="my" @click="clickToPath('mypersonal')">
        <div class="my-pic2" ref="myPic"></div>
        <div class="my-font">我的</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //order
  name: "navBottom",
  props: ["changeStyle", "tabStage"],
  methods: {
    isContainAttr(attr) {
      //是否包含权限
      return (
        this.$store.state.menuTreeListFlatten.filter(
          item => item.MENU_LINK == attr
        ).length > 0
      );
    },
    clickToPath(path) {
      this.$router.push({
        path: "/" + path
      });
    },
  },
  mounted() {
    // if (this.changeStyle == "customer" || this.changeStyle == "shopstore") {
    //   let a = this.$refs.nav;
    //   a.className = "nav2";
    // }
    if (this.tabStage == "customer") {
      if (this.$refs.homePic) {
        this.$refs.homePic.classList.remove("home-pic2");
        this.$refs.homePic.classList.add("home-pic1");
      }
      if (this.$refs.myPic) {
        this.$refs.myPic.classList.remove("my-pic1");
        this.$refs.myPic.classList.add("my-pic2");
      }
      if (this.$refs.formPic) {
        this.$refs.formPic.classList.remove("form-pic2");
        this.$refs.formPic.classList.add("form-pic1");
      }
      if (this.$refs.shopPic) {
        this.$refs.shopPic.classList.remove("shop-pic2");
        this.$refs.shopPic.classList.add("shop-pic1");
      }
    }
    if (this.tabStage == "cart") {
      if (this.$refs.homePic) {
        this.$refs.homePic.classList.remove("home-pic1");
        this.$refs.homePic.classList.add("home-pic2");
      }
      if (this.$refs.myPic) {
        this.$refs.myPic.classList.remove("my-pic1");
        this.$refs.myPic.classList.add("my-pic2");
      }
      if (this.$refs.formPic) {
        this.$refs.formPic.classList.remove("form-pic2");
        this.$refs.formPic.classList.add("form-pic1");
      }
      if (this.$refs.shopPic) {
        this.$refs.shopPic.classList.remove("shop-pic1");
        this.$refs.shopPic.classList.add("shop-pic2");
      }
    }
    if (this.tabStage == "order") {
      if (this.$refs.homePic) {
        this.$refs.homePic.classList.remove("home-pic1");
        this.$refs.homePic.classList.add("home-pic2");
      }
      if (this.$refs.myPic) {
        this.$refs.myPic.classList.remove("my-pic1");
        this.$refs.myPic.classList.add("my-pic2");
      }
      if (this.$refs.formPic) {
        this.$refs.formPic.classList.remove("form-pic1");
        this.$refs.formPic.classList.add("form-pic2");
      }
      if (this.$refs.shopPic) {
        this.$refs.shopPic.classList.remove("shop-pic2");
        this.$refs.shopPic.classList.add("shop-pic1");
      }
    }
    if (this.tabStage == "personal") {
      if (this.$refs.myPic) {
        this.$refs.myPic.classList.remove("my-pic2");
        this.$refs.myPic.classList.add("my-pic1");
      }
      if (this.$refs.homePic) {
        this.$refs.homePic.classList.remove("home-pic1");
        this.$refs.homePic.classList.add("home-pic2");
      }
      if (this.$refs.formPic) {
        this.$refs.formPic.classList.remove("form-pic2");
        this.$refs.formPic.classList.add("form-pic1");
      }
      if (this.$refs.shopPic) {
        this.$refs.shopPic.classList.remove("shop-pic2");
        this.$refs.shopPic.classList.add("shop-pic1");
      }
    }
  }
};
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
  background-image: url("../assets/form1.png");
  background-size: contain;
  margin: 0 auto;
  background-repeat: no-repeat;
}

.form-pic2 {
  width: 30px;
  height: 30px;
  background-image: url("../assets/form2.png");
  background-size: contain;
  margin: 0 auto;
  background-repeat: no-repeat;
}

.form-font {
  font-size: 10px;
  color: #7d7d7d;
}

.shop {
  height: 45px;
}

.shop-pic1 {
  width: 30px;
  height: 30px;
  background-image: url("../assets/shop.png");
  background-size: contain;
  margin: 0 auto;
  background-repeat: no-repeat;
}

.shop-pic2 {
  width: 30px;
  height: 30px;
  background-image: url("../assets/shop1.png");
  background-size: contain;
  margin: 0 auto;
  background-repeat: no-repeat;
}

.shop-font {
  font-size: 10px;
  color: #7d7d7d;
}

.home-pic1 {
  width: 30px;
  height: 30px;
  background-image: url("../assets/home.png");
  background-size: contain;
  background-repeat: no-repeat;
}

.home-pic2 {
  width: 30px;
  height: 30px;
  background-image: url("../assets/home2.png");
  background-size: contain;
  background-repeat: no-repeat;
}

.home-font {
  font-size: 10px;
  color: #7d7d7d;
}

.my-pic2 {
  width: 30px;
  height: 30px;
  background-image: url("../assets/my2.png");
  background-size: contain;
  background-repeat: no-repeat;
}

.my-pic1 {
  width: 30px;
  height: 30px;
  background-image: url("../assets/my.png");
  background-size: contain;
  background-repeat: no-repeat;
}

.my-font {
  font-size: 10px;
  color: #7d7d7d;
}
</style>
