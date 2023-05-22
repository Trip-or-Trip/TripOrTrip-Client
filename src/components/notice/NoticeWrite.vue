<template>
  <div id="notice-write">
    <div class="write-container row d-flex justify-content-center">
      <div id="write-content" class="col-lg-7 col-md-10 col-sm-12 mt-5 align-self-center">
        <h3 class="mb-2">공지 작성</h3>
        <hr style="width: 100%" />
        <div class="form-container">
          <div class="title-container mx-4 mb-4">
            <label for="title" class="form-label">제목</label>
            <input type="text" class="form-control" id="title" name="title" v-model="title" placeholder="제목..." />
          </div>
          <div class="content-container mx-4 mb-4">
            <label for="content" class="form-label">내용</label>
            <textarea v-model="content" class="form-control" rows="10"></textarea>
          </div>
          <div class="button-container d-flex justify-content-center mb-4">
            <button type="button" class="btn submit-btn me-2" @click="checkValue" style="width: 6rem">등록</button>
            <button type="button" @click="$router.push({ name: 'noticelist' })" class="btn submit-btn ms-2" style="width: 6rem">목록</button>
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
  name: "NoticeWrite",
  data() {
    return {
      userid: "admin",
      title: "",
      content: "",
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "getToken"]),
    ...mapState(["user"]),
  },
  methods: {
    checkValue() {
      let err = true;
      let msg = "";
      !this.title && ((msg = "제목 입력해주세요"), (err = false), this.$refs.title.focus());
      err && !this.content && ((msg = "내용 입력해주세요"), (err = false), this.$refs.content.focus());

      if (!err) alert(msg);
      // 만약, 내용이 다 입력되어 있다면 registArticle 호출
      else this.registArticle();
    },
    registArticle() {
      let article = {
        userId: this.user.id,
        title: this.title,
        content: this.content,
      };
      http
        .post(`/notice/write`, article, {
          headers: {
            "X-ACCESS-TOKEN": "Bearer " + this.getToken, // the token is a variable which holds the token
          },
        })
        .then(({ data }) => {
          if (data === "success") {
            this.$router.push({ name: "noticelist" });
          } else {
            alert("글 작성 중 문제가 발생했습니다. 다시 시도해 주세요.");
          }
        });
    },
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
