/**
 * 机构数据监管
 */
const organization = {
    state: {
        merchantList: [], // 获取商家列表
        total: 0, // 商家总数
        merchantType: [], // 商家类型
        typeList: [], //类型数组
        typeTotal: 0 //类型总数
    },
    getters: {
        getMerchantList: state => state.merchantList,
        getTotal: state => state.total,
        getMerchantType: state => state.merchantType,
        getTypeList: state => state.typeList,
        getTypetotal: state => state.typeTotal
    },
    mutations: {
        UPDATE_MERCHANT(state, merchantList) {
            state.merchantList = merchantList
        },
        UPDATE_TOTAL(state, total) {
            state.total = total
        },
        UPDATE_MERCHANT_TYPE(state, merchantType) {
            state.merchantType = merchantType
        },
        UPDATE_TYPE_LIST(state, typeList) {
            state.typeList = typeList
        },
        UPDATE_TYPE_TOTAL(state, typeTotal) {
            state.typeTotal = typeTotal
        }
    },
    actions: {
        updateMerchantListAsync({
            commit
        }, val) {
            commit('UPDATE_MERCHANT', val)
        },
        updateTotalAsync({
            commit
        }, val) {
            commit('UPDATE_TOTAL', val)
        },
        updateMerchantTypeAsync({
            commit
        }, val) {
            commit('UPDATE_MERCHANT_TYPE', val)
        },
        updateTypeAsync({
            commit
        }, val) {
            commit('UPDATE_TYPE_LIST', val)
        },
        updateTypeTotalAsync({
            commit
        }, val) {
            commit('UPDATE_TYPE_TOTAL', val)
        }
    }
}

export default organization;