<template>
    <div class="fold" v-show="more">
        <div class="foldwrap"></div>
        <div class="foldbox">
            <div class="box-top">
                <div class="select-box" >
                    <van-picker :columns="columns" @change="onChange"/>
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
export default {
    props:['index','areaflag','area_2'],
    data() {
        return {
            columns: ['全部'
                // ['全部','河北省', '北京市', '天津市'],
                //         ['全部','山西省', '内蒙古自治区', '粤北'],
                //         ['全部','上海市','苏南'],
                //         ['全部','江苏省','安徽省','苏南','江苏其他'],
                //         ['全部','浙江省','浙南'],
                //         ['全部','广东省','粤北','粤西'],
                //         ['全部','广西省(桂柳邕)','海南省','广西其他'],
                //         ['全部','四川省','云南省','西藏自治区','川南','川北','成都市'],
                //         ['全部','贵州省','重庆市'],
                //         ['全部','河南省','豫南'],
                //         ['全部','山东省','鲁西南'],
                //         ['全部','辽宁省','辽西南'],
                //         ['全部','吉林省','黑龙江省'],
                //         ['全部','甘肃省','宁夏自治区','青海省'],
                //         ['全部','陕西省','新疆维吾尔自治区','陕南'],
                //         ['全部','湖南省','湘中南'],
                //         ['全部','湖南省','湖北省','鄂西'],
                //         ['全部','福建省','江西省'],
                //         ['全部','江西省'],
                //         ['全部','河北省'],
                //         ['全部','内蒙古自治区'],
                //         ['全部','安徽省'],
                //         ['全部','云南省'],
                //         ['全部','贵州省']
            ],
            columns2:['全部'],//当身份是大区经理时，则使用这个数组传递二级列表
            more: true,
            selected:'',
            a:1,
        }
    },
    mounted(){
        let th = this;
        if(this.$store.state.position == 'SALEMAN_S'){
            console.log(this.$store.state.area_M)
            this.$store.state.area_M.forEach(e =>{
                this.columns.push(e.sname);
            })
        }
    },
    watch:{
        index(val,oldval){
            // console.log(this.$store.state.area_M)
            this.columns = ['全部'];
            this.$store.state.area_M[val-1].Sarea.forEach( e => {
                this.columns.push(e.sname);                
            });
        },
        columns(val){
            console.log(val)
        }
    },
    methods: {
        // onChange(picker, value, index) {
        //     Toast(`当前值：${value}, 当前索引：${index}`);
        // },
        sure() {
            this.more = false;
            console.log(this.selected);
            this.$emit("listen3",this.more);
            this.$emit("listen4",this.selected);
        },
        cancel() {
            this.more = false;
            this.$emit("listen3",this.more);           
        },
        onChange(picker,value,index) {
            this.selected = (value == '全部')?'':value;
            console.log(this.selected)
            // picker.setColumnValues(1, citys[value[0]]);
        }
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
