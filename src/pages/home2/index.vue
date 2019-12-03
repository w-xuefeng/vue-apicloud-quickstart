<template>
  <div class="home2" :style="{ paddingBottom: $tabRH() + 'px' }">
    <div class="content">
      oooo
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
}
</style>
