<template>

<el-container id="app">
    <el-header class="header"><headerBar></headerBar></el-header>

    <el-main>
        <router-view :key="key"></router-view>
    </el-main>

    <el-footer></el-footer>

</el-container>

</template>

<script>
import store from '@/store'
import headerBar from '@/components/header'

export default {
  name: 'app',
  data () {
      return {
          user: this.$store.state.user,
          bind: {
              user: this.$store.state.user
          },
          session: this.$store.state.session
      }
  },
  components: {
      headerBar
  },
  computed: {
        key() {
            return this.$route.name !== undefined? this.$route.name +new Date(): this.$route +new Date()
        }
    },
    created: function() {
        console.log("Session")
        this.$store.commit('update_session', window.localStorage.getItem("session"))
        this.$store.commit('update_user', JSON.parse(window.localStorage.getItem("user")))
    },
    store
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
