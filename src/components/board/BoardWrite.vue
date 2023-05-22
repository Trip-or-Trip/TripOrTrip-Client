<template>
  <div id="board-write">
    <div class="write-container row d-flex justify-content-center">
      <div id="write-content" class="col-lg-7 col-md-10 col-sm-12 mt-5 align-self-center">
        <h3 class="mb-2">글 작성</h3>
        <hr style="width: 100%" />
        <div class="form-container">
          <div class="title-container mx-4 mb-4">
            <label for="title" class="form-label">제목</label>
            <input type="text" class="form-control" id="title" name="title" v-model="title" placeholder="제목..." />
          </div>
          <div class="content-container mx-4 mb-4">
            <label for="content" class="form-label">내용</label>
            <textarea v-model="content" class="form-control" rows="10"></textarea>
          </div>
          <div class="button-container d-flex justify-content-center mb-4">
            <button type="button" class="btn submit-btn me-2" @click="checkValue" style="width: 6rem">등록</button>
            <button type="button" @click="$router.push({ name: 'boardlist' })" class="btn submit-btn ms-2" style="width: 6rem">목록</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import http from "@/util/http-common";

export default {
  name: "boardWrite",
  components: {},
  data() {
    return {
      title: "",
      content: "",
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "getToken"]),
    ...mapState(["user"]),
  },
  created() {},
  methods: {
    checkValue() {
      let err = true;
      let msg = "";
      !this.title && ((msg = "제목을 입력해 주세요"), (err = false), this.$refs.title.focus());
      err && !this.content && ((msg = "내용을 입력해 주세요"), (err = false), this.$refs.content.focus());

      if (!err) alert(msg);
      // 만약, 내용이 다 입력되어 있다면 registArticle 호출
      else this.registArticle();
    },
    registArticle() {
      let article = {};
      if (this.isLoggedIn) {
        article = {
          userId: this.user.id,
          title: this.title,
          content: this.content,
        };
      } else {
        alert("로그인 후 이용 가능합니다.");
        return;
      }

      http
        .post(`/board/write`, article, {
          headers: {
            "X-ACCESS-TOKEN": "Bearer " + this.getToken, // the token is a variable which holds the token
          },
        })
        .then(({ data }) => {
          if (data === "success") {
            this.$router.push({ name: "boardlist" });
          } else {
            alert("글 작성 중 문제가 발생했습니다. 다시 시도해 주세요.");
          }
        });
    },
  },
};
</script>

<style scoped>
#write-content {
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
