/**
 * 商家列表接口请求以及逻辑
 */
import { Get, Delete, Post } from '../../axios/http';
import { GET_MERCHANT_LIST, DELETE_MERCHANT, EDIT_MERCHANT } from '../../axios/api';
import store from '../../store/store'

//获取商品列表
export const getMerchantList = async(page) => {
    let params = page;
    let res = await Get(GET_MERCHANT_LIST, params);
    let result = res.data.result.list;
    let total = res.data.result.total;
    store.dispatch('updateMerchantListAsync', result);
    store.dispatch('updateTotalAsync', total);

}

//删除商品列表
export const deleteMerchantList = async(obj) => {
    let params = obj;
    let res = await Delete(DELETE_MERCHANT, params);
    return res;
}


//编辑商品列表
export const editMerchantList = async(param) => {
    let params = param;
    let res = await Post(EDIT_MERCHANT, params);
    return res;
}