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
            <div class="col-4">
              <input type="text" v-model="emailId" @keyup="checkDuplEmail" class="form-control" name="emailId" id="signup-email-id" placeholder="이메일" >
            </div>
            @
            <div class="col-4">
              <input type="text" class="form-control" v-model="emailDomain" @change="checkDuplEmail" name="emailDomain" id="signup-email-domain">
                
            </div>
            <div class="col-2">
              <button @click="sendEmail" type="button" class="btn submit-btn" v-if="validEmail">인증</button>
            </div>
          </div>
          <div class="row d-flex justify-content-center my-4">
            <div class="col-10">
              <div v-text="checkEmail" id="check-email-result" :class="[validEmail? 'text-primary': 'text-danger']"></div>
            </div>
          </div>
          <div v-if="showEmailAuthInput" class="row d-flex justify-content-center my-4" id="email-auth-input">
            <div class="col-10">
              <input type="text" v-model="emailAuthNumber" placeholder="인증번호 입력"/>
              <button type="button" @click="checkEmailAuth" id="check-email-auth-btn" class="btn submit-btn" >확인</button>
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
      confirmedEmail: false,
      showEmailAuthInput: false,
      emailAuthNumber: 0,
      emailConfirmed: false,
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
        alert("이메일 도메인을 입력해 주세요.");
      else if(!this.validEmail)
        alert("사용할 수 없는 이메일입니다. 다시 입력해 주세요.");
      else if(!this.emailConfirmed)
        alert("이메일 인증에 실패하였습니다. 재시도해주세요.");
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
            if(data == 0 && this.emailDomain.split(".").length >= 2 && this.emailDomain.split(".")[1]) {
              this.checkEmail = "사용 가능한 이메일입니다.";
              this.validEmail = true;
            }
            else {
              this.checkEmail = "사용할 수 없는 이메일입니다.";
              this.validEmail = false;
            }
          })
      }
    },
    sendEmail(){
      document.getElementById("signup-email-id").readOnly = "true";
      document.getElementById("signup-email-domain").readOnly = "true";
      document.getElementById("signup-email-id").style.backgroundColor = "lightgray";
      document.getElementById("signup-email-domain").style.backgroundColor = "lightgray";
      this.showEmailAuthInput = true;
      http.get(`/user/auth/${this.emailId}/${this.emailDomain}`)
        .then((response)=>{
          console.log(response);
          if(response.data == "success"){
            this.checkEmail = "인증번호가 발송되었습니다."
          }
        });
    },

    checkEmailAuth(){
      http.get(`/user/check/${this.emailId}/${this.emailDomain}/${this.emailAuthNumber}`)
        .then((data)=>{
          console.log(data);
          if(data.data == true){
            this.emailConfirmed = true;
            this.checkEmail = "인증확인되었습니다."
          }else{
            this.checkEmail = "인증이 실패하였습니다."
            this.validEmail = false;
            document.getElementById("signup-email-id").readOnly = "false";
            document.getElementById("signup-email-domain").readOnly = "false";
            document.getElementById("signup-email-id").style.backgroundColor = "white";
            document.getElementById("signup-email-domain").style.backgroundColor = "white";
          }
        });
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