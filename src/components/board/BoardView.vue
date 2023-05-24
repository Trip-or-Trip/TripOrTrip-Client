<template>
  <div id="board-view">
    <div class="article-container row d-flex justify-content-center">
      <div id="article-content" class="col-lg-7 col-md-10 col-sm-12 mt-5 align-self-center">
        <h3 class="mb-2">{{ article.title }}</h3>
        <div class="clearfix align-content-center">
          <!-- 글 작성자 프로필 사진으로 바꿔야 함 -->
          <b-avatar v-if="article.image" variant="info" :src="`/upload/profile/${article.image}`" class="float-md-start me-2 mt-1" size="2.5rem"></b-avatar>
          <b-avatar v-else variant="info" :src="require('@/assets/img/user.png')" class="float-md-start me-2 mt-1" size="2.5rem"></b-avatar>
          <div>
            <span class="fw-bold">{{ article.userId }}</span> <br />
            <span class="text-secondary fw-light" style="font-size: 0.9rem"> {{ createdAt }}&nbsp;&nbsp;&nbsp;&nbsp;조회 : {{ article.hit }} </span>
            <span class="float-md-end">
              <button v-if="article.userId == user.id" type="button" @click="$router.push({ name: 'boardmodify', param: { articleno: articleno } })" class="btn btn-sm submit-btn me-2">글 수정</button>
              <button v-if="article.userId == user.id" type="button" @click="deleteArticle" class="btn btn-sm submit-btn me-2">글 삭제</button>
              <button type="button" @click="$router.push({ name: 'boardlist' })" class="btn btn-sm submit-btn">목록</button>
            </span>
          </div>
        </div>
        <hr id="separator-line" style="width: 100%" />
        <div class="content-container mx-3 my-5">
          <div>{{ article.content }}</div>
        </div>
        <div class="ms-1" style="font-size: 0.9rem">
          <i class="bi bi-chat-square-dots"></i>
          &nbsp;&nbsp;<span>댓글 : {{ comments.length }}</span>
        </div>
        <hr id="separator-line" style="width: 100%" />
        <div class="comment-input-container mb-3">
          <div class="row d-flex justify-content-center">
            <div id="input-group-container" class="input-group input-group-sm">
              <input v-model="content" type="text" class="form-control" placeholder="댓글을 입력해 주세요" />
              <button type="button" @click="writeComment" class="btn submit-btn">작성</button>
            </div>
          </div>
        </div>

        <div class="comments-container">
          <comment-list-item v-for="comm in comments" :key="comm.id" :comment="comm"></comment-list-item>
        </div>
      </div>
    </div>

    <!-- <div class="col-lg-7 col-md-10 col-sm-12 align-self-center">
      <div class="row">
        <div class="col-md-4 align-self-center text-end">댓글 : {{ this.comments.length }}</div>
        <div class="divider mb-3"></div>
        <div class="text-secondary">{{ article.content }}</div>
        <div class="divider mt-3 mb-3"></div>
        <div class="d-flex justify-content-end">
          <b-button @click="moveList">글목록</b-button>
          <b-button v-if="user.id == article.userId" @click="moveModifyArticle"> 글수정 </b-button>
          <b-button v-if="user.id == article.userId" @click="deleteArticle"> 글삭제 </b-button>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import CommentListItem from "@/components/board/CommentListItem";
import { mapGetters, mapState } from "vuex";
import http from "@/util/http-common";

export default {
  name: "BoardView",
  components: {
    CommentListItem,
  },
  data() {
    return {
      articleno: Number,
      article: Object,
      createdAt: "",
      comment: null,
      content: null,
      comments: [],
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "getToken"]),
    ...mapState(["user"]),
  },
  created() {
    this.articleno = this.$route.params.articleno;
    http
      .post(
        `/board/${this.articleno}`,
        {},
        {
          headers: {
            "X-ACCESS-TOKEN": "Bearer " + this.getToken, // the token is a variable which holds the token
          },
        }
      )
      .then(({ data }) => {
        this.article = data;
        this.createdAt = data.createdAt.substring(0, 16);
        http
          .post(
            `/board/comment/${this.articleno}`,
            {},
            {
              headers: {
                "X-ACCESS-TOKEN": "Bearer " + this.getToken, // the token is a variable which holds the token
              },
            }
          )
          .then(({ data }) => {
            this.comments = data;
          });
      })
      .catch(() => {
        // console.log("error 발생");
        // console.log(response);
        alert("로그인 후 이용 가능합니다.");
        this.$router.push("/user/signin");
        return;
      });
  },
  methods: {
    writeComment() {
      if (this.content == null) {
        alert("댓글을 입력해 주세요.");
        return;
      }
      if (!this.isLoggedIn) {
        alert("로그인 후 이용 가능합니다.");
        return;
      }

      this.comment = {
        userId: this.user.id,
        content: this.content,
        boardId: this.articleno,
      };

      http
        .post(`/board/writecomment/${this.article.id}`, this.comment, {
          headers: {
            "X-ACCESS-TOKEN": "Bearer " + this.getToken, // the token is a variable which holds the token
          },
        })
        .then(({ data }) => {
          if (data === "success") {
            this.content = "";
            this.reloadComments();
            // location.reload(this);
          } else {
            alert("댓글 작성 중 문제가 발생했습니다. 다시 시도해 주세요.");
            location.reload();
          }
        });
    },
    reloadComments() {
      http
        .post(
          `/board/comment/${this.articleno}`,
          {},
          {
            headers: {
              "X-ACCESS-TOKEN": "Bearer " + this.getToken, // the token is a variable which holds the token
            },
          }
        )
        .then(({ data }) => {
          this.comments = data;
        })
        .catch(() => {
          alert("댓글을 가져오는 중 문제가 발생했습니다.");
          location.reload();
          return;
        });
    },
    deleteArticle() {
      http
        .delete(`/board/${this.articleno}`, {
          headers: {
            "X-ACCESS-TOKEN": "Bearer " + this.getToken, // the token is a variable which holds the token
          },
        })
        .then(({ data }) => {
          if (data === "success") {
            this.$router.push({ name: "boardlist" });
          } else {
            alert("게시글 삭제 중 문제가 발생했습니다. 다시 시도해 주세요.");
          }
        });
    },
  },
};
</script>

<style scoped>
#article-content {
  border: 1px solid lightgray;
  border-radius: 0.5rem;
  padding: 1.5rem;
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
