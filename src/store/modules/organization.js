/**
 * 机构数据监管
 */
const organization = {
    state: {
        merchantList: [], //获取商家列表
        total: 0, //商家总数
        merchantType: [] //商家类型
    },
    getters: {
        getMerchantList: state => state.merchantList,
        getTotal: state => state.total,
        getMerchantType: state => state.merchantType
    },
    mutations: {
        UPDATE_MERCHANT(state, merchantList) {
            state.merchantList = merchantList;
        },
        UPDATE_TOTAL(state, total) {
            state.total = total;
        },
        UPDATE_MERCHANT_TYPE(state, merchantType) {
            state.merchantType = merchantType;
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
        },
        updateMerchantTypeAsync({
            commit
        }, val) {
            commit('UPDATE_MERCHANT_TYPE', val);
        }
    }
};

export default organization;