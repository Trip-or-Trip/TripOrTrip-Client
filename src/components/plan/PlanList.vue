<template>
  <v-app>
    <div class="col-lg-8 col-md-10 col-sm-12 align-self-center">
      <h2 class="my-3 py-3 shadow-sm bg-light text-center">
        <mark class="sky">여행 계획 목록</mark>
      </h2>
      <div style="text-align: right">
        <v-btn outlined @click="movePage">작성</v-btn>
      </div>
    </div>

    <div v-if="articles.length" class="row align-self-center mb-2" style="width: 80%">
      <div class="col-md-5 offset-7">
        <select
          v-model="key"
          class="form-select form-select-sm ms-5 me-1 w-50"
          aria-label="검색조건"
        >
          <option selected disabled>검색조건</option>
          <option value="id">글번호</option>
          <option value="title">제목</option>
          <option value="user_id">작성자</option>
          <option value="content">내용</option>
        </select>
        <div class="input-group input-group-sm">
          <input v-model="word" type="text" class="form-control" placeholder="검색어..." />
          <v-btn outlined @click="searchKeyword">검색</v-btn>
        </div>
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
          <plan-list-item
            v-for="article in articles"
            :key="article.id"
            :article="article"
          ></plan-list-item>
        </tbody>
      </table>
    </div>
    <div class="text-center" v-else>게시글이 없습니다.</div>
  </v-app>
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
      key: null,
      word: null,
    };
  },
  created() {
    // 비동기
    // TODO : 글목록 얻기.
    http
      .get(`/plan`)
      .then(({ data }) => {
        this.articles = data;
      })
      .then(() => {
        this.printArticles();
      });
  },
  methods: {
    printArticles() {
      console.log("printArticles call!!");
      console.log(this.articles);
    },
    movePage() {
      this.$router.push({ name: "planwrite" });
    },
    searchKeyword() {
      let boardParameterDto = {
        pg: 1,
        spp: 20,
        start: 1,
        key: this.key,
        word: this.word,
      };
      http.post(`/plan`, boardParameterDto).then(({ data }) => {
        this.articles = data;
      });
    },
    test() {
      console.log(this.articles);
    },
  },
};
</script>

<style></style>
