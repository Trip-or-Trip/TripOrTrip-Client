<template>
  <div id="hotplce-insert">
    <!-- 핫플레이스 추가 modal start -->
    <div class="overlay" @click="$emit('close-modal')"></div>
    <div class="modal-card">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">핫플 자랑하기</h5>
            <button type="button" @click="$emit('close-modal')" class="btn-close"></button>
          </div>
          <div class="modal-body">
            <div class="login-container text-center">
              <div style="display: inline-block; width: 25rem">
                <input type="hidden" id="root" value="${root}" />
                <input type="hidden" id="hotplace-latitude" name="latitude" />
                <input type="hidden" id="hotplace-longitude" name="longitude" />
                <input type="hidden" id="hotplace-map-url" name="mapUrl" />
                <div class="row d-flex justify-content-center">
                  <div class="col-10">
                    <input type="file" class="form-control my-3 px-3 py-2" accept="image/jpeg, image/png, image/jpg" id="hotplace-image" name="hotplace-image" placeholder="이미지" required />
                  </div>
                </div>
                <div class="row d-flex justify-content-center">
                  <div class="col-10">
                    <!-- <input type="text" @click="open = true" class="form-control my-3 py-2" id="hotplace-title" name="title" placeholder="장소명" required /> -->
                    <input type="text" class="form-control my-3 py-2" id="hotplace-title" name="title" placeholder="장소명" required />
                  </div>
                </div>
                <div class="row d-flex justify-content-center">
                  <div class="col-10">
                    <input type="date" class="form-control my-3 px-3 py-2" id="hotplace-join-date" name="joinDate" placeholder="방문 날짜" />
                  </div>
                </div>
                <div class="row d-flex justify-content-center">
                  <div class="col-10">
                    <textarea rows="4" class="form-control my-3 px-3 py-2 h-20" id="hotplace-desc" name="desc" placeholder="설명"></textarea>
                  </div>
                </div>
                <div class="row d-flex justify-content-center">
                  <div class="col-10">
                    <input type="text" class="form-control my-3 px-3 py-2" id="hotplace-tag1" name="tag1" placeholder="해시태그1" />
                  </div>
                </div>
                <div class="row d-flex justify-content-center">
                  <div class="col-10">
                    <input type="text" class="form-control my-3 px-3 py-2" id="hotplace-tag2" name="tag2" placeholder="해시태그2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" id="hotplace-btn" class="btn submit-btn">등록</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 핫플레이스 추가 modal end -->

    <!-- <hotplace-search v-model="open"></hotplace-search> -->
  </div>
</template>

<script>
// import HotplaceSearch from "@/components/hotplace/HotplaceSearch";

export default {
  name: "HotplaceCreate",
  components: {
    // HotplaceSearch,
  },
  data() {
    return {
      open: false,
    };
  },
  created() {},
  methods: {
    openSearchTitle() {
      window.name = "hotplaceInsertForm";

      let popupWidth = 1000;
      let popupHeight = 700;
      let popupX = window.screen.width / 2 - popupWidth / 2;
      let popupY = window.screen.height / 2 - popupHeight / 2;
      // let root = document.querySelector("#root").value;

      window.open("/hotplace/search", "keywordSearchForm", "width=" + popupWidth + ", height=" + popupHeight + ", left=" + popupX + ", top=" + popupY + ", scrollbars=yes");
    },
  },
};
</script>

<style scoped>
.modal,
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
  max-width: 500px;
  margin: auto;
  padding: 20px;
  background-color: white;
  min-height: 500px;
  z-index: 10;
  opacity: 1;
}
</style>
