<template>
  <div class="index">
    <com-header :title="title" />
    <button
      style="height:100px; width: 100%; background: deepskyblue"
      @click="$page.open('loginindex', { name: 'login' })"
    >
      123456
    </button>
  </div>
</template>

<script>
import ComHeader from '@/components/ComHeader';

export default {
  name: 'index',
  components: {
    ComHeader
  },
  data() {
    return {
      title: '首页'
    };
  },
  onReady() {
    this.$frame.open({
      name: 'bottomframe',
      rect: {
        x: 0,
        y: Number(document.body.getRect().height) - 60,
        w: 'auto',
        h: 60
      },
      url: 'bottomframeindex'
    });
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
}
</style>
