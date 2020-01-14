<template>
  <div></div>
</template>

<script>
export default {
  name: "homeIndex",
  apiEvent: {
    keyback() {
      this.$toast({
        msg: "按了返回键",
        duration: 2000,
        location: "bottom"
      });
    }
  },
  onReady() {}
};
</script>

<style lang="scss" scoped></style>
