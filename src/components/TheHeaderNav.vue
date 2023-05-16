<template>
  <header>
    <nav id="navbar" class="navbar navbar-expand-lg bg-nav shadow py-3">
      <div class="container-fluid mx-5">
        <a class="navbar-brand fw-bold fs-4 mr-5" href="/">Trip or Trip!</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0" id="service-list">
            <li class="nav-item">
              <router-link to="/tourist" class="nav-link active"> 지역별 관광지 검색 </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/" class="nav-link active"> 여행 계획 보기 </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/" class="nav-link active"> 핫플레이스 보기 </router-link>
            </li>
          </ul>

          <div class="navbar-nav mb-2 mb-lg-0">
            <div>
              <!-- <a class="nav-link active" id="signin-user" data-bs-toggle="modal" data-bs-target="#signupModal"> -->
              <router-link to="/user/signin" class="nav-link active" id="view-user"> 로그인 </router-link>
            </div>
            <div>
              <!-- <a class="nav-link active" id="signup-user" data-bs-toggle="modal" data-bs-target="#signupModal"> -->
              <router-link to="/user/signup" class="nav-link active" id="view-user"> 회원가입 </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "TheHeaderNav",

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
};
</script>

<style scoped></style>
