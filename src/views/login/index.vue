<!--
  功能：登录
  作者：sunhua
  邮箱：947545659@qq.com
  时间：2020年07月02日 08:54:09
-->
<template>
  <div class="login">
    <div class="content">
      <div class="coName">
        <i class="iconfont iconjiedaixiaofeirenzheng-01 leftIcon"></i>
        <span>小企业无纸化贷后管理系统</span>
      </div>
      <div class="userInfo">
        <el-input placeholder="请输入您的用户名" v-model="emplCode">
          <i slot="prepend" class="iconfont iconwode-01"></i>
        </el-input>
      </div>
      <div class="userInfo">
        <el-input placeholder="请输入您的密码" v-model="password" show-passWord @change="enterLogin">
          <i slot="prepend" class="iconfont iconmima-01"></i>
        </el-input>
      </div>
      <div class="btn">
        <el-button type="primary" @click="submit">安全登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "../../api/login";
import { getUserInfo } from "../../api/users";
export default {
  // 组件名称
  name: "Login",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      emplCode: "",
      password: ""
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    GetQueryValue(queryName) {
      var query = decodeURI(window.location.search.substring(1));
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == queryName) {
          return pair[1];
        }
      }
    },
    submit() {
      console.log(this.emplCode, this.password);
      const params = {
        emplCode: this.emplCode,
        password: this.password
      };
      login(this, { ...params }).then(res => {
        if (res.data.returnCode === "200000") {
          const {
            emplCode,
            emplName,
            menuList,
            noticeFlag,
            orgCode,
            orgName,
            postCode
          } = res.data.data;
          console.log(res.data.data);
          // this.$cookies.set("emplCode", emplCode);
          // this.$cookies.set("emplName", emplName);
          // this.$cookies.set("menuList", JSON.stringify(menuList));
          localStorage.setItem("emplCode", emplCode);
          localStorage.setItem("emplName", emplName);
          localStorage.setItem("noticeFlag", noticeFlag);
          localStorage.setItem("orgCode", orgCode);
          localStorage.setItem("orgName", orgName);
          localStorage.setItem("postCode", postCode);
          localStorage.setItem("menuList", JSON.stringify(menuList));
          menuList.map(item => {
            if (item.children && item.children.length) {
              item.children.map(i => {
                (i.path = `/${i.path}`), (i.index = `${i.path}`);
              });
            }
          });
          let first = menuList[0].children[0].path;
          this.$router.push(first);
        } else {
          this.$message({
            message: "登陆失败",
            type: "error"
          });
        }
      });
    },
    enterLogin() {
      this.submit();
    }
  },
  mounted() {
    var accessToken = this.GetQueryValue("accessToken");
    if (accessToken) {
      getUserInfo(this, { accessToken });
      console.log("获取到token");
    } else {
      console.log("无法获取token");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/global.scss";
.login {
  width: 100%;
  height: 100%;
  background: url("../../assets/img/bg.png") no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  position: relative;
  .content {
    position: absolute;
    width: 563px;
    height: 400px;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    background: linear-gradient(
      3deg,
      rgba(10, 52, 135, 1) 0%,
      rgba(0, 136, 203, 1) 100%
    );
    opacity: 1;
    border-radius: 10px;
    .coName {
      text-align: center;
      height: 36px;
      font-size: 36px;
      line-height: 36px;
      color: rgba(255, 255, 255, 1);
      opacity: 1;
      margin-top: 51px;
      margin-bottom: 40px;
      .leftIcon {
        margin-right: 10px;
      }
    }
    .userInfo {
      width: 450px;
      margin: 20px auto 0;
      border: 1px solid rgba(110, 239, 252, 1);
      border-radius: 5px;
      /deep/.el-input-group__prepend {
        border: none;
        background-color: #0e6cb0;
      }
      /deep/.el-input__inner {
        background-color: #0e6cb0;
        border: none;
        color: rgba(255, 255, 255, 1);
      }
      .iconwode-01 {
        color: rgba(255, 255, 255, 1);
      }
      .iconmima-01 {
        color: rgba(255, 255, 255, 1);
      }
    }
    .btn {
      width: 450px;
      height: 50px;
      line-height: 50px;
      margin: 70px auto 0;
      /deep/.el-button {
        width: 100%;
        height: 100%;
        font-size: 28px;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>
