/**
 * 机构数据监管
 */
const goods = {
  state: {
    tableData: [],
    goodsTotal: 0,
    goodsOne: {},
    collect: [],
    collectTotal: 0,
    type: [],
    typeTotal: 0
  },
  getters: {
    getGoods: state => state.tableData,
    getGoodsTotal: state => state.goodsTotal,
    getOneGoods: state => state.goodsOne,
    getCollect: state => state.collect,
    getCollectTotal: state => state.collectTotal,
    getGoodsType: state => state.type,
    getTypeTotal: state => state.typeTotal
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
    },
    UPDATE_COLLECT (state, collect) {
      state.collect = collect
    },
    UPDATE_COLLECT_TOTAL (state, collectTotal) {
      state.collectTotal = collectTotal
    },
    UPDATE_TYPE (state, type) {
      state.type = type
    },
    UPDATE_TYPE_TOTAL (state, typeTotal) {
      state.typeTotal = typeTotal
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
    },
    updateGoodsCollectAsync ({
      commit
    }, val) {
      commit('UPDATE_COLLECT', val)
    },
    updateGoodsCollectTotalAsync ({
      commit
    }, val) {
      commit('UPDATE_COLLECT_TOTAL', val)
    },
    updateGoodsTypeAsync ({
      commit
    }, val) {
      commit('UPDATE_TYPE', val)
    },
    updateGoodsTypeTotalAsync ({
      commit
    }, val) {
      commit('UPDATE_TYPE_TOTAL', val)
    }
  }
}

export default goods
