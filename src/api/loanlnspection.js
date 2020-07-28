// 检查审批按钮
const saveEditModelBusiness = ({ $axios }, data) =>
  $axios.post(`/alm/postLoan/business/editModelBusiness`, data);

// 流程上报详情
const approveDetail = ({ $axios }, data) =>
  $axios.get(`/alm/approve/queryForProcess`, { params: data });

// 流程上报按钮
const approve = ({ $axios }, data) => $axios.post(`/alm/approve/save`, data);

// 获取流程上报 业务接收人数组
const getNextEmplName = ({ $axios }, data) =>
  $axios.get(`/alm/approve/queryNextEmplNameList`, { params: data });

// 检查审批详情
const queryForDetail = ({ $axios }, data) =>
  $axios.get(`/alm/postLoan/business/queryForDtail`, { params: data });

// 检查审批详情
const queryForBizDtail = ({ $axios }, data) =>
  $axios.get(`/alm/postLoan/business/queryForBizDtail`, { params: data });

export {
  saveEditModelBusiness,
  approveDetail,
  approve,
  getNextEmplName,
  queryForDetail,
  queryForBizDtail,
};
