<!--
  功能：功能描述
  作者：sunhua
  邮箱：947545659@qq.com
  时间：2020年07月07日 16:40:13
-->
<template lang="pug">
  <div class="m3">
    el-card(class='card')
      .cardTitle1
        span(class='blue')
        span(class='title') 张三有限责任公司
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini" class='checkForm' )
        el-form-item(label="检查类型 :" class="formItem2")
          el-select(v-model="form.bizType" disabled style="width:100%" )
            el-option(label="小企业授信业务首次跟踪检查" value="m1")
            el-option(label="小企业授信业务贷后例行检查" value="m2")
            el-option(label="小企业授信业务贷后全面检查" value="m3")
            el-option(label="小企业授信业务还款资金落实情况检查" value="m4")
            el-option(label="小企业法人快捷贷首次检查" value="m5")
            el-option(label="小企业法人快捷贷贷后日常检查" value="m6")
        el-form-item(label="担保方式 :" class="formItem2")
          el-checkbox-group(v-model="form.securityKind" style="width:100%" clearable :disabled="type == 2")
            el-checkbox(v-for="item in securityKindsArr" :key="item.value" :label="item.value" :value="item.value") {{item.label}}
        el-form-item(label="授信金额 :" class="formItem2")
          el-input(v-model="form.lineAmout" :disabled="type == 2" clearable)
        el-form-item(label=" " class="formItem2")
          el-input(v-model="form.otherSecurityKindMsg" type="textarea" :rows="3" clearable :disabled="type == 2")
        el-form-item(label="授信余额 :" class="formItem2")
          el-input(v-model="form.lineBalance" :disabled="type == 2" clearable)
        el-form-item(label="还款方式 :" class="formItem2")
          el-input(v-model="form.repayKind" clearable :disabled="type == 2")

    el-card(class='card')
      .cardTitle1
          span(class='blue')
          span(class='title') 填写信息
      .left
        el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini" class='checkForm')
          .blueTitle 审批意见中贷后日常检查要求及落实情况
          el-form-item(label="要求 :" class="formItem2")
            el-input(v-model="form.requireCheck" :disabled="type == 2" type="textarea" :rows="3" clearable)
          el-form-item(label="落实情况 :" class="formItem2")
            el-input(v-model="form.checked" type="textarea" :disabled="type == 2" :rows="3" clearable)
          .blueTitle 利率及综合金融服务的要求及落实情况
          el-form-item(label="要求 :" class="formItem2")
            el-input(v-model="form.rateAndIntfinSerCheck" :disabled="type == 2" type="textarea" :rows="3" clearable)
          el-form-item(label="落实情况 :" class="formItem2")
            el-input(v-model="form.rateAndIntfinSerChecked" :disabled="type == 2" type="textarea" :rows="3" clearable)
          .blueTitle 近期检查发现的其他风险点
          el-form-item(class="formItem2")
            el-input(v-model="form.otherRisk" type="textarea" :disabled="type == 2" :rows="3" clearable)
      .right
        el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini" class='checkForm')
          .blueTitle 产品贷后日常检查特殊要求及落实情况
          el-form-item(label="要求 :" class="formItem2")
            el-input(v-model="form.specialRequireCheck" type="textarea" :disabled="type == 2" :rows="3" clearable)
          el-form-item(label="落实情况 :" class="formItem2")
            el-input(v-model="form.specialChecked" type="textarea" :disabled="type == 2" :rows="3" clearable)
          .blueTitle 实际控制人或法定代表人风险点
          el-form-item(label="健康、 嗜好、家庭关系等方面 :" class="formItem2")
            el-input(v-model="form.HoldPensonRisk" type="textarea" :disabled="type == 2" :rows="3" clearable)
          el-form-item(label="股权变化、关键管理人员变动、关联企业变动等，是否存在偏离主业、盲目扩张等问题 :" class="formItem2")
            el-input(v-model="form.managerRisk" type="textarea" :disabled="type == 2" :rows="3" clearable)

    el-card(class='card')
      .left
        el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini" class='checkForm' )
          el-form-item(label="检查地点 :" class="formItem2")
            el-input(v-model="form.checkAddr" :disabled="type == 2" clearable)
          el-form-item(label="检查配合程度 :" class="formItem2")
            el-select(v-model="form.cooperate" :disabled="type == 2" style="width:100%" clearable)
              el-option(v-for="item in cooperateArr" :key="item.value" :label="item.label" :value="item.value")
      .right
        el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini" class='checkForm' )
          el-form-item(label="生产经营场所变动情况 :" class="formItem2")
            el-input(v-model="form.addrChangedMsg" :disabled="type == 2" clearable)
          el-form-item(label="接待人员 :" class="formItem2")
            el-input(v-model="form.staff" :disabled="type == 2" clearable)

    el-card(class='card')
      .cardTitle1
        span(class='blue')
        span(class='title') 征信情况
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        .blueTitle 基于企业征信报告
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="征信报告查询日期 :" style="width:96%")
              el-date-picker(v-model="form.creditInfo.queryDateForPer" :disabled="type == 2" value-format='yyyy-MM-dd' format='yyyy-MM-dd' style="width:100%" type="date" clearable)
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
          el-col(:span="12")
            el-form-item(label="对外担保笔数 :" style="width:96%")
              el-input(v-model="form.creditInfo.guaranteeNum" :disabled="type == 2" clearable)
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="未结清贷款金额 :" style="width:96%")
              el-input(v-model="form.creditInfo.unPayOffAmout" :disabled="type == 2" clearable)
          el-col(:span="12")
            el-form-item(label="对外担保金额 :" style="width:96%")
              el-input(v-model="form.creditInfo.guaranteeAmout" :disabled="type == 2" clearable)
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="涉及金融机构 :" style="width:96%")
              el-input(v-model="form.creditInfo.finInstitutionNum" :disabled="type == 2" clearable)
          el-col(:span="12")
            el-form-item(label="对外担保结余 :" style="width:96%")
              el-input(v-model="form.creditInfo.guaranteeBalance" :disabled="type == 2" clearable)
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="未结清贷款结余 :" style="width:96%")
              el-input(v-model="form.creditInfo.sumBalance" :disabled="type == 2" clearable)
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
        el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
          .blueTitle1 2.关联企业征信：
          el-row(:gutter="20")
            el-col(:span="24")
              el-form-item(label="征信记录是否有异常变化 :" style="width:96%")
                el-select(v-model="form.creditInfo.existCreditChage2" :disabled="type == 2" placeholder="请选择" style="width:100%")
                  el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
          el-row(:gutter="20")
            el-col(:span="24")
              el-form-item(style="width:96%")
                el-input(v-model="form.creditInfo.creditChageMsg2" :disabled="type == 2" type="textarea" :rows="2" clearable)
      .right
        el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
          .blueTitle1 3.法人保证人征信：
          el-row(:gutter="20")
            el-col(:span="24")
              el-form-item(label="征信记录是否有异常变化 :" style="width:96%")
                el-select(v-model="form.creditInfo.existCreditChage3" :disabled="type == 2" placeholder="请选择" style="width:100%")
                  el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
          el-row(:gutter="20")
            el-col(:span="24")
              el-form-item(style="width:96%")
                el-input(v-model="form.creditInfo.creditChageMsg3" :disabled="type == 2" type="textarea" :rows="2" clearable)
    //- 基于个人征信报告(对于关注类及以下贷款及风险隐患客户每季度查询一次个人征信即可)
    el-card(class='card')
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        .blueTitle1 基于个人征信报告(对于关注类及以下贷款及风险隐患客户每季度查询一次个人征信即可)：
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="征信报告查询日期 :" style="width:96%")
              el-date-picker(v-model="form.creditInfo.startDate" :disabled="type == 2" value-format='yyyy-MM-dd' format='yyyy-MM-dd' style="width:100%" type="date" clearable)
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
          el-col(:span="12")
            el-form-item(label="授信总金额 :" style="width:96%")
              el-input(v-model="form.creditInfo.debitCardLineAmoutCon" :disabled="type == 2" clearable)
          el-col(:span="12")
            el-form-item(label="未结清贷款金额 :" style="width:96%")
              el-input(v-model="form.creditInfo.unPayOffAmoutCon" :disabled="type == 2" clearable)
          el-col(:span="12")
            el-form-item(label="对外担保笔数 :" style="width:96%")
              el-input(v-model="form.creditInfo.guaranteeNumCon" :disabled="type == 2" clearable)
          el-col(:span="12")
            el-form-item(label="涉及金融机构 :" style="width:96%")
              el-input(v-model="form.creditInfo.finInstitutionNumCon" :disabled="type == 2" clearable)
          el-col(:span="12")
            el-form-item(label="对外担保金额 :" style="width:96%")
              el-input(v-model="form.creditInfo.guaranteeAmoutCon" :disabled="type == 2" clearable)
          el-col(:span="12")
            el-form-item(label="未结清贷款结余 :" style="width:96%")
              el-input(v-model="form.creditInfo.sumBalanceCon" :disabled="type == 2" clearable)
          el-col(:span="12")
            el-form-item(label="对外担保结余 :" style="width:96%")
              el-input(v-model="form.creditInfo.guaranteeBalanceCon" :disabled="type == 2" clearable)
          el-col(:span="12")
            el-form-item(label="未销户贷记卡账户 :" style="width:96%")
              el-input(v-model="form.creditInfo.debitCardNumCon" :disabled="type == 2" clearable)
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
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
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
          el-col(:span="12")
            el-form-item(label="未销户贷记卡担保金额 :" style="width:96%")
              el-input(v-model="form.creditInfo.debitCardLineAmoutJur" :disabled="type == 2" clearable)
          el-col(:span="12")
            el-form-item(label="未结清贷款金额 :" style="width:96%")
              el-input(v-model="form.creditInfo.unPayOffAmoutJur" :disabled="type == 2" clearable)
          el-col(:span="12")
            el-form-item(label="对外担保笔数 :" style="width:96%")
              el-input(v-model="form.creditInfo.guaranteeNumJur" :disabled="type == 2" clearable)
          el-col(:span="12")
            el-form-item(label="涉及金融机构 :" style="width:96%")
              el-input(v-model="form.creditInfo.finInstitutionNumJur" :disabled="type == 2" clearable)
          el-col(:span="12")
            el-form-item(label="对外担保金额 :" style="width:96%")
              el-input(v-model="form.creditInfo.guaranteeAmoutJur" :disabled="type == 2" clearable)
          el-col(:span="12")
            el-form-item(label="未结清贷款结余 :" style="width:96%")
              el-input(v-model="form.creditInfo.sumBalanceJur" :disabled="type == 2" clearable)
          el-col(:span="12")
            el-form-item(label="对外担保结余 :" style="width:96%")
              el-input(v-model="form.creditInfo.guaranteeBalanceJur" :disabled="type == 2" clearable)
          el-col(:span="12")
            el-form-item(label="未销户贷记卡账户 :" style="width:96%")
              el-input(v-model="form.creditInfo.debitCardNumJur" :disabled="type == 2" clearable)
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
    //- 3.其他保证人征信
    el-card(class='card')
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        .blueTitle1 3.其他保证人征信
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="征信记录是否有异常变化 :" style="width:96%")
              el-select(v-model="form.creditInfo.existCreditChage6" :disabled="type == 2" placeholder="请选择" style="width:100%")
                el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(style="width:96%")
              el-input(v-model="form.creditInfo.creditChageMsg6" :disabled="type == 2" type="textarea" :rows="3" clearable)
    //- 近期负面信息情况
    el-card(class='card')
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        .cardTitle
          span(class='blue')
          span(class='title') 近期负面信息情况
        el-row(:gutter="20" style="marginTop:20px")
          el-col(:span="12")
            el-form-item(style="width:96%")
              el-input(v-model="form.creditInfo.msg" type="textarea" :disabled="type == 2" :rows="3" clearable) 
    //- 企业财务情况
    el-card(class='card')
      .cardTitle1
        span(class='blue')
        span(class='title') 企业财务情况 
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="" style="width:96%")
              el-select(v-model="form.financeInfo.financeClassification" @change='financeInfoChange' :disabled="type == 2" placeholder="请选择" style="width:100%")
                el-option(v-for="item in financeList" :key="item.value" :label="item.label" :value="item.value")
      .cardContent
        tab-form1(:contentDetail="params1" v-if="form.financeInfo.financeClassification=='1'" ref="tabForm1")
        tab-form2(:contentDetail="params2" v-if="form.financeInfo.financeClassification=='2'" ref="tabForm2")
    //- 现场检查其他要点
    el-card(class='card')
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        .cardTitle1
            span(class='blue')
            span(class='title1') 现场检查其他要点
        .blueTitle1 检查要点
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="企业所在行业是否发生重大不利变化 :" style="width:96%")
              el-input(v-model="form.industrycChangSiut" :disabled="type == 2" type="textarea" :rows="3" clearable)
          el-col(:span="12")
            el-form-item(label="生产经营是否存在安全隐患 :" style="width:96%")
              el-input(v-model="form.hiddenTroubleSitu" :disabled="type == 2" type="textarea" :rows="3" clearable)
          el-col(:span="12")
            el-form-item(label="企业是否有与主业无关的扩张计划 :" style="width:96%")
              el-input(v-model="form.planExpandSitu" :disabled="type == 2" type="textarea" :rows="3" clearable)
          el-col(:span="12")
            el-form-item(label="其他 :" style="width:96%")
              el-input(v-model="form.otherSitu" :disabled="type == 2" type="textarea" :rows="3" clearable)
        .blueTitle1 担保情况
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="上次抵质押物评估或重估日期 :" style="width:96%")
              el-date-picker(v-model="form.collEstimateDate" :disabled="type == 2" value-format='yyyy-MM-dd' format='yyyy-MM-dd' style="width:100%" type="date" clearable)
          el-col(:span="12")
            span(class="greyContent") 根据现场检查及非现场查询情况，从抵(质)押物市场价值和变现能力方面分析，判|断抵(质)押物是否出现约定的需增加、置换等变动情形。
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="上次抵质押物评估或重估金额 :" style="width:96%")
              el-input(v-model="form.collEstimateValue" :disabled="type == 2" clearable)
          
    //- 影像维护
    el-card(class='card')
      .cardTitle
        span(class='blue')
        span(class='title') 影像维护
      .uploadBox(v-for='(item,index) in list3' :key='item.index')
        .imgTitle {{item.title}}
        el-upload(action="http://20.147.168.82:9001/postLoan/business/uploadModelFile" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove")
          i(class="el-icon-plus") 
    //- 弹窗
    el-dialog(:visible.sync="dialogVisible" width="40%" :append-to-body="true" v-alterELDialogMarginTop="{marginTop:'20vh'}" close="deleteCancel()")
      img(width="100%" :src="dialogImageUrl" alt="")
  </div>
</template>

<script>
// import { filterParams } from "../../../utils/utils";
import TabForm1 from "./TabForm1";
import TabForm2 from "./TabForm2";
export default {
  // 组件名称
  name: "DivM3",
  // 组件参数 接收来自父组件的数据
  props: ["detail"],
  // 局部注册的组件
  components: {
    "tab-form1": TabForm1,
    "tab-form2": TabForm2
  },
  // 组件状态值
  data() {
    return {
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
      financeList: [
        {
          label: "加工制造类企业适用",
          value: "1"
        },
        {
          label: "贸易类/其他类企业适用",
          value: "2"
        }
      ],
      form: {
        // card 1
        bizType: "m3", // 检查类型
        custName: "", // 客户名称  queryType为2时，必传；其他情况非必传
        securityKind: "", //担保方式
        otherSecurityKindMsg: "", //担保方式说明
        lineAmout: "", //授信金额
        lineBalance: "", //授信余额
        repayKind: "", //还款方式

        // card 2
        requireCheck: "", // 审批意见中贷后日常检查要求
        checked: "", // 落实情况
        rateAndIntfinSerCheck: "", // 利率及综合金融服务的要求
        rateAndIntfinSerChecked: "", // 落实情况
        otherRisk: "", // 近期检查发现的其他风险点
        specialRequireCheck: "", //产品贷后日常检查特殊要求
        specialChecked: "", // 落实情况
        HoldPensonRisk: "", //实际控制人风险点
        managerRisk: "", //管理层风险点

        // card 3
        checkAddr: "", //检查地点
        cooperate: "", //检查配合程度
        addrChangedMsg: "", //生产经营场所变动情况
        staff: "", //接待人员

        // card 4  基于企业征信报告
        creditInfo: {
          queryDateForPer: "", //征信报告查询日期
          // 1.借款企业征信
          // (1)未结清贷款及对外担保情况
          unPayOffLoanNum: "", //未结清贷款笔数
          guaranteeNum: "", //对外担保笔数
          unPayOffAmout: "", //未结清贷款金额
          guaranteeAmout: "", //对外担保金额
          finInstitutionNum: "", //涉及金融机构
          guaranteeBalance: "", //对外担保结余
          sumBalance: "", //未结清贷款结余
          // (2)逾期及欠息等不良记录
          existBadRecord: 1, // 是否逾期 借款企业
          badRecordMsg: "", //  逾期及违约 不良影响
          // (3)借款企业欠税情况
          oweTaxRecordNum: "", // 欠税记录
          civilJudgmentRecordNum: "", // 民事判决
          forceImpleRecordNum: "", // 强制执行记录
          administRecordNum: "", // 行政处罚记录
          // (4)征信记录
          creditChageMsg1: "", // 	借款企业 征信变化情况说明
          existCreditChage1: 0, // 借款企业 征信变化是否变化
          // card 5
          creditChageMsg2: "", // 	关联企业 征信变化情况说明
          existCreditChage2: 0, // 关联企业 征信变化是否变化
          creditChageMsg3: "", // 	法人保证人 征信变化情况说明
          existCreditChage3: 0, // 法人保证人 征信变化是否变化

          // 基于个人征信报告
          startDate: "", //征信报告查询日期
          // 1.企业实际控制人及其配偶(若有)征信
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
          // 3.其他保证人征信
          existCreditChage6: "", //征信记录是否有异常变化
          creditChageMsg6: "", //说明
          // 近期负面信息情况
          msg: "" //近期负面信息情况
        },

        // 企业财务情况
        financeInfo: {
          financeClassification: "1",

          // 现场检查其他要点
          industrycChangSiut: "", //企业所在行业是否发生重大不利变化
          hiddenTroubleSitu: "", //生产经营是否存在安全隐患
          planExpandSitu: "", //企业是否有与主业无关的扩张计划
          otherSitu: "", //其他
          collEstimateDate: "", //上次抵质押物评估或重估日期
          collEstimateValue: "" //上次抵质押物评估或重估金额
        }
      },
      list3: [
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
          title: "主要上下游客户合同单据",
          url: "",
          dimension: "",
          longitude: ""
        },
        {
          title: "其他财务经营材料",
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
          title: "检查人员现场检查影像",
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
      type: 1,
      params1: {},
      params2: {},
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
      console.log(1, newVal, oldVal);
      this.form = newVal;
      this.params1 = newVal.financeInfo;
      this.params2 = newVal.financeInfo;
    }
  },
  // 组件方法
  methods: {
    // 阶段多选框
    financeInfoChange() {
      console.log(this.form.financeInfo.financeClassification);
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
  mounted() {
    const { billNo, bizId, bizStatus } = this.$route.query;
    // this.params1 = this.form.financeInfo;
    // console.log("this.params1", this.form);
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
  .greyContent {
    font-size: 16px;
    line-height: 27px;
    color: rgba(183, 183, 183, 1);
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
.el-checkbox-group {
  .el-checkbox {
    margin-right: 15px;
  }
}
</style>
