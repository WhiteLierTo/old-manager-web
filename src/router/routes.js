export default [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () =>
            import ('../view/home/home.vue'),
        meta: {
            title: '养老服务资源网',
            requireAuth: true,
            keepAlive: false // 不需要被缓存
        },
        children: [{
                path: '/personal-list',
                name: 'personal-list',
                component: () =>
                    import ('../view/user/personal-list.vue'),
                meta: {
                    title: '个人列表',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                }
            },
            {
                path: '/personal-center',
                name: 'personal-center',
                component: () =>
                    import ('../view/login/personal-center.vue'),
                meta: {
                    title: '个人中心',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                }
            },
            {
                path: '/merchant-list',
                name: 'merchant-list',
                component: () =>
                    import ('../view/organization/merchant-list.vue'),
                meta: {
                    title: '商家列表',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                }
            },
            {
                path: '/add-merchant',
                name: 'add-merchant',
                component: () =>
                    import ('../view/organization/add-merchant.vue'),
                meta: {
                    title: '新增商家',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                }
            },
            {
                path: '/edit-merchant',
                name: 'edit-merchant',
                component: () =>
                    import ('../view/organization/edit-merchant.vue'),
                meta: {
                    title: '商家编辑',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                }
            },
            {
                path: '/merchant-type-list',
                name: 'merchant-type-list',
                component: () =>
                    import ('../view/organization/merchant-type-list.vue'),
                meta: {
                    title: '类型列表',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                }
            },
            {
                path: '/information-list',
                name: 'information-list',
                component: () =>
                    import ('../view/information/information-list.vue'),
                meta: {
                    title: '消息列表',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                }
            },
            {
                path: '/add-information',
                name: 'add-information',
                component: () =>
                    import ('../view/information/add-information.vue'),
                meta: {
                    title: '新增消息',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                }
            },


            {
                path: '/message-list',
                name: 'message-list',
                component: () =>
                    import ('../view/information/message-list.vue'),
                meta: {
                    title: '资讯列表',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                }
            },
            {
                path: '/add-message',
                name: 'add-message',
                component: () =>
                    import ('../view/information/add-message.vue'),
                meta: {
                    title: '资讯新增',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                }
            },

            {
                path: '/slogan',
                name: 'slogan',
                component: () =>
                    import ('../view/picture/slogan.vue'),
                meta: {
                    title: '宣传语管理',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                }
            },
            {
                path: '/slideshow',
                name: 'slideshow',
                component: () =>
                    import ('../view/picture/slideshow.vue'),
                meta: {
                    title: '轮播图管理',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                }
            },
            {
                path: '/merchant-service',
                name: 'merchant-service',
                component: () =>
                    import ('../view/organization/merchant-service.vue'),
                meta: {
                    title: '商家服务',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                }
            },

            {
                path: '/goods',
                name: 'goods',
                component: () =>
                    import ('../view/goods/goods.vue'),
                meta: {
                    title: '商品列表',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                }
            },
            {
                path: '/goods-collect',
                name: 'goodsCollect',
                component: () =>
                    import ('../view/goods/goods-collect.vue'),
                meta: {
                    title: '商品收藏页面',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                }
            },
            {
                path: '/goods-type',
                name: 'goodsType',
                component: () =>
                    import ('../view/goods/goods-type.vue'),
                meta: {
                    title: '商品类型页面',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                }
            },
            {
                path: '/add-goods',
                name: 'addGoods',
                component: () =>
                    import ('../view/goods/add-goods.vue'),
                meta: {
                    title: '新增商品',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                }
            },
            {
                path: '/edit-goods',
                name: 'editGoods',
                component: () =>
                    import ('../view/goods/edit-goods.vue'),
                meta: {
                    title: '商品修改',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                }
            },
            {
                path: '/service-list',
                name: 'serviceList',
                component: () =>
                    import ('../view/service/service-list.vue'),
                meta: {
                    title: '服务列表',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'home',
        component: () =>
            import ('../view/login/login.vue')
    }
]