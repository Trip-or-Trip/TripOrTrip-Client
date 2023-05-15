<template>
  <tr>
    <td>{{ article.id }}</td>
    <td>
      <router-link :to="{ name: 'planview', params: { articleno: article.id } }">
        {{ article.title }}
      </router-link>
    </td>
    <td>{{ article.userId }}</td>
    <td>{{ article.hit }}</td>
    <td>{{ article.createdAt }}</td>
  </tr>
</template>

<script>
export default {
  name: "PlanListItem",
  props: {
    article: Object,
  },
};
</script>

<style></style>
