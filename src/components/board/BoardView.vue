<template>
  <div v-if="isLoggedIn">
    <div class="col-lg-8 col-md-10 col-sm-12 align-self-center">
      <h2 class="my-3 py-3 shadow-sm bg-light text-center">
        <mark class="sky">게시글 상세</mark>
      </h2>
    </div>
    <div class="col-lg-8 col-md-10 col-sm-12 align-self-center">
      <div class="row my-2">
        <h2 class="text-secondary px-5">{{ article.id }}. {{ article.title }}</h2>
      </div>
      <div class="row">
        <div class="col-md-8">
          <div class="clearfix align-content-center">
            <img class="avatar me-2 float-md-start bg-light p-2" src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg" />
            <p>
              <span class="fw-bold">{{ article.userId }}</span> <br />
              <span class="text-secondary fw-light"> {{ article.createdAt }} 조회 : {{ article.hit }} </span>
            </p>
          </div>
        </div>
        <div class="col-md-4 align-self-center text-end">댓글 : 0</div>
        <div class="divider mb-3"></div>
        <div class="text-secondary">{{ article.content }}</div>
        <div class="divider mt-3 mb-3"></div>
        <div class="d-flex justify-content-end">
          <b-button @click="moveList">글목록</b-button>
          <b-button v-if="user.id == article.userId" @click="moveModifyArticle"> 글수정 </b-button>
          <b-button v-if="user.id == article.userId" @click="deleteArticle"> 글삭제 </b-button>
        </div>
      </div>
      <!-- 댓글 영역 start -->
      <div class="col-lg-8 col-md-10 col-sm-12">
        <!-- 댓글 입력 영역 start -->
        <div class="row">
          <div class="col-md-11">
            <input type="text" id="content" name="content" placeholder="댓글을 입력해주세요" style="width: 100%; height: 100%" />
          </div>
          <div class="col-md-1">
            <b-button>작성</b-button>
          </div>
        </div>
        <!-- 댓글 입력 영역 end -->
        <!-- 댓글 출력 영역 start -->
        <div v-if="comments.length" class="row">
          <table class="table table-hover">
            <thead>
              <tr class="text-center">
                <th scope="col">내용</th>
                <th scope="col">작성자</th>
                <th scope="col">작성일</th>
              </tr>
            </thead>
            <tbody>
              <comment-list-item v-for="comment in comments" :key="comment.id" :comment="comment"></comment-list-item>
            </tbody>
          </table>
        </div>
        <!-- 댓글 출력 영역 end -->
      </div>
      <!-- 댓글 영역 end -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import http from "@/util/http-common";
import CommentListItem from "@/components/board/CommentListItem";

export default {
  name: "BoardView",
  components: {
    CommentListItem,
  },
  data() {
    return {
      articleno: Number,
      article: Object,
      comments: [],
    };
  },
  
  computed: {
    ...mapGetters(["isLoggedIn", "getToken"]),
    ...mapState(["user"]),
  },

  created() {
    // 비동기
    // TODO : 글번호에 해당하는 글정보 얻기.
    this.articleno = this.$route.params.articleno;
    console.log(this.articleno);
    http
      .post(`/board/${this.articleno}`, this.articleno, {
          headers: {
            "X-ACCESS-TOKEN": "Bearer " + this.getToken, // the token is a variable which holds the token
          },})
      .then(({ data }) => {
        console.log(data);
        this.article = data;
      })
      .catch(() => {
        // console.log("error 발생");
        // console.log(response);
        alert("로그인 후 이용 가능합니다.");
        this.$router.push("/user/signin");
      });

    http
      .post(`/board/comment/${this.articleno}`, this.articleno,  {
          headers: {
            "X-ACCESS-TOKEN": "Bearer " + this.getToken, // the token is a variable which holds the token
          },})
      .then(({ data }) => {
        console.log(data);
        this.comments = data;
      })
      .catch(() => {
        // console.log("error 발생");
        // console.log(response);
        alert("로그인 후 이용 가능합니다.");
        this.$router.push("/user/signin");
      });
  },
  methods: {
    moveModifyArticle() {
      this.$router.push({ name: "boardmodify", params: { articleno: this.article.id } });
    },
    deleteArticle() {
      this.$router.push({ name: "boarddelete", params: { articleno: this.article.id } });
    },
    moveList() {
      this.$router.push({ name: "boardlist" });
    },
  },
};
</script>

<style></style>
