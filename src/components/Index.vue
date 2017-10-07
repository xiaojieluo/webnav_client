<template lang="html">
    <div class="index">
        <el-button type="info"><router-link :to="{ name: 'LinkAdd', params: {} }">提交一个链接</router-link></el-button>


        <el-tabs  v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="最新" name="new"><LinkList v-bind:params="params" ></LinkList></el-tab-pane>
            <el-tab-pane label="热门" name="hot"><LinkList v-bind:params="params" ></LinkList></el-tab-pane>
        </el-tabs>

    </div>

</template>

<script>
import store from '@/store'
import LinkList from '@/components/link/list'

export default {
  name: 'index',
  data() {
    return {
      session: this.$store.state.session,
      user: this.$store.state.user,
      activeName: 'new'
    }
  },
  computed: {
    params() {
      console.log("ActiveName")
      console.log(this.activeName)
      return this.init_params()
    }
  },
  methods: {
    init_params: function() {
        // 初始化参数
      var params = {}
      if (this.activeName == 'new') {
        params.order = '-createdAt'
        params.limit = 8
      } else if (this.activeName == 'hot') {
        params.order = 'updatedAt'
        params.limit = 8
      }
      return params
    },
    handleClick(tab, event) {
        // 处理标签切换事件
      console.log("tab event")
      console.log(tab, event)
      },
  },

  components: {
    LinkList
  },

  mounted: function() {
  },
  store
}
</script>

<style lang="css">
</style>
