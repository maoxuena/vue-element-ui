<template>
  <div class="drawer-content">
    <h3 class="drawer-title">整体风格设置</h3>
    <div class="drawer-item">
      <div class="style-item">
        <span class="style-item-check">
          <svg-icon icon-class="lightstyle"
                    @click="styleChange('light')" />
          <svg-icon v-if="style === 'light'"
                    class="icon-check"
                    :style="{ color: theme }"
                    icon-class="check" />
        </span>
      </div>
      <div class="style-item">
        <span class="style-item-check">
          <svg-icon icon-class="darkstyle"
                    @click="styleChange('dark')" />
          <svg-icon v-if="style === 'dark'"
                    class="icon-check"
                    :style="{ color: theme }"
                    icon-class="check" />
        </span>
      </div>
      <div class="style-item">
        <span class="style-item-check">
          <svg-icon icon-class="realdarkstyle"
                    @click="styleChange('real-dark')" />
          <svg-icon v-if="style === 'real-dark'"
                    class="icon-check"
                    :style="{ color: theme }"
                    icon-class="check" />
        </span>
      </div>
    </div>
    <div class="drawer-item">
      <span>主题色</span>
      <theme-picker class="color-picker"
                    @change="themeChange" />
    </div>
    <div class="drawer-item">
      <span>固定 Header</span>
      <el-switch v-model="fixedHeader"></el-switch>
    </div>
  </div>
</template>

<script>
import ThemePicker from '@/components/ThemePicker'
export default {
  name: 'setting-drawer',
  computed: {
    style () {
      return this.$store.state.settings.style
    },
    theme () {
      return this.$store.state.settings.theme
    },
    fixedHeader: {
      get () {
        return this.$store.state.settings.fixedHeader
      },
      set (val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'fixedHeader',
          value: val
        })
      }
    }
  },
  components: {
    ThemePicker
  },
  created () {
  },
  methods: {
    themeChange (val) {
      this.$store.dispatch('settings/changeSetting', {
        key: 'theme',
        value: val
      })
    },
    styleChange (val) {
      this.$store.dispatch('settings/changeSetting', {
        key: 'style',
        value: val
      })
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
// 整体风格设置
.drawer-content {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin: 0;
    color: #696969;
    font-size: 14px;
    font-weight: normal;
    line-height: 22px;
  }

  .drawer-item {
    display: flex;
    margin-top: 12px;

    .style-item {
      flex: 1;
      font-size: 48px;

      .style-item-check {
        position: relative;

        .icon-check {
          position: absolute;
          right: 3px;
          bottom: 15px;
          font-size: 14px;
        }
      }

      .svg-icon {
        cursor: pointer;
      }
    }

    span {
      flex: 1 1;
      color: #696969;
    }

    .color-picker {
      flex: 0 0 auto;
      height: 26px;
      margin: -3px 8px 0 0;
    }
  }
}
</style>
