<template>
  <div id="board-list-item">
    <tr>
      <td style="text-align: center">{{ article.id }}</td>
      <td>
        <router-link :to="{ name: 'boardview', params: { articleno: article.id } }">
          {{ article.title }}
        </router-link>
      </td>
      <td style="text-align: center">{{ article.userId }}</td>
      <td style="text-align: center">{{ article.hit }}</td>
      <td style="text-align: center">{{ article.createdAt }}</td>
    </tr>
  </div>
</template>

<script>
export default {
  name: "BoardListItem",
  components: {},
  props: {
    article: Object,
  },
  data() {
    return {
      message: "",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped></style>
