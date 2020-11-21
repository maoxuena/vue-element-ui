<template>
  <div v-if="!menuInfo.hidden"
       class="menu-wrapper">
    <!-- 无子菜单 -->
    <el-menu-item v-if="!menuInfo.children"
                  :index="menuInfo.path">
      <!-- 图标 -->
      <svg-icon v-if="menuInfo.meta&&menuInfo.meta.icon"
                :icon-class="menuInfo.meta.icon" />
      <!-- 文本 -->
      <span slot="title">{{menuInfo.meta.title}}</span>
    </el-menu-item>
    <template v-else-if="menuInfo.children&&(!menuInfo.meta||!menuInfo.meta.title)">
      <sub-menu v-for="item in menuInfo.children"
                :menu-info="item"
                :key="item.path"></sub-menu>
    </template>
    <!-- 有子菜单 -->
    <el-submenu v-else
                :index="menuInfo.path"
                popper-append-to-body>
      <template slot="title">
        <!-- 图标 -->
        <svg-icon v-if="menuInfo.meta&&menuInfo.meta.icon"
                  :icon-class="menuInfo.meta.icon" />
        <!-- 文本 -->
        <span slot="title">{{menuInfo.meta.title}}</span>
      </template>
      <sub-menu v-for="item in menuInfo.children"
                :menu-info="item"
                :key="item.path"></sub-menu>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'sub-menu',
  props: {
    // route object
    menuInfo: {
      type: Object,
      required: true
    }
  }
}
</script>
