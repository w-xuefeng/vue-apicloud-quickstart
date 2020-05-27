<template>
  <div class="web"></div>
</template>

<script>

export default {
  name: 'web',
  statusBar: 'transparent',
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
