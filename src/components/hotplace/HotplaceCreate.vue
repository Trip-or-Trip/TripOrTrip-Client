<template>
  <div id="hotplace-create">
    <div id="content-container" class="row shadow d-flex justify-content-center">
      <div id="img-container" class="row col-6 me-3">
        <div v-if="!image" class="align-self-center text-center">이미지가 표시됩니다.</div>
        <img v-else class="p-5" :src="image" />
      </div>
      <div id="form-container" class="align-self-center col-5 ms-3">
        <div class="row">
          <div class="col-10">
            <input type="file" @change="upload" accept="image/*" class="form-control my-3 px-3 py-2" id="hotplace-image" name="hotplace-image" placeholder="이미지" required />
          </div>
        </div>
        <div class="row">
          <div class="col-10">
            <input type="text" @click="isModalView = true" class="form-control my-3 py-2" id="hotplace-title" name="title" placeholder="장소명" required />
          </div>
        </div>
        <div class="row">
          <div class="col-10">
            <input type="date" class="form-control my-3 px-3 py-2" id="hotplace-join-date" name="joinDate" placeholder="방문 날짜" />
          </div>
        </div>
        <div class="row">
          <div class="col-10">
            <input type="text" class="form-control my-3 px-3 py-2" id="hotplace-tag1" name="tag1" placeholder="해시태그1" />
          </div>
        </div>
        <div class="row">
          <div class="col-10">
            <input type="text" class="form-control my-3 px-3 py-2" id="hotplace-tag1" name="tag1" placeholder="해시태그1" />
          </div>
        </div>
        <div class="row">
          <div class="col-10">
            <input type="text" class="form-control my-3 px-3 py-2" id="hotplace-tag2" name="tag2" placeholder="해시태그2" />
          </div>
        </div>
        <div class="row">
          <div class="col-10">
            <button type="button" id="hotplace-btn" class="btn submit-btn mt-2" style="width: 100%">등록</button>
          </div>
        </div>
      </div>
    </div>

    <hotplace-search v-show="isModalView" @close-modal="isModalView = false"></hotplace-search>
  </div>
</template>

<script>
import HotplaceSearch from "@/components/hotplace/HotplaceSearch";

export default {
  name: "HotplaceCreate",
  components: {
    HotplaceSearch,
  },
  data() {
    return {
      image: "",
      isModalView: false,
    };
  },
  mounted() {},
  created() {},
  methods: {
    upload(e) {
      var file = e.target.files;
      let url = URL.createObjectURL(file[0]);
      this.image = url;
    },
  },
};
</script>

<style>
/* #form-container {
  width: 85%;
  height: 40rem;
  border-radius: 1rem;
} */
/* #img-container {
  float: left;
  display: inline-block;
  width: 500px;
} */
#content-container {
  display: inline-block;
  width: 85%;
  height: 40rem;
  margin: 0 auto;
  margin-top: 4rem;
  border-radius: 1rem;
}
#form-container {
  max-width: 500px;
}
#img-container {
  max-width: 500px;
  max-height: 40rem;
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
img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
