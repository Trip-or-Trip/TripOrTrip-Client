<template>
  <v-app>
    <div class="col-lg-8 col-md-10 col-sm-12 align-self-center">
      <h2 class="my-3 py-3 shadow-sm bg-light text-center">
        <mark class="sky">게시판</mark>
      </h2>
      <div style="text-align: right">
        <v-btn outlined @click="movePage">작성</v-btn>
      </div>
    </div>

    <div v-if="articles.length" class="row align-self-center mb-2" style="width: 80%">
      <div class="col-md-5 offset-7">
        <form class="d-flex" id="form-search" action="">
          <input type="hidden" name="" value="" />
          <input type="hidden" name="pgno" value="1" />
          <select v-model="key" name="key" id="key" class="form-select form-select-sm ms-5 me-1 w-50" aria-label="검색조건">
            <option selected disabled>검색조건</option>
            <option value="id">글번호</option>
            <option value="title">제목</option>
            <option value="user_id">작성자</option>
            <option value="content">내용</option>
          </select>
          <div class="input-group input-group-sm">
            <input v-model="word" type="text" name="word" id="word" class="form-control" placeholder="검색어..." />
            <v-btn outlined @click="searchKeyword">검색</v-btn>
          </div>
        </form>
      </div>
      <table class="table table-hover">
        <thead>
          <tr class="text-center">
            <th scope="col">글번호</th>
            <th scope="col">제목</th>
            <th scope="col">작성자</th>
            <th scope="col">조회수</th>
            <th scope="col">작성일</th>
          </tr>
        </thead>
        <tbody>
          <board-list-item v-for="article in articles" :key="article.id" :article="article"></board-list-item>
        </tbody>
      </table>
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
      key: null,
      word: null,
    };
  },
  created() {
    // 비동기
    // TODO : 글목록 얻기.
    http.get(`/board/list`).then(({ data }) => {
      console.log(data);
      this.articles = data;
    });
  },
  methods: {
    movePage() {
      this.$router.push({ name: "boardwrite" });
    },
    searchKeyword() {
      let boardParameterDto = {
        pg: 1,
        spp: 20,
        start: 1,
        key: this.key,
        word: this.word,
      };
      http.post(`/board`, boardParameterDto).then(({ data }) => {
        this.articles = data;
      });
    },
  },
};
</script>

<style></style>
