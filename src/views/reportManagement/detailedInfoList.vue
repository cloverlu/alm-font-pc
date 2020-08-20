<!--
  功能：明细信息
  作者：sunhua
  邮箱：947545659@qq.com
  时间：2020年07月02日 08:54:09
-->
<template>
  <div class="detailedInfoList">
    <div class="userContent">
      <div class="userForm">
        <el-form
          :model="searchForm"
          :inline="true"
          label-position="right"
          size="mini"
          class="demo-form-inline formBox"
        >
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item :label="label1" class="formItem4">
                <el-date-picker
                  v-model="searchForm.beginDate"
                  style="width:100%"
                  type="date"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  placeholder="选择日期"
                  clearable
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="label2" class="formItem4">
                <el-date-picker
                  v-model="searchForm.endDate"
                  style="width:100%"
                  type="date"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  placeholder="选择日期"
                  clearable
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="机构名称" class="formItem4">
                <el-input v-model="searchForm.queryOrgName" @focus="selectOrgName" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否查询下级机构" class="formItem6">
                <el-select v-model="searchForm.flag" clearable style="width:100%">
                  <el-option label="是" value="false"></el-option>
                  <el-option label="否" value="true"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="管户名称" class="formItem4">
                <el-input v-model="searchForm.emplName" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="检查类型" class="formItem4">
                <el-select v-model="searchForm.bizType" clearable style="width:100%">
                  <el-option label="小企业授信业务首次跟踪检查" value="m1"></el-option>
                  <el-option label="小企业授信业务贷后例行检查" value="m2"></el-option>
                  <el-option label="小企业授信业务贷后全面检查" value="m3"></el-option>
                  <el-option label="小企业授信业务还款资金落实情况检查" value="m4"></el-option>
                  <!-- <el-option label="小企业法人快捷贷首次检查" value="m5"></el-option>
                  <el-option label="小企业法人快捷贷贷后日常检查" value="m6"></el-option>-->
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="完成状态" class="formItem4" v-show="visible">
                <el-select v-model="searchForm.bizStatus" clearable style="width:100%">
                  <el-option label="应做" value="shouldDo"></el-option>
                  <el-option label="未做" value="notDo"></el-option>
                  <el-option label="审核中" value="inReview"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="btn">
                <el-button type="primary" size="mini" @click="onSubmit">查询</el-button>
                <el-button size="mini" @click="onClear">重置</el-button>
                <el-button type="primary" size="mini" @click="output">导出</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="userTable">
        <div class="tableBox">
          <el-table stripe :data="tableData" border style="width: 99.9%" :fit="true">
            <!-- <el-table-column header-align="center" type="selection" width="55px"></el-table-column> -->
            <el-table-column header-align="center" prop="orgName" label="机构名称" min-width="19%"></el-table-column>
            <el-table-column
              header-align="center"
              prop="bizType"
              :formatter="returnType"
              label="检查类型"
              min-width="8%"
            ></el-table-column>
            <el-table-column
              header-align="center"
              prop="bizStatus"
              :formatter="returnStatus"
              label="完成状态"
              min-width="8%"
            ></el-table-column>
            <el-table-column header-align="center" prop="emplName" label="管户客户经理" min-width="9%"></el-table-column>
            <el-table-column header-align="center" prop="custName" label="客户名称" min-width="8%"></el-table-column>
            <el-table-column header-align="center" prop="billNo" label="借据编号" min-width="9%"></el-table-column>
            <el-table-column header-align="center" prop="billAmout" label="借据金额" min-width="8%"></el-table-column>
            <el-table-column header-align="center" prop="billBeginDate" label="借据起期" min-width="8%"></el-table-column>
            <el-table-column header-align="center" prop="billEndDate" label="借据止期" min-width="8%"></el-table-column>
            <el-table-column header-align="center" prop="billBlance" label="借据余额" min-width="8%"></el-table-column>
            <el-table-column
              v-if="visible"
              header-align="center"
              prop="createTime"
              label="创建时间"
              min-width="8%"
            ></el-table-column>
            <el-table-column
              v-if="!visible"
              header-align="center"
              prop="dealDate"
              label="完成时间"
              min-width="8%"
            ></el-table-column>
            <el-table-column header-align="center" prop="bizEndDate" label="应完成时间" min-width="8%"></el-table-column>
          </el-table>
        </div>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNo"
            :page-sizes="[10, 20, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <el-dialog
      class="tanchuang"
      title="用户机构选择"
      :visible="dialogORGVisible"
      width="698px"
      :append-to-body="true"
      v-alterELDialogMarginTop="{marginTop:'30vh'}"
      :before-close="closeDialog"
    >
      <el-tree
        :data="OrgTree"
        show-checkbox
        :check-strictly="true"
        ref="tree"
        node-key="label"
        :default-checked-keys="editArr"
        @check="setSelectedNode"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editOkORG">确 认</el-button>
        <el-button @click="editCancelORG">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import _ from "lodash";
import { filterParams } from "../../utils/utils";
import { getReportFormList } from "../../api/report";
import { getOrgTree } from "../../api/customer";
export default {
  name: "detailedInfoList",
  data() {
    return {
      host: window.config.host.authorization,
      tableData: [],
      pageNo: 1,
      pageSize: 10,
      total: 10,
      currentItem: 1,
      label1: "开始日期",
      label2: "结束日期",
      OrgTree: [],
      dialogORGVisible: false,
      editArr: [],
      treeValue: "",
      searchForm: {
        beginDate: "",
        endDate: "",
        queryOrgName: "",
        flag: "",
        emplName: "",
        bizType: "",
        bizStatus: "",
        workProgress: "onTime"
      },
      visible: false,
      paramsDetail: {
        pageNo: 1,
        pageSize: 10
      },
      multipleSelection: [],
      flag: true,
      formLabelWidth: "72px"
    };
  },
  mounted() {
    // 进入页面先调用查询接口
    this.$moment.locale("zh-cn");
    const { workProgress } = this.$route.params;
    if (workProgress == "inComplete") {
      this.visible = true;
      this.label1 = "业务创建日期";
      this.label2 = "业务结束日期";
    } else {
      this.visible = false;
      this.label1 = "开始日期";
      this.label2 = "结束日期";
    }
    this.searchForm.workProgress = workProgress;
    const {
      queryOrgName,
      bizType,
      queryBeginTime,
      queryEndTime,
      flag
    } = this.$route.query;
    if (queryOrgName && bizType) {
      this.searchForm.queryOrgName = queryOrgName;
      this.searchForm.bizType = bizType;
    }
    if (flag) {
      this.searchForm.flag = flag;
    }
    if (queryBeginTime) {
      this.searchForm.beginDate = queryBeginTime;
    }
    if (queryEndTime) {
      this.searchForm.endDate = queryEndTime;
    }
    this.onSubmit();

    this.getOrgList();
  },
  methods: {
    selectOrgName() {
      this.dialogORGVisible = true;
    },
    editOkORG() {
      this.dialogORGVisible = false;
      this.searchForm.queryOrgName = this.treeValue;
    },
    editCancelORG() {
      this.dialogORGVisible = false;
      this.searchForm.queryOrgName = "";
      this.treeValue = "";
      this.$refs.tree.setCheckedNodes([]);
      this.editArr = [];
    },
    closeDialog(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
          this.editCancelORG();
        })
        .catch(_ => {});
    },
    setSelectedNode(data) {
      this.$refs.tree.setCheckedNodes([data]);
      const node = this.$refs.tree.getCheckedNodes();
      console.log(node[0].label);
      this.treeValue = data.label;
      this.editArr = [node[0].label];
    },
    // 获取机构
    getOrgList() {
      getOrgTree(this, {
        postCode: sessionStorage.getItem("postCode"),
        orgName: sessionStorage.getItem("orgName")
      }).then(res => {
        if (res.data.returnCode == "200000") {
          this.OrgTree = res.data.data;
        }
      });
    },
    // 修改分页大小
    handleSizeChange: function(e) {
      this.pageSize = e;
      this.pageNo = 1;
      this.paramsDetail = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      this.onSubmit();
      this.paramsDetail = {
        pageNo: 1,
        pageSize: 10
      };
    },
    // 翻页
    handleCurrentChange: function(e) {
      this.pageNo = e;
      this.paramsDetail = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      this.onSubmit();
      this.paramsDetail = {
        pageNo: 1,
        pageSize: 10
      };
    },
    // 表单查询
    onSubmit() {
      getReportFormList(this, {
        ...filterParams(this.searchForm),
        orgName: sessionStorage.getItem("orgName"),
        pageSize: 10,
        pageNo: 1,
        ...this.paramsDetail
      }).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    // 重置
    onClear() {
      const { workProgress } = this.$route.params;
      this.$refs.tree.setCheckedNodes([]);
      this.editArr = [];
      this.treeValue = "";
      this.searchForm = {
        beginDate: "",
        endDate: "",
        queryOrgName: "",
        flag: "",
        emplName: "",
        bizType: "",
        bizStatus: "",
        workProgress
      };
      this.pageNo = 1;
      this.pageSize = 10;
    },
    // 下载
    output() {
      const queryFormValues = {
        ...this.searchForm,
        orgName: sessionStorage.getItem("orgName"),
        pageNo: 1,
        pageSize: this.total
      };
      // 调用接口
      let queryStr = "";
      Object.keys(queryFormValues).forEach(key => {
        if (Boolean(queryFormValues[key]) !== false) {
          queryStr += `&${key}=${queryFormValues[key]}`;
        }
      });
      const url = `${this.host}/postLoan/business/exportReportFormList?${queryStr}`;
      window.open(url, "_blank");
      window.URL.revokeObjectURL(url);
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
    returnStatus(row) {
      switch (row.bizStatus) {
        case "shouldDo":
          return "应做";
        case "notDo":
          return "未做";
        case "inReview":
          return "审核中";
        case "alreadyDo":
          return "完成";
      }
    }
    // handleSelectionChange(val) {
    //   this.multipleSelection = val;
    //   if (val && val.length > 0) {
    //     this.flag = false;
    //   } else {
    //     this.flag = true;
    //   }
    // }
  },
  watch: {
    $route(to, from) {
      if (to.params.workProgress != from.params.workProgress) {
        const workProgress = to.params.workProgress;
        if (workProgress == "inComplete") {
          this.visible = true;
          this.label1 = "业务创建日期";
          this.label2 = "业务结束日期";
        } else {
          this.visible = false;
          this.label1 = "开始日期";
          this.label2 = "结束日期";
        }
        this.$refs.tree.setCheckedNodes([]);
        this.editArr = [];
        this.treeValue = "";
        this.searchForm = {
          beginDate: "",
          endDate: "",
          queryOrgName: "",
          flag: "",
          emplName: "",
          bizType: "",
          bizStatus: "",
          workProgress
        };
        this.pageNo = 1;
        this.pageSize = 10;
        this.onSubmit();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/global.scss";
.detailedInfoList {
  box-sizing: border-box;
  width: 100%;
  min-height: 100%;
  position: relative;
  .userContent {
    height: 100%;
    width: 100%;
    .userForm {
      box-sizing: border-box;
      height: 150px;
      width: 100%;
      .formBox {
        box-sizing: border-box;
        position: relative;
        height: 100%;
        line-height: 50px;
        width: 100%;
        font-size: 12px;
        padding-left: 14px;
        padding-right: 14px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
        opacity: 1;
        .formItem4 {
          display: inline-block;
          width: 100%;
          margin: 0;
          /deep/.el-form-item__label {
            font-size: 12px;
          }
          /deep/.el-form-item__content {
            padding-top: 13px;
            -webkit-padding-top: 13px;
            -ms-padding-top: 13px;
            width: calc(100% - 100px);
          }
        }
        .formItem6 {
          display: inline-block;
          width: 100%;
          margin: 0;
          padding-right: 10px;
          /deep/.el-form-item__label {
            font-size: 12px;
          }
          /deep/.el-form-item__content {
            padding-top: 13px;
            -webkit-padding-top: 13px;
            -ms-padding-top: 13px;
            width: calc(100% - 130px);
          }
        }
        .btn {
          display: inline-block;
          box-sizing: border-box;
          width: 100%;
          text-align: right;
          height: 47px;
          line-height: 47px;
          // padding-left: 20px;
          /deep/.el-button {
            width: 66px;
            height: 28px;
            margin-top: 13px;
            min-width: 30px;
            margin-left: 0;
            margin-right: 20px;
            text-align: center;
            &:last-of-type {
              margin-right: 0;
            }
            .el-button--primary {
              background: rgba(78, 120, 222, 1);
              /deep/span {
                font-size: 14px;
                font-family: Segoe UI;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                opacity: 1;
                text-align: center;
                padding: 0;
              }
            }
          }
        }
      }
    }
    .userTable {
      box-sizing: border-box;
      min-height: calc(100% - 150px);
      width: 100%;
      padding: 10px 14px;
      .tableBox {
        width: 100%;
        /deep/.el-table {
          border: 1px solid rgba(204, 204, 204, 1);
          /deep/.el-table__header {
            .is-leaf {
              background-color: rgba(239, 242, 247, 1);
              border-right: 1px solid rgba(204, 204, 204, 1);
              border-bottom: 1px solid rgba(204, 204, 204, 1);
              .cell {
                font-size: 14px;
                font-family: Source Han Sans CN;
                font-weight: bold;
                line-height: 20px;
                color: rgba(10, 10, 10, 1);
                opacity: 1;
              }
            }
          }
          /deep/.el-table__body {
            height: 50px;
            .cell {
              font-size: 16px;
              font-family: Source Han Sans CN;
              font-weight: 500;
              line-height: 27px;
              color: rgba(96, 98, 102, 1);
              opacity: 1;
            }
          }
        }
      }
      .block {
        text-align: right;
        margin-top: 15px;
      }
    }
  }
}
</style>

<style lang="scss">
.detailedInfoList {
  .el-table__row td .cell {
    text-align: center !important;
  }
}
</style>
