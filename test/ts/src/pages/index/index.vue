<template>
  <div class="app flex-column-center">
    <div class="app-adverting flex-column-center">
      <div class="app-adverting-cover flex-center">
        <div class="app-adverting-cover-va flex-center">
          <div class="common-cover app-adverting-cover-va-0"></div>
          <div class="common-cover app-adverting-cover-va-1"></div>
          <div class="common-cover app-adverting-cover-va-2"></div>
          <div class="common-cover app-adverting-cover-va-3"></div>
        </div>
        <div class="app-adverting-cover-q flex-center">
          <div class="common-cover app-adverting-cover-q-1"></div>
          <div class="common-cover app-adverting-cover-q-2"></div>
        </div>
      </div>
      <div class="app-adverting-text flex-center">
        <span class="app-adverting-text-vue">Vue</span>
        <span>与</span>
        <span class="app-adverting-text-apicloud">apicloud</span>
        <span>齐飞， web 共 原生一色！</span>
      </div>
      <div class="app-loading" :class="{ timeout: timeout <= 0 }">
        <div v-if="timeout <= 0" @click="enterApp" class="app-loading-text">{{ text }}</div>
        <svg
          :class="{ 'svg-timeout': timeout <= 0 }"
          data-v-1badc801
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
          style="margin: auto; display: block;"
        >
          <g data-v-1badc801>
            <circle data-v-1badc801 cx="73.6342" cy="50" r="4" fill="#2f7e5c">
              <animate
                data-v-1badc801
                attributeName="cx"
                repeatCount="indefinite"
                dur="0.9803921568627451s"
                values="95;35"
                keyTimes="0;1"
                begin="-0.6834s"
              />
              <animate
                data-v-1badc801
                attributeName="fill-opacity"
                repeatCount="indefinite"
                dur="0.9803921568627451s"
                values="0;1;1"
                keyTimes="0;0.2;1"
                begin="-0.6834s"
              />
            </circle>
            <circle data-v-1badc801 cx="94.8584" cy="50" r="4" fill="#2f7e5c">
              <animate
                data-v-1badc801
                attributeName="cx"
                repeatCount="indefinite"
                dur="0.9803921568627451s"
                values="95;35"
                keyTimes="0;1"
                begin="-0.3366s"
              />
              <animate
                data-v-1badc801
                attributeName="fill-opacity"
                repeatCount="indefinite"
                dur="0.9803921568627451s"
                values="0;1;1"
                keyTimes="0;0.2;1"
                begin="-0.3366s"
              />
            </circle>
            <circle data-v-1badc801 cx="55.4583" cy="50" r="4" fill="#2f7e5c">
              <animate
                data-v-1badc801
                attributeName="cx"
                repeatCount="indefinite"
                dur="0.9803921568627451s"
                values="95;35"
                keyTimes="0;1"
                begin="0s"
              />
              <animate
                data-v-1badc801
                attributeName="fill-opacity"
                repeatCount="indefinite"
                dur="0.9803921568627451s"
                values="0;1;1"
                keyTimes="0;0.2;1"
                begin="0s"
              />
            </circle>
          </g>
          <g data-v-1badc801 transform="translate(-15 0)">
            <path
              data-v-1badc801
              d="M50 50L20 50A30 30 0 0 0 80 50Z"
              fill="#2196f3"
              transform="rotate(30.6875 50 50)"
            >
              <animateTransform
                data-v-1badc801
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                dur="0.9803921568627451s"
                values="0 50 50;45 50 50;0 50 50"
                keyTimes="0;0.5;1"
              />
            </path>
            <path
              data-v-1badc801
              d="M50 50L20 50A30 30 0 0 1 80 50Z"
              fill="#2196f3"
              transform="rotate(-30.6875 50 50)"
            >
              <animateTransform
                data-v-1badc801
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                dur="0.9803921568627451s"
                values="0 50 50;-45 50 50;0 50 50"
                keyTimes="0;0.5;1"
              />
            </path>
            <path
              data-v-1badc801
              d="M50 50L20 50A30 30 0 0 0 80 50Z"
              fill="#2196f3"
              transform="rotate(90 50 50)"
            />
          </g>
        </svg>
      </div>
    </div>
    <div class="app-logo flex-center">
      <img alt="app-logo" src="res/img/logo.png" height="80%" />
      <div class="app-logo-text flex-column">
        <span>Vue-APICloud-Quickstart</span>
        <span class="app-logo-text-author">Powered by w-xuefeng</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { VueAPICloud } from 'vue-apicloud-quickstart'

@VueAPICloud
@Component({ statusBar: 'transparent' })
export default class IndexIndex extends Vue {
  timeout = 5
  timer?: number = undefined
  text = ''

  enterApp () {
    const isLogin = this.$api.getStorage('userinfo')
    this.$page.push({ name: isLogin ? 'home' : 'login' })
  }

  count () {
    clearInterval(this.timer)
    this.timer = window.setInterval(() => {
      this.timeout--
      if (this.timeout <= 0) {
        clearInterval(this.timer)
        setTimeout(() => {
          this.text = '开启探索旅程'
        }, 800)
      }
    }, 1000)
  }

  onReady () {
    this.count()
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

.common-cover {
  width: 20px;
  height: 150px;
  border-radius: 20px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
  overflow: hidden;
}

.app-adverting {
  height: 90%;
  width: 100%;
  background-color: #ffffff;
}

.app-adverting-cover {
  width: 100%;
  height: 30vh;
  margin-left: 20px;
}

.app-adverting-cover-va {
  width: 50%;
  height: 100%;
}

.app-adverting-cover-va-0 {
  background-color: #42b983;
  transform: rotate(-25deg);
  margin-right: 40px;
}

.app-adverting-cover-va-1 {
  background-color: #42b983;
  transform: rotate(25deg);
}

.app-adverting-cover-va-2 {
  background-color: #95ba1f;
  transform: rotate(-25deg);
  margin-left: 40px;
}

.app-adverting-cover-va-3 {
  height: 80px;
  margin-left: -50px;
  background-color: #35495e;
  transform: rotate(-90deg);
}

.app-adverting-cover-q {
  width: 50%;
  height: 100%;
}

.app-adverting-cover-q-1 {
  left: 20px;
  width: 62px;
  height: 100px;
  background-color: transparent;
  border: 20px solid #2196f3;
}

.app-adverting-cover-q-2 {
  margin-top: 100px;
  margin-left: -30px;
  height: 90px;
  background-color: #2196f3;
  transform: rotate(-25deg);
}

.app-adverting-text {
  color: #2196f3;
  margin-top: 30px;
  transition: all 300ms;
}

.app-adverting-text-vue {
  color: #42b983;
  margin: 0 5px;
}

.app-adverting-text-apicloud {
  color: #95ba1f;
  margin: 0 5px;
}

.app-logo {
  height: 10%;
  width: 100%;
  background-color: #f6f6f6;
}

.app-logo-text {
  color: #0d8c79;
  margin-left: 10px;
  font-size: 18px;
}

.app-loading {
  width: 50px;
  height: 50px;
  transition: all 2s;
  transform: translateY(80px);
  overflow: hidden;
}

.app-loading-text {
  width: 100%;
  height: 100%;
  color: #2196f3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 2s;
  overflow: hidden;
}

.app-logo-text-author {
  font-size: 12px;
}

.svg-timeout {
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
  left: -100%;
  bottom: 100%;
}

.timeout {
  width: 50%;
  max-width: 200px;
  color: #2196f3;
  border: 1px solid #2196f3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 2s;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

@media screen and (min-width: 400px) {
  .app-adverting-text {
    font-size: 20px;
    transition: all 300ms;
  }
}

@media screen and (min-width: 500px) {
  .app-adverting-text {
    font-size: 26px;
    transition: all 300ms;
  }
}
</style>
