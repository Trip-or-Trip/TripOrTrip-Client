<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  name: "KakaoMap",
  components: {},
  data() {
    return {
      map: null,
    };
  },
  props: {
    plans: [],
  },
  watch: {
    plans() {
      let tmp = this.plans.places;
      for (var i = 0; i < tmp.length; i++) {
        for (var j = 0; j < tmp[i].length; j++) {
          var staticMapContainer = document.getElementById("map"); // 이미지 지도를 표시할 div
          console.log(staticMapContainer);
          const staticMapOption = {
            center: new kakao.maps.LatLng(37.499453350021426, 127.03316070814535), // 이미지 지도의 중심좌표
            level: 3, // 이미지 지도의 확대 레벨
          };
          new kakao.maps.StaticMap(staticMapContainer, staticMapOption);
        }
      }
    },
  },
  created() {},
  mounted() {
    // api 스크립트 소스 불러오기 및 지도 출력
    if (window.kakao && window.kakao.maps) {
      this.loadMap();
    } else {
      this.loadScript();
    }
  },
  methods: {
    // api 불러오기
    loadScript() {
      const script = document.createElement("script");
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=" +
        process.env.VUE_APP_KAKAO_MAP_API_KEY +
        "&libraries=services&autoload=false";
      /* global kakao */
      script.onload = () => window.kakao.maps.load(this.loadMap);

      document.head.appendChild(script);
    },
    // 맵 출력하기
    loadMap() {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      this.map = new window.kakao.maps.Map(container, options);
    },
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
