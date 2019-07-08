<template>
  <div id="home" v-on:keyup.enter="login()">
    <div id="content">
      <el-form ref="form" :model="form" label-width="80px">
        <h3 class="title">老人服务资源网</h3>
        <el-form-item style="padding-top:20px" label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" placeholder="请输入密码" v-model="form.password" clearable></el-input>
        </el-form-item>
        <el-button class="login-button" @click="loginHandleClick">登录</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import { loginFnc } from "../../model/login/index";
import store from "../../store/store";
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      centerDialogVisible: false
    };
  },
  methods: {
    loginHandleClick() {
      if (!this.form.username) {
        this.$message.error("请输入用户名");
        return;
      }
      if (!this.form.password) {
        this.$message.error("请输入密码");
        return;
      }
      loginFnc(this.form)
        .then(res => {
          let loginInfo = res.data.result;
          store.dispatch("updateUserInfoAsync", loginInfo);
          sessionStorage.setItem("userInfo", loginInfo);
          sessionStorage.setItem("userId", loginInfo.userId);
          sessionStorage.setItem("headImg", loginInfo.headImg);
          sessionStorage.setItem("username", loginInfo.username);
          this.$router.push({
            path: "/merchant-list"
          });
            this.$message({
              type: "success",
              message: "登录成功!"
            });
        })
        .catch(err => {
          this.$message("用户名或密码错误");
        });
    }
  },
  mounted() {
    setIndexStyle();
  }
};
// 设置下方区域的最小高度
function setIndexStyle() {
  let bodyHeight = document.documentElement.clientHeight; // body 高度
  let bodyWidth = document.documentElement.clientWidth; // body 宽度
  let bottomHeight = (bodyHeight - 300) / 2;
  let bottomWidth = (bodyWidth - 400) / 2;
  document.getElementById("content").style.paddingTop = bottomHeight + "px";
  document.getElementById("content").style.paddingLeft = bottomWidth + "px";
  document.getElementById("home").style.height = bodyHeight - 2 + "px";
}
</script>
<style scoped>
#home {
  background: #000000 url("../../assets/images/background_login.jpg") no-repeat
    fixed center;
  background-size: 100% 100%;
}
#home #content {
  width: 400px;
}
#home #content form {
  width: 400px;
  height: 295px;
  padding: 10px 50px;
  background-color: #ffffff5e;
  border-radius: 20px;
}
#home #content .el-form-item__content {
  width: 310px;
}
#home #content .el-input__inner {
  width: 300px;
}
#home #content .el-button {
  width: 200px;
}
.login-button {
  margin: 20px 0px 0px 110px;
}
.title {
  text-align: center;
  color: #2c3e50;
}
</style>