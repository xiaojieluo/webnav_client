<template>
    <div class="">
        Link Components
        <router-link :to="{ name: 'LinkAdd', params: {} }">Add</router-link>
        <router-view></router-view>
    </div>

</template>

<script>
export default {
    name: 'Link_Index',
    data() {
        return {

        }
    }

}

</script>
