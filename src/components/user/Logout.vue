<template lang="html">
    <div class="logout">
        {{ msg }}
        <div v-if="status == true">
            退出成功！<br />
            <router-link :to="{ name: 'Index', params: {} }">返回首页</router-link>
        </div>
    </div>
</template>

<script>
import store from '@/store'

export default {
    data () {
        return {
            msg: '',
            status: null
        }
    },
    mounted: function(){
        // 退出函数，
        // 删除 cookie
        // 删除 this.$store.state.session
        // 删除 this.$store.state.user
        // 赋值 msg = '退出成功'
        this.func.delCookie('dove_password')
        this.$store.commit('update_session', null)
        this.$store.commit('update_user', null)
        this.$store.commit('logout')
        this.msg = "退出成功！<br />"
        this.status = true
    },
    store
}
</script>

<style lang="css">
</style>
