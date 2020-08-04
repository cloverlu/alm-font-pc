// 获取邮储用户信息
const getUserInfo = ({ $axios }, data) =>
  $axios.get(`/alm/employee/getUserInfo`, { params: data });

//用户列表
const getUsers = ({ $axios }, data) =>
  $axios.get(`/alm/employee/getListByParams`, { params: data });

// 增加用户
const addUser = ({ $axios }, data) => $axios.post(`/alm/employee/save`, data);

// 编辑用户
const updateUser = ({ $axios }, data) =>
  $axios.post(`/alm/employee/update`, data);

// 删除用户
const deleteUser = ({ $axios }, data) =>
  $axios.get(`/alm/employee/delete`, { params: data });

// 用户详情
const getUserDetail = ({ $axios }, data) =>
  $axios.get(`/alm/employee/findById`, { params: data });

// 岗位列表
const getPostList = ({ $axios }, data) =>
  $axios.get(`/alm/dict/getPostList`, { params: data });

export {
  getUserInfo,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  getPostList,
  getUserDetail,
};
