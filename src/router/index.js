import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../Layout/index.vue";
import Login from "../views/login/index.vue";

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
    // redirect: "/login",
    component: Login,
  },
  // 待办提醒
  {
    path: "/toDoList",
    component: Layout,
    redirect: "/toDoList/taskList",
    name: "待办提醒",
    meta: { title: "待办提醒" },
    children: [
      {
        path: "taskList",
        component: () => import("@/views/toDoList/taskList"),
        name: "任务列表",
        meta: { title: "任务列表", noCache: true },
      },
    ],
  },
  // 用户管理
  {
    path: "/user",
    component: Layout,
    redirect: "/user/index",
    name: "用户管理",
    meta: { title: "用户管理" },
    children: [
      {
        path: "index",
        component: () => import("@/views/user/userList"),
        name: "用户列表",
        meta: { title: "用户列表", noCache: true },
      },
    ],
  },
  // 客户管理
  {
    path: "/customer",
    component: Layout,
    redirect: "/customer/index",
    name: "客户管理",
    meta: { title: "客户管理" },
    children: [
      {
        path: "index",
        component: () => import("@/views/customer/customerList"),
        name: "客户列表",
        meta: { title: "客户列表", noCache: true },
      },
    ],
  },
  // 台账管理
  {
    path: "/standingBook",
    component: Layout,
    redirect: "/standingBook/index",
    name: "台账管理",
    meta: { title: "台账管理" },
    children: [
      {
        path: "index",
        component: () => import("@/views/standingBook/standingBookList"),
        name: "借据台账",
        meta: { title: "借据台账", noCache: true },
      },
    ],
  },
  // 流程管理
  {
    path: "/processManagement",
    component: Layout,
    redirect: "/processManagement/taskList",
    name: "流程管理",
    meta: { title: "流程管理" },
    children: [
      {
        path: "taskList",
        component: () => import("@/views/processManagement/taskList"),
        name: "任务列表",
        meta: { title: "任务列表", noCache: true },
      },
    ],
  },
  // 报表管理
  {
    path: "/reportManagement",
    component: Layout,
    redirect: "/reportManagement/detailedInfoList",
    name: "报表管理",
    meta: { title: "报表管理" },
    children: [
      {
        path: "detailedInfoList",
        component: () => import("@/views/reportManagement/detailedInfoList"),
        name: "明细信息",
        meta: { title: "明细信息", noCache: true },
      },
      {
        path: "statisticalInfoList",
        component: () => import("@/views/reportManagement/statisticalInfoList"),
        name: "统计信息",
        meta: { title: "统计信息", noCache: true },
      },
    ],
  },
  // 业务管理
  {
    path: "/businessManagement",
    component: Layout,
    redirect: "/businessManagement/businessList",
    name: "业务管理",
    meta: { title: "业务管理" },
    children: [
      {
        path: "businessList",
        component: () => import("@/views/toDoList/taskList"),
        name: "业务列表",
        meta: { title: "业务列表" },
        // children: [
        //   {
        //     path: "inspectionApplication",
        //     component: () =>
        //       import("@/views/businessManagement/inspectionApplication"),
        //     name: "检查申请",
        //     meta: { title: "检查申请", noCache: true },
        //   },
        // ],
      },
      {
        path: "iouList",
        component: () => import("@/views/businessManagement/iouList"),
        name: "借据列表",
        meta: { title: "借据列表", noCache: true },
        // children: [
        //   {
        //     path: "inspectionApplication",
        //     component: () =>
        //       import("@/views/businessManagement/inspectionApplication"),
        //     name: "检查申请",
        //     meta: { title: "检查申请", noCache: true },
        //   },
        // ],
      },
      {
        path: "inspectionApplication",
        component: () =>
          import("@/views/businessManagement/inspectionApplication"),
        name: "检查申请",
        meta: { title: "检查申请", noCache: true },
      },
    ],
  },
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
