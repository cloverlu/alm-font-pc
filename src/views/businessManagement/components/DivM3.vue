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
          el-input(v-model="form.custName" clearable)
        el-form-item(label="担保方式 :" class="formItem2")
          el-select(v-model="form.value" style="width:100%" clearable)
            el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
        el-form-item(label="授信金额 :" class="formItem2")
          el-input(v-model="form.billNo" clearable)
        el-form-item(label=" " class="formItem2")
          el-input(v-model="form.payKind" type="textarea" :rows="3" clearable)
        el-form-item(label="授信余额 :" class="formItem2")
          el-input(v-model="form.loanAmout" clearable)
        el-form-item(label="还款方式 :" class="formItem2")
          el-input(v-model="form.loanPurpose" clearable)

    el-card(class='card')
      .cardTitle1
          span(class='blue')
          span(class='title') 填写信息
      .left
        el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini" class='checkForm')
          .blueTitle 审批意见中贷后日常检查要求及落实情况
          el-form-item(label="要求 :" class="formItem2")
            el-input(v-model="form.requireCheck" type="textarea" :rows="3" clearable)
          el-form-item(label="落实情况 :" class="formItem2")
            el-input(v-model="form.checked" type="textarea" :rows="3" clearable)
          .blueTitle 利率及综合金融服务的要求及落实情况
          el-form-item(label="要求 :" class="formItem2")
            el-input(v-model="form.requireCheck" type="textarea" :rows="3" clearable)
          el-form-item(label="落实情况 :" class="formItem2")
            el-input(v-model="form.checked" type="textarea" :rows="3" clearable)
          .blueTitle 近期检查发现的其他风险点
          el-form-item(class="formItem2")
            el-input(v-model="form.requireCheck" type="textarea" :rows="3" clearable)
      .right
        el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini" class='checkForm')
          .blueTitle 产品贷后日常检查特殊要求及落实情况
          el-form-item(label="要求 :" class="formItem2")
            el-input(v-model="form.requireCheck" type="textarea" :rows="3" clearable)
          el-form-item(label="落实情况 :" class="formItem2")
            el-input(v-model="form.checked" type="textarea" :rows="3" clearable)
          .blueTitle 实际控制人或法定代表人风险点
          el-form-item(label="健康、 嗜好、家庭关系等方面 :" class="formItem2")
            el-input(v-model="form.requireCheck" type="textarea" :rows="3" clearable)
          el-form-item(label="股权变化、关键管理人员变动、关联企业变动等，是否存在偏离主业、盲目扩张等问题 :" class="formItem2")
            el-input(v-model="form.checked" type="textarea" :rows="3" clearable)

    el-card(class='card')
      .left
        el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini" class='checkForm' )
          el-form-item(label="检查地点 :" class="formItem2")
            el-input(v-model="form.requireCheck" clearable)
          el-form-item(label="检查配合程度 :" class="formItem2")
            el-select(v-model="form.value" style="width:100%" clearable)
              el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
      .right
        el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini" class='checkForm' )
          el-form-item(label="生产经营场所变动情况 :" class="formItem2")
            el-input(v-model="form.requireCheck" clearable)
          el-form-item(label="接待人员 :" class="formItem2")
            el-input(v-model="form.checked" clearable)

    el-card(class='card')
      .cardTitle1
        span(class='blue')
        span(class='title') 征信情况
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        .blueTitle 基于企业征信报告
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="征信报告查询日期 :" style="width:96%")
              el-date-picker(v-model="form.startDate" style="width:100%" type="date" clearable)
        .blueTitle1 1.借款企业征信 :
        .cardTitle1
          span(class='blue')
          span(class='title1') 征信情况 
        .cardTitle2
          span (1)未结清贷款及对外担保情况
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="未结清贷款笔数 :" style="width:96%")
              el-input(v-model="form.loanLength" clearable)
          el-col(:span="12")
            el-form-item(label="对外担保笔数 :" style="width:96%")
              el-input(v-model="form.loanLength" clearable)
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="未结清贷款金额 :" style="width:96%")
              el-input(v-model="form.loanLength" clearable)
          el-col(:span="12")
            el-form-item(label="对外担保金额 :" style="width:96%")
              el-input(v-model="form.loanLength" clearable)
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="涉及金融机构 :" style="width:96%")
              el-input(v-model="form.loanLength" clearable)
          el-col(:span="12")
            el-form-item(label="对外担保结余 :" style="width:96%")
              el-input(v-model="form.loanLength" clearable)
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="未结清贷款结余 :" style="width:96%")
              el-input(v-model="form.loanLength" clearable)
        .cardTitle2
          span (2)逾期及欠息等不良记录
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="贷款期间借款企业是否发生逾期、欠息等不良信用记录 :" style="width:96%")
              el-select(v-model="form.value" placeholder="请选择" style="width:100%")
                el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(style="width:96%")
              el-input(v-model="form.loanLength" type="textarea" :rows="3" clearable)
        .cardTitle2
          span (3)借款企业欠税情况
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="欠税记录 :" style="width:96%")
              el-input(v-model="form.loanLength" clearable)
          el-col(:span="12")
            el-form-item(label="强制执行记录 :" style="width:96%")
              el-input(v-model="form.loanLength" clearable)
          el-col(:span="12")
            el-form-item(label="民事判决 :" style="width:96%")
              el-input(v-model="form.loanLength" clearable)
          el-col(:span="12")
            el-form-item(label="行政处罚记录 :" style="width:96%")
              el-input(v-model="form.loanLength" clearable)
        .cardTitle2
          span (4)征信记录
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="征信记录是否有异常变化 :" style="width:96%")
              el-select(v-model="form.value" placeholder="请选择" style="width:100%")
                el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(style="width:96%")
              el-input(v-model="form.loanLength" type="textarea" :rows="3" clearable)
    //- 2.关联企业征信：
    el-card(class='card')
      .left
        el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
          .blueTitle1 2.关联企业征信：
          el-row(:gutter="20")
            el-col(:span="24")
              el-form-item(label="征信记录是否有异常变化 :" style="width:96%")
                el-select(v-model="form.value" placeholder="请选择" style="width:100%")
                  el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
          el-row(:gutter="20")
            el-col(:span="24")
              el-form-item(style="width:96%")
                el-input(v-model="form.loanLength" type="textarea" :rows="2" clearable)
          .blackTitle 近期负面信息情况
          el-row(:gutter="20")
            el-col(:span="24")
              el-form-item(style="width:96%")
                el-input(v-model="form.loanLength" type="textarea" :rows="2" clearable)
      .right
        el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
          .blueTitle1 3.法人保证人征信：
          el-row(:gutter="20")
            el-col(:span="24")
              el-form-item(label="征信记录是否有异常变化 :" style="width:96%")
                el-select(v-model="form.value" placeholder="请选择" style="width:100%")
                  el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
          el-row(:gutter="20")
            el-col(:span="24")
              el-form-item(style="width:96%")
                el-input(v-model="form.loanLength" type="textarea" :rows="2" clearable)
          //- 基于个人征信报告(对于关注类及以下贷款及风险隐患客户每季度查询一次个人征信即可)
    el-card(class='card')
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        .blueTitle1 基于个人征信报告(对于关注类及以下贷款及风险隐患客户每季度查询一次个人征信即可)：
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="征信报告查询日期 :" style="width:96%")
              el-date-picker(v-model="form.startDate" style="width:100%" type="date" clearable)
        .blueTitle1 1.企业实际控制人及其配偶(若有)征信 :
        .cardTitle1
          span(class='blue')
          span(class='title1') 征信分类
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(style="width:96%")
              el-input(v-model="form.loanLength" clearable)
        .cardTitle1
          span(class='blue')
          span(class='title1') 征信情况 
        .cardTitle2
          span (1)未结清贷款、未销户贷记卡（含准贷记）及对外担保情况
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="未结清贷款笔数 :" style="width:96%")
              el-input(v-model="form.loanLength" clearable)
          el-col(:span="12")
            el-form-item(label="授信总金额 :" style="width:96%")
              el-input(v-model="form.loanLength" clearable)
          el-col(:span="12")
            el-form-item(label="未结清贷款金额 :" style="width:96%")
              el-input(v-model="form.loanLength" clearable)
          el-col(:span="12")
            el-form-item(label="对外担保笔数 :" style="width:96%")
              el-input(v-model="form.loanLength" clearable)
          el-col(:span="12")
            el-form-item(label="涉及金融机构 :" style="width:96%")
              el-input(v-model="form.loanLength" clearable)
          el-col(:span="12")
            el-form-item(label="对外担保金额 :" style="width:96%")
              el-input(v-model="form.loanLength" clearable)
          el-col(:span="12")
            el-form-item(label="未结清贷款结余 :" style="width:96%")
              el-input(v-model="form.loanLength" clearable)
          el-col(:span="12")
            el-form-item(label="对外担保结余 :" style="width:96%")
              el-input(v-model="form.loanLength" clearable)
          el-col(:span="12")
            el-form-item(label="未销户贷记卡账户 :" style="width:96%")
              el-input(v-model="form.loanLength" clearable)
        .left
            .cardTitle2 (2)逾期及违约:
            el-row(:gutter="20")
              el-col(:span="24")
                el-form-item(label="是否存在逾期及违约记录 :" style="width:96%")
                  el-select(v-model="form.value" placeholder="请选择" style="width:100%")
                    el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
            el-row(:gutter="20")
              el-col(:span="24")
                el-form-item(style="width:96%")
                  el-input(v-model="form.loanLength" type="textarea" :rows="2" clearable)
        .right
            .cardTitle2 (3)征信记录:
            el-row(:gutter="20")
              el-col(:span="24")
                el-form-item(label="征信记录是否有异常变化 :" style="width:96%")
                  el-select(v-model="form.value" placeholder="请选择" style="width:100%")
                    el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
            el-row(:gutter="20")
              el-col(:span="24")
                el-form-item(style="width:96%")
                  el-input(v-model="form.loanLength" type="textarea" :rows="3" clearable)
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
              el-input(v-model="form.loanLength" clearable)
        .cardTitle1
          span(class='blue')
          span(class='title1') 征信情况 
        .cardTitle2
          span (1)未结清贷款、未销户贷记卡（含准贷记）及对外担保情况
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="未结清贷款笔数 :" style="width:96%")
              el-input(v-model="form.loanLength" clearable)
          el-col(:span="12")
            el-form-item(label="未销户贷记卡担保金额 :" style="width:96%")
              el-input(v-model="form.loanLength" clearable)
          el-col(:span="12")
            el-form-item(label="未结清贷款金额 :" style="width:96%")
              el-input(v-model="form.loanLength" clearable)
          el-col(:span="12")
            el-form-item(label="对外担保笔数 :" style="width:96%")
              el-input(v-model="form.loanLength" clearable)
          el-col(:span="12")
            el-form-item(label="涉及金融机构 :" style="width:96%")
              el-input(v-model="form.loanLength" clearable)
          el-col(:span="12")
            el-form-item(label="对外担保金额 :" style="width:96%")
              el-input(v-model="form.loanLength" clearable)
          el-col(:span="12")
            el-form-item(label="未结清贷款结余 :" style="width:96%")
              el-input(v-model="form.loanLength" clearable)
          el-col(:span="12")
            el-form-item(label="对外担保结余 :" style="width:96%")
              el-input(v-model="form.loanLength" clearable)
          el-col(:span="12")
            el-form-item(label="未销户贷记卡账户 :" style="width:96%")
              el-input(v-model="form.loanLength" clearable)
        .left
            .cardTitle2 (2)逾期及违约:
            el-row(:gutter="20")
              el-col(:span="24")
                el-form-item(label="是否存在逾期及违约记录 :" style="width:96%")
                  el-select(v-model="form.value" placeholder="请选择" style="width:100%")
                    el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
            el-row(:gutter="20")
              el-col(:span="24")
                el-form-item(style="width:96%")
                  el-input(v-model="form.loanLength" type="textarea" :rows="3" clearable)
        .right
            .cardTitle2 (3)征信记录:
            el-row(:gutter="20")
              el-col(:span="24")
                el-form-item(label="征信记录是否有异常变化 :" style="width:96%")
                  el-select(v-model="form.value" placeholder="请选择" style="width:100%")
                    el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
            el-row(:gutter="20")
              el-col(:span="24")
                el-form-item(style="width:96%")
                  el-input(v-model="form.loanLength" type="textarea" :rows="3" clearable)    
    //- 3.法人保证人征信：
    el-card(class='card')
      .left
        el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
          .blueTitle1 3.法人保证人征信
          el-row(:gutter="20")
            el-col(:span="24")
              el-form-item(label="征信记录是否有异常变化 :" style="width:96%")
                el-select(v-model="form.value" placeholder="请选择" style="width:100%")
                  el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
          el-row(:gutter="20")
            el-col(:span="24")
              el-form-item(style="width:96%")
                el-input(v-model="form.loanLength" type="textarea" :rows="3" clearable)
          .blackTitle 近期负面信息情况
          el-row(:gutter="20")
            el-col(:span="24")
              el-form-item(style="width:96%")
                el-input(v-model="form.loanLength" type="textarea" :rows="3" clearable) 
    //- 企业财务情况
    el-card(class='card')
      .cardTitle1
        span(class='blue')
        span(class='title') 企业财务情况 
      el-form(:model="form" :inline="true" label-position="top" label-width="80px" size="mini")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="" style="width:96%")
              el-select(v-model="form.value" placeholder="请选择" style="width:100%")
                el-option(v-for="item in financeList" :key="item.value" :label="item.label" :value="item.value")
      .cardContent
        tab-form1(:detail="params1" v-if="form.value===1")
        tab-form2(:detail="params2" v-if="form.value===2")
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
              el-input(v-model="form.loanLength" type="textarea" :rows="3" clearable)
          el-col(:span="12")
            el-form-item(label="生产经营是否存在安全隐患 :" style="width:96%")
              el-input(v-model="form.loanLength" type="textarea" :rows="3" clearable)
          el-col(:span="12")
            el-form-item(label="企业是否有与主业无关的扩张计划 :" style="width:96%")
              el-input(v-model="form.loanLength" type="textarea" :rows="3" clearable)
          el-col(:span="12")
            el-form-item(label="其他 :" style="width:96%")
              el-input(v-model="form.loanLength" type="textarea" :rows="3" clearable)
        .blueTitle1 担保情况
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="上次抵质押物评估或重估日期 :" style="width:96%")
              el-date-picker(v-model="form.startDate" style="width:100%" type="date" clearable)
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="上次抵质押物评估或重估金额 :" style="width:96%")
              el-input(v-model="form.loanLength" clearable)
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(label="" style="width:96%")
              el-input(v-model="form.loanLength" type="textarea" :rows="3" clearable placeholder='根据现场检查及非现场查询情况，从抵(质)押物市场价值和变现能力方面分析，判|断抵(质)押物是否出现约定的需增加、置换等变动情形。')
    //- 影像维护
    el-card(class='card')
      .cardTitle
        span(class='blue')
        span(class='title') 影像维护
      .uploadBox(v-for='(item,index) in list3' :key='item.index')
        .imgTitle {{item.title}}
        el-upload(action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove")
          i(class="el-icon-plus") 
  </div>
</template>

<script>
import { filterParams } from "../../../utils/utils";
import TabForm1 from "./TabForm1";
import TabForm2 from "./TabForm2";
export default {
  // 组件名称
  name: "DivM2",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {
    "tab-form1": TabForm1,
    "tab-form2": TabForm2
  },
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
      financeList: [
        {
          label: "加工制造类企业适用",
          value: 1
        },
        {
          label: "贸易类/其他类企业适用",
          value: 2
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
        practicableMsg: "xxxx", // 还款资金落实情况说明

        value: 1
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
