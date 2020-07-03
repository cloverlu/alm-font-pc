// 登陆
const login = ({ $axios }, data) =>
  $axios.post(`/alm/empl/logInOrlogOut`, data);

export { login };
