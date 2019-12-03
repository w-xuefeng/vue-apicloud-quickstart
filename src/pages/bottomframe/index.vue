<template>
  <div class="bottomTabs" id="fixBottomTab">
    <bottom-nav :tabs="tabs" />
  </div>
</template>

<script>
import BottomNav from '@/components/BottomNav';

export default {
  name: 'bottomframe',
  components: {
    BottomNav
  },
  data() {
    return {
      tabs: {
        frameGroupName: '',
        tabs: []
      }
    };
  },
  onReady() {
    this.tabs = this.$page.pageParam().tabOpts;
    typeof api !== 'undefined' &&
      this.$api.fixTabBar(this.$api.dom('#fixBottomTab'));
  }
};
</script>

<style lang="scss" scoped>
.bottomTabs {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
