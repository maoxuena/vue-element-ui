// import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'

const { showSettings, tagsView, fixedHeader, sidebarLogo, style } = defaultSettings

const state = {
  theme: localStorage.getItem('theme') || '',
  style: localStorage.getItem('style') || style,
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: localStorage.getItem('fixedHeader') ? (localStorage.getItem('fixedHeader') === 'true') : fixedHeader,
  sidebarLogo: sidebarLogo
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
      localStorage.setItem(key, value)
    }
  }
}

const actions = {
  changeSetting ({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
