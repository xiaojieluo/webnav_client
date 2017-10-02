import config from './config.js'
import axios from 'axios'
import actions from './vuex/actions'

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
    session(state, session){
        state.session = session
    },
    user(state, user){
        state.user = user
    },
    reduce(state, n){
        state.count-=n;
    },
    login(state, user=null){
        // update_session(state, user.sessionToken)
        // state.commit('update_session', user.sessionToken)
        // state.commit('update_user', user)
        // update_user(state, user)
        state.login = true
        // console.log("Login")
        // window.localStorage.setItem('login', true)
    },

    ['UPDATE_SESSION2'](session) {
        console.log("Update session2")
        state.count = 666
    },

    logout(state){
        // 用户退出
        // 1. login 设置为 false
        // 2. 删除 user数据
        // 3. 删除 sessionToken 数据
        window.localStorage.removeItem("session")
        window.localStorage.removeItem("user")
        // window.localStorage.removeItem('login')
        state.login = false
    },
    // 更新用户的 session
    update_session(state, session){
        state.session = session
        window.localStorage.setItem("session", session)
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
        window.localStorage.setItem("user", JSON.stringify(user))
    }
}
import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state,
    mutations,
    actions
})
