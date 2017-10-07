<template lang="html">
    <div class="user-index">
        Welcome! {{username}}

    </div>
</template>

<script>
export default {
    name: 'User',
    data(){
        return {
            username: this.$route.params.username
        }
    }
}
</script>

<style lang="css">
</style>
