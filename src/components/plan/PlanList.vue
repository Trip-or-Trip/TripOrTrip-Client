<template>
  <div>
    <h1 class="underline">여행 계획 목록</h1>
    <div style="text-align: right">
      <button @click="movePage">작성</button>
    </div>
    <div v-if="articles.length">
      <table id="article-list">
        <colgroup>
          <col style="width: 5%" />
          <col style="width: 65%" />
          <col style="width: 10%" />
          <col style="width: 5%" />
          <col style="width: 15%" />
        </colgroup>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>조회수</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          <plan-list-item
            v-for="article in articles"
            :key="article.id"
            :article="article"
          ></plan-list-item>
        </tbody>
      </table>
    </div>
    <div class="text-center" v-else>게시글이 없습니다.</div>
  </div>
</template>

<script>
import http from "@/util/http-common";
import PlanListItem from "@/components/plan/PlanListItem";

export default {
  name: "PlanList",
  components: {
    PlanListItem,
  },
  data() {
    return {
      articles: [],
    };
  },
  created() {
    // 비동기
    // TODO : 글목록 얻기.
    http.get(`/plan`).then(({ data }) => {
      console.log(data);
      this.articles = data;
    });
  },
  methods: {
    movePage() {
      this.$router.push({ name: "planwrite" });
    },
  },
};
</script>

<style></style>
