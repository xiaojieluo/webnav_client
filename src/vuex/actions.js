import axios from 'axios'

const actions = {
    increment (store) {
        console.log("Actions")
        console.log(store)
        console.log(this.store)
        store.commit('add', 999)
        console.log(store.dispatch('ex', 1000))
        // context.ex()
    },
    ex(context, num){
        console.log("ex")
        context.commit('add', 999)
    },
    login(store, user){
        /**
         * 用户登录
         * @store 实例 {[type]}
         * @user  服务器返回的 user 对象(包含 sessionToken)
         *
         * 1. 设置 store.session 为 user.sessionToken
         * 2. 设置 store.user 为 user
         * 3. 保存 session 到 localStorage
         * 4. 保存序列化之后的 user 对象到 localStorage
         */
        console.log("vuex actions: login")
        store.commit('session', user.sessionToken)
        store.commit('user', user)
        window.localStorage.setItem('session', user.sessionToken)
        window.localStorage.setItem('user', JSON.stringify(user))
    },

    user_login(store){
        /**
         * 用户登录
         * @type {[type]}
         */
        console.log(axios.get('/userssssss'))
        this.$ajax.post(this.config.api_user_login,{
            username: this.username,
            password: this.password
        }).then((response) => {
            console.log(response)
            // login success
            if (response.data.code == undefined){
                this.success(response)
            } else {
                // login failed
                this.failed(response)
            }
        }).catch(function(response) {
            console.log("Catch error.")
            console.log(this)
            console.log(response)
            // this.failed(response)
        });
    },

    logout(store){
        /**
         * 退出当前用户
         * 1. 删除 store 中的 session 值
         * 2. 删除 store 中的 user 值
         * 3. 删除保存在 localStorage 中的 session 和 user
         */
        console.log("Vuex actions: Logout")
        store.commit('session', null)
        store.commit('user', null)
        window.localStorage.removeItem('session')
        window.localStorage.removeItem('user')
    },

    get_links(store, params) {
        /**
         * 获取链接
         * params: 过滤条件
         */
    }
}

export default actions
