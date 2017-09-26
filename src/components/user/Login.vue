
<template>
  <el-row class="content">
    <el-col :xs="24" :sm="{span: 6,offset: 9}">
      <span class="title">
          <el-alert
            v-if="trys > 0"
            :title="result.title"
            :type="result.type"
            :description="result.descriptions"
            :closable="false"
            show-icon>
          </el-alert>      </span>
      <el-row>
        <el-input v-model="username" placeholder="Username." type="text"></el-input>
        <el-input v-model="password" placeholder="Password." type="password"></el-input>
        <el-button type="primary" @click="login">登录</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import store from '@/store'

export default {
    name: 'Login',
    data() {
        return {
            username: 'xiaojie',
            password: '1234',
            status: false,
            session: this.$store.state.session,
            trys: 0,
            result_error: 'error',
            result: {
                'type': '', // 提示类型
                'title': '', // 提示标题
                'descriptions': '', // 文字说明
            }
        }
    },
    methods: {
        login: function login(){
            this.trys += 1
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
                // this.failed(response)
            });
        },
        updateMessage: function updateMessage(type, title, desc) {
            console.log('update message.')
            // 更新提示框
            this.result = {
                'type': type,
                'title': title,
                'descriptions': desc
            }
        },
        // login success
        success: function success(response){
            console.log('login success.')
            console.log(response)
            // status = ok
            // this.$store.session = sessionToken
            // this.$store.user = response.data
            // set cookie ('user_session', sessionToken)
            this.status = true
            // this.$store.login = true // 已登录
            this.$store.commit('change_login', true)
            this.$store.commit('update_session', response.data.sessionToken)
            this.$store.commit('update_user', response.data)
            this.func.setCookie('user_session', response.data.sessionToken)

            this.updateMessage('success', '登录成功', '欢迎您，'+response.data.username)
            let redirect = decodeURIComponent(this.$route.query.redirect || '/');
            this.$router.push({
                path: redirect
            })
            // this.$router.push({ path: '/' })

            // 显示消息框
            // this.result = {
            //     'type': 'success',
            //     'title': '登录成功',
            //     'descriptions': '文字说明'
            // }
            // this.result.type = 'success'
            // this.result.title = '登录成功'
            // this.result.descriptions = '文字说明'


        },
        failed: function failed(response) {
            console.log("login failed.")
            console.log(response)
            console.log("Hello failed")
            // this.result = {
            //     'type': 'error',
            //     'title': '登录成功',
            //     'descriptions': '文字说明'
            // }
            this.updateMessage('error', '登录失败,错误码: '+response.data.code, response.data.error)
            // this.result = {
            //     'type': 'info',
            //     'title': '登录成功',
            //     'descriptions': '文字说明'
            // }
        }
    },
    store
}
</script>

<style>

</style>
