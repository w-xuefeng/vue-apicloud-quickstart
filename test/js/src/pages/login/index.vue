<template>
  <div class="login flex-column-center">
    <h1 class="login-title">Welcome VAQ</h1>
    <div class="login-form flex-column-center">
      <input class="login-form-input" type="text" placeholder="请输入用户名" v-model="user">
      <div class="login-form-tip">用户名:任意非空字符串</div>
      <input class="login-form-input" type="password" placeholder="请输入密码" v-model="password">
      <div class="login-form-tip">密码:{{ passwordVal }}</div>
      <div class="login-form-btn" @click="login">{{ loading ? '正在登录中...' : '登录' }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',  
  statusBar: {
    color: 'transparent',
    style: 'light'
  },
  data () {
    return {
      user: '',
      password: '',
      passwordVal: '123456',
      loading: false
    }
  },
  methods: {
    saveUserInfo (userinfo) {
      this.$api.setStorage('userinfo', userinfo)
    },
    login () {
      if (this.loading) return
      if (!this.user.trim()) {
        this.$toast({ msg: '用户名不能为空', location: 'middle' })
        return
      }
      if (!this.password.trim()) {
        this.$toast({ msg: '密码不能为空', location: 'middle' })
        return
      }
      this.loading = true
      setTimeout(() => {
        this.loading = false
        if (this.password !== this.passwordVal) {
          return this.$toast({ msg: '密码错误' })
        }
        this.$toast({ msg: '登录成功' })
        this.saveUserInfo({ user: this.user })
        this.$page.push({ name: 'home' })
      }, 1000)
    }
  },
  onReady () {
    this.$bindKeyBackExitApp()
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
}
</style>
<style scoped>
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.flex-column-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.login {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-image: linear-gradient(45deg, #42b983, #2196f3);
}

.login-title {
  color: #ffffff;
}

.login-form {
  width: 90%;
  max-width: 300px;
  margin: 20px auto;
}

.login-form-input {
  outline: none;
  height: 30px;
  width: 100%;
  margin: 10px;
  border: none;
  background: transparent;
  color: #ffffff;
  border-bottom: 1px solid #ffffff;
}

.login-form-tip {
  width: 100%;
  text-align: left;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.65)
}

.login-form-btn {
  padding: 5px 0;
  height: 34px;
  width: 100%;
  line-height: 34px;
  text-align: center;
  border: 1px solid #ffffff;
  color: #ffffff;
  user-select: none;
  cursor: pointer;
  margin: 20px;
  border-radius: 34px;
}
</style>
