<template>
  <div id="notice-modify">
    <div class="write-container row d-flex justify-content-center">
      <div id="write-content" class="col-lg-7 col-md-10 col-sm-12 mt-5 align-self-center">
        <h3 class="mb-2">글 수정</h3>
        <hr style="width: 100%" />
        <div class="form-container">
          <div class="title-container mx-4 mb-4">
            <label for="title" class="form-label">제목</label>
            <input type="text" class="form-control" id="title" name="title" v-model="article.title" placeholder="제목..." />
          </div>
          <div class="content-container mx-4 mb-4">
            <label for="content" class="form-label">내용</label>
            <textarea v-model="article.content" class="form-control" rows="10"></textarea>
          </div>
          <div class="button-container d-flex justify-content-center mb-4">
            <button type="button" class="btn submit-btn me-2" @click="checkValue" style="width: 6rem">수정</button>
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
  name: "NoticeModify",
  data() {
    return {
      articleno: "",
      article: null,
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "getToken"]),
    ...mapState(["user"]),
  },
  created() {
    this.articleno = this.$route.params.articleno;
    http
      .post(
        `/notice/${this.articleno}`,
        {},
        {
          headers: {
            "X-ACCESS-TOKEN": "Bearer " + this.getToken, // the token is a variable which holds the token
          },
        }
      )
      .then(({ data }) => {
        this.article = data;
      });
  },
  methods: {
    checkValue() {
      if (!this.article.title || !this.article.content) alert("내용을 전부 입력해 주세요.");
      else {
        this.modifyArticle();
      }
    },
    modifyArticle() {
      http
        .put(`/notice`, this.article, {
          headers: {
            "X-ACCESS-TOKEN": "Bearer " + this.getToken, // the token is a variable which holds the token
          },
        })
        .then(({ data }) => {
          if (data === "success") {
            this.$router.push({ name: "noticeview", param: { articleno: this.articleno } });
          } else {
            alert("글 수정 중 문제가 발생했습니다. 다시 시도해 주세요.");
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
