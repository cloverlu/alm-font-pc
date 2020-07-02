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
            <el-input v-model="searchForm.custName" clearable></el-input>
          </el-form-item>

          <el-button type="primary" size="mini" @click="onSubmit">查询</el-button>
        </el-form>
      </div>
      <div class="userTable">
        <div class="tableBox">
          <el-table stripe :data="tableData" border style="width: 99.9%" :fit="true">
            <el-table-column header-align="center" prop="orgName" label="机构名称" min-width="15%"></el-table-column>
            <el-table-column
              header-align="center"
              prop="returnBoolean(custCode)"
              label="首次检查按时完成"
              min-width="8%"
            ></el-table-column>
            <el-table-column header-align="center" prop="custCode" label="首次检查超时完成" min-width="8%"></el-table-column>
            <el-table-column header-align="center" prop="custCode" label="首次检查未完成" min-width="8%"></el-table-column>
            <el-table-column header-align="center" prop="custCode" label="例行检查按时完成" min-width="8%"></el-table-column>
            <el-table-column header-align="center" prop="custCode" label="例行检查超时完成" min-width="8%"></el-table-column>
            <el-table-column header-align="center" prop="custCode" label="例行检查未完成" min-width="8%"></el-table-column>
            <el-table-column header-align="center" prop="custCode" label="全面检查按时完成" min-width="8%"></el-table-column>
            <el-table-column header-align="center" prop="custCode" label="全面检查超时完成" min-width="8%"></el-table-column>
            <el-table-column header-align="center" prop="custCode" label="全面检查未完成" min-width="8%"></el-table-column>
            <el-table-column header-align="center" prop="custCode" label="还款资金落实" min-width="8%"></el-table-column>
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
  name: "statisticalInfoList",
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
        custName: "1"
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
      console.log(filterParams(this.searchForm));
      console.log(this.currentPageSize, this.currentPageIndex);
    },
    returnBoolean(type) {
      switch (type) {
        case "1":
          return "是";
        case "0":
          return "否";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
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
          margin-right: 5%;
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
</style>
