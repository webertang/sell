
<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li class="menu-item border-1px" v-for="(item,index) in goods" 
                :class="{'current':currentIndex===index}" @click="selectMenu(index)">
                    <span class="text">
                        <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
                        {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <!-- 商品列表 -->
                <li v-for="item in goods" class="food-list food-list-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="food in item.foods" class="food-item border-1px">
                            <div class="icon">
                                <img width="57" height="57" :src="food.icon" alt="">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span class="old" v-show="food.oldPrice">${{food.oldPrice}}</span>
                                </div>
                            </div>
                            <!-- 商品+-控件 -->
                            <div class="cartcontrol-wrapper">
                                <CartControl @cart-add="drop" :food="food"></CartControl>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <!-- 购物车 -->
        <ShopCart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></ShopCart>
    </div>
</template>

<script>
import BtScroll from 'better-scroll'
import {getSellerData} from '@/api/data'
import ShopCart from '@/components/shop-cart'
import CartControl from '@/components/cart-control'

export default {
    name: 'goods',
    props:{
        seller:{
            type:Object
        }
    },
    components:{
        ShopCart,
        CartControl
    },
    data(){
        return{
            goods:[],
            listHeight:[],
            scrollY:0
        }
    },
    computed:{
        currentIndex(){
            for(let i=0; i< this.listHeight.length;i++){
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i+1];
                if(!height2 || this.scrollY >= height1 && this.scrollY < height2){
                    return i;
                }
            }
            return 0;
        },
        selectFoods(){
            let foods = [];
            this.goods.forEach((good)=>{
                good.foods.forEach((food)=>{
                    if(food.count){
                        foods.push(food);
                    }
                });
            });
            return foods;
        }
    },
    created(){
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        getSellerData().then(res=>{
            this.goods = res.data.goods;
            this.$nextTick(()=>{
                this._initScroll();
                this._calculateHeight();
            });
        })
    },
    methods:{
        selectMenu(index, event){
            let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
            let el = foodList[index];
            this.foodsScroll.scrollToElement(el,300);
        },
        drop(target){
            //体验优化，异步执行下落动画
            this.$nextTick(()=>{
                //父对象传给子组件
                this.$refs.shopcart.drop(target);
            });
        },
        _initScroll(){
            this.menuScroll = new BtScroll(this.$refs.menuWrapper, {
                click:true
            });
            this.foodsScroll = new BtScroll(this.$refs.foodsWrapper, {
                probeType:3,
                click:true
            });
            this.foodsScroll.on('scroll',(pos)=>{
                this.scrollY = Math.abs(Math.round(pos.y));
            });
        },
        _calculateHeight(){
            let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
            let height = 0;
            this.listHeight.push(height);
            for(let  i = 0; i < foodList.length; i++){
                let item = foodList[i];
                height += item.clientHeight;
                this.listHeight.push(height);
            }
        }
    },
    events:{
        'cart.add'(target){
            console.log("goods，接收到事件");
            this._drop(target);
        }
    }
}
</script>

<style scoped lang="less">
@import "~common/css/mixin.less";
.goods{
    display: flex;
    position: absolute;
    top:174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    .menu-wrapper{
        flex:0 0 80px;
        width: 80px;
        background: #f3f5f7;
        .menu-item{
            display: table;
            height: 54px;
            padding: 0 12px;
            line-height: 14px;
            .icon{
                display: inline-block;
                vertical-align: top;
                height: 12px;
                width: 12px;
                background-size: 12px 12px;
                background-repeat: no-repeat;
                &.decrease{
                    .bg-image('../../components/goods/img/decrease_3');
                }
                &.discount{
                    .bg-image('../../components/goods/img/discount_3');
                }
                &.guarantee{
                    .bg-image('../../components/goods/img/guarantee_3');
                }
                &.invoice{
                    .bg-image('../../components/goods/img/invoice_3');
                }
                &.special{
                    .bg-image('../../components/goods/img/special_3');
                }
            }
            .text{
                display: table-cell;
                width: 56px;
                vertical-align: middle;
                .border-1px(rgba(7,17,27,0.1));
                font-size: 12px;
            }
            &.current{
                position: relative;
                z-index: 10;
                margin-top: -1px;
                background: #fff;
                font-weight: 700;
                .text{
                    .border-none();
                }
            }
        }
    }
    .foods-wrapper{
        flex:1;
        .title{
            padding-left: 14px;
            height: 26px;
            line-height: 26px;
            border-left: 2px solid #d9dde1;
            font-size: 12px;
            color:rgb(147, 153, 159);
            background: #f3f5f7;
        }
        .food-item{
            display: flex;
            margin: 18px;
            padding-bottom: 18px;
            .border-1px(rgba(7,17,27,0.1));
            &:last-child{
                .border-none();
                margin-bottom: 0px;
            }
            .icon{
                flex:0 0 57px;
                margin-right: 5px;
            }
            .content{
                flex: 1;
                text-align: left;
                .name{
                    margin: 2px 0 8px 0;
                    height: 14px;
                    line-height: 14px;
                    font-size: 14px;
                    color:rgb(7, 17, 27);
                }
            }
            .desc, extra{
                margin-bottom: 8px;
                line-height: 12px;
                font-size: 10px;
                color:rgb(147, 153, 159);
            }
            .desc{
                margin-bottom: 8px;
            }
            .extra{
                &.count{
                    margin-right: 12px;
                }
            }
            .price{
                font-weight: 700;
                line-height: 24px;
                .now{
                    margin-right: 8px;
                    font-size: 14px;
                    color:rgb(240, 20, 20);
                }
                .old{
                    text-decoration: line-through;
                    font-size: 10px;                    
                    color:rgb(147, 153, 159);
                }
            }
            .cartcontrol-wrapper{
                position: absolute;
                right: 0; 
                bottom: 12px;
            }
        }
    }
}
</style>
