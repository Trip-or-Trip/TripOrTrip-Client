<template>
  <div id="mypage-board">
    <div class="mt-5">
      <h2>작성한 댓글</h2>
      <div v-if="comments.length" class="row align-self-center mb-2" style="width: 80%">
        <table class="table table-hover">
          <thead>
            <tr class="text-center">
              <th scope="col">글번호</th>
              <th scope="col">내용</th>
              <th scope="col">작성일</th>
              <th scope="col">삭제</th>
            </tr>
          </thead>
          <tbody>
            <comment-list-item v-for="comment in comments" :key="comment.id" :comment="comment"></comment-list-item>
          </tbody>
        </table>
      </div>
      <div v-else class="title-container">
        <h5>작성한 댓글이 없습니다.</h5>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import http from "@/util/http-common";
import CommentListItem from "@/components/mypage/CommentListItem";

export default {
  name: "MypageComment",
  components: {
    CommentListItem,
  },
  data() {
    return {
      comments: [],
    };
  },
  computed: {
    ...mapGetters(["getToken"]),
    ...mapState(["user"]),
  },
  created() {
    // 비동기
    http.post(`/mypage/board`, this.user.id,  {
      headers: {
        "X-ACCESS-TOKEN": "Bearer " + this.getToken, // the token is a variable which holds the token
      },}).then(({ data }) => {
      this.articles = data;
    });
    http.post(`/board/comment`, this.user.id,  {
      headers: {
        "X-ACCESS-TOKEN": "Bearer " + this.getToken, // the token is a variable which holds the token
      },}).then(({ data }) => {
        this.comments = data;
      });
  },
  methods: {},
};
</script>

<style scoped></style>
