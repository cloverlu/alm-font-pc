<!--
  功能：检查申请六种类型
  作者：sunhua
  邮箱：947545659@qq.com
  时间：2020年07月02日 08:54:09
-->
<template lang="pug">
  .inspectionApplication
    .headerPart
      el-tabs(v-model="activeName" @tab-click="handleClick")
        el-tab-pane(label="申请明细" name="first")
        el-tab-pane(label="流程上报" name="second")
    .content1(v-show="activeName == 'first'")
      .contentTop
        el-form(:model="form" :inline="true" label-position="left" label-width="80px" size="mini" class="demo-form-inline formBox")
          el-form-item(label="检查类型" class="formItem5")
            el-select(v-model="form.checkType" clearable style="width:100%" )
              el-option(label="小企业授信业务首次跟踪检查" value="m1")
              el-option(label="小企业授信业务贷后例行检查" value="m2")
              el-option(label="小企业授信业务贷后全面检查" value="m3")
              el-option(label="小企业授信业务还款资金落实情况检查" value="m4")
              el-option(label="小企业法人快捷贷首次检查" value="m5")
              el-option(label="小企业法人快捷贷贷后日常检查" value="m6")
          el-button(type="primary" size="mini" @click="onSave" class="btn") 保存
      .contentBody
        .type(v-if="form.checkType == 'm1'")
          div-m1
        .type(v-if="form.checkType == 'm2'")
          div-m2
        .type(v-if="form.checkType == 'm3'")
        .type(v-if="form.checkType == 'm4'")
          div-m4
        .type(v-if="form.checkType == 'm5'")
          div-m5
        .type(v-if="form.checkType == 'm6'")

        
        .footer
          el-button(type="warning" @click='onSubmit') 提交

    .content2(v-show="activeName == 'second'")
      .textContent
        el-form(label-position="top" label-width="80px" :model="approval")
          el-form-item(label="客户名称 :" class='noBorder')
            el-input(v-model="approval.custName")
          el-form-item(label="业务上报至 :" class='noBorder')
            el-input(v-model="approval.linkName")
          el-form-item(label="业务接收人 :" class='noBorder')
            el-input(v-model="approval.emplName")
          el-form-item(label="上报时间 :" class='noBorder')
            el-input(v-model="approval.approveTime")
          el-form-item(label="是否存在风险预警信号 :" class="formItem2")
            //- el-input(v-model="form.existRisk" clearable)
            el-select(v-model="approval.existRisk" placeholder="请选择" style='width:100%')
              el-option(label="是" value="1")
              el-option(label="否" value="0")
          el-form-item(label="预警信号说明 :" class="formItem2")
            el-input(v-model="approval.riskMsg" type="textarea" :rows="2" clearable)
          el-form-item(label="检查结论及措施建议 :" class="formItem2")
            el-input(v-model="approval.suggest" type="textarea" :rows="2" clearable)
        .control
          span(class='lebal') 检查人员 :
          span(class='content') {{approval.emplName}}
      .footer
          el-button(type="warning" @click='onSubmitApproval') 提交审批
    el-dialog(:visible.sync="dialogVisible")
      img(width="100%" :src="dialogImageUrl" alt="") 
</template>

<script>
import { filterParams } from "../../utils/utils";
import DivM1 from "./components/DivM1.vue";
import DivM2 from "./components/DivM2.vue";
import DivM4 from "./components/DivM4.vue";
import DivM5 from "./components/DivM5.vue";

export default {
  name: "iouList",
  components: {
    "div-m1": DivM1,
    "div-m2": DivM2,
    "div-m4": DivM4,
    "div-m5": DivM5
  },
  data() {
    return {
      activeName: "first",
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
        checkType: "m1", // 检查类型
        custName: "张三", // 客户名称  queryType为2时，必传；其他情况非必传
        loanAmout: "300000", // 贷款金额
        loanBalance: "20000", // 贷款余额
        loanLength: "26个月", // 贷款期限
        repayKind: "银行卡", // 还款方式
        repayDate: "2020-06-15", // 还款日期
        repayAmout: "200000", // 还款金额

        // card 2
        payIntention: "张三", // 还款意愿
        checkAddr: "xxxxxxxx", // 检查地点
        staff: "李四", // 接待人员
        amoutSource: "银联", // 还款资金来源
        expectRepayDate: "2020-5-20", // 预计还款/付息时间
        practicableMsg: "xxxx" // 还款资金落实情况说明
      },
      approval: {
        // 流程上报
        orgName: "张三有限公司", // 客户名称
        linkName: "一级支行主管岗", // 业务上报至
        emplName: "李四", // 业务接收人
        approveTime: "2020-06-06 10：30：00", // 上报时间
        existRisk: "", // 是否存在风险预警信号
        riskMsg: "", // 预警信号说明
        suggest: "" // 检查结论及措施建议
        // emplName: "" // 检查人员
      },
      list1: [
        {
          title: "《小企业授信业务额度借款支用单》",
          url: "",
          dimension: "",
          longitude: ""
        },
        {
          title: "《小企业贷款受托支付申请书》或自主支付清单",
          url: "",
          dimension: "",
          longitude: ""
        },
        {
          title: "《小企业贷款受托支付申请书》",
          url: "",
          dimension: "",
          longitude: ""
        },
        {
          title: "汇款凭证",
          url: "",
          dimension: "",
          longitude: ""
        },
        {
          title: "账户流水",
          url: "",
          dimension: "",
          longitude: ""
        },
        {
          title: "受托支付合同",
          url: "",
          dimension: "",
          longitude: ""
        },
        {
          title: "入库单",
          url: "",
          dimension: "",
          longitude: ""
        },
        {
          title: "贷款购买标的（如原材料、机器设备等）",
          url: "",
          dimension: "",
          longitude: ""
        },
        {
          title: "企业大门",
          url: "",
          dimension: "",
          longitude: ""
        },
        {
          title: "企业经营场地或生产车间",
          url: "",
          dimension: "",
          longitude: ""
        },
        {
          title: "检查人员现场检查影像等",
          url: "",
          dimension: "",
          longitude: ""
        },
        {
          title: "其他",
          url: "",
          dimension: "",
          longitude: ""
        }
      ],
      list2: [
        {
          title: "财务报表",
          url: "",
          dimension: "",
          longitude: ""
        },
        {
          title: "纳税材料",
          url: "",
          dimension: "",
          longitude: ""
        },
        {
          title: "水电费材料",
          url: "",
          dimension: "",
          longitude: ""
        },
        {
          title: "银行流水",
          url: "",
          dimension: "",
          longitude: ""
        },
        {
          title: "其他经营材料",
          url: "",
          dimension: "",
          longitude: ""
        },
        {
          title: "企业办公场所（含企业大门）",
          url: "",
          dimension: "",
          longitude: ""
        },
        {
          title: "企业生产车间（含重要生产或经营工序）",
          url: "",
          dimension: "",
          longitude: ""
        },
        {
          title: "企业重要生产或经营设备、存货",
          url: "",
          dimension: "",
          longitude: ""
        },
        {
          title: "检查人员现场检查的影像",
          url: "",
          dimension: "",
          longitude: ""
        },
        {
          title: "抵押物影像",
          url: "",
          dimension: "",
          longitude: ""
        },
        {
          title: "其他",
          url: "",
          dimension: "",
          longitude: ""
        }
      ],
      list4: [
        {
          title: "其他",
          url: "",
          dimension: "",
          longitude: ""
        }
      ],
      check: ["第一阶段"],
      dialogImageUrl: "",
      dialogVisible: false,
      formLabelWidth: "72px"
    };
  },
  mounted() {
    this.$moment.locale("zh-cn");
    // 进入页面先调用查询接口
    const { custName } = this.$route.query;
    if (custName) {
      this.form = { custName };
    }
    // this.onSubmit();
  },
  methods: {
    // 保存
    onSave() {
      console.log(filterParams(this.form));
    },
    // 提交
    onSubmit: function() {
      if (this.form.startDate) {
        this.form.startDate = this.$moment(this.form.startDate).format("L");
      }
      console.log(filterParams(this.form));
    },
    onSubmitApproval() {
      console.log(filterParams(this.approval));
    },
    handleClick() {
      console.log(this.activeName);
    },
    returnType(row) {
      switch (row.bizType) {
        case "m1":
          return "小企业授信业务首次跟踪检查";
        case "m2":
          return "小企业授信业务贷后例行检查";
        case "m3":
          return "小企业授信业务贷后全面检查";
        case "m4":
          return "小企业授信业务还款资金落实情况检查";
        case "m5":
          return "小企业法人快捷贷首次检查";
        case "m6":
          return "小企业法人快捷贷贷后日常检查";
      }
    },
    // 阶段多选框
    onChange() {
      console.log(this.check);
    },
    // 图片上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/global.scss";
.inspectionApplication {
  box-sizing: border-box;
  width: 100%;
  // padding: 0 40px 0;
  .headerPart {
    /deep/.el-tabs__header {
      margin: 0;
    }
    /deep/.el-tabs__nav-scroll {
      padding: 0 40px 0;
      /deep/.el-tabs__item {
        height: 48px;
        // margin-left: 40px;
      }
      /deep/.el-tabs__active-bar {
        width: 135px;
        transform: translateX(135px);
      }
    }
  }
  .contentTop {
    padding: 0 40px 0;
    .formBox {
      box-sizing: border-box;
      position: relative;
      height: 78px;
      width: 100%;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
      opacity: 1;
      padding-top: 30px;
      border-bottom: 1px solid #ccc;
      .formItem5 {
        display: inline-block;
        width: 410px;
        margin: 0;
        padding-right: 10px;
        /deep/.el-form-item__label {
          font-size: 16px;
          font-weight: 500;
          color: rgba(10, 10, 10, 1);
        }
        /deep/.el-form-item__content {
          width: 322px;
          /deep/.el-input__inner {
            height: 31px;
            line-height: 31px;
            font-size: 16px;
            font-weight: 500;
            color: rgba(78, 120, 222, 1);
          }
        }
      }
      .btn {
        position: absolute;
        top: 30px;
        right: 20px;
      }
    }
  }
  .contentBody {
    box-sizing: border-box;
    width: 100%;
    padding: 10px 40px 0;
    .type {
      width: 100%;
      height: 100%;
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
          margin: 0;
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
          // border-bottom: 1px dashed #ccc;
          // .blueTitle {
          //   font-size: 18px;
          //   line-height: 31px;
          //   color: rgba(78, 120, 222, 1);
          // }
        }
        .uploadBox {
          // height: 175px;
          .imgTitle {
            font-size: 16px;
            color: rgba(10, 10, 10, 1);
            padding: 16px 0 16px;
          }
          /deep/.el-upload--picture-card {
            width: 92px;
            height: 92px;
            position: relative;
            .el-icon-plus {
              position: absolute;
              top: -30px;
              left: 38px;
              height: 16px;
              width: 16px;
            }
          }
        }
      }
    }

    // .footer {
    //   text-align: center;
    //   height: 76px;
    //   line-height: 76px;
    //   .el-button--warning {
    //     padding: 8px 20px;
    //     span {
    //       font-size: 16px;
    //     }
    //   }
    // }
  }
  .textContent {
    padding: 30px 40px 0;
    border-bottom: 1px dashed #ccc;
    .noBorder {
      margin-bottom: 15px;
      /deep/.el-form-item__label {
        height: 26px;
        line-height: 26px;
        font-size: 16px;
        padding: 0;
        color: rgba(96, 98, 102, 1);
      }
      /deep/.el-form-item__content {
        height: 26px;
        line-height: 26px;
        /deep/.el-input {
          height: 26px;
          line-height: 26px;
          /deep/.el-input__inner {
            font-size: 16px;
            color: rgba(10, 10, 10, 1);
            border: none;
            font-weight: 700;
            padding: 0;
            height: 26px;
            line-height: 26px;
          }
        }
      }
    }
    .formItem2 {
      box-sizing: border-box;
      width: 542px;
      margin: 0;
      padding-right: 20px;
      /deep/.el-form-item__label {
        padding: 10px 0 0;
        font-size: 16px;
        color: rgba(96, 98, 102, 1);
      }
      /deep/.el-form-item__content {
        width: 100%;
        // max-width: 542px;
        // min-width: 300px;
        /deep/.el-input__inner {
          font-size: 16px;
          color: rgba(10, 10, 10, 1);
          font-weight: 700;
          height: 38px;
          line-height: 38px;
        }
        /deep/.el-textarea {
          /deep/.el-textarea__inner {
            font-size: 16px;
            color: rgba(10, 10, 10, 1);
            line-height: 31px;
          }
        }
      }
    }
    .control {
      height: 38px;
      line-height: 38px;
      margin-bottom: 20px;
      .lebal {
        font-size: 16px;
        color: rgba(96, 98, 102, 1);
        opacity: 1;
        margin-right: 25px;
      }
      .content {
        font-size: 16px;
        color: rgba(10, 10, 10, 1);
        opacity: 1;
      }
    }
  }
  .footer {
    text-align: center;
    height: 76px;
    line-height: 76px;
    .el-button--warning {
      padding: 8px 20px;
      span {
        font-size: 16px;
      }
    }
  }
}
</style>

<style lang="scss">
.el-scrollbar {
  .el-select-dropdown__wrap {
    .el-select-dropdown__list {
      .el-select-dropdown__item {
        line-height: 34px;
        padding-left: 15px;
      }
    }
  }
}
.el-input__inner {
  padding-left: 10px;
  color: rgba(10, 10, 10, 1);
  font-size: 16px;
}
</style>
