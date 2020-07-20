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
    el-tabs(v-model="activeTab1" @tab-click="handleClick1")
      el-tab-pane(label="应收票据" name="first")
      el-tab-pane(label="存货" name="second")
      el-tab-pane(label="私人借款" name="three")
      el-tab-pane(label="应付票据" name="four")
    .content1(v-show="activeTab1 == 'first'")
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="当前余额 :" style="width:96%")
              el-input(v-model="form.financeInfo.colDebtBalance" clearable)
          el-col(:span="12")
            el-form-item(label="上期检查（或调查）时点余额 :" style="width:96%")
              el-input(v-model="form.financeInfo.colDebtLastBalance" clearable)
          el-col(:span="12")
            el-form-item(label="如变动超过30%，原因 :" style="width:96%")
              el-input(v-model="form.financeInfo.colDebtChang30Msg" type="textarea" :rows="3" clearable)
    .content1(v-show="activeTab1 == 'second'")
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="当前余额 :" style="width:96%")
              el-input(v-model="form.financeInfo.stockChangSitu" clearable)
          el-col(:span="12")
            el-form-item(label="上期检查（或调查）时点余额 :" style="width:96%")
              el-input(v-model="form.financeInfo.stockLastBalance" clearable)
          el-col(:span="12")
            el-form-item(label="如变动超过30%，原因 :" style="width:96%")
              el-input(v-model="form.financeInfo.stockChang30Msg" type="textarea" :rows="3" clearable)
    .content1(v-show="activeTab1 == 'three'")
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="当前余额 :" style="width:96%")
              el-input(v-model="form.financeInfo.loanForPsonBalance" clearable)
          el-col(:span="12")
            el-form-item(label="上期检查（或调查）时点余额 :" style="width:96%")
              el-input(v-model="form.financeInfo.loanForPsonLastBalance" clearable)
          el-col(:span="12")
            el-form-item(label="如变动超过30%，原因 :" style="width:96%")
              el-input(v-model="form.financeInfo.loanForPsonChang30Msg" type="textarea" :rows="3" clearable)
    .content1(v-show="activeTab1 == 'four'")
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="当前余额 :" style="width:96%")
              el-input(v-model="form.financeInfo.payDebtBalance" clearable)
          el-col(:span="12")
            el-form-item(label="上期检查（或调查）时点余额 :" style="width:96%")
              el-input(v-model="form.financeInfo.payDebtLastBalance" clearable)
          el-col(:span="12")
            el-form-item(label="如变动超过30%，原因 :" style="width:96%")
              el-input(v-model="form.financeInfo.payDebtChang30Msg" type="textarea" :rows="3" clearable)
    //- tab2
    .cardTitle1
      span(class='blue')
      span(class='title1') 财务科目
    el-tabs(v-model="activeTab2" @tab-click="handleClick2")
      el-tab-pane(label="应收账款" name="first")
      el-tab-pane(label="银行借款" name="second")
      el-tab-pane(label="应付账款" name="three")
    .content1(v-show="activeTab2 == 'first'")
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="当前余额 :" style="width:96%")
              el-input(v-model="form.financeInfo.colCapitalBalance" clearable)
          el-col(:span="12")
            el-form-item(label="上期检查（或调查）时点余额 :" style="width:96%")
              el-input(v-model="form.financeInfo.colCapitalLastBalance" clearable)
          el-col(:span="12")
            el-form-item(label="如变动超过30%，原因 :" style="width:96%")
              el-input(v-model="form.financeInfo.colCapitalChang30Msg" type="textarea" :rows="3" clearable)
    .content1(v-show="activeTab2 == 'second'")
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="当前余额 :" style="width:96%")
              el-input(v-model="form.financeInfo.loanForBankBalance" clearable)
          el-col(:span="12")
            el-form-item(label="上期检查（或调查）时点余额 :" style="width:96%")
              el-input(v-model="form.financeInfo.loanForBankLastBalance" clearable)
          el-col(:span="12")
            el-form-item(label="如变动超过30%，原因 :" style="width:96%")
              el-input(v-model="form.financeInfo.loanForBankChang30Msg" type="textarea" :rows="3" clearable)
    .content1(v-show="activeTab2 == 'three'")
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="当前余额 :" style="width:96%")
              el-input(v-model="form.financeInfo.payCapitalBalance" clearable)
          el-col(:span="12")
            el-form-item(label="上期检查（或调查）时点余额 :" style="width:96%")
              el-input(v-model="form.financeInfo.payCapitalLastBalance" clearable)
          el-col(:span="12")
            el-form-item(label="如变动超过30%，原因 :" style="width:96%")
              el-input(v-model="form.financeInfo.payCapitalChang30Msg" type="textarea" :rows="3" clearable)
    //- tab3
    .cardTitle1
      span(class='blue')
      span(class='title1') 财务科目
    el-tabs(v-model="activeTab3" @tab-click="handleClick3")
      el-tab-pane(label="营业收入" name="first")
      el-tab-pane(label="员工成本" name="second")
      el-tab-pane(label="现金流" name="three")
      el-tab-pane(label="利润" name="four")
    .content1(v-show="activeTab3 == 'first'")
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="近三个月的情况 :" style="width:96%")
              el-input(v-model="form.financeInfo.busInc3MSitu" type="textarea" :rows="3" clearable)
          el-col(:span="12")
            el-form-item(label="如剔除季节性因素后变动超30%，原因 :" style="width:96%")
              el-input(v-model="form.financeInfo.busIncChang30Msg" type="textarea" :rows="3" clearable)
    .content1(v-show="activeTab3 == 'second'")
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="近三个月的情况 :" style="width:96%")
              el-input(v-model="form.financeInfo.emplCost3M" type="textarea" :rows="3" clearable)
          el-col(:span="12")
            el-form-item(label="如剔除季节性因素后变动超30%，原因 :" style="width:96%")
              el-input(v-model="form.financeInfo.emplCostChang30Msg" type="textarea" :rows="3" clearable)
    .content1(v-show="activeTab3 == 'three'")
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="近三个月的情况 :" style="width:96%")
              el-input(v-model="form.financeInfo.cash3M" type="textarea" :rows="3" clearable)
          el-col(:span="12")
            el-form-item(label="如剔除季节性因素后变动超30%，原因 :" style="width:96%")
              el-input(v-model="form.financeInfo.cashChang30Msg" type="textarea" :rows="3" clearable)
    .content1(v-show="activeTab3 == 'four'")
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="近三个月的情况 :" style="width:96%")
              el-input(v-model="form.financeInfo.profit3M" type="textarea" :rows="3" clearable)
          el-col(:span="12")
            el-form-item(label="如剔除季节性因素后变动超30%，原因 :" style="width:96%")
              el-input(v-model="form.financeInfo.profitChang30Msg" type="textarea" :rows="3" clearable)
    //- tab4
    .cardTitle1
      span(class='blue')
      span(class='title1') 财务科目
    el-tabs(v-model="activeTab4" @tab-click="handleClick4")
      el-tab-pane(label="营业成本" name="first")
      el-tab-pane(label="财务费用" name="second")
      el-tab-pane(label="纳税数额" name="three")
    .content1(v-show="activeTab4 == 'first'")
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="近三个月的情况 :" style="width:96%")
              el-input(v-model="form.financeInfo.materialCost3M" type="textarea" :rows="3" clearable)
          el-col(:span="12")
            el-form-item(label="如剔除季节性因素后变动超30%，原因 :" style="width:96%")
              el-input(v-model="form.financeInfo.materialCostChang30Msg" type="textarea" :rows="3" clearable)
          el-col(:span="12")
            el-form-item(label=" " style="width:96%")
              el-input(v-model="form.financeInfo.financeMsg" type="textarea" :rows="3" clearable)
    .content1(v-show="activeTab4 == 'second'")
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="近三个月的情况 :" style="width:96%")
              el-input(v-model="form.financeInfo.financeCost3M" type="textarea" :rows="3" clearable)
          el-col(:span="12")
            el-form-item(label="如剔除季节性因素后变动超30%，原因 :" style="width:96%")
              el-input(v-model="form.financeInfo.financeCostChang30Msg" type="textarea" :rows="3" clearable)
          el-col(:span="12")
            el-form-item(label=" " style="width:96%")
              el-input(v-model="form.financeInfo.financeMsg" type="textarea" :rows="3" clearable)
    .content1(v-show="activeTab4 == 'three'")
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="近三个月的情况 :" style="width:96%")
              el-input(v-model="form.financeInfo.payTaxAmout3M" type="textarea" :rows="3" clearable)
          el-col(:span="12")
            el-form-item(label="如剔除季节性因素后变动超30%，原因 :" style="width:96%")
              el-input(v-model="form.financeInfo.payTaxAmoutChang30Msg" type="textarea" :rows="3" clearable)
          el-col(:span="12")
            el-form-item(label=" " style="width:96%")
              el-input(v-model="form.financeInfo.financeMsg" type="textarea" :rows="3" clearable)
</template>

<script>
export default {
  // 组件名称
  name: "TabForm2",
  // 组件参数 接收来自父组件的数据
  props: ["detail"],
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      activeTab1: "first",
      activeTab2: "first",
      activeTab3: "first",
      activeTab4: "first",
      form: {
        financeInfo: {
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
          emplCost3M: "", //近三个月的情况
          emplCostChang30Msg: "", // 变动超过30%，原因
          cash3M: "", //近三个月的情况
          cashChang30Msg: "", // 应收账款变动超过30%，原因
          profit3M: "", //近三个月的情况
          profitChang30Msg: "", // 应收账款变动超过30%，原因
          // card 4
          materialCost3M: "", //材料近三个月的情况
          materialCostChang30Msg: "", // 材料剔除季节性因素后变动超30%，原因
          financeCost3M: "", //近三个月的情况
          financeCostChang30Msg: "", // 变动超过30%，原因
          payTaxAmout3M: "", //近三个月的情况
          payTaxAmoutChang30Msg: "", // 变动超过30%，原因
          financeMsg: ""
        }
      }
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    handleClick1() {
      console.log(this.activeTab1);
      this.resetValue1();
    },
    resetValue1() {
      // card 1
      this.form.financeInfo.colDebtBalance = ""; //当前余额
      this.form.financeInfo.colDebtLastBalance = ""; //应收票据上期检查（或调查）时点余额
      this.form.financeInfo.colDebtChang30Msg = ""; // 应收票据变动超过30%，原因
      this.form.financeInfo.stockChangSitu = ""; //存货上次全面检查或调查时余额
      this.form.financeInfo.stockLastBalance = ""; //存货本次检查存货变动情况
      this.form.financeInfo.stockChang30Msg = ""; // 存货变动超过30%，原因
      this.form.financeInfo.loanForPsonBalance = ""; //私人借款当前余额
      this.form.financeInfo.loanForPsonLastBalance = ""; //私人借款上期检查（或调查）时点余额
      this.form.financeInfo.loanForPsonChang30Msg = ""; // 私人借款变动超过30%，原因
      this.form.financeInfo.payDebtBalance = ""; //应付票据当前余额
      this.form.financeInfo.payDebtLastBalance = ""; //应付票据上期检查（或调查）时点余额
      this.form.financeInfo.payDebtChang30Msg = ""; // 应付票据变动超过30%，原因
    },
    handleClick2() {
      console.log(this.activeTab2);
      this.resetValue2();
    },
    resetValue2() {
      // card 2
      this.form.financeInfo.colCapitalBalance = ""; //应收账款当前余额
      this.form.financeInfo.colCapitalLastBalance = ""; //应收账款上期检查（或调查）时点余额
      this.form.financeInfo.colCapitalChang30Msg = ""; // 应收账款变动超过30%，原因
      this.form.financeInfo.loanForBankBalance = ""; //银行借款当前余额
      this.form.financeInfo.loanForBankLastBalance = ""; //银行借款上期检查（或调查）时点余额
      this.form.financeInfo.loanForBankChang30Msg = ""; // 银行借款变动超过30%，原因
      this.form.financeInfo.payCapitalBalance = ""; //应付账款当前余额
      this.form.financeInfo.payCapitalLastBalance = ""; //应付账款上期检查（或调查）时点余额
      this.form.financeInfo.payCapitalChang30Msg = ""; // 应付账款变动超过30%，原因
    },
    handleClick3() {
      console.log(this.activeTab3);
      this.resetValue3();
    },
    resetValue3() {
      // card 3
      this.form.financeInfo.busInc3MSitu = ""; //营业收入近三个月的情况
      this.form.financeInfo.busIncChang30Msg = ""; // 营业收入剔除季节性因素后变动超30%，原因
      this.form.financeInfo.emplCost3M = ""; //近三个月的情况
      this.form.financeInfo.emplCostChang30Msg = ""; // 变动超过30%，原因
      this.form.financeInfo.cash3M = ""; //近三个月的情况
      this.form.financeInfo.cashChang30Msg = ""; // 应收账款变动超过30%，原因
      this.form.financeInfo.profit3M = ""; //近三个月的情况
      this.form.financeInfo.profitChang30Msg = ""; // 应收账款变动超过30%，原因
    },
    handleClick4() {
      console.log(this.activeTab4);
      this.resetValue4();
    },
    resetValue4() {
      // card 4
      this.form.financeInfo.materialCost3M = ""; //材料近三个月的情况
      this.form.financeInfo.materialCostChang30Msg = ""; // 材料剔除季节性因素后变动超30%，原因
      this.form.financeInfo.financeCost3M = ""; //近三个月的情况
      this.form.financeInfo.financeCostChang30Msg = ""; // 变动超过30%，原因
      this.form.financeInfo.payTaxAmout3M = ""; //近三个月的情况
      this.form.financeInfo.payTaxAmoutChang30Msg = ""; // 变动超过30%，原因
      this.form.financeInfo.financeMsg = ""; // 财务状况整体说明
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
