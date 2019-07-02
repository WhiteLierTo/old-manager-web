/**
 * axios二次封装
 */
import axios from 'axios'
import qs from 'qs'

const baseURL = 'http://wx.525bama.cn:8099/oldman/';


export const Post = (url, data) => {
    return axios({
        method: 'post',
        baseURL: baseURL,
        url: url,
        data: qs.stringify(data),
        resultType: 'JSON',
        timeout: 90000,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }).then(res => {
        if (res.data.errorCode == 0) {
            return res;
        }
    }).catch(err => {
        return err;
    });
};

export const Put = (url, data) => {
    return axios({
        method: 'put',
        baseURL: baseURL,
        url: url,
        data: qs.stringify(data),
        timeout: 10000,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }).then(res => {
        if (res.data.errorCode == 0) {
            return res;
        }
    }).catch(err => {
        return err;
    });
};

export const Get = (url, params) => {
    return axios({
        method: 'get',
        baseURL: baseURL,
        url: url,
        params: params, // get 请求时带的参数
        timeout: 10000,
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    }).then(res => {
        if (res.data.errorCode == 0) {
            return res;
        }
    }).catch(err => {
        return err;
    });
};

export const Delete = (url, params) => {
    return axios({
        method: 'delete',
        baseURL: baseURL,
        url: url,
        params: params, // get 请求时带的参数
        timeout: 10000,
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    }).then(res => {
        if (res.data.errorCode == 0) {
            return res;
        }
    }).then(err => {
        return err;
    });
}