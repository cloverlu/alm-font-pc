// 报表统计查询
const getReportFormStatistics = ({ $axios }, data) =>
  $axios.get(`/alm/postLoan/business/reportFormStatistics`, { params: data });

// 明细信息列表
const getReportFormList = ({ $axios }, data) =>
  $axios.post(`/alm/postLoan/business/reportFormList`, data);

export { getReportFormStatistics, getReportFormList };
