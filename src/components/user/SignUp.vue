<template>
  <div class="signup">
    <div class="sign-container">
      <div class="signup">
        <form id="signup-form" method="POST" action="${root}/user/signup" role="search">
          <input type="hidden" name="action" value="signup">
          <input type="hidden" id="signup-RSAModulus" value="${RSAModulus}"/>
          <input type="hidden" id="signup-RSAExponent" value="${RSAExponent}"/>
          <input type="hidden" id="signup-encode-id" name="signup-encode-id">
          <input type="hidden" id="signup-encode-password" name="signup-encode-password">
          <input type="hidden" id="signup-encode-name" name="signup-encode-name">
          <input type="hidden" id="signup-encode-email" name="signup-encode-email">

          <div class="row mt-4 ms-2">
            <h2>회원가입</h2>
          </div>
          <hr>
          <div class="row d-flex justify-content-center my-4">
            <div class="col-10">
              <input type="text" v-model="id" @keyup="checkDuplId" class="form-control" name="id" id="signup-id" placeholder="아이디">
            </div>
          </div>
          <div class="row d-flex justify-content-center my-4">
            <div class="col-10">
              <div v-text="checkId" id="check-id-result" :class="[validId? 'text-primary': 'text-danger']"></div>
            </div>
          </div>
          <div class="row d-flex justify-content-center login_pw my-4">
            <div class="col-10">
              <input type="password" v-model="password" class="form-control" name="password" id="signup-password" placeholder="비밀번호">
            </div>
          </div>
          <div class="row d-flex justify-content-center login_pw my-4">
            <div class="col-10">
              <input type="password" v-model="checkPassword" class="form-control" name="signup-check-password" id="signup-check-password" placeholder="비밀번호 확인">
            </div>
          </div>
          <div class="row d-flex justify-content-center my-4">
            <div class="col-10">
              <input type="text" v-model="name" class="form-control" name="name" id="signup-name" placeholder="이름">
            </div>
          </div>
          <div class="row d-flex justify-content-center my-4">
            <div class="col-5">
              <input type="text" v-model="emailId" @keyup="checkDuplEmail" class="form-control" name="emailId" id="signup-email-id" placeholder="이메일">
            </div>
            @
            <div class="col-5">
              <select class="form-control" v-model="emailDomain" @change="checkDuplEmail" name="emailDomain" id="signup-email-domain">
                <option value="none" selected="selected">도메인 선택</option>
                <option value="naver.com">naver.com</option>
                <option value="gmail.com">gmail.com</option>
              </select>
            </div>
          </div>
          <div class="row d-flex justify-content-center my-4">
            <div class="col-10">
              <div v-text="checkEmail" id="check-email-result" :class="[validEmail? 'text-primary': 'text-danger']"></div>
            </div>
          </div>
          <div class="row d-flex justify-content-center submit my-4">
            <div class="col-10">
              <button type="button" @click="validValue" id="signup-btn" class="btn submit-btn" style="width: 100%">회원가입</button>
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
  name: "SignUp",
  data() {
    return {
      id: '',
      checkId: '',
      password: '',
      checkPassword: '',
      name: '',
      emailId: '',
      checkEmail: '',
      emailDomain: '',
      validId: false,
      validEmail: false,
    };
  },
  methods: {
    validValue() {
      if(!this.id)
        alert("아이디를 입력해 주세요.");
      else if(!this.validId)
        alert("사용할 수 없는 아이디입니다. 다시 입력해 주세요.");
      else if(!this.password || !this.checkPassword)
        alert("비밀번호를 입력해 주세요.");
      else if(this.password != this.checkPassword)
        alert("비밀번호가 일치하지 않습니다. 다시 입력해 주세요.");
      else if(!this.name)
        alert("이름을 입력해 주세요.");
      else if(!this.emailId)
        alert("이메일 주소를 입력해 주세요.");
      else if(!this.emailDomain)
        alert("이메일 도메인을 선택해 주세요.");
      else if(!this.validEmail)
        alert("사용할 수 없는 이메일입니다. 다시 입력해 주세요.");
      else
        this.signup();
    },
    signup() {
      console.log("회원가입");
      http
        .post("/user", {
          id: this.id,
          password: this.password,
          name: this.name,
          emailId: this.emailId,
          emailDomain: this.emailDomain
        })
        .then(() => {
          alert("회원가입을 완료했습니다.");
          this.$router.push("/user/signin");
        })
        .catch(() => {
          alert("회원가입 중 문제가 발생했습니다. 다시 시도해 주세요.");
        });
    },
    checkDuplId() {
      console.log("아이디 체크");
      if(this.id.length < 5) {
        this.checkId = "아이디는 5자 이상 가능합니다.";
        this.validId = false;
      }
      else {
        http.get(`/user/id/${this.id}`)
          .then(({data}) => {
            if(data == 0) {
              this.checkId = "사용 가능한 아이디입니다.";
              this.validId = true;
            }
            else {
              this.checkId = "사용할 수 없는 아이디입니다.";
              this.validId = false;
            }
          })
      }
    },
    checkDuplEmail() {
      console.log(this.emailDomain);
      if(this.emailId && this.emailDomain) {
        http.get(`/user/email/${this.emailId}/${this.emailDomain}`)
          .then(({data}) => {
            console.log(data);
            if(data == 0) {
              this.checkEmail = "사용 가능한 이메일입니다.";
              this.validEmail = true;
            }
            else {
              this.checkEmail = "사용할 수 없는 아이디입니다.";
              this.validEmail = false;
            }
          })
      }
    }
  }
};
</script>

<style scoped>
.signup {
	text-align: center;
}

.sign-container {
	display: inline-block;
	width: 430px;
	text-align: left;
	border : 1px solid lightgray;
	border-radius: 1rem;
	margin-top: 5rem;
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