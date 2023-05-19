<template>
  <div class="signin">
    <div class="sign-container">
      <div class="signin">
        <form id="signin-form" method="POST" action="${root}/user/signin" role="search">
          <input type="hidden" name="action" value="signin" />
          <input type="hidden" id="signin-RSAModulus" value="${RSAModulus}" />
          <input type="hidden" id="signin-RSAExponent" value="${RSAExponent}" />
          <input type="hidden" id="signin-encode-id" name="encode-id" />
          <input type="hidden" id="signin-encode-password" name="encode-password" />

          <div class="row mt-4 ms-2">
            <h2>로그인</h2>
          </div>
          <hr />
          <div class="row d-flex justify-content-center my-4">
            <div class="col-10">
              <input type="text" v-model="id" class="form-control" name="id" id="signin-id" placeholder="아이디" />
            </div>
          </div>
          <div class="row d-flex justify-content-center mt-4 mb-3">
            <div class="col-10">
              <input type="password" v-model="password" class="form-control" name="password" id="signin-password" placeholder="비밀번호" />
            </div>
          </div>
          <div class="row justify-content-end">
            <div class="col-4 me-2">
              <router-link to="/user/password" id="find-password">비밀번호 찾기</router-link>
            </div>
          </div>
          <div class="row d-flex justify-content-center my-4">
            <div class="col-10">
              <button type="button" @click="login" id="signin-btn" class="btn submit-btn" style="width: 100%">로그인</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/util/http-common";

export default {
  name: "SignIn",
  data() {
    return {
      id: "",
      password: "",
    };
  },
  methods: {
    login() {
      http
        .post("/user/auth", {
          id: this.id,
          password: this.password,
        })
        .then(({ data }) => {
          console.log(data);
          if (data) {
            console.log("쿠키 저장");
            window.$cookies.set("TripOrTrip", data, "1d");
            this.$store.commit("setToken", data);
            console.log("App.vue.afterSetToken");
            this.$store.dispatch("getUserFromServer");
            this.$router.push("/");
          } else {
            alert("일치하는 회원이 없습니다. 다시 로그인 해 주세요.");
          }
        });
    },
  },
};
</script>

<style scoped>
.sign-container {
  display: inline-block;
  width: 430px;
  text-align: left;
  border: 1px solid lightgray;
  border-radius: 1rem;
  margin-top: 5rem;
}

.signin {
  text-align: center;
}

#find-password:link {
  color: #4d5054;
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
