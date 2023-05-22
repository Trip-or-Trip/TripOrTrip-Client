<template>
  <div id="plan-write">
    <div class="row p-5">
      <div id="left-container" class="col-lg-2 col-md-3 d-flex flex-column p-2">
        <div id="input-group-container" class="input-group input-group-sm mb-2">
          <input v-model="keyword" type="text" class="form-control" placeholder="검색어..." />
          <button type="button" @click="searchKeyword" class="btn submit-btn">검색</button>
        </div>
        <div id="result-container" class="flex-grow-1">
          <result-list-item v-for="(result, index) in results" :key="index" :result="result"></result-list-item>
        </div>
      </div>
      <div id="center-container" class="col-lg-8 col-md-6">
        <div id="map" style="width: 100%; height: 100%"></div>
      </div>
      <div id="right-container" class="col-lg-2 col-md-3">
        <draggable v-model="places">
          <transition-group>
            <div v-for="(place, index) in places" :key="index">
              {{ place.title }}
            </div>
          </transition-group>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import ResultListItem from "@/components/plan/ResultListItem";
import { mapGetters, mapState } from "vuex";
// import http from "@/util/http-common";
import draggable from "vuedraggable";

export default {
  name: "BoardWrite",
  components: {
    ResultListItem,
    draggable,
  },
  data() {
    return {
      keyword: "",
      results: [],
      places: [],
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
      if (!this.keyword) {
        alert("장소를 입력해 주세요.");
        return;
      }
      this.results = [];

      let ps = new window.kakao.maps.services.Places(); // 장소 검색 객체 생성

      let callback = (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          this.results = result;
          console.log(this.results);
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
          alert("검색 결과가 없습니다. 다시 시도해 주세요.");
        } else {
          alert("서버에 문제가 있습니다. 다시 시도해 주세요.");
        }
      };

      ps.keywordSearch(this.keyword, callback);
    },
  },
};
</script>

<style>
#left-container,
#center-container,
#right-container {
  height: 75vh;
  border: 1px solid black;
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
</style>
