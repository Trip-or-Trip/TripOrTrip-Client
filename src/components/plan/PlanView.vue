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
              <!-- <button type="button" @click="deleteArticle" class="btn btn-sm submit-btn">글 삭제</button> -->
              <button type="button" class="btn btn-sm submit-btn">글 삭제</button>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div id="plan-container" class="row">
      <div id="left-container" class="col-md-6 col-sm-12 d-flex justify-content-center">
        <div id="original-map" style="width: 85%; height: 90%"></div>
      </div>

      <div id="right-container" class="col-md-6 col-sm-12 d-flex justify-content-center">
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

    <!-- <div class="col-lg-8 col-md-10 col-sm-12 align-self-center">
      <h2 class="my-3 py-3 shadow-sm bg-light text-center">
        <mark class="sky">여행계획 상세보기</mark>
      </h2>
    </div>
    <div class="col-lg-8 col-md-10 col-sm-12 align-self-center">
      <h2>{{ this.article.article.title }}</h2>
      <div class="row">
        <div class="col-md-8">
          <div class="d-flex flex-col align-content-center">
            <img v-if="user.image" :src="`/upload/profile/${user.image}`" class="hotplace-profile-img me-3 rounded" style="width: 3em; height: 3em" />
            <img v-else :src="require('@/assets/img/user.png')" class="hotplace-profile-img me-3" />
            <p>
              <span class="fw-bold">{{ article.article.userId }}</span> <br />
              <span class="text-secondary fw-light"> {{ article.article.createdAt }} 조회 : {{ article.article.hit }} </span>
            </p>
          </div>
        </div>
        <div class="divider mb-3"></div>
        <div class="container">
          <div class="row">



            <div id="map" class="col-md-8 shadow rounded mx-auto p-2 mb-2" style="height: 25em"></div>

            <div v-for="place in article.places" :key="place.id" class="border border-4 rounded me-1 p-2" style="width: 20%; display: none">
              <div class="travel-info">
                <strong id="old_place_name" class="old_place_name" style="display: none">{{ place.name }}</strong>
                <p id="old_address" class="old_address" style="display: none">
                  {{ place.address }}
                </p>
                <div id="old_lat" class="old_lat" style="display: none">{{ place.lat }}</div>
                <div id="old_lng" class="old_lng" style="display: none">{{ place.lng }}</div>
                <div id="old_img" class="old_img" style="display: none">{{ place.imageUrl }}</div>
              </div>
            </div>



            <div class="plan-box container col-md-4" style="height: 25em">
              <div class="row">
                <div class="col-md-6">
                  <label for="register-id">등록자</label>
                  <input id="register-id" type="text" readonly="readonly" v-bind:value="article.article.userId" class="form-control" />
                </div>
                <div class="col-md-6">
                  <label for="register-date">등록일</label>
                  <input id="register-date" type="text" readonly="readonly" v-bind:value="article.article.createdAt" class="form-control" />
                </div>
              </div>
              <label for="plan-title">계획 이름</label>
              <input id="plan-title" type="text" readonly="readonly" v-bind:value="article.article.title" class="form-control" />
              <div class="row">
                <div class="col-md-6">
                  <label for="plan-start-date">출발일</label>
                  <input id="plan-start-date" type="text" readonly="readonly" v-bind:value="article.article.startDate" class="form-control" />
                </div>
                <div class="col-md-6">
                  <label for="plan-end-date">도착일</label>
                  <input id="plan-end-date" type="text" readonly="readonly" v-bind:value="article.article.endDate" class="form-control" />
                </div>
              </div>
              <label for="plan-description">계획 상세</label>
              <input id="plan-description" type="text" readonly="readonly" v-bind:value="article.article.description" class="form-control overflow-auto" style="height: 10em" />
            </div>
          </div>
        </div>
        <div class="divider mb-4"></div>
        <h2 align="center">추천 경로</h2>
        <div id="planmap" class="col-md-8 shadow rounded mx-auto p-2 mb-2" style="height: 25em"></div>
        <div class="d-flex center flex-row" style="height: 7em">
          <div class="d-flex center flex-row" v-for="(fastPlace, index) in article.fastPlaces" v-bind:key="fastPlace.id">
            <div class="border border-4 rounded me-1 p-2">
              <div class="travel-info">
                <strong id="fast_place_name" class="fast_place_name">{{ fastPlace.name }}</strong>
                <p id="fast_address" class="fast_address">{{ fastPlace.address }}</p>
                <div id="fast_lat" class="fast_lat" style="display: none">{{ fastPlace.lat }}</div>
                <div id="fast_lng" class="fast_lng" style="display: none">{{ fastPlace.lng }}</div>
                <div id="fast_img" class="fast_img" style="display: none">
                  {{ fastPlace.imageUrl }}
                </div>
              </div>
            </div>
            <div v-if="index != article.fastPlaces.length - 1" class="d-flex align-items-center" style="width: 50%">
              <img :src="require('@/assets/img/arrows.png')" @error="require('@/assets/img/noimage.png')" style="width: 100%" class="me-2" />
            </div>
          </div>
        </div>
        <div class="divider mb-3"></div>
        <div class="align-middle">
          <h2>타임 라인</h2>
          <div v-for="(fastPlace, index) in article.fastPlaces" v-bind:key="fastPlace.id">
            <div v-if="index % 2 == 0" class="mb-2 container row" style="margin: 100 auto">
              <div class="col-md-8 p-3 travel-box d-flex flex-row align-content-center border border-4 rounded" style="width: 50%; margin: 0 auto">
                <img
                  v-if="fastPlace.imageUrl == '/' || fastPlace.imageUrl == 'undefined'"
                  :src="require('@/assets/img/noimage.png')"
                  @error="
                    {
                      {
                        fastPlace.name;
                      }
                    }
                  "
                  style="width: 50%"
                  class="me-2"
                />
                <img v-else :src="fastPlace.imageUrl" :alt="fastPlace.name" style="width: 50%" class="me-2" />
                <div class="travel-info">
                  <h2 class="place_name">{{ fastPlace.name }}</h2>
                  <p class="address">{{ fastPlace.address }}</p>
                  <div class="lat" style="display: none">{{ fastPlace.lat }}</div>
                  <div class="lng" style="display: none">{{ fastPlace.lng }}</div>
                </div>
              </div>
              <div class="col-md-4" style="width: 10em"></div>
            </div>

            <div v-else class="mb-2 row">
              <div class="col-md-8 p-3 travel-box d-flex flex-row align-content-center border border-4 rounded" style="width: 50%; margin: 0 auto">
                <img
                  v-if="fastPlace.imageUrl == '/' || fastPlace.imageUrl == 'undefined'"
                  :src="require('@/assets/img/noimage.png')"
                  @error="
                    {
                      {
                        fastPlace.name;
                      }
                    }
                  "
                  style="width: 50%"
                  class="me-2"
                />
                <img v-else :src="fastPlace.imageUrl" :alt="fastPlace.name" style="width: 50%" class="me-2" />
                <div class="travel-info">
                  <h2 class="place_name">{{ fastPlace.name }}</h2>
                  <p class="address">{{ fastPlace.address }}</p>
                  <div class="lat" style="display: none">{{ fastPlace.lat }}</div>
                  <div class="lng" style="display: none">{{ fastPlace.lng }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="divider mt-3 mb-3"></div>
          <div class="d-flex justify-content-end">
            <div style="padding-top: 15px">
              <b-button @click="moveList">글목록</b-button>
              <b-button v-if="user.id == article.article.userId" @click="moveModifyArticle"> 글수정 </b-button>
              <b-button v-if="user.id == article.article.userId" @click="deleteArticle"> 글삭제 </b-button>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import http from "@/util/http-common";

export default {
  name: "PlanView",
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

      // article: Object,
      // overlay: Array,
      // clickInfo: Object,
      // drawingFlag: false, // 선이 그려지고 있는 상태를 가지고 있을 변수입니다
      // plandrawingFlag: false, // 선이 그려지고 있는 상태를 가지고 있을 변수입니다
      // clickLine: Object, // 마우스로 클릭한 좌표로 그려질 선 객체입니다
      // planclickLine: Object, // 마우스로 클릭한 좌표로 그려질 선 객체입니다
      // distanceOverlay: Object, // 선의 거리정보를 표시할 커스텀오버레이 입니다
      // dots: [], // 선이 그려지고 있을때 클릭할 때마다 클릭 지점과 거리를 표시하는 커스텀 오버레이 배열입니다.
      // lines: [],
      // planlines: [],
      // markers: [],
      // planmarkers: [],
      // circleOverlays: [],
      // disOverlays: [],
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
      const script = document.createElement("script");
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=" + process.env.VUE_APP_KAKAO_MAP_API_KEY + "&libraries=services,clusterer,drawing&autoload=false";
      /* global kakao */ // eslint-disable-line no-unused-vars
      script.onload = () => window.kakao.maps.load(this.loadMap);

      document.head.appendChild(script);
    },
    loadMap() {
      const originMapContainer = document.getElementById("original-map"); // 지도를 표시할 div
      // const planmapContainer = document.getElementById("planmap"); // 지도를 표시할 div
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.500613, 127.036431), // 지도의 중심좌표
        level: 5, // 지도의 확대 레벨
      };
      this.originalMap = new window.kakao.maps.Map(originMapContainer, mapOption);
      // this.planmap = new kakao.maps.Map(planmapContainer, mapOption);
      this.makeMarkers("original");
      this.drawLine("original");
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
      console.log("draw line call");
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
        console.log("draw line originsl");
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
  },
};
</script>

<style>
#left-container,
#right-container {
  height: 60vh;
  border: 1px solid black;
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
</style>
