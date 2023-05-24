<template>
  <div id="comment-list-item">
    <div class="clearfix align-content-center">
      <!-- 글 작성자 프로필 사진으로 바꿔야 함 -->
      <b-avatar v-if="comment.image" variant="info" :src="`/upload/profile/${comment.image}`" class="float-md-start me-2 mt-1" size="2rem"></b-avatar>
      <b-avatar v-else variant="info" :src="require('@/assets/img/user.png')" class="float-md-start me-2 mt-1" size="2rem"></b-avatar>
      <p>
        <span class="fw-bold" style="font-size: 0.9rem">{{ comment.userId }}</span> &nbsp;
        <span class="text-secondary fw-light" style="font-size: 0.8rem"> {{ comment.createdAt }}</span>
        &nbsp;
        <button v-if="comment.userId == user.id" type="button" @click="deleteComment" class="btn btn-sm submit-btn me-2">삭제</button>
        <br />
        <span style="font-size: 0.95rem">{{ comment.content }}</span> <br />
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import http from "@/util/http-common";

export default {
  name: "CommentListItem",
  components: {},
  props: {
    comment: Object,
  },
  data() {
    return {
      message: "",
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "getToken"]),
    ...mapState(["user"]),
  },
  created() {},
  methods: {
    deleteComment() {
      http
        .delete(`/board/deletecomment/${this.comment.id}`, {
          headers: {
            "X-ACCESS-TOKEN": "Bearer " + this.getToken, // the token is a variable which holds the token
          },
        })
        .then(({ data }) => {
          if (data === "success") {
            alert("댓글 삭제 성공!");
            location.reload();
          } else {
            alert("댓글 삭제 중 문제가 발생했습니다. 다시 시도해 주세요.");
          }
        });
    },
  },
};
</script>

<style scoped></style>
