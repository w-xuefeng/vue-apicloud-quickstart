<template>
  <div class="home2" :style="{ paddingBottom: $tabRH() + 'px' }">
    <div class="content">
      这里是哈哈
    </div>
  </div>
</template>

<script>
export default {
  name: 'home2',
  onReady() {
    this.$bindKeyBackExitApp();
  }
};
</script>

<style lang="scss" scoped>
.home2 {
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    width: 100%;
    height: calc(100vh - 120px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
