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
    background: #000;
    .content-wapper{
        display: flex;
        padding:24px 12px 18px 24px;
        .avatar{
            display: inline-block;
        }
        .content{
            display: inline-block;
            text-align: left;
            font-size: 14px;
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
