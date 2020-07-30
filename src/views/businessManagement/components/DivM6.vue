<!--
  功能：功能描述
  作者：sunhua
  邮箱：947545659@qq.com
  时间：2020年07月07日 16:40:13
-->
<template lang="pug">
  <div class="m6">
    el-card(class='card')
      .cardTitle1
        span(class='blue')
        span(class='title') {{form.custName}}
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini" class='checkForm' )
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="贷后检查模式 :" class="formItem2")
              el-input(v-model="form.checkModel" :disabled="type == 2")
          el-col(:span="12")
            el-form-item(label="还款方式 :" class="formItem2")
              el-input(v-model="form.repayKind" :disabled="type == 2")
          el-col(:span="12")
            el-form-item(label="授信金额 :" class="formItem2")
              el-input(v-model="form.lineAmout" :disabled="type == 2")
          el-col(:span="12")
            el-form-item(label="检查地点 :" class="formItem2")
              el-input(v-model="form.checkAddr" :disabled="type == 2")
          el-col(:span="12")
            el-form-item(label="授信余额 :" class="formItem2")
              el-input(v-model="form.lineBalance" :disabled="type == 2")
          el-col(:span="12")
            el-form-item(label="检查配合程度 :" class="formItem2")
              el-select(v-model="form.cooperate" style="width:100%" clearable :disabled="type == 2")
                el-option(v-for="item in cooperateArr" :key="item.value" :label="item.label" :value="item.value")
          el-col(:span="12")
            el-form-item(label="担保方式 :" class="formItem2")
              el-checkbox-group(v-model="form.securityKind" style="width:100%" clearable :disabled="type == 2" @change='selectSecurityKind')
                el-checkbox(v-for="item in securityKindsArr" :key="item.value" :label="item.value" :value="item.value") {{item.label}}
              //- el-select(v-model="form.securityKind" style="width:100%" clearable)
              //-   el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
          el-col(:span="12")
            el-form-item(label="额度年检 :" class="formItem2")
              el-select(v-model="form.yearlyInspection" style="width:100%" :disabled="type == 2")
                el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
          el-col(:span="12")
            el-form-item(label=" " class="formItem2")
              el-input(v-model="form.otherSecurityKindMsg" v-if='securityKindMsgShow' type="textarea" :rows="3" :disabled="type == 2" clearable)
          el-col(:span="12")
            el-form-item(label="押品重估 :" class="formItem2")
              el-select(v-model="form.revalOfColl" style="width:100%" :disabled="type == 2")
                el-option(v-for="item in options" :key="item.value"  :label="item.label" :value="item.value")
    //- 
    el-card(class='card')
      .cardTitle1
        span(class='blue')
        span(class='title') 客户资信情况检查
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        .blueTitle 客户资信检查
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="征信报告查询日期 :" class="formItem2")
              el-date-picker(v-model="form.assetCreditInfo.queryDate" :picker-options="pickerOptions" :disabled="type == 2" value-format='yyyy-MM-dd' format='yyyy-MM-dd' style="width:100%" type="date" clearable)
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="当前企业及实际控制人征信情况(注明征信查询分类结果) :" class="formItem2")
              el-input(v-model="form.assetCreditInfo.fiveClass" :disabled="type == 2" type="textarea" :rows="3" clearable)
          
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="企业或企业主是否有他行收缩贷款规模 :" class="formItem2")
              el-select(v-model="form.assetCreditInfo.shrinkLoanScale" :disabled="type == 2" style="width:100%" clearable)
                el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
          el-col(:span="12")
            el-form-item(label="企业或企业主征信是否有新增逾期记录 :" class="formItem2")
              el-select(v-model="form.assetCreditInfo.addedOverdues" :disabled="type == 2" style="width:100%" clearable)
                el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
         
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label=" " class="formItem2")
              el-input(v-model="form.assetCreditInfo.shrinkLoanScaleMsg" :disabled="type == 2" type="textarea" :rows="3" clearable)
          el-col(:span="12")
            el-form-item(label=" " class="formItem2")
              el-input(v-model="form.assetCreditInfo.addedOverduesMsg" :disabled="type == 2" type="textarea" :rows="3" clearable)
         
  
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="企业或企业主是否有新增对外担保记录 :" class="formItem2")
              el-select(v-model="form.assetCreditInfo.addedGuarantees" :disabled="type == 2" style="width:100%" clearable)
                el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
          el-col(:span="12")
            el-form-item(label="企业或企业主是否有他行新增贷款 :" class="formItem2")
              el-select(v-model="form.assetCreditInfo.addedLoans" :disabled="type == 2" style="width:100%" clearable)
                el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")

        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label=" " class="formItem2")
              el-input(v-model="form.assetCreditInfo.addedGuaranteesMsg" :disabled="type == 2" type="textarea" :rows="3" clearable)
          el-col(:span="12")
            el-form-item(label=" " class="formItem2")
              el-input(v-model="form.assetCreditInfo.addedLoansMsg" :disabled="type == 2" type="textarea" :rows="3" clearable) el-col(:span="12")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="企业或企业主是否有其他异常变化 :" class="formItem2")
              el-select(v-model="form.assetCreditInfo.otherSitu" :disabled="type == 2" style="width:100%" clearable)
                el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
            el-form-item(label=" " class="formItem2")
              el-input(v-model="form.assetCreditInfo.otherSituMsg" :disabled="type == 2" type="textarea" :rows="3" clearable)
        
    //- 检查要点小结
    el-card(class='card')
      .cardTitle1
        span(class='blue')
        span(class='title') 检查要点小结
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(class="formItem2")
              el-input(v-model="form.loanLength" :disabled="type == 2" type="textarea" :rows="3" clearable)
    //- 客户经营情况检查
    el-card(class='card')
      .cardTitle1
        span(class='blue')
        span(class='title') 客户经营情况检查
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        .blueTitle1 企业经营情况
        .cardTitle2
          span 检查要点
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="企业实际股权结构是否与上述工商信息网查询一致 :" class="formItem2")
              el-select(v-model="form.ownerStruSame" :disabled="type == 2" style="width:100%" clearable)
                el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
          el-col(:span="12")
            el-form-item(label="企业所在行业是否发生重大不利变化 :" class="formItem2")
              el-select(v-model="form.industrycChangSiut" :disabled="type == 2" style="width:100%" clearable)
                el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label=" " class="formItem2")
              el-input(v-model="form.ownerStruSameMsg" :disabled="type == 2" type="textarea" :rows="3" clearable)
          el-col(:span="12")
            el-form-item(label=" " class="formItem2")
              el-input(v-model="form.industrycChangSiutMsg" :disabled="type == 2" type="textarea" :rows="3" clearable)
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="企业主营业务情况是否发生变更 :" class="formItem2")
              el-select(v-model="form.mainBusIsChanged" :disabled="type == 2" style="width:100%" clearable)
                el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
          el-col(:span="12")
            el-form-item(label="企业是否有与主业无关的扩张计划 :" class="formItem2")
              el-select(v-model="form.planExpandSitu" :disabled="type == 2" style="width:100%" clearable)
                el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label=" " class="formItem2")
              el-input(v-model="form.mainBusIsChangedMsg" :disabled="type == 2" type="textarea" :rows="3" clearable)
          el-col(:span="12")
            el-form-item(label=" " class="formItem2")
              el-input(v-model="form.planExpandSituMsg" :disabled="type == 2" type="textarea" :rows="3" clearable)
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="企业生产经营场所是否发生或即将发生变动 :" class="formItem2")
              el-select(v-model="form.proAndOpeAbnormalSuit" :disabled="type == 2" style="width:100%" clearable)
                el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
          el-col(:span="12")
            el-form-item(label="企业主要原材料或货物的采购成本是否明显上升 :" class="formItem2")
              el-select(v-model="form.purchaseCost" :disabled="type == 2" style="width:100%" clearable)
                el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label=" " class="formItem2")
              el-input(v-model="form.proAndOpeAbnormalSuitMsg" :disabled="type == 2" type="textarea" :rows="3" clearable)
          el-col(:span="12")
            el-form-item(label=" " class="formItem2")
              el-input(v-model="form.purchaseCostMsg" :disabled="type == 2" type="textarea" :rows="3" clearable)
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="企业生产经营是否出现异常情况(停产、半停产、销售大规模退货、员工数量骤减、劳资关系紧张、设备开工率不足、拖欠租金等) :" class="formItem2")
              el-select(v-model="form.orderDecline" :disabled="type == 2" style="width:100%" clearable)
                el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
          el-col(:span="12" style='paddingTop:24px')
            el-form-item(label="企业销售是否出现异常情况(销售大规模退货、存货积压严重) :" class="formItem2")
              el-select(v-model="form.saleAbnormalSuit" :disabled="type == 2" style="width:100%" clearable)
                el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label=" " class="formItem2")
              el-input(v-model="form.orderDeclineMsg" :disabled="type == 2" type="textarea" :rows="3" clearable)
          el-col(:span="12")
            el-form-item(label=" " class="formItem2")
              el-input(v-model="form.saleAbnormalSuitMsg" :disabled="type == 2" type="textarea" :rows="3" clearable)
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="企业上下游核心客户是否发生重大变更 :" class="formItem2")
              el-select(v-model="form.chainChange" :disabled="type == 2" style="width:100%" clearable)
                el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
          el-col(:span="12")
            el-form-item(label="制造型企业水、电、煤、气等资源消耗量是否较上年同期明显下降(降幅达30%) : :" class="formItem2")
              el-select(v-model="form.dailyCostDecline" :disabled="type == 2" style="width:100%" clearable)
                el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label=" " class="formItem2")
              el-input(v-model="form.chainChangeMsg" :disabled="type == 2" type="textarea" :rows="3" clearable)
          el-col(:span="12")
            el-form-item(label=" " class="formItem2")
              el-input(v-model="form.dailyCostDeclineMsg" :disabled="type == 2" type="textarea" :rows="3" clearable)
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="企业生产经营是否有安全隐患 :" class="formItem2")
              el-select(v-model="form.hiddenTroubleSitu" :disabled="type == 2" style="width:100%" clearable)
                el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
          el-col(:span="12")
            el-form-item(label="其他 :" class="formItem2" style='paddingTop:24px')
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label=" " class="formItem2")
              el-input(v-model="form.hiddenTroubleSituMsg" :disabled="type == 2" type="textarea" :rows="3" clearable)
          el-col(:span="12")
            el-form-item(label=" " class="formItem2")
              el-input(v-model="form.msg" type="textarea" :disabled="type == 2" :rows="3" clearable)
        
    el-card(class='card')
      .cardTitle1
        span(class='blue')
        span(class='title') 现金流调查
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="剔除季节性因素后的现金流是否有大幅下降(降幅超30%) :" class="formItem2")
              el-select(v-model="form.cashDecline" :disabled="type == 2" style="width:100%" clearable)
                el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
          el-col(:span="12")
            el-form-item(label="现金流与营业收入是否基本匹配 :" class="formItem2")
              el-select(v-model="form.cashMatchesAndProAndOpe" :disabled="type == 2" style="width:100%" clearable)
                el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="上次检查(或调查)至本次检查期间的现金流 :" class="formItem2")
              el-input(v-model="form.cashLastToNow" :disabled="type == 2" type="textarea" :rows="3" clearable)
          el-col(:span="12")
            el-form-item(label="其他 :" class="formItem2")
              el-input(v-model="form.cashOtherMsg" :disabled="type == 2" type="textarea" :rows="3" clearable)
    //- 检查要点小结
    el-card(class='card')
      .cardTitle1
        span(class='blue')
        span(class='title') 检查要点小结
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label=" " class="formItem2")
              el-input(v-model="form.summaryForCheck" :disabled="type == 2" type="textarea" :rows="3" clearable)

    //- 房地产抵押担保适用
    el-card(class='card')
      .cardTitle1
        span(class='blue')
        span(class='title') 房地产抵押担保适用
      el-form(v-for="(item,index) in form.assitInfoForPledge" :key="index" :inline="true" label-position="top" label-width="80px" size="mini")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="押品名称: " class="formItem2")
              el-input(v-model="item.assitName" :disabled="type == 2" clearable)
          el-col(:span="12")
            el-form-item(label="押品位置地址: " class="formItem2")
              el-input(v-model="item.assitAddr" :disabled="type == 2" clearable)
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="首次评估情况: " class="formItem2")
              el-input(v-model="item.firstEstimateDate" :disabled="type == 2" clearable)
          el-col(:span="12")
            el-form-item(label="我行认定价值: " class="formItem2")
              el-input(v-model="item.firstEstimateValue" :disabled="type == 2" clearable)
          el-col(:span="12")
            el-form-item(label="抵质押率: " class="formItem2")
              el-input(v-model="item.firstMortAndpleRate" :disabled="type == 2" clearable)
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="最近一次评估情况: " class="formItem2")
              el-input(v-model="item.lastEstimateDate" :disabled="type == 2" clearable)
          el-col(:span="12")
            el-form-item(label="我行认定价值: " class="formItem2")
              el-input(v-model="item.lastEstimateValue" :disabled="type == 2" clearable)
          el-col(:span="12")
            el-form-item(label="抵质押率: " class="formItem2")
              el-input(v-model="item.lastMortAndpleRate" :disabled="type == 2" clearable)
          el-col(:span="12")
            el-form-item(label="本次评估情况: " class="formItem2")
              el-input(v-model="item.thisEstimateDate" :disabled="type == 2" clearable)
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="我行认定价值: " class="formItem2")
              el-input(v-model="item.thisEstimateValue" :disabled="type == 2" clearable)
          el-col(:span="12")
            el-form-item(label="抵质押率: " class="formItem2")
              el-input(v-model="item.thisMortAndpleRate" :disabled="type == 2" clearable)
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="押品价值及变现能力变动情况: " class="formItem2")
              el-input(v-model="item.assitChangeSuit" :disabled="type == 2" type="textarea" :rows="3" clearable)
          el-col(:span="12" style="marginTop:24px")
            el-button(@click="addDomain1" type='primary' :disabled="type == 2" v-if="index == 0") 新增
            el-button(@click="removeDomain1(item)" type='primary' :disabled="type == 2" v-if="index !== 0") 删除
    
    //- 房地产抵押担保适用
    el-card(class='card')
      .cardTitle1
        span(class='blue')
        span(class='title') 融资担保机构担保适用
      el-form(v-for="(item,index) in form.assitInfoForGuarantee" :key="index" :inline="true" label-position="top" label-width="80px" size="mini")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="担保公司名称: " class="formItem2")
              el-input(v-model="item.assitName" :disabled="type == 2" clearable)
          el-col(:span="12")
            el-form-item(label="我行合作状态: " class="formItem2")
              el-input(v-model="item.cooperatStatus" :disabled="type == 2" clearable)
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="风险分类: " class="formItem2")
              el-input(v-model="item.assitFiveClass" :disabled="type == 2" clearable)
          el-col(:span="12" style="marginTop:24px")
            el-button(@click="addDomain2" type='primary' :disabled="type == 2" v-if="index == 0") 新增
            el-button(@click="removeDomain2(item)" type='primary' :disabled="type == 2" v-if="index !== 0") 删除
    
    //- 押品价值及变现能力变动情况
    el-card(class='card')
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-row(:gutter="20")
          //- el-col(:span="12")
          //-   .cardTitle1
          //-     span(class='title') 押品价值及变现能力变动情况
          //-   el-form-item(label=" " class="formItem2")
          //-     el-input(v-model="form.assitChangeSuit" :disabled="type == 2" type="textarea" :rows="3" clearable)
          el-col(:span="12")
            .cardTitle1
              span(class='title') 押品其他情况
            el-form-item(label=" " class="formItem2")
              el-input(v-model="form.assitOtherSuit" :disabled="type == 2" type="textarea" :rows="3" clearable)
          el-col(:span="12")
            .cardTitle1
              span(class='title') 押品检查小结
            el-form-item(label=" " class="formItem2")
              el-input(v-model="form.summaryForAssit" :disabled="type == 2" type="textarea" :rows="3" clearable)
    
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
  </div>
</template>

<script>
import uploadTest from "./upload";
import { filterParams } from "../../../utils/utils";
export default {
  // 组件名称
  name: "DivM6",
  // 组件参数 接收来自父组件的数据
  props: ["detail"],
  // 局部注册的组件
  components: {
    uploadTest
  },
  // 组件状态值
  data() {
    const definte17 = () => {
      const definite17Array = [];
      const valueArray = [
        "能耗类材料",
        "银行流水",
        "主要上下游客户合同单据",
        "其他财务经营材料",
        "企业办公场所（含企业大门）",
        "企业生产车间（含重要生产或经营工序）",
        "企业重要生产或经营设备、存货",
        "检查人员现场检查影像",
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
      securityKindsArr: [
        {
          label: "信用",
          value: "1"
        },
        {
          label: "抵押",
          value: "2"
        },
        {
          label: "质押",
          value: "3"
        },
        {
          label: "保证",
          value: "4"
        },
        {
          label: "其它",
          value: "5"
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
        bizType: "m6", // 检查类型
        checkModel: "", //贷后检查模式
        repayKind: "", // 还款方式
        lineAmout: "", //  授信金额
        checkAddr: "", // 检查地点
        lineBalance: "", //授信余额
        cooperate: "1", // 检查配合程度
        securityKind: "", //担保方式
        yearlyInspection: "", //额度年检
        revalOfColl: "", //押品重估

        assetCreditInfo: {
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
        },

        summaryForCheck: "", //检查要点小结

        //客户经营情况检查
        ownerStruSame: "", //企业实际股权结构是否与上述工商信息网查询一致
        ownerStruSameMsg: "", //实际股权结构说明
        industrycChangSiut: "", //企业所在行业是否发生重大不利变化
        industrycChangSiutMsg: "", //所在行业是否发生重大不利变化说明
        mainBusIsChanged: "", //企业主营业务情况是否发生变更
        mainBusIsChangedMsg: "", //企业主营业务情况是否发生变更说明
        planExpandSitu: "", //企业是否有与主业无关的扩张计划
        planExpandSituMsg: "", //企业是否有与主业无关的扩张计划说明
        proAndOpeAbnormalSuit: "", //企业生产经营场所是否发生或即将发生变动
        proAndOpeAbnormalSuitMsg: "", //企业生产经营场所是否发生或即将发生变动说明
        purchaseCost: "", //企业主要原材料或货物的采购成本是否明显上升
        purchaseCostMsg: "", //企业主要原材料或货物的采购成本是否明显上升说明
        orderDecline: "", //企业生产经营是否出现异常情况
        orderDeclinemsg: "", //企业生产经营是否出现异常情况说明
        saleAbnormalSuit: "", //企业销售是否出现异常情况
        saleAbnormalSuitMsg: "", //企业销售是否出现异常情况说明
        chainChange: "", //企业上下游核心客户是否发生重大变更
        chainChangeMsg: "", //企业上下游核心客户是否发生重大变更说明
        dailyCostDecline: "", //制造型企业水、电、煤、气等资源消耗量是否较上年同期明显下降
        dailyCostDeclineMsg: "", //制造型企业水、电、煤、气等资源消耗量是否较上年同期明显下降说明
        hiddenTroubleSitu: "", //企业生产经营是否有安全隐患
        hiddenTroubleSituMsg: "", //企业生产经营是否有安全隐患说明
        msg: "", //

        // 现金流
        cashDecline: "", //剔除季节性因素后的现金流是否有大幅下降
        cashMatchesAndProAndOpe: "", //现金流与营业收入是否基本匹配
        cashLastToNow: "", //上次检查(或调查)至本次检查期间的现金流
        cashOtherMsg: "", //现金流其他

        assitChangeSuit: "", //押品价值及变现能力变动情况
        assitOtherSuit: "", //押品其他情况
        summaryForAssit: "", //押品检查小结

        //
        assitInfoForPledge: [
          {
            assitName: "",
            assitAddr: "",
            firstEstimateDate: "",
            firstEstimateValue: "",
            firstMortAndpleRate: "",
            lastEstimateDate: "",
            lastEstimateValue: "",
            lastMortAndpleRate: "",
            thisEstimateDate: "",
            thisEstimateValue: "",
            thisMortAndpleRate: "",
            assitClassification: "1"
          }
        ],
        //
        assitInfoForGuarantee: [
          {
            assitName: "",
            cooperatStatus: "",
            assitFiveClass: "",
            assitClassification: "2"
          }
        ]
      },
      type: 1,
      params1: {},
      params2: {},
      dialogImageUrl: "",
      securityKindMsgShow: false,
      dialogVisible: false,
      formLabelWidth: "72px"
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {
    detail: function(newVal, oldVal) {
      console.log(1, newVal, oldVal);
      this.form = newVal;
      if (newVal.securityKind.indexOf("5") != -1) {
        this.securityKindMsgShow = true;
      }
      this.params = this.matchImage(newVal);
      if (!newVal.cooperate) {
        this.form.cooperate = "1";
      }
      if (!newVal.yearlyInspection) {
        this.form.yearlyInspection = 1;
      }
      if (!newVal.revalOfColl) {
        this.form.revalOfColl = 1;
      }
      if (!newVal.ownerStruSame) {
        this.form.ownerStruSame = 1;
      }
      if (!newVal.industrycChangSiut) {
        this.form.industrycChangSiut = 1;
      }
      if (!newVal.mainBusIsChanged) {
        this.form.mainBusIsChanged = 1;
      }
      if (!newVal.planExpandSitu) {
        this.form.planExpandSitu = 1;
      }
      if (!newVal.proAndOpeAbnormalSuit) {
        this.form.proAndOpeAbnormalSuit = 1;
      }
      if (!newVal.purchaseCost) {
        this.form.purchaseCost = 1;
      }
      if (!newVal.orderDecline) {
        this.form.orderDecline = 1;
      }
      if (!newVal.saleAbnormalSuit) {
        this.form.saleAbnormalSuit = 1;
      }
      if (!newVal.chainChange) {
        this.form.chainChange = 1;
      }
      if (!newVal.dailyCostDecline) {
        this.form.dailyCostDecline = 1;
      }
      if (!newVal.hiddenTroubleSitu) {
        this.form.hiddenTroubleSitu = 1;
      }
      if (!newVal.cashDecline) {
        this.form.cashDecline = 1;
      }
      if (!newVal.cashMatchesAndProAndOpe) {
        this.form.cashMatchesAndProAndOpe = 1;
      }
      if (!newVal.assitInfoForPledge || newVal.assitInfoForPledge.length == 0) {
        this.form.assitInfoForPledge = [
          {
            assitName: "",
            assitAddr: "",
            firstEstimateDate: "",
            firstEstimateValue: "",
            firstMortAndpleRate: "",
            lastEstimateDate: "",
            lastEstimateValue: "",
            lastMortAndpleRate: "",
            thisEstimateDate: "",
            thisEstimateValue: "",
            thisMortAndpleRate: "",
            assitChangeSuit: "",
            assitClassification: "1"
          }
        ];
      }
      if (
        !newVal.assitInfoForGuarantee ||
        newVal.assitInfoForGuarantee.length == 0
      ) {
        this.form.assitInfoForGuarantee = [
          {
            assitName: "",
            cooperatStatus: "",
            assitFiveClass: "",
            assitClassification: "2"
          }
        ];
      }

      if (!newVal.assetCreditInfo) {
        this.form.assetCreditInfo = {
          shrinkLoanScale: 1,
          addedOverdues: 1,
          addedGuarantees: 1,
          addedLoans: 1,
          otherSitu: 1
        };
      }
      if (newVal.assetCreditInfo.shrinkLoanScale != 0) {
        this.form.assetCreditInfo.shrinkLoanScale = 1;
      }
      if (newVal.assetCreditInfo.addedOverdues != 0) {
        this.form.assetCreditInfo.addedOverdues = 1;
      }
      if (newVal.assetCreditInfo.addedGuarantees != 0) {
        this.form.assetCreditInfo.addedGuarantees = 1;
      }
      if (newVal.assetCreditInfo.addedLoans != 0) {
        this.form.assetCreditInfo.addedLoans = 1;
      }
      if (newVal.assetCreditInfo.otherSitu != 0) {
        this.form.assetCreditInfo.otherSitu = 1;
      }
    }
  },
  // 组件方法
  methods: {
    // 保存
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
    selectSecurityKind() {
      console.log(this.form.securityKind);
      if (this.form.securityKind.indexOf("5") != -1) {
        this.securityKindMsgShow = true;
      } else {
        this.securityKindMsgShow = false;
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
    },
    // 增加--检查要点小结
    addDomain1() {
      console.log(this.form.assitInfoForPledge);
      this.form.assitInfoForPledge.push({
        assitName: "",
        assitAddr: "",
        firstEstimateDate: "",
        firstEstimateValue: "",
        firstMortAndpleRate: "",
        lastEstimateDate: "",
        lastEstimateValue: "",
        lastMortAndpleRate: "",
        thisEstimateDate: "",
        thisEstimateValue: "",
        thisMortAndpleRate: "",
        assitChangeSuit: "",
        assitClassification: "1",
        key: Date.now()
      });
    },
    // 删除--检查要点小结
    removeDomain1(item) {
      var index = this.form.assitInfoForPledge.indexOf(item);
      if (index !== -1) {
        this.form.assitInfoForPledge.splice(index, 1);
      }
    },
    //
    addDomain2() {
      this.form.assitInfoForGuarantee.push({
        assitName: "",
        cooperatStatus: "",
        assitFiveClass: "",
        assitClassification: "2",
        key: Date.now()
      });
    },
    // 删除--检查要点小结
    removeDomain2(item) {
      var index = this.form.assitInfoForGuarantee.indexOf(item);
      if (index !== -1) {
        this.form.assitInfoForGuarantee.splice(index, 1);
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
      obj2 = this.mVmodel(10);
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
    // this.params = this.mVmodel(9);
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
    width: 96%;
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
      height: 31px;
      margin: 5px 0 5px;
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
      height: 31px;
      margin: 5px 0 5px;
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
    height: 31px;
    margin: 5px 0 5px;
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
.uploadBox {
  // height: 175px;
  .imgTitle {
    font-size: 16px;
    color: rgba(10, 10, 10, 1);
    padding: 16px 0 16px;
  }
  /deep/.el-upload--picture-card {
    width: 148px;
    height: 148px;
    // position: relative;
    // .el-icon-plus {
    //   position: absolute;
    //   top: 31px;
    //   left: 31px;
    //   height: 16px;
    //   width: 16px;
    // }
  }
}
</style>
