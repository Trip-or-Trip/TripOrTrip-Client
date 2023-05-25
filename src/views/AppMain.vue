<template>
  <div class="main">
    <main>
      <section class="mb-5">
        <div id="main-container">
          <div id="info-message">
            <h1 id="title-header" class="mb-5">
              <span>T</span><span>r</span><span>i</span><span>p</span> <span>o</span><span>r</span> <span>T</span><span>r</span><span>i</span><span>p</span><span>!</span>
              <!-- <b>Trip or Trip!</b> -->
            </h1>
            <p style="font-size: 1.5rem">
              <b v-if="!isLoggedIn">로그인 후 이용 가능합니다</b>
            </p>
          </div>
        </div>
        <div class="text-center">
          <div class="mt-4">
            <h5><b>Scroll Down</b></h5>
          </div>
          <i class="bi bi-arrow-down" style="font-size: 2rem"></i>
        </div>
      </section>

      <div id="hotplace-board-container" data-aos="fade-up" data-aos-duration="1500" class="row p-5 d-flex justify-content-center">
        <div id="hotplace-list" class="col-lg-3 col-md-5 me-3">
          <div class="mb-2">
            <h4><b>핫플레이스</b></h4>
          </div>
          <swiper class="swiper" :options="swiperOption">
            <swiper-slide v-for="(hotplace, index) in hotplaces" :key="index">
              <div style="border: 1px solid lightgray; border-radius: 0.5rem; height: 30rem">
                <img :src="`/upload/hotplace/${hotplace.image}`" style="width: 100%; height: 20rem; object-fit: cover; border-top-left-radius: 0.5rem; border-top-right-radius: 0.5rem" />
                <div class="mt-3 ms-2">
                  <img v-if="hotplace.userImage" :src="`/upload/profile/${hotplace.userImage}`" class="hotplace-profile-img me-2" />
                  <img v-else :src="require('@/assets/img/user.png')" class="hotplace-profile-img me-2" />
                  <span>{{ hotplace.userId }}</span>
                </div>
                <div class="mt-3 ms-3">
                  <span>#{{ hotplace.tag1 }}</span> <span>#{{ hotplace.tag2 }}</span>
                </div>
                <div class="mt-2 mb-4 ms-3">{{ hotplace.desc }}</div>
              </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </div>

        <div id="board-list" class="col-lg-6 col-md-5 ms-3">
          <div class="mb-2">
            <h4><b>인기글</b></h4>
          </div>
          <div class="row d-flex justify-content-center">
            <div v-if="boards.length" id="articles-container" class="align-self-center mb-2">
              <b-table id="article-container" :items="boards" :fields="fields" sort-icon-right @row-clicked="articleClick" class="mb-4"></b-table>
              <!-- <b-pagination pills v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="article-container" align="center"></b-pagination> -->
            </div>
            <div v-else class="title-container text-center mt-5">
              <h5 class="mt-5">게시글이 없습니다.</h5>
            </div>
          </div>
        </div>
      </div>

      <div id="trip-container" data-aos="fade-up" data-aos-duration="2200" class="row p-5 mt-3 d-flex justify-content-center">
        <div id="trip-list" class="col-lg-9 col-md-10">
          <div>
            <h4><b>인기 여행 계획</b></h4>
          </div>
          <div v-if="plans.plans && plans.plans.length">
            <div class="container">
              <masonry :cols="{ default: 4, 1600: 3, 1100: 2, 700: 1 }" :gutter="10" class="card-style">
                <span class="col-4 p-3" v-for="(plan, index) in plans.plans" :key="plan.id">
                  <div class="p-2" style="border: 1px solid lightgray; border-radius: 0.5rem">
                    <div class="my-2 ms-2">
                      <img v-if="plan.image" :src="`/upload/profile/${plan.image}`" class="hotplace-profile-img me-2" />
                      <img v-else :src="require('@/assets/img/user.png')" class="hotplace-profile-img me-2" />
                      <span>{{ plan.userId }}</span>
                    </div>
                    <the-kakao-map :id="`map-` + index" :plans="plans" :idx="index"></the-kakao-map>
                    <div class="mt-2 mb-2 ms-2">
                      <h5>
                        <b>{{ plan.title }}</b>
                      </h5>
                      <!-- <div>{{ plan.description }}</div> -->
                    </div>
                    <div class="text-center mb-2">
                      <button @click="planClick(plan, $event)" class="btn submit-btn">상세 보기</button>
                    </div>
                  </div>
                </span>
              </masonry>
            </div>
          </div>
          <div v-else class="title-container text-center mt-5">
            <h5 class="mt-5">등록된 여행 계획이 없습니다.</h5>
          </div>
        </div>
      </div>

      <!-- <div id="plan-list" class="mb-2 pt-5 col-4 col-sm-12">
        <h3>인기 여행계획</h3>
        <div v-if="plans.plans && plans.plans.length">
          <div class="container">
            <masonry :cols="{ default: 4, 1600: 3, 1100: 2, 700: 1 }" :gutter="10" class="card-style">
              <span class="col-4 p-3" v-for="(plan, index) in plans.plans" :key="plan.id">
                <the-kakao-map :id="`map-` + index" :plans="plans" :idx="index"></the-kakao-map>
                <div style="border: 1px solid lightgray">
                  <h5 class="ms-2 mt-2">
                    <b>{{ plan.title }}</b>
                  </h5>
                  <div>{{ plan.description }}</div>
                  <b-button :to="{ name: 'planview', params: { articleno: plan.id } }" variant="info">상세보기</b-button>
                </div>
              </span>
            </masonry>
          </div>
        </div>
        <div v-else>
          <h4>등록된 여행계획이 없습니다.</h4>
        </div>
      </div> -->
    </main>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import http from "@/util/http-common";
import TheKakaoMap from "@/components/TheKakaoMap";

import Vue from "vue";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/css/swiper.css";
Vue.use(VueAwesomeSwiper);

import { Swiper, SwiperSlide } from "vue-awesome-swiper";
// import HotplaceListItem from "@/components/hotplace/HotplaceListItem";

export default {
  name: "AppMain",
  components: {
    TheKakaoMap,
    Swiper,
    SwiperSlide,
    // HotplaceListItem,
    // MainHotplace,
  },
  data() {
    return {
      token: "",
      hotplaces: [],
      plans: [],
      boards: [],
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        autoplay: {
          //자동슬라이드 (false-비활성화)
          delay: 2500, // 시간 설정
          disableOnInteraction: false, // false-스와이프 후 자동 재생
        },
        loop: false, // 슬라이드 반복 여부
        loopAdditionalSlides: 1,
      },
      fields: [
        {
          key: "title",
          label: "제목",
          thStyle: { width: "45%" },
          // sortable: true,
        },
        {
          key: "hit",
          label: "조회수",
          thStyle: { width: "15%" },
          // sortable: false,
        },
        {
          key: "userId",
          label: "작성자",
          thStyle: { width: "15%" },
          // sortable: false,
        },
        {
          key: "createdAt",
          label: "작성 날짜",
          thStyle: { width: "25%" },
          // sortable: true,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapState(["user"]),
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  created() {
    this.token = window.$cookies.get("TripOrTrip");
    http.get(`/hotplace/list/hot`).then(({ data }) => {
      this.hotplaces = data;
    });
    http.get(`/plan/list/hot`).then(({ data }) => {
      this.plans = data;
    });
    http.get(`/board/list/hot`).then(({ data }) => {
      this.boards = data;
    });
  },
  mounted() {},
  methods: {
    loadScript() {
      const script = document.createElement("script");
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=" + process.env.VUE_APP_KAKAO_MAP_API_KEY + "&libraries=services&autoload=false";
      /* global kakao */ //eslint-disable-line no-unused-vars
      script.onload = () => window.kakao.maps.load(this.loadMap);
      document.head.appendChild(script);
    },

    moveBoard(id) {
      this.$router.push({ name: "boardview", params: { articleno: id } });
    },
    // updateMap(x, y, id) {
    //   var staticMapContainer = document.getElementById(id + "-plan"); // 이미지 지도를 표시할 div
    //   const staticMapOption = {
    //     center: new window.kakao.maps.LatLng(x, y), // 이미지 지도의 중심좌표
    //     level: 3, // 이미지 지도의 확대 레벨
    //   };
    //   new window.kakao.maps.StaticMap(staticMapContainer, staticMapOption);
    // },
    articleClick(result) {
      if (!this.isLoggedIn) {
        alert("로그인 후 이용 가능합니다.");
        return;
      }
      this.$router.push({ name: "boardview", params: { articleno: result.id } });
    },
    planClick(plan) {
      if (!this.isLoggedIn) {
        alert("로그인 후 이용 가능합니다.");
        return;
      }
      location.href = `/plan/${plan.id}`;
    },
  },
};
</script>

<style scoped>
h3 {
  text-align: center;
}
.container {
  display: grid;
}
.card-img-top {
  height: 15rem;
  width: 15rem;
  object-fit: cover;
}
#main-container {
  position: relative;
  width: 100%;
  height: 77vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url("@/assets/img/background.jpg");
  /* background-image: url('./assets/img/background.jpg'); */
  background-size: cover;
  opacity: 90%;
  display: flex;
  justify-content: center;
  z-index: -999;
}

#info-message {
  margin-top: 12rem;
  color: white;
  text-align: center;
}

/* #title-header {
  font-family: "NanumSquareRoundEB";
  font-family: "Titan One", cursive;
  font-size: 5rem;
} */

.service-item {
  border: 2px solid #aebdca;
  border-radius: 0.5rem;
}
.service-item .icon {
  font-size: 3.2rem;
  color: #8fa5b8;
}
.service-item .icon:hover {
  color: #8fa5b8;
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
/* .swiper {
  width: 25rem;
  height: 25rem;
} */

/* .swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
} */

/* .swiper-lazy-loaded {
  object-fit: cover !important;
  width: 100% !important;
  max-width: none !important;
} */

.hotplace-profile-img {
  width: 30px;
  height: 30px;
  border-radius: 2rem;
  object-fit: cover;
}
</style>
