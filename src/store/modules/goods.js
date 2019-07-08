/**
 * 机构数据监管
 */
const goods = {
  state: {
    tableData: [],
    goodsTotal: 0,
    goodsOne: {}
  },
  getters: {
    getGoods: state => state.tableData,
    getGoodsTotal: state => state.goodsTotal,
    getOneGoods: state => state.goodsOne
  },
  mutations: {
    UPDATE_GOODS (state, tableData) {
      state.tableData = tableData
    },
    UPDATE_GOODS_LIST_TOTAL (state, goodsTotal) {
      state.goodsTotal = goodsTotal
    },
    UPDATE_GOODS_ONE (state, goodsOne) {
      state.goodsOne = goodsOne
    }
  },
  actions: {
    updateGoodsListAsync ({
      commit
    }, val) {
      commit('UPDATE_GOODS', val)
    },
    updateGoodsTotalAsync ({
      commit
    }, val) {
      commit('UPDATE_GOODS_LIST_TOTAL', val)
    },
    updateGoodsOneAsync ({
      commit
    }, val) {
      commit('UPDATE_GOODS_ONE', val)
    }
  }
}

export default goods
