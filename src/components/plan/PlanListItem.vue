<template>
  <tr>
    <td style="text-align:center">{{ article.id }}</td>
    <td>
      <router-link :to="{ name: 'planview', params: { articleno: article.id } }">
        {{ article.title }}
      </router-link>
    </td>
    <td style="text-align:center">{{ article.userId }}</td>
    <td style="text-align:center">{{ article.hit }}</td>
    <td style="text-align:center">{{ article.createdAt }}</td>
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
