/*
 * @Date: 2020-07-27 14:21:19
 * @Author: sunhua
 * @Describe:
 * @LastEditTime: 2020-08-01 18:30:36
 * @FilePath: \alm-font-pc\src\main.js
 */

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import moment from "moment";
import VueCookies from "vue-cookies";
import ElementUI from "element-ui";
// import { antiShake } from "./utils/antiShake.js";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/style/global.css";
import "./assets/iconfont/iconfont.css";
import "./directives";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$moment = moment;
Vue.use(ElementUI);
Vue.use(VueCookies);

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    //如果未匹配到路由
    from.name ? next({ name: from.name }) : next("/"); //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
  } else {
    next(); //如果匹配到正确跳转
  }
});

// 弹窗高度
Vue.directive(
  "alterELDialogMarginTop" /*修改elementUI中el-dialog顶部的距离,传入值eg:{marginTop:'5vh'} */,
  {
    inserted(el, binding) {
      el.firstElementChild.style.marginTop = binding.value.marginTop;
    },
  }
);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
