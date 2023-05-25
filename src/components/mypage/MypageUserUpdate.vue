<template>
  <div id="user-detail">
    <div id="user-container" class="mt-5">
      <div class="px-3 py-2 mx-2">
        <div class="user-img-container d-flex justify-content-center">
          <div id="user-img-content">
            <b-avatar v-if="!user.image" :src="require('@/assets/img/user.png')" size="13rem"></b-avatar>
            <b-avatar v-else :src="`/upload/profile/${user.image}`" size="13rem"></b-avatar>
            <i @click="uploadModalView = true" id="upload-img-icon" class="bi bi-camera-fill"></i>
          </div>
        </div>

        <div class="user-info-container text-center mt-4">
          <div id="user-info-content">
            <div class="row d-flex justify-content-center">
              <div class="col-10 mb-1">
                <span>아이디</span>
                <input type="text" class="form-control mt-1 mb-1 px-3 py-2" id="view-id" name="view-id" :value="user.id" readonly />
              </div>
            </div>
            <div class="row d-flex justify-content-center">
              <div class="col-10 mb-1">
                <span>비밀번호</span>
                <input v-model="password" type="password" class="form-control mt-1 mb-1 px-3 py-2" id="password" name="password" />
              </div>
            </div>
            <div class="row d-flex justify-content-center">
              <div class="col-10 mb-1">
                <span>비밀번호 확인</span>
                <input v-model="checkPassword" type="password" class="form-control mt-1 mb-1 px-3 py-2" id="password-check" name="password-check" />
              </div>
            </div>
            <div class="row d-flex justify-content-center">
              <div class="col-10 mb-1">
                <span>이름</span>
                <input type="text" class="form-control mt-1 mb-1 px-3 py-2" id="view-name" name="view-name" :value="user.name" readonly />
              </div>
            </div>
            <div class="row d-flex justify-content-center">
              <div class="col-10 mb-1">
                <span>회원 등급</span>
                <input type="text" class="form-control mt-1 mb-1 px-3 py-2" id="view-grade" name="view-grade" :value="user.grade" readonly />
              </div>
            </div>
            <div class="row d-flex justify-content-center">
              <div class="col-10 mb-1">
                <span>이메일</span>
                <input type="email" class="form-control mt-1 mb-1 px-3 py-2" id="view-email" name="view-email" :value="email" readonly />
              </div>
            </div>
            <div class="row d-flex justify-content-center">
              <div class="col-10 mb-1">
                <span style="align: center">
                  <button type="button" @click="validValue" id="change-btn" class="btn submit-btn me-2" style="width: 30%">정보 변경</button>
                  <button type="button" @click="deleteUser" id="delete-btn" class="btn submit-btn" style="width: 30%">회원 탈퇴</button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <user-image-upload v-show="uploadModalView" @close-modal="uploadModalView = false"></user-image-upload>
  </div>
</template>

<script>
import UserImageUpload from "@/components/mypage/UserImageUpload";
import { mapGetters, mapState } from "vuex";
import http from "@/util/http-common";

export default {
  name: "MypageUserUpdate",
  components: {
    UserImageUpload,
  },
  data() {
    return {
      password: "",
      checkPassword: "",
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
    validValue() {
      if (this.password != this.checkPassword) {
        alert("비밀번호가 일치하지 않습니다. 다시 입력해 주세요.");
        return;
      }
      http
        .put(`/user/${this.user.id}`, {
          id: this.user.id,
          password: this.password,
        })
        .then(({ data }) => {
          if (data == 1) {
            alert("비밀번호 변경 성공!");
            location.reload();
          } else {
            alert("비밀번호를 다시 입력해주세요.");
          }
        });
    },
    deleteUser() {
      if (confirm("정말 탈퇴하시겠습니까?")) {
        http
          .delete(`/user/${this.user.id}`, {
            id: this.user.id,
          })
          .then(({ data }) => {
            if (data == 1) {
              alert("회원정보 탈퇴 성공!");
              this.$store.commit("logout");
              window.$cookies.remove("TripOrTrip");
              location.reload();
              location.reload();
            } else {
              alert("탈퇴 시 문제 발생! 다시 시도해 주세요.");
            }
          });
      }
    },
  },
};
</script>

<style scoped>
.change-btn {
  margin: 1rem;
  background-color: hsl(128, 100%, 50%);
  color: black;
  font-weight: 400;
}

.delete-btn {
  margin: 1rem;
  background-color: hsl(0, 100%, 50%);
  color: black;
  font-weight: 400;
}

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
