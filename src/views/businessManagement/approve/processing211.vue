<!--
 * @Descripttion: 流程处理2-11
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
          <el-form-item label="二级分行/一级分行抽查意见" class="formItem2">
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
          <el-form-item label="意见说明" class="formItem2">
            <el-input v-model="params.msg" type="textarea" :rows="3" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="抽查意见及行动建议" class="formItem2">
            <el-input v-model="params.suggest" type="textarea" :rows="3" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "processing211",
  components: {},
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
      params: {
        agreeResult: 1, // 一级支行/二级分行复核意见
        msg: "", // 一级支行/二级分行复核意见说明
        suggest: "" // 措施建议
      }
    };
  },
  mounted() {},

  methods: {},
  watch: {
    approveDetail: function(newVal) {
      this.params.agreeResult = newVal.agreeResult;
      this.params.msg = newVal.msg;
      this.params.suggest = newVal.suggest;
      console.log(newVal, this.params);
      if (!newVal.agreeResult) {
        this.params.agreeResult = 1;
      }
    }
  }
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
