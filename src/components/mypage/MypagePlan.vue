<template>
  <div id="mypage-board">
    <div class="mt-5">
      <h2>작성한 여행계획</h2>
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
            <plan-list-item v-for="article in articles" :key="article.id" :article="article"></plan-list-item>
          </tbody>
        </table>
        
      </div>
      <div v-else class="title-container">
        <h5>작성한 여행계획이 없습니다.</h5>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import http from "@/util/http-common";
import PlanListItem from "@/components/plan/PlanListItem";

export default {
  name: "MypagePlan",
  components: {
    PlanListItem,
  },
  data() {
    return {
      articles: [],
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "getToken"]),
    ...mapState(["user"]),
  },
  created() {
    // 비동기
    http.post(`/mypage/plan`, this.user.id,  {
      headers: {
        "X-ACCESS-TOKEN": "Bearer " + this.getToken, // the token is a variable which holds the token
      },}).then(({ data }) => {
      this.articles = data;
    });
  },
  methods: {},
};
</script>

<style scoped></style>
