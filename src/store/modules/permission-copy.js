import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param menuList
 * @param route
 */
function hasPermission (menuList, route) {
  return menuList.some(item => {
    return route.meta.title === item.name
  })
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param menuList
 */
export function filterAsyncRoutes (routes, menuList) {
  const res = []
  routes.forEach((route, index) => {
    const tmp = { ...route }
    if (tmp.children) {
      if (tmp.meta && tmp.meta.title) { // 有title有children
        if (hasPermission(menuList, tmp)) {
          let index = menuList.findIndex((value, index) => {
            return value.name === tmp.meta.title
          })

          tmp.children = filterAsyncRoutes(tmp.children, menuList[index].children)
          res.push(tmp)
        }
      } else { // 无title有children
        tmp.children = filterAsyncRoutes(tmp.children, menuList)
        res.push(tmp)
        // res.push(arr)
      }
    } else {
      if (tmp.meta && tmp.meta.title) { // 有title无children
        if (hasPermission(menuList, tmp)) {
          res.push(tmp)
        }
      } else { // 无title无children
        res.push(tmp)
      }
    }
  })

  return res
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
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else if (!menuList.length) {
        accessedRoutes = []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, menuList)
      }
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
