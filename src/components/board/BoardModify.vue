<template>
  <div class="row justify-content-center">
    <div class="col-lg-8 col-md-10 col-sm-12">
      <h2 class="my-3 py-3 shadow-sm bg-light text-center">
        <mark class="sky">게시판 글수정</mark>
      </h2>
    </div>
    <div class="col-lg-8 col-md-10 col-sm-12">
      <div class="mb-3">
        <label for="subject" class="form-label">제목 : </label>
        <input v-model="article.title" />
        <input type="hidden" v-model="article.id" />
      </div>
      <div class="mb-3">
        <label for="content" class="form-label">내용 : </label>
        <textarea v-model="article.content" rows="10"></textarea>
      </div>
      <div class="col-auto text-center">
        <v-btn @click="moveList">목록</v-btn>
        <v-btn @click="checkValue">수정</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/util/http-common";
export default {
  name: "BoardModify",
  data() {
    return {
      articleno: Number,
      article: Object,
    };
  },
  methods: {
    // 입력값 체크하기 - 체크가 성공하면 modifyArticle 호출
    checkValue() {
      // 사용자 입력값 체크하기
      // 작성자아이디, 제목, 내용이 없을 경우 각 항목에 맞는 메세지를 출력
      let err = true;
      let msg = "";
      !this.article.userid && ((msg = "작성자 입력해주세요"), (err = false), this.$refs.userid.focus());
      err && !this.article.subject && ((msg = "제목 입력해주세요"), (err = false), this.$refs.subject.focus());
      err && !this.article.content && ((msg = "내용 입력해주세요"), (err = false), this.$refs.content.focus());

      if (!err) alert(msg);
      // 만약, 내용이 다 입력되어 있다면 modifyArticle 호출
      else this.modifyArticle();
    },
    modifyArticle() {
      console.log(this.article.articleno + "번 글수정 하러가자!!!!");
      // 비동기
      // TODO : 글번호에 해당하는 글정보 수정.
      http.put(`/board`, this.article).then(({ data }) => {
        let msg = "글 수정 시 문제 발생!!!";
        if (data === "success") msg = "글 수정 성공!!!";
        alert(msg);
        this.moveList();
      });
    },

    moveList() {
      console.log("글목록 보러가자!!!");
      this.$router.push({ name: "boardlist" });
    },
  },
  created() {
    // 비동기
    // TODO : 글번호에 해당하는 글정보 얻기.
    this.articleno = this.$route.params.articleno;
    http.get(`/board/${this.articleno}`).then(({ data }) => {
      this.article = data;
    });
    // this.article = {
    //   articleNo: this.articleno,
    //   userId: "ssafy",
    //   userName: "안효인",
    //   subject: "안녕하세요",
    //   content: "안녕하세요!!!!",
    //   hit: 10,
    //   registerTime: "2023-05-08 17:03:15",
    // };
  },
};
</script>

<style></style>
