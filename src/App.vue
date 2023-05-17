<template>
  <div id="app">
    <the-header-nav></the-header-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import TheHeaderNav from "@/components/TheHeaderNav";

export default {
  name: "App",
  components: {
    TheHeaderNav,
  },
  created() {
    console.log("App.vue");
  },
};
</script>

<style>
@import "https://hangeul.pstatic.net/hangeul_static/css/nanum-square-round.css";
@import "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css";

/* @font-face {
  font-family: "NanumSquareRound";
  src: url("@/assets/fonts/NanumSquareRoundR.ttf");
} */

#app {
  font-family: "NanumSquareRound";
}

.submit-btn {
  /* background-color: white; */
  background-color: #aebdca;
  color: white;
}

.submit-btn:hover {
  /* background-color: white; */
  background-color: #8fa5b8;
  color: white;
}

.delete-btn {
  background-color: #ffb6b9;
  color: white;
}

.delete-btn:hover {
  background-color: #ff9494;
  color: white;
  cursor: point;
}
</style>
