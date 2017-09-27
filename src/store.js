import config from './config.js'
import axios from 'axios'

const state = {
    count: 1,
    session: null,
    login: false, // 是否登录
    user: [],
    app: {
        app_id: config.app_id,
        app_key: config.app_key,
        app_sign: config.app_sign
    }
}

const mutations={
    add(state, n){
        state.count+=n;
    },
    reduce(state, n){
        state.count-=n;
    },
    login(state){
        state.login = true
    },

    logout(state){
        // 用户退出
        // 1. login 设置为 false
        // 2. 删除 user数据
        // 3. 删除 sessionToken 数据
        state.login = false
    },
    // 更新用户的 session
    update_session(state, session){
        state.session = session
        // axios.get('http://127.0.0.1:8888/users/me',{
        //     headers: {'X-LC-Session': session}
        // }).then((response) => {
        //     if (response.status == 200){
        //         state.user = response.data
        //     }
        // })
    },
    // 更新用户信息
    update_user(state, user) {
        state.user = user
    }
    // update_user(state, session){
    //
    // }
}
import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state,
    mutations
})
