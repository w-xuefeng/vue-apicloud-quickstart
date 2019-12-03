<template>
  <div class="home" :style="{ paddingBottom: $tabRH() + 'px' }">
    <div class="banner">
      <img
        src="res/img/logo.png"
        width="50%"
        style="margin: 80px auto 30px auto;display: block;"
        alt=""
      />
    </div>
    <div class="content">
      <Grid :column-num="3">
        <GridItem
          v-for="(g, i) in homeGridPane"
          :key="i"
          :icon="g.icon"
          :text="g.text"
          @click="gotoSomeWhere(g.pathName, g.text)"
        />
      </Grid>
    </div>
  </div>
</template>

<script>
import { homeGridPane } from '@/config/ui';
import { Grid, GridItem } from 'vant';

export default {
  name: 'homeIndex',
  components: {
    Grid,
    GridItem
  },
  data() {
    return {
      homeGridPane
    };
  },
  methods: {
    gotoSomeWhere(pathname, title) {
      if (!pathname) return;
      this.$pageWithHead({
        title,
        name: pathname,
        back: true
      });
    }
  },
  apiEvent: {
    tap() {
      alert('点击了页面');
      api.setScreenOrientation({
        orientation: 'auto'
      });
    },
    scrolltobottom() {
      alert('已滚动到底部');
    }
  },
  onWindowChange() {
    alert('lalala');
  },
  onReady() {
    this.$setPullDownRefresh().then(() => {
      api.refreshHeaderLoadDone();
    });
    this.$bindKeyBackExitApp();
  }
};
</script>

<style lang="scss" scoped>
@import '@/config/ui.scss';

.home {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .banner {
    width: 100%;
  }
  .content {
    width: 100%;
  }
}
</style>
