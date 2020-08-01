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
          label-width="60px"
          size="mini"
          class="demo-form-inline formBox"
        >
          <el-form-item label="机构名称" class="formItem5">
            <el-input v-model="searchForm.orgName" clearable></el-input>
          </el-form-item>

          <el-button type="primary" size="mini" @click="onSubmit">查询</el-button>
          <el-button size="mini" @click="onClear">重置</el-button>
        </el-form>
      </div>
      <div class="userTable">
        <div class="tableBox">
          <el-table stripe :data="tableData" border style="width: 99.9%" :fit="true">
            <el-table-column header-align="center" prop="orgName" label="机构名称" min-width="15%"></el-table-column>
            <el-table-column header-align="center" label="首次跟踪检查">
              <el-table-column header-align="center" label="按时完成" min-width="8%">
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper" @click="link(scope.row)">
                    <span>{{ scope.row.completeNumOfM1 }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" label="超时完成" min-width="8%">
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper" @click="link(scope.row)">
                    <span>{{ scope.row.overTimeCompleteNumOfM1 }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" label="未完成" min-width="8%">
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper" @click="link(scope.row)">
                    <span>{{ scope.row.notCompleteNumOfM1 }}</span>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>

            <el-table-column header-align="center" label="贷后例行检查">
              <el-table-column header-align="center" label="按时完成" min-width="8%">
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper" @click="link(scope.row)">
                    <span>{{ scope.row.completeNumOfM2 }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" label="超时完成" min-width="8%">
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper" @click="link(scope.row)">
                    <span>{{ scope.row.overTimeCompleteNumOfM2 }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" label="未完成" min-width="8%">
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper" @click="link(scope.row)">
                    <span>{{ scope.row.notCompleteNumOfM2 }}</span>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>

            <el-table-column header-align="center" label="贷后全面检查">
              <el-table-column header-align="center" label="按时完成" min-width="8%">
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper" @click="link(scope.row)">
                    <span>{{ scope.row.completeNumOfM3 }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" label="超时完成" min-width="8%">
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper" @click="link(scope.row)">
                    <span>{{ scope.row.overTimeCompleteNumOfM3 }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" label="未完成" min-width="8%">
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper" @click="link(scope.row)">
                    <span>{{ scope.row.notCompleteNumOfM3 }}</span>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>

            <el-table-column header-align="center" label="还款资金落实检查">
              <el-table-column header-align="center" label="按时完成" min-width="8%">
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper" @click="link(scope.row)">
                    <span>{{ scope.row.completeNumOfM4 }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" label="超时完成" min-width="8%">
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper" @click="link(scope.row)">
                    <span>{{ scope.row.overTimeCompleteNumOfM4 }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" label="未完成" min-width="8%">
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper" @click="link(scope.row)">
                    <span>{{ scope.row.notCompleteNumOfM4 }}</span>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>

            <el-table-column header-align="center" label="快捷贷首次检查">
              <el-table-column header-align="center" label="按时完成" min-width="8%">
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper" @click="link(scope.row)">
                    <span>{{ scope.row.completeNumOfM5 }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" label="超时完成" min-width="8%">
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper" @click="link(scope.row)">
                    <span>{{ scope.row.overTimeCompleteNumOfM5 }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" label="未完成" min-width="8%">
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper" @click="link(scope.row)">
                    <span>{{ scope.row.notCompleteNumOfM5 }}</span>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>

            <el-table-column header-align="center" label="快捷贷贷后日常检查">
              <el-table-column header-align="center" label="按时完成" min-width="8%">
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper" @click="link(scope.row)">
                    <span>{{ scope.row.completeNumOfM6 }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" label="超时完成" min-width="8%">
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper" @click="link(scope.row)">
                    <span>{{ scope.row.overTimeCompleteNumOfM6 }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" label="未完成" min-width="8%">
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper" @click="link(scope.row)">
                    <span>{{ scope.row.notCompleteNumOfM6 }}</span>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>
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
  </div>
</template>

<script>
import { filterParams } from "../../utils/utils";
import { getReportFormStatistics } from "../../api/report";
export default {
  name: "statisticalInfoList",
  data() {
    return {
      tableData: [],
      pageNo: 1,
      pageSize: 10,
      total: 10,
      currentItem: 1,
      searchForm: {
        orgName: ""
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
  },
  methods: {
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
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        ...this.paramsDetail
      }).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    onClear() {
      this.searchForm = {};
      this.pageSize = 10;
      this.pageNo = 1;
    },
    returnBoolean(type) {
      switch (type) {
        case "1":
          return "是";
        case "0":
          return "否";
      }
    },
    link(row) {
      console.log(row);
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
  .userHeader {
    box-sizing: border-box;
    height: 35px;
    width: 100%;
    font-size: 14px;
    padding: 0 14px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    line-height: 35px;
    color: rgba(78, 120, 222, 1);
    letter-spacing: 0px;
    opacity: 1;
    border-bottom: 1px solid rgba(231, 231, 231, 1);
  }
  .userContent {
    min-height: calc(100% - 35px);
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
        .formItem5 {
          display: inline-block;
          width: 25%;
          margin: 0;
          padding-right: 10px;
        }
        /deep/.el-form-item {
          margin-bottom: 0;
          /deep/.el-form-item__label {
            font-size: 12px;
          }
          /deep/.el-form-item__content {
            margin-top: 13px;
            width: calc(100% - 60px);
          }
        }
        /deep/.el-button {
          width: 66px;
          height: 28px;
          margin-top: 13px;
          min-width: 30px;
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
