<template lang="html">
    <div class="index">
        <p><router-link :to="{ name: 'Index', params: {} }">首页</router-link> |
        <router-link :to="{ name: 'Tags', params: {} }">标签</router-link>
        <router-link :to="{ name: 'Links', params: {} }">Links</router-link>

        </p>
        Hello， 欢迎使用 vlink 个人网址导航！
        {{ count }}

        <div class="user-info">
            Session:{{ session }}
            <template v-if="session == null">
                <router-link :to="{ name: 'Login', params: {} }">Login</router-link>
                <router-link :to="{ name: 'Register', params: {} }">Register</router-link>
            </template>
            <template v-else>
                欢迎您： {{ user.username }}|
                <router-link :to="{ name: 'Logout', params: {} }">退出</router-link>
            </template>

        </div>



    </div>

</template>

<script>

import store from '@/store'
var vm = this
export default {
    name: 'index',
    data () {
        return {
            data: APP_ID,
            count: this.$store.state.count,
            session: this.$store.state.session,
            user: this.$store.state.user
        }
    },
    created: function(){
        vm.session = this.$store.state.session
    },
    store

}
</script>

<style lang="css">
</style>
