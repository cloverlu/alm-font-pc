<!--
  功能：流程管理
  作者：sunhua
  邮箱：947545659@qq.com
  时间：2020年07月02日 08:54:09
-->
<template>
  <div class="processManagement">
    <div class="userContent">
      <div class="userForm">
        <el-form
          :model="searchForm"
          :inline="true"
          label-position="right"
          label-width="60px"
          size="mini"
          class="demo-form-inline formBox"
        >
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="业务名称" class="formItem5">
                <el-select v-model="searchForm.bizType" clearable style="width:100%">
                  <el-option label="小企业授信业务首次跟踪检查" value="m1"></el-option>
                  <el-option label="小企业授信业务贷后例行检查" value="m2"></el-option>
                  <el-option label="小企业授信业务贷后全面检查" value="m3"></el-option>
                  <el-option label="小企业授信业务还款资金落实情况检查" value="m4"></el-option>
                  <el-option label="小企业法人快捷贷首次检查" value="m5"></el-option>
                  <el-option label="小企业法人快捷贷贷后日常检查" value="m6"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="状态" class="formItem5">
                <el-select v-model="searchForm.bizStatus" clearable style="width:100%">
                  <el-option label="应做" value="shouldDo"></el-option>
                  <el-option label="未做" value="notDo"></el-option>
                  <el-option label="审核中" value="inReview"></el-option>
                  <el-option label="已做" value="already"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户名称" class="formItem5">
                <el-input v-model="searchForm.custName" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <div class="btn">
            <el-button type="primary" size="mini" @click="onSubmit">查询</el-button>
            <el-button size="mini" @click="onClear">重置</el-button>
            <el-button type="primary" size="mini" @click="download" :disabled="flag">下载</el-button>
          </div>
        </el-form>
      </div>
      <div class="userTable">
        <div class="tableBox">
          <el-table
            stripe
            :data="tableData"
            border
            style="width: 99.9%"
            :fit="true"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              header-align="center"
              type="selection"
              width="55px"
              :selectable="selectable"
            ></el-table-column>
            <el-table-column
              header-align="center"
              prop="bizType"
              :formatter="returnType"
              label="业务名称"
              min-width="15%"
            ></el-table-column>
            <el-table-column
              header-align="center"
              prop="bizStatus"
              :formatter="returnBizStatus"
              label="状态"
              min-width="12%"
            ></el-table-column>
            <el-table-column header-align="center" prop="custName" label="客户名称" min-width="12%"></el-table-column>
            <el-table-column header-align="center" prop="billNo" label="借据编号" min-width="25%"></el-table-column>
            <el-table-column header-align="center" prop="noticeDate" label="提醒时间" min-width="15%"></el-table-column>
            <el-table-column header-align="center" prop="endDate" label="截止时间" min-width="15%"></el-table-column>
            <el-table-column header-align="center" label="操作" min-width="15%">
              <template slot-scope="scope" width="120px">
                <el-button size="mini" type="primary" @click="handleEdit(scope.row)">修改</el-button>
              </template>
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
import { getTaskList } from "../../api/processManagement";
export default {
  name: "processManagement",
  data() {
    return {
      tableData: [],
      pageNo: 1,
      pageSize: 10,
      total: 10,
      currentItem: 1,
      flag: true,
      searchForm: {
        bizType: "",
        bizStatus: "",
        custName: ""
      },
      formLabelWidth: "72px",
      multipleSelection: []
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
      console.log("pageSize", this.pageSize);
    },
    // 翻页
    handleCurrentChange: function(e) {
      this.pageNo = e;
      console.log("pageIndex", this.pageNo);
    },
    // 表单查询
    onSubmit: function() {
      console.log(filterParams(this.searchForm));
      console.log(this.pageSize, this.pageNo);
      getTaskList(this, {
        ...filterParams(this.searchForm),
        emplName: "金林" || localStorage.getItem("emplName"),
        pageSize: this.pageSize,
        pageNo: this.pageNo
      }).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    //
    onClear() {
      this.searchForm = {};
      this.multipleSelection = [];
    },
    download() {
      // console.log("111");
      const arr = this.multipleSelection.map(item => item.bizId);
      arr.map(item => {
        window.open([
          "http://20.147.168.86:9001/postLoan/model/downPdfFile?bizId=" + item
        ]);
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (val && val.length > 0) {
        this.flag = false;
      } else {
        this.flag = true;
      }
      console.log("val", this.multipleSelection);
    },
    selectable(row) {
      let flag = true;
      if (row.bizStatus == "inReview" || row.bizStatus == "already") {
        flag = true;
      } else {
        flag = false;
      }
      return flag;
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
    returnBizStatus(row) {
      switch (row.bizStatus) {
        case "shouldDo":
          return "应做";
        case "notDo":
          return "未做";
        case "inReview":
          return "审批中";
        case "already":
          return "已做";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.processManagement {
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
          // margin-right: 20px;
          // min-width: 310px;
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
          text-align: right;
          box-sizing: border-box;
          width: 100%;
          height: 47px;
          line-height: 47px;
          /deep/.el-button {
            width: 66px;
            height: 28px;
            margin-top: 13px;
            min-width: 30px;
            margin-left: 0;
            margin-right: 10px;
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
.processManagement {
  .el-table__row td .cell {
    text-align: center !important;
  }
}
</style>
