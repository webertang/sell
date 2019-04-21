<template>
    <div class="tab">
        <router-link class="tab-item" router-link to="/goods" exact>商品</router-link>
        <router-link class="tab-item" router-link to="/ratings" exact>评论</router-link>
        <router-link class="tab-item" router-link to="/seller" exact>商家</router-link>
    </div>
</template>

<script>
export default {
    name: "sellHeader"
};
</script>

<style scoped lang="less">
@import "../common/css/index.less";


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
