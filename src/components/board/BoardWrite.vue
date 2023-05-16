<template>
  <div class="regist">
    <h1 class="underline">게시글 작성</h1>
    <div class="regist_form">
      <label for="userid">작성자</label>
      <input type="text" id="userid" v-model="userid" ref="userid" /><br />
      <label for="title">제목</label>
      <input type="text" id="title" v-model="title" ref="title" /><br />
      <label for="content">내용</label>
      <br />
      <textarea id="content" v-model="content" ref="content" cols="35" rows="5"></textarea><br />
      <button @click="checkValue">등록</button>
      <button @click="moveList">목록</button>
    </div>
  </div>
</template>

<script>
import http from "@/util/http-common";
export default {
  name: "BoardWrite",
  data() {
    return {
      userid: null,
      subject: null,
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
      !this.userid && ((msg = "작성자 입력해주세요"), (err = false), this.$refs.userid.focus());
      err && !this.title && ((msg = "제목 입력해주세요"), (err = false), this.$refs.title.focus());
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
      http.post(`/board`, article).then(({ data }) => {
        let msg = "글 작성 중 문제가 발생하였습니다.";
        if (data === "success") msg = "글 작성 완료하였습니다.";
        alert(msg);
        this.moveList();
      });
    },

    moveList() {
      this.$router.push({ path: "" });
    },
  },
};
</script>

<style></style>
