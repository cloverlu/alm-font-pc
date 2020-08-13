<!--
  功能：登录
  作者：sunhua
  邮箱：947545659@qq.com
  时间：2020年07月02日 08:54:09
-->
<template>
  <div class="login" v-show="visible">
    <div class="content">
      <div class="position">
        <div class="left">
          <div class="imgbox">
            <img src="../../assets/img/leftIcon.png" alt />
          </div>
        </div>
        <div class="right">
          <div class="coName">
            <div class="title">小企业贷后现场录入系统</div>
            <div class="subTitle">Small Enterprises On-Site Entry After Loan System</div>
          </div>
          <div class="userInfo">
            <el-input placeholder="账号" v-model="emplCode">
              <i slot="prepend" class="iconfont iconwode-01"></i>
            </el-input>
          </div>
          <div class="userInfo">
            <el-input placeholder="密码" v-model="password" show-password @change="enterLogin">
              <i slot="prepend" class="iconfont iconmima-01"></i>
            </el-input>
          </div>
          <div class="btn">
            <el-button type="info" @click="submit">立即登录</el-button>
          </div>
        </div>
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
      visible: true,
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
      const params = {
        // emplCode: this.$refs.emplCode.value,
        // password: this.$refs.password.value
        emplCode:
          this.emplCode.replace(/^\s+|\s+$/g, "") ||
          sessionStorage.getItem("emplCode"),
        password:
          this.password.replace(/^\s+|\s+$/g, "") ||
          sessionStorage.getItem("emplPwd")
      };
      login(this, { ...params }).then(res => {
        if (res.data.returnCode === "200000") {
          const {
            emplCode,
            emplName,
            emplPwd,
            emplSign,
            menuList,
            noticeFlag,
            orgCode,
            orgName,
            postCode,
            id
          } = res.data.data;
          sessionStorage.setItem("emplCode", emplCode);
          sessionStorage.setItem("emplName", emplName);
          sessionStorage.setItem("id", id);
          sessionStorage.setItem("emplPwd", emplPwd);
          sessionStorage.setItem("emplSign", emplSign);
          sessionStorage.setItem("noticeFlag", noticeFlag);
          sessionStorage.setItem("orgCode", orgCode);
          sessionStorage.setItem("orgName", orgName);
          sessionStorage.setItem("postCode", postCode);
          sessionStorage.setItem("menuList", JSON.stringify(menuList));
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
      this.visible = false;
      alert("拿到token");
      getUserInfo(this, { accessToken }).then(res => {
        alert(res.data);
        if (res.data.returnCode === "200000") {
          const {
            emplCode,
            emplName,
            emplPwd,
            emplSign,
            menuList,
            noticeFlag,
            orgCode,
            orgName,
            postCode,
            id
          } = res.data.data;
          sessionStorage.setItem("emplCode", emplCode);
          sessionStorage.setItem("emplName", emplName);
          sessionStorage.setItem("id", id);
          sessionStorage.setItem("emplPwd", emplPwd);
          sessionStorage.setItem("emplSign", emplSign);
          sessionStorage.setItem("noticeFlag", noticeFlag);
          sessionStorage.setItem("orgCode", orgCode);
          sessionStorage.setItem("orgName", orgName);
          sessionStorage.setItem("postCode", postCode);
          sessionStorage.setItem("menuList", JSON.stringify(menuList));
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
          setTimeout(() => {
            this.visible = true;
          }, 1000);
        }
      });
    } else {
      this.visible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
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
    box-sizing: border-box;
    width: 1200px;
    height: 600px;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    background: rgba(255, 255, 255, 1);
    opacity: 1;
    border-radius: 20px;
    padding-top: 88px;
    .position {
      width: 100%;
      height: 100%;
      position: relative;
      .left {
        position: absolute;
        left: 27px;
        top: 20px;
        .imgbox {
          img {
            vertical-align: middle;
          }
        }
      }
      .right {
        position: absolute;
        left: 600px;
        top: 0;
        width: 480px;
        height: 460px;
        .coName {
          height: 98px;
          .title {
            display: block;
            width: 480px;
            height: 38px;
            font-size: 38px;
            text-align: center;
            font-family: SourceHanSansCN-Medium;
            line-height: 38px;
            color: rgba(92, 95, 104, 1);
            margin-bottom: 10px;
            opacity: 1;
          }
          .subTitle {
            width: 480px;
            height: 18px;
            font-size: 16px;
            text-align: center;
            font-family: SourceHanSansCN-Medium;
            line-height: 18px;
            color: rgba(92, 95, 104, 1);
            opacity: 1;
          }
        }
        .userInfo {
          width: 480px;
          height: 75px;
          margin: 0 auto 40px;
          border: none;
          border-radius: 5px;
          background: rgba(244, 244, 248, 1);
          /deep/.el-input {
            height: 100%;
            background: rgba(244, 244, 248, 1);
            /deep/.el-input-group__prepend {
              border: none;
              background: rgba(244, 244, 248, 1);
            }
            /deep/.el-input__inner {
              height: 100%;
              line-height: 75px;
              background: rgba(244, 244, 248, 1);
              border: none;
              font-size: 24px;
              color: rgba(158, 158, 166, 1);
            }
            .iconwode-01 {
              color: rgba(158, 158, 171, 1);
              font-size: 21px;
            }
            .iconmima-01 {
              color: rgba(158, 158, 171, 1);
              font-size: 21px;
            }
          }
        }
        .btn {
          width: 298px;
          height: 65px;
          line-height: 65px;
          margin: 70px auto 0;
          /deep/.el-button {
            width: 100%;
            height: 100%;
            font-size: 18px;
            color: rgba(255, 255, 255, 1);
            background: rgba(88, 90, 98, 1);
            border-radius: 15px;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
.userInfo {
  .el-input-group__prepend {
    height: 100%;
    border: none;
    background: rgba(244, 244, 248, 1);
  }
  .el-input__inner {
    height: 75px !important;
    line-height: 75px;
    background: rgba(244, 244, 248, 1);
    border: none;
    font-size: 24px;
    overflow: hidden;
    color: rgba(158, 158, 166, 1);
  }
}
</style>