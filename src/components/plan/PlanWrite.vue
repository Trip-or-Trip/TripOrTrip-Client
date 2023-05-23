<template>
  <div id="plan-write">
    <div id="service-container" class="row p-5">
      <div id="left-container" class="col-lg-2 col-md-3 d-flex flex-column p-2">
        <div class="text-center mb-2"><b>관광지를 검색하세요!</b></div>
        <div id="input-group-container" class="input-group input-group-sm mb-2">
          <input v-model="keyword" type="text" class="form-control" placeholder="검색어..." />
          <button type="button" @click="searchKeyword" class="btn submit-btn">검색</button>
        </div>
        <div id="result-container" class="flex-grow-1">
          <result-list-item v-for="(result, index) in results" :key="index" :result="result" @makeCustomOverlay="displayCustomOverlay"></result-list-item>
        </div>
      </div>
      <div id="center-container" class="col-lg-8 col-md-6">
        <div id="map" style="width: 100%; height: 100%"></div>
      </div>
      <div id="right-container" class="col-lg-2 col-md-3 p-2">
        <div class="text-center mb-2"><b>관광지를 내 계획에 추가하세요!</b></div>
        <draggable v-model="places">
          <plan-list-item v-for="(place, index) in places" :key="index" :place="place" :index="index" :total="places.length" @removeItem="removePlanItem"></plan-list-item>
        </draggable>
        <div class="mt-1 me-1" style="float: right; color: gray; font-size: 0.9rem">관광지 순서를 변경해 경로를 확인해 보세요!</div>
      </div>
    </div>

    <div class="d-flex flex-column mx-auto p-2" style="width: 100%; height: 35em">
      <h3 id="plan-title" class="text-center p-2"><strong>여행 계획</strong></h3>
      <div class="plan-container">
        <div id="plan-detail" class="d-flex flex-column align-items-center rounded mx-auto">
          <label for="plan-title"><strong>계획 이름</strong></label>
          <input v-model="plan.title" type="text" id="plan-title" placeholder="계획 이름" class="plan-detail-content align-middle ms-2 mt-2 rounded" style="width: 70%" />
          <br />
          <div class="plan-detail-date d-flex flex-row justify-content-between mb-3" style="width: 70%">
            <label for="st-date"><strong>출발일</strong></label>
            <input v-model="plan.sDate" type="date" id="st-date" placeholder="년도-월-일" style="width: 8em; height: 1.8em" class="plan-detail-content plan-detail-start ms-2 me-2 align-middle rounded" />
            <label for="end-date"><strong>도착일</strong></label>
            <input v-model="plan.eDate" type="date" id="end-date" placeholder="년도-월-일" style="width: 8em; height: 1.8em" class="plan-detail-content plan-detail-end ms-2 me-2 align-middle rounded" />
          </div>
          <label for="description"><strong>상세 계획</strong></label>
          <textarea v-model="plan.description" id="description" placeholder="상세 계획..." class="plan-detail-content align-middle ms-2 mt-2 rounded" style="width: 70%; height: 10em"> </textarea>
          <br />
          <button @click="savePlan" class="btn submit-btn" style="width: 5em">
            <strong>저장</strong>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ResultListItem from "@/components/plan/ResultListItem";
import PlanListItem from "@/components/plan/PlanListItem";
import { mapGetters, mapState } from "vuex";
import http from "@/util/http-common";
import draggable from "vuedraggable";

export default {
  name: "BoardWrite",
  components: {
    ResultListItem,
    PlanListItem,
    draggable,
  },
  data() {
    return {
      map: null,
      keyword: "",
      results: [],
      places: [],
      markers: [],
      selectedMarkers: [],
      overlay: null,
      polyline: null,
      plan: {
        title: "",
        sDate: "",
        eDate: "",
        description: "",
      },
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "getToken"]),
    ...mapState(["user"]),
  },
  watch: {
    places() {
      this.drawLine();
    },
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
      const mapContainer = document.querySelector("#map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.500613, 127.036431), // 지도의 중심좌표
        level: 5, // 지도의 확대 레벨
      };

      this.map = new window.kakao.maps.Map(mapContainer, mapOption);
    },
    searchKeyword() {
      this.initPage();

      if (!this.keyword) {
        alert("장소를 입력해 주세요.");
        return;
      }

      let ps = new window.kakao.maps.services.Places(); // 장소 검색 객체 생성

      let callback = (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          this.makeMarker(result);
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
          alert("검색 결과가 없습니다. 다시 시도해 주세요.");
        } else {
          alert("서버에 문제가 있습니다. 다시 시도해 주세요.");
        }
      };

      ps.keywordSearch(this.keyword, callback);
    },
    makeMarker(results) {
      var flag;
      var bounds = new window.kakao.maps.LatLngBounds();

      for (let i = 0; i < results.length; i++) {
        flag = true;
        for (let j = 0; j < this.places.length; j++) {
          if (results[i].place_name == this.places[j].place_name) {
            flag = false;
          }
          bounds.extend(new window.kakao.maps.LatLng(this.places[j].y, this.places[j].x));
        }
        if (!flag) {
          continue;
        }
        this.results.push(results[i]);

        var markerInfo = {
          title: results[i].place_name,
          latlng: new window.kakao.maps.LatLng(results[i].y, results[i].x),
          // image: data[i].first_image,
          addr: results[i].address_name,
          // zipcode: results[i].zipcode,
          tel: results[i].phone,
          mapUrl: results[i].place_url,
          placeId: results[i].id,
        };
        this.displayMarker(markerInfo, 0);
        bounds.extend(new window.kakao.maps.LatLng(results[i].y, results[i].x));
      }
      this.map.setBounds(bounds);
    },
    displayMarker(markerInfo, status) {
      var imageSrc;
      if (status) {
        imageSrc = require("@/assets/img/marker.png");
      } else {
        imageSrc = require("@/assets/img/location.png");
      }

      var imageSize = new window.kakao.maps.Size(35, 35); // 마커 이미지의 이미지 크기
      var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize); // 마커 이미지 생성

      // 마커 생성
      let marker = new window.kakao.maps.Marker({
        map: this.map, // 마커를 표시할 지도
        position: markerInfo.latlng, // 마커를 표시할 위치
        title: markerInfo.title, // a마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시
        image: markerImage, // 마커 이미지
      });

      // 마커가 지도 위에 표시되도록 설정
      marker.setMap(this.map);

      // 마커 배열에 추가
      if (status) {
        let selectedMarker = {
          marker: marker,
          placeId: markerInfo.placeId,
        };
        this.selectedMarkers.push(selectedMarker);
      } else {
        this.markers.push(marker);
      }
    },
    displayCustomOverlay(place) {
      if (this.overlay) this.overlay.setMap(null);

      let latlng = new window.kakao.maps.LatLng(place.y, place.x);
      let imageUrl = "";
      // if (place.first_image !== "") {
      //   image = place.first_image;
      // } else {
      //   image = require("@/assets/img/noimage.png");
      // }
      imageUrl = require("@/assets/img/noimage.png");

      if (!place.category_group_name) place.category_group_name = "기타";

      var customOverlay = new window.kakao.maps.CustomOverlay({
        position: latlng,
        map: this.map,
      });

      var wrap = document.createElement("div");
      wrap.className = "wrap";

      var info = document.createElement("div");
      info.className = "info";

      var title = document.createElement("div");
      title.className = "title";

      var close = document.createElement("div");
      close.id = "close";
      close.className = "close";
      close.onclick = function () {
        customOverlay.setMap(null);
      };

      var body = document.createElement("div");
      body.className = "body";

      var imageContainer = document.createElement("div");
      imageContainer.className = "img";

      var image = document.createElement("img");
      image.src = imageUrl;
      image.width = "73";
      image.height = "70";

      var desc = document.createElement("div");
      desc.className = "desc";

      var address = document.createElement("div");
      address.classList.add("ellipsis", "mb-1");

      var category = document.createElement("div");
      category.classList.add("jibun", "ellipsis");

      var linkContainer = document.createElement("div");
      linkContainer.className = "mt-1";

      var route = document.createElement("a");
      route.href = `https://map.kakao.com/link/to/${place.place_name},${latlng.Ma},${latlng.La}`;
      route.target = "_blank";
      route.classList.add("me-2", "url-link");
      route.style.color = "black";
      route.style.textDecoration = "none";

      var icon = document.createElement("i");
      icon.classList.add("tourist-icon", "bi", "bi-sign-turn-right", "me-1");

      var search = document.createElement("a");
      search.href = `https://search.naver.com/search.naver?where=view&sm=tab_jum&query=${place.place_name}`;
      search.target = "_blank";
      search.classList.add("me-2", "url-link");
      search.style.color = "black";
      search.style.textDecoration = "none";

      var searchIcon = document.createElement("i");
      searchIcon.classList.add("tourist-icon", "bi", "bi-search", "me-1");

      var button = document.createElement("button");
      button.classList.add("btn", "btn-primary", "add-btn");
      button.style.marginTop = "0.25rem";
      button.appendChild(document.createTextNode("추가"));
      button.onclick = () => {
        this.addPlanPlace(place);
      };

      title.appendChild(document.createTextNode(place.place_name));
      title.appendChild(close);

      address.appendChild(document.createTextNode(place.address_name));
      category.appendChild(document.createTextNode(`유형: ${place.category_group_name}`));

      if (place.place_url) {
        var mapUrl = document.createElement("a");
        mapUrl.href = place.place_url;
        mapUrl.target = "_blank";
        mapUrl.classList.add("me-2", "url-link");
        mapUrl.style.color = "black";
        mapUrl.style.textDecoration = "none";

        var mapIcon = document.createElement("i");
        mapIcon.classList.add("tourist-icon", "bi", "bi-geo-alt", "me-1");
        mapIcon.appendChild(document.createTextNode("지도 검색"));

        mapUrl.appendChild(mapIcon);
        linkContainer.appendChild(mapUrl);
      }

      icon.appendChild(document.createTextNode("길찾기"));
      route.appendChild(icon);
      linkContainer.appendChild(route);

      searchIcon.appendChild(document.createTextNode("블로그 검색"));
      search.appendChild(searchIcon);
      linkContainer.appendChild(search);

      imageContainer.appendChild(image);
      desc.appendChild(address);
      desc.appendChild(linkContainer);
      desc.appendChild(button);

      body.appendChild(imageContainer);
      body.appendChild(desc);

      info.appendChild(title);
      info.appendChild(body);

      wrap.appendChild(info);

      customOverlay.setMap(this.map);
      customOverlay.setContent(wrap);

      this.overlay = customOverlay;
      this.map.setCenter(latlng);
    },
    addPlanPlace(place) {
      this.initPage();
      this.keyword = "";
      this.places.push(place);
      this.makeMarker(this.places, 1);

      var markerInfo = {
        title: place.place_name,
        latlng: new window.kakao.maps.LatLng(place.y, place.x),
        addr: place.address_name,
        tel: place.phone,
        mapUrl: place.place_url,
        placeId: place.id,
      };
      this.displayMarker(markerInfo, 1);
      this.drawLine();
    },
    drawLine() {
      if (this.polyline) this.polyline.setMap(null);

      var linePath = [];
      for (let i = 0; i < this.places.length; i++) {
        linePath.push(new window.kakao.maps.LatLng(this.places[i].y, this.places[i].x));
      }
      this.polyline = new window.kakao.maps.Polyline({
        path: linePath, // 선을 구성하는 좌표배열
        strokeWeight: 5, // 선의 두께
        strokeColor: "#807CFC", // 선의 색깔
        strokeOpacity: 0.7, // 선의 불투명도
        strokeStyle: "solid", // 선의 스타일
      });
      this.polyline.setMap(this.map);
    },
    removeLine() {},
    removePlanItem(index, place) {
      this.places.splice(index, 1);

      let lat = (place.y * 1).toFixed(13);
      let lng = (place.x * 1).toFixed(13);
      this.removeMarker(lat, lng);

      this.removeSelectedMarker(place.id);

      this.drawLine();
    },
    removeSelectedMarker(placeId) {
      console.log(this.selectedMarkers);
      this.selectedMarkers = this.selectedMarkers.filter((marker) => marker.placeId !== placeId);
      console.log(this.selectedMarkers);
    },
    removeMarker(lat, lng) {
      for (let i = 0; i < this.selectedMarkers.length; i++) {
        if (this.selectedMarkers[i].marker.getPosition().getLat().toFixed(13) === lat && this.selectedMarkers[i].marker.getPosition().getLng().toFixed(13) === lng) {
          this.selectedMarkers[i].marker.setMap(null);
        }
      }
    },
    initPage() {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      if (this.overlay) this.overlay.setMap(null);
      this.results = [];
    },
    savePlan() {
      if (!this.checkValue()) return;

      let selectedPlaces = [];
      let selected;
      for (let i = 0; i < this.places.length; i++) {
        selected = {
          name: this.places[i].place_name,
          address: this.places[i].address_name,
          placeId: this.places[i].id,
          lat: this.places[i].y,
          lng: this.places[i].x,
          mapUrl: this.places[i].place_url,
        };
        selectedPlaces.push(selected);
      }

      let article = {
        userId: this.user.id,
        title: this.plan.title,
        description: this.plan.description,
        startDate: this.plan.sDate,
        endDate: this.plan.eDate,
        places: selectedPlaces,
      };
      http
        .post(`/plan/write`, article, {
          headers: {
            "X-ACCESS-TOKEN": "Bearer " + this.getToken, // the token is a variable which holds the token
          },
        })
        .then(({ data }) => {
          if (data === "success") {
            this.$router.push({ name: "planlist" });
          } else {
            alert("계획 작성 중 문제가 발생했습니다. 다시 시도해 주세요.");
          }
        });
    },
    checkValue() {
      if (!this.plan.title) {
        alert("계획 제목을 입력하세요.");
        return false;
      } else if (!this.plan.description) {
        alert("상세 계획을 입력하세요.");
        return false;
      } else if (!this.plan.sDate) {
        alert("출발일을 입력하세요.");
        return false;
      } else if (!this.plan.eDate) {
        alert("도착일을 입력하세요.");
        return false;
      } else if (!this.places.length) {
        alert("여행 장소를 입력하세요.");
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style>
#service-container {
  box-sizing: border-box;
  width: 100vw;
}
#left-container,
#right-container {
  border: 1px solid lightgray;
  border-radius: 0.5rem;
}
#left-container,
#center-container,
#right-container {
  height: 75vh;
}
#map {
  border-radius: 0.5rem;
}
#result-container {
  overflow: auto;
}
.submit-btn {
  /* background-color: white; */
  background-color: #aebdca;
  color: white;
}
.submit-btn:hover {
  /* background-color: white; */
  background-color: #8fa5b8;
}
.add-btn {
  font-size: 0.7rem;
  width: 2.5rem;
  height: 1.2rem;
  /* background-color: #c9d1da; */
}

.wrap {
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 310px;
  height: 132px;
  margin-left: -144px;
  text-align: left;
  overflow: hidden;
  font-size: 12px;
  line-height: 1.5;
}
.wrap * {
  padding: 0;
  margin: 0;
}
.wrap .info {
  width: 308px;
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
.url-link:hover {
  text-decoration: underline;
}
</style>
