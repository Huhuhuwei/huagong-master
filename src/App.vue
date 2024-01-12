<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>
<!-- import JavaScript -->
<!--<script src="https://unpkg.com/element-ui/lib/index.js"></script>-->
<style lang="scss">
.iconfont {
  //font-family: "iconfont",sans-serif !important;
  font-style: normal;
  font-size: 25px;
  vertical-align: middle;
  color: rgb(117,120,137);
  transition: .3s;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
* {
  padding: 0;
  margin: 0;
  //font-family: Consolas, 'Liberation Mono', Menlo, Courier, monospace;
}
#app {
  width: 100vw;
  height: 100vh;
  background-size:cover;
  position:absolute;
}
/*::-webkit-scrollbar {
  display: none; !* Chrome Safari *!
}*/
</style>
