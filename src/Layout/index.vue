<!--
  功能：布局
  作者：sunhua
  邮箱：947545659@qq.com
  时间：2020年07月02日 08:54:09
-->
<template>
  <div class="app-wrapper">
    <header-top class="headerBox" />
    <div class="content">
      <side-bar class="sidebar-container" />
      <div class="main-container">
        <app-main />
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "./components/SideBar.vue";
import Header from "./components/Header.vue";
import AppMain from "./components/AppMain.vue";
export default {
  name: "Layout",
  components: {
    "app-main": AppMain,
    "header-top": Header,
    "side-bar": SideBar
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  .headerBox {
    width: 100%;
    height: 75px;
  }
  .content {
    width: 100%;
    height: calc(100% - 75px);
    display: flex;
    .sidebar-container {
      height: 100%;
      width: 220px;
    }
    .main-container {
      height: 100%;
      flex: 1;
    }
  }
}
</style>
