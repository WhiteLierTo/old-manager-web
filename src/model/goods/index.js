/**
 * 图片列表接口请求以及逻辑
 */
import { Get, Put, Post, Delete } from '../../axios/http'
import { GET_GOODS_LIST, GOODS, GET_ONE_GOODS } from '../../axios/api'
import store from '../../store/store'

// 获取商品列表
export const getGoods = async (param) => {
  let params = param
  let res = await Get(GET_GOODS_LIST, params)
  let result = res.data.result.list
  let total = res.data.result.total
  store.dispatch('updateGoodsListAsync', result)
  store.dispatch('updateGoodsTotalAsync', total)
}
// 获取单个商品
export const getOneGoods = async (param) => {
  let params = param
  let res = await Get(GET_ONE_GOODS, params)
  let result = res.data.result
  store.dispatch('updateGoodsOneAsync', result)
}
// 修改商品
export const editGoods = async (param) => {
  let params = param
  let res = await Put(GOODS, params)
  return res
}

// 商品新增
export const addGoods = async (param) => {
  let params = param
  let res = await Post(GOODS, params)
  return res
}

// 商品删除
export const deleteGoods = async (id) => {
  let res = await Delete(GOODS + '/' + id)
  return res
}
