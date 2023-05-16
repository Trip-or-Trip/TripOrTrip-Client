<template>
  <v-app>
    <h1 class="underline">게시글 목록</h1>
    <div style="text-align: right">
      <v-btn outlined @click="movePage">작성</v-btn>
    </div>
    <div v-if="articles.length">
      <v-table id="article-list">
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
          <board-list-item
            v-for="article in articles"
            :key="article.articleno"
            :article="article"
          ></board-list-item>
        </tbody>
      </v-table>
    </div>
    <div class="text-center" v-else>게시글이 없습니다.</div>
  </v-app>
</template>

<script>
import http from "@/util/http-common";
import BoardListItem from "@/components/board/BoardListItem";

export default {
  name: "BoardList",
  components: {
    BoardListItem,
  },
  data() {
    return {
      articles: [],
    };
  },
  created() {
    // 비동기
    // TODO : 글목록 얻기.
    http.get(`/board`).then(({ data }) => {
      console.log(data);
      this.articles = data;
    });
  },
  methods: {
    movePage() {
      this.$router.push({ name: "boardwrite" });
    },
  },
};
</script>

<style></style>
