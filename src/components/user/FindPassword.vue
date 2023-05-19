<template>
  <div id="password">
    <div class="sign-container shadow">
      <div class="find-password">
        <form id="find-form" method="POST" action="${root}/user/password" role="search">
          <input type="hidden" name="action" value="signin" />
          <input type="hidden" id="signin-RSAModulus" value="${RSAModulus}" />
          <input type="hidden" id="signin-RSAExponent" value="${RSAExponent}" />
          <input type="hidden" id="signin-encode-id" name="encode-id" />
          <input type="hidden" id="signin-encode-password" name="encode-password" />

          <div class="row mt-4 ms-2">
            <h2>비밀번호 찾기</h2>
          </div>
          <hr />
          <div class="row d-flex justify-content-center my-4">
            <div class="col-10">
              <input type="text" v-model="id" @keyup="possibleRequest" class="form-control" name="id" id="find-id" placeholder="아이디" />
            </div>
          </div>
          <div class="row d-flex justify-content-center mt-4 mb-3">
            <div class="col-5">
              <input type="text" v-model="emailId" @keyup="possibleRequest" class="form-control" name="emailId" id="find-email-id" placeholder="이메일" />
            </div>
            <div class="col-1 mt-1">@</div>
            <div class="col-4">
              <select v-model="emailDomain" @change="possibleRequest" class="form-control" name="emailDomain" id="find-email-domain">
                <option value="none" selected="selected">도메인 선택</option>
                <option value="naver.com">naver.com</option>
                <option value="gmail.com">gmail.com</option>
              </select>
            </div>
          </div>
          <div class="row d-flex justify-content-center my-4">
            <div class="col-10">
              <button type="button" id="find-password-btn" class="btn submit-btn" style="width: 100%">비밀번호 찾기</button>
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
  name: "FindPassword",
  components: {},
  data() {
    return {
      id: "",
      emailId: "",
      emailDomain: "",
      isPossible: false,
    };
  },
  created() {},
  methods: {
    possibleRequest() {
      if (this.id && this.emailId && this.emailDomain) {
        this.postRequest();
      }
    },
    postRequest() {
      console.log("요청");
      http.get(`/user/password/${this.id}/${this.emailId}/${this.emailDomain}`).then(({ data }) => {
        console.log(data);
        if (data == "OK") {
          this.isPossible = true;
          console.log("일치");
        } else this.isPossible = false;
      });
    },
  },
};
</script>

<style scoped>
#password {
  text-align: center;
}
.sign-container {
  display: inline-block;
  width: 430px;
  text-align: left;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
  margin: auto;
  margin-top: 7rem;
}
.find-password {
  margin: 0 auto;
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
