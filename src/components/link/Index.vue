<template>
    <div class="">
        Link Components
        <router-link :to="{ name: 'LinkAdd', params: {} }">Add</router-link><br />
        Linkis == {{linkid}}

        {{link}}
        <router-view></router-view>
    </div>

</template>

<script>
export default {
    name: 'LinkIndex',
    data() {
        return {
            linkid: this.$route.params.linkid,
            link: null
        }
    },
    mounted: function(){
        var url = '/links/'+ this.linkid
        console.log(url)
        this.$ajax.get(url)
            .then((res) => {
                console.log(res)
                this.link = res.data
            }).catch((res) => {
                console.log(res)
            })
    },

}

</script>
