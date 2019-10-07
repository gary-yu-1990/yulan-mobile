<template>
    <div class="fold" v-show="more">
        <div class="foldwrap"></div>
        <div class="foldbox">
            <div class="box-top">
                <div class="select-box" >
                   <van-picker :columns="columns" @change="onChange" />
                </div>
            </div>
            <div class="box-bottom">
                <div class="sure" @click="sure">确定</div>
                <div class="cancel" @click="cancel">取消</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    // props:['selectflag'],
    data() {
        return {
            columns:['全部'],
            // selectflag:true,
            // columns2:['全部'],
            // columns3:[],
            more: true,
            selected:'',
            a:1,
            index:0,
            tax:""
        }
    },
    methods: {
        sure() {
            this.more = false;
            this.$emit("listen",this.more);
            this.$emit("listen2",this.selected,this.index);
        },
        cancel() {
            this.more = false;
            this.$emit("listen",this.more);
        },
        onChange(picker,value,index) {
            this.selected = (value == '全部')?'':value;
            this.index = index;
            // picker.setColumnValues(1, citys[value[0]]);
        },
    },
    computed:{
      CID() {
        if(this.$store.state.info.data.type != 'ECWEB'){
          return this.$store.state.CCID;
        }else{
          return this.$store.state.info.data.loginName
        }
      }
        },
    mounted(){
        console.log(this.$store.state.area_M)
        if(this.$store.state.position != 'SALEMAN_S'){
            console.log(this.$store.state.area_M)
            if(this.$store.state.area_M){
                this.$store.state.area_M.forEach( e => {
                    // console.log(e);
                    this.columns.push(e.bname);
                    // console.log(this.columns)
                });
            }
        }
        // console.log(this.$store.state.area_M)
        // console.log(this.areaflag)
        // if(this.$store.state.area_M){
        //     this.$store.state.area_M.forEach( e => {
        //         // console.log(e);
        //         this.columns2.push(e.bname);
        //         // console.log(this.columns2)
        //     });
        // }

        // this.columns = ['全部大区','北京办事处','太原办事处','上海办事处','南京办事处','杭州办事处','广州办事处','南宁办事处','成都办事处','重庆办事处','郑州办事处','济南办事处','沈阳办事处','长春办事处','兰州办事处','西安办事处','长沙办事处','武汉办事处','福州办事处','南昌办事处','石家庄办事处','呼和浩特办事处','合肥办事处','昆明办事处','贵阳办事处'];
        // this.columns3 = this.areaflag?this.columns2:this.columns;
        // console.log(this.columns3)
    },
    watch:{
        // item(curVal,oldVal){
        // if(curVal == 1){
        //     this.columns = [ '请选择', '公司-三证五证合一', '公司-三证五证未合' ,'个体户-有税务登记证', '个体户-无税务登记证','个人']
        // }if(curVal == 2){
        //     this.columns = [ '请选择', '公司-三证五证合一', '公司-三证五证未合' ,'个体户-有税务登记证','个人']
        // }
        // },
    }
}
</script>

<style scoped>
    .foldwrap{
        width: 100%;
        height:1000px;
        position: fixed;
        top: 0;
        background: rgba(54,54,54,0.4);
        z-index:40;
    }
    .foldbox{
        width:286px;
        height: 268px;
        background: #ffffff;
        position: fixed;
        top: 199px;
        z-index: 40;
        border-radius:10px;
        left: 45px;
    }
    .box-top{
        height: 240px;
        width: 100%;
    }
    .select-box{
        margin: 0;
        display: inline-block;
        padding-top: 10px;
        width: 168px;
        height: 210px;
        overflow: hidden;
    }
    .van-picker-column__item--selected{
        font-size: 18px;
    }
    .van-hairline--top-bottom:after {
        border-width: 3px 0;
        content: '';
    }
    /* .select-box .van-picker__columns{
        height: 32px;
        line-height: 32px;
    }
    .van-picker-column{
        height: 32px;
        line-height: 32px;
    } */
    /* .option-box{
        width:100%;
        height: 21px;
        margin-top: 4.5px;
    }
    .border{
        width:168px;
        height: 28px;
        left: 59px;
        top: 96.5px;
        position: absolute;
        border-top: 1.5px solid #B1B1B1;
        border-bottom: 1.5px solid #B1B1B1;
    } */
    .box-bottom{
        height: 48px;
        width: 100%;
        font-size: 0;
    }
    .sure,.cancel{
        width:50%;
        height: 100%;
        line-height: 48px;
        display: inline-block;
        font-size: 18px;
        background: #F2F2F2;
        color:#7D7D7D;
    }
    .sure:hover,.cancel:hover{
        background: #363636;
        color: rgba(255,255,255,1);;
    }
    .sure{
        border-radius: 0 0  0 10px;
    }
    .cancel{
        border-radius: 0 0 10px 0;
    }
</style>
