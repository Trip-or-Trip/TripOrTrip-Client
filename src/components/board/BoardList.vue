<template>
  <div class="m-5">
    <div class="px-5 align-self-center">
      <h2 class="my-3 py-3 shadow-sm bg-light text-center">
        <mark class="sky">자유 게시판</mark>
      </h2>
      <div class="d-flex col-md-5 offset-7">
        <div class="input-group input-group-sm">
          <select v-model="key" class="form-select form-select-sm ms-5 me-1 w-50 " aria-label="검색조건">
            <option selected disabled>검색조건</option>
            <option value="id">글번호</option>
            <option value="title">제목</option>
            <option value="user_id">작성자</option>
            <option value="content">내용</option>
          </select>
          <input v-model="word" type="text" class="form-control ms-5 form-control-sm" placeholder="검색어..." />
          <button @click="searchKeyword">검색</button>
        </div>
        <div v-if="this.isLoggedIn" style="text-align: right">
          <button  @click="movePage" >글쓰기</button>
        </div>
      </div>
    </div>

    <div v-if="articles.length" class="row align-self-center mb-2" style="width: 80%">
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
    <div v-else class="title-container">
      <h5>게시글이 없습니다.</h5>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
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
  computed: {
    ...mapGetters(["isLoggedIn", "getToken"]),
    ...mapState(["user"]),
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
      http.post(`/board/list`, boardParameterDto).then(({ data }) => {
        this.articles = data;
      });
    },
  },
};
</script>

<style>
.submit-btn {
  /* background-color: white; */
  background-color: #aebdca;
  color: white;
  border: 0px solid white;
}

.submit-btn:hover {
  /* background-color: white; */
  background-color: #8fa5b8;
  color: white;
}
</style>

<style scoped>
.title-container {
  text-align: center;
}

#write-btn {
  margin-right: 7rem;
}
</style>
