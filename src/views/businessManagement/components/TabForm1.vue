<!--
  功能：Tabform1
  作者：sunhua
  邮箱：947545659@qq.com
  时间：2020年07月09日 10:46:30
-->
<template lang="pug">
  .Tabform1
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
      //- form-content1(:formContent1="params1" ref="formContent1")
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="当前余额 :" style="width:96%")
              el-input(v-model="form.colDebtBalance" clearable)
          el-col(:span="12")
            el-form-item(label="上期检查（或调查）时点余额 :" style="width:96%")
              el-input(v-model="form.colDebtLastBalance" clearable)
          el-col(:span="12")
            el-form-item(label="如变动超过30%，原因 :" style="width:96%")
              el-input(v-model="form.colDebtChang30Msg" type="textarea" :rows="3" clearable)
    .content1(v-show="activeTab1 == 'second'")
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="当前余额 :" style="width:96%")
              el-input(v-model="form.stockChangSitu" clearable)
          el-col(:span="12")
            el-form-item(label="上期检查（或调查）时点余额 :" style="width:96%")
              el-input(v-model="form.stockLastBalance" clearable)
          el-col(:span="12")
            el-form-item(label="如变动超过30%，原因 :" style="width:96%")
              el-input(v-model="form.stockChang30Msg" type="textarea" :rows="3" clearable)
    .content1(v-show="activeTab1 == 'three'")
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="当前余额 :" style="width:96%")
              el-input(v-model="form.loanForPsonBalance" clearable)
          el-col(:span="12")
            el-form-item(label="上期检查（或调查）时点余额 :" style="width:96%")
              el-input(v-model="form.loanForPsonLastBalance" clearable)
          el-col(:span="12")
            el-form-item(label="如变动超过30%，原因 :" style="width:96%")
              el-input(v-model="form.loanForPsonChang30Msg" type="textarea" :rows="3" clearable)
    .content1(v-show="activeTab1 == 'four'")
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="当前余额 :" style="width:96%")
              el-input(v-model="form.payDebtBalance" clearable)
          el-col(:span="12")
            el-form-item(label="上期检查（或调查）时点余额 :" style="width:96%")
              el-input(v-model="form.payDebtLastBalance" clearable)
          el-col(:span="12")
            el-form-item(label="如变动超过30%，原因 :" style="width:96%")
              el-input(v-model="form.payDebtChang30Msg" type="textarea" :rows="3" clearable)
    //- tab2
    .cardTitle1
      span(class='blue')
      span(class='title1') 财务科目
    el-tabs(v-model="activeTab2" @tab-click="handleClick")
      el-tab-pane(label="应收账款" name="first")
      el-tab-pane(label="银行借款" name="second")
      el-tab-pane(label="应付账款" name="three")
    .content1(v-show="activeTab2 == 'first'")
      //- form-content1(:formContent1="params2" ref="formContent2")
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="当前余额 :" style="width:96%")
              el-input(v-model="form.colCapitalBalance" clearable)
          el-col(:span="12")
            el-form-item(label="上期检查（或调查）时点余额 :" style="width:96%")
              el-input(v-model="form.colCapitalLastBalance" clearable)
          el-col(:span="12")
            el-form-item(label="如变动超过30%，原因 :" style="width:96%")
              el-input(v-model="form.colCapitalChang30Msg" type="textarea" :rows="3" clearable)
    .content1(v-show="activeTab2 == 'second'")
      //- form-content1(:formContent1="params2" ref="formContent2")
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="当前余额 :" style="width:96%")
              el-input(v-model="form.loanForBankBalance" clearable)
          el-col(:span="12")
            el-form-item(label="上期检查（或调查）时点余额 :" style="width:96%")
              el-input(v-model="form.loanForBankLastBalance" clearable)
          el-col(:span="12")
            el-form-item(label="如变动超过30%，原因 :" style="width:96%")
              el-input(v-model="form.loanForBankChang30Msg" type="textarea" :rows="3" clearable)
    .content1(v-show="activeTab2 == 'three'")
      //- form-content1(:formContent1="params2" ref="formContent2")
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="当前余额 :" style="width:96%")
              el-input(v-model="form.payCapitalBalance" clearable)
          el-col(:span="12")
            el-form-item(label="上期检查（或调查）时点余额 :" style="width:96%")
              el-input(v-model="form.payCapitalLastBalance" clearable)
          el-col(:span="12")
            el-form-item(label="如变动超过30%，原因 :" style="width:96%")
              el-input(v-model="form.payCapitalChang30Msg" type="textarea" :rows="3" clearable)
    //- tab3
    .cardTitle1
      span(class='blue')
      span(class='title1') 财务科目
    el-tabs(v-model="activeTab3" @tab-click="handleClick")
      el-tab-pane(label="营业收入" name="first")
      el-tab-pane(label="人工成本" name="second")
      el-tab-pane(label="水、电、煤、气其中一项或多项" name="three")
      el-tab-pane(label="现金流" name="four")
    .content1(v-show="activeTab3 == 'first'")
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="近三个月的情况 :" style="width:96%")
              el-input(v-model="form.busInc3MSitu" type="textarea" :rows="3" clearable)
          el-col(:span="12")
            el-form-item(label="如剔除季节性因素后变动超30%，原因 :" style="width:96%")
              el-input(v-model="form.busIncChang30Msg" type="textarea" :rows="3" clearable)
      //- form-content3(:formContent1="params3" ref="formContent3")
    .content1(v-show="activeTab3 == 'second'")
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="近三个月的情况 :" style="width:96%")
              el-input(v-model="form.emplCost3M" type="textarea" :rows="3" clearable)
          el-col(:span="12")
            el-form-item(label="如剔除季节性因素后变动超30%，原因 :" style="width:96%")
              el-input(v-model="form.emplCostChang30Msg" type="textarea" :rows="3" clearable)
    .content1(v-show="activeTab3 == 'three'")
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="近三个月的情况 :" style="width:96%")
              el-input(v-model="form.dailyExpen3MSitu" type="textarea" :rows="3" clearable)
          el-col(:span="12")
            el-form-item(label="如剔除季节性因素后变动超30%，原因 :" style="width:96%")
              el-input(v-model="form.dailyExpenChang30Msg" type="textarea" :rows="3" clearable)
    .content1(v-show="activeTab3 == 'four'")
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="近三个月的情况 :" style="width:96%")
              el-input(v-model="form.cash3M" type="textarea" :rows="3" clearable)
          el-col(:span="12")
            el-form-item(label="如剔除季节性因素后变动超30%，原因 :" style="width:96%")
              el-input(v-model="form.cashChang30Msg" type="textarea" :rows="3" clearable)
    //- tab4
    .cardTitle1
      span(class='blue')
      span(class='title1') 财务科目
    el-tabs(v-model="activeTab4" @tab-click="handleClick")
      el-tab-pane(label="原材料成本" name="first")
      el-tab-pane(label="财务费用" name="second")
      el-tab-pane(label="纳税数额" name="three")
      el-tab-pane(label="利润" name="four")
    .content1(v-show="activeTab4 == 'first'")
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="近三个月的情况 :" style="width:96%")
              el-input(v-model="form.materialCost3M" type="textarea" :rows="3" clearable)
          el-col(:span="12")
            el-form-item(label="如剔除季节性因素后变动超30%，原因 :" style="width:96%")
              el-input(v-model="form.materialCostChang30Msg" type="textarea" :rows="3" clearable)
      //- form-content4(:formContent1="params4" ref="formContent4")
    .content1(v-show="activeTab4 == 'second'")
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="近三个月的情况 :" style="width:96%")
              el-input(v-model="form.financeCost3M" type="textarea" :rows="3" clearable)
          el-col(:span="12")
            el-form-item(label="如剔除季节性因素后变动超30%，原因 :" style="width:96%")
              el-input(v-model="form.financeCostChang30Msg" type="textarea" :rows="3" clearable)
    .content1(v-show="activeTab4 == 'three'")
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="近三个月的情况 :" style="width:96%")
              el-input(v-model="form.payTaxAmout3M" type="textarea" :rows="3" clearable)
          el-col(:span="12")
            el-form-item(label="如剔除季节性因素后变动超30%，原因 :" style="width:96%")
              el-input(v-model="form.payTaxAmoutChang30Msg" type="textarea" :rows="3" clearable)
    .content1(v-show="activeTab4 == 'four'")
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="近三个月的情况 :" style="width:96%")
              el-input(v-model="form.profit3M" type="textarea" :rows="3" clearable)
          el-col(:span="12")
            el-form-item(label="如剔除季节性因素后变动超30%，原因 :" style="width:96%")
              el-input(v-model="form.profitChang30Msg" type="textarea" :rows="3" clearable)

</template>

<script>
// import FormContent1 from "./FormContent1";
// import FormContent2 from "./FormContent2";
// import FormContent3 from "./FormContent3";
// import FormContent4 from "./FormContent4";
export default {
  // 组件名称
  name: "TabForm1",
  // 组件参数 接收来自父组件的数据
  props: ["contentDetail"],
  // 局部注册的组件
  components: {
    // "form-content1": FormContent1,
    // "form-content2": FormContent2,
    // "form-content3": FormContent3,
    // "form-content4": FormContent4
  },
  // 组件状态值
  data() {
    return {
      activeTab1: "first",
      activeTab2: "first",
      activeTab3: "first",
      activeTab4: "first",
      form: {
        // card 1
        colDebtBalance: "", //当前余额
        colDebtLastBalance: "", //应收票据上期检查（或调查）时点余额
        colDebtChang30Msg: "", // 应收票据变动超过30%，原因
        stockChangSitu: "", //存货上次全面检查或调查时余额
        stockLastBalance: "", //存货本次检查存货变动情况
        stockChang30Msg: "", // 存货变动超过30%，原因
        loanForPsonBalance: "", //私人借款当前余额
        loanForPsonLastBalance: "", //私人借款上期检查（或调查）时点余额
        loanForPsonChang30Msg: "", // 私人借款变动超过30%，原因
        payDebtBalance: "", //应付票据当前余额
        payDebtLastBalance: "", //应付票据上期检查（或调查）时点余额
        payDebtChang30Msg: "", // 应付票据变动超过30%，原因
        // card 2
        colCapitalBalance: "", //应收账款当前余额
        colCapitalLastBalance: "", //应收账款上期检查（或调查）时点余额
        colCapitalChang30Msg: "", // 应收账款变动超过30%，原因
        loanForBankBalance: "", //银行借款当前余额
        loanForBankLastBalance: "", //银行借款上期检查（或调查）时点余额
        loanForBankChang30Msg: "", // 银行借款变动超过30%，原因
        payCapitalBalance: "", //应付账款当前余额
        payCapitalLastBalance: "", //应付账款上期检查（或调查）时点余额
        payCapitalChang30Msg: "", // 应付账款变动超过30%，原因
        // card 3
        busInc3MSitu: "", //营业收入近三个月的情况
        busIncChang30Msg: "", // 营业收入剔除季节性因素后变动超30%，原因
        dailyExpen3MSitu: "", //近三个月的情况
        dailyExpenChang30Msg: "", // 变动超过30%，原因
        emplCost3M: "", //近三个月的情况
        emplCostChang30Msg: "", // 变动超过30%，原因
        cash3M: "", //近三个月的情况
        cashChang30Msg: "", // 应收账款变动超过30%，原因
        // card 4
        materialCost3M: "", //材料近三个月的情况
        materialCostChang30Msg: "", // 材料剔除季节性因素后变动超30%，原因
        financeCost3M: "", //近三个月的情况
        financeCostChang30Msg: "", // 变动超过30%，原因
        payTaxAmout3M: "", //近三个月的情况
        payTaxAmoutChang30Msg: "", // 变动超过30%，原因
        profit3M: "", //近三个月的情况
        profitChang30Msg: "" // 应收账款变动超过30%，原因
      },
      params1: {},
      params2: {},
      params3: {},
      params4: {}
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {
    contentDetail: function(newVal) {
      // console.log(1, newVal, oldVal);
      this.params1 = newVal;
      console.log("this.params1", this.params1);
    }
  },
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
@import "../../../assets/style/global.scss";
.Tabform1 {
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
