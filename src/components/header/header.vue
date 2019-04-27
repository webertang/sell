<template>
    <div>
        <div class="header">
            <div class="content-wapper">
                <div class="avatar">
                    <img width="64" height="64" :src="seller.avatar" alt="头像">
                </div>
                
                <div class="content">
                    <div class="title">
                        <span class="brand"></span>
                        <span class="name">{{seller.name}}</span>
                    </div>
                    <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                    </div>
                    <div v-if="seller.supports" class="support">
                        <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                        <span class="text">{{seller.supports[0].description}}</span>
                    </div>
                </div>
                <div v-if="seller.supports" class="support-count" @click="showDetail">
                    <span class="count">{{seller.supports.length}}个</span>
                    <i class="icon-keyboard_arrow_right"></i>
                </div>
                <div class="background">
                    <img :src="seller.avatar" width="100%" height="100%" alt="">
                </div>
            </div>
            <div class="bulletin-wrapper" @click="showDetail">
                <div class="bulletin-title"></div><span class="bulletin-text">{{seller.bulletin}}</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
            <transition name="slide-fade">
                <div class="detail" v-show="detailShow">
                    <div class="detail-wrapper clearfix">
                        <div class=detail-main>
                            <div class="name">{{seller.name}}</div>
                            <div class="star-wrapper">
                                <star :score=seller.score :size=48></star>
                            </div>
                            <div class="title">
                                <div class="line"></div>
                                <div class="text">优惠信息</div>
                                <div class="line"></div>
                            </div>
                            <ul class="supports" v-if="seller.supports">
                                <li class="support-item" v-for="(item,index) in seller.supports">
                                    <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                                    <span class="text">{{seller.supports[index].description}}</span>
                                </li>
                            </ul>
                            <div class="title">
                                <div class="line"></div>
                                <div class="text">商家公告</div>
                                <div class="line"></div>
                            </div>
                            <div class="bulletin">
                                <p class="content">{{seller.bulletin}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="detail-close" @click="hideDetail">
                        <i class="icon-close"></i>
                    </div>
                </div>
            </transition>
        </div>
        <div  class="tab">
            <router-link class="tab-item" router-link to="/goods" exact>商品</router-link>
            <router-link class="tab-item" router-link to="/ratings" exact>评论</router-link>
            <router-link class="tab-item" router-link to="/seller" exact>商家</router-link>
        </div>
    </div>
</template>

<script>
import star from "@/components/star";
export default {
    name: "v_header",
    props:{
        seller:{
            type:Object
        }
    },
    data(){
        return{
            detailShow:false
        }
    },
    methods:{
        showDetail(){
            this.detailShow = true;
        },
        hideDetail(){
            this.detailShow = false;
        }
    },
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components:{
        star
    }
};
</script>

<style scoped lang="less">
@import "../../common/css/index.less";

// 头部
.header{
    color:#fff;
    background: rgba(7, 17, 27, .5);
    .content-wapper{
        display: flex;
        position: relative;
        padding:24px 12px 18px 24px;
        .avatar{
            display: inline-block;
            img{
                border-radius: 2px;
            }
        }
        .content{
            display: inline-block;
            text-align: left;
            margin-left: 16px;
            .title{
                margin:2px 0 8px 0;
                .brand{
                    display: inline-block;
                    vertical-align: top;
                    width: 30px;
                    height: 18px;
                    .bg-image("../../components/header/img/brand");
                    background-size: 30px 18px;
                    background-repeat: no-repeat;
                }
                .name{
                    margin-left: 6px;
                    font-size: 16px;
                    line-height: 18px;
                    font-weight: bold;
                }
            }
            .description{
                margin-bottom: 10px;
                line-height: 12px;
                font-size:14px;
            }
            .support{
                .icon{
                    display: inline-block;
                    vertical-align: top;
                    height: 12px;
                    width: 12px;
                    background-size: 12px 12px;
                    background-repeat: no-repeat;
                    &.decrease{
                        .bg-image('../../components/header/img/decrease_1');
                    }
                    &.discount{
                        .bg-image('../../components/header/img/discount_1');
                    }
                    &.guarantee{
                        .bg-image('../../components/header/img/guarantee_1');
                    }
                    &.invoice{
                        .bg-image('../../components/header/img/invoice_1');
                    }
                    &.special{
                        .bg-image('../../components/header/img/special_1');
                    }
                }
                .text{
                    line-height: 12px;
                    font-size: 12px;
                }
            }
        }
        .support-count{
            position: absolute;
            right: 12px;;
            bottom: 18px;
            padding: 0 8px;
            height: 24px;
            line-height: 24px;
            border-radius: 14px;
            background: rgba(0, 0, 0, 0.2);
            text-align:center;
            .count{
                font-size: 10px;
            }
            .icon-keyboard_arrow_right{
                font-size: 10px;
            }
        }
        .background{
            position:absolute;
            width: 100%;
            height: 100%;
            top:0;
            left:0;
            z-index: -1;
            filter: blur(10px);
        }
    }
    .bulletin-wrapper{
        position: relative;
        height: 28px;
        line-height: 28px;
        padding: 0 22px 0 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        background: rgba(17, 27, 7, 0.2);
        .bulletin-title{
            display: inline-block;
            vertical-align: middle;
            width:22px;
            height: 14px;
            background-size: 22px 14px;
            background-repeat: no-repeat;
            .bg-image("../../components/header/img/bulletin");
        }
        .bulletin-text{
            font-size: 10px;
            vertical-align: middle;
            margin:0 4px;
        }
        .icon-keyboard_arrow_right{
            position: absolute;
            vertical-align: middle;
            font-size: 10px;
            right: 12px;
            top:8px;
        }
    }
    .detail{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        width: 100%;
        height: 100%;
        overflow: auto;
        background: rgba(7, 17, 27, 0.8);
        /* 设置进入和离开动画 */
        &.slide-fade-enter-active {
            transition: all .5s ease;
        }
        &.slide-fade-leave-active {
            transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        }
        &.slide-fade-enter, &.slide-fade-leave-to{
            transform: translateZ(-100%);
            opacity: 0;
        }

        .detail-wrapper{
            width: 100%;
            min-height: 100%;
            .detail-main{
                margin-top: 64px;
                padding-bottom: 64px;
                .name{
                    line-height: 16px;
                    text-align: center;
                    font-size: 16px;
                    font-weight: 700;
                }
                .star-wrapper{
                    margin-top: 18px;
                    padding:2px 0;
                }
                .title{
                    display: flex;
                    width: 80%;
                    margin: 28px auto 24px auto;
                    .text{
                        padding:0 12px;
                        font-size: 14px;
                        font-weight: 700;
                    }
                    .line{
                        position: relative;
                        flex: 1;
                        top:-6px;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                    }
                }
                .supports{
                    width: 80%;
                    margin:0 auto;
                    .support-item{
                        padding:0 12px;
                        margin-bottom: 12px;
                        font-size: 0;
                        text-align: left;
                        &:last-child{
                            margin-bottom: 0;
                        }
                        .icon{
                            display: inline-block;
                            width: 16px;
                            height: 16px;
                            vertical-align: top;
                            margin-right:6px;
                            background-size: 16px 16px;
                            background-repeat: no-repeat;
                            &.decrease{
                                .bg-image('../../components/header/img/decrease_2');
                            }
                            &.discount{
                                .bg-image('../../components/header/img/discount_2');
                            }
                            &.guarantee{
                                .bg-image('../../components/header/img/guarantee_2');
                            }
                            &.invoice{
                                .bg-image('../../components/header/img/invoice_2');
                            }
                            &.special{
                                .bg-image('../../components/header/img/special_2');
                            }
                        }
                        .text{
                            font-size: 12px;
                            line-height: 16px;
                        }
                    }
                }
                .bulletin{
                    width: 80%;
                    margin:0 auto;
                    text-align: left;
                    .content{
                        padding:0 12px;
                        font-size: 12px;
                        line-height: 24px;
                    }
                }
            }
        }
        .detail-close{
            position: relative;
            width: 32px;
            height: 32px;
            margin: -64px auto 0 auto;
            clear: both;
            font-size: 32px;
        }
    }
}

// 导航条
.tab {
    display: flex;
    line-height: 40px;
    height: 40px;
    text-align: center;
    .tab-item {
        flex: 1;
        font-size: 14px;
        color: rgb(77, 85, 93);
        .border-1px(red);
    }
    .router-link-active {
    color: red;
    }
}


</style>
