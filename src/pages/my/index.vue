<template>
  <div class="my" :style="{ paddingBottom: $tabRH() + 'px' }">
    <div class="content">
      <Button @click="logout()" type="danger" class="logoutBtn">
        退出登录
      </Button>
    </div>
  </div>
</template>

<script>
import { LDK } from '@/utils';
import { Button } from 'vant';

export default {
  name: 'my',
  components: {
    Button
  },
  data() {
    return {};
  },
  computed: {
    winWidth() {
      return this.$getWinSize().winWidth;
    }
  },
  methods: {
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
    .list {
      width: 100%;
    }
    .logoutBtn {
      width: 90%;
      display: block;
      margin: 30px auto;
    }
  }
}
</style>
