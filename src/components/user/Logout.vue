<template lang="html">
    <div class="logout">
        <el-button @click="logout">确认退出</el-button>
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
    methods: {
        logout: function logout() {
            this.$confirm('确认退出当前用户？','提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.func.delCookie('dove_password')
                this.$store.commit('update_session', undefined)
                this.$store.commit('update_user', undefined)
                this.$store.commit('logout')
                this.$message({
                    type: 'success',
                    message: '退出成功'
                });
                this.$router.push({
                    path: '/'
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '操作取消'
                });
            });
        }
    },
    // mounted: function(){
    //     // 退出函数，
    //     // 删除 cookie
    //     // 删除 this.$store.state.session
    //     // 删除 this.$store.state.user
    //     // 赋值 msg = '退出成功'
    //     this.func.delCookie('dove_password')
    //     this.$store.commit('update_session', null)
    //     this.$store.commit('update_user', null)
    //     this.$store.commit('logout')
    //     this.msg = "退出成功！<br />"
    //     this.status = true
    // },
    store
}
</script>

<style lang="css">
</style>
