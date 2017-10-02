
<template>
  <el-row class="content">
    <el-col :xs="24" :sm="{span: 6,offset: 9}">
      <span class="title">
          <el-alert
            v-if="result != undefined"
            :title="result.title"
            :type="result.type"
            :description="result.descriptions"
            :closable="false"
            show-icon>
          </el-alert>
      </span>

      <el-row>
        <el-input class="input"
            v-model="username"
            placeholder="Username."
            type="text">
            <template slot="prepend">Username:</template>
        </el-input>

        <el-input class="input"
            v-model="password"
            placeholder="Password."
            type="password">
            <template slot="prepend">Password:</template>
        </el-input>

        <div class="button">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="primary" @click="back">返回</el-button>
        </div>

      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import store from '@/store'
import { mapActions } from 'vuex'

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
            result: null
        }
    },
    methods: {
        login: function login(){
            console.log(this.$store)
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
                console.log(response)
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
            this.$store.dispatch('login', response.data).then((res) => {
                if ((typeof this.session !== null)){
                    this.$message({
                        message: '登录成功,欢迎您：'+response.data.username,
                        type: 'success'
                    });
                    let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                    this.$router.push({
                        path: redirect
                    })
                } else {
                    this.$message({
                        message: '登录失败,请重试',
                        type: 'error'
                    });
                    console.log(this.$store)
                }
            });
            this.func.setCookie('user_session', response.data.sessionToken)



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
        },
        back: function back(res){
            this.$router.push({ path: '/' })
        },
        // ...mapActions({
        //     login: 'login'
        // })
    },
    store
}
</script>

<style>
.input{
    margin-top: 15px;
}

.button {
    margin-top: 15px;
}
</style>
