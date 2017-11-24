import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import Index from '@/page/index'
import List from '@/page/list'
import Detail from '@/page/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/list',
      name: 'List',
      component: List
    }, {
      path: '/Detail',
      name: '/Detail/:id',
      component: Detail
    }
  ]
})
