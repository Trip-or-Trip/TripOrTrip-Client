<template>
  <div id="notice-view">
    <div class="article-container row d-flex justify-content-center">
      <div id="article-content" class="col-lg-7 col-md-10 col-sm-12 mt-5 align-self-center">
        <h3 class="mb-2">{{ article.title }}</h3>
        <div class="clearfix align-content-center">
          <!-- 글 작성자 프로필 사진으로 바꿔야 함 -->
          <b-avatar
            v-if="user.image"
            variant="info"
            :src="`/upload/profile/${user.image}`"
            class="float-md-start me-2 mt-1"
            size="2.5rem"
          ></b-avatar>
          <b-avatar
            v-else
            variant="info"
            :src="require('@/assets/img/user.png')"
            class="float-md-start me-2 mt-1"
            size="2.5rem"
          ></b-avatar>
          <div>
            <span class="fw-bold">{{ article.userId }}</span> <br />
            <span class="text-secondary fw-light" style="font-size: 0.9rem">
              {{ createdAt }}&nbsp;&nbsp;&nbsp;&nbsp;조회 : {{ article.hit }}
            </span>
            <span class="float-md-end">
              <button
                v-if="article.userId == user.id"
                type="button"
                @click="$router.push({ name: 'noticemodify', param: { articleno: articleno } })"
                class="btn btn-sm submit-btn me-2"
              >
                글 수정
              </button>
              <button
                v-if="article.userId == user.id"
                type="button"
                @click="deleteArticle"
                class="btn btn-sm submit-btn me-2"
              >
                글 삭제
              </button>
              <button
                type="button"
                @click="$router.push({ name: 'noticelist' })"
                class="btn btn-sm submit-btn"
              >
                목록
              </button>
            </span>
          </div>
        </div>
        <hr id="separator-line" style="width: 100%" />
        <div class="content-container mx-3 my-5">
          <div>{{ article.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import http from "@/util/http-common";

export default {
  name: "NoticeView",
  data() {
    return {
      articleno: Number,
      article: Object,
      createdAt: "",
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
        this.createdAt = data.createdAt.substring(0, 16);
      });
  },
  methods: {
    deleteArticle() {
      http
        .delete(`/notice/${this.articleno}`, {
          headers: {
            "X-ACCESS-TOKEN": "Bearer " + this.getToken, // the token is a variable which holds the token
          },
        })
        .then(({ data }) => {
          if (data === "success") {
            this.$router.push({ name: "noticelist" });
          } else {
            alert("게시글 삭제 중 문제가 발생했습니다. 다시 시도해 주세요.");
          }
        });
    },
  },
};
</script>

<style>
#article-content {
  border: 1px solid lightgray;
  border-radius: 0.5rem;
  padding: 1.5rem;
}
</style>
