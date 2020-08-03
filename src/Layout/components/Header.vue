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
      <el-popconfirm
        confirmButtonText="确定"
        @onConfirm="loginOut"
        cancelButtonText="取消"
        icon="el-icon-info"
        iconColor="red"
        title="是否确认退出"
      >
        <i class="iconfont iconguanji-01 loginIcon" slot="reference"></i>
      </el-popconfirm>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      userName: sessionStorage.getItem("emplName")
    };
  },
  methods: {
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
    .loginIcon {
      // position: absolute;
      right: 27px;
      line-height: 75px;
      font-size: 28px;
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
  }
}
</style>

<style lang="scss">
.el-popper {
  top: 48px;
}
.el-popover {
  top: 48px;
}
</style>
