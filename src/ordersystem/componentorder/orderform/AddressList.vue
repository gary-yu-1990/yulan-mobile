<template>
  <div>
    <top :top="set"></top>
    <van-address-list
      id="dress-list"
      v-model="chosenAddressId"
      :list="list"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
    />
  </div>
</template>

<script>
  import axios from "axios"
  import top from '../../../components/Top'
  import {AddressList,Toast} from 'vant';

  export default {
    name: "addressList",
    data(){
      return{
        set:17,
        //当前选中的地址列表
        chosenAddressId: this.$store.getters.getAddress.id,
        //地址列表
        list: []
      }
    },
    components:{
      top,
      [AddressList.name]:AddressList,
      [Toast.name]:Toast
    },
    methods: {
      onAdd() {
        // Toast('新增地址');
        this.$router.push({
          path:'/newaddress'
        })
      },
      onEdit(item, index) {
        // Toast('编辑地址:' + index);
        this.$router.push({
          name:'addressedit',
          params:{
            address:this.list[index]
          }
        })
      },
      //切换选中的地址时触发
      onSelect(item,index){
        this.$store.commit("setAddress",item)
        this.$router.push({
          path:'/fillorder'
        })
      },
      //获取地址列表
      getAddressList(){
        let addressUrl = this.orderBaseUrl + "/postAddress/getPostAddress.do"
        let data = {
          // "cid":"C01613"
          "cid":this.$store.getters.getCId,
        }
        axios.post(addressUrl,data).then(
          (data) => {
            console.log(data)
            let addList = data.data.data
            //一个数组
            for (let i = 0;i < addList.length;i++){
              let singleAdd = {}
              singleAdd.id = addList[i].addressId.toString()
              singleAdd.name = addList[i].wlContacts
              singleAdd.tel = addList[i].wlTel
              singleAdd.address = addList[i].province + addList[i].city + addList[i].country + addList[i].postAddress
              singleAdd.postAddress = addList[i].postAddress
              singleAdd.province = addList[i].province + addList[i].city + addList[i].country
              this.list.push(singleAdd)
            }
            console.log(this.list)
          }
        )
      }
    },
    created(){
      //获取地址列表
      this.getAddressList();
    }
  }
</script>

<style scoped>
  #dress-list{
    margin: 50px 0;
    padding: 0;
  }

  #dress-list .van-cell-group{
    /*height: auto !important;*/
  }
</style>
