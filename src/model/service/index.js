/**
 * 商家列表接口请求以及逻辑
 */
import { Get, Delete, Put, Post } from '../../axios/http';
import { GET_SERVICE_LIST, COMMON_SERVICE_LIST } from '../../axios/api';
import store from '../../store/store'


//获取服务详情列表
export const getServiceFnc = async(page) => {
    let params = page;
    let res = await Get(GET_SERVICE_LIST, params);
    let result = res.data.result.list;
    let total = res.data.result.total;

    result.forEach(v => {
        v.apply = JSON.parse(v.apply);
        v.apply.applyPeople = JSON.parse(v.apply.applyPeople);
    });


    store.dispatch('updateServiceListAsync', result);
    store.dispatch('updateServiceTotalAsync', total);
}

//删除服务详情列表
export const deleteServiceFnc = async(id) => {
    let res = await Delete(COMMON_SERVICE_LIST + '/' + id);
    return res;
}

//编辑服务详情列表
export const editServiceFnc = async(param) => {
    let params = param;
    let res = await Put(COMMON_SERVICE_LIST, params);
    return res;
}

//新增服务详情列表
export const addServiceFnc = async(param) => {
    let params = param;
    let res = await Post(COMMON_SERVICE_LIST, params);
    return res;
}