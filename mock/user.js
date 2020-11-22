const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
    roles: ['admin'],
    menuList: [
      {
        path: '/',
        redirect: '/main',
        component: 'basicLayout',
        children: [
          // 主页
          {
            path: '/main',
            name: 'main',
            meta: { icon: 'home', title: '主页' },
            component: 'main'
          }
        ]
      },
      // 图表
      {
        path: '/charts',
        redirect: '/charts/echarts',
        name: 'charts',
        component: 'basicLayout',
        meta: { icon: 'chart', title: '图表' },
        children: [
          {
            path: '/charts/echarts',
            name: 'echarts',
            meta: { icon: 'ECharts', title: 'ECharts' },
            component: 'empty',
            children: [
              {
                path: '/charts/echarts/line-charts',
                name: 'line-charts',
                meta: { title: '折线图' },
                component: 'lineCharts'
              },
              {
                path: '/charts/echarts/bar-charts',
                name: 'bar-charts',
                meta: { title: '柱状图' },
                component: 'barCharts'
              }
            ]
          },
          {
            path: '/charts/d3',
            name: 'd3',
            meta: { icon: 'd3', title: 'D3' },
            component: 'd3'
          }
        ]
      },
      // 地图
      {
        path: '/map',
        redirect: '/map/amap',
        name: 'map',
        component: 'basicLayout',
        meta: { icon: 'map', title: '地图' },
        children: [
          {
            path: '/map/amap',
            name: 'amap',
            meta: { icon: 'amap', title: '高德地图' },
            component: 'amap'
          }
        ]
      },
      // 虚拟身份
      {
        path: '/virtual',
        redirect: '/virtual/list',
        name: 'virtual',
        component: 'basicLayout',
        meta: { icon: 'solution', title: '虚拟身份' },
        children: [
          {
            path: '/virtual/list',
            name: 'virtualList',
            meta: { icon: 'unorderedlist', title: '虚拟身份列表' },
            component: 'virtualList'
          },
          {
            path: '/virtual/settings',
            name: 'virtualSettings',
            meta: { icon: 'setting', title: '虚拟身份设置' },
            component: 'empty',
            children: [
              {
                path: '/virtual/settings/account',
                name: 'virtualSettingsAccount',
                meta: { title: '账号设置' },
                component: 'virtualSettingsAccount'
              },
              {
                path: '/virtual/settings/type',
                name: 'virtualSettingsType',
                meta: { title: '类型设置' },
                component: 'virtualSettingsType'
              }
            ]
          }
        ]
      },
      // 个人页
      {
        path: '/account',
        redirect: '/account/center',
        component: 'basicLayout',
        children: [
          {
            path: '/account/center',
            name: 'accountCenter',
            meta: { icon: 'user', title: '个人中心' },
            component: 'accountCenter'
          }
        ]
      }
    ]
  },
  'editor-token': {
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor',
    roles: ['editor'],
    menuList: [
      {
        name: '主页',
        icons: 'home',
        path: '/main',
        children: []
      },
      {
        name: '个人中心',
        icons: 'unorderedlist',
        path: '/account/center'
      }
    ]
  }
}

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: '用户名或密码错误！'
        }
      }

      return {
        code: 200,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/user/info',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: '登录失败，无法获取用户详细信息！'
        }
      }

      return {
        code: 200,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  }
]
