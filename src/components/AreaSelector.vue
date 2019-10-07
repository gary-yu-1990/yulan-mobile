<style></style>

<template>
  <div class="area-selector">
    <van-picker
      :columns="columns"
      value-key="regionName"
      :loading="loading"
      @change="onChange" />
  </div>
</template>

<script>
import ASH from "../utils/ASHelper";

export default {
  name: 'area-selector',
  data() {
    return {
      columns: [],
      loading: false
    }
  },

  created() {
    this.$ASH = new ASH();
    console.log('loading');
    this.loading = true;
    this.$ASH.init().then(ok => {
      this.loading = false;
      this.columns = this.$ASH.asParam();
    }).catch(err => {
      this.loading = false;
    });
  },

  methods: {
    onChange(picker, values, index) {
      // let changeprovince = values[0].regionName;
      // if(changeprovince == '香港特别行政区' || changeprovince == '澳门特别行政区' || changeprovince == '台湾省'){
      //   this.colums=[]
      // }
      values = values.filter(e => e);
      console.log('onchange at index:', index);

      this.loading = true;
      this.$ASH.onChange(values).then(updateOk => {
        this.loading = false;

        this.columns = this.$ASH.asParam();
        this.$emit("listen",this.$ASH.selecteds
            .filter(e => e)
            .map(e => e.regionName)
            .join('-'));
        console.log(
          'this.$ASH.selecteds',
          this.$ASH.selecteds
            .filter(e => e)
            .map(e => e.regionName)
            .join('-')
          );
      }).catch(err => {
        this.loading = false;
      });
    }
  }
}
</script>

