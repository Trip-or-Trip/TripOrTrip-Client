<template>
  <div class="tourist">
    <div class="fluid-container mt-5">
      <div class="row">
        <div class="left-container col-lg-2 col-md-3">
          <div class="result-container">
            <div id="search-title-container" class="px-3 py-2 border-bottom">검색 결과</div>
            <div v-for="(result, index) in results" :key="index" @click="clickResult(result, $event)">
              <div class="d-flex mb-1">
                <div class="icon flex-shrink-0 mx-2 mt-3">
                  <i class="result-icon bi bi-search"></i>
                </div>
                <div class="mt-3 mb-1 me-2">
                  <div class="title" style="font-size: 1.1rem">{{ result.title }}</div>
                  <p class="description" style="font-size: 0.9rem">
                    {{ result.addr1 }} &nbsp;<span style="color: gray">(우){{ result.zipcode }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right-container col-lg-10 col-md-9">
          <!-- 관광지 검색 하는 영역 start -->
          <form id="search-form" class="my-3" onsubmit="return false;" role="search" method="POST">
            <div id="map-container" class="row d-flex justify-content-center">
              <div class="col-4">
                <!-- 지역 리스트 -->
                <!-- <select id="search-area" v-model="selectedSido" @change="findGuGun" class="form-select me-2"> -->
                <select id="search-area" v-model="selectedSido" @change="[findGuGun(), search()]" class="form-select">
                  <option value="0" disabled>검색 지역 선택</option>
                  <option v-for="sido in sidos" :key="sido.sidoCode" :value="sido.sidoCode">
                    {{ sido.sidoName }}
                  </option>
                </select>
              </div>

              <div class="col-4">
                <!-- 구/군 리스트 -->
                <select id="search-gugun-id" v-model="selectedGugun" @change="search" class="form-select">
                  <option v-if="guguns == null" value="0">구/군</option>
                  <option v-for="gugun in guguns" :key="gugun.gugunCode" :value="gugun.gugunCode">
                    {{ gugun.gugunName }}
                  </option>
                </select>
              </div>

              <!-- <div class="col-2">
            <button id="btn-search" class="btn submit-btn" type="button" @click="search" style="width: 100%">검색</button>
          </div> -->
            </div>

            <div class="content-type mt-3 text-center">
              <!-- 관광지 유형 리스트 -->
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" v-model="selectedContents" @change="search" value="12" id="type-1" />
                <label class="form-check-label" for="type-1">관광지</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" v-model="selectedContents" @change="search" value="14" id="type-2" />
                <label class="form-check-label" for="type-2">문화시설</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" v-model="selectedContents" @change="search" value="15" id="type-3" />
                <label class="form-check-label" for="type-3">축제공연행사</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" v-model="selectedContents" @change="search" value="28" id="type-5" />
                <label class="form-check-label" for="type-5">레포츠</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" v-model="selectedContents" @change="search" value="32" id="type-6" />
                <label class="form-check-label" for="type-6">숙박</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" v-model="selectedContents" @change="search" value="38" id="type-7" />
                <label class="form-check-label" for="type-7">쇼핑</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" v-model="selectedContents" @change="search" value="39" id="type-8" />
                <label class="form-check-label" for="type-8">음식점</label>
              </div>
            </div>
          </form>

          <div class="map-container d-flex justify-content-center">
            <!-- kakao map start -->
            <div id="map" class="mt-3" style="width: 90%; height: 550px"></div>
            <!-- kakao map end -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/util/http-common";

export default {
  name: "SearchTourist",
  data() {
    return {
      map: null,
      sidos: null,
      guguns: null,
      selectedSido: 0,
      selectedGugun: 0,
      selectedContents: [],
      results: [],
      overlay: null,
      markers: [],
    };
  },
  created() {
    http
      .get(`/tourist`)
      .then(({ data }) => {
        this.sidos = data;
      })
      .catch((response) => {
        console.log(response);
      });
  },
  updated() {},
  mounted() {
    if (window.kakao && window.kakao.maps) {
      // window.kakao.maps.load(this.loadMap);
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
      const mapContainer = document.querySelector("#map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.500613, 127.036431), // 지도의 중심좌표
        level: 5, // 지도의 확대 레벨
      };

      this.map = new window.kakao.maps.Map(mapContainer, mapOption);
    },
    findGuGun() {
      http
        .get(`/tourist/${this.selectedSido}`)
        .then(({ data }) => {
          this.guguns = data;
          this.selectedGugun = data[0].gugunCode;
        })
        .catch((response) => {
          console.log(response);
        });
    },

    // eslint-disable-next-line no-unused-vars
    clickResult(place, event) {
      this.makeUrl(place);
    },

    makeUrl(place) {
      let ps = new window.kakao.maps.services.Places(); // 장소 검색 객체 생성

      let callback = (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          this.addCustomOverlay(result[0].place_url, place);
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
          this.addCustomOverlay("", place);
        } else {
          alert("서버에 문제가 있습니다. 다시 시도해 주세요.");
        }
      };

      ps.keywordSearch(place.title, callback);
    },

    addCustomOverlay(mapUrl, place) {
      if (this.overlay) this.overlay.setMap(null);

      let latlng = new window.kakao.maps.LatLng(place.latitude, place.longitude);
      let image = "";
      if (place.first_image !== "") {
        image = place.first_image;
      } else {
        image = require("@/assets/img/noimage.png");
      }

      let content = `
        <div class="wrap">
          <div class="info">
            <div class="title">
              ${place.title}
            </div>
            <div class="body">
              <div class="img">
              <img src="${image}" width="73" height="70">
            </div>
            <div class="desc">
              <div class="ellipsis mb-1">${place.addr1}</div>
              <div class="jibun ellipsis">(우) ${place.zipcode}</div>
              <div class="mt-1">`;

      if (mapUrl !== "") {
        content += `<a href="${mapUrl}" target="_blank" class="me-2" style="color: black; text-decoration: none;"><i class="tourist-icon bi bi-geo-alt me-1"></i>지도검색</a>`;
      }

      content += `<a href="https://map.kakao.com/link/to/${place.title},${latlng.Ma},${latlng.La}" target="_blank" class="me-2" style="color: black; text-decoration: none;"><i class="tourist-icon bi bi-sign-turn-right me-1"></i>길찾기</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;

      this.overlay = new window.kakao.maps.CustomOverlay({
        content: content,
        map: this.map,
        position: latlng,
      });

      this.overlay.setMap(this.map);
      this.map.setCenter(latlng);
    },

    search() {
      if (this.selectedSido == 0 || this.selectedGugun == 0 || this.selectedContents.length == 0) return;
      let contents = "";
      for (let i = 0; i < this.selectedContents.length - 1; i++) {
        contents += this.selectedContents[i] + ",";
      }
      contents += this.selectedContents[this.selectedContents.length - 1];

      http
        .get(`/tourist/${this.selectedSido}/${this.selectedGugun}/${contents}`)
        .then(({ data }) => {
          this.results = data;
          console.log(data);
          this.makeMarker(data);
        })
        .catch((response) => {
          console.log(response);
        });
    },

    makeMarker(data) {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      let positions = [];
      for (let i = 0; i < data.length; i++) {
        var markerInfo = {
          title: data[i].title,
          latlng: new window.kakao.maps.LatLng(data[i].latitude, data[i].longitude),
          image: data[i].first_image,
          addr: data[i].addr1,
          zipcode: data[i].zipcode,
          tel: data[i].tel,
          contentTypeId: data[i].contentTypeId,
        };
        positions.push(markerInfo);
      }
      if (positions.length > 0) this.displayMarker(positions);
    },

    displayMarker(positions) {
      // var imageSrc = require("@/assets/img/location.png"); // 마커 이미지의 이미지 주소
      var imageSrc;

      for (let i = 0; i < positions.length; i++) {
        if (positions[i].contentTypeId == 12) imageSrc = require("@/assets/img/camera.png");
        else if (positions[i].contentTypeId == 14) imageSrc = require("@/assets/img/culture.png");
        else if (positions[i].contentTypeId == 15) imageSrc = require("@/assets/img/festival.png");
        else if (positions[i].contentTypeId == 28) imageSrc = require("@/assets/img/leisure.png");
        else if (positions[i].contentTypeId == 32) imageSrc = require("@/assets/img/hotel.png");
        else if (positions[i].contentTypeId == 38) imageSrc = require("@/assets/img/shop.png");
        else if (positions[i].contentTypeId == 39) imageSrc = require("@/assets/img/restaurant.png");
        else imageSrc = require("@/assets/img/location.png");

        var imageSize = new window.kakao.maps.Size(35, 35); // 마커 이미지의 이미지 크기
        var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize); // 마커 이미지 생성

        // 마커 생성
        let marker = new window.kakao.maps.Marker({
          map: this.map, // 마커를 표시할 지도
          position: positions[i].latlng, // 마커를 표시할 위치
          title: positions[i].title, // a마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시
          image: markerImage, // 마커 이미지
        });

        // 마커가 지도 위에 표시되도록 설정
        marker.setMap(this.map);

        // 마커 배열에 추가
        this.markers.push(marker);

        // 마커에 클릭 이벤트 등록
        // window.kakao.maps.event.addListener(marker, "click", () => {
        //   this.makeMapUrl(positions[i]);
        // });
      }

      this.map.setCenter(positions[0].latlng);
    },

    makeMapUrl(marker) {
      console.log(marker);
      console.log("makeMapUrl 호출");
      let ps = new window.kakao.maps.services.Places(); // 장소 검색 객체 생성

      let callback = (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          this.displayCustomOverlay(result[0].place_url, marker);
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
          this.displayCustomOverlay("", marker);
        } else {
          alert("서버에 문제가 있습니다. 다시 시도해 주세요.");
        }
      };

      ps.keywordSearch(marker.title, callback);
    },

    displayCustomOverlay(mapUrl, marker) {
      let image = "";
      if (marker.image !== "") {
        image = marker.image;
      } else {
        image = require("@/assets/img/noimage.png");
      }

      let content = `
        <div class="wrap">
          <div class="info">
            <div class="title">
              ${marker.title}
              <div class="close" @click="closeOverlay" title="닫기"></div>
            </div>
            <div class="body">
              <div class="img">
              <img src="${image}" width="73" height="70">
            </div>
            <div class="desc">
              <div class="ellipsis mb-1">${marker.addr}</div>
              <div class="jibun ellipsis">(우) ${marker.zipcode}</div>
              <div class="mt-1">`;

      if (mapUrl !== "") {
        content += `<a href="${mapUrl}" target="_blank" class="me-2" style="color: black; text-decoration: none;"><i class="tourist-icon bi bi-geo-alt me-1"></i>지도검색</a>`;
      }

      content += `<a href="https://map.kakao.com/link/to/${marker.title},${marker.latlng.Ma},${marker.latlng.La}" target="_blank" class="me-2" style="color: black; text-decoration: none;"><i class="tourist-icon bi bi-sign-turn-right me-1"></i>길찾기</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;

      this.overlay = new window.kakao.maps.CustomOverlay({
        content: content,
        map: this.map,
        position: marker.latlng,
      });

      this.overlay.setMap(this.map);
    },

    closeOverlay() {
      console.log("닫기 함수 호출");
      // btn.parentNode.parentNode.parentNode.remove();
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
.left-container {
  height: 80vh;
  padding-left: 3rem;
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.left-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
.result-container {
  border: 1px solid rgb(231, 231, 231);
}
#search-title-container {
  background-color: #d5dfe7;
}
.result-icon {
  font-size: 1.4rem;
}
</style>
