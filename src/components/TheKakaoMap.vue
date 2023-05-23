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
    plans(){
      this.updateMap();
    }
  },
  created() {
    
  },
  mounted() {
    // api 스크립트 소스 불러오기 및 지도 출력
    if (window.kakao && window.kakao.maps) {
      this.loadMap();
    } else {
      this.loadScript();
    }
    this.updateMap();
  },
  methods: {
    // api 불러오기
    loadScript() {
      // const script = document.createElement("script");
      // script.src =
      //   "//dapi.kakao.com/v2/maps/sdk.js?appkey=" +
      //   process.env.VUE_APP_KAKAO_MAP_API_KEY +
      //   "&libraries=services&autoload=false";
      // /* global kakao */ //eslint-disable-line no-unused-vars
      // script.onload = () => window.kakao.maps.load(this.loadMap); 
      // document.head.appendChild(script);
    },
    // 맵 출력하기
    loadMap() {
      // const container = document.getElementById("map");
      // const options = {
      //   center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      //   level: 3,
      // };

      // this.map = new window.kakao.maps.Map(container, options);
    },

    updateMap(){
      // console.log(this.plans[0]);
      // let tmp = this.plans;
      // var staticMapContainer = document.getElementById("map"); // 이미지 지도를 표시할 div
      //     const staticMapOption = {
      //       center: new window.kakao.maps.LatLng(this.plans[0].lat, this.plans[0].lng), // 이미지 지도의 중심좌표
      //       level: 3, // 이미지 지도의 확대 레벨
      //     };
      //     new window.kakao.maps.StaticMap(staticMapContainer, staticMapOption);
      // for (var i = 0; i < tmp.length; i++) {
      //     var staticMapContainer = document.getElementById("map"); // 이미지 지도를 표시할 div
      //     const staticMapOption = {
      //       center: new window.kakao.maps.LatLng(this.plans[0].lat, this.plans[0].lng), // 이미지 지도의 중심좌표
      //       level: 3, // 이미지 지도의 확대 레벨
      //     };
      //     new window.kakao.maps.StaticMap(staticMapContainer, staticMapOption);
      // }
      // console.log(kakao);
    }
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
