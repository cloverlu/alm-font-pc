//客户列表
const getUsers = ({ $axios }, data) =>
  $axios.get(`/alm/employee/getListByParams`, { params: data });

export { getUsers };
