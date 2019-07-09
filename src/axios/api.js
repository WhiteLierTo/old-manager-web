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
export const GET_MERCHANT_LIST = 'srvMerchant/list' // 获取商家列表
export const DELETE_MERCHANT = 'srvMerchant/delete' // 删除商家列表
export const EDIT_MERCHANT = 'srvMerchant' // 编辑商家列表
export const GET_MERCHANT_TYPE = 'srvMerchantType/list' // 获取机构类型
export const GET_MERCHANT_IMG = 'srvMerchantImg' // 获取单张照片
export const ADD_MERCHANT = 'srvMerchant/add' // 增加商家列表
export const GET_TYPE_LIST = 'srvMerchantType/list' // 获取类型列表
export const COMMON_TYPE_LIST = 'srvMerchantType' // 新增类型 POST 删除类型 DELETE 修改类型 PUT

/**
 * 服务管理
 */
export const GET_SERVICE_LIST = 'srvServiceDetail/mine/list' // 获取服务列表 GET
export const COMMON_SERVICE_LIST = 'srvServiceDetail' // 新增服务 POST 删除服务 DELETE 修改服务 PUT
export const GET_SERVICE_RECORD = 'srvServiceOrder/mine/list' // 获取服务订单
export const COMMON_SERVICE_RECORD = 'srvServiceOrder' // 新增服务订单 POST 删除服务订单 DELETE 修改服务 PUT
/**
 * 订单管理
 */
export const GET_ORDER_LIST = 'srvServiceOrder/mine/list' // 获取订单列表
export const UPDATE_ORDER = 'srvServiceOrder' // 修改单个订单
/**
 * 图片管理
 */
export const GET_SLIDESHOW_LIST = 'syspic/all' // 获取轮播图列表
export const EDIT_SLIDESHOW = 'syspic' // 新增 修改 删除 轮播图
/**
 * 商品管理
 */
export const GET_GOODS_LIST = 'srvGoods/mine/list' // 获取商品列表
export const GOODS = 'srvGoods' // 获取商品列表
export const GET_ONE_GOODS = 'srvGoods/one' // 获取单个商品
export const GET_COLLECT_LIST = 'srvGoodsCollect/mine/userCollectList' // 获取商品收藏列表
export const COLLECT = 'srvGoodsCollect' // 商品收藏的增删改查
export const GET_GOODS_TYPE_LIST = 'srvGoodsType/list' // 商品类型列表
export const GOODS_TYPE = 'srvGoodsType' // 商品类型的增删改查
