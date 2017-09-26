<template lang="html">
    <div class="count">
        <h2>{{ msg }}</h2>
        <hr>
        <h3>{{ $store.state.count }}</h3>
        {{count}}
        <div>
            <button @click="$store.commit('add', 2)">+</button>
            <button @click="$store.commit('reduce', 2)">-</button>

        </div>
    </div>

</template>

<script>
import store from '@/store'
import { mapState,mapMutations } from 'vuex';
export default {
    data () {
        return {
            msg : 'Hello Vuex',
            count: ''
        }
    },
    store,
}
</script>

<style lang="css">
</style>
