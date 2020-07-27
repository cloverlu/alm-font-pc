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

// 防抖
// Vue.directive(
//   "antiShake" /*修改elementUI中el-dialog顶部的距离,传入值eg:{marginTop:'5vh'} */,
//   {
//     bind(el, binding) {
//       let executeFunction;
//       if (binding.value instanceof Array) {
//         const [func, time = 1000] = binding.value;
//         executeFunction = antiShake(func, time);
//       } else {
//         executeFunction = antiShake(binding.value, 1000);
//       }
//       el.addEventListener("click", executeFunction);
//     },
//   }
// );

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
