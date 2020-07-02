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
          label-position="left"
          label-width="60px"
          size="mini"
          class="demo-form-inline formBox"
        >
          <el-form-item label="开始日期" class="formItem4">
            <!-- <el-input v-model="searchForm.custName" clearable></el-input> -->
            <el-date-picker
              v-model="searchForm.startDate"
              style="width:100%"
              type="date"
              placeholder="选择日期"
              clearable
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="结束日期" class="formItem4">
            <el-date-picker
              v-model="searchForm.endDate"
              style="width:100%"
              type="date"
              placeholder="选择日期"
              clearable
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="机构名称" class="formItem4">
            <el-input v-model="searchForm.orgName" clearable></el-input>
          </el-form-item>
          <el-form-item label="管户名称" class="formItem4">
            <el-input v-model="searchForm.emplName" clearable></el-input>
          </el-form-item>
          <el-form-item label="检查类型" class="formItem4">
            <el-select v-model="searchForm.bizType" clearable style="width:100%">
              <el-option label="类型1" value="1"></el-option>
              <el-option label="类型2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="完成状态" class="formItem4">
            <el-select v-model="searchForm.bizStatus" clearable style="width:100%">
              <el-option label="已完成" value="1"></el-option>
              <el-option label="进行中" value="2"></el-option>
            </el-select>
          </el-form-item>
          <div class="btn">
            <el-button type="primary" size="mini" @click="onSubmit">查询</el-button>
            <el-button size="mini" @click="output">导出</el-button>
          </div>
        </el-form>
      </div>
      <div class="userTable">
        <div class="tableBox">
          <el-table stripe :data="tableData" border style="width: 99.9%" :fit="true">
            <!-- <el-table-column header-align="center" type="selection" width="55px"></el-table-column> -->
            <el-table-column header-align="center" prop="orgName" label="机构名称" min-width="10%"></el-table-column>
            <el-table-column
              header-align="center"
              prop="custCode"
              :formatter="() => returnBoolean('custCode')"
              label="检查类型"
              min-width="8%"
            ></el-table-column>
            <el-table-column
              header-align="center"
              prop="custCode"
              :formatter="() => returnBoolean('custCode')"
              label="完成状态"
              min-width="8%"
            ></el-table-column>
            <el-table-column
              header-align="center"
              prop="custCode"
              :formatter="() => returnBoolean('custCode')"
              label="管户客户经理"
              min-width="8%"
            ></el-table-column>
            <el-table-column
              header-align="center"
              prop="custCode"
              :formatter="() => returnBoolean('custCode')"
              label="客户名称"
              min-width="8%"
            ></el-table-column>
            <el-table-column
              header-align="center"
              prop="custCode"
              :formatter="() => returnBoolean('custCode')"
              label="借据编号"
              min-width="9%"
            ></el-table-column>
            <el-table-column
              header-align="center"
              prop="custCode"
              :formatter="() => returnBoolean('custCode')"
              label="借据金额"
              min-width="8%"
            ></el-table-column>
            <el-table-column
              header-align="center"
              prop="custCode"
              :formatter="() => returnBoolean('custCode')"
              label="借据起期"
              min-width="8%"
            ></el-table-column>
            <el-table-column
              header-align="center"
              prop="custCode"
              :formatter="() => returnBoolean('custCode')"
              label="借据止期"
              min-width="8%"
            ></el-table-column>
            <el-table-column
              header-align="center"
              prop="custCode"
              :formatter="() => returnBoolean('custCode')"
              label="借据余额"
              min-width="8%"
            ></el-table-column>
            <el-table-column
              header-align="center"
              prop="custCode"
              :formatter="() => returnBoolean('custCode')"
              label="完成时间"
              min-width="8%"
            ></el-table-column>
            <el-table-column
              header-align="center"
              prop="custCode"
              :formatter="() => returnBoolean('custCode')"
              label="应完成时间"
              min-width="8%"
            ></el-table-column>
          </el-table>
        </div>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPageIndex"
            :page-sizes="[10, 20, 40]"
            :page-size="currentPageSize"
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
export default {
  name: "detailedInfoList",
  data() {
    return {
      tableData: [
        {
          id: 1,
          orgName: "王小虎",
          custCode: "1"
        }
      ],
      currentPageIndex: 1,
      currentPageSize: 10,
      total: 400,
      currentItem: 1,
      searchForm: {
        startDate: "",
        endDate: "",
        orgName: "",
        emplName: "",
        bizType: "",
        bizStatus: ""
      },
      multipleSelection: [],
      flag: true,
      formLabelWidth: "72px"
    };
  },
  mounted() {
    // 进入页面先调用查询接口
    this.$moment.locale("zh-cn");
    this.onSubmit();
  },
  methods: {
    // 修改分页大小
    handleSizeChange: function(e) {
      this.currentPageSize = e;
      console.log("pageSize", this.currentPageSize);
    },
    // 翻页
    handleCurrentChange: function(e) {
      this.currentPageIndex = e;
      console.log("pageIndex", this.currentPageIndex);
    },
    // 表单查询
    onSubmit: function() {
      if (this.searchForm.startDate) {
        this.searchForm.startDate = this.$moment(
          this.searchForm.startDate
        ).format("L");
      }
      if (this.searchForm.endDate) {
        this.searchForm.endDate = this.$moment(this.searchForm.endDate).format(
          "L"
        );
      }
      console.log(filterParams(this.searchForm));
      console.log(this.currentPageSize, this.currentPageIndex);
    },
    output() {
      console.log(this.multipleSelection);
    },
    returnBoolean(type) {
      if (type === "1") {
        return "是";
      } else {
        return "否";
      }
    },
    handleSelectionChange(val) {
      console.log(val.length);
      this.multipleSelection = val;
      if (val.length > 0) {
        this.flag = false;
      } else {
        this.flag = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.detailedInfoList {
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
      height: 100px;
      width: 100%;
      .formBox {
        box-sizing: border-box;
        height: 100%;
        line-height: 50px;
        width: 100%;
        font-size: 12px;
        padding-left: 14px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
        opacity: 1;
        .formItem4 {
          display: inline-block;
          width: 24%;
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
        .btn {
          display: inline-block;
          box-sizing: border-box;
          // width: calc(16% - 14px);
          height: 100%;
          line-height: 50px;
          padding-left: 20px;
          /deep/.el-button {
            width: 66px;
            height: 28px;
            margin-top: 13px;
            min-width: 30px;
            margin-left: 0;
            margin-right: 20px;
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
.detailedInfoList {
  .el-table__row td .cell {
    text-align: center !important;
  }
}
</style>
