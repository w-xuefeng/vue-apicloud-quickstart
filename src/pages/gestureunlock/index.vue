<template>
  <div class="body">
    <div id="unlock"></div>
  </div>
</template>

<script>
import { LDK } from '@/utils';
import { unlockSuccess } from '@/config/eventName';
import { gestureUnlockFrameName } from '@/config/ui';
import h5lock from '@/utils/h5lock';

export default {
  name: 'gestureulock',
  methods: {
    unlockSuccess() {
      this.api.sendEvent({ name: unlockSuccess });
      this.api.closeFrame({ name: gestureUnlockFrameName });
    },
    savePassword(password) {
      const passwordIndex = password.map(e => e.index);
      alert(JSON.stringify(passwordIndex));
    },
    logout() {
      this.$api.rmStorage(LDK.user);
      this.$api.rmStorage(LDK.loginState);
      this.$page.open(this.$n2p('login'));
    }
  },
  mounted() {
    h5lock.setUnlockSuccessCallBack(this.unlockSuccess);
    h5lock.setSavePasswordSuccessCallBack(this.savePassword);
    h5lock.setUnlockFailedCallBack(this.logout);
    h5lock.init('#unlock');
  }
};
</script>

<style lang="scss" scoped>
.body {
  width: 100%;
  position: relative;
  overflow: hidden;
  text-align: center;
  background-color: #305066;
  color: #22c3aa;
  font-size: 1.4em;
  #unlock {
    width: 100%;
    height: 100vh;
  }
}
</style>
