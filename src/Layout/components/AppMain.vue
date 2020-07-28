<!--
  功能：右下角主内容
  作者：sunhua
  邮箱：947545659@qq.com
  时间：2020年07月02日 08:54:09
-->
<template>
  <div class="app-main">
    <div class="breadcrumbBox">
      <i class="el-icon-menu"></i>
      <el-breadcrumb class="breadcrumbContent">
        <el-breadcrumb-item
          v-for="item in levelList"
          :key="item.path"
          :to="item.path"
        >{{item.meta.title}}</el-breadcrumb-item>
        <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/">活动管理</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>-->
      </el-breadcrumb>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "AppMain",
  data() {
    return {
      levelList: []
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  created() {
    this.getBreadcrumb();
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.path;
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name);
      this.levelList = matched;
      // console.log("this.levelList", this.levelList);
    }
  }
};
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: rgba(236, 238, 242, 1);
}
.breadcrumbBox {
  height: 54px;
  line-height: 54px;
  font-size: 18px;
  padding-left: 10px;
  font-weight: bold;
  line-height: 54px;
  color: rgba(78, 120, 222, 1);
  letter-spacing: 0px;
  opacity: 1;
  border-bottom: 1px solid rgba(113, 113, 113, 1);
  .breadcrumbContent {
    display: inline-block;
    color: rgba(78, 120, 222, 1);
    margin-left: 10px;
  }
}
.content {
  height: calc(100% - 130px);
  width: calc(100% - 2 * 27px);
  box-sizing: border-box;
  margin: 27px;
  margin-bottom: 27px;
  overflow: auto;
  // padding-bottom: 27px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(223, 229, 231, 1);
  opacity: 1;
  border-radius: 2px;
}
// .fixed-header + .app-main {
//   padding-top: 50px;
// }
// .hasTagsView {
//   .app-main {
//     min-height: calc(100vh - 84px);
//   }
//   .fixed-header + .app-main {
//     padding-top: 84px;
//   }
// }
</style>

<style lang="scss">
// .el-popup-parent--hidden {
//   .fixed-header {
//     padding-right: 15px;
//   }
// }
</style>
