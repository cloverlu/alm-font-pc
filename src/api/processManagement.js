// 查询
const getTaskList = ({ $axios }, data) =>
  $axios.post(`/alm/postLoan/business/postLoanChecklistForPc`, data);

// 修改
const changeTask = ({ $axios }, data) =>
  $axios.post(`/alm/postLoan/business/reportFormList`, data);

// 下载
const outPutTaskList = ({ $axios }, data) =>
  $axios.get(`/alm/postLoan/model/downZipPdfFile`, { params: data });

// 预览
const previewPDF = ({ $axios }, data) =>
  $axios.get(`/alm/postLoan/model/viewPdfFile`, { params: data });

export { getTaskList, changeTask, outPutTaskList, previewPDF };
