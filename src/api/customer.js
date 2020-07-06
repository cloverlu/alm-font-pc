// 客户列表
const getCustomers = ({ $axios }, data) =>
  $axios.post(`/alm/loanReceipt/getListByParams`, data);

export { getCustomers };
