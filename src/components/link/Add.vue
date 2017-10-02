<template>
    <el-row class="content" >
      <el-col :xs="24" :sm="{span: 6,offset: 9}">

          <el-form :model="link" :rules="rule" ref="link" label-width="100px" class="demo-ruleForm">
            <el-form-item label="Url" prop="url">
              <el-input type="text" v-model="link.url" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="Title" prop="title" >
              <el-input type="text" v-model="link.title" :disabled="loading" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="Tags" >
              <el-input type="text" v-model="link.tags" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('link')">提交</el-button>
              <el-button @click="resetForm('link')">重置</el-button>
            </el-form-item>
          </el-form>

</el-col>
</el-row>
</template>

<script>
import store from '@/store'

    export default {
        name: 'Add',
        data () {
            var validate_url = (rule, value, callback) => {
                console.log(this.isUrl(value))
                if (value === ''){
                    callback(new Error("url 不能为空"))
                } else if (this.isUrl(value) == false){
                    callback(new Error("URL 格式不正确"))
                } else {
                    console.log("Pass")
                    if (this.link.title == null){
                        // 只有在 title 为空时才自动获取标题
                        this.loading = false
                        this.get_url()
                    }

                    callback()
                }
            };

            var validate_title = (rule, value, callback) => {
                callback()
            };

            return {
                session: this.$store.state.session,
                loading: true,
                link: {
                    url: '',
                    title: null,
                    tags: null
                },
                rule: {
                    url: [
                        { validator: validate_url, trigger: 'blur'}
                    ],
                    title: [
                        { validator: validate_title, trigger: 'blur'}
                    ]
                },
            }
        },
        methods: {
            get_url: function(){
                var url = '/helper/url/'+ encodeURIComponent(this.link.url)
                this.$ajax.get(url).then((res) => {
                    this.link.title = res.data.title
                }).catch((res) => {
                    console.log(res)
                });
                alert("get")
            },
            isUrl: function(str) {
               return !!str.match(/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g);
           },
           
           submitForm(formName) {
             this.$refs[formName].validate((valid) => {
               if (valid) {
                   this.$ajax.post('/links', this.link, {
                       headers: {
                           'X-LC-Session': this.session
                       }
                   }).then((res) => {
                       if (res.status == 201){
                           console.log("创建成功.")
                           this.$message({
                               message: '创建成功',
                               type: 'success'
                           });
                           this.$router.push({ path: '/links' })
                       }
                       console.log(res)
                   }).catch((res) => {
                       console.log(res)
                   });

                 alert('submit!');
               } else {
                 console.log('error submit!!');
                 return false;
               }
             });
           },
           resetForm(formName) {
             this.$refs[formName].resetFields();
           }

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
</style>
