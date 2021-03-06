/**
 * 商家列表接口请求以及逻辑
 */
import { Get, Delete, Put, Post } from '../../axios/http'
import { GET_MERCHANT_LIST, DELETE_MERCHANT, EDIT_MERCHANT, GET_MERCHANT_TYPE, GET_MERCHANT_IMG, GET_TYPE_LIST, COMMON_TYPE_LIST } from '../../axios/api'
import store from '../../store/store'

// 获取商品列表
export const getMerchantList = async (page) => {
  let params = page
  let res = await Get(GET_MERCHANT_LIST, params)
  let result = res.data.result.list
  let total = res.data.result.total
  store.dispatch('updateMerchantListAsync', result)
  store.dispatch('updateTotalAsync', total)
}

// 删除商品列表
export const deleteMerchantList = async (obj) => {
  let params = obj
  let res = await Delete(DELETE_MERCHANT, params)
  return res
}

// 编辑商品列表
export const editMerchantList = async (param) => {
  let params = param
  let res = await Put(EDIT_MERCHANT, params)
  return res
}

// 获取机构类型
export const getMerchantType = async () => {
  let params = {}
  let res = await Get(GET_MERCHANT_TYPE, params)
  let result = res.data.result.list
  store.dispatch('updateMerchantTypeAsync', result)
}

// 单张图片上传
export const uploadImgFnc = async (param) => {
  let params = param
  let res = await Post(GET_MERCHANT_IMG, params)
  return res
}

// 获取类型列表
export const getTypeListFnc = async (page) => {
  let params = page
  let res = await Get(GET_TYPE_LIST, params)
  let result = res.data.result.list
  let total = res.data.result.total
  store.dispatch('updateTypeAsync', result)
  store.dispatch('updateTypeTotalAsync', total)
}

// 删除类型列表
export const deleteTypeListFnc = async (id) => {
  let res = await Delete(COMMON_TYPE_LIST + '/' + id)
  return res
}
