<template>
  <div id="mypage-category text-center">
    <div id="title-container" class="text-center mx-5 mb-2">
      <h2 id="mypage-title">MY PAGE</h2>
    </div>
    <ul id="category-container" class="list-group list-group-flush mx-4 px-3 py-2">
      <li class="list-group-item category-item my-2"><router-link :to="{ name: 'userdetail' }">회원 정보</router-link></li>
      <li @click="subListShow = !subListShow" class="list-group-item category-item my-2 align-item-center">
        작성한 글
        <ul v-if="subListShow" class="list-group list-group-flush mt-2 mb-3 px-2">
          <li @click="subListShow = !subListShow" class="list-group-item category-item"><router-link :to="{ name: 'mypageboard' }">게시판</router-link></li>
          <li @click="subListShow = !subListShow" class="list-group-item category-item"><router-link :to="{ name: 'mypageplan' }">여행 계획</router-link></li>
          <li @click="subListShow = !subListShow" class="list-group-item category-item"><router-link :to="{ name: 'mypagehotplace' }">핫플레이스</router-link></li>
        </ul>
      </li>
      <li class="list-group-item category-item my-2"><router-link :to="{ name: 'mypagecomment' }">작성한 댓글</router-link></li>
      <li id="last-category-item" class="list-group-item category-item my-2"><router-link :to="{ name: 'mypagelike' }">좋아요 누른 게시글</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MypageCategory",
  components: {},
  data() {
    return {
      subListShow: false,
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}
#title-container {
  border-bottom: 1px solid lightgray;
}
#mypage-title {
  margin-top: 8.5rem;
}
#category-container {
  margin-top: 1.5rem;
}
#last-category-item,
.category-item {
  border-bottom: 1px solid lightgray;
}
</style>
