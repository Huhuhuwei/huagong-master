<template>
  <div class = "body">
  <div class="register-container">
    <div class="combined-section">
      <el-card class="box-card" :body-style="{ padding: '0' }">
        <div class="register-content">
          <div class="register-image"></div>
          <div class="register-form">
            <h1>Create your account</h1>
            <el-form
                :model="ruleForm"
                status-icon
                :rules="rules"
                ref="ruleForm"
                label-position="left"
                label-width="80px"
                class="demo-ruleForm"
            >
              <el-form-item label="邮箱" prop="u_email" class="form-item">
                <el-input v-model="ruleForm.u_email"></el-input>
              </el-form-item>
              <el-form-item label="用户名" prop="u_name" class="form-item">
                <el-input v-model="ruleForm.u_name"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="u_pwd" class="form-item">
                <el-input
                    type="password"
                    v-model="ruleForm.u_pwd"
                    autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="password" class="form-item">
                <el-input
                    type="password"
                    v-model="ruleForm.password"
                    autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>

            <div class="btnGroup">
              <el-button type="primary" @click="submitForm('ruleForm')" >创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
              <el-button @click="goBack">返回</el-button>
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
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.u_pwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        u_email: "",
        u_name: "",
        u_pwd: "",
        password: "",
      },
      rules: {
        u_email: [
          { required: true, message: "邮箱不能为空！", trigger: "blur" },
        ],
        u_name: [
          { required: true, message: "用户名不能为空！", trigger: "blur" },
        ],
        u_pwd: [{ required: true, validator: validatePass, trigger: "blur" }],
        password: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        this.loading = true;
        if (valid) {
         let _this = this;
          let param = {
            u_name: this.ruleForm.u_name,
            u_pwd: this.ruleForm.u_pwd,
            u_email: this.ruleForm.u_email,
          };
          this.axios({     // axios 向后端发起请求
            url: "/api/register",  // 请求地址
            method: "post",             // 请求方法
            headers: {                  // 请求头
              "Content-Type": "application/json",
            },
            data: param,
          }).then((res) => { // 当收到后端的响应时执行该括号内的代码，res 为响应信息，也就是后端返回的信息
            if (res.data.code === '0') {  // 当响应的编码为 0 时，说明注册成功
              // 显示后端响应的成功信息
              this.$message({
                message: res.data.msg,
                type: "success",
              });
            }else{  // 当响应的编码不为 0 时，说明注册失败
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
        } else { // 如果账号或密码有一个没填，就直接提示必填，不向后端请求
          console.log("error submit!!");
          this.loading = false;
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.register-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;

}

.combined-section {
  max-width: 70%; /* 调整为你希望的百分比或具体宽度 */
  width: 100%;
  margin: auto;
}

.box-card {
  width: 60%;
  margin: auto;
  overflow: hidden;
}

.register-content {
  display: flex;
}
.body {
  min-height: 100vh;
  flex: 1;
  background: url('../../../../src/assets/login.svg') center/cover no-repeat fixed; /* Replace with the actual path to your image */
  margin: 0;
  padding: 0;
}
.register-image {
  flex: 1;
  padding: 10px;
  background: url("../../../assets/login-1.png") left/cover no-repeat; /* 替换为你的图片路径 */
}

.register-form {
  flex: 1;
  padding: 20px;
}

.register-form h2 {
  margin-top: 0;
}

.demo-ruleForm {
  margin-top: 20px;
}

.btnGroup {
  margin-top: 20px;
}

.form-item {
  margin-bottom: 20px; /* 调整适当的间距值 */
}
</style>
