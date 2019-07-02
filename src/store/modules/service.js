/**
 * 服务数据监管
 */
const service = {
    state: {
        serviceList: [], //获取服务详情列表
        serviceTotal: 0 //服务详情总数
    },
    getters: {
        getServiceList: state => state.serviceList,
        getServiceTotal: state => state.serviceTotal
    },
    mutations: {
        UPDATE_SERVICE(state, serviceList) {
            state.serviceList = serviceList;
        },
        UPDATE_SERVICE_TOTAL(state, serviceTotal) {
            state.serviceTotal = serviceTotal;
        }
    },
    actions: {
        updateServiceListAsync({
            commit
        }, val) {
            commit('UPDATE_SERVICE', val);
        },
        updateServiceTotalAsync({
            commit
        }, val) {
            commit('UPDATE_SERVICE_TOTAL', val);
        }
    }
};

export default service;