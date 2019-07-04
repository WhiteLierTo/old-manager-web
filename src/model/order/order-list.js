/**
 * 订单列表获取接口
 */
import { Get, Put, Post } from '../../axios/http'
import { GET_ORDER_LIST, UPDATE_ORDER } from '../../axios/api'
// import store from '../../store/store'

// 获取订单列表
export const getOrderList = async (page) => {
  let params = page
  let res = await Get(GET_ORDER_LIST, params)
  return res
}
// 修改单个订单
export const updateOrder = async (order) => {
  let params = order
  let res = await Put(UPDATE_ORDER, params)
  return res
}
