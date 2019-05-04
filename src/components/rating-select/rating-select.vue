<template>
    <div class="ratingSelect">
        <div class="ratingType">
            <span @click="select(2, $event)" class="block positive" :class="{'active':newSelectType===2}">
                {{desc.all}}<span class="count">{{ratingsCount}}</span></span>
            <span @click="select(0, $event)" class="block positive" :class="{'active':newSelectType===0}">
                {{desc.positive}}<span class="count">{{positiveCount}}</span></span>
            <span @click="select(1, $event)" class="block negative" :class="{'active':newSelectType===1}">
                {{desc.negative}}<span class="count">{{negativeCount}}</span></span>
        </div>
        <div @click="toggleContent" class="switch">
            <span class="icon-check_circle" :class="{'on':newOnlyContent}"></span>
            <span class="text">只看有内容评价</span>
        </div>
    </div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
    props:{
        ratings:Array,
        default(){
            return [];
        },
        selectType:{
            type:Number,
            default: ALL
        },
        onlyContent:{
            type: Boolean,
            default: false
        },
        desc:{
            type: Object,
            default(){
                return {
                    all: '全部',
                    positive: '满意',
                    negative : '不满意'
                }
            }
        }
    },
    data() {
        return {
            newSelectType: this.selectType,
            newOnlyContent: this.onlyContent
        }
    },
    computed:{
        ratingsCount(){
            if(this.ratings)
                return this.ratings.length;
            return '';
        },
        positiveCount(){
            if(this.ratings)
                return this.ratings.filter((rating)=>{
                    return rating.rateType === POSITIVE;
                }).length;
            return '';
        },
        negativeCount(){
            if(this.ratings)
                return this.ratings.filter((rating)=>{
                    return rating.rateType === NEGATIVE;
                }).length;
            return '';
        }
    },
    methods: {
        select(type, event){
            this.newSelectType = type;
            this.$emit('ratingTypeSelect', type);
        },
        toggleContent(event){
            this.newOnlyContent = !this.newOnlyContent;
            this.$emit('contentToggle', this.newOnlyContent);
        }
    },
    //TODO 父控件改变了子控件内容，子控件变量不会变。
    // watch(){

    // }
}
</script>

<style lang="less" scoped>
@import '~common/css/mixin.less';
@import '~common/css/variable.less';

.ratingSelect{
    .ratingType{
        padding: 18px 0;
        margin:0 18px;
        .border-1px(rgba(7, 17, 27, 0.1));
        font-size: 0px;
        .block{
            display: inline-block;
            padding: 8px 12px;
            margin-right: 8px;
            line-height: 16px;
            border-radius: 1px;
            font-size: 12px;
            color:rgb(77, 85, 93);
            .count{
                margin-left: 2px;
                font-size: 8px;
            }
            &.positive{
                background: rgba(0, 160, 220, 0.2);
                &.active{
                    background: rgb(0, 160, 220);
                    color: @color-white;
                }
            }
            &.negative{
                background: rgba(77, 85, 93, 0.2);
                &.active{
                    background: rgb(77, 85, 93);
                    color: @color-white;
                }
            }
        }
    }
    .switch{
        padding: 12px 18px;
        line-height: 24px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        color: rgb(147, 153, 159);
        .icon-check_circle{
            display: inline-block;
            vertical-align: top;
            margin-right: 4px;
            font-size: 24px;
            &.on{
                color:@color-green;
            }
        }
        .text{
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
        }
    }
}
</style>
