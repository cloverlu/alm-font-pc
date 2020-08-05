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
        el-tab-pane(label="申请明细" name="first" :disabled='canTouch')
        el-tab-pane(label="流程上报" name="second" :disabled='canTouch')
    .content1(v-show="activeName == 'first'")
      .contentTop
        el-form(:model="form" :inline="true" label-position="left" label-width="80px" size="mini" class="demo-form-inline formBox")
          el-form-item(label="检查类型" class="formItem5")
            el-select(v-model="form.bizType" clearable @change='onChange' style="width:100%" :disabled='canChange == 2')
              el-option(label="小企业授信业务首次跟踪检查" value="m1")
              el-option(label="小企业授信业务贷后例行检查" value="m2")
              el-option(label="小企业授信业务贷后全面检查" value="m3")
              el-option(label="小企业授信业务还款资金落实情况检查" value="m4")
              el-option(label="小企业法人快捷贷首次检查" value="m5")
              el-option(label="小企业法人快捷贷贷后日常检查" value="m6")
          el-button(type="primary" size="mini" v-antiShake="[() => { onSave() }, 1000]" class="btn" v-if='status==1 && type==1') 保存
      .contentBody
        .type(v-show="form.bizType == 'm1'")
          DivM1(:detail="paramsM1" ref="DivM1")
        .type(v-show="form.bizType == 'm2'")
          DivM2(:detail="paramsM2" ref="DivM2")
        .type(v-show="form.bizType == 'm3'")  
          DivM3(:detail="paramsM3" ref="DivM3")
        .type(v-show="form.bizType == 'm4'")
          DivM4(:detail="paramsM4" ref="DivM4")
        .type(v-show="form.bizType == 'm5'")
          DivM5(:detail="paramsM5" ref="DivM5")
        .type(v-show="form.bizType == 'm6'")
          DivM6(:detail="paramsM6" ref="DivM6")
      //- 提交
      .footer
        el-button(type="warning" v-antiShake="[() => { onSubmit() }, 1000]" v-if='status==1 && type==1') 提交
        //- el-button(type="warning" @click='onSubmit') 提交

    .content2(v-show="activeName == 'second'")
      .textContent
        el-card(class='card')
          .cardTitle
            span(class='blue')
            span(class='title') 环节信息
          .approvaList(v-for='(item,index) in approvaList' :key='index')
            el-form(label-position="left" label-width="80px" style="borderBottom:1px dashed #CCC")
              el-form-item(label="环节 :" class='noBorder')
                el-input(v-model="item.linkName" disabled)
              el-form-item(label="处理机构 :" class='noBorder')
                el-input(v-model="item.orgName" disabled)
              el-form-item(label="处理人员 :" class='noBorder')
                el-input(v-model="item.emplName" disabled)
              el-form-item(label="处理时间 :" class='noBorder')
                el-input(v-model="item.processTime" disabled)
              el-form-item(label="意见 :" class='noBorder')
                el-select(v-model="item.agreeResult" disabled v-if="item.agreeResult")
                  el-option(label="同意" value="1")
                  el-option(label="不同意" value="0")
                  el-option(label="" value="")
                span(v-if="!item.agreeResult") 无
                //- el-input(v-model="item.agreeResult" disabled)

        el-card(class='card' v-if='status==1')
          el-button(type="primary" v-antiShake="[() => { onSubmitApproval('0') }, 1000]" v-if="status==1" class='save') 保存
          el-form(label-position="left" label-width="280px" :model="approval" style="marginTop:20px")
            el-row
              el-col(:span="24")
                el-form-item(label="客户名称:" class="formItem2")
                  span {{approval.custName}}
              el-col(:span="24" v-if="showNextEmplName")
                el-form-item(label="业务上报至:" class="formItem2")
                  span {{approval.nextLinkName}}
              el-col(:span="24" v-if="showNextEmplName")
                el-form-item(label="业务接收人:" class="formItem2")
                  el-select(v-model="approval.nextEmplName" placeholder="请选择" style='width:100%')
                    el-option(v-for="item in nextEmplNameList" :key="item" :label="item" :value="item")
              el-col(:span="24")
                el-form-item(label="上报时间:" class="formItem2")
                  span {{this.$moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}}
          components(:is="commpoentName" ref="commpoent" :approveDetail='approval' v-if='approveContent')
          el-form(label-position="left" label-width="280px" :model="approval" style="marginTop:20px" v-if='!approveContent')
            el-form-item(label="是否存在风险预警信号:" class="formItem2")
              el-select(v-model="approval.existRisk" placeholder="请选择" style='width:100%')
                el-option(label="是" value="1")
                el-option(label="否" value="0")
            el-form-item(label="预警信号说明:" class="formItem2")
              el-input(v-model="approval.riskMsg" type="textarea" :rows="2" clearable)
            el-form-item(label="检查结论及措施建议:" class="formItem2")
              el-input(v-model="approval.suggest" type="textarea" :rows="2" clearable)
          el-form(label-position="left" label-width="280px" :model="approval" style="marginTop:20px")
            el-col(:span="24")
              el-form-item(label="检查人员:" class="formItem2")
                //- el-button(class="qianzi" @click="goSign" size='mini' type='primary') 签字
                img(:src='approval.empSign' v-if='approval.empSign' class='imgContent')
                img(:src='bg' v-if='!approval.empSign' class='imgContent')
      .footer(v-if='status==1')
          el-button(type="warning" v-antiShake="[() => { onSubmitApproval('1') }, 1000]" v-if="status==1 && approvaList.length == 0") 提交审批
          el-button(type="warning" size='normal' v-antiShake="[() => { onSubmitApproval('1') }, 1000]" v-if="status==1 && approvaList.length !== 0") 提交
          el-button(type="info" v-antiShake="[() => { onSubmitApproval('2') }, 1000]" v-if="status==1 && approvaList.length !== 0") 回退
          el-button(type="primary" v-antiShake="[() => { onSubmitApproval('3') }, 1000]" v-if="status==1 && approvaList.length !== 0") 退回上一岗位
    el-dialog(:visible.sync="dialogVisible" :append-to-body="true" width="800px" v-alterELDialogMarginTop="{marginTop:'30vh'}" ref="signArea")
      .title
        span 签名:
      .boardBox(ref="boardBox")
        canvas(ref="board" style="width:100%;height:100%" @mousedown="pcStart" @mousemove="pcMove" @mouseup="pcEnd" id="board")
      .canvasBtn
        el-button(type="primary" @click="saveCanvas") 确认签名
        el-button(type="default" @click="clearCanvas" ref="clearCanvas") 重置签名
</template>

<script>
import { filterParams } from "../../utils/utils";
import bg from "../../assets/img/none.png";
import {
  saveEditModelBusiness,
  approveDetail,
  approve,
  getNextEmplName,
  queryForDetail,
  queryForBizDtail
} from "../../api/loanlnspection";
import DivM1 from "./components/DivM1.vue";
import DivM2 from "./components/DivM2.vue";
import DivM3 from "./components/DivM3.vue";
import DivM4 from "./components/DivM4.vue";
import DivM5 from "./components/DivM5.vue";
import DivM6 from "./components/DivM6.vue";
import processing2 from "./approve/processing2";
import processing21 from "./approve/processing21";
import processing23 from "./approve/processing23";
import processing25 from "./approve/processing25";
import processing26 from "./approve/processing26";
import processing27 from "./approve/processing27";
import processing28 from "./approve/processing28";
import processing29 from "./approve/processing29";
import processing210 from "./approve/processing210";
import processing211 from "./approve/processing211";
import processing212 from "./approve/processing212";
import processing213 from "./approve/processing213";

export default {
  name: "iouList",
  components: {
    DivM1,
    DivM2,
    DivM3,
    DivM4,
    DivM5,
    DivM6,
    processing2,
    processing21,
    processing23,
    processing25,
    processing26,
    processing27,
    processing28,
    processing29,
    processing210,
    processing211,
    processing212,
    processing213
  },
  data() {
    this.$moment.locale("zh-cn");
    const dateTime = this.$moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    return {
      activeName: "first",
      form: {
        // card 1
        bizType: "m1" // 检查类型
      },
      type: 1,
      bg: bg,
      canChange: 1,
      approvaList: [],
      approval: {
        // 流程上报
        custName: "", // 客户名称
        nextLinkName: "", // 业务上报至
        nextEmplName: "", // 业务接收人
        approveTime: dateTime, // 上报时间
        existRisk: "", // 是否存在风险预警信号
        riskMsg: "", // 预警信号说明
        suggest: "", // 检查结论及措施建议
        empSign: "" // 检查人员
      },
      status: 1,
      biggerThan500: 1,
      showNextEmplName: true,
      currPost1: "",
      paramsM1: {},
      paramsM2: {},
      paramsM3: {},
      paramsM4: {},
      paramsM5: {},
      paramsM6: {},
      params: {},
      signName: "",
      allBtn: false,
      approveContent: false,
      submitBtn: true,
      commpoentName: "",
      loanBusiness: {},
      dialogVisible: false,
      formLabelWidth: "72px",
      canTouch: true,
      nextEmplNameList: [],
      ctx: null,
      point: {
        x: 0,
        y: 0
      },
      moving: false
    };
  },
  mounted() {
    this.$moment.locale("zh-cn");
    // 进入页面先调用查询接口
    const { billNo, bizId, bizStatus, status } = this.$route.query;
    this.status = status;
    if (billNo) {
      // 借据
      this.type = 1;
      this.canChange = 1;
      this.submitBtn = false;
      this.paramsM1.billNo = billNo;
      this.paramsM1.type = 1;
      this.form.bizId = "";
      queryForDetail(this, {
        billNo,
        bizType: this.form.bizType
      }).then(res => {
        this.currPost1 = res.data.data.currPost;
        if (res.data.returnCode == "200000") {
          for (var key in res.data.data) {
            if (res.data.data[key] == null) {
              res.data.data[key] = "";
            }
          }
          if (!res.data.data.assetCreditInfo) {
            res.data.data.assetCreditInfo = {
              queryDate: "", //征信报告查询日期
              fiveClass: "", // 当前企业及实际控制人征信情况(注明征信查询分类结果)
              shrinkLoanScale: 1, //企业或企业主是否有他行收缩贷款规模
              shrinkLoanScaleMsg: "", //收缩贷款规模说明
              addedOverdues: 1, //企业或企业主征信是否有新增逾期记录
              addedOverduesMsg: "", //新增逾期记录说明
              addedGuarantees: 1, // 企业或企业主是否有新增对外担保记录
              addedGuaranteesMsg: "", //新增对外担保记录说明
              addedLoans: 1, //企业或企业主是否有他行新增贷款
              addedLoansMsg: "", //他行新增贷款说明
              otherSitu: 1, //企业或企业主是否有其他异常变化
              otherSituMsg: "" //其他异常变化说明
            };
          }
          if (!res.data.data.assitInfoForGuarantee) {
            res.data.data.assitInfoForGuarantee = [
              {
                assitName: "",
                CooperatStatus: "",
                assitFiveClass: ""
              }
            ];
          }
          if (!res.data.data.assitInfoForPledge) {
            res.data.data.assitInfoForPledge = [
              {
                assitName: "",
                assitAddr: "",
                firstEstimateDate: "",
                firstEstimateValue: "",
                firstMortAndpleRate: "",
                LastEstimateDate: "",
                LastEstimateValue: "",
                LastMortAndpleRate: "",
                thisEstimateDate: "",
                thisEstimateValue: "",
                thisMortAndpleRate: ""
              }
            ];
          }
          if (!res.data.data.securityKind) {
            res.data.data.securityKind = ["1"];
          }
          if (!res.data.data.payKind) {
            res.data.data.payKind = "1";
          }
          if (!res.data.data.creditInfo) {
            res.data.data.creditInfo = {
              queryDateForPer: "",
              queryDateForCom: "",
              existBadRecord: 1,
              existCreditChage1: 1,
              existCreditChage2: 1,
              existCreditChage3: 1,
              existBadRecordCon: 1,
              existCreditChage4: 1,
              existBadRecordJur: 1,
              existCreditChage5: 1,
              existCreditChager6: 1
            };
          }
          if (!res.data.data.financeInfo) {
            res.data.data.financeInfo = {
              financeClassification: "1",
              stockLastBalance: "", // 上次全面检查或调查时余额--- 存货
              stockChangSitu: "", //本次检查存货变动情况
              dailyExpenLastBalance: "", //上次全面检查或调查时余额---水、电、煤、气费其中一项或多项
              dailyExpenChangSitu: "", //本次检查存货变动情况
              busIncLastBalance: "", //上次全面检查或调查时余额--- 营业收入
              busIncChangSitu: "", //本次检查存货变动情况
              financeMsg: ""
            };
          }
          if (!res.data.data.stageData || res.data.data.stageData.length == 0) {
            res.data.data.stageData = [
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

          this.form.bizType = res.data.data.bizType;
          this.params = res.data.data;
          if (res.data.data.bizType === "m1") {
            this.paramsM1 = this.params;
          } else if (res.data.data.bizType === "m2") {
            this.paramsM2 = this.params;
          } else if (res.data.data.bizType === "m3") {
            this.paramsM3 = this.params;
          } else if (res.data.data.bizType === "m4") {
            this.paramsM4 = this.params;
          } else if (res.data.data.bizType === "m5") {
            this.paramsM5 = this.params;
          } else {
            this.paramsM6 = this.params;
          }
        }
      });
    }
    if (bizStatus === "alreadyDo" || bizStatus === "inReview") {
      this.type = 2;
    }
    if (bizStatus === "alreadyDo" || this.status == 2) {
      this.allBtn = true;
    }
    if (bizStatus === "shouldDo" || bizStatus === "notDo") {
      this.submitBtn = false;
    }
    if (bizId) {
      // this.routerMatch();
      // 业务
      this.form.billNo = "";
      this.canChange = 2;
      this.canTouch = false;
      this.form.bizId = bizId;
      queryForBizDtail(this, {
        bizId,
        bizType: this.form.bizType
      }).then(res => {
        this.currPost1 = res.data.data.currPost;
        if (res.data.returnCode == "200000") {
          for (var key in res.data.data) {
            if (res.data.data[key] == null) {
              res.data.data[key] = "";
            }
          }

          if (!res.data.data.assetCreditInfo) {
            res.data.data.assetCreditInfo = {
              queryDate: "", //征信报告查询日期
              fiveClass: "", // 当前企业及实际控制人征信情况(注明征信查询分类结果)
              shrinkLoanScale: 1, //企业或企业主是否有他行收缩贷款规模
              shrinkLoanScaleMsg: "", //收缩贷款规模说明
              addedOverdues: 1, //企业或企业主征信是否有新增逾期记录
              addedOverduesMsg: "", //新增逾期记录说明
              addedGuarantees: 1, // 企业或企业主是否有新增对外担保记录
              addedGuaranteesMsg: "", //新增对外担保记录说明
              addedLoans: 1, //企业或企业主是否有他行新增贷款
              addedLoansMsg: "", //他行新增贷款说明
              otherSitu: 1, //企业或企业主是否有其他异常变化
              otherSituMsg: "" //其他异常变化说明
            };
          }
          if (!res.data.data.assitInfoForGuarantee) {
            res.data.data.assitInfoForGuarantee = [
              {
                assitName: "",
                CooperatStatus: "",
                assitFiveClass: ""
              }
            ];
          }
          if (!res.data.data.assitInfoForPledge) {
            res.data.data.assitInfoForPledge = [
              {
                assitName: "",
                assitAddr: "",
                firstEstimateDate: "",
                firstEstimateValue: "",
                firstMortAndpleRate: "",
                LastEstimateDate: "",
                LastEstimateValue: "",
                LastMortAndpleRate: "",
                thisEstimateDate: "",
                thisEstimateValue: "",
                thisMortAndpleRate: ""
              }
            ];
          }
          if (!res.data.data.securityKind) {
            res.data.data.securityKind = ["1"];
          }
          if (!res.data.data.payKind) {
            res.data.data.payKind = "1";
          }
          if (!res.data.data.creditInfo) {
            res.data.data.creditInfo = {
              queryDateForPer: "",
              queryDateForCom: "",
              existBadRecord: 1,
              existCreditChage1: 1,
              existCreditChage2: 1,
              existCreditChage3: 1,
              existBadRecordCon: 1,
              existCreditChage4: 1,
              existBadRecordJur: 1,
              existCreditChage5: 1,
              existCreditChager6: 1
            };
          }
          if (!res.data.data.financeInfo) {
            res.data.data.financeInfo = {
              financeClassification: "1",
              stockLastBalance: "", // 上次全面检查或调查时余额--- 存货
              stockChangSitu: "", //本次检查存货变动情况
              dailyExpenLastBalance: "", //上次全面检查或调查时余额---水、电、煤、气费其中一项或多项
              dailyExpenChangSitu: "", //本次检查存货变动情况
              busIncLastBalance: "", //上次全面检查或调查时余额--- 营业收入
              busIncChangSitu: "", //本次检查存货变动情况
              financeMsg: ""
            };
          }
          if (!res.data.data.stageData || res.data.data.stageData.length == 0) {
            res.data.data.stageData = [
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
          this.form.bizType = res.data.data.bizType;
          this.params = res.data.data;
          if (res.data.data.bizType === "m1") {
            this.paramsM1 = this.params;
          } else if (res.data.data.bizType === "m2") {
            this.paramsM2 = this.params;
          } else if (res.data.data.bizType === "m3") {
            this.paramsM3 = this.params;
          } else if (res.data.data.bizType === "m4") {
            this.paramsM4 = this.params;
          } else if (res.data.data.bizType === "m5") {
            this.paramsM5 = this.params;
          } else {
            this.paramsM6 = this.params;
          }
        }
      });
    }
  },
  methods: {
    // 保存
    onSave: function() {
      let data = {};
      let arrs = {};
      if (this.form.bizType == "m1") {
        // m1
        for (let i = 0; i < this.$refs.DivM1.titleList.length; i++) {
          const a = `pic_${i + 1}s`;
          arrs[a] = this.$refs.DivM1.$refs[`definte16${i}`][0].fileList[a];
        }
        this.loanBusiness = Object.assign({}, this.type, arrs);
        data = {
          ...filterParams(this.$refs.DivM1.form),
          ...this.loanBusiness,
          bizType: "m1"
        };
      } else if (this.form.bizType == "m2") {
        // m2
        for (let i = 0; i < this.$refs.DivM2.titleList.length; i++) {
          const a = `pic_${i + 1}s`;
          arrs[a] = this.$refs.DivM2.$refs[`definte16${i}`][0].fileList[a];
        }
        this.loanBusiness = Object.assign({}, this.type, arrs);
        data = {
          ...filterParams(this.$refs.DivM2.form),
          ...this.loanBusiness,
          bizType: "m2"
        };
      } else if (
        this.form.bizType == "m3" &&
        this.$refs.DivM3.form.financeInfo.financeClassification == "1"
      ) {
        // m3
        for (let i = 0; i < this.$refs.DivM3.titleList.length; i++) {
          const a = `pic_${i + 1}s`;
          arrs[a] = this.$refs.DivM3.$refs[`definte16${i}`][0].fileList[a];
        }
        this.loanBusiness = Object.assign({}, this.type, arrs);
        this.$refs.DivM3.form.financeInfo.financeClassification = "1";
        data = {
          ...filterParams(this.$refs.DivM3.form),
          ...filterParams(this.$refs.DivM3.$refs.tabForm1.form),
          ...this.loanBusiness,
          bizType: "m3"
        };
      } else if (
        this.form.bizType == "m3" &&
        this.$refs.DivM3.form.financeInfo.financeClassification == "2"
      ) {
        // m3
        for (let i = 0; i < this.$refs.DivM3.titleList.length; i++) {
          const a = `pic_${i + 1}s`;
          arrs[a] = this.$refs.DivM3.$refs[`definte16${i}`][0].fileList[a];
        }
        this.loanBusiness = Object.assign({}, this.type, arrs);
        data = {
          ...filterParams(this.$refs.DivM3.form),
          ...filterParams(this.$refs.DivM3.$refs.tabForm2.form),
          ...this.loanBusiness,
          bizType: "m3"
        };
      } else if (this.form.bizType == "m4") {
        // m4
        for (let i = 0; i < this.$refs.DivM4.titleList.length; i++) {
          const a = `pic_${i + 1}s`;
          arrs[a] = this.$refs.DivM4.$refs[`definte16${i}`][0].fileList[a];
        }
        this.loanBusiness = Object.assign({}, this.type, arrs);
        data = {
          ...filterParams(this.$refs.DivM4.form),
          ...this.loanBusiness,
          bizType: "m4"
        };
      } else if (this.form.bizType == "m5") {
        // m5
        for (let i = 0; i < this.$refs.DivM5.titleList.length; i++) {
          const a = `pic_${i + 1}s`;
          arrs[a] = this.$refs.DivM5.$refs[`definte16${i}`][0].fileList[a];
        }
        this.loanBusiness = Object.assign({}, this.type, arrs);
        data = {
          ...filterParams(this.$refs.DivM5.form),
          ...this.loanBusiness,
          bizType: "m5"
        };
      } else {
        // m6
        for (let i = 0; i < this.$refs.DivM6.titleList.length; i++) {
          const a = `pic_${i + 1}s`;
          arrs[a] = this.$refs.DivM6.$refs[`definte16${i}`][0].fileList[a];
        }
        this.loanBusiness = Object.assign({}, this.type, arrs);
        data = {
          ...filterParams(this.$refs.DivM6.form),
          ...this.loanBusiness,
          bizType: "m6"
        };
      }

      // console.log(data);
      saveEditModelBusiness(this, {
        ...data
      }).then(res => {
        if (res.data.returnCode === "200000") {
          this.$message({
            message: "检查申请编辑操作成功",
            type: "success"
          });
          // setTimeout(() => {
          //   history.go(-1);
          // }, 500);
        } else {
          this.$message({
            message: res.data.returnMsg,
            type: "success"
          });
        }
      });
    },
    // 提交
    onSubmit: function() {
      let data = {};
      let arrs = {};
      if (this.form.bizType == "m1") {
        // m1
        for (let i = 0; i < this.$refs.DivM1.titleList.length; i++) {
          const a = `pic_${i + 1}s`;
          arrs[a] = this.$refs.DivM1.$refs[`definte16${i}`][0].fileList[a];
        }
        this.loanBusiness = Object.assign({}, this.type, arrs);
        data = {
          ...filterParams(this.$refs.DivM1.form),
          ...this.loanBusiness,
          bizType: "m1"
        };
      } else if (this.form.bizType == "m2") {
        // m2
        for (let i = 0; i < this.$refs.DivM2.titleList.length; i++) {
          const a = `pic_${i + 1}s`;
          arrs[a] = this.$refs.DivM2.$refs[`definte16${i}`][0].fileList[a];
        }
        this.loanBusiness = Object.assign({}, this.type, arrs);
        data = {
          ...filterParams(this.$refs.DivM2.form),
          ...this.loanBusiness,
          bizType: "m2"
        };
      } else if (
        this.form.bizType == "m3" &&
        this.$refs.DivM3.form.financeInfo.financeClassification == "1"
      ) {
        // m3
        for (let i = 0; i < this.$refs.DivM3.titleList.length; i++) {
          const a = `pic_${i + 1}s`;
          arrs[a] = this.$refs.DivM3.$refs[`definte16${i}`][0].fileList[a];
        }
        this.loanBusiness = Object.assign({}, this.type, arrs);
        data = {
          ...filterParams(this.$refs.DivM3.form),
          ...filterParams(this.$refs.DivM3.$refs.tabForm1.form),
          ...this.loanBusiness,
          bizType: "m3"
        };
      } else if (
        this.form.bizType == "m3" &&
        this.$refs.DivM3.form.financeInfo.financeClassification == "2"
      ) {
        // m3
        for (let i = 0; i < this.$refs.DivM3.titleList.length; i++) {
          const a = `pic_${i + 1}s`;
          arrs[a] = this.$refs.DivM3.$refs[`definte16${i}`][0].fileList[a];
        }
        this.loanBusiness = Object.assign({}, this.type, arrs);
        data = {
          ...filterParams(this.$refs.DivM3.form),
          ...filterParams(this.$refs.DivM3.$refs.tabForm2.form),
          ...this.loanBusiness,
          bizType: "m3"
        };
      } else if (this.form.bizType == "m4") {
        // m4
        for (let i = 0; i < this.$refs.DivM4.titleList.length; i++) {
          const a = `pic_${i + 1}s`;
          arrs[a] = this.$refs.DivM4.$refs[`definte16${i}`][0].fileList[a];
        }
        this.loanBusiness = Object.assign({}, this.type, arrs);
        data = {
          ...filterParams(this.$refs.DivM4.form),
          ...this.loanBusiness,
          bizType: "m4"
        };
      } else if (this.form.bizType == "m5") {
        // m5
        for (let i = 0; i < this.$refs.DivM5.titleList.length; i++) {
          const a = `pic_${i + 1}s`;
          arrs[a] = this.$refs.DivM5.$refs[`definte16${i}`][0].fileList[a];
        }
        this.loanBusiness = Object.assign({}, this.type, arrs);
        data = {
          ...filterParams(this.$refs.DivM5.form),
          ...this.loanBusiness,
          bizType: "m5"
        };
      } else {
        // m6
        for (let i = 0; i < this.$refs.DivM6.titleList.length; i++) {
          const a = `pic_${i + 1}s`;
          arrs[a] = this.$refs.DivM6.$refs[`definte16${i}`][0].fileList[a];
        }
        this.loanBusiness = Object.assign({}, this.type, arrs);
        data = {
          ...filterParams(this.$refs.DivM6.form),
          ...this.loanBusiness,
          bizType: "m6"
        };
      }

      // console.log(data);

      saveEditModelBusiness(this, { ...data }).then(res => {
        if (res.data.returnCode === "200000") {
          this.$message({
            message: "检查申请编辑操作成功",
            type: "success"
          });
          this.submitBtn = true;
          const id = res.data.bizId;
          const currPost1 = this.currPost1;
          setTimeout(() => {
            approveDetail(this, { bizId: id }).then(res => {
              this.activeName = "second";
              this.approval = res.data.data;
              this.approval.emplSign = sessionStorage.getItem("emplSign");
              this.approval.bizId = id;
              this.approvaList = res.data.data.aproveInfo || [];
              this.biggerThan500 = res.data.data.biggerThan500;
              this.routerMatch();
              const { currPost } = this.$route.query;
              let pa;
              if (currPost) {
                pa = {
                  orgName: res.data.data.custOrg,
                  currPost,
                  biggerThan500: this.biggerThan500
                };
              } else {
                pa = {
                  orgName: res.data.data.custOrg,
                  currPost: currPost1,
                  biggerThan500: this.biggerThan500
                };
              }
              getNextEmplName(this, pa).then(ress => {
                this.nextEmplNameList = ress.data.data.nextEmplNameList;
              });
            });
          }, 500);
        } else {
          this.$message({
            message: res.data.returnMsg,
            type: "success"
          });
        }
      });
    },
    onSubmitApproval(type) {
      const { currPost } = this.$route.query;
      this.approval.approveTime = this.$moment(new Date()).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      this.approval.opType = type;
      let data;
      if (
        currPost == "220" ||
        currPost == "221" ||
        currPost == "222" ||
        currPost == "320" ||
        currPost == "321"
      ) {
        data = {
          ...this.approval,
          ...this.$refs.commpoent.params
        };
      } else {
        data = {
          ...this.approval
        };
      }

      delete data.aproveInfo;
      approve(this, { ...filterParams(data) }).then(res => {
        if (res.data.returnCode === "200000") {
          this.$message({
            message: "操作成功",
            type: "success"
          });
          if (type != "0") {
            setTimeout(() => {
              history.go(-1);
            }, 500);
          }
        } else {
          this.$message({
            message: res.data.returnMsg,
            type: "error"
          });
        }
      });
    },
    // 审批页面的展示判断
    routerMatch() {
      //一级支行主管岗     321
      //一级支行第二经营主责任人  320
      //二级分行贷后管理岗        222
      //二级分行主管岗         221
      //二级分行第二经营主责任人   220
      const {
        currPost,
        biggerThan500,
        belongBranch,
        bizType
      } = this.$route.query;
      // console.log(currPost, biggerThan500, belongBranch, bizType);
      if (currPost) {
        this.approveContent = true;
      }
      if (currPost == "320" && biggerThan500 == 0) {
        this.showNextEmplName = false;
      }
      console.log(this.approvaList);
      if (currPost == "222" && this.approvaList.length == 3) {
        this.showNextEmplName = false;
      }

      if (currPost === "322" || currPost === "321") {
        if (bizType === "m1" || bizType === "m3") {
          this.commpoentName = "processing2";
        } else if (bizType === "m2" || bizType === "m5") {
          this.commpoentName = "processing27";
        } else if (bizType === "m4") {
          this.commpoentName = "processing25";
        } else if (bizType === "m6") {
          this.commpoentName = "processing29";
        }
      } else if (currPost === "320") {
        if (biggerThan500 === 1) {
          if (bizType === "m1") {
            this.commpoentName = "processing2";
          } else if (bizType === "m2" || bizType === "m5") {
            this.commpoentName = "processing27";
          } else if (bizType === "m3") {
            this.commpoentName = "processing21";
          } else if (bizType === "m4") {
            this.commpoentName = "processing25";
          } else if (bizType === "m6") {
            this.commpoentName = "processing29";
          }
        } else {
          if (bizType === "m1" || bizType === "m3") {
            this.commpoentName = "processing23";
            this.signName = "审核";
          } else if (bizType === "m2" || bizType === "m5") {
            this.commpoentName = "processing28";
            this.signName = "审核";
          } else if (bizType === "m4") {
            this.commpoentName = "processing26";
            this.signName = "审核";
          } else if (bizType === "m6") {
            this.commpoentName = "processing210";
            this.signName = "审核";
          }
        }
      } else if (currPost === "222") {
        if (belongBranch === 1) {
          if (bizType === "m1" || bizType === "m3") {
            this.commpoentName = "processing2";
          } else if (bizType === "m2" || bizType === "m5") {
            this.commpoentName = "processing27";
          } else if (bizType === "m4") {
            this.commpoentName = "processing25";
          } else if (bizType === "m6") {
            this.commpoentName = "processing29";
          }
        } else {
          if (bizType === "m1" || bizType === "m3") {
            this.commpoentName = "processing213";
            this.signName = "审核";
          } else if (bizType === "m2" || bizType === "m5") {
            this.commpoentName = "processing210";
            this.signName = "审核";
          } else if (bizType === "m4") {
            this.commpoentName = "processing26";
            this.signName = "审核";
          } else if (bizType === "m6") {
            this.commpoentName = "processing210";
            this.signName = "审核";
          }
        }
      } else if (currPost === "221") {
        if (bizType === "m1" || bizType === "m3") {
          this.commpoentName = "processing2";
        } else if (bizType === "m2" || bizType === "m5") {
          this.commpoentName = "processing27";
        } else if (bizType === "m4") {
          this.commpoentName = "processing25";
        } else if (bizType === "m6") {
          this.commpoentName = "processing29";
        }
      } else if (currPost === "220") {
        if (bizType === "m1" || bizType === "m3") {
          this.commpoentName = "processing23";
          this.signName = "审核";
        } else if (bizType === "m2" || bizType === "m5") {
          this.commpoentName = "processing28";
          this.signName = "审核";
        } else if (bizType === "m4") {
          this.commpoentName = "processing26";
          this.signName = "审核";
        } else if (bizType === "m6") {
          this.commpoentName = "processing210";
          this.signName = "审核";
        }
      }
    },
    handleClick() {
      const { bizId, currPost } = this.$route.query;
      if (this.activeName == "second") {
        approveDetail(this, { bizId }).then(res => {
          this.activeName = "second";
          this.approval = res.data.data;
          this.approval.bizId = bizId;
          this.approval.empSign = sessionStorage.getItem("emplSign");
          this.approvaList = res.data.data.aproveInfo || [];
          this.biggerThan500 = res.data.data.biggerThan500;
          this.routerMatch();
          const pa = {
            orgName: res.data.data.custOrg,
            currPost,
            biggerThan500: this.biggerThan500
          };
          if (this.status == 1) {
            getNextEmplName(this, pa).then(ress => {
              this.nextEmplNameList = ress.data.data.nextEmplNameList;
            });
          }
        });
      }
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
      if (this.form.bizType === "m1") {
        this.paramsM1 = this.params;
      } else if (this.form.bizType === "m2") {
        this.paramsM2 = this.params;
      } else if (this.form.bizType === "m3") {
        this.paramsM3 = this.params;
      } else if (this.form.bizType === "m4") {
        this.paramsM4 = this.params;
      } else if (this.form.bizType === "m5") {
        this.paramsM5 = this.params;
      } else {
        this.paramsM6 = this.params;
      }
    },
    goSign() {
      this.approval.empSign = "";
      this.dialogVisible = true;
      let board = document.getElementById("board");
      this.ctx = board.getContext("2d");
    },
    // 鼠标按下(开始)
    pcStart(e) {
      let x = e.offsetX,
        y = e.offsetY; // 获取鼠标在画板（canvas）的坐标
      this.point.x = x;
      this.point.y = y;
      this.ctx.beginPath();
      this.moving = true;
      this.cxt.moveTo(
        e.changedTouches[0].clientX -
          e.target.offsetLeft +
          document.documentElement.scrollLeft,
        e.changedTouches[0].clientY -
          40 -
          e.target.offsetTop +
          document.documentElement.scrollTop
      );
    },
    // 鼠标移动（移动中...）
    pcMove(e) {
      if (this.moving) {
        let x = e.offsetX,
          y = e.offsetY; // 获取鼠标在画板（canvas）的坐标
        this.ctx.moveTo(this.point.x, this.point.y); // 把路径移动到画布中的指定点，不创建线条(起始点)
        this.ctx.lineTo(x, y); // 添加一个新点，然后创建从该点到画布中最后指定点的线条，不创建线条
        this.ctx.stroke(); // 绘制
        (this.point.x = x), (this.point.y = y); // 重置点坐标为上一个坐标
      }
    },
    // 鼠标松开（结束）
    pcEnd() {
      if (this.moving) {
        this.ctx.closePath(); // 停止绘制
        this.moving = false; // 关闭绘制开关
      }
    },
    // 保存图片
    saveCanvas() {
      let board = document.getElementById("board");
      let imgBase64 = board.toDataURL();
      this.params.empSign = imgBase64;
      setTimeout(() => {
        board.innerHTML = "";
        this.dialogVisible = false;
      }, 200);
    },
    // 重置图片
    clearCanvas() {
      let board = document.getElementById("board");
      let ctx = board.getContext("2d");
      ctx.clearRect(0, 0, 760, 380);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/global.scss";
.inspectionApplication {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
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
  }
  .textContent {
    padding: 30px 40px 0;
    // border-bottom: 1px dashed #ccc;
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
        /deep/.el-select {
          /deep/.el-input__suffix {
            display: none;
          }
        }
      }
    }
    // /deep/.el-form-item {
    //   margin: 5px 0;
    // }
    .formItem2 {
      box-sizing: border-box;
      width: 542px;
      margin: 10px 0;
      padding-right: 20px;
      /deep/.el-form-item__label {
        // padding: 10px 0 0;
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
            font-weight: normal;
          }
        }
      }
    }
    .imgContent {
      width: 200px;
      height: 100%;
    }
    .card {
      width: 100%;
      margin-bottom: 10px;
      position: relative;
      .save {
        position: absolute;
        right: 10%;
      }
      .cardTitle {
        margin: 0;
        margin-bottom: 10px;
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
      .approvaList {
        /deep/.el-input.is-disabled .el-input__inner {
          background-color: #fff;
        }
      }
    }
  }
  .footer {
    text-align: center;
    height: 76px;
    line-height: 76px;
    .el-button {
      span {
        font-size: 16px;
      }
    }
  }
  .boardBox {
    margin: 20px auto;
    width: 100%;
    background: #eee;
    canvas {
      border: 1px solid #298cff;
    }
  }
}
</style>

<style lang="scss">
@import "../../assets/style/global.scss";
.el-scrollbar {
  /deep/.el-select-dropdown__wrap {
    /deep/.el-select-dropdown__list {
      /deep/.el-select-dropdown__item {
        line-height: 34px;
        height: 34px;
        padding-left: 15px;
      }
    }
  }
}
.el-input__inner {
  padding-left: 10px;
  color: rgba(10, 10, 10, 1);
  font-size: 16px;
  // font-family: "微软雅黑";
}
.el-textarea {
  /deep/.el-textarea__inner {
    font-size: 16px;
    color: rgba(10, 10, 10, 1);
    line-height: 31px;
    font-family: "微软雅黑";
  }
}
</style>
