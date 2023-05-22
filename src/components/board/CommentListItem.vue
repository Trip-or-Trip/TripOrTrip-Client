<template>
  <div id="comment-list-item">
    <div class="clearfix align-content-center">
      <!-- 글 작성자 프로필 사진으로 바꿔야 함 -->
      <b-avatar v-if="user.image" variant="info" :src="`/upload/profile/${user.image}`" class="float-md-start me-2 mt-1" size="2rem"></b-avatar>
      <b-avatar v-else variant="info" :src="require('@/assets/img/user.png')"></b-avatar>
      <p>
        <span class="fw-bold" style="font-size: 0.9rem">{{ comment.userId }}</span> &nbsp; <span class="text-secondary fw-light" style="font-size: 0.8rem"> {{ comment.createdAt }}</span> <br />
        <span style="font-size: 0.95rem">{{ comment.content }}</span> <br />
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
// import http from "@/util/http-common";

export default {
  name: "CommentListItem",
  components: {},
  props: {
    comment: Object,
  },
  data() {
    return {
      message: "",
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "getToken"]),
    ...mapState(["user"]),
  },
  created() {},
  methods: {},
};
</script>

<style scoped></style>
