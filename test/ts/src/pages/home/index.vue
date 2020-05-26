<template>
  <div class="home" @click="proxyClick">
    <img alt="Vue logo" src="res/img/logo.png" width="50%" />
    <HelloWorld msg="Welcome to Your Vue.js App with APICloud" />
    <div class="logout" @click="logout">退出登录</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { VueAPICloud } from 'vue-apicloud-quickstart'
import HelloWorld from '@/components/HelloWorld.vue'

@VueAPICloud
@Component({
  components: {
    HelloWorld
  }
})
export default class HomeIndex extends Vue {
  logout () {
    this.$api.rmStorage('userinfo')
    this.$page.push({ name: 'login' })
  }

  proxyClick(event: MouseEvent) {
    const target = event.target as HTMLAnchorElement;
    const webPath = this.$n2p('web');
    if (webPath && target.tagName === 'A') {
      event.preventDefault()
      this.$page.open(webPath, {
        name: `web-window-${target.href}`,
        pageParam: {
          name: `web-frame-${target.href}`,
          url: target.href
        }
      })
    }
  }

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
  margin-top: 60px;
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
</style>
