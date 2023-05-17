<template>
  <v-app>
    <div class="col-lg-8 col-md-10 col-sm-12 align-self-center">
      <h2 class="my-3 py-3 shadow-sm bg-light text-center">
        <mark class="sky">여행계획 상세보기</mark>
      </h2>
    </div>
    <div class="col-lg-8 col-md-10 col-sm-12 align-self-center">
      <div class="row my-2">
        <h2 class="text-secondary px-5">{{ article.article.title }}</h2>
      </div>
      <div class="row">
        <div class="col-md-8">
          <div class="clearfix align-content-center">
            <img class="avatar me-2 float-md-start bg-light p-2" src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg" />
            <p>
              <span class="fw-bold">{{ article.article.userId }}</span> <br />
              <span class="text-secondary fw-light"> {{ article.article.createdAt }} 조회 : {{ article.article.hit }} </span>
            </p>
          </div>
        </div>
        <div class="col-md-4 align-self-center text-end">댓글 : 0</div>
        <div class="divider mb-3"></div>
        <div class="container">
          <div class="row">
            <!-- kakao map 보여주기 -->
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
            <!-- kakao map 영역 끝 -->
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
        <div class="d-flex center flex-row">
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
            <div v-show="index != article.fastPlaces.length - 1" class="d-flex align-items-center" style="width: 50%">
              <img :src="require('@/assets/img/arrows.png')" @error="require('@/assets/img/noimage.png')" style="width: 100%" class="me-2" />
            </div>
          </div>
        </div>
        <div class="divider mb-3"></div>
        <div class="align-middle">
          <h2>타임 라인</h2>
          <!-- <div>
            <b-carousel
              id="carousel-1"
              v-model="slide"
              :interval="4000"
              controls
              indicators
              background="#ababab"
              img-width="1024"
              img-height="480"
              style="text-shadow: 1px 1px 2px #333"
              @sliding-start="onSlideStart"
              @sliding-end="onSlideEnd"
            >
              <b-carousel-slide
                v-for="fastPlace in article.fastPlaces"
                v-bind:key="fastPlace.id"
                :img-src="fastPlace.imageUrl"
                :caption="fastPlace.name"
                :text="fastPlace.address"
              >
              </b-carousel-slide>
            </b-carousel>
          </div> -->
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
            <!-- 본인일때만 글수정, 글 삭제 버튼 보이도록 함 -->
            <div style="padding-top: 15px">
              <v-btn @click="moveList">글목록</v-btn>
              <v-btn  v-if="user.id == article.article.userId"  @click="moveModifyArticle" >
                글수정
              </v-btn>
              <v-btn v-if="user.id == article.article.userId" @click="deleteArticle">
                글삭제
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import http from "@/util/http-common";
export default {
  name: "PlanView",
  data() {
    return {
      articleno: Number,
      article: Object,
      overlay: Array,
      clickInfo: Object,
      drawingFlag: false, // 선이 그려지고 있는 상태를 가지고 있을 변수입니다
      plandrawingFlag: false, // 선이 그려지고 있는 상태를 가지고 있을 변수입니다
      clickLine: Object, // 마우스로 클릭한 좌표로 그려질 선 객체입니다
      planclickLine: Object, // 마우스로 클릭한 좌표로 그려질 선 객체입니다
      distanceOverlay: Object, // 선의 거리정보를 표시할 커스텀오버레이 입니다
      dots: [], // 선이 그려지고 있을때 클릭할 때마다 클릭 지점과 거리를 표시하는 커스텀 오버레이 배열입니다.
      lines: [],
      planlines: [],
      markers: [],
      planmarkers: [],
      circleOverlays: [],
      disOverlays: [],
    };
  },
  created() {
    // 비동기
    // TODO : 글번호에 해당하는 글정보 얻기.
    this.articleno = this.$route.params.articleno;
    console.log(this.articleno);
    http.get(`/plan/${this.articleno}`).then(({ data }) => {
      this.article = data;
    });
  },
  computed: {
    ...mapGetters(["isLoggedIn", "getToken"]),
    ...mapState(["user"]),
  },
  mounted() {
    const script = document.createElement("script");

    /* global kakao */
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=74afa46ef6c4beac029af5a59d571a47&libraries=services,clusterer,drawing&autoload=false";
    script.onload = () => window.kakao.maps.load(this.loadMap);
    document.head.appendChild(script);
  },
  methods: {
    loadMap() {
      const mapContainer = document.getElementById("map"); // 지도를 표시할 div
      const mapOption = {
        center: new kakao.maps.LatLng(37.500613, 127.036431), // 지도의 중심좌표
        level: 5, // 지도의 확대 레벨
      };

      const planmapContainer = document.getElementById("planmap"); // 지도를 표시할 div
      const planmapOption = {
        center: new kakao.maps.LatLng(37.500613, 127.036431), // 지도의 중심좌표
        level: 5, // 지도의 확대 레벨
      };

      this.map = new kakao.maps.Map(mapContainer, mapOption);
      this.planmap = new kakao.maps.Map(planmapContainer, planmapOption);
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
        this.displayMarker(data);
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
        this.displayMarkerPlan(data);
        planbounds.extend(new kakao.maps.LatLng(data.y, data.x));

        // 선 그리기
        let planlatlng = new kakao.maps.LatLng(data.y, data.x);
        this.drawPlan(planlatlng);
      }

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      this.planmap.setBounds(planbounds);
    },

    displayMarker(place) {
      // 마커 이미지의 이미지 주소입니다
      var imageSrc = require("@/assets/img/location.png");

      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(30, 35);

      // 마커 이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: this.map, // 마커를 표시할 지도
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
          `            <div class="close" onclick="closeOverlay(this)" title="닫기"></div>` +
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
          map: this.map,
          position: new kakao.maps.LatLng(place.y, place.x),
        });

        this.overlay.setMap(this.map);

        // 추가 버튼 보이게 하기 (활성화)
        document.getElementById("plan-add-btn").style.display = "block";
        // 저장 버튼 보이게 하기 (활성화)
        document.getElementById("plan-save-btn").style.display = "block";

        this.clickInfo = place;
      });
    },

    displayMarkerPlan(place) {
      // 마커 이미지의 이미지 주소입니다
      var imageSrc = require("@/assets/img/location.png");

      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(30, 35);

      // 마커 이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: this.planmap, // 마커를 표시할 지도
        position: new kakao.maps.LatLng(place.y, place.x), // 마커를 표시할 위치
        title: place.place_name, // a마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });

      this.planmarkers.push(marker);

      var content = "";
      var noimg = require("@/assets/img/noimage.png");

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", () => {
        content =
          `<div class="wrap">` +
          `    <div class="info">` +
          `        <div class="title">` +
          `            ${place.place_name}` +
          `            <div class="close" @click="closeOverlay(this)" title="닫기"></div>` +
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

        var overlay = new kakao.maps.CustomOverlay({
          content: content,
          map: this.planmap,
          position: new kakao.maps.LatLng(place.y, place.x),
        });

        overlay.setMap(this.planmap);

        // 추가 버튼 보이게 하기 (활성화)
        document.getElementById("plan-add-btn").style.display = "block";
        // 저장 버튼 보이게 하기 (활성화)
        document.getElementById("plan-save-btn").style.display = "block";

        this.clickInfo = place;
      });
    },
    closeOverlay(btn) {
      btn.parentNode.parentNode.parentNode.remove();
    },

    drawLine(latlng) {
      // 추가한 위치입니다

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
.wrap {
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 288px;
  height: 132px;
  margin-left: -144px;
  text-align: left;
  overflow: hidden;
  font-size: 12px;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  line-height: 1.5;
}

.wrap * {
  padding: 0;
  margin: 0;
}

.wrap .info {
  width: 286px;
  height: 120px;
  border-radius: 5px;
  border-bottom: 2px solid #ccc;
  border-right: 1px solid #ccc;
  overflow: hidden;
  background: #fff;
}

.wrap .info:nth-child(1) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}

.info .title {
  padding: 5px 0 0 10px;
  height: 30px;
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  font-weight: bold;
}

.info .close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #888;
  width: 17px;
  height: 17px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png");
}

.info .close:hover {
  cursor: pointer;
}

.info .body {
  position: relative;
  overflow: hidden;
}

.info .desc {
  position: relative;
  margin: 13px 0 0 90px;
  height: 75px;
}

.desc .ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.desc .jibun {
  font-size: 11px;
  color: #888;
  margin-top: -2px;
}

.info .img {
  position: absolute;
  top: 6px;
  left: 5px;
  width: 73px;
  height: 71px;
  border: 1px solid #ddd;
  color: #888;
  overflow: hidden;
}

.info:after {
  content: "";
  position: absolute;
  margin-left: -12px;
  left: 50%;
  bottom: 0;
  width: 22px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}

.info .link {
  color: #5085bb;
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
