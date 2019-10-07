<template>
    <div class="fold">
        <div class="foldwrap"></div>
        <div class="foldbox">
            <div class="box-top">
            
                <div class="select-box" >
                   <area-selector v-on:listen='listenselect'/>
                </div>
            </div>
            <div class="box-bottom">
                <div class="sure" @click="sure"> 确定</div>
                <div class="cancel" @click="cancel">取消</div>
            </div>
        </div>
    </div>
</template>

<script>
import AS from "@/components/AreaSelector";
    // const a = province;
    // console.log(a);
export default {
    data() {
        return {
            columns: [''],
            selected:'',
            more:false,
            a:1,
            index:0,
            province:[],
            city:[],
            town:[]
        }
    },
    mounted(){
        console.log(this.$ASH)
        let th = this;
        
    },
    components:{
        'area-selector': AS
    },
    methods: {
        sure() {
            this.more = false;
            this.$emit("listen3",this.more);
            this.$emit("listen4",this.selected);
        },
        cancel() {
            this.more = false;
            console.log(1);
            this.$emit("listen3",this.more);
        },
        listenselect(data){
            this.selected = data;
        }
        // onChange(picker,value,index) {
        //     console.log(value);
        //     switch(value){
        //         case '初始状态':this.selected = 'ONCREATE';break;
        //         case '客户填写中':this.selected = 'CUSTOMERPORCESSING';break;
        //         case '客户修改中':this.selected = 'CUSTOMERPORCESSING2';break;
        //         case '业务员审核中':this.selected = 'BUSINESSCHECKING';break;
        //         case '订单部文员审核中':this.selected = 'BIILDEPCHECKING';break;
        //         case '已通过':this.selected = 'APPROVED';break;
        //     }

        //     this.index = index;
        //     // picker.setColumnValues(1, citys[value[0]]);
        // }
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
        width:350px;
        height: 300px;
        background: #ffffff;
        position: fixed;
        top: 199px;
        z-index: 40;
        border-radius:10px;
        left: 16px;
    }
    .box-top{
        height: 260px;
        width: 100%;
        border-radius :10px;
    }
    .select-box{
        margin: 0;
        display: inline-block;
        padding-top: 10px;
        width: 100%;
        height: 210px;
        overflow: hidden;
    }
    .van-picker-column.province,.van-picker-column.town{
        border-radius :10px;
    }
    .van-picker-column__item--selected{
        font-size: 18px;
    }
    .van-hairline--top-bottom:after {
        border-width: 3px 0;
        content: '';
    }
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
