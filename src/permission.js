import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // 无需令牌的白名单

router.beforeEach(async (to, from, next) => {
  // start progress bar
  if (to.path !== from.path) {
    NProgress.start()
  }

  // set page title
  document.title = getPageTitle(to.meta.title)

  // 获取令牌判断用户是否登录
  const hasToken = getToken()
  if (hasToken) {
    // 已登录
    if (to.path === '/login') {
      // 若已登录没有必要显示登录页，重定向至首页
      next({ path: '/' })
      NProgress.done()
    } else {
      // 去其他路由
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      // const hasRoutes = store.getters.permission_routes && store.getters.permission_routes.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { menuList, roles } = await store.dispatch('user/getInfo')

          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', { menuList, roles })

          // dynamically add accessible routes
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next({
            path: '/login',
            query: { redirect: to.path }
          })
          NProgress.done()
        }
      }
    }
  } else {
    // 未登录
    if (whiteList.indexOf(to.path) !== -1) {
      // 白名单中路由放过
      next()
    } else {
      // 其他重定向至登录页
      next({
        path: '/login',
        query: { redirect: to.path }
      })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
