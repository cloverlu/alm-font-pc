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
          label-width="80px"
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
                  <el-option label="已做" value="alreadyDo"></el-option>
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
            ref="multipleTable"
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
            <el-table-column header-align="center" prop="bizEndDate" label="截止时间" min-width="15%"></el-table-column>
            <el-table-column header-align="center" label="操作" width="150px">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="warning"
                  @click="handlePreview(scope.row)"
                  v-if="scope.row.bizStatus == 'alreadyDo'"
                >查看</el-button>
                <el-button
                  size="mini"
                  type="warning"
                  @click="handleDownload(scope.row)"
                  v-if="scope.row.bizStatus == 'alreadyDo'"
                >下载</el-button>
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
      host: window.config.host.authorization,
      tableData: [],
      pageNo: 1,
      pageSize: 10,
      total: 10,
      ie: false,
      currentItem: 1,
      flag: true,
      searchForm: {
        bizType: "",
        bizStatus: "",
        custName: "",
        queryFlag: "4"
      },
      src: "",
      paramsDetail: {
        pageNo: 1,
        pageSize: 10
      },
      pages: "",
      url: "",
      dialogVisible: false,
      formLabelWidth: "72px",
      multipleSelection: []
    };
  },
  mounted() {
    // 进入页面先调用查询接口const { custName } = this.$route.query;
    if (custName) {
      this.searchForm = {
        custName,
        queryFlag: "4"
      };
    }
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
      console.log("pageSize", this.pageSize);
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
      console.log("pageIndex", this.pageNo);
    },
    // 表单查询
    onSubmit: function() {
      console.log(filterParams(this.searchForm));
      console.log(this.pageSize, this.pageNo);
      getTaskList(this, {
        ...filterParams(this.searchForm),
        emplCode: sessionStorage.getItem("emplCode"),
        orgCode: sessionStorage.getItem("orgCode"),
        emplName: sessionStorage.getItem("emplName"),
        pageSize: 10,
        pageNo: 1,
        ...this.paramsDetail
      }).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    //
    onClear() {
      this.searchForm = {
        bizType: "",
        bizStatus: "",
        custName: "",
        queryFlag: "4"
      };
      this.multipleSelection = [];
      this.$refs.multipleTable.clearSelection();
      this.pageNo = 1;
      this.pageSize = 10;
    },
    download() {
      // console.log("111");
      const arr = this.multipleSelection.map(item => item.bizId);
      const bizIdString = arr.join(",");
      console.log("bizIdString", bizIdString);
      var a = document.createElement("a");
      //需要下载的数据内容,我这里放的就是BLOB，如果你有下载链接就不需要了
      var url = `${this.host}/postLoan/model/downZipPdfFile?bizIds=${bizIdString}`;
      var filename = "pdfFile.zip";
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    },
    // 单个pdf 文件下载
    handleDownload(row) {
      const id = row.bizId;
      var a = document.createElement("a");
      //需要下载的数据内容,我这里放的就是BLOB，如果你有下载链接就不需要了
      var url = `${this.host}/postLoan/model/downPdfFile?bizId=${id}`;
      var filename = "pdf.zip";
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
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
      if (row.bizStatus == "alreadyDo") {
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
          return "审核中";
        case "alreadyDo":
          return "已做";
      }
    },
    handleEdit(row) {
      this.$router.push({
        path: "/toDoList/inspectionApplication",
        query: {
          type: 1,
          bizId: row.bizId,
          bizStatus: row.bizStatus,
          currPost: row.currPost,
          biggerThan500: row.biggerThan500,
          belongBranch: row.belongBranch,
          bizType: row.bizType
        }
      });
    },
    // 预览
    handlePreview(row) {
      this.url = `${this.host}/postLoan/model/viewPdfFile?bizId=${row.bizId}`;
      // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      //   window.open(this.url);
      //   // previewPDF(this, { bizId: row.bizId }).then(res => {
      //   //   var csvData = new Blob([res.data], { type: "application/pdf" });
      //   //   console.log(csvData);
      //   //   window.navigator.msSaveOrOpenBlob(csvData, "pdf");
      //   // });
      // } else {
      //   this._loadFile(this.url);
      // }

      // 下面代码都是处理IE浏览器的情况
      if (window.ActiveXObject || "ActiveXObject" in window) {
        console.log(1111, "ie");
        let flag;
        //判断是否为IE浏览器，"ActiveXObject" in window判断是否为IE11
        //判断是否安装了adobe Reader
        for (var x = 2; x < 10; x++) {
          try {
            var oAcro = eval("new ActiveXObject('PDF.PdfCtrl." + x + "');");
            if (oAcro) {
              flag = true;
            }
          } catch (e) {
            flag = false;
          }
        }
        try {
          var oAcro4 = new ActiveXObject("PDF.PdfCtrl.1");
          if (oAcro4) {
            flag = true;
          }
        } catch (e) {
          flag = false;
        }

        try {
          var oAcro7 = new ActiveXObject("AcroPDF.PDF.1");
          if (oAcro7) {
            flag = true;
          }
        } catch (e) {
          flag = false;
        }

        if (flag) {
          //支持
          window.open(this.url); //调用显示的方法
        } else {
          //不支持
          alert(
            "对不起,您还没有安装PDF阅读器软件呢,为了方便预览PDF文档,请选择安装！"
          );
          location =
            "http://ardownload.adobe.com/pub/adobe/reader/win/9.x/9.3/chs/AdbeRdr930_zh_CN.exe";
        }
      } else {
        this._loadFile(this.url); //调用显示的方法
      }
    },
    _loadFile(url) {
      console.log(url);
      var a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }
};
</script>

<style lang="scss" scoped>
.processManagement {
  box-sizing: border-box;
  width: 100%;
  min-height: 100%;
  // position: relative;
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
            width: calc(100% - 80px);
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
  // .follow {
  //   /deep/.el-dialog {
  //     height: 100%;
  //     .el-dialog__body {
  //       height: 95%;
  //       background-color: #ccc;
  //     }
  //   }
  // }
}
</style>

<style lang="scss">
.processManagement {
  .el-table__row td .cell {
    text-align: center !important;
  }
  // .follow {
  .el-dialog {
    height: 100%;
    .el-dialog__body {
      height: 95% !important;
      background-color: #ccc;
    }
  }
  // }
  // .agreement_picture {
  //   height: 95%;
  // }
  // .dialog-footer {
  //   height: 5%;
  // }
}
</style>
