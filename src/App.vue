<template>
  <div id="app">
    <the-header-nav></the-header-nav>
    <div class="content">
      <router-view></router-view>
    </div>
    <the-footer-nav></the-footer-nav>
  </div>
</template>

<script>
import TheHeaderNav from "@/components/TheHeaderNav";
import TheFooterNav from "@/components/TheFooterNav";

export default {
  name: "App",
  components: {
    TheHeaderNav,
    TheFooterNav,
  },
  created() {
  },
  mounted() {},
};
</script>

<style>
@import "https://hangeul.pstatic.net/hangeul_static/css/nanum-square-round.css";
@import "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css";

#app {
  font-family: "NanumSquareRound";
  position: relative;
  min-height: 100vh;
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

.content {
  padding-bottom: 100px; /* 원하는 간격 설정 */
}
</style>
