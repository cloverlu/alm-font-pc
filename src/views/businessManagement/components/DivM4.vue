<!--
  功能：功能描述
  作者：sunhua
  邮箱：947545659@qq.com
  时间：2020年07月07日 16:40:13
-->
<template lang="pug">
  <div class="m4">
    el-card(class='card')
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini" class='checkForm')
        el-form-item(label="客户名称 :" class="formItem2")
          el-input(v-model="form.custName" clearable)
        el-form-item(label="贷款金额 :" class="formItem2")
          el-input(v-model="form.loanAmout" clearable)
        el-form-item(label="贷款余额 :" class="formItem2")
          el-input(v-model="form.loanBalance" clearable)
        el-form-item(label="贷款期限 :" class="formItem2")
          el-input(v-model="form.loanLength" clearable)
        el-form-item(label="还款方式 :" class="formItem2")
          el-input(v-model="form.repayKind" clearable)
        el-form-item(label="还款日期 :" class="formItem2")
          el-date-picker(v-model="form.repayDate" style="width:100%" type="date" placeholder="选择日期" clearable)
        el-form-item(label="还款金额 :" class="formItem2")
          el-input(v-model="form.repayAmout" clearable)

  el-card(class='card')
    .cardTitle
      span(class='blue')
      span(class='title') 检查阶段
    .cardContent
      el-checkbox-group(v-model="check" @change='onChange')
        el-checkbox(label="第一阶段")
        el-checkbox(label="第二阶段")
        el-checkbox(label="第三阶段")
      
    el-form(:model="form" v-for='(item,index) in form.stageData' :key='index' :inline="true" label-position="top" label-width="80px" size="mini" class='checkForm' )
      el-form-item(label="还款意愿 :" class="formItem2")
        el-input(v-model="item.payIntention" clearable)
      el-form-item(label="检查地点 :" class="formItem2")
        el-input(v-model="item.checkAddr" clearable)
      el-form-item(label="接待人员 :" class="formItem2")
        el-input(v-model="item.staff" clearable)
      el-form-item(label="还款资金来源 :" class="formItem2")
        el-input(v-model="item.amoutSource" clearable)
      el-form-item(label="预计还款/付息时间 :" class="formItem2")
        el-date-picker(v-model="item.expectRepayDate" style="width:100%" type="date" placeholder="选择日期" clearable)
      el-form-item(label="还款资金落实情况说明 :" class="formItem2")
        el-input(v-model="item.practicableMsg" type="textarea" :rows="3" clearable)

  el-card(class='card')
    .cardTitle
      span(class='blue')
      span(class='title') 影像维护
    .uploadBox(v-for='(item,index) in list4' :key='item.index')
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
        stageData: [
          // {
          //   checkStage: "第一阶段", // 检查阶段
          //   payIntention: "", // 还款意愿
          //   checkAddr: "", // 检查地点
          //   staff: "", // 接待人员
          //   amoutSource: "", // 还款资金来源
          //   expectRepayDate: "2020-5-20", // 预计还款/付息时间
          //   practicableMsg: "" // 还款资金落实情况说明
          // },
          // {
          //   checkStage: "第二阶段", // 检查阶段
          //   payIntention: "", // 还款意愿
          //   checkAddr: "", // 检查地点
          //   staff: "", // 接待人员
          //   amoutSource: "", // 还款资金来源
          //   expectRepayDate: "2020-5-20", // 预计还款/付息时间
          //   practicableMsg: "" // 还款资金落实情况说明
          // },
          // {
          //   checkStage: "第三阶段", // 检查阶段
          //   payIntention: "", // 还款意愿
          //   checkAddr: "", // 检查地点
          //   staff: "", // 接待人员
          //   amoutSource: "", // 还款资金来源
          //   expectRepayDate: "2020-5-20", // 预计还款/付息时间
          //   practicableMsg: "" // 还款资金落实情况说明
          // }
        ] //还款资金落实阶段数组
      },
      list4: [
        {
          title: "其他",
          url: "",
          dimension: "",
          longitude: ""
        }
      ],
      check: [],
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
      if (this.check.length === 0) {
        console.log(1);
        this.form.stageData = [];
      } else {
        // this.check.map(item => {
        //   if (item == "第一阶段") {
        //     this.form.stageData.push({
        //       checkStage: "第一阶段", // 检查阶段
        //       payIntention: "", // 还款意愿
        //       checkAddr: "", // 检查地点
        //       staff: "", // 接待人员
        //       amoutSource: "", // 还款资金来源
        //       expectRepayDate: "2020-5-20", // 预计还款/付息时间
        //       practicableMsg: "" // 还款资金落实情况说明
        //     });
        //   } else if (item == "第二阶段") {
        //     this.form.stageData.push({
        //       checkStage: "第二阶段", // 检查阶段
        //       payIntention: "", // 还款意愿
        //       checkAddr: "", // 检查地点
        //       staff: "", // 接待人员
        //       amoutSource: "", // 还款资金来源
        //       expectRepayDate: "2020-5-20", // 预计还款/付息时间
        //       practicableMsg: "" // 还款资金落实情况说明
        //     });
        //   } else if (item == "第三阶段") {
        //     this.form.stageData.push({
        //       checkStage: "第三阶段", // 检查阶段
        //       payIntention: "", // 还款意愿
        //       checkAddr: "", // 检查地点
        //       staff: "", // 接待人员
        //       amoutSource: "", // 还款资金来源
        //       expectRepayDate: "2020-5-20", // 预计还款/付息时间
        //       practicableMsg: "" // 还款资金落实情况说明
        //     });
        //   }
        // });
      }
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
}
</style>
