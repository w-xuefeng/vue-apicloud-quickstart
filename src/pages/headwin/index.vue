<template>
  <div class="head-window">
    <com-header
      :title="title"
      :back="back"
      :right="right"
      :framePathName="framePathName"
    >
      <template v-slot:right>
        <Icon :name="rightIcon" />
      </template>
    </com-header>
  </div>
</template>

<script>
import ComHeader from '@/components/ComHeader';
import { frameTabChange } from '@/config/eventName';
import { Icon } from 'vant';

export default {
  name: 'headWin',
  components: {
    ComHeader,
    Icon
  },
  data() {
    return {
      title: '',
      back: false,
      right: false,
      rightIcon: '',
      framePathName: ''
    };
  },
  methods: {
    openTab(tabOpts, tabsFrameName = 'bottomTabsNav') {
      this.$frame.open({
        name: tabsFrameName,
        rect: {
          x: 0,
          y: this.$getWinSize().winHeight - this.$tabRH(),
          w: 'auto',
          h: this.$tabRH()
        },
        pageParam: {
          tabOpts
        },
        url: this.$n2p('bottomframe')
      });
    },
    openContent() {
      const pageParam = this.$page.pageParam();
      if (!pageParam) {
        return;
      }
      const {
        rect = {},
        title,
        back,
        right,
        rightOpts,
        tab,
        tabsFrameName,
        tabOpts,
        name,
        frameGroup,
        frameGroupOpts = {},
        bindKeyBackExitApp
      } = pageParam;
      const headerRH = this.$headerRH();
      let defaultH = this.$getWinSize().winHeight - headerRH;
      if (tab) {
        defaultH -= this.$tabRH();
        this.openTab(tabOpts, tabsFrameName);
      }
      if (bindKeyBackExitApp) {
        this.$bindKeyBackExitApp();
      }
      this.title = title || '标题';
      this.back = back;
      this.right = right;
      if (right) {
        this.rightIcon = rightOpts.icon;
      }
      if (frameGroup) {
        const { name, rect = {}, frames } = frameGroupOpts;
        frames.forEach(e => {
          e.url = this.$n2p(e.pathName) + '.html';
        });
        this.api.openFrameGroup(
          {
            name,
            rect: {
              x: rect.x || 0,
              y: rect.y || headerRH,
              w: rect.w || 'auto',
              h: rect.h || defaultH
            },
            frames
          },
          ret => {
            if (tab && tabOpts) {
              this.title = tabOpts.tabs[ret.index].text;
            }
            this.framePathName = frames[ret.index].pathName;
            if (frames[ret.index].options) {
              const { right, rightOptions } = frames[ret.index].options;
              this.right = right;
              this.rightIcon = rightOptions.icon;
            } else {
              this.right = false;
              this.rightIcon = '';
            }
            this.api.sendEvent({
              name: frameTabChange,
              extra: { ...ret }
            });
          }
        );
      } else {
        this.framePathName = name;
        this.$frame.open({
          name,
          rect: {
            x: rect.x || 0,
            y: rect.y || headerRH,
            w: rect.w || 'auto',
            h: rect.h || defaultH
          },
          url: this.$n2p(pageParam.name)
        });
      }
    }
  },
  onReady() {
    this.openContent();
  }
};
</script>

<style lang="scss" scoped>
.head-window {
  width: 100%;
}
</style>
