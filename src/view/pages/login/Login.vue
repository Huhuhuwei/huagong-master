<template>
  <div class="body">
  <div class="login-container">
    <div class="combined-section">
      <el-card class="box-card" :body-style="{ padding: '0' }">
        <div class="login-content">
          <div class="login-image"></div>
          <div class="login-form">
            <h1>Login</h1>
            <br>
            <h2>Welcome to ChemScientist!</h2>
            <el-form
                :model="ruleForm"
                status-icon
                :rules="rules"
                ref="ruleForm"
                label-position="left"
                label-width="80px"
                class="login-from"
            >
              <el-form-item label="邮箱" prop="u_email">
                <el-input v-model="ruleForm.u_email"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="u_pwd">
                <el-input
                    type="password"
                    v-model="ruleForm.u_pwd"
                    autocomplete="off"
                ></el-input>
                <span class="forget-u_" >忘记密码？</span>
              </el-form-item>
            </el-form>
            <div class="btnGroup">
              <el-button
                  type="primary"
                  @click="submitForm('ruleForm')"
                  class="long-button no-border purple-background"
              >
                登录
              </el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
              <router-link to="/register" class="join-link">
                  <el-button class="join-button" >
                    快加入我们吧！
                  </el-button>
              </router-link>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        u_email: "",
        u_pwd: "",
      },
      rules: {
        u_email: [
          { required: true, message: "邮箱不能为空！", trigger: "blur" },
        ],
        u_pwd: [
          { required: true, message: "密码不能为空！", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formEmail) {
      // 验证表单中的邮箱密码是否有效，因为在上面rules中定义为了必填 required: true
      this.$refs[formEmail].validate((valid) => {
        // 点击登录后，让登录按钮开始转圈圈（展示加载动画）
        this.loading = true;
        // 如果经过校验，邮箱密码都不为空，则发送请求到后端登录接口
        if (valid) {
          let _this = this;
          // 使用 axios 将登录信息发送到后端
          this.axios({
            url: "/api/login",               // 请求地址
            method: "get",                       // 请求方法
            headers: {                            // 请求头
              "Content-Type": "application/json",
            },
            params: {                             // 请求参数
              u_email: _this.ruleForm.u_email,
              u_pwd: _this.ruleForm.u_pwd,
            },
          }).then((res) => { // 当收到后端的响应时执行该括号内的代码，res 为响应信息，也就是后端返回的信息
            if (res.data.code === "0") {  // 当响应的编码为 0 时，说明登录成功
              // 将用户信息存储到sessionStorage中
              sessionStorage.setItem("userInfo", JSON.stringify(res.data.data));
              // 跳转页面到首页
              this.$router.push('/home');
              // 显示后端响应的成功信息
              this.$message({
                message: res.data.msg,
                type: "success",
              });
            } else {  // 当响应的编码不为 0 时，说明登录失败
              // 显示后端响应的失败信息
              this.$message({
                message: res.data.msg,
                type: "warning",
              });
            }
            // 不管响应成功还是失败，收到后端响应的消息后就不再让登录按钮显示加载动画了
            _this.loading = false;
            console.log(res);
          });
        } else {  // 如果邮箱或密码有一个没填，就直接提示必填，不向后端请求
          console.log("error submit!!");
          this.loading = false;
          return false;
        }
      });
    },
    resetForm(formEmail) {
      this.$refs[formEmail].resetFields();
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
}
.body {
  min-height: 100vh;
  flex: 1;
  background: url('../../../../src/assets/login.svg') center/cover no-repeat fixed; /* Replace with the actual path to your image */
  margin: 0;
  padding: 0;
}
.combined-section {
  max-width: 45%; /* 调整为你希望的百分比或具体宽度 */
  width: 100%;
  margin: auto;
}

.box-card {
  width: 100%;
  margin: auto;
  overflow: hidden;
  box-sizing: border-box;
}

.login-content {
  display: flex;
  overflow: hidden;
  margin: 0px;
}

.login-image {
  flex: 1;
  padding: 10px;
  background: url("../../../../src/assets/login-1.png") left/cover no-repeat; /* 替换为你的图片路径 */
}

.login-form {
  flex: 1;
  height: 100%;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
}

.login-form h2 {
  margin-top: 0;
}

.login-from {
  margin-top: 20px;
}

.btnGroup {
  margin-top: 30px;
}
.long-button {
  width: 100%;
  margin-top: 20px; /* 调整按钮与上方元素的间距 */
}

.join-link {
  text-decoration: none; /* 移除超链接默认的下划线 */
}

.join-button {
  border: none; /* 移除按钮的边框 */
  padding: 0; /* 移除按钮的内边距 */
  color: #409EFF; /* 设置按钮文本颜色 */
  cursor: pointer; /* 显示手型光标，表明是可点击的 */
  justify-content: center;
}

.join-button:hover {
  color: #2170ef;
}

/* 按下时改变文本颜色 */
.join-button:active {
  color: #005aa0;
}
.purple-button {
  background-color: purple;
}
.no-border {
  border-color: transparent !important;
}
.forget-password {
  font-size: 13px;
  color: rgba(0, 0, 0, 0.4); /* 设置链接颜色，你可以根据需要调整 */
  cursor: pointer;
  margin-left: auto; /* 将 "Forget password?" 推到右侧 */
  text-align: right; /* 如果需要，可以居右靠齐 */
}

.forget-password:hover {
  text-decoration: underline;
}

</style>
