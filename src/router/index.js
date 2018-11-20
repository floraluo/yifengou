import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: {
        keepAlive: true // 标记这个路由，加上缓存
      },
      component: () => import('@/pages/home/index')
    },
    {
      path: '/rule',
      name: 'Rule',
      component: () => import('@/pages/rule/index')
    },
    {
      path: '/order',
      name: 'Order',
      component: () => import('@/pages/order/index')
    },
    {
      path: '/order/history',
      component: () => import('@/pages/order/History')
    },
    {
      path: '/order/history/detail',
      component: () => import('@/pages/order/HistoryDetail')
    },
    {
      path: '/refund',
      name: 'Refund',
      component: () => import('@/pages/refund/index')
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('@/pages/cart/index')
    },
    {
      path: '/invite',
      name: 'Invite',
      component: () => import('@/pages/invite/index')
    }
  ]
})
