<template>
  <div v-if="open" id="hotplace-search">
    <div class="form-container">
      <form>
        <div class="row justify-content-center form-group-row">
          <div class="col-7 mt-3">
            <input type="text" v-model="keyword" id="search-keyword" class="form-control" placeholder="장소명" />
          </div>
          <div class="col-2 mt-3">
            <button type="button" @click="searchTitle" id="keyword-search-btn" class="btn submit-btn" style="width: 100%">검색</button>
          </div>
          <div class="col-2 mt-3">
            <button type="button" id="title-submit-btn" class="btn submit-btn" style="width: 100%">선택</button>
          </div>
        </div>
        <div id="result-container" class="mt-3"></div>
      </form>
    </div>
  </div>
</template>

<script>
function copyStyles(sourceDoc, targetDoc) {
  Array.from(sourceDoc.styleSheets).forEach((styleSheet) => {
    if (styleSheet.cssRules) {
      const newStyleEl = sourceDoc.createElement("style");

      Array.from(styleSheet.cssRules).forEach((cssRule) => {
        newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
      });

      targetDoc.head.appendChild(newStyleEl);
    } else if (styleSheet.href) {
      const newLinkEl = sourceDoc.createElement("link");

      newLinkEl.rel = "stylesheet";
      newLinkEl.href = styleSheet.href;
      targetDoc.head.appendChild(newLinkEl);
    }
  });
}

export default {
  name: "HotplaceSearch",
  components: {},
  model: {
    prop: "open",
    event: "close",
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      windowRef: null,
      data: "",
      places: [],
    };
  },
  watch: {
    open(newOpen) {
      if (newOpen) this.openPopup();
      else this.closePopup();
    },
  },
  created() {},
  methods: {
    openPopup() {
      let popupWidth = 1000;
      let popupHeight = 700;
      let popupX = window.screen.width / 2 - popupWidth / 2;
      let popupY = window.screen.height / 2 - popupHeight / 2;

      this.windowRef = window.open("", "", "width=" + popupWidth + ", height=" + popupHeight + ", left=" + popupX + ", top=" + popupY + ", scrollbars=yes");
      this.windowRef.document.body.appendChild(this.$el);

      this.windowRef.console.log(this.$el);
      copyStyles(window.document, this.windowRef.document);
      this.windowRef.addEventListener("beforeunload", this.closePopup);
    },
    closePopup() {
      if (this.windowRef) {
        this.windowRef.close();
        this.windowRef.removeEventListener("beforeunload", this.closePopup);
        this.windowRef = null;
        this.$emit("close", false); // 부모창의 binding된 open에게 값을 넘김
      }
    },
    searchTitle() {
      if (!this.keyword) {
        this.windowRef.alert("장소를 입력해 주세요.");
      } else {
        this.windowRef.console.log(this.keyword);
        this.places = [];

        let ps = new kakao.maps.services.Places(); // 장소 검색 객체 생성
        this.windowRef.console.log("출력");

        // let callback = (result, status) => {
        //   this.windowRef.console.log(status);
        //   if (status === kakao.maps.services.Status.OK) {
        //     this.windowRef.console.log(result);
        //     this.places = result;
        //     // this.displaySearchResult(result);
        //   } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        //     this.windowRef.alert("검색 결과가 없습니다. 다시 시도해 주세요.");
        //   } else {
        //     this.windowRef.alert("서버에 문제가 있습니다. 다시 시도해 주세요.");
        //   }
        // };

        ps.keywordSearch(this.keyword, this.searchCallback);
        this.windowRef.console.log("검색 종료");
      }
    },
    searchCallback(result, status) {
      this.windowRef.console.log(status);
      if (status === kakao.maps.services.Status.OK) {
        this.windowRef.console.log(result);
        this.places = result;
        // this.displaySearchResult(result);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        this.windowRef.alert("검색 결과가 없습니다. 다시 시도해 주세요.");
      } else {
        this.windowRef.alert("서버에 문제가 있습니다. 다시 시도해 주세요.");
      }
    },
  },

  mounted() {
    const script = document.createElement("script");

    /* global kakao */
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=74afa46ef6c4beac029af5a59d571a47&libraries=services&autoload=false";
    // script.onload = () => window.kakao.maps.load(this.loadMap);
    this.windowRef.document.head.appendChild(script);

    if (this.open) {
      this.openPopup();
    }
  },
  beforeDestroy() {
    if (this.windowRef) {
      this.closePopup();
    }
  },
};
</script>

<style>
body {
  text-align: center;
}

.form-container {
  display: inline-block;
  width: 700px;
  margin-top: 2rem;
  border-radius: 0.5rem;
  border: 1px solid lightgray;
}

.place-container {
  display: inline-block;
  width: 100%;
  padding: 1.5rem 1rem;
  text-align: center;
  border: 1px solid white;
}
</style>
