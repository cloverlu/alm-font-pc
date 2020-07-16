<!--
  功能：菜单导航
  作者：sunhua
  邮箱：947545659@qq.com
  时间：2020年07月02日 08:54:09
-->
<template>
  <div class="sideBar">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      unique-opened
      text-color="rgba(255,255,255,0.5)"
      active-text-color="#fff"
      router
      :default-openeds="open_list"
      :default-active="defaultActive"
    >
      <el-submenu v-for="(item,index) in subMenuArr" :index="String(index)" :key="index">
        <template slot="title">
          <i :class="item.icon" style="color:#FFF"></i>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="i in item.children"
            :index="i.index"
            :key="i.index"
            :route="i.path"
          >{{i.name}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- <el-submenu index="1">
        <template slot="title">
          <i class="el-icon el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" :route="{ path: '/Layout/user/index' }">用户列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon el-icon-menu"></i>
          <span>业务管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1" :route="{ path: '/Layout/businessManagement/businessList'}">业务列表</el-menu-item>
          <el-menu-item
            index="2-2"
            :route="{ path: '/Layout/businessManagement/inspectionApplication'}"
          >检查申请</el-menu-item>
          <el-menu-item index="2-3" :route="{ path: '/Layout/businessManagement/iouList'}">借据列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon el-icon-document"></i>
          <span>台账管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1" :route="{ path: '/Layout/standingBook/index'}">借据台账</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon el-icon-menu"></i>
          <span>报表管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            index="4-1"
            :route="{ path: '/Layout/reportManagement/statisticalInfoList'}"
          >统计信息</el-menu-item>
          <el-menu-item
            index="4-2"
            :route="{ path: '/Layout/reportManagement/detailedInfoList'}"
          >明细信息</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon el-icon-document"></i>
          <span>流程管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="5-1" :route="{ path: '/Layout/processManagement/taskList'}">任务列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <i class="el-icon el-icon-document"></i>
          <span>待办提醒</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="6-1" :route="{ path: '/Layout/toDoList/taskList'}">任务列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="7">
        <template slot="title">
          <i class="el-icon el-icon-document"></i>
          <span>客户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="7-1" :route="{ path: '/Layout/customer/index' }">客户列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>-->
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open_list: [""],
      subMenuArr: [],
      defaultActive: ""
    };
  },
  methods: {
    getPath() {
      console.log("this.$route.path", this.$route.path);
      this.defaultActive = this.$route.path;
    },
    getMenuList() {
      const arr = JSON.parse(localStorage.getItem("menuList"));
      arr.map(item => {
        item.icon = "el-icon" + " iconfont " + item.icon;
        if (item.children && item.children.length) {
          item.children.map(i => {
            (i.path = `/${i.path}`), (i.index = `${i.path}`);
          });
        }
        return arr;
      });
      this.subMenuArr = arr;
      // console.log("this.subMenuArr", this.subMenuArr);
    }
  },
  mounted() {
    this.getMenuList();
    this.getPath();
    // console.log(this.$route.path);
    // const { custName } = this.$route.query;
  },
  watch: {
    $route: "getPath"
  }
};
</script>

<style lang="scss" scoped>
.sideBar {
  width: 100%;
  height: 100%;
  .el-submenu /deep/ .el-submenu__title {
    color: rgba(255, 255, 255, 1);
    opacity: 0.7;
    padding: 0;
    padding-left: 0 !important;
    span {
      color: rgba(255, 255, 255, 1);
      opacity: 0.7;
    }
  }
  .el-menu {
    width: 220px;
    height: 100%;
    min-height: 400px;
    .el-icon {
      margin-right: 33px;
      margin-left: 33px;
    }
    .el-menu-item-group {
      /deep/.el-menu-item {
        padding-left: 80px !important;
      }
    }
  }
}
</style>
