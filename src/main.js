// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import moment from "moment";
import VueMomentJS from "vue-momentjs";

// 中文
moment.locale('zh-cn')

Vue.use(VueMomentJS, moment);
// Vue.use()
Vue.use(ElementUI)
Vue.use(Vuex, VueAxios, axios)

import config from "./config"
import func from "./func.js"

// 全局配置
Vue.prototype.config  = config
// 全局函数
Vue.prototype.func = func
Vue.config.productionTip = false
Vue.config.devtools = true

axios.defaults.baseURL = 'http://127.0.0.1:8888'
Vue.prototype.$ajax = axios

import store from '@/store'

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        // console.log(store.state.session)
        // console.log("window.localStorage.session = ")
        // console.log(window.localStorage.getItem('session'))
        // var session = store.state.session
        var session = window.localStorage.getItem('session')

        if ( session != null || session != undefined) {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
})

// http request 拦截器
axios.interceptors.request.use(
    config => {
        // if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        //     config.headers.Authorization = `token ${store.state.token}`;
        // }
        // app_id
        if (store.state.app.app_id) {
            config.headers.common['X-LC-Id'] = store.state.app.app_id
        }
        // app_key
        if (store.state.app.app_key) {
            config.headers.common['X-LC-Key'] = store.state.app.app_key
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    store.commit(types.LOGOUT);
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    });


/* eslint-disable no-new */
var vm = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
    data (){
        Bus: new Vue()
    },
    mounted: function(){
        var session = window.localStorage.getItem('session')
        var user = window.localStorage.getItem('user')

        console.log("localStorage")
        console.log(session)

        // if (session != null || session != undefined){
        //     this.$store.dispatch('user_login')
        //     // this.$store.commit('session', user.sessionToken)
        //     // this.$store.commit('user', user)
        // }
        // 从 cookie取出 session，查询服务器获取用户的信息存入 vuex store中
        // var user_session = this.func.getCookie('user_session')
        // if (this.func.getCookie('user_session')){
        //     this.$ajax.get('http://127.0.0.1:8888/users/me',{
        //         headers: {'X-LC-Session': user_session}
        //     }).then((response) => {
        //         if (response.status == 200){
        //             store.state.session = user_session
        //             store.state.user = response.data
        //         }
        //     })
        // }
    },
    store
})
