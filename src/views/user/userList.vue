<!--
  功能: 用户列表
  作者：sunhua
  邮箱：947545659@qq.com
  时间：2020年07月02日 08:54:09
-->
<template>
  <div class="userlist">
    <div class="userHeader">
      <span class="userTitle">用户列表</span>
    </div>
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
            <el-col :span="6">
              <el-form-item label="所属机构" class="formItem5">
                <!-- <el-input v-model="searchForm.queryOrgName" clearable></el-input> -->
                <el-cascader
                  v-model="searchForm.queryOrgName"
                  placeholder="输入机构"
                  :options="OrgTree"
                  :props="{ checkStrictly: true }"
                  :show-all-levels="false"
                  filterable
                  clearable
                  style="width:100%"
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="岗位名称" class="formItem5">
                <el-select v-model="searchForm.postCode" style="width: 100%" multiple>
                  <el-option
                    v-for="item in postNameList"
                    :key="item.subCode"
                    :label="item.showName"
                    :value="item.subCode"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="用户名称" class="formItem5">
                <el-input v-model="searchForm.emplName" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="用户编码" class="formItem5">
                <el-input v-model="searchForm.emplCode" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="btn">
            <el-button type="primary" size="mini" @click="onSubmit">查询</el-button>
            <el-button size="mini" @click="onClear">重置</el-button>
            <el-button type="primary" size="mini" @click="() => add()">新增</el-button>
          </div>
        </el-form>
      </div>
      <div class="userTable">
        <div class="tableBox">
          <el-table stripe :data="tableData" border style="width: 99.9%" :fit="true">
            <el-table-column header-align="center" prop="orgName" label="所属机构" min-width="12%"></el-table-column>
            <el-table-column header-align="center" prop="emplName" label="用户名称" min-width="14%"></el-table-column>
            <el-table-column
              header-align="center"
              show-overflow-tooltip
              prop="emplCode"
              min-width="28%"
              label="用户编码"
            ></el-table-column>
            <el-table-column header-align="center" prop="postName" label="岗位名称" min-width="14%"></el-table-column>
            <el-table-column header-align="center" prop="noticeFlag" label="通知标识" min-width="14%"></el-table-column>
            <el-table-column header-align="center" label="操作" width="150px">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleEdit(scope.row)">修改</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
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
    <el-dialog
      class="tanchuang"
      title="用户信息"
      :visible="dialogFormVisible"
      width="698px"
      :append-to-body="true"
      v-alterELDialogMarginTop="{marginTop:'30vh'}"
      :before-close="() => editCancel('editForm', 2)"
    >
      <el-form :model="form" ref="editForm">
        <el-form-item label="所属机构" :label-width="formLabelWidth">
          <el-input v-model="form.orgName" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户名称" :label-width="formLabelWidth">
          <el-input v-model="form.emplName" clearable :disabled="type == 2"></el-input>
        </el-form-item>
        <el-form-item label="用户编码" :label-width="formLabelWidth">
          <el-input v-model="form.emplCode" clearable :disabled="type == 2"></el-input>
        </el-form-item>
        <el-form-item label="通知标识" :label-width="formLabelWidth">
          <el-input v-model="form.noticeFlag" clearable></el-input>
        </el-form-item>
        <el-form-item label="岗位名称" :label-width="formLabelWidth">
          <el-checkbox-group v-model="form.postCode">
            <el-checkbox
              v-for="item in postNameList"
              :label="item.subCode"
              :key="item.subCode"
            >{{ item.showName }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editOk('editForm')">确 认</el-button>
        <el-button @click="() => editCancel('editForm', 2)">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
      :append-to-body="true"
      v-alterELDialogMarginTop="{marginTop:'30vh'}"
      close="deleteCancel()"
    >
      <div class="msg">确认删除该用户信息吗？</div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteOk()">确 认</el-button>
        <el-button @click="deleteCancel()">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import _ from "lodash";
import { filterParams } from "../../utils/utils";
import {
  getUsers,
  addUser,
  getPostList,
  getUserDetail,
  updateUser,
  deleteUser
} from "../../api/users";
import { getOrgTree } from "../../api/customer";
export default {
  name: "userList",
  data() {
    return {
      tableData: [],
      pageNo: 1,
      pageSize: 10,
      total: 10,
      currentItem: 1,
      type: 1,
      dialogFormVisible: false,
      dialogVisible: false,
      OrgTree: [],
      postNameList: [],
      searchForm: {
        queryOrgName: [],
        postCode: [],
        emplName: "",
        emplCode: ""
      },
      form: {
        orgName: "",
        postCode: [],
        emplName: "",
        emplCode: "",
        noticeFlag: ""
      },
      formLabelWidth: "72px"
    };
  },
  mounted() {
    this.getPostListArr();
    // // 进入页面先调用查询接口
    this.onSubmit();
    this.getOrgList();
  },
  methods: {
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
      const form = _.cloneDeep(this.searchForm);
      if (form.queryOrgName) {
        form.queryOrgName = form.queryOrgName.pop();
      }
      const params = {
        ...form,
        postCode: this.searchForm.postCode.join(","),
        orgName: sessionStorage.getItem("orgName"),
        pageSize: 10,
        pageNo: 1
      };
      getUsers(this, {
        ...filterParams(params),
        ...this.paramsDetail
      }).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    // 获取岗位列表
    getPostListArr() {
      getPostList(this).then(res => {
        if (res && res.data && res.data.data) {
          this.postNameList = res.data.data;
        }
      });
    },
    // 新建按钮-触发弹窗
    add: function() {
      this.currentItem = {};
      this.dialogFormVisible = true;
      this.type = 1;
      this.form = {
        postCode: []
      };
    },
    // 重置
    onClear() {
      this.searchForm = {
        queryOrgName: [],
        postCode: [],
        emplName: "",
        emplCode: ""
      };
      this.pageNo = 1;
      this.pageSize = 10;
    },
    // 编辑按钮-触发弹窗
    handleEdit: function(item) {
      this.currentItem = item.id;
      getUserDetail(this, { id: item.id }).then(res => {
        this.form.orgName = res.data.data.orgName;
        this.form.emplName = res.data.data.emplName;
        this.form.emplCode = res.data.data.emplCode;
        this.form.noticeFlag = res.data.data.noticeFlag;
        if (res.data.data.postCode) {
          this.form.postCode = res.data.data.postCode.split(",");
        } else {
          this.form.postCode = [];
        }
        // this.form.postCode = res.data.data.postCode.split(",");
        this.dialogFormVisible = true;
        this.type = 2;
      });
    },
    // 删除按钮-触发弹窗
    handleDelete: function(item) {
      this.currentItem = item.id;
      this.dialogVisible = true;
    },
    // 新建编辑弹窗的 重置按钮
    editCancel: function(refname) {
      this.form = {
        orgName: "",
        postCode: [],
        emplName: "",
        emplCode: "",
        noticeFlag: ""
      };
      this.$refs[refname].resetFields();
      this.dialogFormVisible = false;
      this.type = 1;
    },
    // 新建编辑弹窗的 确认按钮
    editOk: function(refname) {
      if (this.type === 1) {
        // if (this.form.postCode) {
        //   this.form.postCode = this.form.postCode.join(",");
        // } else {
        //   this.form.postCode = "";
        // }
        // 新建
        addUser(this, {
          ...filterParams(this.form),
          postCode: this.form.postCode ? this.form.postCode.join(",") : ""
        }).then(res => {
          if (res.data.returnCode === "200000") {
            this.$message({
              message: "新建用户成功",
              type: "success"
            });
            this.dialogFormVisible = false;
            this.$refs[refname].resetFields();
            this.form = {
              orgName: "",
              postCode: [],
              emplName: "",
              emplCode: "",
              noticeFlag: ""
            };
            this.type = 1;
            this.onSubmit();
          } else {
            this.$message({
              message: res.data.returnMsg,
              type: "error"
            });
          }
        });
      } else {
        // 编辑
        updateUser(this, {
          ...filterParams(this.form),
          postCode: this.form.postCode ? this.form.postCode.join(",") : "",
          id: this.currentItem
        }).then(res => {
          if (res.data.returnCode === "200000") {
            this.$message({
              message: "编辑用户成功",
              type: "success"
            });
            this.dialogFormVisible = false;
            this.$refs[refname].resetFields();
            this.form = {
              orgName: "",
              postCode: [],
              emplName: "",
              emplCode: "",
              noticeFlag: ""
            };
            this.type = 1;
            this.onSubmit();
          } else {
            this.$message({
              message: res.data.returnMsg,
              type: "error"
            });
          }
        });
      }
    },
    // 删除弹窗的 取消按钮
    deleteCancel: function() {
      this.dialogVisible = false;
      this.currentItem = "";
    },
    // 删除弹窗的 确认按钮
    deleteOk: function() {
      deleteUser(this, { id: this.currentItem })
        .then(res => {
          if (res.data.returnCode === "200000") {
            this.dialogVisible = false;
            this.currentItem = "";
          }
        })
        .then(() => {
          this.onSubmit();
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/global.scss";
.userlist {
  box-sizing: border-box;
  width: 100%;
  min-height: 100%;
  position: relative;
  // padding: 14px;
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
    height: calc(100% - 35px);
    width: 100%;
    .userForm {
      box-sizing: border-box;
      height: 100px;
      max-height: 186px;
      width: 100%;
      .formBox {
        box-sizing: border-box;
        position: relative;
        height: 100px;
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
          padding-right: 10px;
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

        .btn {
          display: inline-block;
          position: absolute;
          right: 14px;
          bottom: 0;
          text-align: right;
          box-sizing: border-box;
          width: 100%;
          height: 47px;
          line-height: 47px;
          // padding-left: 20px;
          /deep/.el-button {
            // width: 45%;
            // width: 66px;
            height: 28px;
            margin-top: 13px;
            min-width: 60px;
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
            .el-button--default {
              background: rgba(255, 255, 255, 1);
              /deep/span {
                font-size: 14px;
                font-family: Segoe UI;
                font-weight: 400;
                color: rgba(78, 120, 222, 1);
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
      height: calc(100% - 100px);
      min-height: calc(100% - 140px);
      width: 100%;
      padding: 10px 14px;
      // overflow: auto;
      .tableBox {
        width: 100%;
        // position: relative;
        // height: 600px;
        // overflow: auto;
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
.msg {
  width: 100%;
  height: 27px;
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  line-height: 27px;
  color: rgba(102, 102, 102, 1);
  text-align: center;
  opacity: 1;
}
// .el-dialog__wrapper {
//   /deep/.el-dialog {
//     background: rgba(255, 255, 255, 1);
//     box-shadow: 0px 0px 4px rgba(153, 153, 153, 0.6);
//     opacity: 1;
//     border-radius: 4px;
//     .el-dialog__header {
//       background-color: rgba(241, 242, 243, 1);
//       height: 40px;
//       line-height: 40px;
//       padding: 0;
//       padding-left: 19px;
//       .el-dialog__title {
//         color: rgba(112, 112, 112, 1);
//         font-size: 14px;
//         font-family: Source Han Sans CN;
//         font-weight: bold;
//       }
//       .el-dialog__headerbtn {
//         top: 15px;
//       }
//     }
//     .el-dialog__body {
//       .el-form {
//         width: 421px;
//         margin: auto;
//         height: 224px;
//         .el-form-item {
//           height: 28px;
//           margin-bottom: 21px;
//           .el-form-item__label {
//             height: 28px;
//             line-height: 38px;
//           }
//           .el-form-item__content {
//             height: 28px;
//             .el-input {
//               height: 28px;
//               .el-input__inner {
//                 height: 28px;
//                 margin-top: -2px;
//               }
//             }
//           }
//         }
//       }
//     }
//     .el-dialog__footer {
//       border-top: 1px solid rgba(226, 226, 226, 1);
//       padding: 10px 20px;
//       .dialog-footer {
//         text-align: center;
//       }
//     }
//   }
// }
</style>

<style lang="scss">
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
.el-dialog__wrapper {
  /deep/.el-dialog {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 4px rgba(153, 153, 153, 0.6);
    opacity: 1;
    border-radius: 4px;
    .el-dialog__header {
      background-color: rgba(241, 242, 243, 1);
      height: 40px;
      line-height: 40px;
      padding: 0;
      padding-left: 19px;
      .el-dialog__title {
        color: rgba(112, 112, 112, 1);
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: bold;
      }
      .el-dialog__headerbtn {
        top: 15px;
      }
    }
    .el-dialog__body {
      .el-form {
        width: 421px;
        margin: auto;
        // height: 224px;
        .el-form-item {
          // height: 28px;
          // margin-bottom: 21px;
          .el-form-item__label {
            height: 28px;
            line-height: 38px;
          }
          .el-form-item__content {
            // height: 28px;
            .el-input {
              height: 28px;
              .el-input__inner {
                height: 28px;
                margin-top: -2px;
              }
            }
            .el-checkbox-group {
              // height: 28px;
              line-height: 28px;
              .el-checkbox {
                margin-left: 5px;
              }
            }
          }
        }
      }
    }
    .el-dialog__footer {
      border-top: 1px solid rgba(226, 226, 226, 1);
      padding: 10px 20px;
      .dialog-footer {
        text-align: center;
      }
    }
  }
}
</style>
