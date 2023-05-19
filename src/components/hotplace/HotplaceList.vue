<template>
  <div class="hotplace">
    <main>
      <div class="m-5">
        <div class="px-5">
          <h3 class="mb-4" style="float: left">핫플레이스 목록</h3>
          <div style="float: right">
            <!-- <button @click="createModalView = true" class="btn submit-btn mt-2 px-3 py-1">핫플 추가하기</button> -->
            <router-link to="/hotplace/create" class="mt-2 px-3 py-1">핫플 추가하기</router-link>
          </div>
        </div>
      </div>

      <div style="height: 70px"></div>

      <!-- 비동기로 핫플레이스 가져오기 -->
      <div id="hotplace-container" class="px-3 mx-5">
        <!-- 핫플 카드 start -->
        <!-- <div class="row" data-masonry='{"percentPosition": true}'>
          <div v-for="(hotplace, index) in hotplaces" :key="index" class="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-5 px-3">
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
                <img src="/hotplace/image/${hotplace.image}" class="card-img" />
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
        </div> -->
        <!-- 핫플 카드 end -->
      </div>
    </main>

    <!-- <hotplace-create v-if="createModalView" @close-modal="createModalView = false"></hotplace-create> -->
  </div>
</template>

<script>
// import HotplaceCreate from "@/components/hotplace/HotplaceCreate";
import { mapGetters, mapState } from "vuex";
import http from "@/util/http-common";

export default {
  name: "HotplaceList",
  components: {
    // HotplaceCreate,
  },
  data() {
    return {
      hotplaces: [],
      // createModalView: false,
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
        console.log(data);
        this.hotplaces = data;
        console.log(this.hotplaces);
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
