import { constantRoutes } from '@/router'

// 组件名和组件映射表
const map = {
  // xx: require('@/views/xx.vue').default // 同步的方式
  // xx: () => import('@/views/xx.vue') // 异步的方式
  basicLayout: require('@/layout/BasicLayout').default,
  empty: { render: h => h('router-view') },
  main: () =>
    import(/* webpackChunkName: "main" */ '@/views/Main'),
  lineCharts: () =>
    import(/* webpackChunkName: "echarts" */ '@/views/Charts/ECharts/LineCharts'),
  barCharts: () =>
    import(/* webpackChunkName: "echarts" */ '@/views/Charts/ECharts/BarCharts'),
  d3: () =>
    import(/* webpackChunkName: "d3" */ '@/views/Charts/D3'),
  amap: () =>
    import(/* webpackChunkName: "amap" */ '@/views/Map/AMap'),
  virtualList: () =>
    import(/* webpackChunkName: "virtual" */ '@/views/Virtual/List'),
  virtualSettingsAccount: () =>
    import(/* webpackChunkName: "virtual" */ '@/views/Virtual/Settings/Account'),
  virtualSettingsType: () =>
    import(/* webpackChunkName: "virtual" */ '@/views/Virtual/Settings/Type')
}

// 遍历asyncRoutes，将component替换为map[component]
function mapComponent (asyncRoutes) {
  asyncRoutes.forEach(route => {
    route.component = map[route.component]
    if (route.children) {
      mapComponent(route.children)
    }
  })
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes ({ commit }, { menuList, roles }) {
    return new Promise(resolve => {
      let accessedRoutes = menuList
      mapComponent(accessedRoutes)
      console.log(accessedRoutes)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
