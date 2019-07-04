/**
 * 订单数据监管
 */
const order = {
  state: {
    orderList: [],
    total: 0
  },
  getters: {
    orderList: state => state.orderList,
    getTotal: state => state.total
  },
  mutations: {
    UPDATE_ORDER (state, orderList) {
      state.orderList = orderList
    },
    UPDATE_TOTAL (state, total) {
      state.total = total
    }
  },
  actions: {
    updateOrderListAsync ({
      commit
    }, val) {
      commit('UPDATE_ORDER', val)
    },
    updateTotalAsync ({
      commit
    }, val) {
      commit('UPDATE_TOTAL', val)
    }
  }
}

export default order
