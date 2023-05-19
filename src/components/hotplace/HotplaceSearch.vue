<template>
  <div id="hotplace-search">
    <div class="overlay" @click="$emit('close-modal')"></div>
    <div class="modal-card">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header mb-3">
            <h5 class="modal-title">장소 검색</h5>
            <button type="button" @click="$emit('close-modal')" class="btn-close"></button>
          </div>
          <div class="modal-body">
            <div>
              <div class="form-container">
                <form>
                  <div class="row justify-content-center form-group-row">
                    <div class="col-7 mt-3">
                      <input type="text" v-model="keyword" id="search-keyword" class="form-control" placeholder="장소명" />
                    </div>
                    <div class="col-2 mt-3">
                      <button type="button" @click="searchTitle" id="keyword-search-btn" class="btn submit-btn" style="width: 100%">검색</button>
                    </div>
                    <!-- <div class="col-2 mt-3">
                      <button type="button" id="title-submit-btn" class="btn submit-btn" style="width: 100%">선택</button>
                    </div> -->
                  </div>
                  <div id="result-container" class="mt-3">
                    <div v-show="places.length" id="search-content">
                      <div @click="selectedOne" v-for="(place, index) in places" :key="index" class="place-container d-flex justify-content-center form-group-row">
                        <div class="col-4">
                          <div>{{ place.place_name }}</div>
                        </div>
                        <div class="col-6">
                          <div>{{ place.address_name }}</div>
                        </div>
                        <div class="col-2">
                          <button type="button" @click.prevent="selectedOne(place, $event)" class="btn select-btn">선택</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HotplaceSearch",
  components: {},
  props: {},
  data() {
    return {
      keyword: "",
      places: [],
    };
  },
  created() {},
  mounted() {
    if (!window.kakao || !window.kakao.maps) {
      this.loadScript();
    } else {
      console.log(window.kakao.maps);
    }
  },
  methods: {
    loadScript() {
      const script = document.createElement("script");

      /* global kakao */ // eslint-disable-line no-unused-vars
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=" + process.env.VUE_APP_KAKAO_MAP_API_KEY + "&libraries=services,clusterer,drawing&autoload=false";
      script.onload = () => window.kakao.maps.load();

      document.head.appendChild(script);
    },
    searchTitle() {
      if (!this.keyword) {
        alert("장소를 입력해 주세요.");
      } else {
        console.log(this.keyword);
        this.places = [];

        let ps = new window.kakao.maps.services.Places(); // 장소 검색 객체 생성

        let callback = (result, status) => {
          console.log(status);
          if (status === window.kakao.maps.services.Status.OK) {
            this.places = result;
            // this.addClickEvent();
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            alert("검색 결과가 없습니다. 다시 시도해 주세요.");
          } else {
            alert("서버에 문제가 있습니다. 다시 시도해 주세요.");
          }
        };

        ps.keywordSearch(this.keyword, callback);
        console.log("검색 종료");
      }
    },
    // addClickEvent() {
    //   for (let i = 0; i < this.places.length; i++) {}
    // },

    // eslint-disable-next-line no-unused-vars
    selectedOne(place, event) {
      // console.log(place);
      // console.log(event);
      this.$emit("searchResult", place);
      this.$emit("close-modal");
    },
  },
};
</script>

<style>
#hotplace-search,
.overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}
.overlay {
  opacity: 0.5;
  background-color: black;
}
.modal-card {
  position: relative;
  width: 80%;
  max-width: 70rem;
  height: 42rem;
  margin: auto;
  margin-top: 10rem;
  padding: 20px;
  background-color: white;
  min-height: 500px;
  z-index: 10;
  opacity: 1;
  overflow-y: auto;
}
.modal-dialog {
  height: 38rem;
}
.modal-content {
  height: 8rem;
}
.place-container {
  display: inline-block;
  width: 100%;
  padding: 1.5rem 1rem;
  text-align: center;
  border: 1px solid white;
}
.result-container {
  display: inline-block;
  width: 100%;
  height: 470px;
}
.select-btn {
  background-color: #e0e6ec;
}
.select-btn:hover {
  background-color: #d2d9e0;
}
</style>
