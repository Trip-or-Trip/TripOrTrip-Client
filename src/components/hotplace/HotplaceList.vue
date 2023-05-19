<template>
  <div class="hotplace">
    <main>
      <div class="m-5">
        <div class="px-5">
          <h3 class="mb-4" style="float: left">핫플레이스 목록</h3>
          <div style="float: right">
            <router-link :to="{ name: 'hotplacecreate' }" v-if="user" class="btn submit-btn mt-2 px-3 py-1">핫플 추가하기</router-link>
          </div>
        </div>
      </div>

      <div style="height: 70px"></div>

      <!-- 비동기로 핫플레이스 가져오기 -->
      <div id="hotplace-container" class="px-3 mx-5">
        <masonry :cols="{ default: 4, 1600: 3, 1100: 2, 700: 1 }" :gutter="10" class="card-style">
          <hotplace-list-item v-for="hotplace in hotplaces" :key="hotplace.num" :hotplace="hotplace"></hotplace-list-item>
        </masonry>
      </div>
    </main>
  </div>
</template>

<script>
import HotplaceListItem from "@/components/hotplace/HotplaceListItem";
import { mapGetters, mapState } from "vuex";
import http from "@/util/http-common";

export default {
  name: "HotplaceList",
  components: {
    HotplaceListItem,
  },
  data() {
    return {
      hotplaces: [],
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapState(["user"]),
  },
  created() {
    let user;
    if (!this.user.id) user = "";
    else user = this.user.id;
    http
      .post(`/hotplace/list`, user)
      .then(({ data }) => {
        this.hotplaces = data;
      })
      .catch((response) => {
        console.log(response);
      });
  },
};
</script>

<style>
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
