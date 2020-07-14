<!--
  功能：功能描述
  作者：sunhua
  邮箱：947545659@qq.com
  时间：2020年07月07日 16:40:13
-->
<template lang="pug">
  <div class="m2">
    el-card(class='card')
      .cardTitle
        span(class='blue')
        span(class='title') 张三有限责任公司
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-form-item(label="检查类型 :" class="formItem2")
          el-input(v-model="form.checkType" disabled)
        el-form-item(label="授信额度金额 :" class="formItem2")
          el-input(v-model="form.lineAmout" disabled)
        el-form-item(label="客户名称 :" class="formItem2")
          el-input(v-model="form.custName" disabled)
        el-form-item(label="贷款金额 :" class="formItem2")
          el-input(v-model="form.loanAmout" disabled)

    el-card(class='card')
      .cardTitle
        span(class='blue')
        span(class='title') 填写信息
      .left
        el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
          .blueTitle 审批意见中贷后日常检查要求及落实情况
          el-form-item(label="要求 :" class="formItem2")
            el-input(v-model="form.requireCheck" type="textarea" :rows="3" clearable)
          el-form-item(label="落实情况 :" class="formItem2")
            el-input(v-model="form.checked" type="textarea" :rows="3" clearable)
          .blueTitle 实际控制人或法定代表人风险点
          el-form-item(label="健康、 嗜好、家庭关系等方面 :" class="formItem2")
            el-input(v-model="form.HoldPensonRisk" type="textarea" :rows="3" clearable)
          .blueTitle 近期检查发现的其他风险点
          el-form-item(class="formItem2")
            el-input(v-model="form.otherRisk" type="textarea" :rows="3" clearable)
      .right
        el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
          .blueTitle 产品贷后日常检查特殊要求及落实情况
          el-form-item(label="要求 :" class="formItem2")
            el-input(v-model="form.specialRequireCheck" type="textarea" :rows="3" clearable)
          el-form-item(label="落实情况 :" class="formItem2")
            el-input(v-model="form.specialChecked" type="textarea" :rows="3" clearable)
          .blueTitle 管理层风险点
          el-form-item(label="股权变化、关键管理人员变动、关联企业变动等，是否存在偏离主业、盲目扩张等问题 :" class="formItem2")
            el-input(v-model="form.managerRisk" type="textarea" :rows="3" clearable)

    el-card(class='card')
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-form-item(label="检查地点 :" class="formItem2")
          el-input(v-model="form.checkAddr" clearable)
        el-form-item(label="生产经营场所变动情况 :" class="formItem2")
          el-input(v-model="form.addrChangedMsg" clearable)
        el-form-item(label="检查配合程度 :" class="formItem2")
          el-input(v-model="form.cooperate" clearable)
        el-form-item(label="接待人员 :" class="formItem2")
          el-input(v-model="form.staff" clearable)

    el-card(class='card')
      .cardTitle
        span(class='blue')
        span(class='title') 征信情况
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        .blueTitle 基于企业征信报告
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="征信报告查询日期 :" style="width:96%")
              el-date-picker(v-model="form.queryDateForPer" style="width:100%" type="date" clearable)
        .blueTitle1 1.借款企业征信 :
        .cardTitle1
          span(class='blue')
          span(class='title') 征信情况 
        .cardTitle2
          span (1)未结清贷款及对外担保情况
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="未结清贷款笔数 :" style="width:96%")
              el-input(v-model="form.unPayOffLoanNum" clearable)
          el-col(:span="12")
            el-form-item(label="对外担保笔数 :" style="width:96%")
              el-input(v-model="form.guaranteeNum" clearable)
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="未结清贷款金额 :" style="width:96%")
              el-input(v-model="form.unPayOffAmout" clearable)
          el-col(:span="12")
            el-form-item(label="对外担保金额 :" style="width:96%")
              el-input(v-model="form.guaranteeAmout" clearable)
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="涉及金融机构 :" style="width:96%")
              el-input(v-model="form.finInstitutionNum" clearable)
          el-col(:span="12")
            el-form-item(label="对外担保结余 :" style="width:96%")
              el-input(v-model="form.guaranteeBalance" clearable)
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="未结清贷款结余 :" style="width:96%")
              el-input(v-model="form.sumBalance" clearable)
        .cardTitle2
          span (2)逾期及欠息等不良记录
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="贷款期间借款企业是否发生逾期、欠息等不良信用记录 :" style="width:96%")
              el-select(v-model="form.existBadRecord" placeholder="请选择" style="width:100%")
                el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(style="width:96%")
              el-input(v-model="form.badRecordMsg" type="textarea" :rows="3" clearable)
        .cardTitle2
          span (3)借款企业欠税情况
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="欠税记录 :" style="width:96%")
              el-input(v-model="form.oweTaxRecordNum" clearable)
          el-col(:span="12")
            el-form-item(label="强制执行记录 :" style="width:96%")
              el-input(v-model="form.forceImpleRecordNum" clearable)
          el-col(:span="12")
            el-form-item(label="民事判决 :" style="width:96%")
              el-input(v-model="form.civilJudgmentRecordNum" clearable)
          el-col(:span="12")
            el-form-item(label="行政处罚记录 :" style="width:96%")
              el-input(v-model="form.administRecordNum" clearable)
        .cardTitle2
          span (4)征信记录
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="征信记录是否有异常变化 :" style="width:96%")
              el-select(v-model="form.existCreditChage1" placeholder="请选择" style="width:100%")
                el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(style="width:96%")
              el-input(v-model="form.creditChageMsg1" type="textarea" :rows="3" clearable)
    //- 2.关联企业征信：
    el-card(class='card')
      .left
        el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
          .blueTitle1 2.关联企业征信：
          el-row(:gutter="20")
            el-col(:span="24")
              el-form-item(label="征信记录是否有异常变化 :" style="width:96%")
                el-select(v-model="form.existCreditChage2" placeholder="请选择" style="width:100%")
                  el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
          el-row(:gutter="20")
            el-col(:span="24")
              el-form-item(style="width:96%")
                el-input(v-model="form.creditChageMsg2" type="textarea" :rows="3" clearable)
      .right
        el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
          .blueTitle1 3.法人保证人征信：
          el-row(:gutter="20")
            el-col(:span="24")
              el-form-item(label="征信记录是否有异常变化 :" style="width:96%")
                el-select(v-model="form.existCreditChage3" placeholder="请选择" style="width:100%")
                  el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
          el-row(:gutter="20")
            el-col(:span="24")
              el-form-item(style="width:96%")
                el-input(v-model="form.creditChageMsg3" type="textarea" :rows="3" clearable)
    //- 基于个人征信报告(对于关注类及以下贷款及风险隐患客户每季度查询一次个人征信即可)
    el-card(class='card')
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        .blueTitle1 基于个人征信报告(对于关注类及以下贷款及风险隐患客户每季度查询一次个人征信即可)：
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="征信报告查询日期 :" style="width:96%")
              el-date-picker(v-model="form.queryDateForCom" style="width:100%" type="date" clearable)
        .blueTitle1 1.企业实际控制人及其配偶(若有)征信 :
        .cardTitle1
          span(class='blue')
          span(class='title') 征信分类
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(style="width:96%")
              el-input(v-model="form.creditClassification" clearable)
        .cardTitle1
          span(class='blue')
          span(class='title') 征信情况 
        .cardTitle2
          span (1)未结清贷款、未销户贷记卡（含准贷记）及对外担保情况
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="未结清贷款笔数 :" style="width:96%")
              el-input(v-model="form.unPayOffLoanNumCon" clearable)
          el-col(:span="12")
            el-form-item(label="授信总金额 :" style="width:96%")
              el-input(v-model="form.debitCardLineAmoutCon" clearable)
          el-col(:span="12")
            el-form-item(label="未结清贷款金额 :" style="width:96%")
              el-input(v-model="form.unPayOffAmoutCon" clearable)
          el-col(:span="12")
            el-form-item(label="对外担保笔数 :" style="width:96%")
              el-input(v-model="form.guaranteeNumCon" clearable)
          el-col(:span="12")
            el-form-item(label="涉及金融机构 :" style="width:96%")
              el-input(v-model="form.finInstitutionNumCon" clearable)
          el-col(:span="12")
            el-form-item(label="对外担保金额 :" style="width:96%")
              el-input(v-model="form.guaranteeAmoutCon" clearable)
          el-col(:span="12")
            el-form-item(label="未结清贷款结余 :" style="width:96%")
              el-input(v-model="form.sumBalanceCon" clearable)
          el-col(:span="12")
            el-form-item(label="对外担保结余 :" style="width:96%")
              el-input(v-model="form.guaranteeBalanceCon" clearable)
          el-col(:span="12")
            el-form-item(label="未销户贷记卡账户 :" style="width:96%")
              el-input(v-model="form.debitCardNumCon" clearable)
        .left
            .cardTitle2 (2)逾期及违约:
            el-row(:gutter="20")
              el-col(:span="24")
                el-form-item(label="是否存在逾期及违约记录 :" style="width:96%")
                  el-select(v-model="form.existBadRecordCon" placeholder="请选择" style="width:100%")
                    el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
            el-row(:gutter="20")
              el-col(:span="24")
                el-form-item(style="width:96%")
                  el-input(v-model="form.badRecordMsgCon" type="textarea" :rows="3" clearable)
        .right
            .cardTitle2 (3)征信记录:
            el-row(:gutter="20")
              el-col(:span="24")
                el-form-item(label="征信记录是否有异常变化 :" style="width:96%")
                  el-select(v-model="form.existCreditChage4" placeholder="请选择" style="width:100%")
                    el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
            el-row(:gutter="20")
              el-col(:span="24")
                el-form-item(style="width:96%")
                  el-input(v-model="form.creditChageMsg4" type="textarea" :rows="3" clearable)
    //- 2.企业法定代表人及其配偶（若有）征信
    el-card(class='card')
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        .blueTitle1 2.企业法定代表人及其配偶（若有）征信 :
        .cardTitle1
          span(class='blue')
          span(class='title') 征信分类
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(style="width:96%")
              el-input(v-model="form.creditClassificationJur" clearable)
        .cardTitle1
          span(class='blue')
          span(class='title') 征信情况 
        .cardTitle2
          span (1)未结清贷款、未销户贷记卡（含准贷记）及对外担保情况
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="未结清贷款笔数 :" style="width:96%")
              el-input(v-model="form.unPayOffLoanNumJur" clearable)
          el-col(:span="12")
            el-form-item(label="未销户贷记卡担保金额 :" style="width:96%")
              el-input(v-model="form.debitCardLineAmoutJur" clearable)
          el-col(:span="12")
            el-form-item(label="未结清贷款金额 :" style="width:96%")
              el-input(v-model="form.unPayOffAmoutJur" clearable)
          el-col(:span="12")
            el-form-item(label="对外担保笔数 :" style="width:96%")
              el-input(v-model="form.guaranteeNumJur" clearable)
          el-col(:span="12")
            el-form-item(label="涉及金融机构 :" style="width:96%")
              el-input(v-model="form.finInstitutionNumJur" clearable)
          el-col(:span="12")
            el-form-item(label="对外担保金额 :" style="width:96%")
              el-input(v-model="form.guaranteeAmoutJur" clearable)
          el-col(:span="12")
            el-form-item(label="未结清贷款结余 :" style="width:96%")
              el-input(v-model="form.sumBalanceJur" clearable)
          el-col(:span="12")
            el-form-item(label="对外担保结余 :" style="width:96%")
              el-input(v-model="form.guaranteeBalanceJur" clearable)
          el-col(:span="12")
            el-form-item(label="未销户贷记卡账户 :" style="width:96%")
              el-input(v-model="form.debitCardNumJur" clearable)
        .left
            .cardTitle2 (2)逾期及违约:
            el-row(:gutter="20")
              el-col(:span="24")
                el-form-item(label="是否存在逾期及违约记录 :" style="width:96%")
                  el-select(v-model="form.existBadRecordJur" placeholder="请选择" style="width:100%")
                    el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
            el-row(:gutter="20")
              el-col(:span="24")
                el-form-item(style="width:96%")
                  el-input(v-model="form.badRecordMsgJur" type="textarea" :rows="3" clearable)
        .right
            .cardTitle2 (3)征信记录:
            el-row(:gutter="20")
              el-col(:span="24")
                el-form-item(label="征信记录是否有异常变化 :" style="width:96%")
                  el-select(v-model="form.existCreditChage5" placeholder="请选择" style="width:100%")
                    el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
            el-row(:gutter="20")
              el-col(:span="24")
                el-form-item(style="width:96%")
                  el-input(v-model="form.creditChageMsg5" type="textarea" :rows="3" clearable)    
    //- 3.其他保证人征信：
    el-card(class='card')
      .left
        el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
          .blueTitle1 3.其他保证人征信
          el-row(:gutter="20")
            el-col(:span="24")
              el-form-item(label="征信记录是否有异常变化 :" style="width:96%")
                el-select(v-model="form.existCreditChager6" placeholder="请选择" style="width:100%")
                  el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
          el-row(:gutter="20")
            el-col(:span="24")
              el-form-item(style="width:96%")
                el-input(v-model="form.creditChageMsg6" type="textarea" :rows="3" clearable)
    //- 近期负面信息情况
    el-card(class='card')
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        .cardTitle
          span(class='blue')
          span(class='title') 近期负面信息情况
        el-row(:gutter="20" style="marginTop:20px")
          el-col(:span="12")
            el-form-item(style="width:96%")
              el-input(v-model="form.msg" type="textarea" :rows="3" clearable) 
    //- 财务信息
    el-card(class='card')
      .cardTitle
          span(class='blue')
          span(class='title') 财务信息
      .left
        el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
          .blueTitle1 存货
          el-row(:gutter="20")
            el-col(:span="24")
              el-form-item(label="上次全面检查或调查时余额 :" style="width:96%")
                el-input(v-model="form.stockLastBalance" clearable)
          el-row(:gutter="20")
            el-col(:span="24")
              el-form-item(label='本次检查存货变动情况 :' style="width:96%")
                el-input(v-model="form.stockChangSitu" type="textarea" :rows="3" clearable)
          .blueTitle1 水、电、煤、气费其中一项或多项(加工制造类企业必填)
          el-row(:gutter="20")
            el-col(:span="24")
              el-form-item(label="上次全面检查或调查时余额 :" style="width:96%")
                el-input(v-model="form.dailyExpenLastBalance" clearable)
          el-row(:gutter="20")
            el-col(:span="24")
              el-form-item(label='本次检查存货变动情况 :' style="width:96%")
                el-input(v-model="form.dailyExpenChangSitu" type="textarea" :rows="3" clearable) 
            el-col(:span="24")
              el-form-item(style="width:96%")
                el-input(v-model="form.financeMsg" placeholder='根据财务信息及现场检查情况，判断企业是否生产经营异常(停产、半停产、员工数量骤减、设备开工率不足等)，并详细阐述异常情况对企业偿债能力的影响。' type="textarea" :rows="3" clearable)
      .right
        el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
          .blueTitle1 营业收入
          el-row(:gutter="20")
            el-col(:span="24")
              el-form-item(label="上次全面检查或调查时余额 :" style="width:96%")
                el-input(v-model="form.busIncLastBalance" clearable)
          el-row(:gutter="20")
            el-col(:span="24")
              el-form-item(label='本次检查存货变动情况 :' style="width:96%")
                el-input(v-model="form.busIncChangSitu" type="textarea" :rows="3" clearable)  
    //- 影像维护
    el-card(class='card')
      .cardTitle
        span(class='blue')
        span(class='title') 影像维护
      .uploadBox(v-for='(item,index) in list2' :key='item.index')
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
  props: ["detail"],
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
        checkType: "", // 检查类型
        lineAmout: "", // 授信额度金额
        custName: "", // 客户名称  queryType为2时，必传；其他情况非必传
        loanAmout: "", // 贷款金额

        // card 2
        requireCheck: "", // 审批意见中贷后日常检查要求及落实情况
        checked: "", // 落实情况
        specialRequireCheck: "", // 产品贷后日常检查特殊要求及落实情况
        specialChecked: "", // 落实情况
        HoldPensonRisk: "", // 实际控制人或法定代表人风险点
        otherRisk: "", // 近期检查发现的其他风险点
        managerRisk: "", // 管理层风险点

        // card 3
        staff: "", //接待人员
        cooperate: "", // 检查配合程度
        addrChangedMsg: "", //生产经营场所变动情况
        checkAddr: "", // 检查地点

        // card 4
        // (1)未结清贷款及对外担保情况
        queryDateForPer: "", //征信报告查询日期
        unPayOffLoanNum: "", // 未结清贷款笔数
        guaranteeNum: "", //对外担保笔数
        unPayOffAmout: "", //未结清贷款金额
        guaranteeAmout: "", //对外担保金额
        finInstitutionNum: "", //涉及金融机构
        guaranteeBalance: "", //对外担保结余
        sumBalance: "", //未结清贷款结余
        // (2)逾期及欠息等不良记录
        existBadRecord: "", //贷款期间借款企业是否发生逾期、欠息等不良信用记录
        badRecordMsg: "", //说明
        // (3)借款企业欠税情况
        oweTaxRecordNum: "", //欠税记录
        forceImpleRecordNum: "", //强制执行记录
        civilJudgmentRecordNum: "", //民事判决
        administRecordNum: "", //行政处罚记录
        // (4)征信记录
        existCreditChage1: "", //征信记录是否有异常变化
        creditChageMsg1: "", //说明

        // card 5
        // 2.关联企业征信
        existCreditChage2: "", //征信记录是否有异常变化
        creditChageMsg2: "", //说明
        existCreditChage3: "", //征信记录是否有异常变化
        creditChageMsg3: "", //说明
        msg: "", //近期负面信息情况

        //card 6--基于个人征信报告
        queryDateForCom: "", //个人报告查询日期
        creditClassification: "", //征信分类
        // (1)未结清贷款、未销户贷记卡（含准贷记）及对外担保情况
        unPayOffLoanNumCon: "", //未结清贷款笔数
        debitCardLineAmoutCon: "", //授信总金额
        unPayOffAmoutCon: "", //未结清贷款金额
        guaranteeNumCon: "", //对外担保笔数
        finInstitutionNumCon: "", //涉及金融机构
        guaranteeAmoutCon: "", //对外担保金额
        sumBalanceCon: "", //未结清贷款结余
        guaranteeBalanceCon: "", //对外担保结余
        debitCardNumCon: "", //未销户贷记卡账户
        // (2)逾期及违约
        existBadRecordCon: "", //是否存在逾期及违约记录
        badRecordMsgCon: "", //说明
        // (3)征信记录
        existCreditChage4: "", //征信记录是否有异常变化
        creditChageMsg4: "", //说明

        // 2.企业法定代表人及其配偶（若有）征信
        creditClassificationJur: "", //征信分类
        // (1)未结清贷款、未销户贷记卡（含准贷记）及对外担保情况
        unPayOffLoanNumJur: "", //未结清贷款笔数
        debitCardLineAmoutJur: "", //未销户贷记卡担保金额
        unPayOffAmoutJur: "", //未结清贷款金额
        guaranteeNumJur: "", //对外担保笔数
        finInstitutionNumJur: "", //涉及金融机构
        guaranteeAmoutJur: "", //对外担保金额
        sumBalanceJur: "", //未结清贷款结余
        guaranteeBalanceJur: "", //对外担保结余
        debitCardNumJur: "", //未销户贷记卡账户
        // (2)逾期及违约
        existBadRecordJur: "", //是否存在逾期及违约记录
        badRecordMsgJur: "", //说明
        // (3)征信记录
        existCreditChage5: "", //征信记录是否有异常变化
        creditChageMsg5: "", //说明
        // 其他保证人征信
        existCreditChager6: "", //征信记录是否有异常变化
        creditChageMsg6: "", //说明

        // card 7
        // 财务信息
        stockLastBalance: "", // 上次全面检查或调查时余额--- 存货
        stockChangSitu: "", //本次检查存货变动情况
        dailyExpenLastBalance: "", //上次全面检查或调查时余额---水、电、煤、气费其中一项或多项
        dailyExpenChangSitu: "", //本次检查存货变动情况
        busIncLastBalance: "", //上次全面检查或调查时余额--- 营业收入
        busIncChangSitu: "", //本次检查存货变动情况
        financeMsg: "", //财务状况整体说明

        xx: "" //个人报告查询日期
      },
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
      check: ["第一阶段"],
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
      // console.log(1, newVal, oldVal);
      this.form = newVal;
    }
  },
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
<style lang="scss">
@import "../../../assets/style/global.scss";
/deep/.el-textarea__inner {
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  line-height: 27px;
  color: rgba(183, 183, 183, 1);
}
</style>
