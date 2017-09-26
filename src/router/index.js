import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Index from '@/components/Index'
import Tags from '@/components/Tags'
import Links from '@/components/Links'
import Count from '@/components/Count'

import Login from '@/components/user/Login'
import Logout from '@/components/user/Logout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
        path: '/index',
        name: 'Index',
        component: Index
    },
    {
        path: '/tags',
        name: 'Tags',
        component: Tags
    },
    { path: '/links', name: 'Links', component: Links, meta: { requireAuth: true} },
    {
        path: '/count',
        name: 'Count',
        component: Count
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login
    },
    {
        path: '/Logout',
        name: 'Logout',
        component: Logout
    }
  ]
})
