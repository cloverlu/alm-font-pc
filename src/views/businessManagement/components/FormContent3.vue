<!--
 * @Date: 2020-07-09 15:42:42
 * @Author: sunhua
 * @Describe: 
 * @LastEditTime: 2020-08-03 09:17:22
 * @FilePath: \alm-font-pc\src\views\businessManagement\components\FormContent3.vue
--> 
<!--
  功能：FormContent2
  作者：sunhua
  邮箱：947545659@qq.com
  时间：2020年07月09日 10:46:30
-->
<template lang="pug">
  .formContent
     el-form(:model="params" :inline="true" label-position="top" label-width="80px" size="mini")
      el-row(:gutter="20")
        el-col(:span="12")
          el-form-item(label="近三个月的情况 :" style="width:96%")
            el-input(v-model="params.Inc3MSitu" type="textarea" :rows="3" clearable)
        el-col(:span="12")
          el-form-item(label="如剔除季节性因素后变动超30%，原因 :" style="width:96%")
            el-input(v-model="params.Chang30Msg" type="textarea" :rows="3" clearable)
</template>

<script>
export default {
  // 组件名称
  name: "FormContent3",
  // 组件参数 接收来自父组件的数据
  props: {
    info: {
      type: Array,
      default: () => []
    },
    detail: {
      type: Object,
      default: () => {}
    },
    type: {
      type: Number,
      default: () => 1
    },
    // 是否只读，只读的话disabled为true
    read: {
      type: Boolean,
      default: () => false
    }
  },
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      activeTab1: "first",
      params: {
        Inc3MSitu: "", //近三个月的情况
        Chang30Msg: "" //超过30%，原因
      }
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {},
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "../../../assets/style/global.scss";
.formContent {
  width: 100%;
  height: 100%;
}
</style>
