<template>
  <div class="m-5">
    <div class="px-5 align-self-center">
      <h2 class="my-3 py-3 shadow-sm bg-light text-center">
        <mark class="sky">여행계획</mark>
      </h2>
      <div style="float: right">
        <router-link :to="{ name: 'planwrite' }" v-if="user" class="btn submit-btn mt-2 px-3 py-1">
          작성
        </router-link>
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
          <button @click="searchKeyword">검색</button>
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
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
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
      .get(`/plan/list`)
      .then(({ data }) => {
        this.articles = data;
      })
      .then(() => {
        this.printArticles();
      });
  },
  computed: {
    ...mapGetters(["isLoggedIn", "getToken"]),
    ...mapState(["user"]),
  },
  methods: {
    printArticles() {
      console.log(this.articles);
    },
    searchKeyword() {
      let boardParameterDto = {
        pg: 1,
        spp: 20,
        start: 1,
        key: this.key,
        word: this.word,
      };
      http.post(`/plan/list`, boardParameterDto).then(({ data }) => {
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
