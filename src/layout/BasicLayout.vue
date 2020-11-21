<template>
  <div class="app-wrapper"
       :class="classObj">
    <sidebar-menu class="sidebar-container" />
    <div class="main-container">
      <Header>
        <svg-icon icon-class="menu"
                  class="icon-menu"
                  @click="toggleSideBar" />
      </Header>
      <!-- <tags-view v-if="needTagsView" /> -->
      <breadcrumb class="breadcrumb-container" />
      <div class="main-content">
        <transition name="fade-transform"
                    mode="out-in">
          <keep-alive :include="cachedViews">
            <router-view :key="key"></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
    <right-panel>
      <setting-drawer>
      </setting-drawer>
    </right-panel>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SidebarMenu from './components/SidebarMenu'
import Header from './components/Header'
import SettingDrawer from './components/SettingDrawer'
import RightPanel from '@/components/RightPanel'
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'basic-layout',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      style: state => state.settings.style,
      theme: state => state.settings.theme,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj () {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        fixedHeader: this.fixedHeader,
        light: this.style === 'light',
        dark: this.style === 'dark',
        realDark: this.style === 'real-dark',
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    cachedViews () {
      return this.$store.state.tagsView.cachedViews
    },
    key () {
      return this.$route.path
    }
  },
  watch: {
    style (val) {
      console.log(this.style)
    }
  },
  components: {
    SidebarMenu,
    Header,
    SettingDrawer,
    RightPanel,
    Breadcrumb
  },
  created () {
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('app/toggleSideBar')
    }
  },
  mounted () {
  }
}
</script>
