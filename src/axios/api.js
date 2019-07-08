/**
 * 定义接口
 */

/**
 * 登录
 */
export const LOGIN = 'sysAccount/login'

/**
 * 机构管理
 */
export const GET_MERCHANT_LIST = 'srvMerchant/list'; // 获取商家列表
export const DELETE_MERCHANT = 'srvMerchant/delete'; // 删除商家列表
export const EDIT_MERCHANT = 'srvMerchant'; // 编辑商家列表
export const GET_MERCHANT_TYPE = 'srvMerchantType/list'; // 获取机构类型
export const GET_MERCHANT_IMG = 'srvMerchantImg'; // 获取单张照片
export const ADD_MERCHANT = 'srvMerchant/add'; // 增加商家列表
export const GET_TYPE_LIST = 'srvMerchantType/list'; //获取类型列表
export const COMMON_TYPE_LIST = 'srvMerchantType'; //新增类型 POST 删除类型 DELETE 修改类型 PUT

/**
 * 服务管理
 */
export const GET_SERVICE_LIST = 'srvServiceDetail/mine/list'; //获取服务列表 GET
export const COMMON_SERVICE_LIST = 'srvServiceDetail'; //新增服务 POST 删除服务 DELETE 修改服务 PUT
export const GET_SERVICE_RECORD = 'srvServiceOrder/mine/list'; //获取服务订单
export const COMMON_SERVICE_RECORD = 'srvServiceOrder'; //新增服务订单 POST 删除服务订单 DELETE　修改服务 PUT
/**
 * 订单管理
 */
export const GET_ORDER_LIST = '/srvServiceOrder/mine/list'; // 获取订单列表
export const UPDATE_ORDER = 'srvServiceOrder'; // 修改单个订单