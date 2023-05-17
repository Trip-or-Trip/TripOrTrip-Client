<template>
  <v-app>
    <div class="col-lg-8 col-md-10 col-sm-12 align-self-center">
      <h2 class="my-3 py-3 shadow-sm bg-light text-center">
        <mark class="sky">공지 상세</mark>
      </h2>
    </div>
    <div class="col-lg-8 col-md-10 col-sm-12 align-self-center">
      <div class="row my-2">
        <h2 class="text-secondary px-5">{{article.id}}. {{article.title}}</h2>
      </div>
      <div class="row">
        <div class="col-md-8">
          <div class="clearfix align-content-center">
            <img
              class="avatar me-2 float-md-start bg-light p-2"
              src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg"
            />
            <p>
              <span class="fw-bold">{{article.userId}}</span> <br />
              <span class="text-secondary fw-light">
                {{article.createdAt}} 조회 : {{article.hit}}
              </span>
            </p>
          </div>
        </div>
        <div class="col-md-4 align-self-center text-end">댓글 : 0</div>
        <div class="divider mb-3"></div>
        <div class="text-secondary">{{article.content}}</div>
        <div class="divider mt-3 mb-3"></div>
        <div class="d-flex justify-content-end">
          <v-btn @click="moveList">글목록</v-btn>
          <c:if test="${userinfo.id eq article.userId || userinfo.id eq 'admin' }">
            <v-btn @click="moveModifyArticle" >
              글수정
            </v-btn>
            <v-btn @click="deleteArticle">
              글삭제
            </v-btn>
          </c:if>
        </div>
      </div>
      <!-- 댓글 영역 start -->
<!--      <div class="col-lg-8 col-md-10 col-sm-12" > -->
        <!-- 댓글 입력 영역 start --> 
<!--        <div class="row"> -->
<!--          <div class="col-md-11"> -->
<!--            <input type="text" id="content" name="content" placeholder="댓글을 입력해주세요" style="width:100%; height:100%;"> -->
<!--             -->
<!--          </div> -->
<!--          <div class="col-md-1"> -->
<!--            <v-btn>작성</v-btn> -->
<!--          </div> -->
<!--        </div> -->
        <!-- 댓글 입력 영역 end --> 
        <!-- 댓글 출력 영역 start --> 
<!--        <div class="row"> -->
<!--         -->
<!--        </div> -->
        <!-- 댓글 출력 영역 end --> 
<!--      </div> -->
      <!-- 댓글 영역 end -->
    </div>
</v-app>

</template>

<script>
import http from "@/util/http-common";
export default {
  name: "NoticeView",
  data() {
    return {
      articleno: Number,
      article: Object,
    };
  },
  created() {
    // 비동기
    // TODO : 글번호에 해당하는 글정보 얻기.
    this.articleno = this.$route.params.articleno;
    console.log(this.articleno);
    http.get(`/notice/${this.articleno}`).then(({ data }) => {
      this.article = data;
    });
  },
  methods: {
    moveModifyArticle() {
      console.log("글수정 하러가자!!!");
      this.$router.push({ name: "noticemodify", params: { articleno: this.article.articleno } });
    },
    deleteArticle() {
      console.log("글삭제 하러가자!!!");
      this.$router.push({ name: "noticedelete", params: { articleno: this.article.articleno } });
    },
    moveList() {
      console.log("글목록 보러가자!!!");
      this.$router.push({ name: "noticelist" });
    },
  },
};
</script>

<style></style>
