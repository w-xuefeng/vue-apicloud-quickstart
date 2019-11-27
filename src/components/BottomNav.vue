<template>
  <div class="bottomNav">
    <span>lala</span>
    <span>haha</span>
    <span>dada</span>
    <span>kaka</span>
  </div>
</template>

<script>
export default {
  name: 'BottomNav',
  props: {
    title: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.bottomNav {
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #666666;
  background: dodgerblue;
  span {
    width: 25%;
    height: 40px;
    text-align: center;
    line-height: 50px;
  }
}
</style>
