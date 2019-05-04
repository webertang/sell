<template>
    <transition name="fade">
        <div v-show="showFlag" class="food" ref="food">
            <div class="food-content">
                <div class="image-header">
                    <img :src="food.image" alt="">
                    <div class="back" @click="hide">
                        <i class="icon-arrow_lift"></i>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">{{food.name}}</h1>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount}}</span>
                        <span class="rating">好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="now">￥{{food.price}}</span>
                        <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <CartControl @cart-add="addFood" :food="food"></CartControl>
                    </div>
                    <div @click="addFirst" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
                </div>
                <Split v-show="food.info"></Split>
                <div class="info" v-show="food.info">
                    <h1 class="title">商品信息</h1>
                    <p class="text">{{food.info}}</p>
                </div>
                <Split v-show="food.info"></Split>
                <div class="rating">
                    <h1 class="title">商品评价</h1>
                    <RatingSelect :select-type='selectType' :only-content='onlyContent' :desc='desc' :ratings='food.ratings'
                        @ratingTypeSelect="ratingTypeSelected" @contentToggle="contentToggle"></RatingSelect>
                </div>
                <!-- 商品评价 -->
                <div class="rating-wrapper">
                    <ul v-show="food.ratings && food.ratings.length">
                        <li v-show="needShow(rating.rateType, rating.text)" v-for="rating in food.ratings" class="rating-item">
                            <div class="user">
                                <span class="name">{{rating.username}}</span>
                                <img class="avatar" width="12" height="12" :src="rating.avatar" alt="">
                            </div>
                            <div class="time">{{formatDate(rating.rateTime)}}</div>
                            <p class="text">
                                <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}">{{rating.text}}</span>
                            </p>
                        </li>
                    </ul>
                    <div class="no-rating" v-show="!food || !food.ratings">暂无评价</div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'
import BtScroll from 'better-scroll'
import CartControl from '@/components/cart-control'
import Split from '@/components/split'
import RatingSelect from '@/components/rating-select'

const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
    name: 'food',
    props:{
        food:{
            type:Object
        }
    },
    components:{
        CartControl,
        Split,
        RatingSelect
    },
    data(){
        return {
            showFlag:false,
            selectType: ALL,
            onlyContent: false,
            desc: {
                all: '全部',
                positive: '推荐',
                negative: '吐槽'
            }
        }
    },
    methods:{
        show(){
            this.showFlag = true;
            this.selectType = ALL;
            this.$nextTick(()=>{
                if(!this.scroll){
                    this.scroll = new BtScroll(this.$refs.food,{
                        click:true
                    });
                }
            });
        },
        hide(){
            this.showFlag = false;
        },
        addFood(target) {
            this.$emit('cart-add', target)
        },
        addFirst(event){
            this.$emit('cart-add', event.target)
            Vue.set(this.food, 'count', 1);
        },
        needShow(type, text){
            if(this.onlyContent && !text){
                return false;
            }
            if(this.selectType === ALL){
                return true;
            }else{
                return type === this.selectType;
            }
        },
        ratingTypeSelected(type){
            this.selectType = type;
        },
        contentToggle(onlyContent){
            this.onlyContent = onlyContent;
        },
        formatDate(time){
            return moment(time).format('YYYY-MM-DD hh:mm')
        }
    }
}
</script>

<style scoped lang="less">
@import '~common/css/variable.less';
@import '~common/css/mixin.less';

    .food{
        position: fixed;
        left: 0;
        top: 0;
        bottom: 48px;
        z-index: 30;
        width: 100%;
        background: #fff;
        text-align: left;
        &.fade-enter, &.fade-leave-active{
            transform: translate3d(100%, 0, 0);
        }
        &.fade-enter-active, &.fade-leave-active{
            transition: all .5s ease-in-out;
        }
        .image-header{
            position: relative;
            width: 100%;
            height: 0;
            padding-top:100%;//正方形图片
            img{
                position: absolute;
                top:0;
                left: 0;
                width: 100%;
                height: 100%;
            }
            .back{
                position: absolute;
                top: 10px;
                left: 0;
                .icon-arrow_lift{
                    display: block;
                    padding: 10px;
                    font-size: 20px;
                    color: #fff;
                }
            }
        }
        .content{
            position: relative;
            padding:18px;
            text-align: left;
            .title{
                line-height: 14px;
                margin-bottom:8px;
                font-size: 14px;
                font-weight: 700;
                color:rgb(7, 17, 24);
            }
            .detail{
                margin-bottom: 18px;
                line-height: 10px;
                font-size: 0;
                .sell-count,.rating{
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                }
                .sell-count{
                    margin-right: 12px;
                }
            }      
            .price{
                line-height: 24px;
                font-weight: 700;
                .now{
                    margin-right: 8px;
                    font-size: 14px;
                    color: rgb(240, 20, 20);
                }
                .old{
                    text-decoration: line-through;
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                }
            }
            .cartcontrol-wrapper{
                position: absolute;
                right: 12px;
                bottom: 12px;
            }
            .buy{
                position: absolute;
                right: 18px;
                bottom: 18px;
                z-index: 10;
                height: 24px;
                line-height: 24px;
                padding: 0 12px;
                box-sizing: border-box;
                border-radius: 12px;
                font-size: 10px;
                color: #fff;
                background: @color-blue;
                // opacity: 1;
                // &.fade-enter-active, &.fade-leave-active{
                //     transition: all 0.3s;
                // }
                // &.fade-enter, &.fade-leave-active{
                //     opacity: 0;
                //     z-index: -1;
                // }
            }
        }
        .info{
            padding: 18px;
            .title{
                line-height: 14px;
                margin-bottom: 6px;
                font-size: 14px;
                color:rgb(7, 17, 27);
            }
            .text{
                line-height: 24px;
                padding: 0 8px;
                font-size: 12px;
                color:rgb(77, 85, 93);
            }
        }
        .rating{
            line-height: 14px;
            margin-left: 18px;
            font-size: 14px;
            color: rgb(7, 17, 27);
        }
        .rating-wrapper{
            padding: 0 18px;
            .rating-item{
                position: relative;
                padding: 16px 0;
                .border-1px(rgba(7, 17, 27, 0.1));
                .user{
                    position: absolute;
                    right: 0;
                    top: 16px;
                    line-height: 12px;
                    font-size: 0;
                    .name{
                        display: inline-block;
                        margin-right: 6px;
                        vertical-align: top;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                    .avatar{
                        border-radius: 50%;
                    }
                }
                .time{
                    margin-bottom: 6px;
                    line-height: 12px;
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                }
                .text{
                    line-height: 16px;
                    font-size: 12px;
                    color:rgb(7, 17, 27);
                    .icon-thumb_up, .icon-thumb_down{
                        margin-right: 4px;
                        line-height: 16px;
                        font-size: 12px;
                    }
                    .icon-thumb_up{
                        color:rgb(0, 160, 220);
                    }
                    .icon-thumb_down{
                        color:rgb(147, 153, 159);
                    }
                }
            }
            .no-rating{
                padding: 16px 0;
                font-size: 12px;
                color: rgb(147, 153, 159);
            }
        }
    }
</style>
