<!--
  功能：Tabform1
  作者：sunhua
  邮箱：947545659@qq.com
  时间：2020年07月09日 10:46:30
-->
<template lang="pug">
  .Tabform2
    //- tab1
    .cardTitle1
      span(class='blue')
      span(class='title1') 财务科目
    el-tabs(v-model="activeTab1" @tab-click="handleClick")
      el-tab-pane(label="应收票据" name="first")
      el-tab-pane(label="存货" name="second")
      el-tab-pane(label="私人借款" name="three")
      el-tab-pane(label="应付票据" name="four")
    .content1(v-show="activeTab1 == 'first'")
      form-content1
    .content1(v-show="activeTab1 == 'second'")
      form-content1
    .content1(v-show="activeTab1 == 'three'")
      form-content1
    .content1(v-show="activeTab1 == 'four'")
      form-content1
    //- tab2
    .cardTitle1
      span(class='blue')
      span(class='title1') 财务科目
    el-tabs(v-model="activeTab2" @tab-click="handleClick")
      el-tab-pane(label="应收账款" name="first")
      el-tab-pane(label="银行借款" name="second")
      el-tab-pane(label="应付账款" name="three")
    .content1(v-show="activeTab2 == 'first'")
      form-content2
    .content1(v-show="activeTab2 == 'second'")
      form-content2
    .content1(v-show="activeTab2 == 'three'")
      form-content2
    //- tab3
    .cardTitle1
      span(class='blue')
      span(class='title1') 财务科目
    el-tabs(v-model="activeTab3" @tab-click="handleClick")
      el-tab-pane(label="营业收入" name="first")
      el-tab-pane(label="员工成本" name="second")
      el-tab-pane(label="现金流" name="three")
      el-tab-pane(label="利润" name="four")
    .content1(v-show="activeTab3 == 'first'")
      form-content3
    .content1(v-show="activeTab3 == 'second'")
      form-content3
    .content1(v-show="activeTab3 == 'three'")
      form-content3
    .content1(v-show="activeTab3 == 'four'")
      form-content3
    //- tab4
    .cardTitle1
      span(class='blue')
      span(class='title1') 财务科目
    el-tabs(v-model="activeTab4" @tab-click="handleClick")
      el-tab-pane(label="营业成本" name="first")
      el-tab-pane(label="财务费用" name="second")
      el-tab-pane(label="纳税数额" name="three")
    .content1(v-show="activeTab4 == 'first'")
      form-content4
    .content1(v-show="activeTab4 == 'second'")
      form-content4
    .content1(v-show="activeTab4 == 'three'")
      form-content4
</template>

<script>
import FormContent1 from "./FormContent1";
import FormContent2 from "./FormContent2";
import FormContent3 from "./FormContent3";
import FormContent4 from "./FormContent4";
export default {
  // 组件名称
  name: "TabForm1",
  // 组件参数 接收来自父组件的数据
  props: ["detail"],
  // 局部注册的组件
  components: {
    "form-content1": FormContent1,
    "form-content2": FormContent2,
    "form-content3": FormContent3,
    "form-content4": FormContent4
  },
  // 组件状态值
  data() {
    return {
      activeTab1: "first",
      activeTab2: "first",
      activeTab3: "first",
      activeTab4: "first"
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    handleClick() {
      console.log(this.activeName);
    }
  },
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted() {}
};
</script>

<style lang="scss" scoped>
.Tabform2 {
  width: 100%;
  height: 100%;
  .cardTitle1 {
    margin: 5px 0 5px;
    padding: 0;
    height: 30px;
    width: 100%;
    position: relative;
    .blue {
      position: absolute;
      top: 2px;
      width: 3px;
      height: 18px;
      background-color: rgba(78, 120, 222, 1);
    }
    .title {
      position: absolute;
      font-size: 18px;
      font-weight: 700;
      color: rgba(96, 98, 102, 1);
      top: 1px;
      left: 10px;
      height: 20px;
      line-height: 20px;
    }
    .title1 {
      position: absolute;
      font-size: 18px;
      font-weight: 500;
      color: rgba(96, 98, 102, 1);
      top: 1px;
      left: 10px;
      height: 20px;
      line-height: 20px;
    }
  }
}
</style>
