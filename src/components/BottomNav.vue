<template>
  <div class="bottomNav" v-if="tabs.tabs && tabs.tabs.length > 0">
    <Tabbar v-model="activeBtn" safe-area-inset-bottom class="fixBottom">
      <TabbarItem
        v-for="(item, index) in tabs.tabs"
        :icon="item.icon"
        :key="index"
        class="tabsBtn"
        @click="switchTabs(tabs.frameGroupName, index)"
      >
        {{ item.text }}
      </TabbarItem>
    </Tabbar>
  </div>
</template>

<script>
import { frameTabChange } from '@/config/eventName';
import { Tabbar, TabbarItem } from 'vant';

export default {
  name: 'BottomNav',
  components: {
    Tabbar,
    TabbarItem
  },
  props: {
    tabs: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      activeBtn: 0
    };
  },
  methods: {
    activeListener() {
      this.api.addEventListener(
        {
          name: frameTabChange
        },
        ret => {
          if (this.$options.tabChangedFromInner) {
            this.$options.tabChangedFromInner = false;
            return;
          }
          this.activeBtn = ret.value.index;
        }
      );
    },
    switchTabs(frameGroupName, index) {
      this.activeBtn = index;
      this.$options.tabChangedFromInner = true;
      api.setFrameGroupIndex({
        name: frameGroupName,
        index
      });
    }
  },
  onReady() {
    this.activeListener();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/config/ui.scss';

.bottomNav {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px -1px 5px #f0f0f0;
}
.fixBottom {
  padding-bottom: 10px;
}
</style>
