<!--
 * @Descripttion: 流程处理2-5
 * @Author: sunhua
 * @Date: 2020-06-16 11:03:37
-->

<template>
  <div class="approveDeatil">
    <el-form
      :model="params"
      :inline="true"
      label-position="left"
      label-width="280px"
      class="checkForm"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item label="一级支行/二级分行复核意见:" class="formItem2">
            <el-select v-model="params.agreeResult" style="width:100%" clearable>
              <el-option
                v-for="item in agreeOrNot"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="意见说明:" class="formItem2">
            <el-input v-model="params.msg" type="textarea" :rows="3" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="是否存在风险预警信号:" class="formItem2">
            <el-select v-model="params.existRisk" style="width: 100%">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="发生阶段:" class="formItem2">
            <el-select v-model="params.riskStage" style="width: 100%">
              <el-option
                v-for="item in stageArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="预警信号说明:" class="formItem2">
            <el-input v-model="params.riskMsg" type="textarea" :rows="3" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="复核意见及行动建议:" class="formItem2">
            <el-input v-model="params.suggest" type="textarea" :rows="3" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "processing25",
  components: {},
  props: ["approveDetail"],
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
      agreeOrNot: [
        {
          key: 1,
          value: "同意"
        },
        {
          key: 0,
          value: "不同意"
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
      stageArr: [
        {
          label: "第一阶段",
          value: "一"
        },
        {
          label: "第二阶段",
          value: "二"
        },
        {
          label: "第三阶段",
          value: "三"
        }
      ],
      params: {
        existRisk: 1, // 存在风险
        agreeResult: 1, // 一级支行/二级分行复核意见
        msg: "", // 一级支行/二级分行复核意见说明
        riskStage: "一",
        riskMsg: "", // 风险说明
        suggest: "" // 措施建议
      }
    };
  },
  mounted() {},
  watch: {
    approveDetail: function(newVal) {
      this.params.existRisk = newVal.existRisk;
      this.params.agreeResult = newVal.agreeResult;
      this.params.msg = newVal.msg;
      this.params.riskStage = newVal.riskStage;
      this.params.riskMsg = newVal.riskMsg;
      this.params.suggest = newVal.suggest;
      if (!newVal.existRisk) {
        this.params.existRisk = 1;
      }
      if (!newVal.agreeResult) {
        this.params.agreeResult = 1;
      }
      if (!newVal.riskStage) {
        this.params.riskStage = "一";
      }
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.approveDeatil {
  .formItem2 {
    box-sizing: border-box;
    width: 100%;
    // margin: 10px 0;
    // padding-right: 20px;
    /deep/.el-form-item__label {
      // padding: 10px 0 0;
      font-size: 16px;
      color: rgba(96, 98, 102, 1);
    }
    /deep/.el-form-item__content {
      width: 100%;
      max-width: 522px;
      min-width: 300px;
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
}
</style>
