// 客户列表
const getCustomers = ({ $axios }, data) =>
  $axios.post(`/alm/loanReceipt/getListByParams`, data);

export { getCustomers, menuList };

const menuList = [
  {
    name: "用户管理",
    icon: "el-icon iconyonghuguanli-01",
    children: [
      {
        name: "用户列表",
        path: "user/index",
      },
    ],
  },
  {
    name: "业务管理",
    icon: "el-icon iconyewuguanli-01",
    children: [
      {
        name: "业务列表",
        path: "businessManagement/businessList",
      },
      {
        name: "检查申请",
        path: "businessManagement/inspectionApplication",
      },
      {
        name: "借据列表",
        path: "businessManagement/iouList",
      },
    ],
  },
  {
    name: "台账管理",
    icon: "el-icon icontaizhangguanli-01",
    children: [
      {
        name: "借据台账",
        path: "standingBook/index",
      },
    ],
  },
  {
    name: "报表管理",
    icon: "el-icon iconbaobiaoguanli-01",
    children: [
      {
        name: "统计信息",
        path: "reportManagement/statisticalInfoList",
      },
      {
        name: "明细信息",
        path: "reportManagement/detailedInfoList",
      },
    ],
  },
  {
    name: "流程管理",
    icon: "el-icon iconliuchengguanli-01",
    children: [
      {
        name: "任务列表",
        path: "processManagement/taskList",
      },
    ],
  },
  {
    name: "待办提醒",
    icon: "el-icon icondaibantixing-01",
    children: [
      {
        name: "任务列表",
        path: "toDoList/taskList",
      },
    ],
  },
  {
    name: "客户管理",
    icon: "el-icon iconkehuguanli-01",
    children: [
      {
        name: "客户列表",
        path: "customer/index",
      },
    ],
  },
];
