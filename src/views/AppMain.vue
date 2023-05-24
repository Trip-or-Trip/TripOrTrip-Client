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
      <div id="hot-list" class="p-5 container">
        <div id="hotplace-list" class="mb-2 col-4 col-sm-12">
          <h3>인기 핫플레이스</h3>
          <div v-if="hotplaces.length">
            <b-carousel id="carousel-1" :interval="4000" controls indicators background="#FFFFFF" img-width="1024" img-height="480" style="text-shadow: 1px 1px 2px #333; height: 30rem; align: center">
              <b-carousel-slide
                v-for="hotplace in hotplaces"
                v-bind:key="hotplace.num"
                width="100%"
                height="100%"
                style="height: 30rem; object-fit: cover"
                :img-src="`/upload/hotplace/${hotplace.image}`"
                :caption="hotplace.title"
                :text="hotplace.desc"
              >
                #{{ hotplace.tag1 }} #{{ hotplace.tag2 }} <br />
                <b-button :href="`${hotplace.mapUrl}`" variant="primary">지도 검색</b-button>
              </b-carousel-slide>
            </b-carousel>
          </div>
          <div v-else>
            <h4>등록된 핫플레이스가 없습니다.</h4>
          </div>
        </div>

        <div id="plan-list" class="mb-2 pt-5 col-4 col-sm-12">
          <h3>인기 여행계획</h3>
          <div v-if="plans.plans.length">
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
          <div v-if="boards.length">
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
        <div></div>
      </div>
      <section id="service-list" class="service-list">
        <div class="container-fluid">
          <div class="row justify-content-center">
            <!-- 서비스 기능 start -->
            <div class="col-lg-2 col-md-5 service-item d-flex mb-3 mx-3" data-aos="fade-up">
              <div class="icon flex-shrink-0 me-3 mt-2">
                <!-- <i class="bi bi-globe-central-south-asia"></i> -->
                <i class="bi bi-search"></i>
              </div>
              <div class="mt-3 mb-2">
                <h4 class="title">지역별 검색</h4>
                <p class="description">
                  검색 지역을 군/구 단위로 선택해 관광지를 검색합니다.<br />
                  우리 동네에는 어떤 볼 것이 있을까요?
                </p>
                <router-link to="/tourist"> <span>Learn More</span><i class="bi bi-arrow-right"></i> </router-link>
              </div>
            </div>
            <!-- 서비스 기능 end -->

            <!-- 서비스 기능 start -->
            <div class="col-lg-2 col-md-5 service-item d-flex mb-3 mx-3" data-aos="fade-up">
              <div class="icon flex-shrink-0 me-3 mt-2">
                <i class="bi bi-airplane-engines"></i>
              </div>
              <div class="mt-3 mb-2">
                <h4 class="title">여행 경로</h4>
                <p class="description">
                  여행에 방문할 새로운 관광지를 추가하고 여행 경로를 확인합니다.<br />
                  나만의 Trip or Trip!을 함께 떠나볼까요?
                </p>
                <router-link to="/plan"> <span>Learn More</span><i class="bi bi-arrow-right"></i> </router-link>
              </div>
            </div>
            <!-- 서비스 기능 end -->

            <!-- 서비스 기능 start -->
            <div class="col-lg-2 col-md-5 service-item d-flex mb-3 mx-3" data-aos="fade-up">
              <div class="icon flex-shrink-0 me-3 mt-2">
                <!-- <i class="bi bi-moon-stars"></i> -->
                <i class="bi bi-bookmark-star"></i>
              </div>
              <div class="mt-3 mb-2">
                <h4 class="title">핫플레이스</h4>
                <p class="description">
                  다른 사람에게 소개하고 싶은 나만의 장소가 있나요?<br />
                  핫플레이스를 공유하고, 새로운 핫플레이스를 추천받으세요!
                </p>
                <router-link to="/hotplace"> <span>Learn More</span><i class="bi bi-arrow-right"></i> </router-link>
              </div>
            </div>
            <!-- 서비스 기능 end -->

            <!-- 서비스 기능 start -->
            <div class="col-lg-2 col-md-5 service-item d-flex mb-3 mx-3" data-aos="fade-up">
              <div class="icon flex-shrink-0 me-3 mt-2">
                <!-- <i class="bi bi-moon-stars"></i> -->
                <i class="bi bi-archive"></i>
              </div>
              <div class="mt-3 mb-2">
                <h4 class="title">게시판</h4>
                <p class="description">
                  Trip or Trip 사용자들과 자유로운 소통을 원하시나요?<br />
                  사람들과 다양한 이야기를 나누어 보세요!
                </p>
                <router-link to="/board"> <span>Learn More</span><i class="bi bi-arrow-right"></i> </router-link>
              </div>
            </div>
            <!-- 서비스 기능 end -->

            <!-- 서비스 기능 start -->
            <div class="col-lg-2 col-md-5 service-item d-flex mb-3 mx-3" data-aos="fade-up">
              <div class="icon flex-shrink-0 me-3 mt-2">
                <!-- <i class="bi bi-moon-stars"></i> -->
                <i class="bi bi-tags"></i>
              </div>
              <div class="mt-3 mb-2">
                <h4 class="title">공지사항</h4>
                <p class="description">Trip or Trip의 공지사항을 확인해보세요!</p>
                <router-link to="/notice"> <span>Learn More</span><i class="bi bi-arrow-right"></i> </router-link>
              </div>
            </div>
            <!-- 서비스 기능 end -->
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import http from "@/util/http-common";
import TheKakaoMap from "@/components/TheKakaoMap.vue";

export default {
  name: "AppMain",
<<<<<<< HEAD
  components: {},
=======
  components: {
    TheKakaoMap,
  },
>>>>>>> d89cbd8c8ffc4dd77f643d0ca94a8915f96c0cd1
  data() {
    return {
      token: "",
      hotplaces: [],
      plans: [],
      boards: [],
    };
  },
  created() {
    this.token = window.$cookies.get("TripOrTrip");
  },
  mounted() {
<<<<<<< HEAD
    if (window.kakao && window.kakao.maps) {
      this.loadMap();
    } else {
      this.loadScript();
    }
=======
    // if (window.kakao && window.kakao.maps) {
    //   this.loadMap();
    // } else {
    //   this.loadScript();
    // }
>>>>>>> d89cbd8c8ffc4dd77f643d0ca94a8915f96c0cd1

    http.get(`/hotplace/list/hot`).then(({ data }) => {
      this.hotplaces = data;
    });
    http.get(`/plan/list/hot`).then(({ data }) => {
      this.plans = data;
<<<<<<< HEAD
      for (var i = 0; i < this.plans.places.length; i++) {
        console.log(this.plans.places[0][0]);
        this.updateMap(this.plans.places[i][0].lat, this.plans.places[i][0].lng, i % 4);
      }
=======
      // for (var i = 0; i < this.plans.places.length; i++) {
      //   console.log(this.plans.places[0][0]);
      //   this.updateMap(this.plans.places[i][0].lat, this.plans.places[i][0].lng, i % 4);
      // }
>>>>>>> d89cbd8c8ffc4dd77f643d0ca94a8915f96c0cd1
    });
    http.get(`/board/list/hot`).then(({ data }) => {
      this.boards = data;
    });
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapState(["user"]),
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
<<<<<<< HEAD
    loadMap() {
      // const container = document.getElementById("map");
      // const options = {
      //   center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      //   level: 3,
      // };
      // this.map = new window.kakao.maps.Map(container, options);
    },
=======
    // loadMap() {
    // const container = document.getElementById("map");
    // const options = {
    //   center: new window.kakao.maps.LatLng(33.450701, 126.570667),
    //   level: 3,
    // };
    // this.map = new window.kakao.maps.Map(container, options);
    // },
>>>>>>> d89cbd8c8ffc4dd77f643d0ca94a8915f96c0cd1

    moveBoard(id) {
      this.$router.push({ name: "boardview", params: { articleno: id } });
    },
<<<<<<< HEAD
    updateMap(x, y, id) {
      var staticMapContainer = document.getElementById(id + "-plan"); // 이미지 지도를 표시할 div
      const staticMapOption = {
        center: new window.kakao.maps.LatLng(x, y), // 이미지 지도의 중심좌표
        level: 3, // 이미지 지도의 확대 레벨
      };
      new window.kakao.maps.StaticMap(staticMapContainer, staticMapOption);
    },
=======
    // updateMap(x, y, id) {
    //   var staticMapContainer = document.getElementById(id + "-plan"); // 이미지 지도를 표시할 div
    //   const staticMapOption = {
    //     center: new window.kakao.maps.LatLng(x, y), // 이미지 지도의 중심좌표
    //     level: 3, // 이미지 지도의 확대 레벨
    //   };
    //   new window.kakao.maps.StaticMap(staticMapContainer, staticMapOption);
    // },
>>>>>>> d89cbd8c8ffc4dd77f643d0ca94a8915f96c0cd1
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
</style>
