/**
 * 图片列表接口请求以及逻辑
 */
import { Get, Put, Post, Delete } from '../../axios/http'
import { GET_GOODS_LIST, GOODS, GET_ONE_GOODS, GET_COLLECT_LIST, COLLECT, GET_GOODS_TYPE_LIST, GOODS_TYPE } from '../../axios/api'
import store from '../../store/store'

// 获取商品列表
export const getGoods = async(param) => {
        let params = param
        let res = await Get(GET_GOODS_LIST, params)
        let result = res.data.result.list
        let total = res.data.result.total
        store.dispatch('updateGoodsListAsync', result)
        store.dispatch('updateGoodsTotalAsync', total)
    }
    // 获取单个商品
export const getOneGoods = async(param) => {
        let params = param
        let res = await Get(GET_ONE_GOODS, params)
        let result = res.data.result
        if (result.type == 1) {
            result.type = '行走';
        } else if (result.type == 2) {
            result.type = '床卧';
        } else if (result.type == 3) {
            result.type = '生活';
        } else if (result.type == 4) {
            result.type = '家具';
        } else if (result.type == 5) {
            result.type = '智能障碍';
        } else if (result.type == 6) {
            result.type = '其他';
        }
        store.dispatch('updateGoodsOneAsync', result)
    }
    // 修改商品
export const editGoods = async(param) => {
    let params = param
    let res = await Put(GOODS, params)
    return res
}

// 商品新增
export const addGoods = async(param) => {
    let params = param
    let res = await Post(GOODS, params)
    return res
}

// 商品删除
export const deleteGoods = async(id) => {
    let res = await Delete(GOODS + '/' + id)
    return res
}

// 获取商品收藏列表
export const getCollect = async(param) => {
    let params = param
    let res = await Get(GET_COLLECT_LIST, params)
    let result = res.data.result.list
    let total = res.data.result.total
    store.dispatch('updateGoodsCollectAsync', result)
    store.dispatch('updateGoodsCollectTotalAsync', total)
}

// 修改商品收藏状态
export const editCollect = async(param) => {
    let params = param
    let res = await Put(COLLECT, params)
    return res
}

// 商品删除
export const deleteCollect = async(id) => {
    let res = await Delete(COLLECT + '/' + id)
    return res
}

// 获取商品类型列表
export const getGoodsType = async(param) => {
        let params = param
        let res = await Get(GET_GOODS_TYPE_LIST, params)
        let result = res.data.result.list
        let total = res.data.result.total
        store.dispatch('updateGoodsTypeAsync', result)
        store.dispatch('updateGoodsTypeTotalAsync', total)
    }
    // 修改商品类型
export const editGoodsType = async(param) => {
    let params = param
    let res = await Put(GOODS_TYPE, params)
    return res
}

// 新增商品类型
export const addGoodsType = async(param) => {
    let params = param
    let res = await Post(GOODS_TYPE, params)
    return res
}