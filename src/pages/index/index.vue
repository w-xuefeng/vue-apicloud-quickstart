<template>
  <div class="index">
    <com-header :title="title" />
    <button
      style="height:100px; width: 100%; background: deepskyblue"
      @click="$openPage({ name: 'login', url: 'loginindex.html' })"
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
  mounted() {}
};
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
}
</style>
