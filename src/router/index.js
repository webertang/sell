import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/goods',
      name: '商品',
      component: () => import('@/components/goods')
    },
    {
      path: '/ratings',
      name: '评论',
      component: () => import('@/components/ratings')
    },
    {
      path: '/seller',
      name: '商家',
      component: () => import('@/components/seller')
    }
  ]
})
