/**
 * 服务数据监管
 */
const service = {
  state: {
    serviceList: [], // 获取服务详情列表
    serviceTotal: 0, // 服务详情总数
    serviceRecordList: [], // 获取服务订单列表
    serviceRecordTotal: 0 // 服务订单总数
  },
  getters: {
    getServiceList: state => state.serviceList,
    getServiceTotal: state => state.serviceTotal,
    getServiceRecordList: state => state.serviceRecordList,
    getServiceRecordTotal: state => state.serviceRecordTotal
  },
  mutations: {
    UPDATE_SERVICE (state, serviceList) {
      state.serviceList = serviceList
        },
    UPDATE_SERVICE_TOTAL (state, serviceTotal) {
      state.serviceTotal = serviceTotal
        },
    UPDATE_SERVICE_RECORD (state, serviceRecordList) {
      state.serviceRecordList = serviceRecordList
        },
    UPDATE_SERVICE_RECORD_TOTAL (state, serviceRecordTotal) {
      state.serviceRecordTotal = serviceRecordTotal
        }
  },
  actions: {
    updateServiceListAsync ({
      commit
    }, val) {
      commit('UPDATE_SERVICE', val)
        },
    updateServiceTotalAsync ({
      commit
    }, val) {
      commit('UPDATE_SERVICE_TOTAL', val)
        },
    updateServiceRecordAsync ({
      commit
    }, val) {
      commit('UPDATE_SERVICE_RECORD', val)
        },
    updateServiceRecordTotalAsync ({
      commit
    }, val) {
      commit('UPDATE_SERVICE_RECORD_TOTAL', val)
        }
  }
}

export default service
