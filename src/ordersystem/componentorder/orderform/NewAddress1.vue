<template>
  <div>
    <top :top="set"></top>
    <van-address-edit
      id="address-edit"
      :area-list="areaList"
      show-set-default
      show-search-result
      :search-result="searchResult"
      @save="onSave"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
  import axios from 'axios'
  import {AddressEdit,Toast,Area } from 'vant';
  //引入所有地址数据
  import areaList from './area';
  import top from '../../../components/Top';

  export default {
    name: "addressEdit",
    data() {
      return {
        set: 18,
        areaList,
        searchResult: []
      }
    },
    components: {
      top,
      [AddressEdit.name]: AddressEdit,
      [Toast.name]: Toast,
      [Area .name]: Area
    },
    methods: {
      //保存收货地址
      onSave(value) {
        console.log(value);
        let url = "http://106.13.32.172:8080/yulan-order/postAddress/addPostAddress.do"
        let data = {
          "cid":"C01613", //必填
          "postAddress":value.province +value.city +value.county + value.addressDetail,
          "wlContacts":value.name ,
          "wlTel":value.tel,
          // "cid":"C01613", //客户ID
          // "postAddress":"测试", //客户地址，省市县+具体地址
          // "wlContacts":"三" , //收货人
          // "wlTel": 133234544 //联系电话
        }
        axios.post(url,data).then(
          (data) => {
            console.log(data)
            if (data.data.code == 0) {
              Toast('添加成功');
            }else {
              Toast('添加失败');
            }
          }
        )
      },
      onChangeDetail(val) {
        if (val) {
          this.searchResult = [{
            name: '黄龙万科中心',
            address: '杭州市西湖区'
          }];
        } else {
          this.searchResult = [];
        }
      }
    }
  }
</script>

<style scoped>
  #address-edit{
    margin: 50px 0;
  }
</style>
