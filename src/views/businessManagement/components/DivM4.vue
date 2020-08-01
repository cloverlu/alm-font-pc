<!--
  功能：功能描述
  作者：sunhua
  邮箱：947545659@qq.com
  时间：2020年07月07日 16:40:13
-->
<template lang="pug">
  <div class="m4">
    el-card(class='card')
      el-form(:inline="true" label-position="top" label-width="80px" size="mini" class='checkForm')
        el-form-item(label="客户名称 :" class="formItem2")
          el-input(v-model="form.custName" disabled)
        el-form-item(label="贷款金额 :" class="formItem2")
          el-input(v-model="form.loanAmout" disabled)
        el-form-item(label="贷款余额 :" class="formItem2")
          el-input(v-model="form.loanBalance" disabled)
        el-form-item(label="贷款期限 :" class="formItem2")
          el-input(v-model="form.loanLength" disabled)
            i(slot="suffix" style="font-style:normal") 月
        el-form-item(label="还款方式 :" class="formItem2")
          el-input(v-model="form.repayKind" disabled)
        el-form-item(label="还款日期 :" class="formItem2")
          el-date-picker(v-model="form.repayDate" :disabled="type == 2" value-format='yyyy-MM-dd' format='yyyy-MM-dd' style="width:100%" type="date" placeholder="选择日期")
        el-form-item(label="还款金额 :" class="formItem2")
          el-input(v-model="form.repayAmout" :disabled="type == 2")

    el-card(class='card')
      .cardTitle1
        span(class='blue')
        span(class='title') 检查阶段
      .cardContent
        el-form(:inline="true" label-position="top" label-width="80px" size="mini" class='checkForm')
          el-radio-group(v-model="form.stageData[0].checkStage" :disabled="type == 2")
              el-radio(label="1") 第一阶段
              el-radio(label="2") 第二阶段
              el-radio(label="3") 第三阶段
        el-form(v-for='(item,index) in form.stageData' :key='index' :inline="true" label-position="top" label-width="80px" size="mini" class='checkForm')
          el-form-item(label="还款意愿 :" class="formItem2")
            el-select(v-model="item.payIntention" style="width:100%" clearable :disabled="type == 2")
              el-option(v-for="item in payArr" :key="item.value" :label="item.label" :value="item.value")
          el-form-item(label="检查地点 :" class="formItem2")
            el-input(v-model="item.practicableCheckAddr" :disabled="type == 2" clearable)
          el-form-item(label="接待人员 :" class="formItem2")
            el-input(v-model="item.practicableStaff" :disabled="type == 2" clearable)
          el-form-item(label="还款资金来源 :" class="formItem2")
            el-input(v-model="item.amoutSource" :disabled="type == 2" clearable)
          el-form-item(label="预计还款/付息时间 :" class="formItem2")
            el-date-picker(v-model="item.expectRepayDate" :disabled="type == 2" value-format='yyyy-MM-dd' format='yyyy-MM-dd' style="width:100%" type="date" placeholder="选择日期" clearable)
          el-form-item(label="还款资金落实情况说明 :" class="formItem2")
            el-input(v-model="item.practicableMsg" type="textarea" :disabled="type == 2" :rows="3" clearable)

    el-card(class='card')
      .cardTitle1
        span(class='blue')
        span(class='title') 影像维护
      .upload
        .item(v-for="(item,i) in titleList" :key="item.id")
          .title {{item.text}}
          .upload-wrapper
            uploadTest(:item="item" :itemVmodel="params" :modify='type == 2' :read="false" :ref="`definte16${i}`")
        //- .aa(@click="submit") 点我啦，展示imageList =>  {{loanBusiness}}
     
  </div>
</template>

<script>
import uploadTest from "./upload";
// import { filterParams } from "../../../utils/utils";

export default {
  // 组件名称
  name: "DivM4",
  // 组件参数 接收来自父组件的数据
  props: ["detail"],
  // 局部注册的组件
  components: { uploadTest },
  // 组件状态值
  data() {
    const definte17 = () => {
      const definite17Array = [];
      const valueArray = ["其他"];
      for (let i = 0; i < valueArray.length; i++) {
        const a = "m1_" + i;
        const b = `pic_${i + 1}s`;
        definite17Array.push({
          id: i,
          text: valueArray[i],
          vModel: b,
          vId: a
        });
      }
      return definite17Array;
    };
    return {
      titleList: definte17(),
      params: {},
      loanBusiness: {},
      payArr: [
        {
          key: "1",
          label: "良好",
          value: "1"
        },
        {
          key: "2",
          label: "较差",
          value: "2"
        },
        {
          key: "3",
          label: "无",
          value: "3"
        }
      ],
      options: [
        {
          label: "是",
          value: 1
        },
        {
          label: "否",
          value: 0
        }
      ],
      form: {
        // card 1
        bizType: "", // 检查类型
        custName: "", // 客户名称  queryType为2时，必传；其他情况非必传
        loanAmout: "", // 贷款金额
        loanBalance: "", // 贷款余额
        loanLength: "", // 贷款期限
        repayKind: "", // 还款方式
        repayDate: "", // 还款日期
        repayAmout: "", // 还款金额

        // card 2
        stageData: [
          {
            checkStage: "1", // 检查阶段
            payIntention: "1", // 还款意愿
            practicableCheckAddr: "", // 检查地点
            practicableStaff: "", // 接待人员
            amoutSource: "", // 还款资金来源
            expectRepayDate: "", // 预计还款/付息时间
            practicableMsg: "" // 还款资金落实情况说明
          }
        ] //还款资金落实阶段数组
      },
      type: 1
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {
    detail: function(newVal, oldVal) {
      console.log(1, newVal, oldVal);
      this.form = newVal;
      this.params = this.matchImage(newVal);
      if (!newVal.stageData || newVal.stageData.length == 0) {
        this.form.stageData = [
          {
            checkStage: "1", // 检查阶段
            payIntention: "1", // 还款意愿
            practicableCheckAddr: "", // 检查地点
            practicableStaff: "", // 接待人员
            amoutSource: "", // 还款资金来源
            expectRepayDate: "", // 预计还款/付息时间
            practicableMsg: "" // 还款资金落实情况说明
          }
        ];
      }
    }
  },
  // 组件方法
  methods: {
    // 图像模块匹配
    mVmodel(num) {
      const definite16 = {};
      for (let i = 0; i < num; i++) {
        const a = `pic_${i + 1}s`;
        definite16[a] = [
          {
            url: "",
            longitude: "",
            dimension: ""
          }
        ];
      }
      return definite16;
    },
    matchImage(data) {
      // data为详情传来的所有值
      var forBizDetail = data;
      var obj2 = {};
      //  this.mVmodel(num)的num参数为各个类型所需字段的个数
      obj2 = this.mVmodel(1);
      Object.keys(obj2).forEach(key => {
        if (forBizDetail) {
          obj2[key] = forBizDetail[key];
        }
      });
      return obj2;
    },
    submit() {
      var arrs = {};
      for (let i = 0; i < this.titleList.length; i++) {
        const a = `pic_${i + 1}s`;
        arrs[a] = this.$refs[`definte16${i}`][0].fileList[a];
      }
      this.loanBusiness = Object.assign({}, this.type, arrs);
    }
  },
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted() {
    // this.params = this.mVmodel(1);
    const { billNo, bizId, bizStatus } = this.$route.query;
    if (billNo) {
      // 借据
      this.type = 1;
      this.form.billNo = billNo;
    }
    if (bizStatus === "alreadyDo" || bizStatus === "inReview") {
      this.type = 2;
    }
    if (bizId) {
      this.form.bizId = bizId;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/style/global.scss";
.card {
  width: 100%;
  margin-bottom: 10px;
  position: relative;
  .formItem2 {
    box-sizing: border-box;
    width: 50%;
    margin: 0;
    padding-right: 20px;
  }
  /deep/.el-form-item__label {
    padding: 10px 0 0;
    font-size: 16px;
    color: rgba(96, 98, 102, 1);
  }
  /deep/.el-form-item__content {
    width: 100%;
    // max-width: 542px;
    // min-width: 300px;
  }
  .cardTitle {
    margin: 0;
    padding: 0;
    height: 28px;
    width: 100%;
    position: relative;
    .blue {
      position: absolute;
      top: 2px;
      width: 3px;
      height: 20px;
      background-color: rgba(78, 120, 222, 1);
    }
    .title {
      position: absolute;
      font-size: 20px;
      font-weight: 500;
      color: rgba(10, 10, 10, 1);
      top: 2px;
      left: 10px;
      height: 20px;
      line-height: 20px;
    }
  }
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
  .cardTitle2 {
    height: 31px;
    font-size: 16px;
    line-height: 31px;
    color: rgba(96, 98, 102, 1);
  }
  .cardContent {
    margin-top: 5px;
    .el-checkbox {
      margin-right: 8px;
    }
  }
  .left {
    width: 50%;
    display: inline-block;
    .formItem2 {
      width: 100%;
    }
    .notes {
      width: 98%;
      font-size: 14px;
      line-height: 24px;
      color: rgba(96, 98, 102, 1);
    }
    .blueTitle {
      font-size: 18px;
      line-height: 31px;
      color: rgba(78, 120, 222, 1);
    }
  }
  .right {
    position: absolute;
    width: 50%;
    display: inline-block;
    .formItem2 {
      width: 100%;
    }
    .blueTitle {
      font-size: 18px;
      line-height: 31px;
      color: rgba(78, 120, 222, 1);
    }
  }
  .blueTitle {
    font-size: 18px;
    line-height: 31px;
    color: rgba(78, 120, 222, 1);
  }
  .blueTitle1 {
    font-size: 18px;
    line-height: 31px;
    color: rgba(78, 120, 222, 1);
  }
  .blackTitle {
    height: 31px;
    font-size: 16px;
    line-height: 31px;
    color: rgba(10, 10, 10, 1);
  }
  .checkForm {
  }
}
</style>

<style lang="scss">
.el-radio-group {
  /deep/.el-radio {
    margin-right: 10px;
  }
}
</style>
