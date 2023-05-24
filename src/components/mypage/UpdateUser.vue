<template>
  <div id="board-view">
    <div class="article-container row d-flex justify-content-center">
      <div id="article-content" class="col-lg-7 col-md-10 col-sm-12 mt-5 align-self-center">
        <div class="container">
          <div class="mb-5 mt-5">
            <h4 style="color: black">회원 정보 수정</h4>
          </div>
          <div class="mb-4">
            <br />
            <div class="d-flex justify-content-center">
              <b-form-input
                placeholder="비밀번호를 입력해주세요"
                type="password"
                class="form-control"
                name="userPwd"
                id="userPwd"
                v-model="userPwd"
                :state="pwdCheck"
              ></b-form-input>
            </div>
          </div>
          <div class="mb-5">
            <button type="submit" class="m-1 btn" @click="confirmPw">확인</button>
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
  name: "UpdateUser",
  components: {},
  computed: {
    ...mapGetters(["isLoggedIn", "getToken"]),
    ...mapState(["user"]),
  },
  mounted() {
    this.startCursor();
  },
  data() {
    return {
      message: "",
      userPwd: null,
      pwdCheck: null,
    };
  },
  created() {},
  methods: {
    startCursor() {
      document.getElementById("userPwd").focus();
    },
    confirmPw() {
      http
        .post(`/user/auth`, {
          id: this.user.id,
          password: this.userPwd,
        })
        .then(({ data }) => {
          if (data) {
            this.$router.push({ name: "updateuserdetail" });
          } else {
            alert("비밀번호를 다시 입력해주세요.");
          }
        });
    },
  },
};
</script>

<style scoped>
.center {
  padding: 70px 0;
}
.btn {
  margin: 1rem;
  background-color: #4199ff;
  color: black;
  font-weight: 400;
}
</style>
