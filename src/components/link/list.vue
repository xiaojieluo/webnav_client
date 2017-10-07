<template lang="html">
<div class="list">

    <div class="card" v-loading.fullscreen.lock="fullscreenLoading">
        <el-card class="box-card" style="margin-top:15px">
            <div class="list-item" v-for="(link, index) in links">
                <h3><a :href="link.url">{{ link.title }}</a> <small>({{link.url}})</small></h3>
                <small>{{ link.desc }}</small><br />

                <el-button class="el-icon-caret-top" v-on:click="votePlus(index, 1)"></el-button>
                {{link.vote}}
                <el-button class="el-icon-caret-bottom" v-on:click="votePlus(index, -1)"></el-button>

                {{$moment(link.createdAt).fromNow()}} <router-link :to="{ name: 'User', params: {username: link.username} }">
                    {{ link.username }}</router-link>
                分享<small v-if="link.tags != '' ">于:
                    <span v-for="tag in link.tags">
                        <a href="#">
                            <el-tag type="primary">
                                #{{tag}}
                            </el-tag>
                        </a>
                    </span>
                </small>
                <hr>
            </div>

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


/**
 * Link 列表显示组件
 * 只需传入 params, 组件会自动根据 params 参数从服务端请求数据并渲染视图
 */

export default {
  name: 'LinkList',
  props: ['params'],
  data() {
    return {
      pagination: 0,
      user: this.$store.state.user,
      fullscreenLoading: false,
      links: null,
    }
  },
  methods: {
      votePlus(index, num){
          console.log("votePlus function."+ num)
          console.log(typeof this.links[index].objectId)
          var linkid = this.links[index].objectId
          var url = '/links/'+ linkid
          this.$ajax.put(url, {
              vote: this.links[index].vote + num
          }).then((res) => {
              console.log(res)
              //   更新页面数据
              this.links[index].vote += 1
          }).catch((res) => {
              console.log(res)
          })
    },
    openFullScreen: function() {
      console.log(this.session)
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 300);
    },
    // 分页函数
    handleCurrentChange(val) {
      this.params.page = val
      this.openFullScreen()
      console.log("请求第 " + val + " 数据")
      console.log(`当前页: ${val}`);
      this.get_links(this.params)
    },
    get_links(params) {
      // 获取链接
      if (params == undefined) {
        params = this.params
      }
      console.log(params)
      this.$ajax.get('/links', {
        params: params
      }).then((res) => {
        console.log(res)
        if (res.data.code == undefined) {
          this.links = res.data.results
          this.pagination = res.data.pagination
        }
      }).catch(function(res) {
        console.log("Get failed.")
        console.log(res)
      })
    }
  },
  mounted: function() {
    this.get_links()
  },
  watch: {
    params: function() {
      console.log("Params changed.")
      this.get_links(this.params)
    }
  },
  store
}
</script>

<style lang="css">
</style>
