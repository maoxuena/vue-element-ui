<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu class="menu-vertical"
             :default-active="activeMenu"
             unique-opened
             :collapse-transition="false"
             router
             :background-color="style==='light'?'':variables.menuBg"
             :text-color="style==='light'?'#696969':'#fff'"
             :active-text-color="theme"
             :collapse="isCollapse">
      <sub-menu v-for="item in permission_routes"
                :menu-info="item"
                :key="item.path"></sub-menu>
    </el-menu>
  </el-scrollbar>
</template>

<script>

import { mapGetters, mapState } from 'vuex'
import variables from '@/styles/variables.scss'
import SubMenu from './SubMenu'
export default {
  name: 'sider-menu',
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    ...mapState({
      style: state => state.settings.style,
      theme: state => state.settings.theme
    }),
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      console.log(path)
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables () {
      return variables
    },
    isCollapse () {
      return !this.sidebar.opened
    }
  },
  components: {
    SubMenu
  }
}
</script>
