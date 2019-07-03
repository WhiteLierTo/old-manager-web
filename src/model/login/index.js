/**
 * 登录页接口请求以及逻辑
 */

import { formPost } from '../../axios/http';
import { LOGIN } from '../../axios/api';

export const loginFnc = async(param) => {
    console.error(JSON.stringify(param));
    let params = param;
    let res = await formPost(LOGIN, params);
    return res;
}