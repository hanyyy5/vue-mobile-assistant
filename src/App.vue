<template>
  <div id="app">
    <x-header :left-options="{backText: ''}" style="background-color:#366cb3;">数据智能助理</x-header>
    <router-view/>
  </div>
</template>

<script>
import { XHeader } from 'vux'
export default {
  name: 'App',
  components: {
    XHeader
  }
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  color: #707070;
  width: 100vw;
  height: 100vh;
  background: url(./assets/image/bgImg.png) no-repeat;
  background-size: cover;
  font-size: 34px;
  overflow: hidden;
}
#app .vux-header .vux-header-title {
    font-size: 34px;
    font-weight: bold;
}
#app .left-arrow::before {
    width: 24px;
    height: 24px; 
    border-color: #fff;
    border-width: 4px 0 0 4px;
    top: 16px;
}

</style>
