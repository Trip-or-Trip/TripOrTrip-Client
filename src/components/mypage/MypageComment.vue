<template>
  <div id="mypage-board">
    <div class="mt-5">
      <h2 style="text-align: center">내가 쓴 댓글</h2>
      <div class="row d-flex justify-content-center">
        <div
          v-if="articles.length"
          id="articles-container"
          class="col-lg-10 col-md-10 align-self-center mb-2"
        >
          <b-table
            id="article-container"
            :items="articles"
            :fields="fields"
            sort-icon-right
            :per-page="perPage"
            :current-page="currentPage"
            @row-clicked="articleClick"
            class="mb-4"
          ></b-table>
          <b-pagination
            pills
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="article-container"
            align="center"
          ></b-pagination>
        </div>
        <div v-else class="title-container text-center mt-5">
          <h5 class="mt-5">게시글이 없습니다.</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import http from "@/util/http-common";

export default {
  name: "MypageComment",
  components: {},
  data() {
    return {
      currentPage: 1,
      perPage: 20,
      articles: [],
      fields: [
        {
          key: "boardId",
          label: "글번호",
          thStyle: { width: "10%" },
          // sortable: true,
        },
        {
          key: "content",
          label: "내용",
          thStyle: { width: "50%" },
          // sortable: true,
        },
        {
          key: "createdAt",
          label: "작성 날짜",
          thStyle: { width: "25%" },
          // sortable: true,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["getToken", "isLoggedIn"]),
    ...mapState(["user"]),
    rows() {
      return this.articles.length;
    },
  },
  created() {
    // 비동기
    http
      .post(`/mypage/board`, this.user.id, {
        headers: {
          "X-ACCESS-TOKEN": "Bearer " + this.getToken, // the token is a variable which holds the token
        },
      })
      .then(({ data }) => {
        this.article = data;
      });
    http
      .post(`/board/comment`, this.user.id, {
        headers: {
          "X-ACCESS-TOKEN": "Bearer " + this.getToken, // the token is a variable which holds the token
        },
      })
      .then(({ data }) => {
        this.articles = data;
      });
  },
  methods: {
    articleClick(result) {
      if (!this.isLoggedIn) {
        alert("로그인 세션이 만료되었습니다. 다시 로그인 해주세요.");
        return;
      }
      this.$router.push({ name: "boardview", params: { articleno: result.id } });
    },
  },
};
</script>

<style scoped></style>
