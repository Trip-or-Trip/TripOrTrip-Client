<template>
  <div class="row justify-content-center">
    <div class="col-lg-8 col-md-10 col-sm-12">
      <h2 class="my-3 py-3 shadow-sm bg-light text-center">
        <mark class="sky">글쓰기</mark>
      </h2>
    </div>
    <div class="col-lg-8 col-md-10 col-sm-12">
      <div class="mb-3">
        <input type="hidden" v-model="userid" />
        <label for="title" class="form-label">제목 : </label>
        <input
          type="text"
          class="form-control"
          id="title"
          name="title"
          v-model="title"
          placeholder="제목..."
        />
      </div>
      <div class="mb-3">
        <label for="content" class="form-label">내용 : </label>
        <textarea v-model="content" rows="10"></textarea>
      </div>
      <div class="col-auto text-center">
        <v-btn @click="checkValue">등록</v-btn>
        <v-btn @click="moveList">목록</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/util/http-common";
export default {
  name: "BoardWrite",
  data() {
    return {
      userid: "ssafy",
      title: null,
      content: null,
    };
  },
  methods: {
    // 입력값 체크하기 - 체크가 성공하면 registArticle 호출
    checkValue() {
      // 사용자 입력값 체크하기
      // 작성자아이디, 제목, 내용이 없을 경우 각 항목에 맞는 메세지를 출력
      let err = true;
      let msg = "";
      !this.title && ((msg = "제목 입력해주세요"), (err = false), this.$refs.title.focus());
      err &&
        !this.content &&
        ((msg = "내용 입력해주세요"), (err = false), this.$refs.content.focus());

      if (!err) alert(msg);
      // 만약, 내용이 다 입력되어 있다면 registArticle 호출
      else this.registArticle();
    },
    registArticle() {
      // 비동기
      // TODO : 글번호에 해당하는 글정보 등록.
      // alert("글작성 하러가자!!!!");
      let article = {
        userId: this.userid,
        title: this.title,
        content: this.content,
      };
      http.post(`/board/write`, article).then(({ data }) => {
        let msg = "글 작성 중 문제가 발생하였습니다.";
        if (data === "success") msg = "글 작성 완료하였습니다.";
        alert(msg);
        this.moveList();
      });
    },

    moveList() {
      this.$router.push({ name: "boardlist" });
    },
  },
};
</script>

<style></style>
