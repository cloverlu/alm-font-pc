// 登陆
const login = ({ $axios }, data) => $axios.get(`/alm/empl/logInOrlogOut`, data);

export { login };
