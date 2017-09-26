<template lang="html">
  <div class="tags">
      This is tags vue.
      {{ msg }}
      <button class="btn btn-secondary" v-on:click="inquire">clear</button>
  </div>
</template>

<script>

var vm = this

var tags = new Array()

export default {
    name: 'tags',
    data (){
        return {
            msg: this.config.app_key,
            tags: []
        }
    },
    methods :{
        inquire: function inquire(){
            this.$http.get(this.config.api_users, {
                headers: {'X-LC-Id':this.config.app_id, 'X-LC-Key':this.config.app_key}
            }).then((response) => {
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
