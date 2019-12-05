<template>
  <div class="login">
    <div class="loginBody">
      <div class="logo">
        <h1>登录</h1>
      </div>
      <div class="form">
        <Field placeholder="请输入账号" v-model="user" clearable />
        <Field placeholder="请输入密码" v-model="password" type="password" />
        <Button
          class="login-button"
          type="info"
          @click="login()"
          :loading="loading"
          :disabled="loading"
          loading-text="正在登录中..."
        >
          登录
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import { LDK } from '@/utils';
import { tabOpts, frameGroupOpts, tabsFrameName } from '@/config/ui';
import { Button, Field, Notify } from 'vant';

export default {
  name: 'login',
  components: {
    Button,
    Field
  },
  data() {
    return {
      loading: false,
      user: '',
      password: ''
    };
  },
  methods: {
    goHome() {
      this.$pageWithHead({
        title: '首页',
        name: 'home',
        bindKeyBackExitApp: true,
        tab: true,
        tabsFrameName,
        tabOpts,
        frameGroup: true,
        frameGroupOpts
      });
    },
    setLoginInfo(user) {
      this.$api.setStorage(LDK.user, user);
      this.$api.setStorage(LDK.loginState, LDK.logined);
    },
    login() {
      if (this.user && this.password) {
        this.loading = true;
        setTimeout(() => {
          if (this.password == '000000') {
            Notify({
              message: '登录成功',
              type: 'success'
            });
            this.setLoginInfo({
              user: this.user,
              password: this.password
            });
            setTimeout(() => {
              this.goHome();
            }, 600);
          } else {
            Notify({
              message: '密码错误'
            });
          }
          this.loading = false;
        }, 1000);
      } else {
        Notify({
          message: '请输入账号和密码'
        });
      }
    }
  },
  onReady() {
    Notify.setDefaultOptions({ className: 'gl-notify' });
    this.$bindKeyBackExitApp();
    if (this.$api.getStorage(LDK.loginState) === LDK.logined) {
      this.goHome();
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, rgb(5, 127, 228), rgb(0, 150, 125));
  .loginBody {
    width: 100%;
    max-width: 400px;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    .logo {
      color: #ffffff;
      margin: 30px 0;
    }
    .form {
      width: 80%;
      .login-button {
        margin-top: 15px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
