<template>
  <div class="dada">
    <h1>哒哒</h1>
  </div>
</template>

<script>
export default {
  name: 'dada',
  data() {
    return {};
  },
  apiEvent: {
    tap() {
      alert('点击了页面');
      api.setScreenOrientation({
        orientation: 'auto'
      });
    },
    dadaHeaderRightClick() {
      alert('点击了头部右侧按钮');
    }
  },
  methods: {},
  onReady() {}
};
</script>

<style lang="scss" scoped>
.dada {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
