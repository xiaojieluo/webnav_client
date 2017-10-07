<template lang="html">
<div class="list">

    <div class="card" v-loading.fullscreen.lock="fullscreenLoading">
        {{params}}
        <el-card v-for="link in links" class="box-card" style="margin-top:15px">

            <h3><a :href="link.url">{{ link.title }}</a></h3>
            <small>{{ link.desc }}</small><br />
            <small>tags:
                <span v-for="tag in link.tags">
                    <a href="#">
                        <el-tag type="primary">
                            #{{tag}}
                        </el-tag>
                    </a>
                </span>
            </small>

        </el-card>

    </div>

    <div class="block" style="margin-top: 15px">
        <el-pagination
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :total="pagination.pages * 10">
        </el-pagination>
    </div>
</div>
</template>

<script>

import store from '@/store'

export default {
    name: 'LinkList',
    props: ['where', 'params'],
    data (){
        return {
            links: null,
            pagination: 0,
            user: this.$store.state.user,
            fullscreenLoading: false
        }
    },
    // computed: {
    //     p(){
    //         return this.params
    //     }
    // },
    methods: {
        openFullScreen: function() {
          console.log(this.session)
          this.fullscreenLoading = true;
        //   this.loading = true;
          setTimeout(() => {
            //   this.loading = false
            this.fullscreenLoading = false;
        }, 300);
      },
      struct_params: function(tmp = {}){
          console.log(this.params)
          // limit
          if (this.params.limit == undefined){
              if (tmp.limit == undefined){
                  this.params.limit = 10
              } else {
                  this.params.limit = tmp.limit
              }
          }

          // page
          if (this.params.page == undefined){
              if (tmp.page == undefined){
              } else {
                  this.params.page = tmp.page
              }
          }

            // where
          if (this.params.where == undefined){
              if (tmp.where == undefined){
              } else {
                  this.params.where = tmp.where
              }
          }

          console.log("This.params==="+ this.params)
          console.log(this.params)

          return this.params
      },
        // 分页函数
          handleCurrentChange(val) {
            //   var params = {
            //       where: {"user": this.user.objectId},
            //       limit: this.pagination.limit,
            //       page: val,
            //   }
              var params = this.struct_params({
                  limit: this.pagination.limit,
                  page: val
              })
              this.openFullScreen()
              console.log("请求第 "+ val +" 数据")
              this.get_links(params)
              console.log(`当前页: ${val}`);
              this.$emit('handleCurrentChange', val)
          },
        get_links(params) {
            // 获取链接
            if (params == undefined){
                // params = {
                //     where: {"user": this.user.objectId},
                //     // limit: 1
                // }
                params = this.struct_params()
                // var params = this.struct_params()
            }

            console.log("get_links")
            console.log(params)

            this.$ajax.get('/links', {
                params: params
            }).then((res) => {
                console.log(res)
                if (res.data.code == undefined){
                    this.links = res.data.results
                    this.pagination = res.data.pagination
                }
            }).catch(function(res){
                console.log("Get failed.")
                console.log(res)
            })
        }
    },
    mounted: function(){
        this.get_links()
        console.log(this.links)
    },
    store
}
</script>

<style lang="css">
</style>
