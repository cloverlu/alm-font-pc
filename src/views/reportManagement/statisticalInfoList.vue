<!--
  功能：统计信息
  作者：sunhua
  邮箱：947545659@qq.com
  时间：2020年07月02日 08:54:09
-->
<template>
  <div class="statisticalInfoList">
    <div class="userContent">
      <div class="userForm">
        <el-form
          :model="searchForm"
          :inline="true"
          label-position="left"
          label-width="100px"
          size="mini"
          class="demo-form-inline formBox"
        >
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="机构名称" class="formItem5">
                <el-input v-model="searchForm.queryOrgName" @focus="selectOrgName" clearable></el-input>
                <!-- <el-cascader
                  v-model="searchForm.queryOrgName"
                  placeholder="输入机构"
                  :options="OrgTree"
                  :props="{ checkStrictly: true }"
                  :show-all-levels="false"
                  filterable
                  clearable
                  style="width:100%"
                ></el-cascader>-->
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否查询下级机构" label-width="120px" class="formItem6">
                <el-select v-model="searchForm.flag" clearable style="width:100%">
                  <el-option label="是" value="false"></el-option>
                  <el-option label="否" value="true"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="开始日期" class="formItem5">
                <el-date-picker
                  v-model="searchForm.queryBeginTime"
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
              <el-form-item label="结束日期" class="formItem5">
                <el-date-picker
                  v-model="searchForm.queryEndTime"
                  style="width:100%"
                  type="date"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  placeholder="选择日期"
                  clearable
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="btn">
                <el-button type="primary" size="mini" @click="onSubmit">查询</el-button>
                <el-button size="mini" @click="onClear">重置</el-button>
                <el-button type="primary" size="mini" @click="onOutPut">导出</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="userTable">
        <div class="tableBox">
          <el-table stripe :data="tableData" border style="width: 99.9%" :fit="true">
            <el-table-column header-align="center" prop="orgName" label="机构名称" min-width="15%"></el-table-column>

            <!-- <el-table-column
              header-align="center"
              v-for="(item,index) in detailedInfoListTable"
              :key="index"
              :label="item.label"
            >
              <el-table-column
                header-align="center"
                v-for="(child,number) in item.children"
                :key="number"
                :label="child.label"
                min-width="8%"
                :prop="child.prop"
                :formatter="link"
              >
                <template slot-scope="scope">
                  <div
                    slot="reference"
                    class="name-wrapper"
                    @click="link(scope.row,child.bizType,child.workProgress)"
                  >
                    <a
                      href="javascript:void(0)"
                      style="textDecoration:underline"
                    >{{ scope.row.completeNumOfM1 }}</a>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>-->
            <el-table-column header-align="center" label="首次跟踪检查">
              <el-table-column header-align="center" label="按时完成" min-width="8%">
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper" @click="link(scope.row,'m1','onTime')">
                    <a href="javascript:void(0)">{{ scope.row.completeNumOfM1 }}</a>
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" label="超时完成" min-width="8%">
                <template slot-scope="scope">
                  <div
                    slot="reference"
                    class="name-wrapper"
                    @click="link(scope.row,'m1','overTime')"
                  >
                    <a href="javascript:void(0)">{{ scope.row.overTimeCompleteNumOfM1 }}</a>
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" label="未完成" min-width="8%">
                <template slot-scope="scope">
                  <div
                    slot="reference"
                    class="name-wrapper"
                    @click="link(scope.row,'m1','inComplete')"
                  >
                    <a href="javascript:void(0)">{{ scope.row.notCompleteNumOfM1 }}</a>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>

            <el-table-column header-align="center" label="贷后例行检查">
              <el-table-column header-align="center" label="按时完成" min-width="8%">
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper" @click="link(scope.row,'m2','onTime')">
                    <a href="javascript:void(0)">{{ scope.row.completeNumOfM2 }}</a>
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" label="超时完成" min-width="8%">
                <template slot-scope="scope">
                  <div
                    slot="reference"
                    class="name-wrapper"
                    @click="link(scope.row,'m2','overTime')"
                  >
                    <a href="javascript:void(0)">{{ scope.row.overTimeCompleteNumOfM2 }}</a>
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" label="未完成" min-width="8%">
                <template slot-scope="scope">
                  <div
                    slot="reference"
                    class="name-wrapper"
                    @click="link(scope.row,'m2','inComplete')"
                  >
                    <a href="javascript:void(0)">{{ scope.row.notCompleteNumOfM2 }}</a>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>

            <el-table-column header-align="center" label="贷后全面检查">
              <el-table-column header-align="center" label="按时完成" min-width="8%">
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper" @click="link(scope.row,'m3','onTime')">
                    <a href="javascript:void(0)">{{ scope.row.completeNumOfM3 }}</a>
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" label="超时完成" min-width="8%">
                <template slot-scope="scope">
                  <div
                    slot="reference"
                    class="name-wrapper"
                    @click="link(scope.row,'m3','overTime')"
                  >
                    <a href="javascript:void(0)">{{ scope.row.overTimeCompleteNumOfM3 }}</a>
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" label="未完成" min-width="8%">
                <template slot-scope="scope">
                  <div
                    slot="reference"
                    class="name-wrapper"
                    @click="link(scope.row,'m3','inComplete')"
                  >
                    <a href="javascript:void(0)">{{ scope.row.notCompleteNumOfM3 }}</a>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>

            <el-table-column header-align="center" label="还款资金落实检查">
              <el-table-column header-align="center" label="按时完成" min-width="8%">
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper" @click="link(scope.row,'m4','onTime')">
                    <a href="javascript:void(0)">{{ scope.row.completeNumOfM4 }}</a>
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" label="超时完成" min-width="8%">
                <template slot-scope="scope">
                  <div
                    slot="reference"
                    class="name-wrapper"
                    @click="link(scope.row,'m4','overTime')"
                  >
                    <a href="javascript:void(0)">{{ scope.row.overTimeCompleteNumOfM4 }}</a>
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" label="未完成" min-width="8%">
                <template slot-scope="scope">
                  <div
                    slot="reference"
                    class="name-wrapper"
                    @click="link(scope.row,'m4','inComplete')"
                  >
                    <a href="javascript:void(0)">{{ scope.row.notCompleteNumOfM4 }}</a>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>

            <!-- <el-table-column header-align="center" label="快捷贷首次检查">
              <el-table-column header-align="center" label="按时完成" min-width="8%">
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper" @click="link(scope.row,'m5','onTime')">
                    <a href="javascript:void(0)">{{ scope.row.completeNumOfM5 }}</a>
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" label="超时完成" min-width="8%">
                <template slot-scope="scope">
                  <div
                    slot="reference"
                    class="name-wrapper"
                    @click="link(scope.row,'m5','overTime')"
                  >
                    <a href="javascript:void(0)">{{ scope.row.overTimeCompleteNumOfM5 }}</a>
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" label="未完成" min-width="8%">
                <template slot-scope="scope">
                  <div
                    slot="reference"
                    class="name-wrapper"
                    @click="link(scope.row,'m5','inComplete')"
                  >
                    <a href="javascript:void(0)">{{ scope.row.notCompleteNumOfM5 }}</a>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>-->

            <!-- <el-table-column header-align="center" label="快捷贷贷后日常检查">
              <el-table-column header-align="center" label="按时完成" min-width="8%">
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper" @click="link(scope.row,'m6','onTime')">
                    <a href="javascript:void(0)">{{ scope.row.completeNumOfM6 }}</a>
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" label="超时完成" min-width="8%">
                <template slot-scope="scope">
                  <div
                    slot="reference"
                    class="name-wrapper"
                    @click="link(scope.row,'m6','overTime')"
                  >
                    <a href="javascript:void(0)">{{ scope.row.overTimeCompleteNumOfM6 }}</a>
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" label="未完成" min-width="8%">
                <template slot-scope="scope">
                  <div
                    slot="reference"
                    class="name-wrapper"
                    @click="link(scope.row,'m6','inComplete')"
                  >
                    <a href="javascript:void(0)">{{ scope.row.notCompleteNumOfM6 }}</a>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>-->
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
      :visible="dialogFormVisible"
      width="698px"
      :append-to-body="true"
      v-alterELDialogMarginTop="{marginTop:'30vh'}"
      :before-close="closeDialog"
      center
    >
      <span>
        当前机构为
        <span style="color:red;margin:10px">{{currentPostName}}</span>
      </span>
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
        <el-button type="primary" @click="editOk">确 认</el-button>
        <el-button @click="editCancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { filterParams } from "../../utils/utils";
import { bizTypesTable } from "../../utils/dataMock";
import { getReportFormStatistics } from "../../api/report";
import { getOrgTree } from "../../api/customer";
export default {
  name: "statisticalInfoList",
  data() {
    const bizTypesTable1 = bizTypesTable;
    return {
      host: window.config.host.authorization,
      detailedInfoListTable: bizTypesTable1,
      tableData: [],
      currentPostName: sessionStorage.getItem("orgName"),
      pageNo: 1,
      pageSize: 10,
      total: 10,
      currentItem: 1,
      dialogFormVisible: false,
      OrgTree: [],
      editArr: [],
      treeValue: "",
      searchForm: {
        queryOrgName: "",
        flag: "",
        queryBeginTime: "",
        queryEndTime: ""
      },
      paramsDetail: {
        pageNo: 1,
        pageSize: 10
      },
      formLabelWidth: "72px"
    };
  },
  mounted() {
    // 进入页面先调用查询接口
    this.onSubmit();

    this.getOrgList();
  },
  methods: {
    selectOrgName() {
      this.dialogFormVisible = true;
    },
    editOk() {
      this.dialogFormVisible = false;
      this.searchForm.queryOrgName = this.treeValue;
    },
    editCancel() {
      this.dialogFormVisible = false;
      this.searchForm.queryOrgName = "";
      this.treeValue = "";
      this.$refs.tree.setCheckedNodes([]);
      this.editArr = [];
    },

    closeDialog(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
          this.editCancel();
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
    onSubmit: function() {
      getReportFormStatistics(this, {
        ...filterParams(this.searchForm),
        orgName: sessionStorage.getItem("orgName"),
        postCode: sessionStorage.getItem("postCode"),
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        ...this.paramsDetail
      }).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    onClear() {
      this.$refs.tree.setCheckedNodes([]);
      this.editArr = [];
      this.treeValue = "";
      this.searchForm = {
        queryOrgName: "",
        flag: "",
        queryBeginTime: "",
        queryEndTime: ""
      };
      this.pageSize = 10;
      this.pageNo = 1;
    },
    onOutPut() {
      const queryFormValues = {
        ...this.searchForm,
        orgName: sessionStorage.getItem("orgName"),
        postCode: sessionStorage.getItem("postCode"),
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
      const url = `${this.host}/postLoan/business/exportReportFormStatistics?${queryStr}`;
      window.open(url, "_blank");
      window.URL.revokeObjectURL(url);
    },
    returnBoolean(type) {
      switch (type) {
        case "1":
          return "是";
        case "0":
          return "否";
      }
    },
    link(row, type, workProgress) {
      console.log(row, type, workProgress);
      this.$router.push({
        path: `/reportManagement/detailedInfoList/${workProgress}`,
        query: {
          ...filterParams(this.searchForm),
          queryOrgName: row.orgName,
          bizType: type,
          workProgress
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/global.scss";
.statisticalInfoList {
  box-sizing: border-box;
  width: 100%;
  min-height: 100%;
  position: relative;
  .userContent {
    height: 100%;
    width: 100%;
    .userForm {
      box-sizing: border-box;
      height: 53px;
      width: 100%;
      .formBox {
        box-sizing: border-box;
        height: 100%;
        line-height: 53px;
        width: 100%;
        font-size: 12px;
        padding-left: 14px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
        opacity: 1;
        .btn {
          display: inline-block;
          box-sizing: border-box;
          width: 100%;
          text-align: right;
          height: 47px;
          line-height: 47px;
          /deep/.el-button {
            // width: 66px;
            height: 28px;
            margin-top: 13px;
            // min-width: 30px;
            margin-left: 0;
            margin-right: 15px;
            text-align: center;
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
        .formItem5 {
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
      }
    }
    .userTable {
      box-sizing: border-box;
      min-height: calc(100% - 53px);
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
.statisticalInfoList {
  .el-table__row td .cell {
    text-align: center !important;
  }
}
.el-scrollbar {
  /deep/.el-select-dropdown__wrap {
    /deep/.el-select-dropdown__list {
      /deep/.el-select-dropdown__item {
        line-height: 34px;
        height: 34px;
        padding-left: 5px;
        padding-right: 5px;
      }
    }
  }
}
.statisticalInfoList {
  .tableBox {
    .el-table__row {
      height: 100%;
      width: 100%;
      td {
        height: 100%;
        width: 100%;
        padding: 0;
        .cell {
          height: 100%;
          width: 100%;
          padding-top: 12px;
          padding-bottom: 12px;
        }
      }
    }
  }
}
</style>
