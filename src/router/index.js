import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      alias:'/',
      redirect:'/home/goods',
      name: 'Home',
      meta: { 
        keepAlive:true
       },
      component: () => import('@/pages/home/index'),
      children:[
        {
          path:'/home/goods',
          component: () => import('@/pages/home/goods')
        },
        {
          path:'/home/order',
          component: () => import('@/pages/home/order')
        },
        {
          path:'/home/bind',
          component: () => import('@/pages/home/bind')
        }
      ]
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('@/pages/cart/index')
    },
    {
      path: '/rule',
      name: 'Rule',
      component: () => import('@/pages/rule/index')
    }
  ]
})
