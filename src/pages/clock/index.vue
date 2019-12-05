<template>
  <div class="home1" :style="{ paddingBottom: $tabRH() + 'px' }">
    <div class="content">
      啦啦啦
    </div>
  </div>
</template>

<script>
export default {
  name: 'home1',
  apiEvent: {
    clockHeaderRightClick() {
      alert('点击了头部右侧按钮');
    }
  },
  onReady() {
    this.$bindKeyBackExitApp();
  }
};
</script>

<style lang="scss" scoped>
.home1 {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
