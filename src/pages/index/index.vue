<template>
  <div class="index">{{ title }}</div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      title: 'lalala'
    };
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.index {
  width: 100px;
  color: #000;
  background: dodgerblue;
}
</style>
