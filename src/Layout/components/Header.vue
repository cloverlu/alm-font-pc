<!--
  功能：系统名称和登出
  作者：sunhua
  邮箱：947545659@qq.com
  时间：2020年07月02日 08:54:09
-->
<template>
  <div class="header">
    <div class="headerLeft">
      <div class="leftTitle">
        <i class="iconfont iconjiedaixiaofeirenzheng-01 leftIcon"></i>
        <span>小企业无纸化贷后管理系统</span>
      </div>
    </div>
    <div class="headerRight">
      <i class="iconfont iconPC-morentouxiang userIcon"></i>

      <div class="nameBox">
        <span class="userName">{{userName}}</span>
      </div>
      <el-dropdown trigger="click" class="loginPoper" @command="handleCommand">
        <span class="el-dropdown-link">
          <i class="el-icon-setting"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="iconfont iconguanji-01 loginIcon" command="loginOut">
            <span>退出</span>
          </el-dropdown-item>
          <el-dropdown-item icon="el-icon-edit" command="ChangePassword">
            <span>修改密码</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
      class="tanchuang"
      title="修改密码"
      center
      :visible="dialogFormVisible"
      width="698px"
      :append-to-body="true"
      v-alterELDialogMarginTop="{marginTop:'30vh'}"
      :before-close="editCancel"
    >
      <el-form :model="user" label-position="left" label-width="100px">
        <el-form-item label="账号">
          <el-input v-model="user.userName" disabled></el-input>
        </el-form-item>
        <el-form-item label="原密码">
          <el-input v-model="user.oldPassWord" show-password clearable></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="user.newPassword" show-password clearable></el-input>
        </el-form-item>
        <el-form-item label="确认新密码">
          <el-input v-model="user.newPasswordAgain" show-password clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editOk">确 认</el-button>
        <el-button @click="editCancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      userName: sessionStorage.getItem("emplName"),
      dialogFormVisible: false,
      user: {
        userName: "",
        oldPassWord: "",
        newPassword: "",
        newPasswordAgain: ""
      }
    };
  },
  methods: {
    handleCommand(command) {
      if (command == "loginOut") {
        this.loginOut();
      } else if (command == "ChangePassword") {
        this.ChangePassword();
      }
    },
    loginOut() {
      sessionStorage.removeItem("emplCode");
      sessionStorage.removeItem("emplName");
      sessionStorage.removeItem("noticeFlag");
      sessionStorage.removeItem("orgCode");
      sessionStorage.removeItem("orgName");
      sessionStorage.removeItem("postCode");
      sessionStorage.removeItem("menuList");
      this.$message({
        message: "成功退出系统",
        type: "success"
      });
      setTimeout(() => {
        this.$router.push({
          path: "/login"
        });
      }, 500);
    },
    ChangePassword() {
      console.log(222);
      this.dialogFormVisible = true;
    },
    editOk() {
      console.log(this.user);
      if (this.user.newPassword !== this.user.newPasswordAgain) {
        this.$message({
          message: "两次输入不一致",
          type: "error"
        });
      } else {
        // 提交数据
        this.editCancel();
      }
    },
    editCancel() {
      this.dialogFormVisible = false;
      this.user = {
        userName: "",
        oldPassWord: "",
        newPassword: "",
        newPasswordAgain: ""
      };
    }
  }
};
</script>

<style lang="scss" scoped>
// @import url("../../assets/style/global.css");
.header {
  width: 100%;
  height: 100%;
  background: rgba(78, 120, 222, 1);
  box-shadow: 0px 2px 4px rgba(0, 13, 32, 0.22);
  opacity: 1;
  position: relative;
  .headerLeft {
    line-height: 75px;
    .leftIcon {
      margin-left: 23px;
      margin-right: 20px;
      color: #fff;
      font-size: 28px;
    }
    .leftTitle {
      width: 421px;
      font-size: 29px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      opacity: 1;
    }
  }
  .headerRight {
    position: absolute;
    display: inline-block;
    // width: 350px;
    height: 75px;
    line-height: 75px;
    top: 0;
    right: 27px;
    color: rgba(255, 255, 255, 1);
    .userIcon {
      line-height: 75px;
      display: inline-block;
      font-size: 28px;
      // margin-right: 12px;
      color: #dededd;
    }
    .nameBox {
      display: inline-block;
      // position: relative;
      text-align: center;
      // width: 250px;
      height: 20px;
      margin-right: 10px;
      margin-left: 10px;
    }
    .userName {
      // position: absolute;
      // width: 100%;
      // display: inline-block;
      // top: -5px;
      // left: 0;
      // margin-right: 34px;
      font-family: MicrosoftYaHei;
      font-size: 16px;
      // line-height: 17px;
      // height: 17px;
    }
    .loginPoper {
      color: rgba(255, 255, 255, 1);
      .el-icon-setting {
        font-size: 28px;
      }
      .loginIcon {
        right: 27px;
        line-height: 75px;
        font-size: 28px;
      }
    }
  }
}
</style>

<style lang="scss">
.el-dropdown-menu.el-popper {
  top: 63px !important;
  .el-dropdown-menu__item {
    span {
      display: inline-block;
      text-align: center;
      width: 60px;
    }
  }
}
// .el-popover {
//   top: 48px;
// }
</style>
