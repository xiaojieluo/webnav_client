<template>
<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true" :unique-opened="true">
    <el-menu-item>
        <router-link :to="{ name: 'Index', params: {} }">首页</router-link>
    </el-menu-item>
  <el-menu-item>
    <router-link :to="{ name: '', params: {} }">发现</router-link>
  </el-menu-item>
  <el-menu-item>
    <router-link :to="{ name: '', params: {} }">话题</router-link>
  </el-menu-item>

  <el-menu-item v-if="session == null || session == 'null'">
    <router-link :to="{ name: 'Login', params: {} }">登录</router-link>

  </el-menu-item>
  <el-menu-item v-if="session == null || session == 'null'">
    <router-link :to="{ name: 'Register', params: {} }">注册</router-link>
  </el-menu-item>
  <el-menu-item v-else>
    <el-submenu>
      <template slot="title">{{ user.username }}</template>
      <el-menu-item :index="{ name:'Me' }">我的主页</el-menu-item>
      <el-menu-item :index="{ name:'Logout' }">退出</el-menu-item>
    </el-submenu>
  </el-menu-item>

</el-menu>
</template>

<script>
import store from '@/store'

export default {
    name: 'Header',
    // props: ['user'],
    data (){
        return {
            // session: this.$store.state.session,
            // session: window.localStorage.getItem('session'),
            // user: this.$store.state.user
        }
    },
    mounted: function(){
        console.log("Header")
        console.log(this.user)
    },
    computed: {
        data () {
            return this.$store.state.session
        },
        user() {
            return this.$store.state.user
        },
        session() {
            return this.$store.state.session
        }
    },
    store
}
</script>

<style lang="css">
.el-menu {
    margin-left: 20%;
    margin-right: 20%;
    padding-left: 10%;
}
/*.user {
    margin-left: 100px;
    padding-left: 100px;
}*/
</style>
