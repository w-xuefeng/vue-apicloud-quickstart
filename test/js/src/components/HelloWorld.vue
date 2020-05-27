<template>
  <div class="hello">
    <h1 class="msg">{{ msg }}</h1>
    <p class="subtitle">
      For a guide and recipes on how to configure / customize this project,
      <br />check out the
      <a
        href="https://cli.vuejs.org"
        target="_blank"
        rel="noopener"
      >vue-cli documentation</a> and
      <a
        href="https://docs.apicloud.com"
        target="_blank"
        rel="noopener"
      >apicloud documentation</a>.
    </p>
    <h3>Ecosystem</h3>
    <ul>
      <li>
        <a href="https://vaq.wangxuefeng.com.cn" target="_blank" rel="noopener">vue-apicloud-quickstart</a>
      </li>
      <li>
        <a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a>
      </li>
      <li>
        <a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-devtools#vue-devtools"
          target="_blank"
          rel="noopener"
        >vue-devtools</a>
      </li>
      <li>
        <a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a>
      </li>
      <li>
        <a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.msg {
  font-size: 18px;
}
.subtitle {
  color: rgba(0, 0, 0, 0.55);
}
</style>
