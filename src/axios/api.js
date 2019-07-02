/**
 * 定义接口
 */


/**
 * 机构管理
 */
export const GET_MERCHANT_LIST = 'srvMerchant/list'; //获取商家列表
export const DELETE_MERCHANT = 'srvMerchant/delete'; //删除商家列表
export const EDIT_MERCHANT = 'srvMerchant'; //编辑商家列表
export const GET_MERCHANT_TYPE = 'srvMerchantType/list'; //获取机构类型
export const GET_MERCHANT_IMG = 'srvMerchantImg'; //获取单张照片
export const add_merchant = 'srvMerchant/add'; //增加商家列表


/**
 * 服务管理
 */
export const GET_SERVICE_LIST = 'srvServiceDetail/mine/list'; //获取服务列表 GET
export const ADD_SERVICE_LIST = 'srvServiceDetail'; //新增服务 POST
export const DELETE_SERVICE_LIST = 'srvServiceDetail'; //删除服务 DELETE
export const update_service_list = 'srvServiceDetail'; //修改服务 PUT