<template lang="html">
    <div class="user-indexssss">
        Welcome!cacascassca
        scaca
        casc
        {{username}}
    </div>
</template>

<script>
export default {
    name: 'Tag',
    data(){
        return {
            username: this.$route.params.tagname
        }
    }
}
</script>

<style lang="css">
</style>
