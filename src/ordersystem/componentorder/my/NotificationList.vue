<template>
  <div>
    <top :top="set" :from="from"></top>
    <div class="notification-list">
      <van-list
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
        :finished="finished"
        finished-text="没有更多了"
      >
        <van-cell
          v-for="item in list"
          :key="item.ID"
          is-link
          center
          
        >
          <van-icon slot="icon" name="volume-o" size="18px" dot color="gray" />
          <div slot="title" class="nt-cell">
            <span>{{item.TITLE}}</span>
          </div>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
import top from "../../../components/Top";
import { Popup, Toast, List, Cell, Icon } from "vant";
import { get, post, patch, put } from '@/api/httpASP'

import axios from "axios";
export default {
  name: "",
  components: {
    top,
    [Popup.name]: Popup,
    [Toast.name]: Toast,
    [List.name]: List,
    [Cell.name]: Cell,
    [Icon.name]: Icon,
  },
  data() {
    return {
      set: 27.1,
      from: "",
      list: [],
      error: false,
      loading: false,
      finished: false,
    };
  },
  computed: {
  },
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        let url = "/NOTIFICATION/GetPageDataTable";
        let data = {
          cid: this.$store.getters.getCId, //客户号
          condition: '',
          limit: 20,
          page: 1,
        };
        post(url, data, {}).then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            this.list.push(res.data[i]);
          }
          // 加载状态结束
          this.loading = false;
          // 数据全部加载完成
          if (this.list.length >= res.count) {
            this.finished = true;
          }
        }).catch((err) => {

        })

      }, 500);
    },
  },
  created() {
    this.from = this.$route.params.from;
  }
};
</script>

<style scoped>
.notification-list {
  margin-top: 60px;
}
.nt-cell {
  text-align: left !important;
  margin-left: 5px;
}
</style>
