/**
 * 数据中心
 */
import Vue from 'vue'
import Vuex from 'vuex';
import home from './modules/home'
import login from './modules/login'
import organization from './modules/organization'
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        home,
        login,
        organization
    }
})