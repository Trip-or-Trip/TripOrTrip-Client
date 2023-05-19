<template>
  <div id="hotplace-item">
    <div class="card hotplace-card px-3 py-2 mx-2">
      <div class="card-title mt-3 mb-3">
        <div class="row">
          <div class="ms-2 col-8 justify-content-start">
            <img :src="require('@/assets/img/user.png')" class="hotplace-profile-img me-3" />
            <span>{{ hotplace.userId }}</span>
          </div>
          <div class="col-3 justify-content-end">
            <div v-if="user.id == hotplace.userId" class="dropdown">
              <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">menu</button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item ${hotplace.num}" onclick="viewUpdateModal(this)">핫플레이스 수정</a></li>
                <li><a class="dropdown-item" href="${root}/hotplace/delete/${hotplace.num}">핫플레이스 삭제</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="card-img-container">
        <img :src="`/upload/hotplace/${hotplace.image}`" class="card-img" />
      </div>

      <div class="card-body">
        <div class="mt-2 cart-text">
          <div class="mb-2">
            <i class="hotplace-icon bi bi-chat-square-heart me-3"></i>
            <i class="hotplace-icon bi bi-geo me-3" title="지도 보기"></i>
            <a href="${hotplace.mapUrl}" target="_blank" style="color: black"><i class="hotplace-icon bi bi-geo-alt me-3" title="카카오맵 검색"></i></a>
            <a href="https://map.kakao.com/link/to/${hotplace.title},${hotplace.latitude},${hotplace.longitude}" target="_blank" style="color: black"
              ><i class="hotplace-icon bi bi-sign-turn-right" title="길 찾기"></i
            ></a>
          </div>
          <div>
            <div v-if="tag1 || tag2" class="mb-2">
              <span v-if="tag1" class="me-2">#{{ hotplace.tag1 }}</span>
              <span v-if="tag2" class="me-2">#{{ hotplace.tag2 }}</span>
            </div>
            <p class="mb-2">{{ hotplace.title }}</p>
            <p class="mb-3">{{ hotplace.desc }}</p>
            <p style="font-size: 0.9rem">{{ hotplace.joinDate }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "HotplaceListItem",
  props: {
    hotplace: Object,
  },
  components: {},
  data() {
    return {
      image: "",
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapState(["user"]),
  },
  created() {
    this.image = "C:\\trip\\upload\\hotplace\\" + this.hotplace.image;
  },
  methods: {},
};
</script>

<style scoped>
.hotplace-profile-img {
  width: 20px;
  height: 20px;
  object-fit: cover;
}
.hotplace-icon {
  font-size: 25px;
}

.hotplace-card {
  height: 100%;
}
</style>
