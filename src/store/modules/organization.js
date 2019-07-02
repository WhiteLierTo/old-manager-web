/**
 * 机构数据监管
 */
const organization = {
    state: {
        merchantList: [],
        total: 0
    },
    getters: {
        getMerchantList: state => state.merchantList,
        getTotal: state => state.total
    },
    mutations: {
        UPDATE_MERCHANT(state, merchantList) {
            state.merchantList = merchantList;
        },
        UPDATE_TOTAL(state, total) {
            state.total = total;
        }
    },
    actions: {
        updateMerchantListAsync({
            commit
        }, val) {
            commit('UPDATE_MERCHANT', val);
        },
        updateTotalAsync({
            commit
        }, val) {
            commit('UPDATE_TOTAL', val);
        }
    }
};

export default organization;