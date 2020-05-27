<template>
  <div class="home" @click="proxyClick">
    <div class="header">
      {{ title }}
    </div>
    <img alt="Vue logo" src="res/img/logo.png" width="50%" />
    <HelloWorld msg="Welcome to Your Vue.js App with APICloud" />
    <div class="logout" @click="logout">退出登录</div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  statusBar: {
    color: 'transparent',
    style: 'light'
  },
  components: {
    HelloWorld
  },
  data() {
    return {
      title: 'Vue APICloud Quickstart'
    }
  },
  methods: {
    logout () {
      this.$api.rmStorage('userinfo')
      this.$page.push({ name: 'login' })
    },
    proxyClick (event) {
      const { target } = event
      if (target.tagName === 'A') {
        event.preventDefault()
        this.$page.open(this.$n2p('web'), {
          name: `web-window-${target.href}`,
          pageParam: {
            name: `web-frame-${target.href}`,
            url: target.href
          }
        })
      }
    }
  },
  onReady () {
    this.$bindKeyBackExitApp()
  }
}
</script>

<style scoped>
.home {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 100px;
}
.home img {
  max-width: 300px;
}
.home .logout {
  width: 50%;
  max-width: 200px;
  height: 40px;
  line-height: 40px;
  margin: 20px auto;
  color: #ff1515;
  border: 1px solid #f32121;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.home .header {
  width: 100%;
  padding: 20px 10px 0 10px;
  height: 60px;
  background-color: #42b983;
  color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.45) 1px 1px 5px;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
}
</style>
