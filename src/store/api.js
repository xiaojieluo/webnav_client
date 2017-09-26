
const state = {
    count: 1,
    user: {
        session: null,
        username: 'llnhhy'
    },
    app: {
        app_id: config.app_id,
        app_key: config.app_key,
        app_sign: config.app_sign
    }
}

const mutations={
    add(state, n){
        state.count+=n;
    },
    reduce(state, n){
        state.count-=n;
    }
}
import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state,
    mutations
})
