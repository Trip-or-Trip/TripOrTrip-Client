<template>
  <div class="main">
    <main>
      <section class="mb-3">
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
      </section>

      <div id="hot-list" class="row p-5">
        <div id="hotplace-list" class="col-lg-4 col-md-5">
          <div class="mb-2">
            <h4>핫플레이스</h4>
          </div>
          <swiper class="swiper" :options="swiperOption">
            <swiper-slide v-for="(hotplace, index) in hotplaces" :key="index">
              <div style="border: 1px solid lightgray; border-radius: 0.5rem">
                <img :src="`/upload/hotplace/${hotplace.image}`" style="width: 100%; height: 20rem; object-fit: cover; border-top-left-radius: 0.5rem; border-top-right-radius: 0.5rem" />
                <div class="mt-3 ms-2">
                  <img v-if="user.image" :src="`/upload/profile/${user.image}`" class="hotplace-profile-img me-2" />
                  <img v-else :src="require('@/assets/img/user.png')" class="hotplace-profile-img me-2" />
                  <span>{{ hotplace.userId }}</span>
                </div>
                <div class="mt-3 ms-3">
                  <span>#{{ hotplace.tag1 }}</span> <span>#{{ hotplace.tag2 }}</span>
                </div>
                <div class="mt-2 mb-4 ms-3">{{ hotplace.desc }}</div>
              </div>
            </swiper-slide>
            <!-- <swiper-slide>Slide 1</swiper-slide>
            <swiper-slide>Slide 2</swiper-slide>
            <swiper-slide>Slide 3</swiper-slide>
            <swiper-slide>Slide 4</swiper-slide>
            <swiper-slide>Slide 5</swiper-slide>
            <swiper-slide>Slide 6</swiper-slide>
            <swiper-slide>Slide 7</swiper-slide>
            <swiper-slide>Slide 8</swiper-slide>
            <swiper-slide>Slide 9</swiper-slide>
            <swiper-slide>Slide 10</swiper-slide> -->
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </div>

        <div id="hotplace-list" class="col-lg-4 col-md-5">
          <div class="mb-2">
            <h4>인기글</h4>
            <div style="height: 100%; border: 1px solid lightgray"></div>
          </div>
        </div>

        <div id="plan-list" class="mb-2 pt-5 col-4 col-sm-12">
          <h3>인기 여행계획</h3>
          <div v-if="plans.plans && plans.plans.length">
            <div class="container">
              <masonry :cols="{ default: 4, 1600: 3, 1100: 2, 700: 1 }" :gutter="10" class="card-style">
                <span class="col-4 p-3" v-for="(plan, index) in plans.plans" :key="plan.id">
                  <h4>{{ plan.title }}</h4>
                  <the-kakao-map :id="`map-` + index" :plans="plans" :idx="index"></the-kakao-map>
                  <div>{{ plan.description }}</div>
                  <b-button :to="{ name: 'planview', params: { articleno: plan.id } }" variant="info">상세보기</b-button>
                </span>
              </masonry>
            </div>
            <!-- <b-carousel
              id="carousel-2"
              :interval="4000"
              controls
              indicators
              background="#FFFFFF"
              style="text-shadow: 1px 1px 2px #333; height: 20rem; overflow: hidden"
            >
              <b-carousel-slide
                v-for="plan in plans.plans"
                v-bind:key="plan.id"
                :img-src="`http://t1.daumcdn.net/mapjsapi/images/bg_tile.png`"
                :caption="plan.title"
                :text="plan.description"
                style="height: 20rem; object-fit: contain"
              >
                <b-button :to="{ name: 'planview', params: { articleno: plan.id } }" variant="primary"
                  >자세히</b-button
                >
              </b-carousel-slide>
            </b-carousel> -->
          </div>
          <div v-else>
            <h4>등록된 여행계획이 없습니다.</h4>
          </div>
        </div>
        <div id="board-list" class="mb-2 pt-5 col-4 col-sm-12">
          <h3>인기 게시글</h3>
          <div v-if="boards && boards.length">
            <div style="height: 20rem; overflow: scroll">
              <b-card class="p-2 m-2" v-for="board in boards" v-bind:key="board.id" :title="board.title" @click="moveBoard(board.id)">
                <b-card-text>
                  {{ board.content }}
                </b-card-text>
              </b-card>
            </div>
          </div>
          <div v-else>
            <h4>등록된 게시글이 없습니다.</h4>
          </div>
        </div>
      </div>
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
      // for (var i = 0; i < this.plans.places.length; i++) {
      //   console.log(this.plans.places[0][0]);
      //   this.updateMap(this.plans.places[i][0].lat, this.plans.places[i][0].lng, i % 4);
      // }
    });
    http.get(`/board/list/hot`).then(({ data }) => {
      this.boards = data;
    });
  },
  mounted() {
    // if (window.kakao && window.kakao.maps) {
    //   this.loadMap();
    // } else {
    //   this.loadScript();
    // }
  },
  methods: {
    loadScript() {
      const script = document.createElement("script");
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=" + process.env.VUE_APP_KAKAO_MAP_API_KEY + "&libraries=services&autoload=false";
      /* global kakao */ //eslint-disable-line no-unused-vars
      script.onload = () => window.kakao.maps.load(this.loadMap);
      document.head.appendChild(script);
    },
    // 맵 출력하기
    // loadMap() {
    // const container = document.getElementById("map");
    // const options = {
    //   center: new window.kakao.maps.LatLng(33.450701, 126.570667),
    //   level: 3,
    // };
    // this.map = new window.kakao.maps.Map(container, options);
    // },

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
    slideChangeTransitionStart() {
      console.log(this.swiper.activeIndex); //현재 index값 얻기
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
  height: 40vh;
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

/* #carousel-1 img {
  object-fit: contain;
}

.carousel-item {
  width: 20rem;
  height: 40rem;
} */

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
