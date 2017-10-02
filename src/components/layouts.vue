<template>
  <div id="app">
    <router-link :to="{ name: 'Index', params: {} }"><img src="./assets/logo.png"></router-link>
    <router-view :key="key"></router-view>
  </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'layouts',
  data () {
      return {
          user: this.$store.state.user,
          session: this.$store.state.session
      }
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
</style>
