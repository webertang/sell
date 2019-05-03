// 商品加减
<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-decrease" v-show="food.count>0" @click.stop="decreaseCart">
                <span class="inner icon-remove_circle_outline"></span>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop="addCart($event)"></div>
    </div>
</template>

<script>
import Vue from 'vue';

export default {
    props:{
        food:{
            type:Object
        }
    },
    methods:{
        addCart(event){
            if(!this.food.count){
                Vue.set(this.food, 'count', 1);
            }else{
                this.food.count++;
            }
            this.$emit('cart-add', event.target);
        },
        decreaseCart(){
            if(this.food.count){
                this.food.count--;
            }
        }
    }
}
</script>

<style scoped lang="less">

    .cartcontrol{
        font-size: 0;
        .cart-decrease{
            display: inline-block;
            padding:6px;
            display: inline-block;
            line-height: 24px;
            font-size: 24px;
            color: rgb(0, 160, 220);
            /*动画*/
            &.move-enter-active, &.move-leave-active{
                transition: all .4s linear;
            }
            &.move-enter, &.move-leave-to{
                transform: translate3d(24px, 0, 0) rotate(180deg);
                opacity: 0;
            }
        }
        .cart-count{
            display: inline-block;
            vertical-align: top;
            width: 12px;
            padding-top: 6px;
            line-height: 24px;
            text-align: center;
            font-size: 10px;
            color: rgb(147, 153, 159);
        }
        .cart-add{
            display: inline-block;
            padding:6px;
            line-height: 24px;
            font-size: 24px;
            color: rgb(0, 160, 220);
        }
    }
</style>
