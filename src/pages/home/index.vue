<template>
  <div class="home" :style="{ paddingBottom: $tabRH() + 'px' }">
    <div class="banner">
      <img
        src="res/img/logo.png"
        width="50%"
        style="margin: 80px auto 30px auto;display: block;"
        alt="logo"
      />
    </div>
    <div class="content">
      <Grid :column-num="3">
        <GridItem
          v-for="(g, i) in homeGridPane"
          :key="i"
          :icon="g.icon"
          :text="g.text"
          @click="
            gotoSomeWhere({
              pathName: g.pathName,
              title: g.text,
              options: g.options
            })
          "
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
    gotoSomeWhere({ pathName, title, options }) {
      if (!pathName) return;
      this.$pageWithHead({
        title,
        name: pathName,
        back: true,
        ...options
      });
    }
  },
  apiEvent: {
    scrolltobottom() {
      alert('已滚动到底部');
    },
    swipeup() {
      api.refreshHeaderLoadDone();
    }
  },
  onWindowChange() {
    alert('lalala');
  },
  onReady() {
    this.$setPullDownRefresh(() => {
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
