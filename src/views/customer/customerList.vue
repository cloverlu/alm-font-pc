<!--
  功能：登录
  作者：sunhua
  邮箱：947545659@qq.com
  时间：2020年07月02日 08:54:09
-->
<template>
  <div class="customerList">
    <div class="userContent">
      <div class="userForm">
        <el-form
          :model="searchForm"
          :inline="true"
          label-position="left"
          size="mini"
          class="demo-form-inline formBox"
        >
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="客户名称" class="formItem5">
                <el-input v-model="searchForm.custName" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" size="mini" @click="onSubmit">查询</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="userTable">
        <div class="tableBox">
          <el-table stripe :data="tableData" border style="width: 99.9%" :fit="true">
            <el-table-column header-align="center" prop="custName" label="客户名称" min-width="25%"></el-table-column>
            <el-table-column header-align="center" prop="custCode" label="客户编号" min-width="40%"></el-table-column>
            <el-table-column header-align="center" label="借据信息" min-width="25%">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="link1(scope.row)">用户借据列表</el-button>
                <el-button size="mini" type="warning" @click="link2(scope.row)">检查记录</el-button>
                <!-- <span class="linkTo" @click="link(scope.row)">用户借据列表</span> -->
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
import { getCustomers } from "../../api/customer";
export default {
  name: "customerList",
  data() {
    return {
      tableData: [],
      pageNo: 1,
      pageSize: 10,
      total: 10,
      currentItem: 1,
      searchForm: {
        custName: "",
        queryType: "3",
        orgName: sessionStorage.getItem("orgName")
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
      getCustomers(this, {
        ...filterParams(this.searchForm),
        emplCode: sessionStorage.getItem("emplCode"),
        emplName: sessionStorage.getItem("emplName"),
        pageSize: 10,
        pageNo: 1,
        ...this.paramsDetail
      }).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    link1(row) {
      let flag = false;
      const menuArr = JSON.parse(sessionStorage.getItem("menuList"));
      menuArr.map(item => {
        if (item.children && item.children.length) {
          item.children.map(i => {
            if (i.name == "借据列表") {
              flag = true;
            }
          });
        }
      });
      if (flag) {
        this.$router.push({
          path: "/customer/iouList",
          query: { custName: row.custName }
        });
      } else {
        this.$message({
          message: "当前没有权限",
          type: "warning"
        });
      }
    },
    link2(row) {
      let flag = false;
      const menuArr = JSON.parse(sessionStorage.getItem("menuList"));
      menuArr.map(item => {
        if (item.children && item.children.length) {
          item.children.map(i => {
            if (i.name == "管理岗报告下载") {
              flag = true;
            }
          });
        }
      });
      if (flag) {
        this.$router.push({
          path: "/processManagement/administrationDownload",
          query: { custName: row.custName }
        });
      } else {
        this.$message({
          message: "当前没有权限",
          type: "warning"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/global.scss";
.customerList {
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
        padding-right: 14px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
        opacity: 1;
        .formItem5 {
          display: inline-block;
          width: 100%;
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
            width: calc(100% - 100px);
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
      // overflow: auto;
      .tableBox {
        width: 100%;
        .linkTo {
          color: rgba(78, 128, 222, 1);
          text-decoration: underline;
          font-size: 16px;
        }
        /deep/.el-table {
          // position: absolute;
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
.customerList {
  .el-table__row td .cell {
    text-align: center !important;
  }
}
</style>
