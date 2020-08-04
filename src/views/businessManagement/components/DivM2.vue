<!--
  功能：功能描述
  作者：sunhua
  邮箱：947545659@qq.com
  时间：2020年07月07日 16:40:13
-->
<template lang="pug">
  .m2
    el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
      el-card(class='card')
        .cardTitle1
          span(class='blue')
          span(class='title') {{form.custName}}
        el-form-item(label="检查类型 :" class="formItem2")
          el-select(v-model="form.bizType" disabled style="width:100%" )
            el-option(label="小企业授信业务首次跟踪检查" value="m1")
            el-option(label="小企业授信业务贷后例行检查" value="m2")
            el-option(label="小企业授信业务贷后全面检查" value="m3")
            el-option(label="小企业授信业务还款资金落实情况检查" value="m4")
            el-option(label="小企业法人快捷贷首次检查" value="m5")
            el-option(label="小企业法人快捷贷贷后日常检查" value="m6")
        el-form-item(label="授信额度金额 :" class="formItem2")
          el-input(v-model="form.lineAmout" :disabled="type == 2" clearable)
        el-form-item(label="客户名称 :" class="formItem2")
          el-input(v-model="form.custName" disabled)
        el-form-item(label="贷款余额 :" class="formItem2")
          el-input(v-model="form.loanBalance" disabled)

      el-card(class='card')
        .cardTitle1
          span(class='blue')
          span(class='title') 填写信息
        .left
          .blueTitle 审批意见中贷后日常检查要求及落实情况
          el-form-item(label="要求 :" class="formItem2")
            el-input(v-model="form.requireCheck" type="textarea" :disabled="type == 2" :rows="3" clearable)
          el-form-item(label="落实情况 :" class="formItem2")
            el-input(v-model="form.checked" type="textarea" :disabled="type == 2" :rows="3" clearable)
          .blueTitle 实际控制人或法定代表人风险点
          el-form-item(label="健康、 嗜好、家庭关系等方面 :" class="formItem2")
            el-input(v-model="form.holdPensonRisk" type="textarea" :disabled="type == 2" :rows="3" clearable)
          .blueTitle 近期检查发现的其他风险点
          el-form-item(class="formItem2")
            el-input(v-model="form.otherRisk" type="textarea" :disabled="type == 2" :rows="3" clearable)
        .right
          .blueTitle 产品贷后日常检查特殊要求及落实情况
          el-form-item(label="要求 :" class="formItem2")
            el-input(v-model="form.specialRequireCheck" type="textarea" :disabled="type == 2" :rows="3" clearable)
          el-form-item(label="落实情况 :" class="formItem2")
            el-input(v-model="form.specialChecked" type="textarea" :disabled="type == 2" :rows="3" clearable)
          .blueTitle 管理层风险点
          el-form-item(label="股权变化、关键管理人员变动、关联企业变动等，是否存在偏离主业、盲目扩张等问题 :" class="formItem2")
            el-input(v-model="form.managerRisk" type="textarea" :disabled="type == 2" :rows="3" clearable)

      el-card(class='card')
        el-form-item(label="检查地点 :" class="formItem2")
          el-input(v-model="form.checkAddr" clearable :disabled="type == 2")
        el-form-item(label="生产经营场所变动情况 :" class="formItem2")
          el-input(v-model="form.addrChangedMsg" :disabled="type == 2" clearable)
        el-form-item(label="检查配合程度 :" class="formItem2")
          el-select(v-model="form.cooperate" style="width:100%" :disabled="type == 2" clearable)
            el-option(v-for="item in cooperateArr" :key="item.value" :label="item.label" :value="item.value")
        el-form-item(label="接待人员 :" class="formItem2")
          el-input(v-model="form.staff" :disabled="type == 2" clearable)

      el-card(class='card')
        .cardTitle1
          span(class='blue')
          span(class='title') 征信情况
        .blueTitle 基于企业征信报告
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="征信报告查询日期 :" style="width:96%")
              el-date-picker(v-model="form.creditInfo.queryDateForCom" :picker-options="pickerOptions" style="width:100%" value-format='yyyy-MM-dd' format='yyyy-MM-dd' type="date" placeholder="选择日期" :disabled="type == 2" clearable)
        .blueTitle1 1.借款企业征信 :
        .cardTitle1
          span(class='blue')
          span(class='title1') 征信情况 
        .cardTitle2
          span (1)未结清贷款及对外担保情况
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="未结清贷款笔数 :" style="width:96%")
              el-input(v-model="form.creditInfo.unPayOffLoanNum" :disabled="type == 2" clearable)
                i(slot="suffix" style="font-style:normal") 笔
          el-col(:span="12")
            el-form-item(label="对外担保笔数 :" style="width:96%")
              el-input(v-model="form.creditInfo.guaranteeNum" :disabled="type == 2" clearable)
                i(slot="suffix" style="font-style:normal") 笔
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="未结清贷款金额 :" style="width:96%")
              el-input(v-model="form.creditInfo.unPayOffAmout" :disabled="type == 2" clearable)
                i(slot="suffix" style="font-style:normal") 万元
          el-col(:span="12")
            el-form-item(label="对外担保金额 :" style="width:96%")
              el-input(v-model="form.creditInfo.guaranteeAmout" :disabled="type == 2" clearable)
                i(slot="suffix" style="font-style:normal") 万元
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="涉及金融机构 :" style="width:96%")
              el-input(v-model="form.creditInfo.finInstitutionNum" :disabled="type == 2" clearable)
                i(slot="suffix" style="font-style:normal") 家
          el-col(:span="12")
            el-form-item(label="对外担保结余 :" style="width:96%")
              el-input(v-model="form.creditInfo.guaranteeBalance" :disabled="type == 2" clearable)
                i(slot="suffix" style="font-style:normal") 万元
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="未结清贷款结余 :" style="width:96%")
              el-input(v-model="form.creditInfo.sumBalance" :disabled="type == 2" clearable)
                i(slot="suffix" style="font-style:normal") 万元
        .cardTitle2
          span (2)逾期及欠息等不良记录
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="贷款期间借款企业是否发生逾期、欠息等不良信用记录 :" style="width:96%")
              el-select(v-model="form.creditInfo.existBadRecord" :disabled="type == 2" placeholder="请选择" style="width:100%")
                el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(style="width:96%")
              el-input(v-model="form.creditInfo.badRecordMsg" :disabled="type == 2" type="textarea" :rows="3" clearable)
        .cardTitle2
          span (3)借款企业欠税情况
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="欠税记录 :" style="width:96%")
              el-input(v-model="form.creditInfo.oweTaxRecordNum" :disabled="type == 2" clearable)
          el-col(:span="12")
            el-form-item(label="强制执行记录 :" style="width:96%")
              el-input(v-model="form.creditInfo.forceImpleRecordNum" :disabled="type == 2" clearable)
          el-col(:span="12")
            el-form-item(label="民事判决 :" style="width:96%")
              el-input(v-model="form.creditInfo.civilJudgmentRecordNum" :disabled="type == 2" clearable)
          el-col(:span="12")
            el-form-item(label="行政处罚记录 :" style="width:96%")
              el-input(v-model="form.creditInfo.administRecordNum" :disabled="type == 2" clearable)
        .cardTitle2
          span (4)征信记录
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="征信记录是否有异常变化 :" style="width:96%")
              el-select(v-model="form.creditInfo.existCreditChage1" :disabled="type == 2" placeholder="请选择" style="width:100%")
                el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(style="width:96%")
              el-input(v-model="form.creditInfo.creditChageMsg1" :disabled="type == 2" type="textarea" :rows="3" clearable)
      //- 2.关联企业征信：
      el-card(class='card')
        .left
          .blueTitle1 2.关联企业征信：
          el-row(:gutter="20")
            el-col(:span="24")
              el-form-item(label="征信记录是否有异常变化 :" style="width:96%")
                el-select(v-model="form.creditInfo.existCreditChage2" :disabled="type == 2" placeholder="请选择" style="width:100%")
                  el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
          el-row(:gutter="20")
            el-col(:span="24")
              el-form-item(style="width:96%")
                el-input(v-model="form.creditInfo.creditChageMsg2" :disabled="type == 2" type="textarea" :rows="3" clearable)
        .right
          .blueTitle1 3.法人保证人征信：
          el-row(:gutter="20")
            el-col(:span="24")
              el-form-item(label="征信记录是否有异常变化 :" style="width:96%")
                el-select(v-model="form.creditInfo.existCreditChage3" :disabled="type == 2" placeholder="请选择" style="width:100%")
                  el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
          el-row(:gutter="20")
            el-col(:span="24")
              el-form-item(style="width:96%")
                el-input(v-model="form.creditInfo.creditChageMsg3" :disabled="type == 2" type="textarea" :rows="3" clearable)
      //- 基于个人征信报告(对于关注类及以下贷款及风险隐患客户每季度查询一次个人征信即可)
      el-card(class='card')
        .blueTitle1 基于个人征信报告(对于关注类及以下贷款及风险隐患客户每季度查询一次个人征信即可)：
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="征信报告查询日期 :" style="width:96%")
              el-date-picker(v-model="form.creditInfo.queryDateForPer" :picker-options="pickerOptions" style="width:100%" :disabled="type == 2" value-format='yyyy-MM-dd' format='yyyy-MM-dd' type="date" placeholder="选择日期" clearable)
        .blueTitle1 1.企业实际控制人及其配偶(若有)征信 :
        .cardTitle1
          span(class='blue')
          span(class='title1') 征信分类
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(style="width:96%")
              el-input(v-model="form.creditInfo.creditClassification" :disabled="type == 2" clearable)
        .cardTitle1
          span(class='blue')
          span(class='title1') 征信情况 
        .cardTitle2
          span (1)未结清贷款、未销户贷记卡（含准贷记）及对外担保情况
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="未结清贷款笔数 :" style="width:96%")
              el-input(v-model="form.creditInfo.unPayOffLoanNumCon" :disabled="type == 2" clearable)
                i(slot="suffix" style="font-style:normal") 笔
          el-col(:span="12")
            el-form-item(label="授信总金额 :" style="width:96%")
              el-input(v-model="form.creditInfo.debitCardLineAmoutCon" :disabled="type == 2" clearable)
                i(slot="suffix" style="font-style:normal") 万元
          el-col(:span="12")
            el-form-item(label="未结清贷款金额 :" style="width:96%")
              el-input(v-model="form.creditInfo.unPayOffAmoutCon" :disabled="type == 2" clearable)
                i(slot="suffix" style="font-style:normal") 万元
          el-col(:span="12")
            el-form-item(label="对外担保笔数 :" style="width:96%")
              el-input(v-model="form.creditInfo.guaranteeNumCon" :disabled="type == 2" clearable)
                i(slot="suffix" style="font-style:normal") 笔
          el-col(:span="12")
            el-form-item(label="涉及金融机构 :" style="width:96%")
              el-input(v-model="form.creditInfo.finInstitutionNumCon" :disabled="type == 2" clearable)
                i(slot="suffix" style="font-style:normal") 家
          el-col(:span="12")
            el-form-item(label="对外担保金额 :" style="width:96%")
              el-input(v-model="form.creditInfo.guaranteeAmoutCon" :disabled="type == 2" clearable)
                i(slot="suffix" style="font-style:normal") 万元
          el-col(:span="12")
            el-form-item(label="未结清贷款结余 :" style="width:96%")
              el-input(v-model="form.creditInfo.sumBalanceCon" :disabled="type == 2" clearable)
                i(slot="suffix" style="font-style:normal") 万元
          el-col(:span="12")
            el-form-item(label="对外担保结余 :" style="width:96%")
              el-input(v-model="form.creditInfo.guaranteeBalanceCon" :disabled="type == 2" clearable)
                i(slot="suffix" style="font-style:normal") 万元
          el-col(:span="12")
            el-form-item(label="未销户贷记卡账户 :" style="width:96%")
              el-input(v-model="form.creditInfo.debitCardNumCon" :disabled="type == 2" clearable)
                i(slot="suffix" style="font-style:normal") 个
        .left
            .cardTitle2 (2)逾期及违约:
            el-row(:gutter="20")
              el-col(:span="24")
                el-form-item(label="是否存在逾期及违约记录 :" style="width:96%")
                  el-select(v-model="form.creditInfo.existBadRecordCon" :disabled="type == 2" placeholder="请选择" style="width:100%")
                    el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
            el-row(:gutter="20")
              el-col(:span="24")
                el-form-item(style="width:96%")
                  el-input(v-model="form.creditInfo.badRecordMsgCon" :disabled="type == 2" type="textarea" :rows="3" clearable)
        .right
            .cardTitle2 (3)征信记录:
            el-row(:gutter="20")
              el-col(:span="24")
                el-form-item(label="征信记录是否有异常变化 :" style="width:96%")
                  el-select(v-model="form.creditInfo.existCreditChage4" :disabled="type == 2" placeholder="请选择" style="width:100%")
                    el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
            el-row(:gutter="20")
              el-col(:span="24")
                el-form-item(style="width:96%")
                  el-input(v-model="form.creditInfo.creditChageMsg4" :disabled="type == 2" type="textarea" :rows="3" clearable)
      //- 2.企业法定代表人及其配偶（若有）征信
      el-card(class='card')
        .blueTitle1 2.企业法定代表人及其配偶（若有）征信 :
        .cardTitle1
          span(class='blue')
          span(class='title1') 征信分类
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(style="width:96%")
              el-input(v-model="form.creditInfo.creditClassificationJur" :disabled="type == 2" clearable)
        .cardTitle1
          span(class='blue')
          span(class='title1') 征信情况 
        .cardTitle2
          span (1)未结清贷款、未销户贷记卡（含准贷记）及对外担保情况
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="未结清贷款笔数 :" style="width:96%")
              el-input(v-model="form.creditInfo.unPayOffLoanNumJur" :disabled="type == 2" clearable)
                i(slot="suffix" style="font-style:normal") 笔
          el-col(:span="12")
            el-form-item(label="未销户贷记卡担保金额 :" style="width:96%")
              el-input(v-model="form.creditInfo.debitCardLineAmoutJur" :disabled="type == 2" clearable)
                i(slot="suffix" style="font-style:normal") 万元
          el-col(:span="12")
            el-form-item(label="未结清贷款金额 :" style="width:96%")
              el-input(v-model="form.creditInfo.unPayOffAmoutJur" :disabled="type == 2" clearable)
                i(slot="suffix" style="font-style:normal") 万元
          el-col(:span="12")
            el-form-item(label="对外担保笔数 :" style="width:96%")
              el-input(v-model="form.creditInfo.guaranteeNumJur" :disabled="type == 2" clearable)
                i(slot="suffix" style="font-style:normal") 笔
          el-col(:span="12")
            el-form-item(label="涉及金融机构 :" style="width:96%")
              el-input(v-model="form.creditInfo.finInstitutionNumJur" :disabled="type == 2" clearable)
                i(slot="suffix" style="font-style:normal") 家
          el-col(:span="12")
            el-form-item(label="对外担保金额 :" style="width:96%")
              el-input(v-model="form.creditInfo.guaranteeAmoutJur" :disabled="type == 2" clearable)
                i(slot="suffix" style="font-style:normal") 万元
          el-col(:span="12")
            el-form-item(label="未结清贷款结余 :" style="width:96%")
              el-input(v-model="form.creditInfo.sumBalanceJur" :disabled="type == 2" clearable)
                i(slot="suffix" style="font-style:normal") 万元
          el-col(:span="12")
            el-form-item(label="对外担保结余 :" style="width:96%")
              el-input(v-model="form.creditInfo.guaranteeBalanceJur" :disabled="type == 2" clearable)
                i(slot="suffix" style="font-style:normal") 万元
          el-col(:span="12")
            el-form-item(label="未销户贷记卡账户 :" style="width:96%")
              el-input(v-model="form.creditInfo.debitCardNumJur" :disabled="type == 2" clearable)
                i(slot="suffix" style="font-style:normal") 个
        .left
            .cardTitle2 (2)逾期及违约:
            el-row(:gutter="20")
              el-col(:span="24")
                el-form-item(label="是否存在逾期及违约记录 :" style="width:96%")
                  el-select(v-model="form.creditInfo.existBadRecordJur" :disabled="type == 2" placeholder="请选择" style="width:100%")
                    el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
            el-row(:gutter="20")
              el-col(:span="24")
                el-form-item(style="width:96%")
                  el-input(v-model="form.creditInfo.badRecordMsgJur" :disabled="type == 2" type="textarea" :rows="3" clearable)
        .right
            .cardTitle2 (3)征信记录:
            el-row(:gutter="20")
              el-col(:span="24")
                el-form-item(label="征信记录是否有异常变化 :" style="width:96%")
                  el-select(v-model="form.creditInfo.existCreditChage5" :disabled="type == 2" placeholder="请选择" style="width:100%")
                    el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
            el-row(:gutter="20")
              el-col(:span="24")
                el-form-item(style="width:96%")
                  el-input(v-model="form.creditInfo.creditChageMsg5" :disabled="type == 2" type="textarea" :rows="3" clearable)    
      //- 3.其他保证人征信：
      el-card(class='card')
        .left
          .blueTitle1 3.其他保证人征信
          el-row(:gutter="20")
            el-col(:span="24")
              el-form-item(label="征信记录是否有异常变化 :" style="width:96%")
                el-select(v-model="form.creditInfo.existCreditChager6" :disabled="type == 2" placeholder="请选择" style="width:100%")
                  el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
          el-row(:gutter="20")
            el-col(:span="24")
              el-form-item(style="width:96%")
                el-input(v-model="form.creditInfo.creditChageMsg6" :disabled="type == 2" type="textarea" :rows="3" clearable)
      //- 近期负面信息情况
      el-card(class='card')
        .cardTitle1
          span(class='blue')
          span(class='title') 近期负面信息情况
        el-row(:gutter="20" style="marginTop:20px")
          el-col(:span="12")
            el-form-item(style="width:96%")
              el-input(v-model="form.msg" type="textarea" :disabled="type == 2" :rows="3" clearable) 
      //- 财务信息
      el-card(class='card')
        .cardTitle1
            span(class='blue')
            span(class='title') 财务信息
        .left
          .blueTitle1 存货
          el-row(:gutter="20")
            el-col(:span="24")
              el-form-item(label="上次全面检查或调查时余额 :" style="width:96%")
                el-input(v-model="form.financeInfo.stockLastBalance" :disabled="type == 2" clearable)
          el-row(:gutter="20")
            el-col(:span="24")
              el-form-item(label='本次检查存货变动情况 :' style="width:96%")
                el-input(v-model="form.financeInfo.stockChangSitu" :disabled="type == 2" type="textarea" :rows="3" clearable)
          .blueTitle1 水、电、煤、气费其中一项或多项(加工制造类企业必填)
          el-row(:gutter="20")
            el-col(:span="24")
              el-form-item(label="上次全面检查或调查时余额 :" style="width:96%")
                el-input(v-model="form.financeInfo.dailyExpenLastBalance" :disabled="type == 2" clearable)
          el-row(:gutter="20")
            el-col(:span="24")
              el-form-item(label='本次检查存货变动情况 :' style="width:96%")
                el-input(v-model="form.financeInfo.dailyExpenChangSitu" :disabled="type == 2" type="textarea" :rows="3" clearable) 
            el-col(:span="24")
              el-form-item(style="width:96%")
                el-input(v-model="form.financeInfo.financeMsg" :disabled="type == 2" placeholder='根据财务信息及现场检查情况，判断企业是否生产经营异常(停产、半停产、员工数量骤减、设备开工率不足等)，并详细阐述异常情况对企业偿债能力的影响。' type="textarea" :rows="4" clearable)
        .right
          .blueTitle1 营业收入
          el-row(:gutter="20")
            el-col(:span="24")
              el-form-item(label="上次全面检查或调查时余额 :" style="width:96%")
                el-input(v-model="form.financeInfo.busIncLastBalance" :disabled="type == 2" clearable)
          el-row(:gutter="20")
            el-col(:span="24")
              el-form-item(label='本次检查存货变动情况 :' style="width:96%")
                el-input(v-model="form.financeInfo.busIncChangSitu" :disabled="type == 2" type="textarea" :rows="3" clearable)  
      //- 影像维护
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
  name: "DivM2",
  // 组件参数 接收来自父组件的数据
  props: ["detail"],
  // 局部注册的组件
  components: { uploadTest },
  // 组件状态值
  data() {
    const definte17 = () => {
      const definite17Array = [];
      const valueArray = [
        "财务报表",
        "纳税材料",
        "水电费材料",
        "银行流水",
        "其他经营材料",
        "企业办公场所（含企业大门）",
        "企业生产车间（含重要生产或经营工序）",
        "企业重要生产或经营设备、存货",
        "检查人员现场检查的影像",
        "抵押物影像",
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
      params: {},
      loanBusiness: {},
      pickerOptions: {
        disabledDate(time) {
          let curDate = new Date().toString(); // 当前时间戳转为字符串
          let curDateYear = new Date().getFullYear(); // 当前时间的年份
          let oneYearAgoDate = curDate.replace(curDateYear, curDateYear - 1); // 字符串年份替换为一年前
          let oneYear = new Date(oneYearAgoDate).getTime(); //一年前字符串转为时间戳
          return time.getTime() > Date.now() || time.getTime() < oneYear;
        }
      },
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
        bizType: "m2", // 检查类型
        lineAmout: "", // 授信额度金额
        custName: "", // 客户名称  queryType为2时，必传；其他情况非必传
        loanBalance: "", // 贷款金额

        // card 2
        requireCheck: "", // 审批意见中贷后日常检查要求及落实情况
        checked: "", // 落实情况
        specialRequireCheck: "", // 产品贷后日常检查特殊要求及落实情况
        specialChecked: "", // 落实情况
        holdPensonRisk: "", // 实际控制人或法定代表人风险点
        otherRisk: "", // 近期检查发现的其他风险点
        managerRisk: "", // 管理层风险点

        // card 3
        staff: "", //接待人员
        cooperate: "1", // 检查配合程度
        addrChangedMsg: "", //生产经营场所变动情况
        checkAddr: "", // 检查地点

        // card 4

        creditInfo: {
          // (1)未结清贷款及对外担保情况
          queryDateForCom: "", //征信报告查询日期
          unPayOffLoanNum: "", // 未结清贷款笔数
          guaranteeNum: "", //对外担保笔数
          unPayOffAmout: "", //未结清贷款金额
          guaranteeAmout: "", //对外担保金额
          finInstitutionNum: "", //涉及金融机构
          guaranteeBalance: "", //对外担保结余
          sumBalance: "", //未结清贷款结余
          // (2)逾期及欠息等不良记录
          existBadRecord: 1, //贷款期间借款企业是否发生逾期、欠息等不良信用记录
          badRecordMsg: "", //说明
          // (3)借款企业欠税情况
          oweTaxRecordNum: "", //欠税记录
          forceImpleRecordNum: "", //强制执行记录
          civilJudgmentRecordNum: "", //民事判决
          administRecordNum: "", //行政处罚记录
          // (4)征信记录
          existCreditChage1: 1, //征信记录是否有异常变化
          creditChageMsg1: "", //说明

          // card 5
          // 2.关联企业征信
          existCreditChage2: 1, //征信记录是否有异常变化
          creditChageMsg2: "", //说明
          existCreditChage3: 1, //征信记录是否有异常变化
          creditChageMsg3: "", //说明
          msg: "", //近期负面信息情况

          //card 6--基于个人征信报告
          queryDateForPer: "", //个人报告查询日期
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
          existBadRecordCon: 1, //是否存在逾期及违约记录
          badRecordMsgCon: "", //说明
          // (3)征信记录
          existCreditChage4: 1, //征信记录是否有异常变化
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
          existBadRecordJur: 1, //是否存在逾期及违约记录
          badRecordMsgJur: "", //说明
          // (3)征信记录
          existCreditChage5: 1, //征信记录是否有异常变化
          creditChageMsg5: "", //说明
          // 其他保证人征信
          existCreditChager6: 1, //征信记录是否有异常变化
          creditChageMsg6: "" //说明
        },

        // card 7
        // 财务信息
        financeInfo: {
          stockLastBalance: "", // 上次全面检查或调查时余额--- 存货
          stockChangSitu: "", //本次检查存货变动情况
          dailyExpenLastBalance: "", //上次全面检查或调查时余额---水、电、煤、气费其中一项或多项
          dailyExpenChangSitu: "", //本次检查存货变动情况
          busIncLastBalance: "", //上次全面检查或调查时余额--- 营业收入
          busIncChangSitu: "", //本次检查存货变动情况
          financeMsg: ""
        } //财务状况整体说明
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
    detail: function(newVal, oldVal) {
      this.form = newVal;
      this.params = this.matchImage(newVal);
      if (!newVal.creditInfo) {
        this.form.creditInfo.queryDateForPer = "";
        this.form.creditInfo.queryDateForCom = "";
        this.form.creditInfo.existBadRecord = 1;
        this.form.creditInfo.existCreditChage1 = 1;
        this.form.creditInfo.existCreditChage2 = 1;
        this.form.creditInfo.existCreditChage3 = 1;
        this.form.creditInfo.existBadRecordCon = 1;
        this.form.creditInfo.existCreditChage4 = 1;
        this.form.creditInfo.existBadRecordJur = 1;
        this.form.creditInfo.existCreditChage5 = 1;
        this.form.creditInfo.existCreditChager6 = 1;
      }
      if (!newVal.financeInfo) {
        this.form.financeInfo = {
          stockLastBalance: "", // 上次全面检查或调查时余额--- 存货
          stockChangSitu: "", //本次检查存货变动情况
          dailyExpenLastBalance: "", //上次全面检查或调查时余额---水、电、煤、气费其中一项或多项
          dailyExpenChangSitu: "", //本次检查存货变动情况
          busIncLastBalance: "", //上次全面检查或调查时余额--- 营业收入
          busIncChangSitu: "", //本次检查存货变动情况
          financeMsg: ""
        };
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
    },
    matchImage(data) {
      // data为详情传来的所有值
      var forBizDetail = data;
      var obj2 = {};
      //  this.mVmodel(num)的num参数为各个类型所需字段的个数
      obj2 = this.mVmodel(11);
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
    // this.params = this.mVmodel(10);
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
