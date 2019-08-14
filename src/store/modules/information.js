/**
 * 消息数据监管
 */
const information = {
  state: {
    tableData: [],
    total: 0,
    clientData: [],
    clienTotal: 0,
    messageData: [],
    messageTotal: 0,
    userData: [],
    userTotal: 0
  },
  getters: {
    informationList: state => state.tableData,
    getTotal: state => state.total,
    getClientList: state => state.clientData,
    clienTotal: state => state.clienTotal,
    getMessage: state => state.messageData,
    messageTotal: state => state.messageTotal,
    getUser: state => state.userData,
    getUserTotal: state => state.userTotal
  },
  mutations: {
    UPDATE_INFORMATION (state, tableData) {
      state.tableData = tableData
    },
    UPDATE_TOTAL (state, total) {
      state.total = total
    },
    UPDATE_CLIENT (state, clientData) {
      state.clientData = clientData
    },
    UPDATE_CLIENT_TOTAL (state, clienTotal) {
      state.clienTotal = clienTotal
    },
    UPDATE_MESSAGE (state, messageData) {
      state.messageData = messageData
    },
    UPDATE_MESSAGE_TOTAL (state, messageTotal) {
      state.messageTotal = messageTotal
    },
    UPDATE_USER (state, userData) {
      state.userData = userData
    },
    UPDATE_USER_TOTAL (state, userTotal) {
      state.userTotal = userTotal
    }
  },
  actions: {
    updateInformationListAsync ({
      commit
    }, val) {
      commit('UPDATE_INFORMATION', val)
    },
    updateInformationTotalAsync ({
      commit
    }, val) {
      commit('UPDATE_TOTAL', val)
    },
    updateClientListAsync ({
      commit
    }, val) {
      commit('UPDATE_CLIENT', val)
    },
    updateClientTotalAsync ({
      commit
    }, val) {
      commit('UPDATE_CLIENT_TOTAL', val)
    },
    updateMessageListAsync ({
      commit
    }, val) {
      commit('UPDATE_MESSAGE', val)
    },
    updateMessageTotalAsync ({
      commit
    }, val) {
      commit('UPDATE_MESSAGE_TOTAL', val)
    },
    updateUserListAsync ({
      commit
    }, val) {
      commit('UPDATE_USER', val)
    },
    updateUserTotalAsync ({
      commit
    }, val) {
      commit('UPDATE_USER_TOTAL', val)
    }
  }
}

export default information
