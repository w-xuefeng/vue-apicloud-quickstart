<template>
  <div class="headre">
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'ComHeader',
  props: {
    title: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.headre {
  height: 50px;
  width: 100%;
  padding-top: 30px;
  color: #ffffff;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
    45deg,
    rgb(108, 189, 255) 0%,
    rgb(7, 87, 179) 100%
  );
}
</style>
