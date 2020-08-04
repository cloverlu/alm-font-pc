/*
 * @Date: 2020-07-03 11:47:00
 * @Author: sunhua
 * @Describe:
 * @LastEditTime: 2020-08-01 17:03:20
 * @FilePath: \alm-font-pc\src\api\customer.js
 */

// 客户列表
const getCustomers = ({ $axios }, data) =>
  $axios.post(`/alm/loanReceipt/getListByParams`, data);

export { getCustomers, menuList };

const menuList = [
  {
    name: "人员管理",
    icon: "el-icon iconyonghuguanli-01",
    children: [
      {
        name: "人员列表",
        path: "user/index",
      },
    ],
  },
  {
    name: "借据导入",
    icon: "el-icon icontaizhangguanli-01",
    children: [
      {
        name: "借据台账",
        path: "standingBook/index",
      },
    ],
  },
  {
    name: "统计查询",
    icon: "el-icon iconbaobiaoguanli-01",
    children: [
      {
        name: "信息汇总",
        path: "reportManagement/statisticalInfoList",
      },
      {
        name: "明细信息",
        path: "reportManagement/detailedInfoList",
      },
    ],
  },
  {
    name: "报告下载",
    icon: "el-icon iconliuchengguanli-01",
    children: [
      {
        name: "客户经理报告下载",
        path: "processManagement/managerDownload",
      },
      {
        name: "管理岗报告下载",
        path: "processManagement/administrationDownload",
      },
    ],
  },
  {
    name: "我的工作",
    icon: "el-icon icondaibantixing-01",
    children: [
      {
        name: "待办任务",
        path: "toDoList/taskList",
      },
      {
        name: "已办任务",
        path: "toDoList/finishedTaskList",
      },
    ],
  },
  {
    name: "我的客户",
    icon: "el-icon iconkehuguanli-01",
    children: [
      {
        name: "客户列表",
        path: "customer/index",
      },
      {
        name: "借据列表",
        path: "customer/iouList",
      },
    ],
  },
];
