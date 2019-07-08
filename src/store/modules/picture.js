/**
 * 机构数据监管
 */
const picture = {
  state: {
    tableData: []
  },
  getters: {
    getImage: state => state.tableData
  },
  mutations: {
    UPDATE_SLIDESHOW (state, tableData) {
      state.tableData = tableData
    }
  },
  actions: {
    updateSlideSowListAsync ({
      commit
    }, val) {
      commit('UPDATE_SLIDESHOW', val)
    }
  }
}

export default picture
