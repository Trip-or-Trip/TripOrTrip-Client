<template>
  <div id="board-list">
    <div class="px-5 align-self-center">
      <div id="title-container" class="mt-4 mb-3 py-3 shadow-sm text-center rounded">
        <div><h2>자유 게시판</h2></div>
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
          <!-- <button type="button" @click="searchKeyword" class="btn submit-btn">검색</button> -->
          <button type="button" class="btn submit-btn">검색</button>

          <div v-if="this.isLoggedIn" class="ms-3">
            <!-- <button type="button" @click="movePage" class="btn submit-btn">글쓰기</button> -->
            <button type="button" class="btn submit-btn"><router-link :to="{ name: 'boardwrite' }">글쓰기</router-link></button>
          </div>
        </div>
      </div>
    </div>

    <div class="row d-flex justify-content-center">
      <div v-if="articles.length" id="articles-container" class="col-lg-7 col-md-10 align-self-center mb-2">
        <b-table id="article-container" :items="articles" :fields="fields" sort-icon-right :per-page="perPage" :current-page="currentPage" @row-clicked="articleClick"></b-table>
        <b-pagination pills v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="article-container" align="center"></b-pagination>
      </div>
      <div v-else class="title-container">
        <h5>게시글이 없습니다.</h5>
      </div>
    </div>
  </div>
</template>

<script>
// import BoardListItem from "@/components/board/BoardListItem";
import { mapGetters, mapState } from "vuex";
import http from "@/util/http-common";

export default {
  name: "BoardList",
  components: {
    // BoardListItem,
  },
  data() {
    return {
      key: "",
      word: "",
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
      articles: [],
      currentPage: 1,
      perPage: 10,
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapState(["user"]),
    rows() {
      return this.articles.length;
    },
  },
  created() {
    http.get(`/board/list?key=${this.key}&word=${this.word}`).then(({ data }) => {
      this.articles = data;
    });
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    articleClick(result, event) {
      console.log(this.isLoggedIn);
      if (!this.isLoggedIn) {
        alert("로그인 후 이용 가능합니다.");
        return;
      }
      this.$router.push({ name: "boardview", params: { articleno: result.id } });
    },
  },
};
</script>

<style scoped>
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
#input-group-container {
  padding: 0.7rem 0;
}
a {
  text-decoration: none;
  color: white;
}
</style>
