<template lang="html">
    <div class="index">
        <p><router-link :to="{ name: 'Index', params: {} }">首页</router-link> |
        <router-link :to="{ name: 'Tags', params: {} }">标签</router-link>
        <router-link :to="{ name: 'Links', params: {} }">Links</router-link>

        </p>
        Hello， 欢迎使用 vlink 个人网址导航！

        <el-tabs  v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="最新" name="new"><LinkList :params="params" v-on:handleCurrentChange="handleCurrentChange"></LinkList></el-tab-pane>
            <el-tab-pane label="热门" name="hot"><LinkList :params="params" v-on:handleCurrentChange="handleCurrentChange"></LinkList></el-tab-pane>
        </el-tabs>

    </div>

</template>

<script>

import store from '@/store'
import LinkList from '@/components/link/list'

export default {
    name: 'index',
    data () {
        return {
            data: APP_ID,
            session: this.$store.state.session,
            user: this.$store.state.user,
            activeName: 'new',
            params: {
                order: "-createdAt",
                limit: 2
            }
        }
    },
    methods: {
        handleClick(tab, event) {
            console.log("tab event")
          if (this.activeName == 'new'){
              this.params = {
                  order: '-createdAt',
                  limit: 2
              }
          } else if (this.activeName == 'hot'){
              this.params = {
                order: 'updatedAt',
                limit: 2
              }
          }
      },
      handleCurrentChange: function(val){
          console.log("父组件接收到 子组件事件")
          console.log("请求第 "+val+ "页数据.")
      },
      get_where: function() {
        //   组合 where
        var where = {
            "user": this.user.objectId
        }
        this.where = where
        // return where
    },
    get_params: function() {
        // 组合 params
        var params = {
        }
        this.params = params
    }
    },
    components: {
        LinkList
    },
    mounted: function() {
        this.get_where()
        this.handleClick()
        console.log(this.get_where())
    },
    store
}
</script>

<style lang="css">
</style>
