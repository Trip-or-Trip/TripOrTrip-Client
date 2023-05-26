<template>
  <swiper
    :slidesPerView="3"
    :spaceBetween="30"
    :freeMode="true"
    :pagination="{
      clickable: true,
    }"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide v-for="(place, index) in places" :key="index">
      <div style="border: 1px solid lightgray; border-radius: 0.5rem; height: 30rem">
        <img
          :src="place.imageUrl"
          style="
            width: 100%;
            height: 20rem;
            object-fit: cover;
            border-top-left-radius: 0.5rem;
            border-top-right-radius: 0.5rem;
          "
        />
        <div class="mt-3 ms-2">
          <span>{{ place.name }}</span>
        </div>
        <div class="mt-3 ms-3">
          <span>{{ place.address }}</span> &nbsp;
          <button @click="placeClick(place, $event)" class="btn submit-btn">보기</button>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Vue from "vue";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/css/swiper.css";
Vue.use(VueAwesomeSwiper);

import { Swiper, SwiperSlide } from "vue-awesome-swiper";

export default {
  name: "PlaceView",
  props: {
    places: [],
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapState(["user"]),
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  setup() {
    return {};
  },
  methods: {
    placeClick(place) {
      if (!this.isLoggedIn) {
        alert("로그인 후 이용 가능합니다.");
        return;
      }
      window.location.href = `https://map.kakao.com/link/to/${place.title},${place.lat},${place.lng}`;
    },
  },
};
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
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
</style>
