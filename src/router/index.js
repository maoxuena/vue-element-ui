import Vue from 'vue'
import VueRouter from 'vue-router'
/* BasicLayout */
import BasicLayout from '@/layout/BasicLayout'

Vue.use(VueRouter)

// 所有权限通用路由表
export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/Login')
  },
  {
    path: '/403',
    name: '403',
    hidden: true,
    component: () =>
      import(/* webpackChunkName: "exception" */ '@/views/Exception/403')
  },
  {
    path: '/404',
    name: '404',
    hidden: true,
    component: () =>
      import(/* webpackChunkName: "exception" */ '@/views/Exception/404')
  }
]
// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRoutes = [
  {
    path: '/',
    redirect: '/main',
    component: BasicLayout,
    children: [
      // 主页
      {
        path: '/main',
        name: 'main',
        meta: { icon: 'home', title: '主页' },
        component: () =>
          import(/* webpackChunkName: "main" */ '@/views/Main')
      }
    ]
  },
  // 图表
  {
    path: '/charts',
    redirect: '/charts/echarts',
    name: 'charts',
    component: BasicLayout,
    meta: { icon: 'chart', title: '图表' },
    children: [
      {
        path: '/charts/echarts',
        name: 'echarts',
        meta: { icon: 'ECharts', title: 'Echarts' },
        component: { render: h => h('router-view') },
        children: [
          {
            path: '/charts/echarts/line-charts',
            name: 'line-charts',
            meta: { title: '折线图' },
            component: () =>
              import(/* webpackChunkName: "echarts" */ '@/views/Charts/ECharts/LineCharts')
          },
          {
            path: '/charts/echarts/bar-charts',
            name: 'bar-charts',
            meta: { title: '柱状图' },
            component: () =>
              import(/* webpackChunkName: "echarts" */ '@/views/Charts/ECharts/BarCharts')
          }
        ]
      },
      {
        path: '/charts/d3',
        name: 'd3',
        meta: { icon: 'd3', title: 'D3' },
        component: () =>
          import(/* webpackChunkName: "d3" */ '@/views/Charts/D3')
      }
    ]
  },
  // 地图
  {
    path: '/map',
    redirect: '/map/amap',
    name: 'map',
    component: BasicLayout,
    meta: { icon: 'map', title: '地图' },
    children: [
      {
        path: '/map/amap',
        name: 'amap',
        meta: { icon: 'amap', title: '高德地图' },
        component: () =>
          import(/* webpackChunkName: "amap" */ '@/views/Map/AMap')
      }
    ]
  },
  // 虚拟身份
  {
    path: '/virtual',
    redirect: '/virtual/list',
    name: 'virtual',
    component: BasicLayout,
    meta: { icon: 'solution', title: '虚拟身份' },
    children: [
      {
        path: '/virtual/list',
        name: 'virtualList',
        meta: { icon: 'unorderedlist', title: '虚拟身份列表' },
        component: () =>
          import(/* webpackChunkName: "virtual" */ '@/views/Virtual/List')
      },
      {
        path: '/virtual/settings',
        name: 'virtualSettings',
        meta: { icon: 'setting', title: '虚拟身份设置' },
        component: { render: h => h('router-view') },
        children: [
          {
            path: '/virtual/settings/account',
            name: 'virtualSettingsAccount',
            meta: { title: '账号设置' },
            component: () =>
              import(/* webpackChunkName: "virtual" */ '@/views/Virtual/Settings/Account')
          },
          {
            path: '/virtual/settings/type',
            name: 'virtualSettingsType',
            meta: { title: '类型设置' },
            component: () =>
              import(/* webpackChunkName: "virtual" */ '@/views/Virtual/Settings/Type')
          }
        ]
      }
    ]
  },
  // 个人页
  {
    path: '/account',
    redirect: '/account/center',
    component: BasicLayout,
    children: [
      {
        path: '/account/center',
        name: 'accountCenter',
        meta: { icon: 'user', title: '个人中心' },
        component: () =>
          import(/* webpackChunkName: "account" */ '@/views/Account/Center')
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new VueRouter({
  // mode: 'history', // 改为history模式方便服务端渲染做SEO
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
