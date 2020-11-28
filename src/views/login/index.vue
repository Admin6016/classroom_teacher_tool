<template>
  <div class="login-container">
    <!--  background: url("https://v1.alapi.cn/api/bing");
  background-size: cover;  -->
    <div class="div_blur"/>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title" style="color:gainsboro">{{ defaultSettings.title }}</h3>
      </div>

      <el-form-item prop="uid">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input

          ref="uid"
          v-model="loginForm.uid"
          placeholder="用户ID"
          name="uid"
          type="number"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-button

        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px;"
        @click.native.prevent="handleLogin"
      >登录
      </el-button>

      <!--      <div class="tips">-->
      <!--        <span style="margin-right:20px;">用户ID</span>-->
      <!--        <span> 密码</span>-->
      <!--      </div>-->
    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

const defaultSettings = require('@/settings')
export default {
  name: 'Login',
  mounted() {
    //ready
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入合适的ID'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码应该至少为6位'))
      } else {
        callback()
      }
    }
    return {
      defaultSettings,
      loginForm: {
        uid: '',
        password: ''
      },
      loginRules: {
        uid: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {

    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.div_blur {

  border-radius: 50px;
  border: 1px solid rgba(183, 183, 183, 0.47);
  filter: blur(5px) brightness(70%);
  //left: 30%;
  //top: 13%;
  width: 100%;
  height: 100%;
  background-size: 150% 150%;
  position: absolute;
  background: url("https://v1.alapi.cn/api/bing") center;
}

.login-container {

  min-height: 100%;
  width: 100%;
  background-size: 150% 150%;
  position: absolute;
  //background: url("https://v1.alapi.cn/api/bing") center;
  //background-color: white;
  //background: url("https://vkceyugu.cdn.bspapp.com/VKCEYUGU-student-data/b8a3b770-2a41-11eb-b680-7980c8a877b8.jpg");

  overflow: hidden;

  .login-form {
    overflow: hidden;
    border-radius: 20px;
    position: relative;
    width: 520px;
    max-width: 60%;
    padding: 40px 35px 10px;
    margin: 240px auto;
    //background-color: white;
    background-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0px 0px 15px gray;
    //background: url("https://v1.alapi.cn/api/bing") center;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
