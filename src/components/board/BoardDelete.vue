<template>
  <div class="regist">
    <h1>게시글 삭제</h1>
    <div>삭제중....</div>
  </div>
</template>

<script>
import http from "@/util/http-common";
export default {
  name: "BoardDelete",
  data() {
    return {
      articleno: Number,
    };
  },
  created() {
    // 비동기
    // TODO : 글번호에 해당하는 글을 삭제.
    this.articleno = this.$route.params.articleno;
    console.log(this.articleno + "번글 삭제 요청");
    http.delete(`/board/${this.articleno}`).then(({ data }) => {
      let msg = "게시글 삭제 중 문제 발생!!!";
      if (data === "success") msg = "게시글 삭제 성공하였습니다.";
      alert(msg);
      this.moveList();
    });
  },

  methods: {
    moveList() {
      this.$router.push({ path: "" });
    },
  },
};
</script>

<style></style>
