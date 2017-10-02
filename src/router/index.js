import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Index from '@/components/Index'
import Tags from '@/components/Tags'
// import Links from '@/components/Links'
import Count from '@/components/Count'

import Login from '@/components/user/Login'
import Register from '@/components/user/Register'
import Logout from '@/components/user/Logout'

import Links from '@/components/user/Links'

import Me from '@/components/user/Me'

import LinkAdd from '@/components/link/Add'
import LinkIndex from '@/components/link/Index'

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
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/Logout',
        name: 'Logout',
        component: Logout
    },
    //  我的主页
    {
        path: '/me',
        name: 'Me',
        component: Me,
        meta:{
            requireAuth: true
        }
    },
    {
        path: '/link',
        name: 'LinkIndex',
        component: LinkIndex,
        children: [
            { path: 'add', name:'LinkAdd', component: LinkAdd }
        ]
    }
    // {
    //     path: '/users/:username/links',
    //     name: 'Links',
    //     component: Links,
    //     meta: { requireAuth: true}
    // },
  ]
})
