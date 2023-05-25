<template>
  <div id="result-list-item">
    <div class="result-content py-1">
      <div class="d-flex">
        <div>
          <img id="result-img" class="result-img" :src="this.image" />
        </div>
        <div class="flex-grow-1">
          <div class="align-self-center">
            <div style="font-size: 0.9rem">
              <b>{{ result.place_name }}</b>
            </div>
            <div style="font-size: 0.8rem">{{ result.address_name }}</div>
            <button
              type="button"
              @click="clickDetailResult(result, $event)"
              class="btn btn-sm place-btn"
            >
              자세히 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import kakao from "@/util/kakao";

export default {
  name: "PlanList",
  props: {
    result: Object,
  },
  data() {
    return {
      image: require("@/assets/img/noimage.png"),
    };
  },
  mounted() {
    this.viewImage();
  },
  components: {},
  methods: {
    viewImage() {
      this.viewPlaceImg(this.result.place_name, ({ data }) => {
        // console.log(data);
        this.image = data.documents[0].thumbnail_url;
        // console.log(this.image);
      });
    },
    async viewPlaceImg(keyword, success) {
      await kakao
        .get(`/image?query=${keyword}&sort=accuracy&page=1&size=1`)
        .then(success)
        .catch(() => {
          this.image = require(`@/assets/img/noimage.png`);
        });
    },
    clickDetailResult(place) {
      if (this.image != require("@/assets/img/noimage.png")) {
        place.image_url = this.image;
      }
      this.$emit("makeCustomOverlay", place);
    },
  },
};
</script>

<style>
.result-content {
  border: 1px solid lightgray;
}
.result-img {
  width: 5rem;
  height: 5rem;
  object-fit: cover;
}
.place-btn {
  font-size: 0.7rem;
  width: 4.5rem;
  height: 1.4rem;
  background-color: #dee4e9;
}
.place-btn:hover {
  /* font-size: 0.7rem;
  width: 4.5rem;
  height: 1.4rem; */
  background-color: #c9d1da;
}
</style>
