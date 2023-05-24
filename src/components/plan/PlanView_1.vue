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
    </div>

    <div id="plan-container" class="row">
      <div id="left-container" class="col-md-6 col-sm-12">
        <div id="original-map" style="width: 85% height: 90%"></div>
      </div>
      <div id="right-container" class="col-md-6 col-sm-12"></div>
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
        center: new kakao.maps.LatLng(37.500613, 127.036431), // 지도의 중심좌표
        level: 5, // 지도의 확대 레벨
      };
      this.originalMap = new kakao.maps.Map(originMapContainer, mapOption);
      // this.planmap = new kakao.maps.Map(planmapContainer, mapOption);
      this.makeMarkers();
    },
    makeMarkers() {
      /* ---------------- 사용자 입력 경로 ------------------ */
      let place_name = document.querySelectorAll(".old_place_name");
      let address = document.querySelectorAll(".old_address");
      let lat = document.querySelectorAll(".old_lat");
      let lng = document.querySelectorAll(".old_lng");
      let imgs = document.querySelectorAll(".fast_img");
      let bounds = new kakao.maps.LatLngBounds();

      for (let i = 0; i < lat.length; i++) {
        let data = {
          y: lat[i].innerText,
          x: lng[i].innerText,
          address_name: address[i].innerHTML,
          place_name: place_name[i].innerText,
          url_name: imgs[i].innerText,
        };
        this.displayMarker(data, this.map);
        bounds.extend(new kakao.maps.LatLng(data.y, data.x));

        // 선 그리기
        let latlng = new kakao.maps.LatLng(data.y, data.x);
        this.drawLine(latlng);
      }

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      this.map.setBounds(bounds);

      /* ---------------- 추천 경로 ------------------ */
      let lats = document.querySelectorAll(".fast_lat");
      let lngs = document.querySelectorAll(".fast_lng");
      let names = document.querySelectorAll(".fast_place_name");
      let addresses = document.querySelectorAll(".fast_address");
      let images = document.querySelectorAll(".fast_img");
      let planbounds = new kakao.maps.LatLngBounds();

      for (let i = 0; i < names.length; i++) {
        let data = {
          y: lats[i].innerHTML,
          x: lngs[i].innerHTML,
          address_name: addresses[i].innerText,
          place_name: names[i].innerHTML,
          url_name: images[i].innerText,
        };
        this.displayMarker(data, this.planmap);
        planbounds.extend(new kakao.maps.LatLng(data.y, data.x));

        // 선 그리기
        let planlatlng = new kakao.maps.LatLng(data.y, data.x);
        this.drawPlan(planlatlng);
      }

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      this.planmap.setBounds(planbounds);
    },

    displayMarker(place, inputmap) {
      var imageSrc = require("@/assets/img/location.png");
      var imageSize = new kakao.maps.Size(30, 35);
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      var marker = new kakao.maps.Marker({
        map: inputmap, // 마커를 표시할 지도
        position: new kakao.maps.LatLng(place.y, place.x), // 마커를 표시할 위치
        title: place.place_name, // a마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });
      this.markers.push(marker);
      var content = "";
      var noimg = require("@/assets/img/noimage.png");
      if (place.url_name == "undefined" || place.url_name == "/" || place.url_name == "  ") {
        place.url_name = require("@/assets/img/noimage.png");
      }
      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", () => {
        content =
          `<div class="wrap">` +
          `    <div class="info">` +
          `        <div class="title">` +
          `            ${place.place_name}` +
          `            <button class="close" onclick="this.parentNode.parentNode.parentNode.remove()" title="닫기"></button>` +
          `        </div>` +
          `        <div class="body">` +
          `            <div class="img">` +
          `                <img src="${place.url_name}" alt="${noimg}" width="73" height="70">` +
          `           </div>` +
          `            <div class="desc">` +
          `                <div class="ellipsis">${place.address_name}</div>` +
          `                <div><a href="https://map.kakao.com/link/to/${place.place_name},${place.y},${place.x}" style="color:blue" target="_blank" class="link">길찾기</a></div>` +
          `            </div>` +
          `        </div>` +
          `    </div>` +
          `</div>`;
        this.overlay = new kakao.maps.CustomOverlay({
          content: content,
          map: inputmap,
          position: new kakao.maps.LatLng(place.y, place.x),
        });

        this.overlay.setMap(inputmap);
        this.clickInfo = place;
      });
    },

    drawLine(latlng) {
      var clickPosition = latlng;
      // 지도 클릭이벤트가 발생했는데 선을 그리고있는 상태가 아니면
      if (!this.drawingFlag) {
        // 상태를 true로, 선이 그리고있는 상태로 변경합니다
        this.drawingFlag = true;

        // 클릭한 위치를 기준으로 선을 생성하고 지도위에 표시합니다
        this.clickLine = new kakao.maps.Polyline({
          map: this.map, // 선을 표시할 지도입니다
          path: [clickPosition], // 선을 구성하는 좌표 배열입니다 클릭한 위치를 넣어줍니다
          strokeWeight: 3, // 선의 두께입니다
          strokeColor: "#db4040", // 선의 색깔입니다
          strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
          strokeStyle: "solid", // 선의 스타일입니다
        });

        this.lines.push(this.clickLine);

        // 클릭한 지점에 대한 정보를 지도에 표시합니다
        this.displayCircleDot(clickPosition, 0);
      } else if (this.clickLine) {
        // 선이 그려지고 있는 상태이면
        // 그려지고 있는 선의 좌표 배열을 얻어옵니다
        var path = this.clickLine.getPath();
        // 좌표 배열에 클릭한 위치를 추가합니다
        path.push(clickPosition);
        // 다시 선에 좌표 배열을 설정하여 클릭 위치까지 선을 그리도록 설정합니다
        this.clickLine.setPath(path);
        // var distance = Math.round(this.clickLine.getLength());
        //  displayCircleDot(clickPosition, distance);
      }
    },

    drawPlan(latlng) {
      // 추가한 위치입니다
      var clickPosition = latlng;

      // 지도 클릭이벤트가 발생했는데 선을 그리고있는 상태가 아니면
      if (!this.plandrawingFlag) {
        // 상태를 true로, 선이 그리고있는 상태로 변경합니다
        this.plandrawingFlag = true;

        // 클릭한 위치를 기준으로 선을 생성하고 지도위에 표시합니다
        this.planclickLine = new kakao.maps.Polyline({
          map: this.planmap, // 선을 표시할 지도입니다
          path: [clickPosition], // 선을 구성하는 좌표 배열입니다 클릭한 위치를 넣어줍니다
          strokeWeight: 3, // 선의 두께입니다
          strokeColor: "#db4040", // 선의 색깔입니다
          strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
          strokeStyle: "solid", // 선의 스타일입니다
        });

        this.planlines.push(this.planclickLine);

        // 클릭한 지점에 대한 정보를 지도에 표시합니다
        this.displayCircleDot(clickPosition, 0);
      } else {
        // 선이 그려지고 있는 상태이면
        // 그려지고 있는 선의 좌표 배열을 얻어옵니다
        var path = this.planclickLine.getPath();
        // 좌표 배열에 클릭한 위치를 추가합니다
        path.push(clickPosition);
        // 다시 선에 좌표 배열을 설정하여 클릭 위치까지 선을 그리도록 설정합니다
        this.planclickLine.setPath(path);
        // var distance = Math.round(this.planclickLine.getLength());
        //  displayCircleDot(clickPosition, distance);
      }
    },

    displayCircleDot(position, distance) {
      // 클릭 지점을 표시할 빨간 동그라미 커스텀오버레이를 생성합니다
      var circleOverlay = new kakao.maps.CustomOverlay({
        content: '<span class="dot"></span>',
        position: position,
        zIndex: 1,
      });

      this.circleOverlays.push(circleOverlay);

      // 지도에 표시합니다
      circleOverlay.setMap(this.map);
      var distanceOverlay = new kakao.maps.CustomOverlay();
      if (distance > 0) {
        // 클릭한 지점까지의 그려진 선의 총 거리를 표시할 커스텀 오버레이를 생성합니다
        distanceOverlay = new kakao.maps.CustomOverlay({
          content: '<div class="dotOverlay">거리 <span class="number">' + distance + "</span>m</div>",
          position: position,
          yAnchor: 1,
          zIndex: 2,
        });

        // 지도에 표시합니다
        distanceOverlay.setMap(this.map);
      }

      // 배열에 추가합니다
      this.dots.push({ circle: circleOverlay, distance: distanceOverlay });
    },

    deleteClickLine() {
      if (this.clickLine) {
        this.clickLine.setMap(null);
        this.clickLine = null;
      }
    },

    deleteDistnce() {
      if (this.distanceOverlay) {
        this.distanceOverlay.setMap(null);
        this.distanceOverlay = null;
      }
    },

    deleteCircleDot() {
      let i;

      for (i = 0; i < this.dots.length; i++) {
        if (this.dots[i].circle) {
          this.dots[i].circle.setMap(null);
        }

        if (this.dots[i].distance) {
          this.dots[i].distance.setMap(null);
        }
      }

      this.dots = [];
    },

    moveModifyArticle() {
      alert("서비스 준비중입니다.");
      // console.log("글수정 하러가자!!!");
      // this.$router.push({ name: "planmodify", params: { articleno: this.article.id } });
    },
    deleteArticle() {
      this.$router.push({ name: "plandelete", params: { articleno: this.article.article.id } });
    },
    moveList() {
      this.$router.push({ name: "planlist" });
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
