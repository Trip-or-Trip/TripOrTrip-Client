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
      <section id="hot-list" class="p-5" style="height: 50em;">
        <div id="hotplace-list" class="mb-2 d-flex">
          <!-- <b-carousel
            id="carousel-1"
            :interval="4000"
            controls
            indicators
            background="#ababab"
            img-width="128"
            img-height="48"
            style="text-shadow: 1px 1px 2px #333"
          >
            <b-carousel-slide
              v-for="hotplace in hotplaces"
              v-bind:key="hotplace.num"
              :img-src="`/upload/hotplace/${hotplace.image}`"
              :caption="hotplace.title"
              :text="hotplace.desc"
            >
            </b-carousel-slide>
          </b-carousel> -->
          <b-card 
              class="m-2 col-3"
              v-for="hotplace in hotplaces"
              v-bind:key="hotplace.num"
              :title="hotplace.title"
              :img-src="`/upload/hotplace/${hotplace.image}`"
              >
            <b-card-text>
              #{{hotplace.tag1}}
              #{{hotplace.tag2}} <br>
              {{hotplace.desc}}
            </b-card-text>
            <b-button :href="`${hotplace.mapUrl}`" variant="primary">지도 검색</b-button>
          </b-card>
        </div>
        <div id="plan-list" class="mb-2 d-flex">
          <b-card 
              class="m-2 col-3"
              v-for="plan in plans"
              v-bind:key="plan.id"
              :title="plan.title"
              :img-src="`http://t1.daumcdn.net/mapjsapi/images/bg_tile.png`"
              >
            <b-card-text>
              {{plan.description}}
            </b-card-text>
            <b-button :to="{ name: 'planview', params: { articleno: plan.id } }" variant="primary">자세히</b-button>
          </b-card>
        </div>
        <div id="board-list" class="mb-2 d-flex">
          <b-card 
              class="m-2 col-3"
              v-for="board in boards"
              v-bind:key="board.id"
              :title="board.title"
              >
            <b-card-text>
              {{board.description}}
            </b-card-text>
            <b-button :to="{ name: 'boardview', params: { articleno: board.id } }" variant="primary">자세히</b-button>
          </b-card>
        </div>
      </section>
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

export default {
  name: "AppMain",
  components: {},
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
  mounted(){
    http
      .get(`/hotplace/list/hot`)
      .then(({ data }) => {
        this.hotplaces = data;
      });
    http
      .get(`/plan/list/hot`)
      .then(({ data }) => {
        this.plans = data;
        console.log(data);
      });
    http
      .get(`/board/list/hot`)
      .then(({ data }) => {
        this.boards = data;
        console.log(data);
      });
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapState(["user"]),
  },
};
</script>

<style scoped>
#main-container {
  position: relative;
  width: 100%;
  height: 63vh;
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
