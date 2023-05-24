<template>
  <div id="plan-view">
    <div class="header-container row d-flex justify-content-center mb-3">
      <div id="title-content" class="col-lg-7 col-md-10 col-sm-12 mt-5 align-self-center">
        <h3 class="mb-2">{{ plan.title }}</h3>
        <div class="clearfix align-content-center">
          <!-- 글 작성자 프로필 사진으로 바꿔야 함 -->
          <b-avatar v-if="user.image" variant="info" :src="`/upload/profile/${user.image}`" class="float-md-start me-2 mt-1" size="2.5rem"></b-avatar>
          <b-avatar v-else variant="info" :src="require('@/assets/img/user.png')" class="float-md-start me-2 mt-1" size="2.5rem"></b-avatar>
          <div>
            <span class="fw-bold">{{ plan.userId }}</span> <br />
            <span class="text-secondary fw-light" style="font-size: 0.9rem"> {{ createdAt }}&nbsp;&nbsp;&nbsp;&nbsp;조회 : {{ plan.hit }} </span>
            <span v-if="plan.userId == user.id" class="float-md-end">
              <button type="button" @click="$router.push({ name: 'planmodify', param: { articleno: articleno } })" class="btn btn-sm submit-btn me-2">글 수정</button>
              <button type="button" @click="deleteArticle" class="btn btn-sm submit-btn">글 삭제</button>
            </span>
          </div>
        </div>
      </div>
      <hr class="col-lg-7 col-md-10 col-sm-12 mt-3" />
    </div>

    <div id="plan-container" class="row mb-3">
      <div id="left-container" class="col-lg-4 col-md-6 col-sm-12 offset-lg-2 d-flex flex-column justify-content-center">
        <div class="d-flex mb-3">
          <h5 class="mx-4 mt-2"><b>여행 경로</b></h5>
          <!-- <button
            @click="
              isModalView = true;
              originalMap.style.zIndex = -1;
            "
            class="btn btn-sm submit-btn me-4"
          >
            최적 경로 보기
          </button> -->
        </div>
        <div class="flex-grow-1 d-flex justify-content-center">
          <div id="original-map" style="width: 85%; height: 90%"></div>
        </div>
      </div>

      <div id="right-container" class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
        <div id="plan-content-container" style="width: 85%">
          <div id="plan-title-container" class="mb-3">
            <label for="plan-title">계획 이름</label>
            <input id="plan-title" type="text" readonly="readonly" :value="plan.title" class="form-control" />
          </div>
          <div id="plan-date-container" class="mb-3">
            <div class="row">
              <div class="col-md-6">
                <label for="plan-start-date">출발일</label>
                <input id="plan-start-date" type="text" readonly="readonly" :value="plan.startDate" class="form-control" />
              </div>
              <div class="col-md-6">
                <label for="plan-end-date">도착일</label>
                <input id="plan-end-date" type="text" readonly="readonly" :value="plan.endDate" class="form-control" />
              </div>
            </div>
          </div>
          <div id="plan-desc-container">
            <label for="plan-description">계획 상세</label>
            <input id="plan-description" type="text" readonly="readonly" :value="plan.description" class="form-control overflow-auto" style="height: 10em" />
          </div>
        </div>
      </div>
    </div>

    <div id="timeline-container" class="row d-flex justify-content-center mb-2">
      <!-- <div id="timeline-content" class="col-lg-7 col-md-10 col-sm-12 d-flex justify-content-between"> -->
      <h5 class="col-lg-8 col-md-11"><b>타임라인</b></h5>

      <div id="timeline-content" class="col-lg-8 col-md-11 d-flex justify-content-evenly">
        <div v-for="(place, index) in places" :key="index" style="width: 10rem" class="flex-fill d-flex justify-content-evenly">
          <div>
            <img class="place-img" :src="require('@/assets/img/noimage.png')" />
            <div style="font-size: 0.9rem">
              <b>{{ place.name }}</b>
            </div>
            <div style="font-size: 0.8rem">{{ place.address }}</div>
          </div>
          <div v-if="index != places.length - 1" class="text-center mt-5">
            <img :src="require('@/assets/img/arrows.png')" height="50px" />
          </div>
        </div>
      </div>
    </div>

    <div id="fast-con" class="row d-flex justify-content-center mb-5">
      <div id="title-content" class="col-lg-7 col-md-10 col-sm-12 mt-5 align-self-center">
        <h5 class="mb-3"><b>최적 경로</b></h5>
        <div id="new-map" style="width: 85%; height: 30rem"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import http from "@/util/http-common";

export default {
  name: "PlanView",
  components: {},
  data() {
    return {
      articleno: Number,
      createdAt: "",
      plan: {},
      places: [],
      fastPlaces: [],
      originalMap: null,
      newMap: null,
      originalMarkers: [],
      newMarkers: [],
      originalPolyline: null,
      newPolyline: null,
      isModalView: false,
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "getToken"]),
    ...mapState(["user"]),
  },
  created() {
    this.articleno = this.$route.params.articleno;
    http
      .post(`/plan/${this.articleno}`, this.articleno, {
        headers: {
          "X-ACCESS-TOKEN": "Bearer " + this.getToken, // the token is a variable which holds the token
        },
      })
      .then(({ data }) => {
        this.plan = data.article;
        this.places = data.places;
        this.fastPlaces = data.fastPlaces;
        this.createdAt = data.article.createdAt.substring(0, 16);
      });
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.loadMap();
    } else {
      this.loadScript();
    }
  },
  methods: {
    loadScript() {
      console.log("load script");
      const script = document.createElement("script");
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=" + process.env.VUE_APP_KAKAO_MAP_API_KEY + "&libraries=services,clusterer,drawing";
      /* global kakao */ // eslint-disable-line no-unused-vars
      script.onload = () => {
        window.kakao.maps.load(this.loadMap);
      };

      document.head.appendChild(script);
    },
    loadMap() {
      console.log("load map");
      console.log(window.kakao.maps);
      const originMapContainer = document.getElementById("original-map"); // 지도를 표시할 div
      const newMapContainer = document.getElementById("new-map"); // 지도를 표시할 div
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.500613, 127.036431), // 지도의 중심좌표
        level: 5, // 지도의 확대 레벨
      };
      this.originalMap = new window.kakao.maps.Map(originMapContainer, mapOption);
      this.newMap = new window.kakao.maps.Map(newMapContainer, mapOption);
      this.makeMarkers("original");
      this.drawLine("original");
      this.makeMarkers("new");
      this.drawLine("new");
    },
    makeMarkers(status) {
      let markers;
      if (status == "original") {
        markers = this.places;
      } else {
        markers = this.fastPlaces;
      }
      this.makeMarker(markers, status);
    },
    makeMarker(results, status) {
      var bounds = new window.kakao.maps.LatLngBounds();
      for (let i = 0; i < results.length; i++) {
        var markerInfo = {
          title: results[i].name,
          latlng: new window.kakao.maps.LatLng(results[i].lat, results[i].lng),
          // image: data[i].first_image,
          addr: results[i].address,
          // zipcode: results[i].zipcode,
          // tel: results[i].phone,
          // mapUrl: results[i].place_url,
          placeId: results[i].placeId,
        };
        this.displayMarker(markerInfo, status);
        bounds.extend(new window.kakao.maps.LatLng(results[i].lat, results[i].lng));
      }
      if (status == "original") this.originalMap.setBounds(bounds);
      else this.newMap.setBounds(bounds);
    },
    displayMarker(markerInfo, status) {
      var imageSrc = require("@/assets/img/location.png");
      var imageSize = new window.kakao.maps.Size(35, 35); // 마커 이미지의 이미지 크기
      var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize); // 마커 이미지 생성

      let marker = {};
      if (status == "original") {
        marker = new window.kakao.maps.Marker({
          map: this.originalMap, // 마커를 표시할 지도
          position: markerInfo.latlng, // 마커를 표시할 위치
          title: markerInfo.title, // a마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시
          image: markerImage, // 마커 이미지
        });
        marker.setMap(this.originalMap);
        this.originalMarkers.push(marker);
      } else {
        marker = new window.kakao.maps.Marker({
          map: this.newMap, // 마커를 표시할 지도
          position: markerInfo.latlng, // 마커를 표시할 위치
          title: markerInfo.title, // a마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시
          image: markerImage, // 마커 이미지
        });
        marker.setMap(this.newMap);
        this.newMarkers.push(marker);
      }
    },
    drawLine(status) {
      var linePath = [];
      var place = [];

      if (status == "original") {
        place = this.places;
      } else {
        place = this.fastPlaces;
      }

      console.log(place);
      for (let i = 0; i < place.length; i++) {
        linePath.push(new window.kakao.maps.LatLng(place[i].lat, place[i].lng));
      }

      if (status == "original") {
        this.originalPolyline = new window.kakao.maps.Polyline({
          path: linePath, // 선을 구성하는 좌표배열
          strokeWeight: 5, // 선의 두께
          strokeColor: "#DB4040", // 선의 색깔
          strokeOpacity: 0.7, // 선의 불투명도
          strokeStyle: "solid", // 선의 스타일
        });
        this.originalPolyline.setMap(this.originalMap);
      } else {
        this.newPolyline = new window.kakao.maps.Polyline({
          path: linePath, // 선을 구성하는 좌표배열
          strokeWeight: 5, // 선의 두께
          strokeColor: "#DB4040", // 선의 색깔
          strokeOpacity: 0.7, // 선의 불투명도
          strokeStyle: "solid", // 선의 스타일
        });
        this.newPolyline.setMap(this.newMap);
      }
    },
    deleteArticle() {
      http
        .delete(`/plan/${this.articleno}`, {
          headers: {
            "X-ACCESS-TOKEN": "Bearer " + this.getToken, // the token is a variable which holds the token
          },
        })
        .then(({ data }) => {
          if (data === "success") {
            this.$router.push({ name: "planlist" });
          } else {
            alert("계획 삭제 중 문제가 발생했습니다. 다시 시도해 주세요.");
          }
        });
    },
  },
};
</script>

<style>
.header-container #plan-container,
#timeline-comtainer {
  box-sizing: border-box;
  max-width: 100vw;
}
#left-container,
#right-container {
  height: 60vh;
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
.place-img {
  width: 8rem;
  height: 8rem;
  object-fit: cover;
}
</style>
