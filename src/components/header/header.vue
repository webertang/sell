<template>
    <div>
        <div class="header">
            <!-- content-wrapper开始 -->
            <div class="content-wapper">
                <div class="avatar">
                    <img width="64" height="64" :src="seller.avatar" alt="头像">
                </div>
                
                <!-- content开始 -->
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
                <div v-if="seller.supports" class="support-count">
                    <span class="count">{{seller.supports.length}}个</span>
                    <i class="icon-keyboard_arrow_right"></i>
                </div>
                <!-- /content -->
            </div>
            <div class="bulletin-wapper"></div>
        </div>
        <div  class="tab">
            <router-link class="tab-item" router-link to="/goods" exact>商品</router-link>
            <router-link class="tab-item" router-link to="/ratings" exact>评论</router-link>
            <router-link class="tab-item" router-link to="/seller" exact>商家</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "v_header",
    props:{
        seller:{
            type:Object
        }
    },
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
};
</script>

<style scoped lang="less">
@import "../common/css/index.less";
// 头部
.header{
    color:#fff;
    background: gray;
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
                    .bg-image("../../header/img/brand");
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
                        .bg-image('../../header/img/decrease_1');
                    }
                    &.discount{
                        .bg-image('../../header/img/discount_1');
                    }
                    &.guarantee{
                        .bg-image('../../header/img/guarantee_1');
                    }
                    &.invoice{
                        .bg-image('../../header/img/invoice_1');
                    }
                    &.special{
                        .bg-image('../../header/img/special_1');
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
