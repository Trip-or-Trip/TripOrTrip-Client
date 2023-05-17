<template>
  <v-app>
  <div id="board-list">
    <div class="title-container mt-4">
      <div style="width: 80%; display: inline-block;">
        <h2 class="my-3 py-3 shadow-sm bg-light text-center">
          <mark class="sky">게시판</mark>
        </h2>
      </div>
    </div>
    <div style="text-align: right;">
      <v-btn class="text-none mb-5" id="write-btn" color="medium-emphasis" min-width="92" rounded variant="outlined" @click="movePage">글 작성</v-btn>
    </div>
    
    <div v-if="articles.length">
      <div class="row align-self-center mb-2">
        <div class="col-md-6 offset-6">
          <form class="d-flex">
            <div class="col-4">
              <v-select v-model="key" name="key" id="key" density="compact">
                <option selected disabled>검색조건</option>
                <option value="id">글번호</option>
                <option value="title">제목</option>
                <option value="user_id">작성자</option>
                <option value="content">내용</option>
              </v-select>
            </div>
            <div class="col-6">
              <input v-model="word" type="text" name="word" id="word" class="form-control" placeholder="검색어..."/>
            </div>
            <div class="col-2">
              <v-btn class="text-none" id="write-btn" color="medium-emphasis" min-width="92" rounded variant="outlined" @click="searchKeyword">검색</v-btn>
            </div>
          </form>
        </div>
      </div>
      
      
      <!-- <div class="col-md-5 offset-7">
        <form class="d-flex" id="form-search" action="">
          <input type="hidden" name="" value="" />
          <input type="hidden" name="pgno" value="1" />
          <select
            v-model="key"
            name="key"
            id="key"
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
            <input
              v-model="word"
              type="text"
              name="word"
              id="word"
              class="form-control"
              placeholder="검색어..."
            />
            <button type="button" class="btn submit-btn" @click="searchKeyword">검색</button>
          </div>
        </form>
      </div> -->
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
          <board-list-item
            v-for="article in articles"
            :key="article.id"
            :article="article"
          ></board-list-item>
        </tbody>
      </table>
    </div>
    <div v-else class="title-container">
      <h5>게시글이 없습니다.</h5>
    </div>
  </div>
  </v-app>
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