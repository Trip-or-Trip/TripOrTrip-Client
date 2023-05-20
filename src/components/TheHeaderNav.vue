<template>
  <header>
    <nav id="navbar" class="navbar navbar-expand-lg bg-nav shadow py-3">
      <div class="container-fluid mx-5">
        <router-link class="navbar-brand fw-bold fs-4 mr-5" to="/">Trip or Trip!</router-link>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0" id="service-list">
            <li class="nav-item">
              <router-link to="/tourist" class="nav-link active"> 지역별 관광지 검색 </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/plan" class="nav-link active"> 여행 계획 보기 </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/hotplace" class="nav-link active"> 핫플레이스 보기 </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/board" class="nav-link active"> 자유게시판 </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/notice" class="nav-link active"> 공지사항 </router-link>
            </li>
          </ul>

          <div class="navbar-nav mb-2 mb-lg-0">
            <div>
              <!-- <a v-if="isLoggedIn" @click="infoModalView = true" class="nav-link active" id="view-user"> 회원정보 보기 </a> -->
              <router-link v-if="isLoggedIn" :to="{ name: 'mypage' }" class="nav-link active" id="view-user"> 마이페이지 </router-link>
              <router-link v-else :to="{ name: 'signin' }" class="nav-link active" id="signin-user"> 로그인 </router-link>
            </div>
            <div>
              <a v-if="isLoggedIn" @click="logout" class="nav-link active" id="signout-user"> 로그아웃 </a>
              <router-link v-else :to="{ name: 'signout' }" class="nav-link active" id="signup-user"> 회원가입 </router-link>
            </div>
          </div>
        </b-collapse>
      </div>
    </nav>

    <user-info v-if="infoModalView" @close-modal="infoModalView = false"></user-info>
  </header>
</template>

<script>
import UserInfo from "@/components/user/UserInfo";
import { mapGetters, mapState } from "vuex";

export default {
  name: "TheHeaderNav",
  components: {
    UserInfo,
  },
  data() {
    return {
      infoModalView: false,
    };
  },
  created() {},
  computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapState(["user"]),
  },
  mounted() {
    document.querySelector("#navbarContent").addEventListener("show.bs.collapse", function () {
      console.log("show.bs.collapse");
    });
    // 콘텐츠가 펼친 후에 호출
    document.querySelector("#navbarContent").addEventListener("shown.bs.collapse", function () {
      console.log("shown.bs.collapse");
    });
    // 콘텐츠가 접기 전에 호출
    document.querySelector("#navbarContent").addEventListener("hide.bs.collapse", function () {
      console.log("hide.bs.collapse");
    });
    // 콘텐츠가 접고 난 후에 호출
    document.querySelector("#navbarContent").addEventListener("hidden.bs.collapse", function () {
      console.log("hidden.bs.collapse");
    });
  },
  methods: {
    logout() {
      this.$store.commit("logout");
      window.$cookies.remove("TripOrTrip");
      location.reload();
    },
  },
};
</script>

<style scoped></style>
