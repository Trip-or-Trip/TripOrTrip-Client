<template>
  <div class="user-info">
    <!-- 회원정보 모달 start -->
    <div class="overlay" @click="$emit('close-modal')"></div>
    <div class="modal-card">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">회원 정보</h5>
            <button type="button" @click="$emit('close-modal')" class="btn-close"></button>
          </div>
          <div class="modal-body">
            <div class="login-container text-center">
              <div style="display: inline-block; text-align:left; width: 25rem">
                <div class="row d-flex justify-content-center">
                  <div class="col-10 mb-3">
                    <span>아이디</span>
                    <input
                      type="text"
                      class="form-control my-3 px-3 py-2"
                      id="view-id"
                      name="view-id"
                      :value="user.id"
                      readonly
                    />
                  </div>
                </div>
                <div class="row d-flex justify-content-center">
                  <div class="col-10 mb-3">
                    <span>이름</span>
                    <input
                      type="text"
                      class="form-control my-3 px-3 py-2"
                      id="view-name"
                      name="view-name"
                      :value="user.name"
                      readonly
                    />
                  </div>
                </div>
                <div class="row d-flex justify-content-center">
                  <div class="col-10 mb-3">
                    <span>회원 등급</span>
                    <input
                      type="text"
                      class="form-control my-3 px-3 py-2"
                      id="view-grade"
                      name="view-grade"
                      :value="user.grade"
                      readonly
                    />
                  </div>
                </div>
                <div class="row d-flex justify-content-center">
                  <div class="col-10 mb-3">
                    <span>이메일</span>
                    <input
                      type="email"
                      class="form-control my-3 px-3 py-2"
                      id="view-email"
                      name="view-email"
                      :value="email"
                      readonly
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <!-- <button type="button" class="btn btn-secondary"
                                  data-bs-dismiss="modal">Close</button> -->
            <button type="button" id="delete-btn" class="submit-btn me-2" style="width: 8rem;">회원 탈퇴</button>
            <button type="button" id="mvupdate-btn" class="submit-btn" style="width: 8rem;" data-bs-toggle="modal" data-bs-target="#updateModal">내 정보 수정</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 회원정보 모달 end -->
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "UserInfo",
  components: {

  },
  data() {
    return {
      open: false,
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "email"]),
    ...mapState(["user"]),
  },
  methods: {

  }

}
</script>

<style scoped>
.user-info,
.overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}
.overlay {
  opacity: 0.5;
  background-color: black;
}
.modal-card {
  position: relative;
  max-width: 500px;
  margin: auto;
  margin-top: 10em;
  padding: 20px;
  background-color: white;
  min-height: 500px;
  z-index: 100;
  opacity: 1;
}
.submit-btn {
  height: 2.5rem;
  border: 0px solid white;
  border-radius: 0.7rem;
}
</style>