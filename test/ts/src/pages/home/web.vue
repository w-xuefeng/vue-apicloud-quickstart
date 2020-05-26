<template>
  <div class="web"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { VueAPICloud } from 'vue-apicloud-quickstart'

@VueAPICloud
@Component
export default class HomeWeb extends Vue {
  onReady () {
    const { url, name } = this.$page.pageParam()
    this.$frame.open({
      url,
      name,
      rect: {
        x: 0,
        y: this.$getSafeArea().top,
        w: 'auto',
        h: 'auto'
      }
    })
  }
}
</script>
