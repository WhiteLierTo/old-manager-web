/**
 * 商家列表接口请求以及逻辑
 */
import { Get, Delete, Put, Post } from '../../axios/http';
import { GET_SERVICE_LIST, COMMON_SERVICE_LIST, GET_SERVICE_RECORD, COMMON_SERVICE_RECORD } from '../../axios/api';
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

//获取服务订单列表
export const getServiceRecordFnc = async(page) => {
    let params = page;
    let res = await Get(GET_SERVICE_RECORD, params);
    let result = res.data.result.list;
    let total = res.data.result.total;
    result.forEach(v => {
        v.elderly.description = JSON.parse(v.elderly.description);
    })
    store.dispatch('updateServiceRecordAsync', result);
    store.dispatch('updateServiceRecordTotalAsync', total);
}

//删除服务订单列表
export const deleteServiceRecordFnc = async(id) => {
    let res = await Delete(COMMON_SERVICE_RECORD + '/' + id);
    return res;
}

//编辑服务订单列表
export const editServiceRecordFnc = async(param) => {
    let params = param;
    let res = await Put(COMMON_SERVICE_RECORD, params);
    return res;
}

//新增服务订单列表
export const addServiceRecordFnc = async(param) => {
    let params = param;
    let res = await Post(COMMON_SERVICE_RECORD, params);
    return res;
}