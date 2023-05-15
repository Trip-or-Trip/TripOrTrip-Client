<template>
  <div class="regist">
    <h1 class="underline">여행계획 상세보기</h1>
    <div class="regist_form">
      <label> 글번호</label>
      <div class="view">{{ article.article.id }}</div>
      <label> 글제목</label>
      <div class="view">{{ article.article.title }}</div>
      <label> 작성자</label>
      <div class="view">{{ article.article.userId }}</div>
      <label> 조회수</label>
      <div class="view">{{ article.article.hit }}</div>
      <label> 작성시간</label>
      <div class="view">{{ article.article.createdAt }}</div>
      <label> 내용</label>
      <div class="view">{{ article.article.description }}</div>

      <div style="padding-top: 15px">
        <button class="btn" @click="moveModifyArticle">수정</button>
        <button class="btn" @click="deleteArticle">삭제</button>
        <button class="btn" @click="moveList">목록</button>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/util/http-common";
export default {
  name: "PlanView",
  data() {
    return {
      articleno: Number,
      article: Object,
    };
  },
  created() {
    // 비동기
    // TODO : 글번호에 해당하는 글정보 얻기.
    this.articleno = this.$route.params.articleno;
    console.log(this.articleno);
    http.get(`/plan/${this.articleno}`).then(({ data }) => {
      this.article = data;
    });
  },
  methods: {
    moveModifyArticle() {
      alert("서비스 준비중입니다.");
      // console.log("글수정 하러가자!!!");
      // this.$router.push({ name: "planmodify", params: { articleno: this.article.id } });
    },
    deleteArticle() {
      this.$router.push({ name: "plandelete", params: { articleno: this.article.id } });
    },
    moveList() {
      this.$router.push({ name: "planlist" });
    },
  },
};
</script>

<style></style>
