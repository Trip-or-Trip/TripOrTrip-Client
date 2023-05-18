<template>
  <div class="tourist">
    <div class="container">
      <!-- 관광지 검색 하는 영역 start -->
      <form id="search-form" class="d-flex my-3" onsubmit="return false;" role="search" method="POST">
        <input type="hidden" name="root" id="root" value="${root}" />

        <!-- 지역 리스트 -->
        <select id="search-area" v-model="selectedSido" @change="findGuGun" class="form-select me-2">
          <option value="0" disabled>검색 지역 선택</option>
          <option v-for="sido in sidos" :key="sido.sidoCode" :value="sido.sidoCode">
            {{ sido.sidoName }}
          </option>
        </select>

        <!-- 구/군 리스트 -->
        <select id="search-gugun-id" v-model="selectedGugun" class="form-select me-2">
          <option v-if="guguns == null" value="0">구/군</option>
          <option v-for="gugun in guguns" :key="gugun.gugunCode" :value="gugun.gugunCode">
            {{ gugun.gugunName }}
          </option>
        </select>

        <!-- 관광지 유형 리스트 -->
        <select id="search-content-id" v-model="selectedContent" class="form-select me-2">
          <option value="0" selected>관광지 유형</option>
          <option value="12">관광지</option>
          <option value="14">문화시설</option>
          <option value="15">축제공연행사</option>
          <option value="25">여행코스</option>
          <option value="28">레포츠</option>
          <option value="32">숙박</option>
          <option value="38">쇼핑</option>
          <option value="39">음식점</option>
        </select>
        <button id="btn-search" class="btn submit-btn" type="button" @click="search" style="width: 10em">검색</button>
      </form>
      <!-- kakao map start -->
      <div id="map" class="mt-3" style="width: 100%; height: 550px"></div>
      <!-- kakao map end -->
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
      selectedContent: 0,
      overlay: {},
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
          console.log(this.guguns);
        })
        .catch((response) => {
          console.log(response);
        });
    },

    search() {
      if (this.selectedSido == 0) alert("검색 지역을 선택하세요");
      else if (this.selectedGugun == 0) alert("구/군을 선택하세요.");
      else if (this.selectedContent == 0) alert("관광지 유형을 선택하세요.");
      else {
        http
          .get(`/tourist/${this.selectedSido}/${this.selectedGugun}/${this.selectedContent}`)
          .then(({ data }) => this.makeMarker(data))
          .catch((response) => {
            console.log(response);
          });
      }
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
        };
        positions.push(markerInfo);
      }
      if (positions.length > 0) this.displayMarker(positions);
    },

    displayMarker(positions) {
      var imageSrc = require("@/assets/img/location.png"); // 마커 이미지의 이미지 주소

      for (let i = 0; i < positions.length; i++) {
        var imageSize = new window.kakao.maps.Size(30, 35); // 마커 이미지의 이미지 크기
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
        window.kakao.maps.event.addListener(marker, "click", () => {
          this.makeMapUrl(positions[i]);
        });
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
