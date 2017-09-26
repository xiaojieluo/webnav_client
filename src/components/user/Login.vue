<template lang="html">
    <div class="login">
        <!--Username: <input v-model="username" placeholder="Username." /> <br>
        Password: <input v-model="password" placeholder="Password." />
        <button @click="login()">Login</button>
        Status:
        <div v-if="status == true">
            <span>登录成功</span>
            <router-link :to="{ name: 'Index', params: {} }">返回首页</router-link>
        </div>
        count:{{ $store.state.count }}
        Session:{{ session }} -->

        <!--SIGN UP-->
        <h1>klasikal Login Form</h1>
        <div class="login-form">
        	<div class="close"> </div>
        		<div class="head-info">
        			<label class="lbl-1"> </label>
        			<label class="lbl-2"> </label>
        			<label class="lbl-3"> </label>
        		</div>
        			<div class="clear"> </div>
        	<div class="avtar">
        		<img src="images/avtar.png" />
        	</div>
        			<form>
                        <input v-model="username" type="text" class="text" value="Username" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Username';}">
        						<div class="key">
        					<input v-model="password" type="password" value="Password" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Password';}">
        						</div>
        			</form>
        	<div class="signin">
        		<input type="submit" value="Login" @click="login()">
        	</div>
            <div v-if="status == true">
                <span>登录成功</span>
                <router-link :to="{ name: 'Index', params: {} }">返回首页</router-link>
            </div>
        </div>
    </div>




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
            session: this.$store.state.session
        }
    },
    methods: {
        login: function login(){
            alert(this.config.api_user_login)
            console.log(this.config)
            this.$ajax.post(this.config.api_user_login,{
                username: this.username,
                password: this.password
            }).then((response) => {
                // login success
                if (response.status == 200){
                    this.success(response)
                } else {
                    // login failed
                    this.failed(response)
                }

            }).catch(function(res) {
                if(res instanceof Error) {
                    console.log(res);
                } else {
                    console.log(res);
                }
            });
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
            this.$store.commit('update_session', response.data.sessionToken)
            // this.$store.commit('update_user', response.data)
            this.func.setCookie('user_session', response.data.sessionToken)
        },
        failed: function failed(response) {
            console.log("login failed.")
            console.log(response)
        }
    },
    store
}
</script>

<style lang="css" scoped>
</style>
