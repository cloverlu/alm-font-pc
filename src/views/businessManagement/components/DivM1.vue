<!--
  功能：功能描述
  作者：sunhua
  邮箱：947545659@qq.com
  时间：2020年07月07日 16:40:13
-->
<template lang="pug">
  .m1
    el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini" class='checkForm')
      el-card(class='card')
        el-form-item(label="客户名称 :" class="formItem2")
          el-input(v-model="form.custName" disabled)
        el-form-item(label="贷款期限 :" class="formItem2")
          el-input(v-model="form.loanLength" disabled)
            i(slot="suffix" style="font-style:normal") 月
        el-form-item(label="借据编号 :" class="formItem2")
          el-input(v-model="form.billNo" disabled)
        el-form-item(label="贷款支付方式 :" class="formItem2")
          el-select(v-model="form.payKind" style="width:100%" clearable)
            el-option(v-for="item in payKindArr" :key="item.value" :label="item.label" :value="item.value")
          //- el-input(v-model="form.payKind" clearable :disabled="type == 2")
        el-form-item(label="放款日期 :" class="formItem2")
          el-date-picker(v-model="form.loanDate" style="width:100%" disabled value-format='yyyy-MM-dd' format='yyyy-MM-dd' type="date" placeholder="选择日期")
        el-form-item(label="放款金额 :" class="formItem2")
          el-input(v-model="form.loanAmout" disabled)
        el-form-item(label="约定用途 :" class="formItem2")
          el-input(v-model="form.loanPurpose" type="textarea" :rows="3" clearable :disabled="type == 2")

      el-card(class='card')
        .left
          .cardTitle1
            span(class='blue')
            span(class='title') 首次跟踪检查要求及落实情况
          el-form-item(label="要求 :" class="formItem2")
            el-input(v-model="form.requireCheck" type="textarea" :disabled="type == 2" :rows="3" clearable)
          el-form-item(label="落实情况 :" class="formItem2")
            el-input(v-model="form.checked" type="textarea" :disabled="type == 2" :rows="3" clearable)
        .right
          .cardTitle1
            span(class='blue')
            span(class='title') 首次跟踪特殊要求及落实情况
          el-form-item(label="要求 :" class="formItem2")
            el-input(v-model="form.specialRequireCheck" :disabled="type == 2" type="textarea" :rows="3" clearable)
          el-form-item(label="落实情况 :" class="formItem2")
            el-input(v-model="form.specialChecked" :disabled="type == 2" type="textarea" :rows="3" clearable)

      el-card(class='card')
        el-form-item(label="检查地点 :" class="formItem2")
          el-input(v-model="form.checkAddr" clearable :disabled="type == 2")
        el-form-item(label="接待人员 :" class="formItem2")
          el-input(v-model="form.staff" clearable :disabled="type == 2")
        el-form-item(label="检查配合程度 :" class="formItem2")
          el-select(v-model="form.cooperate" style="width:100%" clearable :disabled="type == 2")
            el-option(v-for="item in cooperateArr" :key="item.value" :label="item.label" :value="item.value")
        el-form-item(label="生产经营场所变动情况 :" class="formItem2")
          el-input(v-model="form.addrChangedMsg" type="textarea" :rows="3" clearable :disabled="type == 2")
      el-card(class='card')
        .cardTitle1
          span(class='blue')
          span(class='title') 检查内容
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="资金使用情况详细说明 :" class="formItem1")
              el-input(v-model="form.detailMsg4useAmout" type="textarea" :disabled="type == 2" :rows="3" clearable)
          el-col(:span="12")
            el-form-item(label="是否按合同约定的用途使用信贷资金 :" class="formItem1")
              el-select(v-model="form.useAmoutByContract" style="width:100%" clearable :disabled="type == 2")
                el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="提供纸质或影像资料的信息来源 :" class="formItem1")
              el-input(v-model="form.msgSource" type="textarea" :disabled="type == 2" :rows="3" clearable)
              .notes ※注：1、贷款发放如采用贷款人受托支付方式，信息来源包括《小企业授信业务额度借款支用单》、《小企业贷款受托支付申请书》、汇款凭证、账户流水、合同、入库单、贷款购买标的(如原材料、机器设备等)等。2、贷款发放如采用借款人自主支付方式，信息来源包括《实际支付清单》、汇款凭证、合同、入库单、贷款购买标的( 如原材料、机器设备等)等。
          el-col(:span="12")
            el-form-item(label="情况说明 :" class="formItem1" )
              el-input(v-model="form.msg" type="textarea" :rows="3" clearable :disabled="type == 2")
        
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

</template>

<script>
import uploadTest from "./upload";
// import { filterParams } from "../../../utils/utils";
export default {
  // 组件名称
  name: "DivM1",
  // 组件参数 接收来自父组件的数据
  props: ["detail"],
  // 局部注册的组件
  components: { uploadTest },
  // 组件状态值
  data() {
    const definte17 = () => {
      const definite17Array = [];
      const valueArray = [
        "《小企业授信业务额度借款支用单》",
        "《小企业贷款受托支付申请书》或自主支付清单",
        "《小企业贷款受托支付申请书》",
        "汇款凭证",
        "账户流水",
        "受托支付合同",
        "入库单",
        "贷款购买标的（如原材料、机器设备等）",
        "企业大门",
        "企业经营场地或生产车间",
        "检查人员现场检查影像等",
        "其他"
      ];
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
      payKindArr: [
        {
          label: "贷款人受托支付",
          value: "1"
        },
        {
          label: "借款人自主支付",
          value: "2"
        },
        {
          label: "受托支付+自主支付",
          value: "3"
        }
      ],
      cooperateArr: [
        {
          label: "配合",
          value: "1"
        },
        {
          label: "一般",
          value: "2"
        },
        {
          label: "不配合",
          value: "3"
        }
      ],
      params: {},
      loanBusiness: {},
      form: {
        // card 1
        bizType: "m1", // 检查类型
        custName: "", // 客户名称  queryType为2时，必传；其他情况非必传
        loanLength: "", // 贷款期限
        billNo: "", //借据编号
        payKind: "", //贷款支付方式
        loanDate: "", //放款日期
        loanAmout: "", //贷款金额
        loanPurpose: "", //约定用途

        // card 2
        requireCheck: "", // 审批意见中首次跟踪检查要求
        checked: "", // 审批意见中首次跟踪检查落实情况
        specialRequireCheck: "", // 产品首次跟踪检查特殊要求
        specialChecked: "", // 产品首次跟踪检查特殊落实情况

        // card 3
        staff: "", // 接待人员
        addrChangedMsg: "", // 生产经营场所变动情况
        cooperate: "1", // 检查配合程度
        checkAddr: "", // 检查地点

        // card4
        msg: "", //情况说明
        useAmoutByContract: 1, //是否按合同约定的用途使用信贷资金
        msgSource: "", //提供纸质或影像资料的信息来源
        detailMsg4useAmout: "" //资金使用情况详细说明
      },
      type: 1,
      dialogImageUrl: "",
      dialogVisible: false,
      formLabelWidth: "72px"
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {
    detail: function(newVal) {
      this.form = newVal;
      this.params = this.matchImage(newVal);
      if (!newVal.payKind) {
        this.form.payKind = "1";
      }
      if (!newVal.cooperate) {
        this.form.cooperate = "1";
      }
    }
  },
  // 组件方法
  methods: {
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
    }, //图片对象匹配
    matchImage(data) {
      // data为详情传来的所有值
      var forBizDetail = data;
      var obj2 = {};
      //  this.mVmodel(num)的num参数为各个类型所需字段的个数
      obj2 = this.mVmodel(12);
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
    // this.params = this.mVmodel(11);
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
  .formItem1 {
    box-sizing: border-box;
    width: 100%;
    margin: 0;
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
  .upload {
    .item {
      .title {
        font-size: 16px;
        color: rgba(10, 10, 10, 1);
      }
    }
  }
}
</style>
