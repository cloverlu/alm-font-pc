// 检查审批按钮
const saveEditModelBusiness = ({ $axios }, data) =>
  $axios.get(`/alm/postLoan/business/editModelBusiness`, data);

// 流程上报按钮
const approve = ({ $axios }, data) => $axios.post(`/alm/approve/save`, data);

// 检查审批详情
const queryForDetail = ({ $axios }, data) =>
  $axios.post(`/alm/postLoan/business/queryForBizDtail`, data);

export { saveEditModelBusiness, approve, queryForDetail };
