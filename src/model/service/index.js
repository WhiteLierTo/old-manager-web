/**
 * 商家列表接口请求以及逻辑
 */
import { Get, Delete, Put } from '../../axios/http';
import { GET_SERVICE_LIST, ADD_SERVICE_LIST, DELETE_SERVICE_LIST, UPDATE_SERVICE_LIST } from '../../axios/api';
import store from '../../store/store'


//获取服务详情列表
export const getServiceFnc = async(page) => {
    let params = page;
    let res = await Get(GET_SERVICE_LIST, params);
    let result = res.data.result.list;
    let total = res.data.result.total;
    result.forEach(v => {
        if (v.careType == 1) {
            v.careType = "服务一";
        } else if (v.careType == 2) {
            v.careType = "服务二";
        }
    });
    store.dispatch('updateServiceListAsync', result);
    store.dispatch('updateServiceTotalAsync', total);
}