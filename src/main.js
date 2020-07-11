import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import moment from "moment";
import VueCookies from "vue-cookies";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/style/global.css";
import "./assets/iconfont/iconfont.css";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$moment = moment;
Vue.use(ElementUI);
Vue.use(VueCookies);

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
