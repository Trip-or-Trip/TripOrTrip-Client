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
            <input type="text" v-model="place.title" @click="isModalView = true" class="form-control my-3 py-2" id="hotplace-title" name="title" placeholder="장소명" required />
          </div>
        </div>
        <div class="row">
          <div class="col-10">
            <input type="date" v-model="place.joinDate" class="form-control my-3 px-3 py-2" id="hotplace-join-date" name="joinDate" placeholder="방문 날짜" />
          </div>
        </div>
        <div class="row">
          <div class="col-10">
            <input type="text" v-model="place.tag1" class="form-control my-3 px-3 py-2" id="hotplace-tag1" name="tag1" placeholder="해시태그1" />
          </div>
        </div>
        <div class="row">
          <div class="col-10">
            <input type="text" v-model="place.tag2" class="form-control my-3 px-3 py-2" id="hotplace-tag2" name="tag2" placeholder="해시태그2" />
          </div>
        </div>
        <div class="row">
          <div class="col-10">
            <textarea v-model="place.desc" class="form-control my-3 px-3 py-2" id="hotplace-desc" name="desc" placeholder="설명" />
          </div>
        </div>
        <div class="row">
          <div class="col-10">
            <button @click="createHotplace" type="button" id="hotplace-btn" class="btn submit-btn mt-2" style="width: 100%">등록</button>
          </div>
        </div>
      </div>
    </div>

    <hotplace-search v-show="isModalView" @close-modal="isModalView = false" @searchResult="setPlace"></hotplace-search>
  </div>
</template>

<script>
import HotplaceSearch from "@/components/hotplace/HotplaceSearch";
import { mapGetters, mapState } from "vuex";
import http from "@/util/http-common";

export default {
  name: "HotplaceCreate",
  components: {
    HotplaceSearch,
  },
  data() {
    return {
      image: "",
      isModalView: false,
      place: {
        title: "",
        joinDate: "",
        desc: "",
        tag1: "",
        tag2: "",
        latitude: 0,
        longitude: 0,
        mapUrl: "",
      },
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "getToken"]),
    ...mapState(["user"]),
  },
  mounted() {},
  created() {},
  methods: {
    upload(e) {
      var file = e.target.files;
      let url = URL.createObjectURL(file[0]);
      this.image = url;
    },
    setPlace(place) {
      if (place.y.length > 4) this.place.latitude = place.y;
      if (place.x.length > 4) this.place.longitude = place.x;
      if (place.place_url) this.place.mapUrl = place.place_url;
      if (place.place_name) this.place.title = place.place_name;
    },
    createHotplace() {
      const file = document.querySelector("#hotplace-image");

      const formData = new FormData();
      formData.append("userId", this.user.id);
      formData.append("title", this.place.title);
      formData.append("joinDate", this.place.joinDate);
      formData.append("desc", this.place.desc);
      formData.append("tag1", this.place.tag1);
      formData.append("tag2", this.place.tag2);
      formData.append("latitude", this.place.latitude);
      formData.append("longitude", this.place.longitude);
      formData.append("mapUrl", this.place.mapUrl);
      formData.append("image", file.files[0]);

      for (let key of formData.keys()) console.log(`${key}: ${formData.get(key)}`);

      http
        .post(`/hotplace`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-ACCESS-TOKEN": "Bearer " + this.getToken, // the token is a variable which holds the token
          },
        })
        .then(({ data }) => {
          console.log(data);
          // alert("핫플레이스 등록 성공");
          this.$router.push({ name: "HotplaceList" });
        })
        .catch(() => {
          alert("등록 중 문제가 생겼습니다. 다시 시도해 주세요.");
          location.reload();
        });
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
