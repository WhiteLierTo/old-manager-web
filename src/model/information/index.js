/**
 * 消息列表接口请求以及逻辑
 */
import { Get, Put, Post, Delete } from '../../axios/http'
import { GET_INFORMATION_LIST, INFORMATION, GET_CLIENT, CLIENT, GET_MESSAGE_LIST, MESSAGE, GET_USER_LIST, USER, ADD_USER } from '../../axios/api'
import store from '../../store/store'

// 获取消息列表
export const informationList = async (param) => {
  let params = param
  let res = await Get(GET_INFORMATION_LIST, params)
  let result = res.data.result.list
  let total = res.data.result.total
  store.dispatch('updateInformationListAsync', result)
  store.dispatch('updateInformationTotalAsync', total)
}
// 修改消息
export const updateInformation = async (param) => {
  let params = param
  let res = await Put(INFORMATION, params)
  return res
}

// 消息新增
export const addInformation = async (param) => {
  let params = param
  let res = await Post(INFORMATION, params)
  return res
}

// 消息删除
export const deleteInformation = async (id) => {
  let res = await Delete(INFORMATION + '/' + id)
  return res
}

// 获取商家服务列表
export const getService = async (param) => {
  let params = param
  let res = await Get(GET_INFORMATION_LIST, params)
  let result = res.data.result.list
  store.dispatch('updateServiceListAsync', result)
}
// 获取消息列表
export const getClientList = async (param) => {
  let params = param
  let res = await Get(GET_CLIENT, params)
  let result = res.data.result.list
  let total = res.data.result.total
  store.dispatch('updateClientListAsync', result)
  store.dispatch('updateClientTotalAsync', total)
}
// 消息删除
export const deleteClientFnc = async (id) => {
  let res = await Delete(CLIENT + '/' + id)
  return res
}
// 获取资讯列表
export const getMessage = async (param) => {
  let params = param
  let res = await Get(GET_MESSAGE_LIST, params)
  let result = res.data.result.list
  let total = res.data.result.total
  store.dispatch('updateMessageListAsync', result)
  store.dispatch('updateMessageTotalAsync', total)
}
// 修改资讯
export const updatetMessage = async (param) => {
  let params = param
  let res = await Put(MESSAGE, params)
  return res
}

// 资讯删除
export const messageDeleteFnc = async (id) => {
  let res = await Delete(MESSAGE + '/' + id)
  return res
}
// 资讯新增
export const addMessage = async (param) => {
  let params = param
  let res = await Post(MESSAGE, params)
  return res
}
// 获取用户列表
export const getUser = async (param) => {
  let params = param
  let res = await Get(GET_USER_LIST, params)
  let result = res.data.result.list
  let total = res.data.result.total
  store.dispatch('updateUserListAsync', result)
  store.dispatch('updateUserTotalAsync', total)
}
// 修改消息
export const updatetUser = async (param) => {
  let params = param
  let res = await Put(USER, params)
  return res
}

// 资讯删除
export const deleteUser = async (id) => {
  let res = await Delete(USER + '/' + id)
  return res
}
// 资讯新增
export const addUser = async (param) => {
  let params = param
  let res = await Post(ADD_USER, params)
  return res
}
