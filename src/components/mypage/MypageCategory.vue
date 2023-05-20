<template>
  <div id="mypage-category">
    <ul id="category-container" class="list-group list-group-flush px-3 py-2">
      <li class="list-group-item my-2"><router-link :to="{ name: 'userdetail' }">회원 정보 보기</router-link></li>
      <li @click="subListShow = !subListShow" class="list-group-item my-2 align-item-center">
        내가 작성한 글 보기
        <ul v-if="subListShow" class="list-group list-group-flush mt-2 mb-3 px-2">
          <li @click="subListShow = !subListShow" class="list-group-item"><router-link :to="{ name: 'mypageboard' }">게시판</router-link></li>
          <li @click="subListShow = !subListShow" class="list-group-item"><router-link :to="{ name: 'mypageplan' }">여행 계획</router-link></li>
          <li @click="subListShow = !subListShow" class="list-group-item"><router-link :to="{ name: 'mypagehotplace' }">핫플레이스</router-link></li>
        </ul>
      </li>
      <li class="list-group-item my-2"><router-link :to="{ name: 'mypagecomment' }">내가 작성한 댓글 보기</router-link></li>
      <li id="last-list-item" class="list-group-item my-2"><router-link :to="{ name: 'mypagelike' }">좋아요 누른 게시글 보기</router-link></li>
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
#category-container {
  margin-top: 10rem;
}
#last-list-item {
  border-bottom: 1px solid black;
}
</style>
