<template>
  <tr>
    <td style="text-align: center">{{ comment.userId }}</td>
    <td style="text-align: center">{{ comment.content }}</td>
    <td style="text-align: center">{{ comment.createdAt }}</td>
  </tr>
</template>

<script>
export default {
  name: "CommentListItem",
  props: {
    comment: Object,
  },
};
</script>

<style></style>
