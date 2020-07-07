<!--
  功能：功能描述
  作者：sunhua
  邮箱：947545659@qq.com
  时间：2020年07月07日 16:40:13
-->
<template lang="pug">
  <div class="m2">
    el-card(class='card')
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-form-item(label="客户名称 :" class="formItem2")
          el-input(v-model="form.custName" clearable)
        el-form-item(label="合同编号 :" class="formItem2")
          el-input(v-model="form.contractNo" clearable)
        el-form-item(label="授信业务小类 :" class="formItem2")
          el-input(v-model="form.creditSubLoanKind" clearable)
        el-form-item(label="贷款金额 :" class="formItem2")
          el-input(v-model="form.loanAmout" clearable)
        el-form-item(label="贷款期限 :" class="formItem2")
          el-input(v-model="form.loanLength" clearable)
        el-form-item(label="放款日期 :" class="formItem2")
          el-date-picker(v-model="form.loanDate" style="width:100%" type="date" placeholder="选择日期" clearable)
        el-form-item(label="约定用途 :" class="formItem2")
          el-input(v-model="form.loanPurpose" type="textarea" :rows="2" clearable)
        el-form-item(label="贷款支付方式 :" class="formItem2")
          el-input(v-model="form.repayKind" clearable)

    el-card(class='card')
      .cardTitle
        span(class='blue')
        span(class='title') 检查内容
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini" class='checkForm' )
        el-form-item(label="资金使用情况说明 :" class="formItem2")
          el-input(v-model="form.requireCheck" type="textarea" :rows="2" clearable)
        el-form-item(label="是否按合同约定的用途使用信贷资金 :" class="formItem2")
          el-input(v-model="form.checked" clearable)
        el-form-item(label="是否履行合同约定 :" class="formItem2")
          el-input(v-model="form.checked" clearable)
        el-form-item(label="对我行检查的态度 :" class="formItem2")
          el-input(v-model="form.checked" clearable)
        el-form-item(label="情况说明 :" class="formItem2")
            el-input(v-model="form.requireCheck" type="textarea" :rows="2" clearable)
        el-form-item(label="情况说明 :" class="formItem2")
            el-input(v-model="form.checked" type="textarea" :rows="2" clearable)
    el-card(class='card')
      .cardTitle
        span(class='blue')
        span(class='title') 影像维护
      .uploadBox(v-for='(item,index) in list5' :key='item.index')
        .imgTitle {{item.title}}
        el-upload(action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove")
          i(class="el-icon-plus") 
  </div>
</template>

<script>
import { filterParams } from "../../../utils/utils";
export default {
  // 组件名称
  name: "DivM2",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
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
      list5: [
        {
          title: "《小企业授信业务额度借款支用单》或《用款申请》",
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
      check: ["第一阶段"],
      dialogImageUrl: "",
      dialogVisible: false,
      formLabelWidth: "72px"
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
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
  },
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted() {}
};
</script>

<style lang="scss" scoped>
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
        top: 31px;
        left: 31px;
        height: 16px;
        width: 16px;
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
