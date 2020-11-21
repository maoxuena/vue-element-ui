<template>
  <div class="header-container">
    <slot />
    <el-button class="logout"
               @click.native="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    async logout () {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }

}
</script>

<style lang="scss" scoped>
.logout {
  float: right;
  margin-top: 12px;
  margin-right: 10px;
}
</style>
