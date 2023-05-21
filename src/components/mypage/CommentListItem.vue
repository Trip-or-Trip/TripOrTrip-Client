<template>
  <tr>
    <td style="text-align: center">
      <router-link :to="{ name: 'boardview', params: { articleno: comment.boardId } }">
        {{ comment.boardId }}
      </router-link>
    </td>
    <td style="text-align: center">{{ comment.content }}</td>
    <td style="text-align: center">{{ comment.createdAt }}</td>
    <td style="text-align: center" >
      <button class="btn btn-danger" @click="deleteComment"> 삭제 </button>
    </td>
    <td style="display:none" > {{comment.id}}</td>
  </tr>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import http from "@/util/http-common";
export default {
  name: "CommentListItem",
  props: {
    comment: Object,
  },
  
  computed: {
    ...mapGetters(["isLoggedIn", "getToken"]),
    ...mapState(["user"]),
  },

  methods:{
     deleteComment() {
      if(confirm("정말삭제하시겠습니까?")){
        http.delete(`/board/deletecomment/${this.comment.id}`, {
          headers: {
            "X-ACCESS-TOKEN": "Bearer " + this.getToken, // the token is a variable which holds the token
          },
        }).then(({ data }) => {
          let msg = "댓글 삭제 중 문제 발생!!!";
          if (data === "success") {
            msg = "댓글 삭제 성공!!!";
            alert(msg);
            location.reload(this);
          }else{
            alert(msg);  
          }
        });
      }
    },
  }
};

</script>

<style></style>
