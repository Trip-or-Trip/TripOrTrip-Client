<template>
  <div id="mypage-board">
    <div class="mt-5">
      <h2 style="text-align: center">내 장소</h2>
      <div id="hotplace-container" class="px-3 mx-5">
        <masonry :cols="{ default: 3, 1600: 3, 1100: 2, 700: 1 }" :gutter="10" class="card-style">
          <hotplace-list-item
            v-for="hotplace in hotplaces"
            :key="hotplace.num"
            :hotplace="hotplace"
          ></hotplace-list-item>
        </masonry>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import http from "@/util/http-common";
import HotplaceListItem from "@/components/hotplace/HotplaceListItem.vue";

export default {
  name: "MypageHotplace",
  components: {
    HotplaceListItem,
  },
  data() {
    return {
      hotplaces: [],
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "getToken"]),
    ...mapState(["user"]),
  },
  created() {
    // 비동기
    http
      .post(`/mypage/hotplace`, this.user.id, {
        headers: {
          "X-ACCESS-TOKEN": "Bearer " + this.getToken, // the token is a variable which holds the token
        },
      })
      .then(({ data }) => {
        this.hotplaces = data;
      });
  },
  methods: {},
};
</script>

<style scoped></style>
