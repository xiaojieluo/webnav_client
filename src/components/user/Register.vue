<template lang="html">
    <el-row class="content">
      <el-col :xs="24" :sm="{span: 7,offset: 8}">
          <span class="title">
              <el-alert
                v-if="result.type != undefined"
                :title="result.title"
                :type="result.type"
                :description="result.descriptions"
                :closable="false"
                show-icon>
              </el-alert>
          </span>
          <el-form :model="user" :rules="rule" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username" :required="true">
              <el-input type="text" v-model="user.username" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" :required="true">
              <el-input type="password" v-model="user.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="再次输入密码" prop="check_password" :required="true">
              <el-input type="password" v-model="user.check_password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
              <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
          </el-form>
</el-col>
</el-row>
</template>

<script>
export default {
    data() {
      var validate_username = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入登录用户名'));
        }
        setTimeout(() => {
            console.log('向服务器后端验证用户名：'+ value)
            return this.$ajax.get('/users', {
                params: {
                    where: {"username": value},
                    limit: 1,
                    keys: 'username'
                }
            }).then(function(res){
                length = res.data.results.length
                if (length === 0) {
                    console.log("验证通过，用户名 "+value+" 可用")
                    callback()
                } else {
                    console.log("验证未通过：用户名 "+value+" 已存在")
                    callback(new Error("用户名已存在"))
                }
            }).catch(function(res){
                console.log("请求失败")
                console.log(res)
            });
        }, 1000);
      };

      var validate_password = (rule, value, callback) => {
          if (!value) {
              return callback(new Error('请输入密码'));
          } else {
              callback()
          }
      };

      var validate_check_password = (rule, value, callback) => {
          if (!value) {
              return callback(new Error('请再次输入密码'))
          } else if (value !== this.user.password){
              return callback(new Error('两次密码不一致'))
          } else {
              callback()
          }
      };

      return {
        result: {
            type: '',
            title: '',
            descriptions: ''
        },
        user: {
            username: '',
            password: '',
            check_password: '',
        },
        rule: {
            username: [
                { validator: validate_username, trigger: 'blur'}
            ],
            password: [
                { validator: validate_password, trigger: 'blur'}
            ],
            check_password: [
                { validator: validate_check_password, trigger: 'blur'}
            ]
        },
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              console.log("表单验证全部通过，开始向后台服务器发送数据")
              console.log(this.user)
              console.log(this)
              this.$ajax.post('/users', this.user)
                .then((res) => {
                    console.log("接收服务器返回数据")
                    console.log(res)
                    if (res.data.code == undefined){
                        //
                        this.success(res)
                        // console.log(this)
                    } else {
                        this.failed(res)
                    }
                }).catch(function(res) {
                    console.log("注册失败："+ res)
                })
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
    success: function success(res){
        // 注册成功执行函数
        this.$notify({
            title: '注册成功！',
            message: '您现在可以使用 用户名+密码 登录系统',
            type: 'success'
        });
        this.$router.push({
            path: 'Login'
        })
    },
    failed: function failed(res) {
        // 注册失败
        // 显示错误框
        this.updateMessage('error', '注册失败,错误码: '+res.data.code, res.data.error)
    },
    }
  }
</script>

<style>
.input{
    margin-top: 15px;
}

.button {
    margin-top: 15px;
}

el-input {
    margin-top: 15px;
}
</style>
