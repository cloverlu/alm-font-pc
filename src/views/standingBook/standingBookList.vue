<!--
  功能：台账列表
  作者：sunhua
  邮箱：947545659@qq.com
  时间：2020年07月02日 08:54:09
-->
<template>
  <div class="standingBookList">
    <div class="userHeader">
      <span class="userTitle">台账列表</span>
    </div>
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
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="机构名称" class="formItem5">
                <el-input v-model="searchForm.orgName" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="借据编号" class="formItem5">
                <el-input v-model="searchForm.billNo" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户名称" class="formItem5">
                <el-input v-model="searchForm.custName" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="btn">
                <el-button type="primary" size="mini" @click="onSubmit">查询</el-button>
                <el-button size="mini" @click="onClear">重置</el-button>
                <el-upload
                  class="upload-demo fileUpload"
                  ref="upload"
                  :action="`${this.host}/loanReceipt/uploadExcel`"
                  :auto-upload="true"
                  :on-success="sendSuccess"
                  :on-error="sendError"
                >
                  <el-button slot="trigger" size="small" type="primary" @click="submitUpload">导入</el-button>
                </el-upload>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="userTable">
        <div class="tableBox">
          <el-table stripe :data="tableData" border style="width: 99.9%" :fit="true">
            <el-table-column
              cell-class-name
              header-align="center"
              prop="orgName"
              label="机构名称"
              min-width="10%"
            ></el-table-column>
            <el-table-column
              cell-class-name
              header-align="center"
              prop="custName"
              label="客户名称"
              min-width="8%"
            ></el-table-column>
            <el-table-column header-align="center" prop="creditKind" label="授信品种" min-width="12%"></el-table-column>
            <el-table-column
              header-align="center"
              show-overflow-tooltip
              prop="creditSubLoanKind"
              min-width="12%"
              label="信贷业务小类"
            ></el-table-column>
            <el-table-column header-align="center" prop="billNo" label="借据编号" min-width="12%"></el-table-column>
            <el-table-column header-align="center" prop="billAmout" label="借据金额" min-width="8%"></el-table-column>
            <el-table-column
              header-align="center"
              prop="billLength"
              label="借据期限(月)"
              min-width="10%"
            ></el-table-column>
            <el-table-column
              header-align="center"
              prop="billBeginDate"
              label="借据起期"
              min-width="10%"
            ></el-table-column>
            <el-table-column header-align="center" prop="billEndDate" label="借据止期" min-width="10%"></el-table-column>
            <el-table-column header-align="center" prop="billBlance" label="借据余额" min-width="8%"></el-table-column>
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
import { getCustomers } from "../../api/customer";
export default {
  name: "standingBookList",
  data() {
    return {
      host: window.config.host.authorization,
      tableData: [],
      pageNo: 1,
      pageSize: 10,
      total: 10,
      searchForm: {
        queryType: "1",
        orgName: "",
        billNo: "",
        custName: ""
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
      console.log(filterParams(this.searchForm));
      console.log(this.pageSize, this.pageNo);
      getCustomers(this, {
        ...filterParams(this.searchForm),
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        ...this.paramsDetail
      }).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
        console.log(res);
      });
    },
    // 重置
    onClear() {
      this.searchForm = {
        queryType: "1"
      };
      this.pageNo = 1;
      this.pageSize = 10;
    },
    sendSuccess(res) {
      console.log(res);
      if (res.returnCode == "200000") {
        this.$message({
          message: "文件导入操作成功",
          type: "success"
        });
        this.onSubmit();
      } else {
        this.$message({
          message: res.returnMsg,
          type: "error"
        });
      }
    },
    sendError() {
      this.$message({
        message: "文件格式或类型不对",
        type: "error"
      });
    },
    submitUpload() {
      this.$refs.upload.submit();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/global.scss";
.standingBookList {
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
        line-height: 53px;
        width: 100%;
        font-size: 12px;
        padding-left: 14px;
        padding-right: 14px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
        opacity: 1;
        .formItem5 {
          display: inline-block;
          width: 100%;
          // max-width: 280px;
          margin: 0;
          // padding-right: 10px;
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
          width: 100%;
          text-align: right;
          height: 47px;
          line-height: 47px;
          // padding-left: 20px;
          /deep/.el-button {
            width: 66px;
            height: 28px;
            // line-height: 28px;
            // margin-top: 12px;
            // min-width: 30px;
            // max-width: 66px;
            margin-left: 20px;
            // margin-right: 5%;
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
      .fileUpload {
        display: inline-block;
        // margin-left: 14px;
        position: relative;
        // width: 500px;
        height: 45px;
        /deep/.el-upload {
          // width: 100px;
          height: 45px;
          line-height: 47px;
          // padding-top: 2px;
          /deep/.el-button {
            width: 66px;
            height: 28px;
            // margin-top: 13px;
            margin-left: 20px;
            // margin-right: 5%;
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
        /deep/.el-upload-list--text {
          position: absolute;
          top: 0;
          left: 100px;
          display: none;
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
.standingBookList {
  .el-table__row td .cell {
    text-align: center !important;
  }
}
</style>
