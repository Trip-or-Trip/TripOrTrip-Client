<template>
  <div id="plan-list">
    <div class="px-5 align-self-center">
      <div id="title-container" class="mt-4 mb-4 py-3 shadow-sm text-center rounded">
        <div><h2>여행 계획</h2></div>
      </div>
      <div class="d-flex col-lg-5 col-md-7 offset-lg-6 offset-md-4 mb-3">
        <div id="input-group-container" class="input-group input-group-sm">
          <select v-model="key" class="form-select form-select" aria-label="검색조건">
            <option selected>검색조건</option>
            <!-- <option value="id">글번호</option> -->
            <option value="title">제목</option>
            <option value="user_id">작성자</option>
            <option value="content">내용</option>
          </select>

          <input v-model="word" type="text" class="form-control ms-3" placeholder="검색어..." />
          <button type="button" @click="searchKeyword" class="btn submit-btn">검색</button>

          <div v-if="isLoggedIn" class="ms-3">
            <button type="button" @click="$router.push({ name: 'planwrite' })" class="btn submit-btn">글쓰기</button>
          </div>
        </div>
      </div>
    </div>

    <div class="row d-flex justify-content-center">
      <div v-if="articles.length" id="articles-container" class="col-lg-7 col-md-10 align-self-center mb-2">
        <b-table id="article-container" :items="articles" :fields="fields" sort-icon-right :per-page="perPage" :current-page="currentPage" @row-clicked="articleClick" class="mb-4"></b-table>
        <b-pagination pills v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="article-container" align="center"></b-pagination>
      </div>
      <div v-else class="title-container text-center mt-5">
        <h5 class="mt-5">게시글이 없습니다.</h5>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import http from "@/util/http-common";

export default {
  name: "PlanList",
  components: {},
  data() {
    return {
      articles: [],
      key: null,
      word: null,
      currentPage: 1,
      perPage: 10,
      fields: [
        {
          key: "title",
          label: "제목",
          thStyle: { width: "45%" },
          // sortable: true,
        },
        {
          key: "hit",
          label: "조회수",
          thStyle: { width: "15%" },
          // sortable: false,
        },
        {
          key: "userId",
          label: "작성자",
          thStyle: { width: "15%" },
          // sortable: false,
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
  created() {
    http.get(`/plan/list`).then(({ data }) => {
      this.articles = data;
    });
  },
  computed: {
    ...mapGetters(["isLoggedIn", "getToken"]),
    ...mapState(["user"]),
    rows() {
      return this.articles.length;
    },
  },
  methods: {
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
    articleClick(result) {
      if (!this.isLoggedIn) {
        alert("로그인 후 이용 가능합니다.");
        return;
      }
      location.href = `/plan/${result.id}`;
      // this.$router.push({ name: "planview", params: { articleno: result.id } });
    },
  },
};
</script>

<style>
#title-container {
  background-color: #dde5eb;
}
.submit-btn {
  /* background-color: white; */
  background-color: #aebdca;
  color: white;
}
.submit-btn:hover {
  /* background-color: white; */
  background-color: #8fa5b8;
  color: white;
}
</style>
