<template>
  <div id="user-detail">
    <div id="user-container" class="mt-5">
      <div class="px-3 py-2 mx-2">
        <div class="user-img-container d-flex justify-content-center">
          <div id="user-img-content">
            <b-avatar v-if="!user.image" :src="require('@/assets/img/user.png')" size="13rem"></b-avatar>
            <i @click="uploadModalView = true" id="upload-img-icon" class="bi bi-camera-fill"></i>
          </div>
        </div>

        <div class="user-info-container text-center mt-4">
          <div id="user-info-content">
            <div class="row d-flex justify-content-center">
              <div class="col-10 mb-2">
                <span>아이디</span>
                <input type="text" class="form-control mt-2 mb-3 px-3 py-2" id="view-id" name="view-id" :value="user.id" readonly />
              </div>
            </div>
            <div class="row d-flex justify-content-center">
              <div class="col-10 mb-2">
                <span>이름</span>
                <input type="text" class="form-control mt-2 mb-3 px-3 py-2" id="view-name" name="view-name" :value="user.name" readonly />
              </div>
            </div>
            <div class="row d-flex justify-content-center">
              <div class="col-10 mb-2">
                <span>회원 등급</span>
                <input type="text" class="form-control mt-2 mb-3 px-3 py-2" id="view-grade" name="view-grade" :value="user.grade" readonly />
              </div>
            </div>
            <div class="row d-flex justify-content-center">
              <div class="col-10 mb-2">
                <span>이메일</span>
                <input type="email" class="form-control mt-2 mb-3 px-3 py-2" id="view-email" name="view-email" :value="email" readonly />
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="user-info-container text-center mt-4">
          <div style="display: inline-block; text-align: left; width: 30rem">
            <div class="row d-flex justify-content-center">
              <div class="col-10 mb-2">
                <span>아이디</span>
                <input type="text" class="form-control mt-2 mb-3 px-3 py-2" id="view-id" name="view-id" :value="user.id" readonly />
              </div>
            </div>
            <div class="row d-flex justify-content-center">
              <div class="col-10 mb-2">
                <span>이름</span>
                <input type="text" class="form-control mt-2 mb-3 px-3 py-2" id="view-name" name="view-name" :value="user.name" readonly />
              </div>
            </div>
            <div class="row d-flex justify-content-center">
              <div class="col-10 mb-2">
                <span>회원 등급</span>
                <input type="text" class="form-control mt-2 mb-3 px-3 py-2" id="view-grade" name="view-grade" :value="user.grade" readonly />
              </div>
            </div>
            <div class="row d-flex justify-content-center">
              <div class="col-10 mb-2">
                <span>이메일</span>
                <input type="email" class="form-control mt-2 mb-3 px-3 py-2" id="view-email" name="view-email" :value="email" readonly />
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>

    <user-image-upload v-show="uploadModalView" @close-modal="uploadModalView = false"></user-image-upload>
  </div>
</template>

<script>
import UserImageUpload from "@/components/mypage/UserImageUpload";
import { mapGetters, mapState } from "vuex";

export default {
  name: "MypageUser",
  components: {
    UserImageUpload,
  },
  data() {
    return {
      uploadModalView: false,
      image: "",
    };
  },
  computed: {
    ...mapGetters(["getToken", "email"]),
    ...mapState(["user"]),
  },
  created() {},
  methods: {
    setImage(image) {
      if (image) this.image = image;
    },
  },
};
</script>

<style scoped>
#user-img-content {
  position: relative;
  width: 13rem;
  height: 13rem;
}
#user-info-content {
  display: inline-block;
  width: 53%;
  min-width: 30rem;
  text-align: left;
}
#upload-img-icon {
  position: absolute;
  bottom: 0px;
  right: 10px;
  font-size: 27px;
  padding: 0 0.5rem;
  border: 1px solid rgb(224, 224, 224);
  border-radius: 2rem;
  background-color: white;
}
</style>
