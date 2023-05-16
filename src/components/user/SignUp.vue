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
              <input type="text" class="form-control" name="id" id="signup-id" placeholder="아이디">
            </div>
          </div>
          <div class="row d-flex justify-content-center my-4">
            <div class="col-10">
              <div id="check-id-result"></div>
            </div>
          </div>
          <div class="row d-flex justify-content-center login_pw my-4">
            <div class="col-10">
              <input type="password" class="form-control" name="password" id="signup-password" placeholder="비밀번호">
            </div>
          </div>
          <div class="row d-flex justify-content-center login_pw my-4">
            <div class="col-10">
              <input type="password" class="form-control" name="signup-check-password" id="signup-check-password" placeholder="비밀번호 확인">
            </div>
          </div>
          <div class="row d-flex justify-content-center my-4">
            <div class="col-10">
              <input type="text" class="form-control" name="name" id="signup-name" placeholder="이름">
            </div>
          </div>
          <div class="row d-flex justify-content-center my-4">
            <div class="col-5">
              <input type="text" class="form-control" name="emailId" id="signup-email-id" placeholder="이메일">
            </div>
            @
            <div class="col-5">
              <select class="form-control" name="emailDomain" id="signup-email-domain">
                <option value="none" selected="selected">도메인 선택</option>
                <option value="naver.com">naver.com</option>
                <option value="gmail.com">gmail.com</option>
              </select>
            </div>
          </div>
          <div class="row d-flex justify-content-center submit my-4">
            <div class="col-10">
              <button type="button" id="signup-btn" class="btn submit-btn" style="width: 100%">회원가입</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      articleno: Number,
    };
  },
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