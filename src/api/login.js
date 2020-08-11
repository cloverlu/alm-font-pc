/*
 * @Date: 2020-07-02 20:07:26
 * @Author: sunhua
 * @Describe: 登录以及修改密码
 * @LastEditTime: 2020-08-04 16:41:26
 * @FilePath: \alm-font-pc\src\api\login.js
 */
// 登陆
const login = ({ $axios }, data) =>
  $axios.post(`/alm/empl/logInOrlogOut`, data);

// 修改密码
const changePassword = ({ $axios }, data) =>
  $axios.post(`/alm/empl/logInOrlogOut`, data);

// 用户信息查询
const getUserDetail = ({ $axios }, data) =>
  $axios.get(`/alm/empl/logInOrlogOut`, { params: data });

export { login, changePassword, getUserDetail };
