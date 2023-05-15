<template>
  <div id="app">
    <!-- <the-header></the-header> -->
    <!-- <app-main></app-main> -->
    <app-board></app-board>
    <app-notice></app-notice>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
// import TheHeader from "@/components/TheHeader";
// import AppMain from "@/views/AppMain";
import AppBoard from "@/views/AppBoard";
import AppNotice from "@/views/AppNotice";

export default {
  components: {
    // TheHeader,
    // AppMain,
    AppBoard,
    AppNotice,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

a {
  text-decoration: none;
}
</style>
