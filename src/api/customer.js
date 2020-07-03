// 客户列表
const getCustomers = ({ $axios }, data) =>
  $axios.get(`/alm/loanReceipt/getListByParams`, { params: data });

export { getCustomers };
