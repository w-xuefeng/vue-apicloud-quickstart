<template>
  <div class="header mdl-shadow--2dp" id="fixHeader">
    <div v-if="back" class="back" @click="$page.close()">
      <Icon name="arrow-left" />
      <span>返回</span>
    </div>
    <span>{{ title }}</span>
    <div v-if="right" class="right" @click="rightClick()">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
import { Icon } from 'vant';

export default {
  name: 'ComHeader',
  components: {
    Icon
  },
  props: {
    title: String,
    framePathName: {
      type: String,
      required: true
    },
    back: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    rightClick() {
      this.api.sendEvent({
        name: `${this.framePathName}HeaderRightClick`
      });
    }
  },
  onReady() {
    typeof api !== 'undefined' &&
      this.$api.fixStatusBar(this.$api.dom('#fixHeader'));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/config/ui.scss';

.header {
  height: $headerBaseHeight;
  width: 100%;
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
  .back {
    position: absolute;
    left: 15px;
    font-size: 1em;
    display: flex;
    align-items: center;
  }
  .right {
    position: absolute;
    right: 15px;
    font-size: 1em;
    display: flex;
    align-items: center;
  }
}
</style>
