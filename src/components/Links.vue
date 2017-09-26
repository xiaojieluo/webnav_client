<template lang="html">
  <div class="links">
      This is Links.
      {{ msg }}
      <button class="btn btn-secondary" v-on:click="inquire">Get_links</button>
  </div>
</template>

<script>
import store from '@/store'

export default {
    name: 'links',
    data () {
        return {
            msg: 'MSG',
            links: []
        }
    },
    methods: {
        inquire: function inquire(){
            // url = this.config.api_url + this.$store.state.user.objectid + '/links';
            var url = 'http://127.0.0.1:8888/users/59ba356a565b274ad7ea020d/links'
            this.$ajax.get(url).then((response) => {
                this.tags = response.data.results;
                // alert(this.tags.length);
                console.log(response.data.results)
            })
        }
    }
}
</script>

<style lang="css">
</style>
