<template>
  <div>
    <div id="map" style="height: 17rem"></div>
  </div>
</template>

<script>
import http from "@/util/http-common";

export default {
  name: "KakaoMap",
  components: {},
  data() {
    return {
      map: null,
      polyline: null,
    };
  },
  props: {
    plans: [],
    idx: Number,
  },
  watch: {
    plans() {
      this.updateMap();
    },
  },
  created() {},
  mounted() {
    // api 스크립트 소스 불러오기 및 지도 출력
    if (window.kakao && window.kakao.maps) {
      this.updateMap();
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
      /* global kakao */ //eslint-disable-line no-unused-vars
      script.onload = () => window.kakao.maps.load(this.updateMap);
      document.head.appendChild(script);
    },

    updateMap() {
      let newIdx = this.idx;
      console.log(this.plans.places[newIdx]);
      if (this.plans.places && this.plans.places[newIdx].length > 0) {
        http.get(`/plan/list/${this.plans.places[newIdx][0].planId}`).then(({ data }) => {
          document.getElementById("map-" + this.idx).firstChild.id = "map-" + this.idx;
          var staticMapContainer = document.getElementById("map-" + this.idx); // 이미지 지도를 표시할 div
          const staticMapOption = {
            center: new window.kakao.maps.LatLng(data[0].lat, data[0].lng), // 이미지 지도의 중심좌표
            level: 5, // 이미지 지도의 확대 레벨
          };
          this.map = new window.kakao.maps.Map(staticMapContainer, staticMapOption);
          for (var i = 0; i < data.length; i++) {
            this.expandMap(data[i]);
          }
          this.drawLine(data);
        });
      } else {
        http.get(`/plan/list/${this.plans.places.planId}`).then(({ data }) => {
          document.getElementById("map-" + this.idx).firstChild.id = "map-" + this.idx;
          var staticMapContainer = document.getElementById("map-" + this.idx); // 이미지 지도를 표시할 div
          const staticMapOption = {
            center: new window.kakao.maps.LatLng(data[0].lat, data[0].lng), // 이미지 지도의 중심좌표
            level: 2, // 이미지 지도의 확대 레벨
          };
          this.map = new window.kakao.maps.Map(staticMapContainer, staticMapOption);
          for (var i = 0; i < data.length; i++) {
            this.expandMap(data[i]);
          }
          this.drawLine(data);
        });
      }

      // for (var i = 0; i < tmp.length; i++) {
      //   var staticMapContainer = document.getElementById("map"); // 이미지 지도를 표시할 div
      //   const staticMapOption = {
      //     center: new window.kakao.maps.LatLng(this.plans[0].lat, this.plans[0].lng), // 이미지 지도의 중심좌표
      //     level: 3, // 이미지 지도의 확대 레벨
      //   };
      //   new window.kakao.maps.StaticMap(staticMapContainer, staticMapOption);
      // }
      // console.log(kakao);
    },
    expandMap(place) {
      // console.log(place);
      var bounds = this.map.getBounds();
      bounds.extend(new window.kakao.maps.LatLng(place.lat, place.lng));
      var imageSrc = require("@/assets/img/marker.png");
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new window.kakao.maps.Size(30, 35);

      // 마커 이미지를 생성합니다
      var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다
      new window.kakao.maps.Marker({
        map: this.map, // 마커를 표시할 지도
        position: new kakao.maps.LatLng(place.lat, place.lng), // 마커를 표시할 위치
        title: place.name, // a마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });
      // console.log(marker);

      this.map.setBounds(bounds);
    },

    drawLine(places) {
      if (this.polyline) this.polyline.setMap(null);

      var linePath = [];
      for (let i = 0; i < places.length; i++) {
        linePath.push(new window.kakao.maps.LatLng(places[i].lat, places[i].lng));
      }
      this.polyline = new window.kakao.maps.Polyline({
        path: linePath, // 선을 구성하는 좌표배열
        strokeWeight: 5, // 선의 두께
        strokeColor: "#807CFC", // 선의 색깔
        strokeOpacity: 0.7, // 선의 불투명도
        strokeStyle: "solid", // 선의 스타일
      });
      this.polyline.setMap(this.map);
      // marker 선 그리는 부분 end !! //
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
