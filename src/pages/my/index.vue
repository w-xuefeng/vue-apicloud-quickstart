<template>
  <div class="my" :style="{ paddingBottom: $tabRH() + 'px' }">
    <div class="content">
      <van-list class="setting-list">
        <van-cell>
          <span>手势解锁</span>
          <van-switch
            v-model="setting.gestureunlock"
            @change="setGestureunlock"
          />
        </van-cell>
      </van-list>
      <van-button @click="logout()" type="danger" class="logoutBtn">
        退出登录
      </van-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { LDK } from '@/utils';
import { Button, List, Cell, Switch } from 'vant';

Vue.use(Switch);
Vue.use(Button);
Vue.use(List);
Vue.use(Cell);

export default {
  name: 'my',
  data() {
    return {
      setting: this.$api.getStorage(LDK.setting) || {
        gestureunlock: false
      }
    };
  },
  computed: {
    winWidth() {
      return this.$getWinSize().winWidth;
    }
  },
  methods: {
    setGestureunlock() {
      this.$api.setStorage(LDK.setting, this.setting);
    },
    logout() {
      this.$api.rmStorage(LDK.user);
      this.$api.rmStorage(LDK.loginState);
      this.$page.open(this.$n2p('login'));
    }
  },
  onReady() {
    this.$bindKeyBackExitApp();
  }
};
</script>

<style lang="scss" scoped>
.my {
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    width: 100%;
    .setting-list {
      .van-cell__value {
        display: flex;
        justify-content: space-between;
      }
    }
    .logoutBtn {
      width: 90%;
      display: block;
      margin: 30px auto;
    }
  }
}
</style>
