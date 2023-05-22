<template>
  <div class="row justify-content-center">
    <div class="col-lg-8 col-md-10 col-sm-12">
      <h2 class="my-3 py-3 shadow-sm bg-light text-center">
        <mark class="sky">글쓰기</mark>
      </h2>
    </div>
    <div class="container d-flex" style="width: 80%">
      <div class="text-center col-2">
        <div class="d-flex my-3" style="width: 100%">
          <input
            id="search-keyword"
            class="form-control me-2"
            type="search"
            placeholder="검색어"
            aria-label="검색어"
          />
          <b-button @click="search" variant="info" style="width: 5em"> 검색 </b-button>
        </div>
        <div class="left-container">
          <div v-for="(result, index) in results" :key="index" @click="clickResult(result)">
            <div class="d-flex mb-1">
              <div class="icon flex-shrink-0 mx-2 mt-3">
                <i class="result-icon bi bi-search"></i>
              </div>
              <div class="mt-3 mb-1 me-2">
                <div class="title" style="font-size: 1.1rem">{{ result.place_name }}</div>
                <div class="description" style="font-size: 1rem">
                  {{ result.category_group_name }}
                </div>
                <p class="description" style="font-size: 0.9rem">
                  {{ result.address_name }} &nbsp;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <section class="position-relative">
          <!-- map이 들어갈 위치 -->
          <!-- kakao map start -->
          <div id="map" class="shadow rounded mx-auto p-2" style="width: 90%; height: 35em"></div>
          <!-- kakao map end -->
        </section>
        <div class="d-flex flex-row buttons mb-2 mx-auto p-2" style="right: 0px">
          <button
            class="z-3 btn delete-btn shadow p-2 me-2"
            id="plan-delete-btn"
            type="button"
            style="width: 4em; height: 2.5em; display: none"
          >
            초기화
          </button>
          <button
            class="place-add z-3 btn submit-btn shadow p-2"
            id="plan-add-btn"
            type="button"
            style="display: none; width: 4em; height: 2.5em"
            @click="addPlace"
          >
            추가
          </button>
        </div>
        <div class="divider mb-5"></div>
      </div>
      <div class="col-4">
        <aside>
          <!-- 여행 계획 들어가는 영역 -->
          <div class="d-flex flex-column mx-auto p-2" style="width: 100%; height: 35em">
            <h3 id="plan-title" class="text-center p-2"><strong>여행 계획</strong></h3>
            <div>
              <div
                id="plan-content"
                class="rounded bg-light shadow mb-2 mx-auto p-2 overflow-auto d-flex justify-content-center"
                style="width: 100%; height: 10em"
              >
                <div v-for="(place, index) in places" :key="index" class="border rounded">
                  <b-row align-h="end">
                    <b-button
                      class="col-3"
                      icon="dash-square-fill"
                      variant="danger"
                      @click="deletePlace(place.placeId)"
                    ></b-button>
                  </b-row>
                  <div class="text-center p-2">
                    <div class="place-title">{{ place.name }}</div>
                    <div>{{ place.address }}</div>
                  </div>
                </div>
              </div>
              <div class="divider mb-3"></div>
              <div id="plan-detail" class="d-flex flex-column align-items-center rounded mx-auto">
                <label for="name"><strong>계획 이름</strong></label>
                <input
                  v-model="title"
                  type="text"
                  name="title"
                  id="title"
                  placeholder="계획 이름"
                  class="plan-detail-content align-middle ms-2 mt-2 rounded shadow border-light-subtle"
                  style="width: 70%"
                />
                <br />
                <div
                  class="plan-detail-date d-flex flex-row justify-content-between mb-3"
                  style="width: 70%"
                >
                  <label for="start_datepicker"><strong>출발일</strong></label>
                  <input
                    v-model="sDate"
                    type="date"
                    name="startDate"
                    id="start_datepicker"
                    placeholder="년도-월-일"
                    style="width: 8em; height: 1.8em"
                    class="plan-detail-content plan-detail-start ms-2 me-2 align-middle rounded shadow border-light-subtle"
                  />
                  <label for="end_datepicker"><strong>도착일</strong></label>
                  <input
                    v-model="eDate"
                    type="date"
                    name="endDate"
                    id="end_datepicker"
                    placeholder="년도-월-일"
                    style="width: 8em; height: 1.8em"
                    class="plan-detail-content plan-detail-end ms-2 me-2 align-middle rounded shadow border-light-subtle"
                  />
                </div>
                <label for="description"><strong>상세 계획</strong></label>
                <textarea
                  v-model="description"
                  name="description"
                  id="description"
                  placeholder="상세 계획을 적어보자!"
                  class="plan-detail-content align-middle ms-2 mt-2 rounded shadow border-light-subtle"
                  style="width: 70%; height: 10em"
                ></textarea>
                <br />
                <b-button variant="primary" @click="savePlan" style="width: 5em">
                  <strong>저장</strong>
                </b-button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import http from "@/util/http-common";
export default {
  name: "BoardWrite",
  data() {
    return {
      sDate: null,
      eDate: null,
      userid: "ssafy",
      title: null,
      description: null,
      markers: [],
      overlay: Array,
      idxs: [],
      lines: [],
      dots: [],
      places: [],
      circleOverlays: [],
      clickInfo: null,
      searchedImgs: Object,
      areaUrl:
        "https://apis.data.go.kr/B551011/PhotoGalleryService1/gallerySearchList1?MobileOS=WIN&MobileApp=triportrip&keyword=",
      keyUrl:
        "&serviceKey=qqmr9xPPIeNaINQ4yBU1GUJljRKSxzGUILRxGpdQBkEyF16vLpll%2BbPZ%2FeFeoXRQIuE1OJReyMcWmRxtbNElSQ%3D%3D",
      results: [],
    };
  },

  computed: {
    ...mapGetters(["isLoggedIn", "getToken"]),
    ...mapState(["user"]),
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      // window.kakao.maps.load(this.loadMap);
      this.loadMap();
    } else {
      this.loadScript();
    }
  },
  methods: {
    clickResult(place) {
      var bounds = new kakao.maps.LatLngBounds();
      bounds.extend(new kakao.maps.LatLng(place.y, place.x));
      this.map.setBounds(bounds);
    },
    loadScript() {
      const script = document.createElement("script");
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=" +
        process.env.VUE_APP_KAKAO_MAP_API_KEY +
        "&libraries=services,clusterer,drawing&autoload=false";
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

    savePlan() {
      if (!this.checkValue()) return;
      let article = {
        userId: this.userid,
        title: this.title,
        description: this.description,
        startDate: this.sDate,
        endDate: this.eDate,
        places: this.places,
      };
      http
        .post(`/plan/write`, article, {
          headers: {
            "X-ACCESS-TOKEN": "Bearer " + this.getToken, // the token is a variable which holds the token
          },
        })
        .then(({ data }) => {
          let msg = "글 작성 시 문제 발생!!!";
          if (data === "success") msg = "글 작성 성공!!!";
          alert(msg);
          this.moveList();
        });
    },
    checkValue() {
      if (!this.title) {
        alert("계획 제목을 입력하세요.");
        return false;
      } else if (!this.description) {
        alert("상세 계획을 입력하세요.");
        return false;
      } else if (!this.sDate) {
        alert("출발일을 입력하세요.");
        return false;
      } else if (!this.eDate) {
        alert("도착일을 입력하세요.");
        return false;
      } else if (!this.places) {
        alert("여행 장소를 입력하세요.");
        return false;
      } else {
        return true;
      }
    },

    search() {
      if (!document.getElementById("search-keyword").value) {
        alert("장소명을 입력해주세요!");
        return;
      }
      let ps = new kakao.maps.services.Places();
      ps.keywordSearch(document.getElementById("search-keyword").value, this.placesSearchCB);
    },

    placesSearchCB(datas, status) {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new kakao.maps.LatLngBounds();
        this.searchedImgs = new Map();
        for (var i = 0; i < datas.length; i++) {
          var keyword = datas[i].place_name.split(" ")[0];
          var newUrl = this.areaUrl + keyword + this.keyUrl;
          var place = datas[i];
          fetch(newUrl, { headers: { Accept: "application/json" } })
            .then((response) => response.text())
            .then((data) => this.makeOption(data, keyword, place.id));

          this.displayMarker(datas[i], keyword);
          bounds.extend(new kakao.maps.LatLng(datas[i].y, datas[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        this.map.setBounds(bounds);
        this.results = datas;
        console.log(datas);
      }
    },

    async makeOption(data, keyword, id) {
      let noimg = require("@/assets/img/noimage.png");
      let parser = new DOMParser();
      const xml = parser.parseFromString(data, "application/xml");
      let areas = xml.querySelectorAll("item");
      if (areas.length == 0) {
        this.searchedImgs.set(keyword, noimg);
        console.log(id);
      } else {
        var area = areas[0];
        this.searchedImgs.set(
          area.querySelector("galTitle").innerHTML.split(" ")[0],
          area.querySelector("galWebImageUrl").innerHTML
        );
      }
    },

    addPlace() {
      document.querySelectorAll(".overlay").forEach((e) => e.remove());
      let placeName = this.clickInfo.place_name;
      let placeAddr = this.clickInfo.address_name;
      let placeId = this.clickInfo.id;
      let placeLat = this.clickInfo.y;
      let placeLng = this.clickInfo.x;
      // let placeTel = this.clickInfo.phone;
      //  let placeImageUrl = "./assets/img/noimage.png";
      // let placeImageUrl = this.searchedImgs.get(placeName.split(" ")[0]);

      this.places.push({
        name: placeName,
        address: placeAddr,
        placeId: placeId,
        lat: placeLat,
        lng: placeLng,
      });

      let latlng = new kakao.maps.LatLng(this.clickInfo.y, this.clickInfo.x);
      this.drawLine(latlng);
      this.clickInfo = null;

      // 지도 선 삭제
      // let mark;

      let latlngLa = latlng.La.toFixed(13);
      let latlngMa = latlng.Ma.toFixed(13);

      let len = this.idxs.length;
      // marker들 뒤에서부터 읽어오면서 위도 경도 값이 같다면 그대로 두고 아닌 것들은 마커 다 삭제
      for (var i = this.markers.length - 1; i >= len; i--) {
        // console.log(i);
        if (
          this.markers[i].getPosition().getLat().toFixed(13) == latlngMa &&
          this.markers[i].getPosition().getLng().toFixed(13) == latlngLa
        ) {
          this.idxs.push(this.markers[i]);
        } else {
          this.markers[i].setMap(null);
          this.markers.splice(i, 1);
        }
      }
      document.getElementById("plan-add-btn").style.display = "none";
      document.getElementById("overlay").remove();
    },
    // 장소 삭제하면 호출되는 메서드 --------------------------------------- >
    deletePlace(placeId) {
      this.places = this.places.filter((place) => place.placeId !== placeId);

      // 마커 삭제
      let lat = this.places.lat * 1;
      let lng = this.places.lng * 1;

      this.planMarkers = this.planMarkers.filter((marker) => marker.placeId !== placeId);

      this.deleteMarker(lat, lng, this.places);

      // 그려진 선 삭제
      this.deleteLine();

      this.drawingFlag = false;

      // 선 다시 그리기
      this.places.forEach((place) => {
        this.drawLine(place, true);
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

    // 선 삭제하기
    deleteLine() {
      if (this.clickLine) {
        this.clickLine.setMap(null);
        this.clickLine = null;
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
          content:
            '<div class="dotOverlay">거리 <span class="number">' + distance + "</span>m</div>",
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

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", () => {
        content =
          `<div class="wrap" id="overlay">` +
          `    <div class="info">` +
          `        <div class="title">` +
          `            ${place.place_name}` +
          `            <div id="close" class="close" onclick='this.parentNode.parentNode.parentNode.remove(); document.getElementById("plan-add-btn").style.display = "none";' title="닫기"></div>` +
          `        </div>` +
          `        <div class="body">` +
          `            <div class="img">` +
          `                <img id="${place.place_name}" src="` +
          this.searchedImgs.get(place.place_name.split(" ")[0]) +
          `" alt="${place.place_name}" width="73" height="70">` +
          `           </div>` +
          `            <div class="desc">` +
          `                <div class="ellipsis">${place.address_name}</div>` +
          `                <div class="jibun ellipsis">${place.category_group_name}</div>` +
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
        // document.getElementById("plan-save-btn").style.display = "block";

        this.clickInfo = place;
      });
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

.left-container {
  height: 80vh;
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.left-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
</style>
