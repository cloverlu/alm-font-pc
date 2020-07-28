<!--
 * @Descripttion: 
 * @Author: penglu
 * @Date: 2020-07-21 13:05:10
-->
<template lang="pug">
	.upload
		.item(v-for="(item,i) in titleList" :key="item.id")
			.title {{item.text}}
			.upload-wrapper
				uploadTest(:item="item" :itemVmodel="params" :read="false" :ref="`definte16${i}`")
		.aa(@click="submit") 点我啦，展示imageList =>  {{loanBusiness}}
		

</template>

<script>
import uploadTest from "../uploadTest/upload";
export default {
  components: { uploadTest },
  data() {
    const definte17 = _ => {
      const definite17Array = [];
      const valueArray = [
        "财务报表",
        "纳税材料",
        "水电费材料",
        "银行流水",
        "主要上下游客户合同单据",
        "其他财务经营材料",
        "企业办公场所（含企业大门）",
        "企业生产车间（含重要生产或经营工序）",
        "企业重要生产或经营设备、存货",
        "检查人员现场检查的影像",
        "抵押物影像",
        "其他"
      ];
      for (let i = 0; i < valueArray.length; i++) {
        const a = "m3_" + i;
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
      loanBusiness: {}
    };
  },
  mounted() {
    this.params = this.mVmodel(11);
  },
  methods: {
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
    submit() {
      var arrs = {};
      for (let i = 0; i < this.titleList.length; i++) {
        const a = `pic_${i + 1}s`;
        arrs[a] = this.$refs[`definte16${i}`][0].fileList[a];
      }
      this.loanBusiness = Object.assign({}, this.type, arrs);
    }
  }
};
</script>

<style lang="stylus" scoped></style>
