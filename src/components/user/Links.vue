<template>
      <el-row class="content" >
        <el-col :xs="24" :sm="{span: 6,offset: 9}">

        <div class="card" v-loading.fullscreen.lock="fullscreenLoading">
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
  </el-col>
  </el-row>
</template>

<script>
import store from '@/store'

export default {
  data() {
    return {
      fullscreenLoading: false,
      session: this.$store.state.session,
      user: this.$store.state.user,
      links: null,
      pagination: 0,
    }
  },
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

  // 分页函数
    handleCurrentChange(val) {
        var params = {
            where: {"user": this.user.objectId},
            limit: this.pagination.limit,
            page: val,
        }
        this.openFullScreen()
        console.log("请求第 "+ val +" 数据")
        this.get_links(params)
        console.log(`当前页: ${val}`);
    },
    get_links(params) {
        // 获取链接
        if (params == undefined){
            params = {
                where: {"user": this.user.objectId},
                limit: 8
            }
        }

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

  mounted: function() {
     this.get_links()

      console.log("loading done.")
  },
store
}
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }

  .tags {
      margin-right: 10px;
  }
</style>
