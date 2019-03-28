import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Info from '../components/info'
import Assistant from '../components/main_page/assistant'

Vue.use(Router)

// Router.beforeEach((to, from, next) => {
  // if (to.path === '/login') {
  //   next();
  // } else {
  //   let token = localStorage.getItem('Authorization');
  //   if (token === 'null' || token === '') {
  //     next('/login');
  //   } else {
  //     next();
  //   }
  // }
// });

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        needLogin: true
      }
    },
    {
      path: '/info',
      name: 'Info',
      component: Info
    },
    {
      path: '/assistant',
      name: 'assistant',
      component: Assistant
    }
  ]
})
