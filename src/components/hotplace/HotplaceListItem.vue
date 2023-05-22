<template>
  <div id="hotplace-item">
    <div class="card hotplace-card px-3 py-2 mx-2">
      <div class="card-title mt-3 mb-3">
        <div class="row">
          <div class="ms-2 col-8 justify-content-start">
            <img v-if="user.image" :src="`/upload/profile/${user.image}`" class="hotplace-profile-img me-3" />
            <img v-else :src="require('@/assets/img/user.png')" class="hotplace-profile-img me-3" />
            <span>{{ hotplace.userId }}</span>
          </div>
          <div class="col-3 justify-content-end">
            <div v-if="user.id == hotplace.userId" class="dropdown">
              <b-dropdown size="sm" text="menu" variant="outline-dark" class="m-2">
                <b-dropdown-item-button><router-link :to="{ name: 'hotplaceupdate', params: { num: hotplace.num } }" :hotplace="hotplace">핫플레이스 수정</router-link></b-dropdown-item-button>
                <b-dropdown-item-button @click="hotplaceDelete">핫플레이스 삭제</b-dropdown-item-button>
              </b-dropdown>
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
            <!-- <i class="hotplace-icon bi bi-chat-square-heart me-3"></i> -->
            <span v-show="isLike" @click="clickLikeIcon">
              <i class="hotplace-icon like-icon bi bi-heart-fill me-3"></i>
            </span>
            <span v-show="!isLike" @click="clickLikeIcon">
              <i class="hotplace-icon bi bi-heart me-3"></i>
            </span>
            <a :href="`${hotplace.mapUrl}`" target="_blank" style="color: black"><i class="hotplace-icon bi bi-geo-alt me-3" title="카카오맵 검색"></i></a>
            <a :href="`https://map.kakao.com/link/to/${hotplace.title},${hotplace.latitude},${hotplace.longitude}`" target="_blank" style="color: black"><i class="hotplace-icon bi bi-sign-turn-right" title="길 찾기"></i></a>
          </div>
          <div>
            <div v-if="hotplace.tag1 || hotplace.tag2" class="mb-2">
              <span v-if="hotplace.tag1" class="me-2">#{{ hotplace.tag1 }}</span>
              <span v-if="hotplace.tag2" class="me-2">#{{ hotplace.tag2 }}</span>
            </div>
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
import http from "@/util/http-common";

export default {
  name: "HotplaceListItem",
  props: {
    hotplace: Object,
  },
  components: {},
  data() {
    return {
      isLike: false,
      dropdownShow: false,
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "getToken"]),
    ...mapState(["user"]),
  },
  created() {
    if (this.hotplace.like) this.isLike = true;
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    clickLikeIcon() {
      if (!this.user) return;

      http
        .put(
          "/hotplace",
          {
            userId: this.user.id,
            num: this.hotplace.num,
          },
          {
            headers: {
              "X-ACCESS-TOKEN": "Bearer " + this.getToken,
            },
          }
        )
        .then(({ data }) => {
          console.log(data);
          if (data == "success") {
            this.isLike = !this.isLike;
          }
        });
    },
    hotplaceDelete() {
      http
        .delete(`/hotplace/${this.hotplace.num}`, {
          headers: {
            "X-ACCESS-TOKEN": "Bearer " + this.getToken,
          },
        })
        .then(() => {
          location.reload();
        })
        .catch(() => {
          alert("삭제 중 문제가 발생했습니다.");
        });
    },
  },
};
</script>

<style scoped>
.hotplace-profile-img {
  width: 30px;
  height: 30px;
  border-radius: 2rem;
  object-fit: cover;
}
.hotplace-icon {
  font-size: 25px;
}
.hotplace-card {
  height: 100%;
}
.like-icon {
  color: crimson;
}
b-dropdown {
  background-color: red;
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
a {
  text-decoration: none;
  color: black;
}
</style>
