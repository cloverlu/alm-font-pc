import Vue from "vue";
import { antiShake } from "../utils/antiShake";
// 防抖
Vue.directive(
  "antiShake" /*修改elementUI中el-dialog顶部的距离,传入值eg:{marginTop:'5vh'} */,
  {
    bind(el, binding) {
      let executeFunction;
      if (binding.value instanceof Array) {
        const [func, time = 1000] = binding.value;
        executeFunction = antiShake(func, time);
      } else {
        executeFunction = antiShake(binding.value, 1000);
      }
      el.addEventListener("click", executeFunction);
    },
  }
);
