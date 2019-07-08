/**
 * 图片列表接口请求以及逻辑
 */
import { Get, Put, Post, Delete } from '../../axios/http'
import { GET_SLIDESHOW_LIST, EDIT_SLIDESHOW } from '../../axios/api'
import store from '../../store/store'

// 获取轮播图列表
export const getImage = async (param) => {
  let params = param
  let res = await Get(GET_SLIDESHOW_LIST, params)
  let result = res.data.result
  // let total = res.data.result.total
  store.dispatch('updateSlideSowListAsync', result)
  // store.dispatch('updateSlideshowTotalAsync', total)
}
// 修改轮播图
export const uploadImage = async (param) => {
  let params = param
  let res = await Put(EDIT_SLIDESHOW, params)
  return res
}

// 轮播图新增
export const addImage = async (param) => {
  let params = param
  let res = await Post(EDIT_SLIDESHOW, params)
  return res
}

// 轮播图删除
export const deleteImage = async (id) => {
  let res = await Delete(EDIT_SLIDESHOW + '/' + id)
  return res
}
