import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../Layout/index.vue";
import Login from "../views/login/index.vue";
import userList from "../views/user/userList.vue";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/",
    redirect: "/Layout/user/index",
  },
  {
    // path: "/index",
    path: "/Layout",

    // 你可以选择不同的layout组件
    component: Layout,
    name: "Layout",

    // 这里开始对应的路由都会显示在app-main中 如上图所示
    children: [
      // 用户列表
      {
        path: "user/index",
        // component: () => import("@/views/user/userList"),
        component: userList,
      },
      // 客户列表
      {
        path: "customer/index",
        component: () => import("@/views/customer/customerList"),
      },
      // 台账列表
      {
        path: "standingBook/index",
        component: () => import("@/views/standingBook/standingBookList"),
      },
      // 统计信息--报表管理
      {
        path: "reportManagement/detailedInfoList",
        component: () => import("@/views/reportManagement/detailedInfoList"),
      },
      // 统计信息--报表管理
      {
        path: "reportManagement/statisticalInfoList",
        component: () => import("@/views/reportManagement/statisticalInfoList"),
      },
      // 任务列表--代办提醒
      {
        path: "toDoList/taskList",
        component: () => import("@/views/toDoList/taskList"),
      },
      // 业务列表--业务管理
      {
        path: "businessManagement/businessList",
        component: () => import("@/views/toDoList/taskList"),
      },
      // 检查申请--业务管理
      {
        path: "businessManagement/inspectionApplication",
        component: () =>
          import("@/views/businessManagement/inspectionApplication"),
      },
      // 借据列表--业务管理
      {
        path: "businessManagement/iouList",
        component: () => import("@/views/businessManagement/iouList"),
      },
      // 任务列表--流程管理
      {
        path: "processManagement/taskList",
        component: () => import("@/views/processManagement/taskList"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
