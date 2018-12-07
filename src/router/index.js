import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: {name: 'Goods'},
      component: () => import('@/pages/home/index'),
      children: [
        {
          path: 'goods',
          name: 'Goods',
          meta: {
            keepAlive: true // 标记这个路由，加上缓存
          },
          component: () => import('@/pages/goods/index')
        },
        {
          path: 'goods/search',
          component: () => import('@/pages/goods/goods-search')
        },
        {
          path: 'goods/cart',
          name: 'Cart',
          component: () => import('@/pages/goods/cart')
        },
        {
          path: 'rule',
          name: 'Rule',
          meta: {
            keepAlive: true // 标记这个路由，加上缓存
          },
          component: () => import('@/pages/rule/index')
        },
        {
          path: 'order',
          name: 'Order',
          component: () => import('@/pages/order/index')
        },
        {
          path: 'order/history',
          component: () => import('@/pages/order/History')
        },
        {
          path: 'order/history/detail',
          component: () => import('@/pages/order/HistoryDetail')
        },
        {
          path: 'center',
          name: 'Center',
          component: () => import('@/pages/center/index')
        },
        {
          path: 'center/share',
          component: () => import('@/pages/center/share')
        },
        {
          path: 'center/bindalipay',
          component: () => import('@/pages/center/bind-alipay')
        },
        {
          path: 'center/withdraw',
          component: () => import('@/pages/center/withdraw')
        },
        {
          path: 'center/withdraw-record',
          component: () => import('@/pages/center/withdraw-record')
        },
        {
          path: 'center/order-detail',
          component: () => import('@/pages/center/order-detail')
        },
        {
          path: 'refund',
          name: 'Refund',
          component: () => import('@/pages/refund/index')
        },
        {
          path: 'invite',
          name: 'Invite',
          component: () => import('@/pages/invite/index')
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/login/index')
    }
  ]
})
