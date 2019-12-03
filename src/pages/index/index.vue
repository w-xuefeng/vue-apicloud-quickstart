<template>
  <div class="default">
    <span class="timecount" @click="go()">{{ time }}</span>
    <h1>欢迎使用</h1>
    <h1>vue-apicloud-quickstart</h1>
  </div>
</template>

<script>
import { LDK } from '@/utils';
import { tabOpts, frameGroupOpts, tabsFrameName } from '@/config/ui';

export default {
  data() {
    return {
      time: 5,
      timer: null
    };
  },
  methods: {
    go() {
      clearInterval(this.timer);
      if (this.$api.getStorage(LDK.loginState) === LDK.logined) {
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
      } else {
        this.$page.open(this.$n2p('login'));
      }
    }
  },
  onReady() {
    this.$bindKeyBackExitApp();
    this.timer = setInterval(() => {
      this.time--;
      if (this.time <= 0) {
        this.go();
      }
    }, 1000);
  }
};
</script>

<style lang="scss" scoped>
.default {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-direction: column;
  background: linear-gradient(45deg, rgb(96, 204, 247), rgb(4, 49, 133));
}
.timecount {
  width: 40px;
  height: 40px;
  color: #fff;
  background: rgba($color: #000000, $alpha: 0.5);
  position: absolute;
  top: 40px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
</style>
